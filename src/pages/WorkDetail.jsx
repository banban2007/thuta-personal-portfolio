import { useRef } from "react";
import { useParams, Link } from "react-router-dom"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { projects } from "../data"; 

gsap.registerPlugin(ScrollTrigger);

const WorkDetail = () => {
  const { id } = useParams();
  const container = useRef();
  const heroImageContainer = useRef();
  
  // URL ID နှင့် ကိုက်ညီသော Project ကိုရှာဖွေခြင်း
  const project = projects.find((p) => p.id === parseInt(id));
  
  // Next Project ရှာဖွေခြင်း (အဆုံးရောက်ရင် ပထမဆုံးတစ်ခုကို ပြန်ပြမယ်)
  const nextProjectId = project && project.id < projects.length ? project.id + 1 : 1;
  const nextProject = projects.find(p => p.id === nextProjectId);

  useGSAP(() => {
    if (!project) return;

gsap.to(heroImageContainer.current, {
      scale: 0.8,
      borderRadius: "40px",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true, // ပုံက screen မှာ ကပ်နေအောင် pin လုပ်ထားမယ်
      }
    });

    // စာလုံး (Title) ကို Scroll ဆွဲရင် အပေါ်ကို ဖြည်းဖြည်းချင်း လွင့်တက်သွားအောင် လုပ်မယ်
    gsap.to(".hero-title", {
      y: -150,
      opacity: 0,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom 40%",
        scrub: true,
      }
    });

    // ၂။ Text Reveal Animation
    gsap.from(".reveal-text", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".content-section",
        start: "top 80%",
      }
    });

    // ၃။ Horizontal Scroll Gallery
    // Gallery ကို ဘေးတိုက် Scroll ဆွဲတဲ့ Animation
    const galleryItems = gsap.utils.toArray(".gallery-item");
    gsap.to(galleryItems, {
      xPercent: -100 * (galleryItems.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".gallery-wrapper",
        pin: true,
        scrub: 1,
        // Gallery အရေအတွက်ပေါ်မူတည်ပြီး scroll length ကို ချိန်ညှိနိုင်သည်
        end: () => `+=${document.querySelector(".gallery-inner").offsetWidth}`,
      }
    });
  }, { scope: container, dependencies: [id] });

  if (!project) return <div className="h-screen flex items-center justify-center text-white bg-black">Project not found</div>;

  return (
    <div ref={container} className="bg-[#0a0a0a] text-white overflow-x-hidden">
      
<section className="hero-section h-screen w-full relative flex items-center justify-center overflow-hidden">
        
        {/* ပုံကို Wrapper တစ်ခုထဲ ထည့်လိုက်တာက Animation လုပ်ရတာ ပိုငြိမ်ပါတယ် */}
        <div 
          ref={heroImageContainer} 
          className="w-full h-full overflow-hidden relative"
        >
          <img 
            src={project.image} 
            className="w-full h-full object-cover filter brightness-[0.5]" 
            alt={project.name} 
          />
        </div>

        {/* Title စာသားကို အလယ်မှာ တင်ထားမယ် */}
        <div className="hero-title absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
            <h1 className="text-[12vw] font-bold uppercase mix-blend-difference text-center leading-[0.85] tracking-tighter">
                {project.name}
            </h1>
            
            {/* အောက်နားမှာ Year နဲ့ Role လေးကို အလှပြထားချင်ရင် */}
            <div className="mt-10 flex gap-10 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-60">
                <p>Year: {project.year}</p>
                <p>Role: {project.role}</p>
            </div>
        </div>

        {/* Scroll Indicator (Optional) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-40">
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section min-h-screen px-6 py-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        <div>
          <h2 className="reveal-text text-5xl font-serif italic text-neutral-400 mb-10">Concept</h2>
          <p className="reveal-text text-xl leading-relaxed opacity-70">
            {project.description} {project.fullText || "Our approach focused on creating a seamless and immersive digital experience."}
          </p>
        </div>
        <div className="flex items-end">
           <div className="reveal-text border-l border-white/20 pl-10 space-y-8">
              <div>
                <span className="block text-sm uppercase tracking-widest opacity-40 mb-2">Role</span>
                <p className="text-2xl font-light">{project.role || "Full Stack Development"}</p>
              </div>
              <div>
                <span className="block text-sm uppercase tracking-widest opacity-40 mb-2">Tech Stack</span>
                <div className="flex flex-wrap gap-2">
                    {project.frameworks.map(f => (
                        <span key={f.id} className="text-xs border border-white/20 px-3 py-1 rounded-full">{f.name}</span>
                    ))}
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Horizontal Gallery Section */}
      <section className="gallery-wrapper h-screen bg-white text-black flex items-center overflow-hidden">
        <div className="gallery-inner flex gap-10 px-20">
          {/* သင်ပြောင်းလဲလိုသော Gallery ပုံများကို ဒီနေရာမှာ Dynamic ထည့်နိုင်ပါတယ်။ 
            လောလောဆယ် Placeholder ၃ ခု ထည့်ပေးထားပါတယ်။
          */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="gallery-item w-[80vw] md:w-[600px] h-[60vh] md:h-[400px] flex-shrink-0">
               <img 
                 src={i === 1 ? project.image : `/projects/detail-${i}.jpg`} 
                 className="w-full h-full object-cover rounded-3xl shadow-2xl" 
                 alt="Gallery detail"
                 onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Project+Detail"; }}
               />
            </div>
          ))}
        </div>
      </section>

      {/* Footer / Next Project Navigation */}
      <footer className="h-screen flex flex-col items-center justify-center border-t border-white/10 relative overflow-hidden group">
         <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
            <img src={nextProject?.image} className="w-full h-full object-cover" alt="next preview" />
         </div>
         
         <span className="text-sm uppercase tracking-[0.5em] opacity-40 mb-10 z-10">Next Project</span>
         <Link 
            to={`/project/${nextProject?.id}`} 
            className="text-[10vw] md:text-[8vw] font-bold hover:italic transition-all duration-500 z-10 text-center leading-none"
         >
            {nextProject?.name}
         </Link>
         
         <div className="mt-10 z-10 animate-bounce">
            <Icon icon="ph:arrow-down-light" className="text-4xl opacity-20" />
         </div>
      </footer>
    </div>
  );
};

export default WorkDetail;