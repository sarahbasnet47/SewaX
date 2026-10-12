import db from "../config/db.js";
export const addpostservice = async (name, description) => {
  const query = "INSERT INTO service_posts(name,description)VALUES (?,?)";
  const [result] = await db.execute(query, [name, description]);
  return result;
};
export const getgetallservicesservice = async () => {
  const [rows] = await db.query("SELECT *FROM service_posts");
  return rows;
};
export const getmypostservices = async (userid) => {
  const query = "SELECT * FROM service_posts WHERE user_id=?";
  const [result] = await db.execute(query, [userid]);
  return result;
};
export const deleteallservices = async (id) => {
  const query = `DELETE FROM users WHERE id=? `;
  const result = await db.query(query, [id]);
  return result;
};
export const updatepostservices = async (
  title,
  description,
  location,
  budget,
  postid,
) => {
  const query = `UPDATE service_posts SET title=?,description=?,location=?,budget=? WHERE id=?`;
  const [result] = await db.execute(query, [
    title,
    description,
    location,
    budget,
    postid,
  ]);
  return result;
};
export const getpostbyidservices = async (postid) => {
  const query = `SELECT * FROM service_posts WHERE id=?`;
  const [result] = await db.execute(query, [postid]);
  return result;
};
export const getpostbyslugservices = async (slug) => {
  const query = `SELECT * FROM service_posts WHERE slug=?`;
  const [result] = await db.execute(query, [slug]);
  return result;
};
export const getallpostservice = async () => {
  const [rows] = await db.query(`
    SELECT
      sp.*,
      u.username AS owner_name
    FROM service_posts AS sp
    LEFT JOIN users AS u
      ON sp.user_id = u.id
    ORDER BY sp.id DESC
  `);

  return rows;
};