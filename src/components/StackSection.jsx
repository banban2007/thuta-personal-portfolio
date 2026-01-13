import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Transition from '../components/Transition';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const StackSection = () => {
  const containerRef = useRef(null);

  const skills = [
    { name: "React", level: "Advanced", color: "#61DAFB" },
    { name: "Node.js", level: "Backend", color: "#339933" },
    { name: "GSAP", level: "Animation", color: "#88CE02" },
    { name: "Tailwind", level: "Styling", color: "#06B6D4" },
    { name: "Framer Motion", level: "Motion", color: "#E10098" },
    { name: "Matter.js", level: "Physics", color: "#EF4444" },
    { name: "Next.js", level: "Framework", color: "#FFFFFF" },
    { name: "TypeScript", level: "Strict", color: "#3178C6" },
    { name: "UI/UX", level: "Design", color: "#F24E1E" },
    { name: "Three.js", level: "3D", color: "#FFFFFF" }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Skill Cards Animation
      gsap.from(".skill-card", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "start"
        },
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 95%", // ဖုန်းမှာ အပေါ်ရောက်တာနဲ့ ပေါ်လာအောင်
          toggleActions: "play none none none",
          // markers: true, // debug လုပ်ချင်ရင် ဒါလေး ဖွင့်ကြည့်ပါ
        }
      });

      // Header Text Animation
      gsap.from(".stack-header h1, .stack-header h2", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);

    // Page Refresh ဖြစ်ရင် ScrollTrigger ကို ပြန်တွက်ခိုင်းတာပါ
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <Transition>
      <section ref={containerRef} className="bg-[#0a0a0a] min-h-screen py-16 px-6 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="stack-header mb-16 md:mb-24">
            <h2 className="text-white/30 uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4">
              Core Stack
            </h2>
            <h1 className="text-5xl md:text-8xl text-white font-medium tracking-tighter leading-none mb-2">
              Technologies
            </h1>
            <h1 className="text-5xl md:text-8xl italic font-serif text-neutral-500 tracking-tighter leading-none">
              I use to build.
            </h1>
          </div>

          {/* Grid Layout Fix */}
          <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="skill-card group relative p-8 bg-neutral-900/30 border border-white/[0.05] rounded-[2rem] overflow-hidden flex flex-col justify-between min-h-[180px]"
              >
                {/* Glow on Hover */}
                <div 
                  className="absolute -right-6 -top-6 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-[40px] rounded-full"
                  style={{ backgroundColor: skill.color }}
                />

                <div className="relative z-10">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.08]"
                    style={{ color: skill.color }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-current shadow-[0_0_15px_currentColor]" />
                  </div>
                </div>

                <div className="relative z-10 mt-12">
                  <h3 className="text-white text-2xl font-medium tracking-tight mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-mono">
                    {skill.level}
                  </p>
                </div>
              </div>
            ))}

            {/* Mobile မှာပါ မြင်ရမယ့် Bento Box */}
            <div className="skill-card col-span-1 sm:col-span-2 p-8 bg-gradient-to-br from-neutral-900/40 to-transparent border border-white/[0.05] rounded-[2rem] flex items-center min-h-[180px]">
               <p className="text-white/20 text-lg md:text-xl italic font-serif leading-relaxed">
                 Constantly exploring new horizons in the digital landscape.
               </p>
            </div>
          </div>

        </div>

        {/* CSS for Subtle Noise */}
        <style jsx>{`
          section::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            opacity: 0.015;
            pointer-events: none;
          }
        `}</style>
      </section>
    </Transition>
  );
};

export default StackSection;