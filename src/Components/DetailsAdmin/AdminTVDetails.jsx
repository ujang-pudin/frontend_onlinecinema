import React from "react";
import TopNavbarAdmin from "../Utility/TopNavAdmin";
import AdminTVContentDetails from "./AdminTVContentDetails";

const AdminTVDetails = () => {
  const title = "Film Detail";
  document.title = "CinemaOnline | " + title;
  return (
    <div className="app">
      <TopNavbarAdmin />
      <AdminTVContentDetails />
    </div>
  );
};

export default AdminTVDetails;
