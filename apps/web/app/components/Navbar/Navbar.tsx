"use client";

import classes from "./Navbar.module.scss";
import { LucideMenu } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

import { ConnectKitButton } from "connectkit";

const Navbar = () => {
    //
    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <nav className={classes.navbar}>
            <div className="container">
                <div className="md:flex justify-between items-center">
                    <div className={classes.logo}>
                        <Link href="/">
                            <span className="font-bold text-blue-200">BASE</span>VATAR
                        </Link>
                        <button
                            onClick={(e) => {
                                menuRef.current && menuRef.current.classList.toggle(classes.active);
                            }}
                        >
                            <LucideMenu size={32} />
                        </button>
                    </div>
                    <div ref={menuRef} className={classes.menu}>
                        <ul>
                            <li>
                                <Link href="/gallery" className="hover:text-blue-100">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/mint" className="hover:text-blue-100">
                                    Mint
                                </Link>
                            </li>
                            <li>
                                <Link href="/vote" className="hover:text-blue-100">
                                    Vote
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-blue-100">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <ConnectKitButton />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
