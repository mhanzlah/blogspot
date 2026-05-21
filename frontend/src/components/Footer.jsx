import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";

const FooterSection = ({ title, links, first = false }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={`flex-1 px-5 py-4 border-b md:border-b-0 ${first ? "border-t" : ""}`}>

            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center md:hidden"
            >
                <h2 className="font-light uppercase tracking-wide text-sm mb-3">
                    {title}
                </h2>

                <span className="md:hidden text-xs">
                    {open ? <FaMinus /> : <FaPlus />}
                </span>
            </button>

            <div
                className="w-full justify-between items-center hidden md:flex"
            >
                <h2 className="font-light uppercase tracking-wide text-sm mb-3">
                    {title}
                </h2>

                <span className="md:hidden text-xs">
                    {open ? <FaMinus /> : <FaPlus />}
                </span>
            </div>

            <div
                className={`
                    overflow-hidden transition-all duration-300
                    md:overflow-visible
                    ${open ? "max-h-60 mt-3" : "max-h-0 md:max-h-full"}
                `}
            >
                <div className="flex flex-col gap-2 text-sm">
                    {links.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.to}
                            className="hover:text-black transition-colors duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
};

const Footer = () => {

    const footerData = {
        info: [{ label: "Profile", to: "/profile" }],
        company: [
            { label: "About Us", to: "/about" },
            { label: "How to best use", to: "/guide" },
        ],
        connect: [
            { label: "Email", to: "mailto:sayhi.hanzla@gmail.com.com" },
            { label: "GitHub", to: "https://github.com/mhanzlah/blogspot" },
        ]
    };

    return (
        <footer className="border-t h-[calc(100vh-56px)] flex flex-col">

            {/* ================= MOBILE ================= */}
            <div className="md:hidden h-full flex flex-col">

                <div className="flex-1"></div>

                <div className="flex-1 flex flex-col py-4">

                    <FooterSection
                        title="Information"
                        links={footerData.info}
                        first
                    />

                    <FooterSection
                        title="Company"
                        links={footerData.company}
                    />

                    <FooterSection
                        title="Connect with us"
                        links={footerData.connect}
                    />

                    {/* CENTERED BRANDING */}
                    <div className="mt-6 flex flex-col items-center justify-center text-center px-5">
                        <h1 className="uppercase text-3xl font-bold tracking-[0.25em]">
                            Blogspot
                        </h1>
                    </div>

                </div>
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden md:flex flex-col h-full">

                <div className="flex flex-1 divide-x border-b">

                    <div className="flex-1 px-5 py-4">
                        <h2 className="font-light uppercase tracking-wide text-sm mb-3">
                            Newsletter
                        </h2>

                        <div className="flex flex-col gap-3">
                            <p className="text-sm leading-relaxed">
                                Subscribe to get updates, writing tips, and featured blogs.
                            </p>

                            <div className="flex border opacity-60 cursor-not-allowed">
                                <input
                                    type="email"
                                    disabled
                                    placeholder="Coming soon..."
                                    className="flex-1 px-3 py-2 bg-gray-100 text-sm outline-none"
                                />
                                <button
                                    disabled
                                    className="border-l px-4 text-sm uppercase tracking-wide bg-gray-100"
                                >
                                    Soon
                                </button>
                            </div>

                            <p className="text-xs text-gray-400">
                                Newsletter feature will be available soon.
                            </p>
                        </div>
                    </div>

                    <FooterSection title="Information" links={footerData.info} />
                    <FooterSection title="Company" links={footerData.company} />
                    <FooterSection title="Connect with us" links={footerData.connect} />

                </div>

                <div className="shrink-0 flex flex-col items-center justify-center py-8">
                    <h1 className="uppercase text-5xl font-bold tracking-[0.3em]">
                        Blogspot
                    </h1>
                </div>

            </div>

        </footer>
    );
};

export default Footer;
