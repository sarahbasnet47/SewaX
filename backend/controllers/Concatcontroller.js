import { createContactMessageService } from "../services/Contactservices.js";


export const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await createContactMessageService({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      message: "Your message was sent successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Create contact message error:", error);

    return res.status(500).json({
      message: "Failed to send your message",
    });
  }
};
