import PropTypes from "prop-types";
import { useState } from "react";

// onclick function here using spread operator

export default function Inputs({ search, setSearch, handleSubmit }) {
  //   const [toggle, setToggle] = useState(false);
  const [genreClick, setGenreClick] = useState([]);

  console.log("genreClick", genreClick);

  function checkValue(array, e) {
    const index = array.indexOf(e.target.value);
    if (index === -1) {
      setGenreClick([...genreClick, e.target.value]);
    } else {
      const updatedArray = array.filter((item) => item !== e.target.value);
      setGenreClick(updatedArray);
    }
  }

  function handleGenreClick(e) {
    checkValue(genreClick, e);
  }

  //   function handleGenreClick(e) {
  //     const arr = [];
  //     console.log("arr", arr);
  //     for (let i = 0; i <= genreClick.length; i++) {
  //       console.log("genreClick[i]", genreClick[i]);
  //       if (genreClick[i] !== e.target.value) {
  //         arr.push(e.target.value);
  //       }
  //     }
  //   }

  //   function handleGenreClick(e) {
  //     if (toggle === false) {
  //       setGenreClick([...genreClick, e.target.value]) & setToggle(true);
  //     } else {
  //       setGenreClick("") & setToggle(false);
  //     }
  //   }

  //

  return (
    <>
      <div>
        <input
          placeholder="Search"
          value={search}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            // should this be a string?
            value={"35"}
            onClick={(e) => handleGenreClick(e)}
          />
          Comedy
        </label>
        <label>
          <input
            type="checkbox"
            value={"18"}
            onClick={(e) => handleGenreClick(e)}
          />
          Drama
        </label>
        <label>
          <input type="checkbox" value={28} />
          Action
        </label>
      </div>
    </>
  );
}

Inputs.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
