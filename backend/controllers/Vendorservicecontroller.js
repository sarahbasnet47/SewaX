import {
  createvendorserviceservices,
  deletevendorserviceservcies,
  getmyvendorserviceservices,
  getvendorservicebyidservices,
  getvendorservicebyslugservices,
  getvendorserviceservices,
  updatevendorserviceservices,
} from "../services/Vendorserviceservices.js";
import { generateSlug } from "../utils/sluggenerator.js";

export const createvendorservice = async (req, res) => {
  try {
    const { vendor_id, title, description, location, price } = req.body || {};
    if (!vendor_id || !title || !description || !location || !price) {
      return res.status(400).json({ message: "all fields are fields" });
    }
    const slug = generateSlug(title);
    const createvendor = await createvendorserviceservices(
      vendor_id,
      slug,
      title,
      description,
      location,
      price,
    );
    if (createvendor.affectedRows === 0) {
      return res.status(400).json({ message: "unable to create" });
    }
    return res.status(200).json({ message: "vendor create successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
//deletevendorservices
export const deletevendorservice = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletevendorservice = await deletevendorserviceservcies(id);
    if (deletevendorservice.affectedRows === 0) {
      return res.status(400).json({ message: "unable to delete" });
    }
    return res
      .status(200)
      .json({ message: "vendorservice delete successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
//updatevendorservice
export const updatevendorservice = async (req, res) => {
  try {
    const vendorid = Number(req.params.id);
    const { vendor_id, title, description, location, price } = req.body || {};
    const slug = generateSlug(title);
    const result = await updatevendorserviceservices(
      vendor_id,
      slug,
      title,
      description,
      location,
      price,
      vendorid,
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "unable to update" });
    }
    return res
      .status(200)
      .json({ message: "vendorservice update successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
//getvendorservice3byid,getmyvendorservice,getvendorservice
export const getvendorservicebyid = async (req, res) => {
  try {
    const vendorserviceid = Number(req.params.id);
    const result = await getvendorservicebyidservices(vendorserviceid);
    if (result.length === 0) {
      return res.status(404).json({ message: "vendor service not found" });
    }
    return res.status(200).json({
      message: "vendor services fetched successfully",
      vendorservice: result[0],
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
export const getvendorservicebyslug = async (req, res) => {
  try {
    const { slug } = req.params;
    console.log("slug recevied", slug);
    const result = await getvendorservicebyslugservices(slug);
    console.log(result);
    if (result.length === 0) {
      return res.status(404).json({
        message: "vendor service not found",
        vendorservice: result[0],
      });
    }
    return res
      .status(200)
      .json({ message: "vendor services fetched successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const getvendorservice = async (req, res) => {
  try {
    const result = await getvendorserviceservices();

    if (result.length === 0) {
      return res.status(200).json({
        message: "No vendor services found",
        vendorservices: [],
      });
    }

    res.status(200).json({
      message: "Vendor services fetched successfully",
      vendorservices: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export const getmyvendorservice = async (req, res) => {
  try {
    console.log("Logged in user:", req.user);
    const user_id = Number(req.user.id);
    console.log("REQ USER:", req.user);
    const result = await getmyvendorserviceservices(user_id);
    if (result.length === 0) {
      return res.status(404).json({ message: "vendor not found" });
    }
    return res.status(200).json({
      message: "my vendor fetched successfully",
      vendorservices: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
