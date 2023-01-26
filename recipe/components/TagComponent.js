import { classNames } from "utils/helpers";

const TagComponent = ({ textColor, bgColor, label }) => {
    return (
        <span
            className={classNames(textColor, bgColor, "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium")}
        >
            {label}
        </span>
    );
};

export default TagComponent;