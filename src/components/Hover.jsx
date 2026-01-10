import gsap from 'gsap';
import React, { useRef } from 'react';

const Hover = ({ text, onClick, className = "" }) => {
    const topTextRef = useRef(null);
    const bottomTextRef = useRef(null);

    const onMouseEnter = () => {
        gsap.to(topTextRef.current.children, {
            y: "-100%",
            stagger: 0,
            duration: 0.5,
            ease: "power4.inOut",
        });
        gsap.to(bottomTextRef.current.children, {
            y: "-100%",
            stagger: 0,
            duration: 0.5,
            ease: "power4.inOut",
        });
    };

    const onMouseLeave = () => {
        gsap.to(topTextRef.current.children, {
            y: "0%",
            stagger: 0,
            duration: 0.5,
            ease: "power4.inOut",
        });
        gsap.to(bottomTextRef.current.children, {
            y: "0%",
            stagger: 0,
            duration: 0.5,
            ease: "power4.inOut",
        });
    };

    const letters = text.split("");

    return (
        <div
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`relative overflow-hidden cursor-pointer h-5 flex items-center ${className}`}
            style={{ mixBlendMode: 'difference' }}
        >
            <div ref={topTextRef} className='flex relative z-10'>
                {letters.map((char, i) => (
                    <span key={i} className='inline-block'>
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </div>

            <div ref={bottomTextRef} className='flex absolute top-full left-0 w-full'>
                {letters.map((char, i) => (
                    <span key={i} className='inline-block'>
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Hover;