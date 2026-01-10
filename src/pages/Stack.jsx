import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Transition from '../components/Transition';

gsap.registerPlugin(ScrollTrigger);

const Stack = () => {
  const sceneRef = useRef(null);
  const containerRef = useRef(null);
  const engineRef = useRef(Matter.Engine.create());

  const skills = [
    "React", "Node.js", "GSAP", "Tailwind", 
    "Framer Motion", "Matter.js", "Next.js", 
    "TypeScript", "UI/UX", "Three.js"
  ];

  useEffect(() => {
    // 1. Lenis Smooth Scroll Setup
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Physics Config
    const engine = engineRef.current;
    const world = engine.world;
    engine.gravity.y = 1.5; // Gravity အနည်းငယ် တိုးထားသည်

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // 3. Walls (Static Bodies)
    const wallThickness = 100;
    const floor = Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true });
    
    Matter.World.add(world, [floor, leftWall, rightWall]);

    // 4. Create Skill Bodies
    const skillElements = container.querySelectorAll('.skill-item');
    const bodies = [];

    skillElements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const x = Math.random() * (width - 100) + 50;
      const y = -500 - (i * 150); // တစ်ခုချင်းစီ ကွာပြီး ကျလာအောင်

      const body = Matter.Bodies.rectangle(x, y, rect.width, rect.height, {
        restitution: 0.6,
        friction: 0.1,
        frictionAir: 0.02,
        density: 0.005,
      });

      Matter.Body.setAngle(body, (Math.random() - 0.5) * 1);
      bodies.push({ body, element: el });
      Matter.World.add(world, body);
    });

    // 5. Mouse Interaction
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.World.add(world, mouseConstraint);

    // 6. Animation Loop (GSAP Ticker for performance)
    const runner = Matter.Runner.create();
    
    const update = () => {
      bodies.forEach(({ body, element }) => {
        const { x, y } = body.position;
        // GSAP သုံးပြီး Smooth ဖြစ်အောင် position sync လုပ်သည်
        gsap.set(element, {
          x: x - element.offsetWidth / 2,
          y: y - element.offsetHeight / 2,
          rotation: body.angle * (180 / Math.PI),
        });
      });
    };

    // Scroll Trigger နဲ့ အောက်ရောက်မှ Physics စတင်မည်
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        Matter.Runner.run(runner, engine);
        gsap.ticker.add(update);
      },
      once: true
    });

    // Cleanup
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
 
        {/* Physics Section */}
        <section 
          ref={containerRef}
          className="relative h-screen w-full bg-[#0f0f0f] overflow-hidden border-t border-white/10"
        >
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-[10vw] font-black text-white/5 uppercase select-none">
              Play with Skills
            </h2>
          </div>

          {/* Skill Items */}
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="skill-item absolute px-6 py-3 bg-white text-black rounded-full font-bold text-xl md:text-2xl shadow-xl cursor-grab active:cursor-grabbing select-none whitespace-nowrap border-2 border-black/10"
              style={{ left: 0, top: 0, visibility: 'visible' }}
            >
              {skill}
            </div>
          ))}

          {/* Bottom Content */}
          <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
            <p className="text-white/40 uppercase tracking-widest text-sm">
              Grab them, toss them, stack them.
            </p>
          </div>
        </section>

       
      </div>
    </Transition>
  );
};

export default Stack;