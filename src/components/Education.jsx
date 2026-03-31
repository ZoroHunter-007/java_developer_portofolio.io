import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { educationData } from "../data/portfolioData";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-28 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-widest uppercase text-indigo-400 font-mono mb-3">
            Academic Background
          </p>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text">Education</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-2 bottom-2 w-0.5 rounded-full"
            style={{ background: "linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.05))" }}
          />

          <div className="space-y-10">
            {educationData.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative pl-16"
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.1 }}
                  className="absolute left-3.5 top-5 w-5 h-5 rounded-full z-10"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #a78bfa)",
                    boxShadow: "0 0 0 4px rgba(99,102,241,0.2)",
                    transform: "translateX(-50%)",
                  }}
                />

                <div className="glass-card p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-indigo-400 mb-1">{edu.degree}</h3>
                      <p className="text-sm font-medium" style={{ color: "rgba(203,213,225,0.9)" }}>
                        {edu.institute}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="tag-pill text-xs">{edu.period}</span>
                      {edu.cgpa && (
                        <span className="text-xs font-mono text-indigo-400 font-semibold">
                          {edu.cgpa}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-1.5 mt-4">
                    {edu.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "rgba(148,163,184,0.9)" }}>
                        <span className="text-indigo-400 mt-0.5 flex-shrink-0">▸</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
