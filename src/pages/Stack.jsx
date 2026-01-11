import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Transition from "../components/Transition";

gsap.registerPlugin(ScrollTrigger);

const Stack = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());

  const skills = [
    "React",
    "Node.js",
    "GSAP",
    "Tailwind",
    "Framer Motion",
    "Matter.js",
    "Next.js",
    "TypeScript",
    "UI/UX",
    "Three.js",
  ];

  useEffect(() => {
    /* --------------------------------
       Detect Mobile
    -------------------------------- */
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    /* --------------------------------
       Lenis Smooth Scroll
    -------------------------------- */
    const lenis = new Lenis({ smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    /* --------------------------------
       Matter.js Engine
    -------------------------------- */
    const engine = engineRef.current;
    const world = engine.world;
    engine.gravity.y = 1.5;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    /* --------------------------------
       Walls
    -------------------------------- */
    const wall = 120;

    const floor = Matter.Bodies.rectangle(
      width / 2,
      height + wall / 2,
      width,
      wall,
      { isStatic: true }
    );

    const leftWall = Matter.Bodies.rectangle(
      -wall / 2,
      height / 2,
      wall,
      height * 2,
      { isStatic: true }
    );

    const rightWall = Matter.Bodies.rectangle(
      width + wall / 2,
      height / 2,
      wall,
      height * 2,
      { isStatic: true }
    );

    Matter.World.add(world, [floor, leftWall, rightWall]);

    /* --------------------------------
       Skill Bodies
    -------------------------------- */
    const skillElements = container.querySelectorAll(".skill-item");
    const bodies = [];

    skillElements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const x = Math.random() * (width - 200) + 100;
      const y = -400 - i * 140;

      const body = Matter.Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.7,
        friction: 0.1,
        frictionAir: 0.03,
        density: 0.004,
      });

      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.6);

      bodies.push({ body, element: el });
      Matter.World.add(world, body);
    });

    /* --------------------------------
       Desktop Drag Only
    -------------------------------- */
    let mouseConstraint;

    if (!isMobile) {
      const mouse = Matter.Mouse.create(container);

      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      Matter.World.add(world, mouseConstraint);
    }

    /* --------------------------------
       Mobile Tap → Impulse
    -------------------------------- */
    if (isMobile) {
      container.addEventListener(
        "touchstart",
        (e) => {
          const touch = e.touches[0];
          const el = document.elementFromPoint(
            touch.clientX,
            touch.clientY
          );

          if (el && el.classList.contains("skill-item")) {
            const index = [...skillElements].indexOf(el);

            if (index !== -1) {
              Matter.Body.applyForce(
                bodies[index].body,
                bodies[index].body.position,
                {
                  x: (Math.random() - 0.5) * 0.05,
                  y: -0.06,
                }
              );
            }
          }
        },
        { passive: true }
      );
    }

    /* --------------------------------
       Render Loop
    -------------------------------- */
    const runner = Matter.Runner.create();

    const update = () => {
      bodies.forEach(({ body, element }) => {
        gsap.set(element, {
          x: body.position.x - element.offsetWidth / 2,
          y: body.position.y - element.offsetHeight / 2,
          rotation: body.angle * (180 / Math.PI),
        });
      });
    };

    /* --------------------------------
       Start on Scroll
    -------------------------------- */
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      once: true,
      onEnter: () => {
        Matter.Runner.run(runner, engine);
        gsap.ticker.add(update);
      },
    });

    /* --------------------------------
       Cleanup
    -------------------------------- */
    return () => {
      Matter.Engine.clear(engine);
      Matter.Runner.stop(runner);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <Transition>
      <div className="bg-white text-black min-h-screen">
        <section
          ref={containerRef}
          className="relative h-screen w-full bg-[#0f0f0f] overflow-hidden border-t border-white/10"
          style={{ touchAction: "pan-y" }}
        >
          {/* Background Title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-[10vw] font-black text-white/5 uppercase select-none">
              Play with Skills
            </h2>
          </div>

          {/* Skills */}
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item absolute px-6 py-3 bg-white text-black rounded-full
                         font-bold text-xl md:text-2xl shadow-xl cursor-grab
                         active:cursor-grabbing select-none whitespace-nowrap
                         border-2 border-black/10 will-change-transform"
              style={{
                left: 0,
                top: 0,
                visibility: "visible",
                touchAction: "manipulation",
              }}
            >
              {skill}
            </div>
          ))}

          {/* Hint */}
          <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
            <p className="text-white/40 uppercase tracking-widest text-sm">
              Drag on desktop · Tap on mobile
            </p>
          </div>
        </section>
      </div>
    </Transition>
  );
};

export default Stack;
