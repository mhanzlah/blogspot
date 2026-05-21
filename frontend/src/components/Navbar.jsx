import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth();

    let leftLinks = [
        { name: "Home", to: "/" },
        { name: "Create a blog", to: "/new" },
    ];

    let rightLinks = [
        { name: "Profile", to: "/profile" },
    ];

    if (!user) {
        leftLinks = [leftLinks[0]];
        rightLinks = [
            { name: "Login", to: "/login" },
            { name: "Sign Up", to: "/sign-up" },
        ];
    }

    const linkClass = ({ isActive }) =>
        clsx(
            "uppercase text-sm font-grotesk h-full flex items-center px-6",
            isActive
                ? "border-black text-black"
                : "border-transparent text-black hover:bg-black hover:text-white"
        );

    return (
        <nav className="w-full h-full md:px-2 flex items-stretch justify-between">

            <ul className="h-full flex items-stretch">
                {leftLinks
                    .slice(0, 1)
                    .map(({ name, to }) => (
                        <li key={to} className="h-full">
                            <NavLink to={to} className={({ isActive }) => clsx(linkClass({ isActive }), 'border-r md:border-l')}>
                                {name}
                            </NavLink>
                        </li>
                    ))}

                {leftLinks.slice(1).map(({ name, to }) => (
                    <li key={to} className="h-full hidden md:block">
                        <NavLink to={to} className={({ isActive }) => clsx(linkClass({ isActive }), 'border-l border-r')}>
                            {name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <h1 className="h-full flex items-stretch">
                <NavLink
                    to="/"
                    className="h-full flex items-center px-4 font-bold text-xl tracking-wider text-black hover:bg-black hover:text-white"
                >
                    Blogspot
                </NavLink>
            </h1>

            <ul className="h-full flex items-stretch">
                {rightLinks
                    .slice(0, 1)
                    .map(({ name, to }) => (
                        <li key={to} className="h-full">
                            <NavLink to={to} className={({ isActive }) => clsx(linkClass({ isActive }), 'border-l md:border-r')}>
                                {name}
                            </NavLink>
                        </li>
                    ))}
                {rightLinks.slice(1).map(({ name, to }) => (
                    <li key={to} className="h-full hidden md:block">
                        <NavLink to={to} className={({ isActive }) => clsx(linkClass({ isActive }), 'border-l border-r')}>
                            {name}
                        </NavLink>
                    </li>
                ))}
            </ul>

        </nav >
    )
}

export default Navbar
