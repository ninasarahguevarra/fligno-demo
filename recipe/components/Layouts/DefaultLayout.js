import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { Token } from "utils/enum";
import { selectRecipeList } from "store/slices/recipeListSlice";
import Spinner from "components/Spinner";
import NavbarComponent from "components/NavbarComponent";
import styles from "assets/styles/DefaultLayout.module.scss";

const DefaultLayout = ({ children }) => {

    const router = useRouter();
    const { push } = router;
    const { isLoading } = useSelector(selectRecipeList);

    useEffect(() => {
        if (isEmpty(localStorage.getItem(Token.Personal))) {
            push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.wrapper}>
            {!isLoading ? (
                <>
                    <NavbarComponent />
                    <div className={styles.body}>
                        {children}
                    </div>
                </>
            ) : (
                <Spinner wrapperHeight="min-h-screen" size="5" />
            )}
        </div>
    );
};

export default DefaultLayout;
