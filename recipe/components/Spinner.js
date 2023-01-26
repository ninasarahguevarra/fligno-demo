import { classNames } from "utils/helpers";
import styles from "assets/styles/Spinner.module.scss";

const Spinner = ({ className = "text-primary", wrapperHeight, size = "6", borderWidth = "8" }) => {
    return (
        <div className={classNames(wrapperHeight, styles.wrapper)}>
            <div className={styles["sub-wrapper"]}>
                <div
                    className={classNames(className, styles["spinner-element"])}
                    style={{
                        width: `${size}rem`,
                        height: `${size}rem`,
                        borderWidth: `${borderWidth}px`
                    }}
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
