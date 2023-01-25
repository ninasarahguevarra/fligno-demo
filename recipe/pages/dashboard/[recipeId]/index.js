import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jsPDF } from "jspdf";
// import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react'
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import round from "lodash/round";
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
    const certificateTemplateRef = useRef(null);
    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            format: "a4",
            unit: "px",
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
        q: "",
    };
    useEffect(() => {
        if (!isEmpty(query) && isEmpty(recipeDetails)) {
            dispatch(getRecipeDetails(payload));
        }
    }, [query]);

    return (
        <DefaultLayout>
            <div className="flex justify-between">
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
                <>
                    <div ref={certificateTemplateRef} className="flex flex-col items-center">
                        <h3 className="my-4">{recipeDetails.recipe.label}</h3>
                        <CardComponent
                            recipe={recipeDetails.recipe}
                            containerClass="w-1/2"
                            onClick={() => viewRecipe(list)}
                        />
                    </div>
                    <div className="flex flex-col gap-y-4 mt-6">
                        <div>
                            <h5 className="font-medium mb-2">Diet Labels</h5>
                            <div className="flex gap-2">
                                { recipeDetails.recipe.dietLabels &&
                                    recipeDetails.recipe.dietLabels.map((dietLabel, index) => (
                                        <span key={index} className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                                            {dietLabel}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <h5 className="font-medium mb-2">Health Labels</h5>
                            <div className="flex gap-2 flex-wrap">
                                { recipeDetails.recipe.healthLabels &&
                                    recipeDetails.recipe.healthLabels.map((healthLabel, index) => (
                                        <span key={index} className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800">
                                            {healthLabel}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                        
                        <div>
                            <h5 className="font-medium mb-2">Ingredients</h5>
                            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                { recipeDetails.recipe.ingredients &&
                                    recipeDetails.recipe.ingredients.map((ingredient, index) => (
                                        <div key={index} className="flex gap-3">
                                            <img className="group-hover:opacity-75 h-24 w-24 rounded-md" src={ingredient.image} />
                                            <div>
                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                    {ingredient.foodCategory}
                                                </span>
                                                <p className="text-gray-700">{ingredient.text}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <h5 className="font-medium mb-2">Nutrition</h5>
                            <p className="text-sm">Servings: <span className="font-medium text-primary">{recipeDetails.recipe.yield}</span></p>
                            <p className="text-sm">Calories per serving: <span className="font-medium text-primary">{round(recipeDetails.recipe.calories / recipeDetails.recipe.yield)}</span></p>
                        </div>
                        <div>
                            <Link href={recipeDetails.recipe.shareAs} target="_blank" className="text-sm">
                                More detailed instructions can be found on <span className="font-medium text-primary">{recipeDetails.recipe.source}</span> 
                            </Link>
                        </div>
                    </div>
                </>
            }
        </DefaultLayout>
    )
};

export default RecipeDetails;
