import db from "../config/db.js";

// Save contact message
export const createContactMessageService = async ({
  name,
  email,
  subject,
  message,
}) => {
  const sql = `
    INSERT INTO contact_messages (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.execute(sql, [name, email, subject, message]);

  return result;
};
