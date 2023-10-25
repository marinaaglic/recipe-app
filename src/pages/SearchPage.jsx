import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/_searchPage.scss";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchedRecipes, setSearchRecipes] = useState([]);
  let params = useParams();
  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchRecipes(recipes.results);
  };
  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);
  return (
    <div className="div-grid">
      {searchedRecipes.map((item) => {
        return (
          <div className="div-card" key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SearchPage;
