import ButtonComponent from "components/ButtonComponent";
import styles from "assets/styles/Pagination.module.scss";

const PaginationComponent = ({ from, to, count, onPreviousPage, onNextPage, hasPrevious, hasNext }) => {
    return (
        <nav className={styles.wrapper}>
            <div className="hidden sm:block">
                <p>Showing <span>{from}</span> to <span>{to}</span> of <span>{count}</span> results</p>
            </div>
            <div className={styles["button-wrapper"]}>
                { hasPrevious &&
                    <ButtonComponent
                        action="button"
                        className="w-auto py-1 px-4 h-9 mr-2"
                        type="outline"
                        label="Previous"
                        onClick={onPreviousPage}
                    />
                }
                { hasNext &&
                    <ButtonComponent
                        action="button"
                        className="w-auto py-1 px-4 h-9"
                        type="outline"
                        label="Next"
                        onClick={onNextPage}
                    />
                }
            </div>
        </nav>
    );
};

export default PaginationComponent;