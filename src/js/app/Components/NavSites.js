import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../Utils/DataContext";

const NavSites = () => {
  const { sitename } = useParams();
  const { data } = useContext(DataContext);
  const cd = data.filter((e) => e.slug === sitename);
  const content = cd[0].content || "";
  const userName = cd[0].title;

  return (
    <>
      <h1>{userName}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

export default NavSites;
