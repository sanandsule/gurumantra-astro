import { motion } from "framer-motion";
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    const script = document.createElement('script');
    script.text = `
    // const { scroll, animate } = Motion;

    // Hero content entry animation
    // animate("#hero-content", { opacity: [0, 1], y: [50, 0] }, { duration: 1.2, easing: "ease-out" });

    const thoughts = [
        "Initializing Python runtime...",
        "Loading machine learning models...",
        "Training neural networks on real data...",
        "Optimizing inference latency...",
        "Connecting LLMs with external tools...",
        "Deploying autonomous AI agents...",
        "Human + AI collaboration activated."
    ];

    const streamEl = document.getElementById("ai-stream");
    let thoughtIndex = 0;
    let charIndex = 0;
    let typing = true;

    function typeLoop() {
        if (typing) {
        if (charIndex < thoughts[thoughtIndex].length) {
            streamEl.textContent += thoughts[thoughtIndex][charIndex];
            charIndex++;
        } else {
            typing = false;
            setTimeout(() => {}, 1200);
        }
        } else {
        if (charIndex > 0) {
            streamEl.textContent = streamEl.textContent.slice(0, -1);
            charIndex--;
        } else {
            typing = true;
            thoughtIndex = (thoughtIndex + 1) % thoughts.length;
        }
        }
    }

    setInterval(typeLoop, 50);
    
    `;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);

  return (
    // Hero Section with Full Screen Video -->
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">

    {/* Background Video */}
    <video autoPlay muted loop playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/videos/output.mp4" type="video/mp4"/>
    </video>

    {/* <!-- Overlay Gradient (optional but cinematic) --> */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-5"></div>

    {/* <!-- Glass Overlay Content --> */}
    <div className="relative z-10 glass p-10 md:p-16 rounded-3xl max-w-4xl text-center mx-4">

        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
        Build Real AI Skills.<br /><span className="text-purple-400">Get Real Outcomes.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-10">
        Learn AI, build projects, get internships, and launch your career!
        </p>

        {/* <!-- Live AI Thought Stream --> */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 
                    rounded-xl p-6 text-left font-mono text-sm md:text-base
                    text-green-400 mb-10 shadow-inner">

        <span className="text-purple-400">AI@Gurumantra</span>:~$
        <span id="ai-stream"></span>
        <span className="animate-pulse">▌</span>

        </div>

        <a href="#courses"
        className="inline-block bg-gradient-to-r from-purple-600 to-pink-600
                px-10 py-4 rounded-full font-bold text-lg
                hover:scale-105 transition-transform">
        Start Your AI Journey
        </a>

    </div>
    </section>

    // <section className="px-6 md:px-16 py-24 grid md:grid-cols-2 gap-12 items-center">
    // {/* <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black"> */}

    //     // Background Video
    //     {/* <video autoPlay muted loop playsInline
    //         className="absolute top-0 left-0 w-full h-full object-cover z-0">
    //         <source src="/videos/output.mp4" type="video/mp4" />
    //     </video> */}

    //   <div>
    //     <h1 className="text-4xl md:text-6xl font-bold leading-tight">
    //       Build Real AI Skills.<br /> Get Real Outcomes.
    //     </h1>

    //     <p className="mt-6 text-lg text-gray-300">
    //       Learn AI, build projects, get internships, and launch your career or startup.
    //     </p>

    //     <div className="mt-8 flex gap-4 flex-wrap">
    //       <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
    //         Explore Programs
    //       </button>

    //       <button className="px-6 py-3 border border-gray-600 rounded-lg">
    //         Book Free Call
    //       </button>
    //     </div>
    //   </div>

    //   <motion.div
    //     initial={{ opacity: 0, scale: 0.9 }}
    //     animate={{ opacity: 1, scale: 1 }}
    //     className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl h-80 flex items-center justify-center"
    //   >
    //     <p className="text-xl">Learn → Build → Intern → Launch</p>
    //   </motion.div>
    // </section>
  );
}