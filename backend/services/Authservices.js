import db from "../config/db.js";

export const createUserservice =async ( username, password, email, phone,role) => {
const query = "INSERT INTO users(username,password,email,phone,role) VALUES(?,?,?,?,?)";
    const [result] = await db.execute(query, [
      username,
      password,
      email,
      phone,
      role
    ]);
    return result;
};
export const updateUserService = async (id, username, email, phone) => {
  const query = `
    UPDATE users
    SET username = ?,
        email = ?,
        phone = ?
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [username, email, phone, id]);

  return result;
};
export const Finduserbyemailservice = async (email) => {
  const [row] = await db.execute("SELECT * FROM users WHERE email =?", [email]);

  return row[0];
};
export const getUsersServices = async () => {
  const [users] = await db.execute("SELECT * FROM users");
  return users;
};
export const deleteUserByIdService = async(id)=>{
    const[result]=await db.execute("DELETE FROM users WHERE id=?",[id]);
    return result;
}
