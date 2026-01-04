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
    <section ref={sectionRef} className="relative w-full h-screen bg-white flex flex-col justify-end px-6 md:px-16 pb-20 overflow-hidden">
      
      {/* Row 1 */}
      <div className="relative mb-12">
        <div className="hero-divider w-full h-[1px] bg-black/10 scale-x-0 origin-left mb-6" />
        <div className="flex justify-between items-end">
          <span className="text-xs uppercase tracking-widest opacity-50 mb-4">(01) Selected Works</span>
          <h1 className="hero-title text-[12vw] md:text-[9vw] leading-[0.85] font-black uppercase tracking-tighter">
            A Vision
          </h1>
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative">
        <div className="hero-divider w-full h-[1px] bg-black/10 scale-x-0 origin-left mb-6" />
        <div className="flex justify-between items-end">
          <h1 className="hero-title text-[12vw] md:text-[9vw] leading-[0.85] font-black uppercase tracking-tighter">
            Dorian Valez
          </h1>
          <p className="max-w-[200px] text-[10px] uppercase text-right leading-relaxed opacity-60 mb-2 hidden md:block">
            Based in Paris, France. <br /> Specialist in Abstract Motion & Still Art.
          </p>
        </div>
      </div>

      {/* Background Decorative Text (Optional) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.02] pointer-events-none select-none">
        <h3 className="text-[30vw] font-black uppercase">2026</h3>
      </div>
    </section>
  );
};

export default Hero;