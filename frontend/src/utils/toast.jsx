import clsx from "clsx";
import { toast as reactToast } from "react-hot-toast";
import { FaCheck, FaX } from "react-icons/fa6";

const baseStyle = "text-black bg-white border px-4 py-3 flex items-center gap-3";


export const toast = (message, success = true) => {
    reactToast.custom((t) => (
        <div className={clsx(baseStyle, t.visible ? "animate-in fade-in zoom-in" : "animate-out fade-out zoom-out")}>
            <span>
                {success ? <FaCheck /> : <FaX />}
            </span>
            <p>{message}</p>
        </div>
    ));
};

