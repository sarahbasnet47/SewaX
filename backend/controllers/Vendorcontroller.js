import db from "../config/db.js";
import {
  createvendorservices,
  deletevendorservices,
  getvendorbyidservices,
  getvendorbyslugservices,
  getvendorservices,
  updatevendorservices,
} from "../services/Vendorservices.js";

export const createVendor = async (req, res) => {
  try {
    const { user_id, name, address, number, service_id } = req.body || {};

    // Check user
    const [user] = await db.execute("SELECT id FROM users WHERE id = ?", [
      user_id,
    ]);

    if (user.length === 0) {
      return res.status(404).json({
        message: `User with id ${user_id} does not exist`,
      });
    }

    // Check service
    const [service] = await db.execute("SELECT id FROM services WHERE id = ?", [
      service_id,
    ]);

    if (service.length === 0) {
      return res.status(404).json({
        message: `Service with id ${service_id} does not exist`,
      });
    }
    const vendor = await createvendorservices(
      user_id,
      name,
      address,
      number,
      service_id,
    );
    if (vendor.affectedRows == 0) {
      res.send({ message: "vendor not created" });
    }
    res.status(201).json({ message: "vendor created successfully", vendor });
  } catch (error) {
    console.log(error);
    res.send({ message: "sometyhing went wrong" });
  }
};
export const getvendor = async (req, res) => {
  try {
    const getallvendors = await getvendorservices();
    if (getallvendors.length === 0) {
      return res.status(404).json({ message: "vendor not found" });
    }
    res.status(200).json(getallvendors);
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
};
export const updatevendor = async (req, res) => {
  try {
    const vendorid = Number(req.params.id);
    const { user_id, name, address, number, service_id } = req.body || {};
    const updatevendor = await updatevendorservices(
      user_id,
      name,
      address,
      number,
      service_id,
      vendorid,
    );
    if (updatevendor.affectedRows === 0) {
      return res.status(400).json({ message: "unable to update vendor" });
    }
    res.status(200).json({ message: "vendor updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "something went wrong" });
  }
};
export const deletevendor = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletevendor = await deletevendorservices(id);
    if (deletevendor.affectedRows === 0) {
      res.status(400).json({ message: "unable to delete" });
    }
    res.status(200).json({ message: "vendor delete successfully" });
  } catch (error) {
    res.json({ message: "something went wrong" });
  }
};
export const getvendorbyid = async (req, res) => {
  try {
    const vendorid = Number(req.params.id);
    const result = await getvendorbyidservices(vendorid);
    if (result.length === 0) {
      return res.status(404).json({ message: "vendor not found" });
    }
    return res
      .status(200)
      .json({
        message: "vendor fetched successfully",
        vendorservice: result[0],
      });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "something went wrong" });
  
  }
};
export const getvendorbyslug = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("slug recevied", slug);
    const result = await getvendorbyslugservices(slug);
    console.log(result);
    if (result.length === 0) {
      return res
        .status(404)
        .json({
          message: "vendor not found",
          vendorservice: result[0],
        });
    }
    return res
      .status(200)
      .json({ message: "vendor  fetched successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "something went wrong" });
  }
};