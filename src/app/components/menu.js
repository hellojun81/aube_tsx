"use client";

import react, { useState, useRef, useEffect } from 'react'
import "./menu.css";
import Link from "next/link"
import "./menu.css"

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
// import { useNavigate } from 'react-router-dom';



const menuLinks = [
    { path: "/main", label: "home" },
    { path: "/main", label: "1floor" },
    { path: "/main", label: "2floor" },
    { path: "/main", label: "3floor" },
    { path: "/main", label: "outSide" },
    { path: "/main", label: "contact" },
];


const Menu = () => {
    const container = useRef();
    const [isMenuOpen, setIsMenuopen] = useState(false);
    const tl = useRef();
    // const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuopen(!isMenuOpen);
    };

    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 75 });
        tl.current = gsap.timeline({ paused: true })
            .to(".menu-overlay", {
                duration: 1.25,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power4.inOut",
            })
            .to(".menu-link-item-holder", {
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.inOut",
                delay: -0.75,
            })

    }, { scope: container });

    const scrollToSection = (id) => {
        // setIsMenuopen(!isMenuOpen);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

    useEffect(() => {
        if (isMenuOpen) {
       
            tl.current.play();
        } else {
      
            tl.current.reverse();
        }
    }, [isMenuOpen])


    return (
        <div className='menu-container' ref={container}>
            <div className='menu-bar'>
                <div className='menu-open' onClick={toggleMenu}>
                    <p>Menu</p>
                </div>
            </div>
            <div className='menu-overlay'>
                <div className='menu-overlay-bar'>
            
                    <div className='menu-close-icon'>
                        <p onClick={toggleMenu}> &#x2715; </p>
                    </div>
              
                    <div className='menu-copy'>
                        <div className='menu-links'>
                            {menuLinks.map((link, index) => (
                                <div className='menu-link-item' key={index}>
                                    <div className='menu-link-item-holder' onClick={toggleMenu}>
                                        <div className='menu-link' onClick={() => scrollToSection(link.label)}>
                                            {link.label} 
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='menu-preview'></div>
                </div>
            </div>
        </div>

    )
}

export default Menu;

