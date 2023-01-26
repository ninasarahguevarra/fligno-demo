import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/solid";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";
import last from "lodash/last";
import split from "lodash/split";
import { classNames } from "utils/helpers";
import { Token } from "utils/enum";
import { postAddToFavorites, postRemoveFromFavorites, selectFavorites, getFavorites } from "store/slices/favoritesSlice";
import styles from "assets/styles/CardComponent.module.scss";

const CardComponent = ({ recipe, onClick, containerClass, imageWrapperHeight = "h-56" }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;
    const { favorites } = useSelector(selectFavorites);
    const [fave, setFave] = useState(false);
    const recipeId = last(split(recipe.uri, "recipe_"));

    useEffect(() => {
        // set default favorites
        if (!isEmpty(favorites)) {
            setFave(!isEmpty(find(favorites, i => i.recipe_id === recipeId)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleFavorites = (value) => {
        setFave(value);
        if (value) {
            const payload = {
                recipe_id: recipeId,
                user_id: JSON.parse(localStorage.getItem(Token.Personal)).id
            };
            dispatch(postAddToFavorites(payload));
        } else {
            const recipe = find(favorites, i => i.recipe_id === recipeId);
            dispatch(postRemoveFromFavorites({ id: recipe.id }));
        }
        dispatch(getFavorites({ user_id: JSON.parse(localStorage.getItem(Token.Personal)).id }));
    };

    return (
        <div className={classNames(styles.wrapper, containerClass)}>
            <div className={classNames("group", styles["image-wrapper"], imageWrapperHeight)} onClick={onClick}>
                <Image
                    src={recipe.image}
                    className="group-hover:opacity-75"
                    alt={recipe.label}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <HeartIcon
                className={classNames(fave ? "text-primary" : "text-gray-300", styles["heart-icon"])}
                onClick={() => toggleFavorites(!fave)}
            />
            { !query.recipeId &&
                <h3 className={styles.label}>{recipe.label}</h3>
            }
        </div>
    );
};

export default CardComponent;
