"use client";
import React, { useState } from "react";
import Styles from "./navbar.module.scss";
import { motion } from "framer-motion";


const menuLinks = [
    { path: "/main/#main", label: "home" },
    { path: "/main/#floor1", label: "1Floor" },
    { path: "/main/#floor2", label: "2Floor" },
    { path: "/main/#floor3", label: "3Floor" },
    { path: "/main/#Other", label: "Other" },
    { path: "/main/#Stairs", label: "Stairs" },
    { path: "/main/#Outside", label: "Outside" },
    { path: "/archives", label: "Archives" },
    { path: "/main/#Contact", label: "Contact" },
    { path: "http://pf.kakao.com/_tVLcG", label: "Kakao" },
];


const Navbar = () => {
    const [burgerMenuActive, setBurgerMenuActive] = useState(false);

    const toggleBurgerMenu = () => {
        setBurgerMenuActive(!burgerMenuActive);
    };

    const motionVariants = {
        open: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                ease: "easeOut",
                type: "spring",
            },
        },
        closed: {
            opacity: 0,
            transition: {
                staggerChildren: 0,
                duration: 0,
            },
        },
    };

    const listItemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.35,
                ease: "easeOut",
            },
        },
        closed: {
            y: 100,
            opacity: 0,
            transition: {
                duration: 0,
            },
        },
    };

    return (
        <div
            className={`${Styles.navbar} ${burgerMenuActive ? Styles.active : ""
                }`}
        >
            <div className={Styles.navigation}      onClick={() => toggleBurgerMenu()}>

                <div
                    className={Styles.burgerMenuContainer}
               
                >
                    <div className={Styles.burgerMenuTrigger}></div>
                    <div className={Styles.burgerMenu}></div>
                </div>
            </div>
            <div className={Styles.content}>
                <motion.ul
                    animate={burgerMenuActive ? "open" : "closed"}
                    variants={motionVariants}
                >
                    {menuLinks.map((link, index) => (
                        <motion.li variants={listItemVariants} key={index}>
                            <a href={link.path} onClick={() => setBurgerMenuActive(!burgerMenuActive)}
                                >
                                {link.label}
                            </a>
                        </motion.li>
                    ))}


                </motion.ul>
            </div>
            <div className="slogun">
<a href="/main">Our Space,Your Canvas</a></div>
        </div>
    );
};

export default Navbar;
