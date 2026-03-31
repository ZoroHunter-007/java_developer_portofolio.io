import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-sm text-slate-500 font-mono"
      >
        © {new Date().getFullYear()}{" "}
        <span className="gradient-text font-semibold">Dhruv Malusare</span>{" "}
        · Java Full Stack Developer · Built with React + Tailwind + Framer Motion
      </motion.p>
    </footer>
  );
}
