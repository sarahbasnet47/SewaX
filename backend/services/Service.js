import db from "../config/db.js";

export const addpostservice = async (name, description) => {
  const query = "INSERT INTO services(name,description) VALUES (?,?)";
  const [result] = await db.execute(query, [name, description]);
  return result;
};
export const getallservices = async () => {
  const [services] = await db.execute(`SELECT * FROM services`);
  return services;
};
export const getservicebyidservices = async (serviceid) => {
  const query = `SELECT * FROM services WHERE id=?`;
  const [result] = await db.execute(query, [serviceid]);
  return result;
};

export const getservicebyslugservices = async (slug) => {
  const query = `
    SELECT *
    FROM service_posts
    WHERE slug = ?
  `;

  const [result] = await db.execute(query, [slug]);

  console.log("SLUG:", slug);
  console.log("DATABASE RESULT:", result);

  return result;
};

export const updateserviceservices = async (name, description, serviceid) => {
  const query = `UPDATE services SET name=?,description=? WHERE id =?`;
  const [result] = await db.execute(query, [name, description, serviceid]);
  return result;
};
export const deleteserviceservices = async (serviceid) => {
  const query = `DELETE FROM services WHERE id=?`;
  const [result] = await db.execute(query, [serviceid]);
  return result;
};
