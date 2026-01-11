import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Transition from "../components/Transition";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: "Mobile Accessories E-commerce",
    description:
      "An online store specializing in phone accessories including cases, chargers, cables, and power banks with MagSafe compatibility.",
    href: "",
    image: "/projects/mobile-accessories-store.jpg",
    bgImage: "/backgrounds/blanket.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 2,
    name: "Plant Shop E-commerce",
    description:
      "An online store specializing in rare and decorative plants with a clean, user-friendly interface.",
    href: "",
    image: "/projects/plant-shop.jpg",
    bgImage: "/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "Stripe API" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "Apple Tech Marketplace",
    description:
      "An e-commerce platform for Apple products and accessories with deals and category filtering.",
    href: "",
    image: "/projects/apple-tech-store.jpg",
    bgImage: "/backgrounds/map.jpg",
    frameworks: [
      { id: 1, name: "Blazor" },
      { id: 2, name: "ASP.NET Core" },
      { id: 3, name: "SQL Server" },
      { id: 4, name: "Bootstrap" },
    ],
  },
  {
    id: 4,
    name: "Electronics & Gadgets Store",
    description:
      "A multi-category online shop featuring electronics, home appliances, and gaming gear with special offers.",
    href: "",
    image: "/projects/electronics-store.jpg",
    bgImage: "/backgrounds/poster.jpg",
    frameworks: [
      { id: 1, name: "Vue.js" },
      { id: 2, name: "Laravel" },
      { id: 3, name: "MySQL" },
      { id: 4, name: "SCSS" },
    ],
  },
  {
    id: 5,
    name: "Home Decor Marketplace",
    description:
      "A curated collection of designer home decor items, including furniture and artisan vases.",
    href: "",
    image: "/projects/home-decor-store.jpg",
    bgImage: "/backgrounds/table.jpg",
    frameworks: [
      { id: 1, name: "Angular" },
      { id: 2, name: "Firebase" },
      { id: 3, name: "GraphQL" },
      { id: 4, name: "Material UI" },
    ],
  },
  {
    id: 6,
    name: "Digital Game Store",
    description:
      "A gaming platform featuring discounted titles, top sellers, and genre-based browsing.",
    href: "",
    image: "/projects/game-store.jpg",
    bgImage: "/backgrounds/curtains.jpg",
    frameworks: [
      { id: 1, name: "Svelte" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Chakra UI" },
    ],
  },
]



const Work = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const previewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const xTo = useRef();
  const yTo = useRef();

  useGSAP(() => {
    // 1. Mouse Follower (Desktop Only)
    if (window.innerWidth >= 768) {
      xTo.current = gsap.quickTo(previewRef.current, "x", { duration: 0.5, ease: "power3" });
      yTo.current = gsap.quickTo(previewRef.current, "y", { duration: 0.5, ease: "power3" });
    }

    // 2. Simple Header Animation
    // Scroll ဆွဲရင် စာသားက အပေါ်ကို အနည်းငယ် တက်သွားပြီး မှိန်သွားမယ်
    gsap.to(".header-text", {
      y: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: true,
      }
    });

    // 3. Projects Container Reveal (Smooth Fade In)
    gsap.from(".projects-container", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".projects-container",
        start: "top 90%",
      }
    });

  }, { scope: containerRef });

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    xTo.current(e.clientX);
    yTo.current(e.clientY);
  };

  return (
    <Transition>
      <section ref={containerRef} className="bg-white select-none">

        {/* --- Refined Minimalist Header --- */}
        <div
          ref={headerRef}
          className="h-[75vh] flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6 relative overflow-hidden"
        >
          <div className="absolute top-10 left-10 opacity-[0.03] select-none pointer-events-none hidden md:block">
            <span className="text-9xl font-black">CREATIVE</span>
          </div>

          <div className="header-text w-full max-w-6xl relative">
            {/* အပေါ်က Label အပိုင်း */}
            <div className="flex items-center gap-4 mb-8 opacity-40 overflow-hidden">
              <div className="w-12 h-[1px] bg-white"></div>
              <p className="text-[10px] md:text-xs font-mono tracking-[0.5em] uppercase">
                Available for Freelance
              </p>
            </div>

            {/* Main Title - Font weight ကို ကစားထားပါတယ် */}
            <h1 className="text-[15vw] md:text-[11vw] font-light leading-[0.85] tracking-tighter">
              Selected <br />
              <span className="font-serif italic text-neutral-400">Projects</span>
            </h1>

            {/* အောက်ဘက်က အချက်အလက်လေးတွေ */}
            <div className="flex justify-between items-end mt-16">
              <div className="max-w-[200px] hidden md:block">
                <p className="text-[10px] leading-relaxed opacity-30 uppercase tracking-widest">
                  A collection of digital experiences crafted with focus on aesthetics and function.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[9px] uppercase tracking-[0.3em] opacity-20">Scroll</span>
                  {/* ရိုးရိုး Icon အစား Line လေးနဲ့ ပိုပြီး Clean ဖြစ်အောင် လုပ်ထားပါတယ် */}
                  <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line"></div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <p className="text-xs font-mono opacity-20">© 2024</p>
              </div>
            </div>
          </div>

          <style jsx>{`
    @keyframes scroll-line {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    .animate-scroll-line {
      animation: scroll-line 2s infinite cubic-bezier(0.19, 1, 0.22, 1);
    }
  `}</style>
        </div>

        {/* --- Project List Section --- */}
        <div
          className="projects-container relative z-20 bg-white"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => gsap.to(previewRef.current, { opacity: 0, scale: 0.5 })}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => {
                setCurrentIndex(index);
                gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.3 });
              }}
              className="group border-b border-black/10"
            >
              <div className="relative flex items-center justify-between px-6 md:px-20 py-12 md:py-24 cursor-pointer overflow-hidden transition-colors duration-500 hover:text-white">
                {/* Hover Background Reveal */}
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

                <div className="relative z-10 flex flex-col gap-3">
                  <span className="text-xs font-mono opacity-40 group-hover:opacity-60">/ 0{index + 1}</span>
                  <h3 className="text-4xl md:text-7xl font-normal tracking-tight">
                    {project.name}
                  </h3>
                </div>

                <Icon
                  icon="lucide:arrow-up-right"
                  className="relative z-10 text-3xl md:text-5xl opacity-20 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* --- Image Preview (Desktop Only) --- */}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 w-[400px] h-[260px] pointer-events-none z-[100] opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-2xl hidden md:block"
        >
          {projects.map((proj, i) => (
            <img
              key={i}
              src={proj.image}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${currentIndex === i ? "opacity-100" : "opacity-0"}`}
              alt=""
            />
          ))}
        </div>

      </section>
    </Transition>
  );
};

export default Work;