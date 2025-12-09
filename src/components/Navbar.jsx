import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const location = useLocation()
  console.log('isDark--->', isDark);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)

    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
    { href: '/admin', label: 'Admin' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  bg-white dark:bg-navy-900/95 backdrop-blur-md shadow-lg`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-20">
          <Link
            to="/"
            className={`text-2xl font-bold transition-colors ${isScrolled
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-black dark:text-gray-100'
              } 
            `}
            aria-label="Decorator & Painters Home"
          >
            Decorator & Painters
          </Link>

          <div className="hidden md:flex items-center space-x-8 ">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-colors relative ${isScrolled
                  ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  : 'text-black dark:text-gray-100 hover:text-primary-300 dark:hover:text-primary-400'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                    layoutId="activeTab"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className={`text-2xl font-bold transition-colors ${isScrolled
                ? 'text-black dark:text-primary-400'
                : 'text-black dark:text-gray-100'
                } focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isScrolled
                ? 'text-black dark:text-gray-300'
                : 'text-black dark:text-gray-100'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button
              type="button"
              className={`p-2 rounded-md transition-colors ${isScrolled ? 'text-black dark:text-gray-300' : 'text-black dark:text-gray-100'
                } hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500`}
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          className="md:hidden overflow-hidden bg-[#dea923]"
        >
          <div className="pb-4">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium py-2 px-4 rounded transition-colors ${isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800'
                    : 'text-white dark:text-gray-100 hover:bg-white/10'
                    } focus:outline-none focus:ring-2 focus:ring-primary-500 ${isActive(link.href) ? 'bg-primary-100 dark:bg-primary-900/30' : ''
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Navbar

