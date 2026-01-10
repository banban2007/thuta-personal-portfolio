import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Transition from "../components/Transition";
gsap.registerPlugin(ScrollTrigger);

export default function Identity() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const bigTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ၁။ စာသား Reveal Animation
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 85%",
        },
      });

      // ၂။ Image Parallax Effect
      gsap.to(imageRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // ၃။ Background Scrolling Text (Marquee)
      gsap.to(bigTextRef.current, {
        x: -500,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Transition>

    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#f1f1f1] py-24 overflow-hidden"
    >
      {/* Background Big Text */}
      <h1
        ref={bigTextRef}
        className="absolute top-20 left-0 text-[20vw] font-black text-black/5 whitespace-nowrap uppercase leading-none pointer-events-none"
      >
        Identity Design Creative Identity
      </h1>

      <div className="container mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Content */}
        <div className="relative z-10">
          <h4 className="text-[#e11010] font-bold uppercase tracking-widest mb-4 reveal-text">
            01. Who am I
          </h4>
          <h2 className="text-5xl lg:text-7xl font-bold text-[#1e1e1e] leading-[1.1] mb-8 reveal-text">
            I craft digital <br />
            <span className="italic font-light">identities</span> that <br />
            stand out.
          </h2>
          <p className="text-lg text-[#1e1e1e]/70 max-w-md leading-relaxed reveal-text">
            We believe that every brand has a unique story. My job is to translate 
            that story into a visual language that resonates with your audience 
            and leaves a lasting impression.
          </p>
          
          <div className="mt-12 reveal-text">
            <button className="group relative px-8 py-4 border border-[#1e1e1e] overflow-hidden">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500 uppercase font-bold text-sm">View Projects</span>
                <div className="absolute inset-0 bg-[#1e1e1e] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>
        </div>

        {/* Right Side: Image with Parallax */}
        <div className="relative flex justify-center mt-10 md:mt-0 lg:justify-end">
          <div 
            ref={imageRef}
            className="w-full max-w-[450px] aspect-3/4  overflow-hidden shadow-2xl"
          >
            <img 
              src='/human-2.jpg'
              alt="Identity" 
              className="w-full h-full object-contain scale-110 py-15"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#fca311] -z-10 hidden lg:block"></div>
        </div>
      </div>

     
    </section>
    </Transition>
  );
}