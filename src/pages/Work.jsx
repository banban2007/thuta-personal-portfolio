import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const itemsRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [ activeMobile , setActiveMobile ] = useState(null);

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


  // const mouse = useRef({ x: 0, y: 0 });
  const xTo = useRef();
  const yTo = useRef();
  const rotateTo = useRef();

  useGSAP(() => {

    if (window.innerWidth < 768) return 

    // 1. Floating Preview Follower Logic
    xTo.current = gsap.quickTo(previewRef.current, "x", { duration: 0.8, ease: "power3" });
    yTo.current = gsap.quickTo(previewRef.current, "y", { duration: 0.8, ease: "power3" });
    rotateTo.current = gsap.quickTo(previewRef.current, "rotate", { duration: 0.8, ease: "power3" });

    const items = gsap.utils.toArray(".project-item");
    items.forEach((item, index) => {
      ScrollTrigger.create({
        trigger:  item,
        start: "top center",
        end:  "bottom center",
        onToggle: (self) => {
          if(self.isActive){
            setCurrentIndex(index)
            gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.3})
          }
        }
      })
    })

    // 2. Entrance Animation on Scroll
    gsap.from(".project-item", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY, movementX } = e;

    // Mouse လှုပ်ရှားမှုအပေါ်မူတည်ပြီး ပုံလေးကို Tilt ဖြစ်စေတာ
    const rotation = movementX * 0.5;

    xTo.current(clientX);
    yTo.current(clientY);
    rotateTo.current(gsap.utils.clamp(-15, 15, rotation));
  };

const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);
    gsap.to(previewRef.current, { 
      opacity: 1, 
      scale: 1, 
      duration: 0.4, 
      ease: "power2.out" 
    });
  };

  const handleToggleMobile = (index) => {
    if (window.innerWidth >= 768) return;
    setActiveMobile(activeMobile === index ? null : index);
  };

 const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    // Mouse ထွက်ရင် currentIndex ကို ချက်ချင်း null မလုပ်သေးဘဲ 
    // Animation ပြီးမှ ဖျောက်ချင်ရင် duration နဲ့ ချိန်လို့ရပါတယ်
    gsap.to(previewRef.current, { 
      opacity: 0, 
      scale: 0.5, 
      duration: 0.4, 
      ease: "power2.in",
      onComplete: () => setCurrentIndex(null) // Animation ပြီးမှ index ကို null လုပ်မယ်
    });
  };

  return (
   <section ref={containerRef} className="py-20 bg-white select-none">
      <div className="px-10 mb-20">
        <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-2">Selected Works</h4>
        <h2 className="text-6xl font-medium tracking-tighter">Featured Projects</h2>
      </div>

      <div className="flex flex-col border-t border-black/10" onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
        {projects.map((project, index) => (
          <div key={project.id} className="project-item flex flex-col border-b border-black/10 overflow-hidden" >
            {/* Project Header - Desktop Hover & Mobile Click */}
            <div
              onClick={() => handleToggleMobile(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              className="relative group flex items-center justify-between px-10 py-12 transition-colors duration-500 hover:text-white cursor-pointer"
            >
              {/* Background Hover Reveal */}
              <div className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:md:scale-y-100 -z-10" />

              <div className="flex flex-col gap-2 relative z-10 pointer-events-none">
                <h3 className="text-4xl md:text-7xl font-light tracking-tight transition-transform duration-500 group-hover:md:translate-x-4">
                  {project.name}
                </h3>
                <div className="flex gap-4 opacity-60">
                  {project.frameworks.map((f, i) => (
                    <span key={f.id} className="text-[10px] md:text-xs uppercase tracking-widest">{f.name}</span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 transition-transform duration-500 group-hover:md:-translate-x-4">
                <Icon icon="lucide:arrow-up-right" className={`text-4xl transition-transform ${activeMobile === index ? "rotate-90" : ""}`} />
              </div>
            </div>

            {/* Mobile View - Dropdown Content */}
            <div 
              className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-gray-50 ${
                activeMobile === index ? "max-h-[500px] border-b border-black/5" : "max-h-0"
              }`}
            >
              <div className="p-8 flex flex-col gap-6">
                <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
                <img src={project.image} alt={project.name} className="w-full rounded-lg shadow-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Floating Preview */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 w-[400px] h-[280px] pointer-events-none z-[100] overflow-hidden rounded-xl opacity-0 scale-50 -translate-x-1/2 -translate-y-1/2 shadow-2xl border-2 border-white/50 md:block hidden"
      >
        <div className="relative w-full h-full bg-gray-100">
          {projects.map((proj, i) => (
            <img
              key={i}
              src={proj.image}
              alt="preview"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                currentIndex === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;