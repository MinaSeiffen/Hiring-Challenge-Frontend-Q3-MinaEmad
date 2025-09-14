import React from "react";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "../ui/drawer";
import { useTheme } from "../../Context/ThemeContext";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();   

    // Modern switch component
    const ThemeSwitch = (
        <label className="flex items-center gap-2 cursor-pointer px-6 py-3">
            <span className="text-sm">{theme === "dark" ? "Dark" : "Light"} Mode</span>
            <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
                className="sr-only"
                aria-label="Toggle theme"
            />
            <span className="relative w-10 h-6 bg-gray-400 rounded-full transition-colors duration-300">
                <span
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
                        theme === "dark" ? "translate-x-4" : ""
                    }`}
                />
            </span>
        </label>
    );

    return (
        <>
            {/* Burger menu for mobile */}
            <Drawer>
                <DrawerTrigger asChild>
                    <button
                        className="md:hidden fixed top-4 left-4 z-50 text-3xl text-gray-800"
                        aria-label="Open sidebar"
                    >
                        &#9776;
                    </button>
                </DrawerTrigger>
                <DrawerContent className="w-56 bg-gray-900 text-white pt-16">
                    <DrawerClose asChild>
                        <button
                            aria-label="Close sidebar"
                            className="md:hidden absolute top-4 right-4 text-3xl text-white"
                        >
                            &times;
                        </button>
                    </DrawerClose>
                    <nav>
                        <ul className="list-none p-0">
                            <li>{ThemeSwitch}</li>
                            <li>
                                <DrawerClose asChild>
                                    <Link
                                        to="/"
                                        className={`flex items-center gap-2 px-6 py-3 no-underline ${
                                            location.pathname === "/"
                                                ? "text-cyan-400"
                                                : "text-white"
                                        } hover:bg-gray-800`}
                                    >
                                        <FaUsers /> Users
                                    </Link>
                                </DrawerClose>
                            </li>
                            <li>
                                <DrawerClose asChild>
                                    <Link
                                        to="/favorites"
                                        className={`flex items-center gap-2 px-6 py-3 no-underline ${
                                            location.pathname === "/favorites"
                                                ? "text-cyan-400"
                                                : "text-white"
                                        } hover:bg-gray-800`}
                                    >
                                        <MdFavoriteBorder /> Favourite
                                    </Link>
                                </DrawerClose>
                            </li>
                        </ul>
                    </nav>
                </DrawerContent>
            </Drawer>

            {/* Desktop sidebar */}
            <div className="hidden md:flex flex-col fixed top-0 left-0 h-full w-56 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-xl text-white pt-10">
                <Link to="/" className="flex flex-col items-center mb-8">
                    <div className="rounded-full bg-cyan-500 p-4 shadow-lg mb-2">
                        <FaHome className="text-3xl text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-wide">ExtremeSol</span>
                </Link>
                <nav className="flex-1">
                    <ul className="space-y-2 px-4">
                        <li>
                            <Link
                                to="/"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    location.pathname === "/"
                                        ? "bg-cyan-600 text-white shadow"
                                        : "hover:bg-gray-800 hover:text-cyan-400"
                                }`}
                            >
                                <FaUsers className="text-xl" />
                                <span className="font-medium">Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/favorites"
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    location.pathname === "/favorites"
                                        ? "bg-cyan-600 text-white shadow"
                                        : "hover:bg-gray-800 hover:text-cyan-400"
                                }`}
                            >
                                <MdFavoriteBorder className="text-xl" />
                                <span className="font-medium">Favourite</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="px-4 mt-8">{ThemeSwitch}</div>
            </div>
        </>
    );
};

export default Sidebar;
