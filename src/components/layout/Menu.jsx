import { useRef, useEffect, useTransition } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../../redux/slices/menuSlice";
import gsap from "gsap";
import MenuLink from "./MenuLink";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Hover from "../Hover";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  
  const activeLinkRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const linksWrapperRef = useRef(null);
  const highlighterRef = useRef(null);

  const isOpen = useSelector((state) => state.menu.isOpen);
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const state = useRef({
    currentX: 0, targetX: 0,
    currHighX: 0, targetHighX: 0,
    currHighW: 0, targetHighW: 0,
    lerp: 0.08
  });

  // RAF Loop (Parallax & Highlighter)
  useEffect(() => {
    let raf;
    const animate = () => {
      const s = state.current;
      s.currentX += (s.targetX - s.currentX) * s.lerp;
      s.currHighX += (s.targetHighX - s.currHighX) * s.lerp;
      s.currHighW += (s.targetHighW - s.currHighW) * s.lerp;

      if (linksWrapperRef.current) {
        gsap.set(linksWrapperRef.current, { x: s.currentX });
      }
      if (highlighterRef.current) {
        gsap.set(highlighterRef.current, { x: s.currHighX, width: s.currHighW });
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Menu Open/Close Animations
  useEffect(() => {
    if (isOpen) {
      if (activeLinkRef.current && linksWrapperRef.current) {
        const rect = activeLinkRef.current.getBoundingClientRect();
        const wrapperRect = linksWrapperRef.current.getBoundingClientRect();
        state.current.targetHighX = rect.left - wrapperRect.left;
        state.current.targetHighW = activeLinkRef.current.offsetWidth;
        state.current.currHighX = state.current.targetHighX;
        state.current.currHighW = state.current.targetHighW;
      }

      // containerRef animation ကို ဖယ်ထုတ်လိုက်သည်

      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.25, ease: "expo.out"
      });

      gsap.to(contentRef.current, { y: "0%", opacity: 1, duration: 1.5, ease: "expo.out", delay: 0.2 });
      gsap.to(".menu-link", { y: 0, duration: 1.25, stagger: 0.1, ease: "expo.out", delay: 0.3 });
      gsap.to(highlighterRef.current, { opacity: 1, duration: 1 });

    } else {
      // containerRef animation ကို ဖယ်ထုတ်လိုက်သည်

      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25, ease: "expo.out",
        onComplete: () => {
          state.current.targetX = 0;
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" });
          }
        }
      });
    }
  }, [isOpen]);

  // Mouse Parallax Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isOpen || window.innerWidth < 1000) return;
      if (!linksWrapperRef.current) return;
      const percentage = e.clientX / window.innerWidth;
      const maxMove = linksWrapperRef.current.offsetWidth - window.innerWidth + 500;
      state.current.targetX = 100 + percentage * (-maxMove + 100);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  const updateHighlighter = (linkEl) => {
    if (!linksWrapperRef.current) return;
    const rect = linkEl.getBoundingClientRect();
    const wrapperRect = linksWrapperRef.current.getBoundingClientRect();
    state.current.targetHighX = rect.left - wrapperRect.left;
    state.current.targetHighW = linkEl.offsetWidth;
  };

  const resetHighlighter = () => {
    if (activeLinkRef.current && linksWrapperRef.current) {
      const rect = activeLinkRef.current.getBoundingClientRect();
      const wrapperRect = linksWrapperRef.current.getBoundingClientRect();
      state.current.targetHighX = rect.left - wrapperRect.left;
      state.current.targetHighW = activeLinkRef.current.offsetWidth;
    }
  };

  const handleClick = (href) => {
    if (isPending) return;
    dispatch(toggleMenu());
    
    gsap.to("#transition-curtain", {
      y: "0%",
      duration: 0.6, 
      ease: "power3.inOut",
      onComplete: () => {
        startTransition(() => {
          navigate(href);
        });
      }
    });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full flex justify-between p-8 z-[100] uppercase font-bold text-sm transition-colors duration-500 
        ${isOpen ? "text-white" : "text-[#1e1e1e]"}`}>
        <Hover
          text={isOpen ? "Close" : "Menu"}
          onClick={() => dispatch(toggleMenu())}
        />
        <div className="flex items-center justify-center gap-2">
          <Hover text="write" />
          <svg width="12" height="12"><rect width="12" height="12" fill="currentColor" /></svg>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div ref={overlayRef} className="fixed inset-0 bg-[#1e1e1e] text-[#fca311] z-50 overflow-hidden select-none flex flex-col-reverse" style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}>
        <div ref={contentRef} className="relative lg:absolute -top-5 lg:top-[50%] lg:-translate-y-1/2 w-full px-8 lg:px-16 lg:pt-0 flex justify-between items-start opacity-0">
          <div className="flex flex-col gap-1 text-[0.65rem] lg:text-[0.8rem] font-bold uppercase">
             <Link to="/" className="flex justify-start w-full pb-2">
               <Hover text="ThuTa" className="text-xs" />
             </Link>
             <p className="text-xs">Mail</p>
             <a href="mailto:thuta@gmail.com" className="flex justify-start w-full pb-2">
               <Hover text="thuta@gmail.com" className="text-xs" />
             </a>
          </div>

          <div className="hidden lg:block w-40 aspect-[3/4] relative opacity-80">
            <img src="/assets/hero.jpeg" alt="hero" className="w-full h-full object-contain" />
          </div>

          <div className="flex flex-col gap-0.5 text-right text-[0.65rem] lg:text-[0.8rem] font-bold uppercase">
             {["Facebook", "Telegram", "Behance"].map(social => (
               <a key={social} href={`#${social}`} className="flex justify-end w-full">
                 <Hover text={social} className="text-xs" />
               </a>
             ))}
          </div>
        </div>

        <div className="mt-auto mb-12 lg:mb-0 lg:absolute lg:bottom-0 lg:left-0 w-full p-8 overflow-hidden">
          <div ref={linksWrapperRef} className="flex flex-col lg:flex-row gap-2 lg:gap-12 w-max relative" onMouseLeave={resetHighlighter}>
            {[
              ["/", "Index"],
              ["/identity", "Identity"],
              ["/work", "Work"],
              ["/journey", "Journey"],
              ["/stack", "Stack"],
            ].map(([href, text]) => (
              <MenuLink
                key={href}
                href={href}
                text={text}
                isActive={pathname === href}
                onMouseEnter={updateHighlighter}
                setActiveRef={activeLinkRef}
                onClick={() => handleClick(href)}
              />
            ))}
            <div ref={highlighterRef} className="hidden lg:block absolute -bottom-2 left-0 h-2 bg-[#fca311] opacity-0 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* "Shaping Idea" block ကို ဒီနေရာကနေ ဖယ်ထုတ်လိုက်ပါပြီ */}
    </>
  );
}