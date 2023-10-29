import { useState, useEffect } from "react";
import "../styles/_cuisine.scss";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  const [recipeCount, setRecipeCount] = useState(10);
  const [totalRecipes, setTotalRecipes] = useState(0);
  let params = useParams();
  const getCuisine = async (name, number) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=${number}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
    setTotalRecipes(recipes.totalResults);
  };
  const loadMoreRecipes = () => {
    const newRecipeCount = recipeCount + 10;
    if (newRecipeCount <= totalRecipes) {
      setRecipeCount(newRecipeCount);
      getCuisine(params.type, newRecipeCount);
    }
  };

  useEffect(() => {
    getCuisine(params.type, recipeCount);
  }, [params.type, recipeCount]);
  return (
    <>
      <motion.div
        className="div-grid"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {cuisine.map((item) => {
          return (
            <div className="cuisine-div" key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="img-cuisine"
                />
                <div className="title-div">
                  <p className="p-title">{item.title}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </motion.div>

      <div className="button-div">
        <p className="p-total">
          Displaying {Math.min(recipeCount, totalRecipes)} of {totalRecipes}
        </p>

        {recipeCount < totalRecipes && (
          <button className="btn-load" onClick={loadMoreRecipes}>
            Load More Recipes
          </button>
        )}
      </div>
    </>
  );
};

export default Cuisine;
