import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/_recipe.scss";

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  let params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };
  useEffect(() => {
    fetchDetails();
  }, [params.id]);
  return (
    <div className="wrapper-div">
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <div className="info-div">
        <button
          onClick={() => setActiveTab("instructions")}
          className={activeTab === "instructions" ? "active" : ""}
        >
          Instructions
        </button>
        <button
          onClick={() => setActiveTab("ingredients")}
          className={activeTab === "ingredients" ? "active" : ""}
        >
          Ingredients
        </button>
        {activeTab === "instructions" ? (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        ) : (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recipe;
