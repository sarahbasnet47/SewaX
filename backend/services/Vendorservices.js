import db from "../config/db.js";

export const createvendorservices = async (
  user_id,
  name,
  address,
  number,
  service_id,
) => {
  const query =
    "INSERT INTO vendors(user_id,name,address,number,service_id) VALUES(?,?,?,?,?)";
  const [result] = await db.execute(query, [
    user_id,
    name,
    address,
    number,
    service_id,
  ]);

  return result;
};
export const getvendorservices = async () => {
  const [result] = await db.query("SELECT * FROM vendors");
  return result;
};
export const updatevendorservices = async (
  user_id,
  name,
  address,
  number,
  service_id,
  vendorid,
) => {
  const query = `UPDATE vendors SET user_id=?,name=?,address=?,number=?,service_id=? WHERE id=?`;
  const [result] = await db.execute(query, [
    user_id,
    name,
    address,
    number,
    service_id,
    vendorid,
  ]);
  return result;
};
export const deletevendorservices = async (id) => {
  const query = "DELETE FROM vendors WHERE id=?";
  const [result] = await db.execute(query, [id]);
  return result;
};
export const getvendorbyidservices = async (vendorid) => {
  const query = `SELECT * FROM vendors WHERE id=?`;
  const [result] = await db.execute(query, [vendorid]);
  return result;
};
export const getvendorbyslugservices = async (slug) => {
  const query = `SELECT * FROM vendors WHERE slug=?`;
  const [result] = await db.execute(query, [slug]);
  return result;
};
