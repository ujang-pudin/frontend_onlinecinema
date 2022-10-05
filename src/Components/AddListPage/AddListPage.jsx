import ContentMoviesAdmin from "../AdminHome/ContentMovies";
import ContentTVAdmin from "../AdminHome/ContentTVAdmin";
import TopNavbarAdmin from "../Utility/TopNavAdmin";
import React, { useState, useEffect } from "react";
import ButtonModalAddFilm from "../AddFilm/ButtonModalAddFilm";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { Link } from "react-router-dom";

function AddListPage() {
  const title = "List Film Page";
  document.title = "CinemaOnline | " + title;
  const [category, setCategory] = useState("category");
  const [allCategory, setAllCategory] = useState("allCategory");
  const [dataFilm, setDataFilm] = useState();

  let { data: films } = useQuery("filmsCacheAll", async () => {
    const response = await API.get("/film");
    return response.data.data;
  });

  function getFilm() {
    const newData = films?.map((item, id) => {
      return item;
    });
    // console.log(newData);

    setDataFilm(newData);
  }

  useEffect(() => {
    getFilm();
  }, [films]);

  let { data: categoryName } = useQuery("categoryCache", async () => {
    const response = await API.get("/category");
    return response.data.data;
  });

  // console.log({ ...films });
  console.log(category);
  useEffect(() => {
    setAllCategory("allCategory");
  }, [category]);

  return (
    <div style={{ backgroundColor: "black" }}>
      <TopNavbarAdmin />

      <div className="mt-5 " style={{ marginTop: "5rem" }}>
        <div className="d-flex justify-content-between mb-3">
          <h4 style={{ paddingLeft: "5rem", color: "white" }}>List Film</h4>
          <div style={{ paddingRight: "5rem" }}>
            <ButtonModalAddFilm />
          </div>
        </div>

        {/* </div> */}
      </div>
      <div
        className="row"
        style={{ backgroundColor: "black", height: "100vh" }}
      >
        <div
          className="container"
          style={{ borderTop: "2px solid white", backgroundColor: "black" }}
        >
          <div
            className="row row-cols-1 row-cols-md-6 g-5 my-5 d-flex justify-content-center"
            // style={{ boxSizing: "border-box" }}
          >
            {dataFilm?.map((item, id) => {
              return (
                <div className="col-md-2 mb-5">
                  <div className="card h-100">
                    <Link
                      to={"/admintvdetails/" + item.id}
                      key={id}
                      className="card_item"
                    >
                      <img
                        src={item.thumbnailfilm}
                        className="card-img"
                        style={{ height: "250px" }}
                        alt="img"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddListPage;
