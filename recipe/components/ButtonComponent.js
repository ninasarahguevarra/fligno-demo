import { classNames } from "utils/helpers";

const ButtonComponent = ({ action = "", type="solid", label, onClick, className, children }) => {
    const style = "flex justify-center items-center rounded-md border py-2 px-4 text-sm font-medium shadow-sm leading-none";
    let color;
    switch (type) {
        case "solid":
            color = "bg-primary hover:bg-rose-700 text-white border-transparent";
            break;
        case "outline":
            color = "bg-white hover:bg-rose-50 text-primary border-primary";
            break;
        case "prepend-icon":
            color = "relative w-auto -ml-px inline-flex items-center space-x-2 rounded-l-none rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100";
            break;
    }

    return (
        <button
            type={action}
            className={classNames(style, color, className)}
            onClick={onClick}
        >
            {label && label}
            {children && children}
        </button>
    );
};

export default ButtonComponent;
