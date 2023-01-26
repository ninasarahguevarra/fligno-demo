import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";
import split from "lodash/split";
import last from "lodash/last";
import isEmpty from "lodash/isEmpty";
import { Token } from "utils/enum";
import { selectRecipeList, getRecipeList, setRecipeDetails } from "store/slices/recipeListSlice";
import { getFavorites, selectFavorites } from "store/slices/favoritesSlice";
import DefaultLayout from "components/Layouts/DefaultLayout";
import PaginationComponent from "components/PaginationComponent";
import ButtonComponent from "components/ButtonComponent";
import CardComponent from "components/CardComponent";
import styles from "assets/styles/Dashboard.module.scss";

const Home = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { favorites } = useSelector(selectFavorites);
    const { recipeList, isLoading } = useSelector(selectRecipeList);
    const [paginationArr, setPaginationArr] = useState([""]);
    const csvHeaders = ["label", "dietLabels", "ingredientLines"];
    const [csvData, setCsvData] = useState([csvHeaders]);
    const payload = {
        type: "any",
        diet: "balanced"
    };

    useEffect(() => {
        if (isEmpty(recipeList)) {
            dispatch(getRecipeList(payload));
        }
        if (isEmpty(favorites) && !isEmpty(JSON.parse(localStorage.getItem(Token.Personal)))) {
            dispatch(getFavorites({ user_id: JSON.parse(localStorage.getItem(Token.Personal)).id }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // START OF CSV EXPORT
    useEffect(() => {
        const tempCsvData = [];
        tempCsvData.push(csvHeaders);

        recipeList?.hits?.map((item) => {
            tempCsvData.push([item.recipe.label, item.recipe.dietLabels, item.recipe.ingredientLines]);
        });
        setCsvData(tempCsvData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeList]);
    // END OF CSV EXPORT

    const viewRecipe = (recipe) => {
        dispatch(setRecipeDetails(recipe));
        const recipeId = last(split(recipe.recipe.uri, "recipe_"));
        router.push({
            pathname: "/dashboard/[recipeId]",
            query: { recipeId }
        });
    };

    // START OF PAGINATION
    const getCont = !isEmpty(recipeList)
        ? decodeURI(recipeList._links.next.href)
            .replace("?", "")
            .split("&")
            .map((param) => param.split("="))
            .reduce((values, [key, value]) => {
                values[key] = value;
                return values;
            }, {})
        : { _cont: "" };

    const onPreviousPage = () => {
        const clonedArr = [...paginationArr];
        clonedArr.pop();
        setPaginationArr(clonedArr);
        const previousCont = paginationArr[paginationArr.length - 2];
        const items = { ...payload };
        if (!isEmpty(previousCont)) {
            items._cont = previousCont;
        }
        dispatch(getRecipeList(items));
    };

    const onNextPage = () => {
        setPaginationArr((prevArray) => [...prevArray, getCont._cont]);
        const items = { ...payload };
        if (!isEmpty(paginationArr)) {
            items._cont = getCont._cont;
        }
        dispatch(getRecipeList(items));
    };
    // END OF PAGINATION

    return (
        <DefaultLayout>
            { !isEmpty(recipeList) &&
                <>
                    <div className={styles["csv-wrapper"]}>
                        <ButtonComponent
                            action="button"
                            className="w-auto"
                        >
                            <CSVLink
                                data={csvData}
                                filename="recipe.csv"
                            >
                                Export as CSV
                            </CSVLink>
                        </ButtonComponent>
                    </div>
                    <div className={styles["card-wrapper"]}>
                        {recipeList &&
                            recipeList.hits?.map((list, index) => (
                                <CardComponent
                                    key={index}
                                    recipe={list.recipe}
                                    onClick={() => viewRecipe(list)}
                                />
                            ))}
                    </div>
                    <PaginationComponent
                        hasPrevious={!isEmpty(paginationArr)}
                        hasNext={!isEmpty(getCont._cont)}
                        from={recipeList.from}
                        to={recipeList.to}
                        count={recipeList.count}
                        onNextPage={onNextPage}
                        onPreviousPage={onPreviousPage}
                    />
                </>
            }
        </DefaultLayout>
    );
};

export default Home;
