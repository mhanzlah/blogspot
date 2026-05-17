import { NavLink as RNavLink } from 'react-router-dom'

import clsx from 'clsx';

const NavLink = ({ to, className = '', children, ...props }) => {
    return (
        <RNavLink to={to} className={clsx('nav-link', className)}>{children}</RNavLink>
    )
}

export default NavLink
