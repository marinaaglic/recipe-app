import { useState } from "react";
import "../styles/_search.scss";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;
