import { Outlet, useMatches } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
    const APP_NAME = import.meta.env.APP_NAME || 'Blogspot';

    const matches = useMatches();

    const currentRoute = matches[matches.length - 1];

    const rawTitle = currentRoute?.handle?.title;

    const title = typeof rawTitle === 'function' ? rawTitle({ params: currentRoute.params, }) : rawTitle;

    const fullTitle = title ? (title === 'Not Found' ? title : `${title} - ${APP_NAME}`) : APP_NAME;

    return (
        <>
            <Helmet>
                <title>{fullTitle}</title>
                <meta name='description' content='A minimal blog sharing platform built on the MERN stack' />
            </Helmet>

            <div>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout
