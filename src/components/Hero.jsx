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
    <section ref={sectionRef} className="relative w-full h-screen bg-white flex flex-col justify-end px-6 md:px-16 pb-12 md:pb-20 overflow-hidden">

      {/* Row 1 */}
      <div className="relative mb-8 md:mb-12">
        <div className="hero-divider w-full h-px bg-black/20 scale-x-0 origin-left mb-4 md:mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
          <span className="hero-subtext opacity-40 text-[10px] md:text-xs uppercase tracking-[0.3em] order-2 md:order-1">(01) SELECTED WORKS</span>
          <div className="overflow-hidden order-1 md:order-2"> {/* Masking အတွက် div ခံထားပါတယ် */}
            <h1 className="hero-title text-[clamp(2.2rem,12vw,9vw)] leading-[0.8] font-black uppercase tracking-[-0.07em]">
              INTERACTIVE
            </h1>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative">
        <div className="hero-divider w-full h-px bg-black/20 scale-x-0 origin-left mb-4 md:mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="overflow-hidden">
            <h1 className="hero-title text-[clamp(2.2rem,12vw,9vw)] leading-[0.8] font-black uppercase tracking-[-0.07em]">
              DEVELOPER
            </h1>
          </div>

          <p className="hero-subtext max-w-45 md:max-w-55 text-[9px] md:text-[10px] uppercase text-left md:text-right leading-relaxed tracking-wider">
            Focusing on the intersection of <br className="hidden md:block" />
            logic, aesthetics, and user experience.
          </p>
        </div>
      </div>


    </section>
  );
};

export default Hero;