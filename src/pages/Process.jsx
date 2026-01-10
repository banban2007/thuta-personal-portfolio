import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Transition from '../components/Transition';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  const steps = [
    {
      id: "01",
      title: "Understanding the Problem",
      points: ["Clarify requirements", "Ask questions", "Identify edge cases", "Understand business goal"],
      signal: "Thinking before coding",
      bgText: "STRATEGY"
    },
    {
      id: "02",
      title: "Planning & Breakdown",
      points: ["Feature breakdown", "Choose suitable tech", "Estimate effort", "Define success criteria"],
      signal: "Organized, not random coder",
      bgText: "PLANNING"
    },
    {
      id: "03",
      title: "Design & Architecture",
      points: ["Component structure", "State management decisions", "Folder structure", "Reusability & readability"],
      signal: "Maintainable code",
      bgText: "STRUCTURE"
    },
    {
      id: "04",
      title: "Build & Iterate",
      points: ["Implement core features first", "Refactor when needed", "Follow best practices", "Keep code clean"],
      signal: "Professional workflow",
      bgText: "EXECUTION"
    },
    {
      id: "05",
      title: "Testing & Quality",
      points: ["Manual testing", "Edge case handling", "Responsive & cross-browser checks", "Fix bugs early"],
      signal: "Quality mindset",
      bgText: "INTEGRITY"
    },
    {
      id: "06",
      title: "Communication & Collaboration",
      points: ["Share progress regularly", "Ask for feedback", "Use Git properly (PRs, commits)", "Document when needed"],
      signal: "Team player",
      bgText: "SYNERGY"
    },
    {
      id: "07",
      title: "Delivery & Improvement",
      points: ["Deploy & monitor", "Collect feedback", "Learn and apply improvements"],
      signal: "Growth mindset",
      bgText: "EVOLVE"
    }
  ];

  useEffect(() => {
    const sections = sectionRefs.current;

    sections.forEach((section, i) => {
      const content = section.querySelector('.content-box');
      const bgTitle = section.querySelector('.bg-title');

      // အလယ်က content တွေ ပေါ်လာတဲ့ animation
      gsap.fromTo(content,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          }
        }
      );

      // အနောက်က စာလုံးကြီးတွေ ဘေးတိုက်ပြေးတဲ့ animation (Parallax)
      gsap.to(bgTitle, {
        xPercent: -20,
        scrollTrigger: {
          trigger: section,
          scrub: 0.5,
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <Transition>
      <div ref={containerRef} className="bg-[#0a0a0a] text-white">

        {/* Intro Header */}
        <div className="h-[60vh] flex flex-col justify-center px-8 md:px-24">
          <h1 className="text-[15vw] font-black leading-none opacity-10">PROCESS</h1>
          <p className="text-2xl md:text-4xl font-light max-w-3xl -mt-10 md:-mt-20 z-10">
            A professional workflow designed for <span className="text-[#e11010] font-bold">scalability</span> and <span className="text-[#e11010] font-bold">reliability</span>.
          </p>
        </div>

        {/* Process Sections */}
        {steps.map((step, i) => (
          <section
            key={i}
            ref={el => sectionRefs.current[i] = el}
            className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/5"
          >
            {/* Background Large Text */}
            <h2 className="bg-title absolute text-[30vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
              {step.bgText}
            </h2>

            {/* Main Content Card */}
            <div className="content-box relative z-10 w-full max-w-4xl px-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#e11010] font-mono text-xl">{step.id} —</span>
                <span className="h-[1px] w-12 bg-[#e11010]/50"></span>
              </div>

              <h3 className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-none">
                {step.title}
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-4">
                  {step.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-lg md:text-xl opacity-70">
                      <span className="w-1.5 h-1.5 bg-[#e11010] rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="bg-white/5 backdrop-blur-sm p-6 border-l-2 border-[#e11010]">
                  <p className="text-xs uppercase tracking-widest opacity-40 mb-2 font-bold">Professional Signal</p>
                  <p className="text-xl md:text-2xl font-medium text-white/90 italic">
                    "{step.signal}"
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Closing */}
        <div className="h-screen flex flex-col items-center justify-center text-center px-8">
          <h2 className="text-5xl md:text-8xl font-black mb-10 uppercase">
            Let's build<br />something great
          </h2>

          <a
            href="mailto:your@email.com"
            className="group relative px-12 py-5 border border-white/20 overflow-hidden rounded-full text-xl font-bold uppercase tracking-widest"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Send an Inquiry
            </span>

            {/* Hover Background */}
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </a>
        </div>

      </div>
    </Transition>
  );
};

export default Process;