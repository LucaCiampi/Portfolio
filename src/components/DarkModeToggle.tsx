"use client";

import { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TimeContext } from './TimeContext';


const DarkModeToggle = (): JSX.Element => {
    const { darkMode, toggleDarkMode } = useContext(TimeContext);

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.button
                className="text-2xl sm:text-3xl text-yellow-400 dark:text-yellow-300 focus:outline-none"
                onClick={() => toggleDarkMode()}
                key={darkMode ? 'dark-icon' : 'light-icon'}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {darkMode ? '🌙' : '🌤️'}
            </motion.button>
        </AnimatePresence>
    )
}

export default DarkModeToggle
