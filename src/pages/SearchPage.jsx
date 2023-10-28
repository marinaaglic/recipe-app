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
          <div className="search-div" key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt={item.title} className="img-search" />
              <div className="title-div">
                <p className="p-title">{item.title}</p>
              </div>
              {/* <img src={item.image} alt={item.title} />
              <p>{item.title}</p> */}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SearchPage;
