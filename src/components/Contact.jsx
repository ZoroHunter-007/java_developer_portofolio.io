import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { contactData } from "../data/portfolioData";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const formRef = useRef(null);

  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Load EmailJS
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
    script.onload = () => window.emailjs?.init(contactData.emailJsPublicKey);
    document.head.appendChild(script);
  }, []);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await window.emailjs.sendForm(
        contactData.emailJsServiceId,
        contactData.emailJsTemplateId,
        formRef.current
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClass = `w-full px-5 py-4 rounded-xl text-sm outline-none transition-all duration-200 border focus:border-indigo-500`;

  return (
    <section id="contact" className="py-28 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-indigo-400 font-mono mb-3">
            Let's talk
          </p>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Contact Me</h2>
          <p className="text-slate-400 mt-4 text-sm max-w-md mx-auto">
            Got an opportunity, a collab, or just want to say hi? I'm always open — let's build something great.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {[
              {
                icon: "📧",
                label: "Email",
                value: contactData.email,
                href: `mailto:${contactData.email}`,
              },
              {
                icon: "💻",
                label: "GitHub",
                value: "github.com/ZoroHunter-007",
                href: contactData.github,
              },
              {
                icon: "📍",
                label: "Location",
                value: "Vadodara, Gujarat, India",
                href: null,
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: 4 }}
                className="glass-card p-5 flex items-center gap-4"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-indigo-400 font-mono uppercase tracking-wider mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                  color: "inherit",
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                  color: "inherit",
                }}
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                required
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.08)",
                  color: "inherit",
                }}
              />

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="accent-btn w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={status !== "sending" ? { scale: 1.02 } : {}}
                whileTap={status !== "sending" ? { scale: 0.98 } : {}}
              >
                {status === "sending"
                  ? "Sending... 🚀"
                  : status === "success"
                  ? "Message Sent! ✅"
                  : status === "error"
                  ? "Failed to send 😢"
                  : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
