import { useRef, useEffect } from "react";
import { Link } from "react-router-dom"; // ပြောင်းလဲမှု
import gsap from "gsap";

export default function MenuLink({
  text,
  href,
  isActive,
  onMouseEnter,
  setActiveRef,
  onClick,
}) {
  const linkRef = useRef(null);

  useEffect(() => {
    if (isActive && setActiveRef) {
      setActiveRef.current = linkRef.current;
    }
  }, [isActive, setActiveRef]);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;
    const spans = link.querySelectorAll(".text-wrapper");

    spans.forEach((span, index) => {
      const chars = span.innerText;
      span.innerHTML = "";
      chars.split("").forEach((char) => {
        const el = document.createElement("span");
        el.className = "char inline-block will-change-transform";
        el.innerText = char === " " ? "\u00A0" : char;
        span.appendChild(el);
      });

      if (index === 1) {
        gsap.set(span.querySelectorAll(".char"), { y: "110%" });
      }
    });
  }, [text]);

  const handleEnter = () => {
    const visible = linkRef.current.querySelectorAll(".text-wrapper:nth-child(1) .char");
    const animated = linkRef.current.querySelectorAll(".text-wrapper:nth-child(2) .char");
    gsap.to(visible, { y: "-110%", stagger: 0.02, duration: 0.4, ease: "power2.out" });
    gsap.to(animated, { y: "0%", stagger: 0.02, duration: 0.4, ease: "power2.out" });
    onMouseEnter?.(linkRef.current);
  };

  const handleLeave = () => {
    const visible = linkRef.current.querySelectorAll(".text-wrapper:nth-child(1) .char");
    const animated = linkRef.current.querySelectorAll(".text-wrapper:nth-child(2) .char");
    gsap.to(visible, { y: "0%", stagger: 0.02, duration: 0.4, ease: "power2.out" });
    gsap.to(animated, { y: "110%", stagger: 0.02, duration: 0.4, ease: "power2.out" });
  };

  return (
    <div
      ref={linkRef}
      className={`menu-link relative cursor-pointer transition-all duration-300 ${isActive ? "pl-3 lg:pl-0" : "pl-0"}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className={`absolute left-0 top-7 -translate-y-1/2 w-1 h-[78%] bg-[#e11010] transition-all duration-300 lg:hidden ${isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`} />

      <div className="relative overflow-hidden inline-block">
        <Link
          to={href} // href အစား to ကို သုံးပါတယ်
          onClick={(e) => {
            e.preventDefault();
            onClick(href);
          }}
          className="font-[Anton] text-[4rem] lg:text-[10rem] leading-[0.9] uppercase relative inline-block"
        >
          <span className="text-wrapper inline-block">{text}</span>
          <span className="text-wrapper absolute top-0 left-0 inline-block">{text}</span>
        </Link>
      </div>
    </div>
  );
}