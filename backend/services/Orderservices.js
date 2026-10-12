import db from "../config/db.js";

// CREATE ORDER
export const createorderservice = async (
  user_id,
  vendor_id,
  vendor_service_id,
  quantity,
  price,
  total_price,
  location,
) => {
  const query = `
    INSERT INTO orders
    (user_id, vendor_id, vendor_service_id, quantity, price, total_price, location)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(query, [
    user_id,
    vendor_id,
    vendor_service_id,
    quantity,
    price,
    total_price,
    location,
  ]);

  return result;
};

// GET ALL ORDERS
export const getallorderservice = async () => {
  const query = `
    SELECT
      o.id,
      o.user_id,
      o.vendor_id,
      o.vendor_service_id,
      o.quantity,
      o.price,
      o.total_price,
      o.location,
      o.status,
      u.username,
      v.name AS vendor_name,
      vsp.title AS service_title
    FROM orders AS o
    JOIN users AS u
      ON o.user_id = u.id
    JOIN vendors AS v
      ON o.vendor_id = v.id
    JOIN vendor_service_posts AS vsp
      ON o.vendor_service_id = vsp.id
  `;

  const [result] = await db.execute(query);

  return result;
};
// GET ORDER BY ID
export const getorderbyidservice = async (id) => {
  const query = `
    SELECT * FROM orders
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [id]);

  return result;
};

// UPDATE ORDER
export const updateorderservice = async (
  vendor_id,
  vendor_service_id,
  quantity,
  price,
  total_price,
  location,
  status,
  id,
) => {
  const query = `
    UPDATE orders
    SET vendor_id = ?,
        vendor_service_id = ?,
        quantity = ?,
        price = ?,
        total_price = ?,
        location = ?,
        status = ?
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [
    vendor_id,
    vendor_service_id,
    quantity,
    price,
    total_price,
    location,
    status,
    id,
  ]);

  return result;
};

// DELETE ORDER
export const deleteorderservice = async (id) => {
  const query = `
    DELETE FROM orders
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [id]);

  return result;
};
