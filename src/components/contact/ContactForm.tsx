import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Using Resend API to send email via Vite proxy to avoid CORS issues
      // Note: API key is loaded from environment variable
      const apiKey = import.meta.env.VITE_RESEND_API_KEY;
      
      if (!apiKey) {
        throw new Error("Resend API key is not configured");
      }

      const response = await fetch("/api/resend/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "noreply@nilsunstudio.ir",
          to: "info@nilsunstudio.ir",
          subject: `New Contact Form Submission from ${data.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          `,
          text: `
            New Contact Form Submission
            
            Name: ${data.name}
            Email: ${data.email}
            Phone: ${data.phone || "Not provided"}
            Message: ${data.message}
          `,
        }),
      });

      const result = await response.json();

      if (response.ok && result.id) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || t("contact.form.error"));
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(t("contact.form.connectionError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="bg-card-dark rounded-lg p-8 shadow-card">
        <h2
          className={`text-2xl font-bold text-secondary mb-6 ${isRTL ? "text-right" : "text-left"}`}
        >
          {t("contact.form.title")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium text-white mb-2 ${isRTL ? "text-right" : "text-left"}`}
              >
                {t("contact.form.name")}
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: true,
                  minLength: 2,
                })}
                className="contact-input w-full px-4 py-3 bg-background-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                placeholder={t("contact.form.namePlaceholder")}
              />
              {errors.name && (
                <div className="error-message text-red-400 text-sm mt-1">
                  {t("contact.form.validation.nameMin")}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium text-white mb-2 ${isRTL ? "text-right" : "text-left"}`}
              >
                {t("contact.form.email")}
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className="contact-input w-full px-4 py-3 bg-background-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                placeholder={t("contact.form.emailPlaceholder")}
              />
              {errors.email && (
                <div className="error-message text-red-400 text-sm mt-1">
                  {t("contact.form.validation.emailInvalid")}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className={`block text-sm font-medium text-white mb-2 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t("contact.form.phone")}
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              className="contact-input w-full px-4 py-3 bg-background-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
              placeholder={t("contact.form.phonePlaceholder")}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className={`block text-sm font-medium text-white mb-2 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t("contact.form.message")}
            </label>
            <textarea
              id="message"
              rows={6}
              {...register("message", {
                required: true,
                minLength: 10,
              })}
              className="contact-input w-full px-4 py-3 bg-background-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder={t("contact.form.messagePlaceholder")}
            />
            {errors.message && (
              <div className="error-message text-red-400 text-sm mt-1">
                {t("contact.form.validation.messageMin")}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                {t("contact.form.submitting")}
              </>
            ) : (
              t("contact.form.submit")
            )}
          </button>
        </form>

        {/* Success/Error Messages */}
        {submitStatus !== "idle" && (
          <div className="mt-6 p-4 rounded-lg">
            {submitStatus === "success" && (
              <div className="bg-green-900/20 border border-green-500 text-green-400 p-4 rounded-lg">
                <div className="flex items-center">
                  <span className="material-icons mr-2">check_circle</span>
                  {t("contact.form.success")}
                </div>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg">
                <div className="flex items-center">
                  <span className="material-icons mr-2">error</span>
                  {errorMessage}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactForm;
