import {
  createUserservice,
  deleteUserByIdService,
  Finduserbyemailservice,
  getUsersServices,
  updateUserService,
} from "../services/Authservices.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  const { role, username, password, email, phone } = req.body || {};
  if (!role || !username || !password || !email || !phone) {
    res.status(400).json({
      message: "all fields are required",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user = await createUserservice(
      username,
      hashPassword,
      email,
      phone,
      role,
    );

    if (user.affectedRows === 0) {
      return res.status(500).json({
        message: "registratiion error",
      });
    }
    res.status(201).json({
      message: "user registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const returnUser = await Finduserbyemailservice(email);

    if (!returnUser) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, returnUser.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // Remove password before sending user data
    const { password: _, ...userWithoutPassword } = returnUser;

    // Create JWT
    const token = jwt.sign(
      {
        id: returnUser.id,
        email: returnUser.email,
        username: returnUser.username,
        role: returnUser.role,
      },
      process.env.jwt_secret,
      {
        expiresIn: process.env.jwt_expire,
      },
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 200,
      message: "Login success",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "logout success",
  });
};

export const getAllUser = async (req, res) => {
  try {
    const users = await getUsersServices();

    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    return res.status(200).json({
      message: "Users fetched successfully",
      users: users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    const id = req.user.id;

    const users = await getUsersServices();

    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Get the ID from the route: /delete/:id
    const id = Number(req.params.id);

    // Validate the ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    console.log("Deleting user ID:", id);

    // Delete the user from the database
    const result = await deleteUserByIdService(id);

    // Check whether a row was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      message: "Something went wrong while deleting the user",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { username, email, phone } = req.body || {};

    if (!username || !email || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await updateUserService(id, username, email, phone);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
