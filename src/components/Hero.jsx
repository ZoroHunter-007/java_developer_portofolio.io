import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { heroData } from "../data/portfolioData";

function useTyping(roles) {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = deleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1500);
          return;
        }
        setCharIndex((p) => p + 1);
      } else {
        setText(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setRoleIndex((p) => (p + 1) % roles.length);
          setCharIndex(0);
          return;
        }
        setCharIndex((p) => p - 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, charIndex, deleting, roleIndex, roles]);

  return text;
}

export default function Hero() {
  const typedText = useTyping(heroData.roles);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="animate-blob absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
        />
        <div
          className="animate-blob animation-delay-2000 absolute top-1/3 right-0 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #a78bfa, transparent)" }}
        />
        <div
          className="animate-blob animation-delay-4000 absolute bottom-0 left-1/3 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #818cf8, transparent)" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Profile image */}
        <motion.div
          variants={item}
          className="animate-float mx-auto mb-8 w-36 h-36 rounded-full overflow-hidden"
          style={{
            border: "3px solid #6366f1",
            boxShadow: "0 0 0 6px rgba(99,102,241,0.15), 0 20px 50px rgba(0,0,0,0.4)",
          }}
        >
          <img
            src="Dhruv.jpeg"
            alt="Dhruv Malusare"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=Dhruv+Malusare&background=6366f1&color=fff&size=200`;
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
        >
          <span className="gradient-text">{heroData.name}</span>
        </motion.h1>

        {/* Typing */}
        <motion.div variants={item} className="h-10 mb-6">
          <span
            className="text-xl md:text-2xl font-mono font-semibold text-indigo-400 typing-cursor"
          >
            {typedText}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: "rgba(203,213,225,0.8)" }}
        >
          {heroData.description}
        </motion.p>

        {/* Tech tags */}
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {heroData.tags.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="accent-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href={heroData.resumeLink}
            download
            target="_blank"
            rel="noreferrer"
            className="outline-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-6 h-10 rounded-full border-2 border-indigo-400/40 flex justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-indigo-400 opacity-60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
