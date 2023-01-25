import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import Link from "next/link";

import { selectRecipeList, getRecipeDetails } from "store/slices/recipeListSlice";
import DefaultLayout from "components/Layouts/DefaultLayout";
import ButtonComponent from "components/ButtonComponent";
import CardComponent from "components/CardComponent";

const RecipeDetails = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const { query } = router
    const { recipeDetails } = useSelector(selectRecipeList);
    const { recipe } = recipeDetails;

    const payload = {
        type: "public",
        diet: "balanced",
        id: query.recipeId,
        q: "",
    };
    useEffect(() => {
        if (isEmpty(recipeDetails) && query.recipeId) {
            dispatch(getRecipeDetails(payload));
        }
    }, []);

    return (
        <DefaultLayout>
            <ButtonComponent
                action="button"
                type="solid"
                label="Back"
                className="w-auto px-5"
                onClick={() => router.back()}
            />
            { !isEmpty(recipe) &&
                <div className="flex flex-col items-center">
                    <h3 className="my-4">{recipe.label}</h3>
                    <CardComponent
                        recipe={recipe}
                        onClick={() => viewRecipe(list)}
                    />
                    <Link href={recipe.url} target="_blank">Instruction can be found on {recipe.source}</Link>
                </div>
            }
        </DefaultLayout>
    )
};

export default RecipeDetails;
