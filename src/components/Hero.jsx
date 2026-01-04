import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { useSelector } from 'react-redux';

const Hero = () => {
  const isFinished = useSelector((state) => state.loader.isFinished);
  const sectionRef = useRef();

  useLayoutEffect(() => {
    if (!isFinished) return;

    const titles = sectionRef.current.querySelectorAll('.hero-title');

    titles.forEach(title => {
      const split = new SplitType(title, { types: 'chars' });
      gsap.fromTo(split.chars,
        { y: 150, skewY: 7 },
        {
          y: 0,
          skewY: 0,
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.03,
          delay: 0.2
        }
      );
    });

    gsap.to(".hero-divider", {
      scaleX: 1,
      duration: 2,
      ease: "power4.inOut",
      stagger: 0.3
    });

  }, [isFinished]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-white flex flex-col justify-end px-6 md:px-16 pb-12 md:pb-20 overflow-hidden">

      {/* Row 1 */}
      <div className="relative mb-8 md:mb-12">
        <div className="hero-divider w-full h-px bg-black/10 scale-x-0 origin-left mb-4 md:mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-40 order-2 md:order-1">(01) SELECTED WORKS</span>
          <h1 className="hero-title text-[clamp(2.2rem,12vw,9vw)] leading-[0.8] font-black uppercase tracking-[-0.07em] order-1 md:order-2">
            INTERACTIVE
          </h1>
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative">
        <div className="hero-divider w-full h-px bg-black/10 scale-x-0 origin-left mb-4 md:mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <h1 className="hero-title text-[clamp(2.2rem,12vw,9vw)] leading-[0.8] font-black uppercase tracking-[-0.07em]">
            DEVELOPER
          </h1>

          <p className="max-w-45 md:max-w-55 text-[9px] md:text-[10px] uppercase text-left md:text-right leading-relaxed opacity-60 tracking-wider">
            Focusing on the intersection of <br className="hidden md:block" />
            logic, aesthetics, and user experience.
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] pointer-events-none select-none">
        <h3 className="text-[40vw] md:text-[25vw] font-black uppercase tracking-tighter leading-none">
          2026
        </h3>
      </div>
    </section>
  );
};

export default Hero;