
import gsap from 'gsap';
import React, { useRef } from 'react'

const Hover = ({ text, onClick, className = "" }) => {
    const topTextRef = useRef(null);
    const bottomTextRef = useRef(null);

    const onMouseEnter = () => {
        gsap.to(topTextRef.current.children, {
            y: "-100%",
            stagger: 0,
            duration: 0.4,
            ease: "power3.inOut",
        });
        gsap.to(bottomTextRef.current.children, {
            y: "-100%",
            stagger: 0,
            duration: 0.4,
            ease: "power3.inOut",
        });
    };

    const onMouseLeave = () => {
        gsap.to(topTextRef.current.children, {
            y: "0%",
            stagger: 0,
            duration: 0.4,
            ease: "power3.inOut",
        });
        gsap.to(bottomTextRef.current.children, {
            y: "0%",
            stagger: 0,
            duration: 0.4,
            ease: "power3.inOut",
        });
    };

    const letters = text.split("");


    return (
        <div
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`relative overflow-hidden cursor-pointer h-4 flex items-center ${className}`}
        >
            <div ref={topTextRef} className='flex'>
                {letters.map((char, i) => (
                    <span key={i} className='inline-block'>
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </div>

            <div ref={bottomTextRef} className='flex absolute top-full'>
                {letters.map((char, i) => (
                    <span key={i} className='inline-block'>
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Hover