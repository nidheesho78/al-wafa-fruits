"use client";

import PageBanner from "@/utils/PageBanner";
import AnimatedSection from "@/utils/AnimatedSection";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?\d[\d\s\-()]{6,}$/;

function validate(formData: FormData): FormErrors {
  const e: FormErrors = {};
  if (!formData.name?.trim()) e.name = "Full name is required";
  if (!formData.email?.trim()) e.email = "Email is required";
  else if (!EMAIL_RE.test(formData.email.trim())) e.email = "Please enter a valid email";
  if (formData.phone?.trim() && !PHONE_RE.test(formData.phone.trim())) {
    e.phone = "Please enter a valid phone number";
  }
  if (!formData.subject?.trim()) e.subject = "Subject is required";
  if (!formData.message?.trim()) e.message = "Message is required";
  else if (formData.message.trim().length < 10) e.message = "Message must be at least 10 characters";
  return e;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}


function Field({ label, error, children }: any) {
  return (
    <div className="group border-b pb-4 border-gray-200 focus-within:border-red-600 transition-colors">
      <label className="block text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function ContactPage() {
  // Inside your component:
const empty: FormData = { name: "", email: "", phone: "", subject: "", message: "" };

 
const [formData, setFormData] = useState<FormData>(empty);
const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  setFormData(prev => ({ ...prev, [name]: value }));

  if (errors[name as keyof FormErrors]) {
    setErrors(prev => ({ ...prev, [name]: "" }));
  }
};

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error("Please fix the errors below.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Message sent successfully! We'll reply soon.");
        setFormData(empty);
        setErrors({});
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fixed Input Class - Explicit text color added
  const inputClass = "w-full bg-white text-gray-900 text-[15px] py-2 placeholder-gray-400 outline-none border-0 focus:ring-0";

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      <PageBanner
        title="Contact Us"
        subtitle="Tell us what you'd like, when you'd like it — we'll be in touch within one business day."
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop"
      />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-12 items-start">

          {/* Form Card */}
          <AnimatedSection animation="slideLeft">
            <div className="bg-white rounded-3xl shadow-lg p-10 lg:p-12 border border-gray-100">
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9">
                  <Field label="Your Name *" error={errors.name}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className={inputClass}
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="Email *" error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Phone (Optional)" error={errors.phone}>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 XX XXX XXXX"
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </Field>

                  <Field label="Subject *" error={errors.subject}>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="mt-9">
                  <Field label="Message *" error={errors.message}>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={7}
                      placeholder="Tell us what you'd like, when you'd like it..."
                      className={`${inputClass} resize-y min-h-[140px]`}
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-10 w-full sm:w-auto px-12 py-4 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3 text-base"
                >
                  {isSubmitting ? "Sending..." : "Send Message →"}
                </button>
              </form>
            </div>
          </AnimatedSection>

          {/* Get in Touch Card */}
          <AnimatedSection animation="slideRight" delay={100}>
            <div className="bg-white rounded-3xl shadow-lg p-10 lg:p-12 border border-gray-100 h-full">
              <h3 className="text-3xl font-semibold text-gray-900 mb-3">Get in Touch</h3>
              <p className="text-gray-600 mb-10 leading-relaxed">
                Whether you have a question, want to place an order, or explore partnership opportunities, 
                our team is ready to assist you with premium quality fruits.
              </p>

              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">Visit Our Office</p>
                    <p className="text-gray-600 mt-1 leading-relaxed">
                      Citadel Tower, Business Bay<br />
                      Plot No.62 Office 2105-E-505<br />
                      Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">Call Us</p>
                    <div className="mt-1 space-y-1 text-gray-600">
                      <a href="tel:+971526995266" className="block hover:text-red-600 transition-colors">
                        +971 52 699 5266
                      </a>
                      <a href="tel:+971553316210" className="block hover:text-red-600 transition-colors">
                        +971 55 331 6210
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">Email Us</p>
                    <a
                      href="mailto:hello@alwafafruits.com"
                      className="text-gray-600 hover:text-red-600 transition-colors mt-1 block"
                    >
                      hello@alwafafruits.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Map */}
      <section className="h-[520px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.6828078812!2d54.947330799999995!3d25.0756994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Al Wafa Fruits - Dubai"
        />
      </section>
    </main>
  );
}