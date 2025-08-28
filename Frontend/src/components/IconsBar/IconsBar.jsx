import React, { useContext, useState } from "react";
import { MdOutlineWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { FaSwimmer } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { MdApartment } from "react-icons/md";
import { MdOutlineBedroomParent } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { FaThLarge } from "react-icons/fa";
import "./IconsBar.css";
import { CategoryDataContext } from "../../context/CategoryContext";
import { ListingDataContext } from "../../context/ListingContext";

const IconsBar = () => {
  const {setMinPrice, setMaxPrice} = useContext(ListingDataContext); 
  const { setCategory } = useContext(CategoryDataContext);
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <div className="icons-bar-container">
      <div className="icons-container" style={{ backgroundColor: activeCategory == "All" ? "#f0f0f0" : "" }} onClick={() => {
        setCategory(null);
        setActiveCategory("All");
        setMinPrice(null);
        setMaxPrice(null);
      }}>
        <FaThLarge className="icon" />
        <h5>All</h5>
      </div>
      <div className="icons-container" style={{ backgroundColor: activeCategory == "Trending" ? "#f0f0f0" : "" }} onClick={() => {
        setCategory("Trending");
        setActiveCategory("Trending");
      }}>
        <MdOutlineWhatshot />
        <h5>Trending</h5>
      </div>
      <div className="icons-container" style={{ backgroundColor: activeCategory == "Vila" ? "#f0f0f0" : "" }} onClick={() => {
        setCategory("Vila");
        setActiveCategory("Vila");
      }}>
        <GiFamilyHouse className="icon" />
        <h5>Vila</h5>
      </div>
      <div className="icons-container" style={{ backgroundColor: activeCategory == "Farm House" ? "#f0f0f0" : "" }} onClick={() => {
        setCategory("Farm House");
        setActiveCategory("Farm House");
      }}>
        <FaHome className="icon" />
        <h5>Farm House</h5>
      </div>
      <div className="icons-container" style={{ backgroundColor: activeCategory == "Pool House" ? "#f0f0f0" : "" }} onClick={() => {
        setCategory("Pool House");
        setActiveCategory("Pool House");
      }}>
        <FaSwimmer className="icon" />
        <h5>Pool House</h5>
      </div>
      <div className="icons-container" style={{ backgroundColor: activeCategory == "Rooms" ? "#f0f0f0" : "" }} onClick={() => {
        setCategory("Rooms");
        setActiveCategory("Rooms");
      }}>
        <MdBedroomParent className="icon" />
        <h5>Rooms</h5>
      </div>
      <div className="icons-container" style={{ backgroundColor: activeCategory == "Apartment" ? "#f0f0f0" : "" }} onClick={() => {
        setCategory("Apartment");
        setActiveCategory("Apartment");
      }}>
        <MdApartment className="icon" />
        <h5>Apartment</h5>
      </div>
      <div className="icons-container" style={{ backgroundColor: activeCategory == "PG" ? "#f0f0f0" : "" }} onClick={() => {
        setCategory("PG");
        setActiveCategory("PG");
      }}>
        <MdOutlineBedroomParent className="icon" />
        <h5>PG</h5>
      </div>
      <div className="icons-container" style={{ backgroundColor: activeCategory == "Cabins" ? "#f0f0f0" : "" }} onClick={() => {
        setCategory("Cabins");
        setActiveCategory("Cabins");
      }}>
        <GiWoodCabin className="icon" />
        <h5>Cabins</h5>
      </div>
      <div className="icons-container" style={{ backgroundColor: activeCategory == "Shops" ? "#f0f0f0" : "" }} onClick={() => {
        setCategory("Shops");
        setActiveCategory("Shops");
      }}>
        <FaShop className="icon" />
        <h5>Shops</h5>
      </div>
    </div>
  );
};

export default IconsBar;
