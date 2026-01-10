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



gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const headerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [activeMobile, setActiveMobile] = useState(null);

  const xTo = useRef();
  const yTo = useRef();
  const rotateTo = useRef();

  useGSAP(() => {
    if (window.innerWidth >= 768) {
      // 1. Mouse Follower Logic
      xTo.current = gsap.quickTo(previewRef.current, "x", { duration: 0.4, ease: "power3.out" });
      yTo.current = gsap.quickTo(previewRef.current, "y", { duration: 0.4, ease: "power3.out" });
      rotateTo.current = gsap.quickTo(previewRef.current, "rotate", { duration: 0.4, ease: "power3.out" });
    }

    // 2. Black Header Pinned Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        end: "+=100%", // Scroll အကွာအဝေး
        scrub: 1.5,
        pin: true,
        pinSpacing: true, // Header ပြီးမှ project တွေလာဖို့
      }
    });

    tl.to(".title-featured", { xPercent: -70, opacity: 0, ease: "power2.inOut" }, 0);
    tl.to(".title-projects", { xPercent: 70, opacity: 0, ease: "power2.inOut" }, 0);
    tl.to(".scroll-hint", { y: -50, opacity: 0, ease: "none" }, 0);

    // 3. Project Items Entrance (Fade up)
    gsap.from(".project-item", {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".projects-container",
        start: "top 85%",
      },
    });
  }, { scope: containerRef });

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY, movementX } = e;
    const rotation = gsap.utils.clamp(-15, 15, movementX * 0.8);

    xTo.current(clientX);
    yTo.current(clientY);
    rotateTo.current(rotation);
  };

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);
    gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    gsap.to(previewRef.current, { opacity: 0, scale: 0.5, duration: 0.4, ease: "power2.in" });
  };

  return (

    <Transition>
      <section ref={containerRef} className="bg-white select-none relative overflow-hidden">

        {/* 1. Black Pinned Header Section */}
        <div ref={headerRef} className="h-screen flex flex-col items-center justify-center relative bg-[#0f0f0f] overflow-hidden">
          <div className="flex flex-col items-center text-center leading-[0.75] z-10">
            <h2 className="title-featured text-[18vw] font-bold uppercase tracking-tighter text-white">
              Featured
            </h2>
            <h2 className="title-projects text-[18vw] font-bold uppercase tracking-tighter text-transparent stroke-text">
              Projects
            </h2>
          </div>

          {/* Scroll Hint Component */}
          <div className="scroll-hint absolute bottom-12 flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-medium">Scroll to Discover</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-white/60 to-transparent"></div>
          </div>
        </div>

        {/* 2. White Project List Section */}
        <div
          className="projects-container flex flex-col border-t border-black/10 relative z-20 bg-white"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {projects.map((project, index) => (
            <div key={project.id} className="project-item flex flex-col border-b border-black/10 group">

              {/* Project Row */}
              <div
                onClick={() => window.innerWidth < 768 && setActiveMobile(activeMobile === index ? null : index)}
                onMouseEnter={() => handleMouseEnter(index)}
                className="relative flex items-center justify-between px-6 md:px-16 py-12 md:py-24 transition-colors duration-500 cursor-pointer group-hover:text-white"
              >
                {/* Black Reveal on Hover */}
                <div className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-600 ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-y-100 -z-0" />

                <div className="flex flex-col gap-5 relative z-10">
                  <span className="text-xs md:text-sm font-mono opacity-40 group-hover:opacity-60 transition-opacity">
                    / 0{index + 1}
                  </span>
                  <h3 className="text-4xl md:text-8xl font-normal tracking-tight transition-transform duration-500 group-hover:translate-x-4 md:group-hover:translate-x-8">
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap gap-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 group-hover:translate-x-4 md:group-hover:translate-x-8">
                    {project.frameworks.map((f) => (
                      <span key={f.id} className="text-[9px] md:text-[11px] uppercase tracking-widest border border-current px-3 py-1 rounded-full">
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 transition-all duration-500 group-hover:-translate-x-4">
                  <Icon
                    icon="lucide:arrow-up-right"
                    className={`text-4xl md:text-7xl transition-transform duration-500 ${activeMobile === index ? "rotate-45" : "group-hover:rotate-45"}`}
                  />
                </div>
              </div>

              {/* Mobile View Content */}
              <div
                className={`md:hidden overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] bg-gray-50 ${activeMobile === index ? "max-h-[650px] opacity-100 border-b border-black/5" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="p-8 flex flex-col gap-8">
                  <p className="text-base text-gray-600 leading-relaxed font-light">{project.description}</p>
                  <div className="overflow-hidden rounded-xl shadow-lg">
                    <img src={project.image} alt={project.name} className="w-full h-auto scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Floating Preview (Mouse Follower) */}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 w-[500px] h-[320px] pointer-events-none z-[100] overflow-hidden rounded-2xl opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/20 hidden md:block"
        >
          <div className="relative w-full h-full bg-neutral-100">
            {projects.map((proj, i) => (
              <img
                key={i}
                src={proj.image}
                alt="preview"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${currentIndex === i ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Text Stroke for Dark Background */}
        <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
        }
        .project-item:hover .stroke-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.5);
        }
      `}</style>
      </section>
    </Transition>
  );
};

export default Work;