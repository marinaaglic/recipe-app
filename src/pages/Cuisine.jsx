import { useState, useEffect } from "react";
import "../styles/_cuisine.scss";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

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
    <div className="div-grid">
      {cuisine.map((item) => {
        return (
          <div className="div-card" key={item.id}>
            <img src={item.image} />
            <h4>{item.title}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Cuisine;
