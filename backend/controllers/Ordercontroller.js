import {
  createorderservice,
  deleteorderservice,
  getallorderservice,
  getorderbyidservice,
  updateorderservice,
} from "../services/Orderservices.js";

// CREATE ORDER
export const createorder = async (req, res) => {
  try {
    const { user_id, vendor_id, vendor_service_id, quantity, price, location } =
      req.body || {};

    if (!user_id || !vendor_id || !vendor_service_id || !quantity || !price) {
      return res.status(400).json({
        message: "All required fields are required",
      });
    }

    const total_price = quantity * price;

    const result = await createorderservice(
      user_id,
      vendor_id,
      vendor_service_id,
      quantity,
      price,
      total_price,
      location,
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Unable to create order",
      });
    }

    return res.status(201).json({
      message: "Order created successfully",
      orderId: result.insertId,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// GET ALL ORDERS
export const getallorders = async (req, res) => {
  try {
    const result = await getallorderservice();

    if (result.length === 0) {
      return res.status(200).json({
        message: "No orders found",
        orders: [],
      });
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      orders: result,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// GET ORDER BY ID
export const getorderbyid = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await getorderbyidservice(id);

    if (result.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order fetched successfully",
      order: result[0],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// UPDATE ORDER
export const updateorder = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { vendor_id, vendor_service_id, quantity, price, location, status } =
      req.body || {};

    if (!vendor_id || !vendor_service_id || !quantity || !price || !status) {
      return res.status(400).json({
        message: "All required fields are required",
      });
    }

    const total_price = quantity * price;

    const result = await updateorderservice(
      vendor_id,
      vendor_service_id,
      quantity,
      price,
      total_price,
      location,
      status,
      id,
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Unable to update order",
      });
    }

    return res.status(200).json({
      message: "Order updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// DELETE ORDER
export const deleteorder = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await deleteorderservice(id);

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Unable to delete order",
      });
    }

    return res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
