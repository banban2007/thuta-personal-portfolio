import { useRef, useEffect, useTransition } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../../redux/slices/menuSlice";
import gsap from "gsap";
import MenuLink from "./MenuLink";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Hover from "../Hover";
import heroImg from '../../assets/images/hero.jpeg';

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

    startTransition(() => {
      navigate(href);
    })
  };

  return (
    <>

      <nav
        style={{ mixBlendMode: 'difference' }}
        className="fixed top-0 left-0 w-full flex justify-between p-8 z-100 uppercase font-bold text-sm text-white pointer-events-none"
      >
        <div
          className="flex items-center gap-2 pointer-events-auto cursor-pointer group"
          onClick={() => dispatch(toggleMenu())}
        >
          <Hover text={isOpen ? "Close" : "Menu"} />

          <div className="relative w-3.5 h-3.5 flex items-center justify-center">
            {/* Square Shape */}
            <svg
              className={`absolute inset-0 transition-all duration-500 ease-expo ${isOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}
              width="14" height="14" viewBox="0 0 24 24"
            >
              <rect width="20" height="20" x="2" y="2" fill="currentColor" />
            </svg>

            {/* Heart Shape */}
            <svg
              className={`absolute inset-0 transition-all duration-500 ease-expo ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}
              width="14" height="14" viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>


        <div className="flex items-center justify-center gap-2 pointer-events-auto">
          <Hover text="write" />
          <svg width="12" height="12" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="currentColor" />
          </svg>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div ref={overlayRef} className="fixed inset-0 bg-[#1e1e1e] text-white z-50 overflow-hidden select-none flex flex-col-reverse" style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}>
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

          <div className="hidden lg:block w-40 aspect-3/4 relative opacity-80">
            <img src={heroImg} alt="hero" className="w-full h-full object-contain" />
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
            <div ref={highlighterRef} className="hidden lg:block absolute -bottom-2 left-0 h-2 bg-[#e11010] opacity-0 pointer-events-none" />
          </div>
        </div>
      </div>

    </>
  );
}