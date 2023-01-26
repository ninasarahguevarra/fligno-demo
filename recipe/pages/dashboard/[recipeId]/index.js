import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import round from "lodash/round";
import Link from "next/link";
import Image from "next/image";
import { selectRecipeList, getRecipeDetails } from "store/slices/recipeListSlice";
import DefaultLayout from "components/Layouts/DefaultLayout";
import ButtonComponent from "components/ButtonComponent";
import CardComponent from "components/CardComponent";
import TagComponent from "components/TagComponent";
import RecipeContentComponent from "components/RecipeContentComponent";
import styles from "assets/styles/RecipeDetails.module.scss";

const RecipeDetails = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;
    const { recipeDetails } = useSelector(selectRecipeList);
    const certificateTemplateRef = useRef(null);
    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            format: "a4",
            unit: "px"
        });

        // Adding the fonts
        doc.setFont("Anton-Regular", "normal");

        doc.html(certificateTemplateRef.current, {
            async callback(doc) {
                // save the document as a PDF with name of Recipe
                doc.save("Recipe");
            }
        });
    };

    const payload = {
        type: "public",
        diet: "balanced",
        id: query.recipeId,
        q: ""
    };

    useEffect(() => {
        if (!isEmpty(query) && isEmpty(recipeDetails)) {
            dispatch(getRecipeDetails(payload));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return (
        <DefaultLayout>
            <div className={styles["button-wrapper"]}>
                <ButtonComponent
                    action="button"
                    type="solid"
                    label="Back"
                    className="w-auto px-5"
                    onClick={() => router.back()}
                />
                <ButtonComponent
                    action="button"
                    type="solid"
                    label="Export to PDF"
                    className="w-auto px-5"
                    onClick={handleGeneratePdf}
                />
            </div>
            { !isEmpty(recipeDetails) &&
                <div ref={certificateTemplateRef} className={styles.wrapper}>
                    <div className="flex flex-col items-center">
                        <h3 className="my-4">{recipeDetails.recipe.label}</h3>
                        <CardComponent
                            recipe={recipeDetails.recipe}
                            containerClass="w-1/2"
                            imageWrapperHeight="h-56 md:h-80 lg:h-96"
                        />
                    </div>
                    <div className="flex flex-col gap-y-4 mt-6">
                        <RecipeContentComponent
                            title="Diet Labels"
                            items={recipeDetails.recipe.dietLabels}
                            tagTextColor="text-green-800"
                            tagBgColor="bg-green-100"
                        />

                        <RecipeContentComponent
                            title="Health Labels"
                            items={recipeDetails.recipe.healthLabels}
                            tagTextColor="text-yellow-800"
                            tagBgColor="bg-yellow-100"
                        />

                        <div>
                            <h5>Ingredients</h5>
                            <div className={styles["grid-class"]}>
                                { recipeDetails.recipe.ingredients &&
                                    recipeDetails.recipe.ingredients.map((ingredient, index) => (
                                        <div key={index} className="flex gap-3">
                                            <Image
                                                src={ingredient.image}
                                                className="group-hover:opacity-75"
                                                height={96}
                                                width={96}
                                                priority
                                                alt={ingredient.text}
                                            />
                                            <div>
                                                <TagComponent
                                                    key={index}
                                                    label={ingredient.foodCategory}
                                                    textColor="text-red-800"
                                                    bgColor="bg-red-100"
                                                />
                                                <p className="text-gray-700">{ingredient.text}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div>
                            <h5>Nutrition</h5>
                            <p>Servings: <span>{recipeDetails.recipe.yield}</span></p>
                            <p>Calories per serving: <span>{round(recipeDetails.recipe.calories / recipeDetails.recipe.yield)}</span></p>
                        </div>

                        <div>
                            <Link href={recipeDetails.recipe.shareAs} target="_blank" className="text-sm">
                                More detailed instructions can be found on <span className="font-medium text-primary">{recipeDetails.recipe.source}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </DefaultLayout>
    );
};

export default RecipeDetails;
