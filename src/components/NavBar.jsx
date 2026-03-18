import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";

export default function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Hide navbar on login/register pages
    const hiddenRoutes = ["/login", "/register"];
    const isHidden = hiddenRoutes.includes(location.pathname);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close dropdown when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    if (isHidden) return null;

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/login");
    };

    // Get user initials for avatar
    const getInitials = () => {
        if (!user) return "?";
        if (user.name) {
            return user.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);
        }
        return user.email?.[0]?.toUpperCase() || "U";
    };

    const displayName = user?.name || user?.email?.split("@")[0] || "User";

    return (
        <nav
            className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        >
            <div className="navbar__inner">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-icon">🌍</span>
                    <span className="navbar__logo-text">MoodPlace</span>
                </Link>

                {/* Nav Links */}
                <div className="navbar__links">
                    <Link
                        to="/"
                        className={`navbar__link ${location.pathname === "/" ? "navbar__link--active" : ""}`}
                    >
                        Home
                    </Link>
                    {user && (
                        <Link
                            to="/dashboard"
                            className={`navbar__link ${location.pathname === "/dashboard" ? "navbar__link--active" : ""}`}
                        >
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* Right Side */}
                <div className="navbar__right">
                    {user ? (
                        <div className="navbar__user" ref={menuRef}>
                            <button
                                className="navbar__avatar-btn"
                                onClick={() => setMenuOpen(!menuOpen)}
                                id="navbar-user-menu"
                            >
                                <div className="navbar__avatar">
                                    {getInitials()}
                                </div>
                                <span className="navbar__username">{displayName}</span>
                                <svg
                                    className={`navbar__chevron ${menuOpen ? "navbar__chevron--open" : ""}`}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {menuOpen && (
                                <div className="navbar__dropdown">
                                    <div className="navbar__dropdown-header">
                                        <div className="navbar__dropdown-avatar">
                                            {getInitials()}
                                        </div>
                                        <div>
                                            <p className="navbar__dropdown-name">{displayName}</p>
                                            <p className="navbar__dropdown-email">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="navbar__dropdown-divider" />
                                    <button
                                        className="navbar__logout-btn"
                                        onClick={handleLogout}
                                        id="navbar-logout"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="navbar__auth-btns">
                            <Link to="/login" className="navbar__signin-btn">
                                Sign In
                            </Link>
                            <Link to="/register" className="navbar__signup-btn">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
