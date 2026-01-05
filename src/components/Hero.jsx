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
    const dividers = sectionRef.current.querySelectorAll('.hero-divider');
    const subtexts = sectionRef.current.querySelectorAll('.hero-subtext');
    const bgText = sectionRef.current.querySelector('.hero-bg-text');

    const tl = gsap.timeline({ delay: 0.2 });

    // 1. Divider Lines - ဘယ်ကနေ ညာကို လှလှပပ ပြေးသွားမယ်
    tl.to(dividers, {
      scaleX: 1,
      duration: 1.5,
      ease: "expo.inOut",
      stagger: 0.2
    });

    // 2. Titles Animation - Masking effect နဲ့ အောက်ကနေ အပေါ်ကို တက်လာမယ်
    titles.forEach(title => {
      const split = new SplitType(title, { types: 'chars, words' });

      tl.fromTo(split.chars,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.02
        },
        "-=1.2" // dividers နဲ့ တစ်ပြိုင်တည်းနီးပါး သွားအောင်
      );
    });

    // 3. Subtexts (Numbers & Paragraph) - Fade in ဖြစ်ရင်း အပေါ်ကို နည်းနည်းတက်လာမယ်
    tl.fromTo(subtexts,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 0.5,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1
      },
      "-=0.8"
    );

    // 4. Background Decorative Text - အရမ်းနှေးတဲ့ Scale up animation
    tl.fromTo(bgText,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 0.03,
        duration: 2.5,
        ease: "expo.out"
      },
      "0"
    );

  }, [isFinished]);


  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#f8f8f8] flex flex-col justify-between px-5 md:px-12 pt-24 pb-10 md:pb-16 overflow-hidden">

      <div className="absolute top-1/4 left-0 md:top-1/2 md:left-[55%] md:-translate-x-1/2 md:-translate-y-1/2 w-full pointer-events-none z-0">
        <h2 className="hero-bg-text text-[30vw] md:text-[25vw] font-black text-black/[0.03] leading-none uppercase tracking-tighter">
          Studio
        </h2>
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <div className="hero-divider w-full h-[1px] bg-black/10 scale-x-0 origin-left mb-2" />
        <div className="flex justify-between items-center hero-subtext opacity-60 text-[10px] uppercase font-bold tracking-widest">
          <span>Based in Myanmar</span>
          <span>Available for freelance</span>
        </div>
      </div>


      <div className="relative z-10 w-full flex flex-col gap-8 md:gap-0">

        {/* Row 1 */}
        <div className="w-full">
          <div className="hero-divider w-full h-[1px] bg-black/10 scale-x-0 origin-left mb-4 md:mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
            <div className="overflow-hidden order-1">
              <h1 className="hero-title text-[15vw] md:text-[9.5vw] leading-[0.8] font-black uppercase tracking-tighter">
                INTERACTIVE
              </h1>
            </div>
            <span className="hero-subtext text-[10px] md:text-xs uppercase tracking-widest order-2 font-bold opacity-40">
              (01) SELECTED WORKS
            </span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="w-full md:mt-10">
          <div className="hero-divider w-full h-[1px] bg-black/10 scale-x-0 origin-left mb-4 md:mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-10">
            <div className="overflow-hidden">
              <h1 className="hero-title text-[15vw] md:text-[9.5vw] leading-[0.8] font-black uppercase tracking-tighter">
                DEVELOPER
              </h1>
            </div>

            <p className="hero-subtext max-w-[240px] md:max-w-xs text-[11px] md:text-[12px] uppercase leading-relaxed tracking-wider font-medium text-left md:text-right opacity-60">
              Focusing on the intersection of logic, aesthetics, and user experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;