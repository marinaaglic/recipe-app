import React from "react";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import "../styles/_category.scss";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <div className="div-icons">
      <NavLink to={"/cuisine/Italian"} className="styled-link">
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink to={"/cuisine/American"} className="styled-link">
        <FaHamburger />
        <h4>American</h4>
      </NavLink>
      <NavLink to={"/cuisine/Thai"} className="styled-link">
        <GiNoodles />
        <h4>Thai food</h4>
      </NavLink>
      <NavLink to={"/cuisine/Japanese"} className="styled-link">
        <GiChopsticks />
        <h4>Japanese</h4>
      </NavLink>
    </div>
  );
};

export default Category;
