import { motion } from "framer-motion";

const nodes = [
  {
    title: "Learn by Building",
    description: "Real projects. Real code. If you didn’t build it, you didn’t learn it.",
    x: 0,
    y: -300,
  },
  {
    title: "Live Mentorship",
    description: "Engaging with experienced AI professionals offering insight into industry trends.",
    x: 240,
    y: -150,
  },
  {
    title: "Internship Pathway",
    description: "Guided real-world experience through our internship programme.",
    x: 240,
    y: 150,
  },
  {
    title: "Venture Incubation",
    description: "From idea to MVP. Build your startup with us and get introduced to angel investors.",
    x: 0,
    y: 300,
  },
  {
    title: "Research & Patents",
    description: "Guidance on research thinking, paper writing, and IP generation.",
    x: -240,
    y: 150,
  },
  {
    title: "Career Focused",
    description: "Recruitment-readiness via portfolio and resume preparation.",
    x: -240,
    y: -150,
  },
];

export default function DifferentiationMindmap() {
  return (
    <section className="relative px-6 md:px-16 py-32 overflow-hidden bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold">
          Why Gurumantra Works Differently
        </h2>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
          Gurumantra is not just a training institute. It is a connected
          ecosystem where every learning path leads toward meaningful outcomes. 
          We break down hard concepts into intuitive, practical lessons using 
          tools, frameworks, and workflows used by real AI teams, helping students, professionals, and career switchers alike.

        </p>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex justify-center items-center relative h-[700px]">

        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full" />

        {/* SVG CONNECTIONS */}
        <svg
          className="absolute w-full h-full pointer-events-none"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
        >
          {nodes.map((node, index) => {
            const centerX = 500;
            const centerY = 350;

            const targetX = centerX + node.x;
            const targetY = centerY + node.y;

            return (
              <motion.line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={targetX}
                y2={targetY}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            );
          })}
        </svg>

        {/* CENTER NODE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute z-20"
        >
            <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(168,85,247,0.3)",
                "0 0 60px rgba(168,85,247,0.5)",
                "0 0 0px rgba(168,85,247,0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="w-56 h-56 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center text-center p-6"
          >
            <div className="text-2xl font-bold">Gurumantra</div>

            <div className="mt-2 text-sm opacity-90">
              Center of Learning
            </div>
          </motion.div>
        </motion.div>

        {/* OUTER NODES */}
        {nodes.map((node, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.06, y: -5 }}
            className="absolute z-10"
            style={{
              left: `calc(50% + ${node.x}px - 100px)`,
              top: `calc(50% + ${node.y}px - 60px)`,
            }}
          >
            <div className="w-[220px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <h3 className="text-lg font-semibold">{node.title}</h3>

              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                {node.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MOBILE / TABLET */}
      <div className="lg:hidden max-w-xl mx-auto grid gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mx-auto mb-8"
        >
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center text-center p-6 shadow-lg shadow-purple-500/20">
            <div className="text-xl font-bold">Gurumantra</div>
            <div className="text-sm mt-2 opacity-90">
              Center of Learning
            </div>
          </div>
        </motion.div>

        {nodes.map((node, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 hover:border-purple-500/30 transition-all">
              <h3 className="text-lg font-semibold">{node.title}</h3>

              <p className="mt-2 text-sm text-gray-400">
                {node.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}