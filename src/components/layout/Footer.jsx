import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const canvasRef = useRef(null);
  const footerRef = useRef(null);
  const wrapperRef = useRef(null);
  const requestRef = useRef(); // Animation frame ကို track ရန်

  useEffect(() => {
    // 1. Clock Logic (Optional - If needed)
    const updateClock = () => {
        // dispatch logic here
    };

    // 2. Lenis Smooth Scroll
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestRef.current = requestAnimationFrame(raf);
    }
    requestRef.current = requestAnimationFrame(raf);

    // 3. Three.js Setup with Error Handling
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 2;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true, 
        powerPreference: 'high-performance' 
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.error("WebGL not supported", e);
    }

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1, 1, 5);
    scene.add(dirLight);

    let modelBaseZ = -2;
    let modelBaseRotationX = 0.5;

    // 4. GSAP Scroll Animation
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        if (wrapperRef.current) {
          gsap.set(wrapperRef.current, { yPercent: -35 * (1 - self.progress) });
        }
        modelBaseZ = -1 * (1 - self.progress);
        modelBaseRotationX = 0.5 * (1 - self.progress);
      }
    });

    const animate = () => {
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    animate();

    const onResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(requestRef.current);
      scrollTriggerInstance.kill();
      lenis.destroy();
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full h-[100vh] min-h-[700px] bg-[#0a0a0a] text-white overflow-hidden flex flex-col">
      <div ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />
      
      <div ref={wrapperRef} className="relative h-full flex flex-col justify-between px-[6vw] py-10 md:py-16 z-20 pointer-events-none">
        <div className="absolute top-[40%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center opacity-[0.03] md:opacity-[0.05]">
          <span className="font-['Unbounded'] text-[20vw] md:text-[16vw] font-black uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px white' }}>Creative</span>
          <span className="font-['Unbounded'] text-[20vw] md:text-[16vw] font-black uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px white' }}>Builder</span>
        </div>

        <div className="pointer-events-auto mt-10 md:mt-0">
          <h2 className="font-['Unbounded'] text-[clamp(1.75rem,7vw,5.5rem)] leading-[1.1] font-black uppercase">
            <div>RESTORING</div>
            <div>
              <span className="text-[#ffa630]">MEANING</span> 
              <span className="inline-block ml-2 md:ml-4">TO THE</span>
            </div>
            <div>
              THINGS WE <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>BUILD.</span>
            </div>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0 pointer-events-auto">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] opacity-40 tracking-[3px] uppercase">Explore Area</span>
            <div className="flex flex-col gap-3">
              {['Resumes', 'Orbit', 'Thoughts'].map((item, i) => (
                <a key={item} href="#" className="flex items-center text-sm md:text-lg opacity-60 hover:opacity-100 hover:text-[#ffa630] transition-all">
                  <span className="text-[9px] mr-3 opacity-40">0{i+1}.</span> {item}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-bold">Available for Work</span>
            </div>
            <div className="flex gap-6 text-[10px] md:text-sm font-semibold uppercase tracking-widest">
              <a href="#" className="hover:text-[#ffa630]">Email</a>
              <a href="#" className="hover:text-[#ffa630]">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-white/10 text-[8px] md:text-[9px] opacity-30 uppercase tracking-[2px] w-full">
          <p>© 2026 THUTA. ALL RIGHTS RESERVED.</p>
          <p>YANGON, MYANMAR</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;