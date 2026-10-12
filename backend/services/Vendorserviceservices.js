import db from "../config/db.js";

export const createvendorserviceservices = async (
  vendor_id,
  slug,
  title,
  description,
  location,
  price,
) => {
  const query =
    "INSERT INTO vendor_service_posts(vendor_id,slug,title,description,location,price) VALUES (?,?,?,?,?,?)";
  const [result] = await db.execute(query, [
    vendor_id,
    slug,
    title,
    description,
    location,
    price,
  ]);
  return result;
};
//deletevendorservice
export const deletevendorserviceservcies = async (id) => {
  const query = "DELETE FROM vendor_service_posts WHERE id=?";
  const [result] = await db.execute(query, [id]);
  return result;
};
export const updatevendorserviceservices = async (
  vendor_id,
  slug,
  title,
  description,
  location,
  price,
  id,
) => {
  const query = `
    UPDATE vendor_service_posts
    SET vendor_id = ?,
        slug = ?,
        title = ?,
        description = ?,
        location = ?,
        price = ?
    WHERE id = ?
  `;

  const [result] = await db.execute(query, [
    vendor_id,
    slug,
    title,
    description,
    location,
    price,
    id,
  ]);

  return result;
};
export const getvendorservicebyidservices = async (id) => {
  const query = `SELECT * FROM vendor_service_posts WHERE id=?`;
  const [result] = await db.execute(query, [id]);
  return result;
};
export const getvendorservicebyslugservices = async (slug) => {
  const query = `SELECT * FROM vendor_service_posts WHERE slug=?`;
  const [result] = await db.execute(query, [slug]);
  return result;
};
export const getvendorserviceservices = async () => {
  const query = `SELECT * FROM vendor_service_posts `;
  const [result] = await db.execute(query);
  return result;
};
export const getmyvendorserviceservices = async (user_id) => {
  const query = `
    SELECT vsp.*
    FROM vendor_service_posts AS vsp
    JOIN vendors AS v
      ON vsp.vendor_id = v.id
    WHERE v.user_id = ?
  `;

  const [result] = await db.execute(query, [user_id]);

  return result;
};
