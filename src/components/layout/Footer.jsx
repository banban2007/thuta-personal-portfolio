import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Redux Action (သင်၏ store ထဲမှ action ကို ယူသုံးပါ)
// import { setTime } from '../redux/slices/appSlice'; 

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const canvasRef = useRef(null);
  const footerRef = useRef(null);
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Digital Clock Updater
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      // dispatch(setTime(timeStr)); // Redux သို့ ပို့ရန်
    };
    const timer = setInterval(updateClock, 1000);

    // 2. Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1, // Smoothness level
      wheelMultiplier: 1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Three.js Setup
    const container = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance', precision: "mediump" });

    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1, 1, 5);
    scene.add(dirLight);

    // Model variables
    let model = null;
    let modelBaseZ = -2;
    let modelBaseRotationX = 0.5;
    const mouse = { x: 0, y: 0 };

    // const loader = new GLTFLoader();
    // loader.load('/miller.glb', (gltf) => {
    //   model = gltf.scene;
    //   const box = new THREE.Box3().setFromObject(model);
    //   const size = box.getSize(new THREE.Vector3());
    //   const maxDim = Math.max(size.x, size.y, size.z);
    //   model.scale.setScalar(2.0 / maxDim);
    //   model.position.y = -1.3;
    //   scene.add(model);
    //   // Model ရောက်လာရင် ScrollTrigger ကို refresh လုပ်ပေးပါ
    //   ScrollTrigger.refresh();
    // });

    // Mouse Tracking
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 4. GSAP Scroll Animation
    const scrollAnimation = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1, // Animation smooth ဖြစ်ရန် latency ထည့်ထားခြင်း
      onUpdate: (self) => {
        if (wrapperRef.current) {
          gsap.set(wrapperRef.current, { yPercent: -35 * (1 - self.progress) });
        }
        modelBaseZ = -1 * (1 - self.progress);
        modelBaseRotationX = 0.5 * (1 - self.progress);
      }
    });

    // 5. Animation Loop (Only for 3D movements)
    const animate = () => {
      if (model) {
        const targetRotY = mouse.x * 0.3;
        const targetRotX = -mouse.y * 0.2 + modelBaseRotationX;
        
        // Linear Interpolation (Lerp) for 3D smooth movement
        model.rotation.y += (targetRotY - model.rotation.y) * 0.05;
        model.rotation.x += (targetRotX - model.rotation.x) * 0.05;
        model.position.z += (modelBaseZ - model.position.z) * 0.05;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 6. Resize Handler
    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      lenis.destroy();
      scrollAnimation.kill();
      renderer.dispose();
    };
  }, []);

  return (
 <footer 
      ref={footerRef} 
      className="relative w-full h-[100vh] min-h-[700px] bg-[#0a0a0a] text-white overflow-hidden flex flex-col"
    >
      {/* 3D Canvas Background */}
      <div ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Content Wrapper */}
      <div 
        ref={wrapperRef} 
        className="relative h-full flex flex-col justify-between px-[6vw] py-10 md:py-16 z-20 pointer-events-none"
      >
        
        {/* Background Large Text (Responsive Opacity & Size) */}
        <div className="absolute top-[40%] md:top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center opacity-[0.03] md:opacity-[0.05]">
          <span className="font-['Unbounded'] text-[20vw] md:text-[16vw] font-black leading-none uppercase tracking-tighter" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>Creative</span>
          <span className="font-['Unbounded'] text-[20vw] md:text-[16vw] font-black leading-none uppercase tracking-tighter" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>Builder</span>
        </div>

        {/* Top Section (Slogan) */}
        <div className="pointer-events-auto mt-10 md:mt-0">
          <h2 className="font-['Unbounded'] text-[clamp(1.75rem,7vw,5.5rem)] leading-[1.1] font-black uppercase">
            <div className="block">RESTORING</div>
            <div className="block">
                <span className="text-[#ffa630]">MEANING</span> 
                <span className="inline-block ml-2 md:ml-4">TO THE</span>
            </div>
            <div className="block">
                THINGS WE <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>BUILD.</span>
            </div>
          </h2>
        </div>

        {/* Middle Section (Links & Status) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0 pointer-events-auto">
          
          {/* Links Column */}
          <div className="flex flex-col gap-4 md:gap-6">
            <span className="text-[10px] uppercase opacity-40 tracking-[3px]">Explore Area</span>
            <div className="flex flex-col gap-3 font-medium">
              {['Resumes', 'Orbit', 'Thoughts'].map((item, i) => (
                <a key={item} href="#" className="group flex items-center text-sm md:text-lg opacity-60 hover:opacity-100 hover:text-[#ffa630] transition-all duration-300">
                  <span className="text-[9px] mr-3 opacity-40 group-hover:text-[#ffa630]">0{i+1}.</span> {item}
                </a>
              ))}
            </div>
          </div>

          {/* Availability & Socials */}
          <div className="flex flex-col items-start md:items-end gap-6 md:gap-10 w-full md:w-auto">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88] shadow-[0_0_12px_#00ff88]"></span>
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-80 font-bold">Available for Work</span>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3 items-center text-[10px] md:text-sm font-semibold uppercase tracking-widest">
              <a href="mailto:hello@thuta.com" className="hover:text-[#ffa630] transition-colors">Email</a>
              <a href="#" className="hover:text-[#ffa630] transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-[#ffa630] transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        {/* Bottom Section (Legal & Time) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10 text-[8px] md:text-[9px] opacity-30 uppercase tracking-[2px] md:tracking-[4px] text-center w-full">
          <p>© 2026 THUTA. ALL RIGHTS RESERVED.</p>
          <p className="hidden md:block">YANGON, MYANMAR / {}</p>
          <p className="md:hidden">{}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;