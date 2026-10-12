

import {
  addpostservice,
  getallservices,
  deleteserviceservices,
  getservicebyidservices,
  getservicebyslugservices,
  updateserviceservices,
} from "../services/Service.js";
// CREATE SERVICE
export const createservice = async (req, res) => {
  try {
    const { name, description } = req.body || {};

    if (!name) {
      return res.status(400).json({
        message: "name is required",
      });
    }

    const service = await addpostservice(name, description);

    if (service.affectedRows === 0) {
      return res.status(500).json({
        message: "unable to create service",
      });
    }

    return res.status(201).json({
      message: "service created successfully",
      service,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

// GET ALL SERVICES
export const getservices = async (req, res) => {
  try {
    const allServices = await getallservices();

    return res.status(200).json({
      message: "services retrieved successfully",
      allServices,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

// GET SERVICE BY ID
export const getservicebyid = async (req, res) => {
  try {
    const serviceid = Number(req.params.id);

    const service = await getservicebyidservices(serviceid);

    if (service.length === 0) {
      return res.status(404).json({
        message: "service not found",
      });
    }

    return res.status(200).json({
      message: "service fetched successfully",
      service: service[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

// GET SERVICE BY SLUG
export const getservicebyslug = async (req, res) => {
  try {
    const { slug } = req.params;

    console.log("slug received:", slug);

    const result = await getservicebyslugservices(slug);

    console.log(result);

    if (result.length === 0) {
      return res.status(404).json({
        message: "service not found",
      });
    }

    return res.status(200).json({
      message: "service fetched successfully",
      service: result[0],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

// UPDATE SERVICE
export const updateservice = async (req, res) => {
  try {
    const serviceid = Number(req.params.id);

    const { name, description } = req.body || {};

    if (!name) {
      return res.status(400).json({
        message: "name is required",
      });
    }

    const result = await updateserviceservices(name, description, serviceid);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "unable to update",
      });
    }

    return res.status(200).json({
      message: "service updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "something went wrong",
    });
  }
};

// DELETE SERVICE
export const deleteservice = async (req, res) => {
  try {
    const serviceid = Number(req.params.serviceid);

    const result = await deleteserviceservices(serviceid);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "service not found",
      });
    }

    return res.status(200).json({
      message: "service deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "something went wrong",
    });
  }
};
