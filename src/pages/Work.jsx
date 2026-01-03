import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Work = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.from(".work-item", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.6
    });
  }, { scope: container });

  return (
    <div ref={container} className="pt-32 p-10">
      <h1 className="work-item text-6xl font-bold">Our Work</h1>
      <div className="work-item mt-10 p-20 bg-gray-200">Project 1</div>
      {/* တခြား content များ */}
    </div>
  );
};

export default Work;