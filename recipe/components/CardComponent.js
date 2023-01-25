import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon } from "@heroicons/react/24/solid";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";
import last from "lodash/last";
import split from "lodash/split";
import { classNames } from "@/utils/helpers";
import { Token } from "@/utils/enum";
import { postAddToFavorites, postRemoveFromFavorites, selectFavorites, getFavorites } from "store/slices/favoritesSlice";
import styles from "assets/styles/CardComponent.module.scss"

const CardComponent = ({recipe, onClick, containerClass}) => {
    const dispatch = useDispatch();
    const router = useRouter()
    const { query } = router
    const { favorites } = useSelector(selectFavorites);
    const [fave, setFave] = useState(false);
    const recipeId = last(split(recipe.uri, "recipe_"));

    useEffect(() => {
        // set default favorites
        if (!isEmpty(favorites)) {
            setFave(!isEmpty(find(favorites, i => i.recipe_id === recipeId)));
        }
    }, []);

    const toggleFavorites = (value) => {
        setFave(value);
        if (value) {
            const payload = {
                recipe_id: recipeId,
                user_id: JSON.parse(localStorage.getItem(Token.Personal)).id,
            }
            dispatch(postAddToFavorites(payload));
        } else {
            const recipe = find(favorites, i => i.recipe_id === recipeId);
            dispatch(postRemoveFromFavorites({id: recipe.id}));
        }
        dispatch(getFavorites({user_id: JSON.parse(localStorage.getItem(Token.Personal)).id}));
    }

    return (
        <div className={classNames(styles.wrapper, containerClass)}>
            <div className={classNames('group',styles['image-wrapper'])} onClick={onClick}>
                <img className="group-hover:opacity-75" src={recipe.image} alt={recipe.label} />
            </div>
            <HeartIcon
                className={classNames(fave ? "text-primary" : "text-gray-300", styles['heart-icon'])}
                onClick={() => toggleFavorites(!fave)}
            />
            { !query.recipeId &&
                <h3 className={styles.label}>{recipe.label}</h3>
            }
        </div>
    )
};

export default CardComponent;
