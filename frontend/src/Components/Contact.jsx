import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCreateContactMessageMutation } from "../../redux/features/contactslice.js";


const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [createContactMessage, { isLoading }] =
    useCreateContactMessageMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      }).unwrap();

      toast.success(result?.message || "Your message was sent successfully!");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error?.data?.message ||
          "Failed to send your message. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F5EF] px-4 py-12 text-[#343830] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B45F43]">
            SEWAX Support
          </p>

          <h1 className="mb-4 text-4xl font-bold text-[#245747] sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto max-w-2xl leading-7 text-gray-600">
            Have a question about our services or vendors? We are here to help.
            Send us a message, and our team will be happy to assist you.
          </p>
        </div>

        {/* Contact information and form */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact information */}
          <section className="rounded-2xl bg-[#245747] p-7 text-white shadow-sm sm:p-9 lg:col-span-2">
            <h2 className="mb-3 text-2xl font-bold">Get in touch</h2>

            <p className="mb-9 leading-7 text-white/80">
              Need help finding a service provider or using SEWAX? Contact us
              using the information below.
            </p>

            <div className="space-y-7">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <FaEnvelope className="text-lg text-[#F4E8D5]" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold">Email</h3>
                  <p className="mt-1 break-all text-sm text-white/80">
                    Add your official email here
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <FaPhone className="text-lg text-[#F4E8D5]" />
                </div>

                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="mt-1 text-sm text-white/80">
                    Add your contact number here
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <FaMapMarkerAlt className="text-lg text-[#F4E8D5]" />
                </div>

                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="mt-1 text-sm text-white/80">Nepal</p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-xl border border-white/15 bg-white/5 p-4">
              <p className="text-sm leading-6 text-white/80">
                Your feedback helps us improve the SEWAX platform and provide a
                better experience for customers and service providers.
              </p>
            </div>
          </section>

          {/* Contact form */}
          <section className="rounded-2xl border border-[#E7E2D7] bg-white p-6 shadow-sm sm:p-9 lg:col-span-3">
            <h2 className="mb-2 text-2xl font-bold text-[#245747]">
              Send us a message
            </h2>

            <p className="mb-7 text-sm leading-6 text-gray-500">
              Complete the form below. All fields are required.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  maxLength={100}
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  maxLength={150}
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What do you need help with?"
                  maxLength={200}
                  required
                  className="w-full rounded-xl border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  maxLength={5000}
                  required
                  className="w-full resize-y rounded-xl border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                />

                <p className="mt-1 text-right text-xs text-gray-400">
                  {form.message.length}/5000 characters
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#245747] px-6 py-3.5 font-semibold text-white transition hover:bg-[#193F33] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>

              <p className="text-xs leading-5 text-gray-500">
                Please check your email address before sending so the team can
                contact you if needed.
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Contact;
