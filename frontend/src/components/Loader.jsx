import loader from "../assets/loader.svg";

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <img
                src={loader}
                alt="Loading"
                className="w-20 h-20 select-none"
                draggable="false"
            />

            <p className="mt-4 text-sm tracking-[0.2em] uppercase text-zinc-500">
                Loading...
            </p>
        </div>
    );
};

export default Loader;
