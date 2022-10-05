import React from "react";
import { useNavigate } from "react-router-dom";
import AddEpisode from "./AddFilm";

function ButtonModalAddFilm(props) {
  const [modalShow, setModalShow] = React.useState(false);

  let Navigate = useNavigate();

  function addFilmHandler() {
    Navigate("/addmovies");
  }

  return (
    <>
      <button
        className="btn text-white fw-bold"
        onClick={addFilmHandler}
        style={{ background: "rgba(205, 46, 113, 1)", padding: "5px 25px" }}
      >
        Add Film
      </button>

      <AddEpisode show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default ButtonModalAddFilm;
