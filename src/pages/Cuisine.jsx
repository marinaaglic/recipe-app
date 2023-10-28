import { useState, useEffect } from "react";
import "../styles/_cuisine.scss";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();
  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);
  return (
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
              <img src={item.image} alt={item.title} className="img-cuisine" />
              <div className="title-div">
                <p className="p-title">{item.title}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Cuisine;
