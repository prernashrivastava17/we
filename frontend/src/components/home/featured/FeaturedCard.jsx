import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { imageUrl, getAllCategories } from "../../utils/category";
import { showAlert } from "../../utils/showAlert";

const FeaturedCard = () => {
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  const handleGetallCategories = async () => {
    try {
      const resp = await getAllCategories();
      console.log(resp);
      setAllCategories(resp && resp.data);
    } catch (error) {
      showAlert("something Went Wrong", "Error");
    }
  };

  useEffect(() => {
    handleGetallCategories();
    console.log("allCategories", allCategories);
  }, []);
  return (
    <>
      <div className="content grid5 mtop">
        {allCategories &&
          allCategories?.map((category) => (
            <div
              className="box"
              style={{ flexDirection: "row" }}
              onClick={() => navigate(`/${category?.name}`)}
            >
              <img
                src={
                  category?.img === null
                    ? "/images/default_user.png"
                    : imageUrl(category?.img)
                }
                alt=""
              />
              <h4>{category?.name}</h4>
            </div>
          ))}
      </div>
    </>
  );
};

export default FeaturedCard;
