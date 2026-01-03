// components/Transition.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Transition = () => {
  const curtainRef = useRef(null);

  useEffect(() => {
    // Page ပထမဆုံး Load ဖြစ်တဲ့အခါ (သို့) Refresh ဖြစ်တဲ့အခါ
    // Curtain ကို အပေါ်ကို ဆွဲတင်ပြီး ဖွင့်ပေးလိုက်မယ်
    gsap.to(curtainRef.current, {
      y: "-100%",
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.2
    });
  }, []);

  return (
    <div
      id="transition-curtain"
      ref={curtainRef}
      className="fixed inset-0 w-full h-screen bg-[#fca311] z-[999] pointer-events-none"
      style={{ transform: "translateY(100%)" }} // အောက်နားမှာ အဆင်သင့်ရှိနေမယ်
    />
  );
};

export default Transition;