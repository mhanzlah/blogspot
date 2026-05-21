import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const NotFound = () => {
    return (
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-5">

            <div className="text-center max-w-md">

                <PageTitle content="404 Page not found" />

                <div className="my-8">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-widest opacity-20">
                        404
                    </h1>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                    We couldn't find the page you were looking for.
                    It might have been moved or doesn't exist anymore.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">

                    <Link
                        to="/"
                        className="px-4 py-2 border bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Explore blogs
                    </Link>

                    <Link
                        to="/"
                        className="px-4 py-2 border hover:bg-black hover:text-white transition-all duration-300"
                    >
                        Go Home
                    </Link>

                </div>

                <p className="mt-6 text-xs text-gray-400 animate-pulse">
                    Tip: Check the URL or return to homepage
                </p>

            </div>
        </div>
    );
};

export default NotFound;
