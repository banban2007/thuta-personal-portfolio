import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import SplitType from 'split-type';
import { useDispatch } from 'react-redux';
import { setFinished } from '../redux/slices/loaderSlice';

gsap.registerPlugin(CustomEase);

const Preloader = () => {
  const containerRef = useRef();
  const progressBarRef = useRef();
  const counterRef = useRef();
  const headerRef = useRef();
  const copyRef = useRef();
  const imagesContainerRef = useRef();
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);

  // မူရင်း image link များ
  const imageUrls = [
    "https://cdn.cosmos.so/3be2e4e2-4ba8-47c2-9bd7-6b09cc6b82e3?format=jpeg",
    "https://cdn.cosmos.so/91da03b4-8f72-40bd-9531-ce101ecb9508?format=jpeg",
    "https://cdn.cosmos.so/9dbf17e4-d4fa-4095-98dd-d6527d4bb53a?format=jpeg",
    "https://cdn.cosmos.so/bed49b37-4a4a-4cec-ac80-86f5d2edbb8d?format=jpeg",
    "https://cdn.cosmos.so/031178f7-7078-4866-9de3-c80062188a2b?format=jpeg"
  ];

  useLayoutEffect(() => {
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    const splitHeader = new SplitType(headerRef.current, { types: 'chars' });
    const splitCopy = new SplitType(copyRef.current, { types: 'lines' });

    const chars = splitHeader.chars;
    const lines = splitCopy.lines;
    const initialChar = chars[0];
    const lastChar = chars[chars.length - 1];

    gsap.set(chars, { yPercent: (i) => (i % 2 === 0 ? -120 : 120), opacity: 0 });
    gsap.set(lines, { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => dispatch(setFinished())
    });

    // 1. Percentage Counter & Progress Bar (၄ စက္ကန့်ကြာမယ်)
    const countData = { value: 0 };
    tl.to(countData, {
      value: 100,
      duration: 4,
      ease: "power3.inOut",
      onUpdate: () => setCounter(Math.round(countData.value))
    }, 0);

    tl.to(progressBarRef.current, { scaleX: 1, duration: 4, ease: "power3.inOut" }, 0);

    // 2. Images Reveal (Loading တက်နေတုန်း အလယ်မှာ ဟာမနေအောင် Stagger timing ညှိထားတာ)
    const imgs = imagesContainerRef.current.querySelectorAll('.img-wrapper');
    const innerImgs = imagesContainerRef.current.querySelectorAll('img');

    imgs.forEach((img, i) => {
      // ပုံတွေကို ၄ စက္ကန့်အတွင်း တစ်ပုံချင်း ဝင်လာအောင် timing ပေးထားပါတယ်
      tl.to(img, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "hop"
      }, i * 0.6); // <--- 0.6s စီခြားပြီး တစ်ပုံချင်းပေါ်လာမယ်
    });

    innerImgs.forEach((img, i) => {
      tl.to(img, {
        scale: 1,
        duration: 1.5,
        ease: "hop"
      }, i * 0.6);
    });

    // 3. Text Entry
    tl.to(lines, { yPercent: 0, opacity: 1, duration: 2, ease: "hop", stagger: 0.1 }, "-=1.5");
    tl.to(chars, { yPercent: 0, opacity: 1, duration: 1.2, ease: "hop", stagger: 0.02 }, "-=1.2");

    // 4. Exit Phase]
    tl.to(progressBarRef.current, { transformOrigin: 'right', scaleX: 0, duration: 1, ease: "power3.in" });
    tl.to(counterRef.current, { y: -20, opacity: 0, duration: 0.5 }, "-=0.5");

    tl.to(imagesContainerRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "hop"
    }, "-=0.8");

    tl.to(lines, { y: "-100%", opacity: 0, duration: 1, ease: "hop", stagger: 0.05 }, "-=1");

    // 5. TT Merging Logic 
    tl.to(chars, {

      yPercent: (i) => (i === 0 || i === 3 ? 0 : (i % 2 === 0 ? -120 : 120)),
      opacity: (i) => (i === 0 || i === 3 ? 1 : 0),
      duration: 1.2,
      ease: "hop",
      onStart: () => {
        const target = document.querySelector(".preloader-header-container");
        if (target) {
          gsap.set(target, { mixBlendMode: "difference" });
        }

        const centerX = window.innerWidth / 2;


        const firstChar = chars[0];

        const secondTChar = chars[3];

        const firstRect = firstChar.getBoundingClientRect();
        const secondRect = secondTChar.getBoundingClientRect();


        gsap.to(firstChar, {
          x: centerX - firstRect.left - firstRect.width - 2,
          duration: 1.2,
          ease: "hop"
        });
        gsap.to(secondTChar, {
          x: centerX - secondRect.left + 2,
          duration: 1.2,
          ease: "hop"
        });
      }
    }, "-=0.5");

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1.5,
      ease: "hop"
    }, "+=0.2");

    tl.to(".preloader-header-container", {
      top: "-5rem",
      y: 0,
      scale: 0.35,
      duration: 1.5,
      ease: "hop",
      onStart: () => gsap.set(".preloader-header-container", { mixBlendMode: "difference" })
    }, "<");

  }, []);

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 bg-[#0a0a0a] z-101 overflow-hidden">
        <div ref={progressBarRef} className="absolute top-0 left-0 w-full h-1 bg-white origin-left scale-x-0 z-102" />

        <div ref={counterRef} className="absolute top-10 right-10 text-white font-['Unbounded'] text-4xl opacity-40">
          {counter}%
        </div>

        <div ref={imagesContainerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-112 md:w-120 md:h-140">
          {imageUrls.map((url, i) => (
            <div key={i} className="img-wrapper absolute inset-0 overflow-hidden" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}>
              <img
                src={url}
                className="w-full h-full object-cover scale-[1.5] brightness-75"
                alt=""
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[80%] md:w-100 text-white/70 text-center">
          <p ref={copyRef} className="uppercase text-[0.7rem] tracking-[0.2em] leading-relaxed">
            Defining the future through minimal design and complex logic.
          </p>
        </div>
      </div>

      <div className="preloader-header-container absolute inset-x-0 top-0 h-screen flex justify-center items-center z-101 pointer-events-none origin-top">
        <h2 ref={headerRef} className="text-white font-['Unbounded'] text-5xl md:text-[8rem] font-bold uppercase tracking-[-0.05em]">
          ThuTa
        </h2>
      </div>
    </>
  );
};

export default Preloader;