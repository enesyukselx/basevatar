"use client";

import classes from "./Navbar.module.scss";
import { LucideMenu } from "lucide-react";
import { useEffect, useRef } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { data: session } = useSession();
    //
    const { open } = useWeb3Modal();
    //
    const menuRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    useEffect(() => {
        if (session?.address) {
            router.refresh();
        }
    }, [session, router]);

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
                                <button
                                    onClick={() => open()}
                                    className={`border-2 py-2 px-2 ${
                                        session?.address
                                            ? "bg-white text-black hover:bg-gray-200"
                                            : "bg-black text-white hover:bg-white hover:text-black"
                                    } border-white `}
                                >
                                    {session?.address
                                        ? session?.address &&
                                          `${session?.address.slice(0, 4)}...${session?.address.slice(-4)}`
                                        : "CONNECT WALLET"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
