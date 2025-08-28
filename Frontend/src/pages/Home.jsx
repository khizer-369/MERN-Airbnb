import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import ExtraSpace from "../components/ExtraSpace";
import IconsBar from "../components/IconsBar/IconsBar";
import axios from "axios";
import { DataContext } from "../context/UserContext";
import { CategoryDataContext } from "../context/CategoryContext";
import Card from "../components/Card/Card";
import PriceFilter from "../components/PriceFilter/PriceFilter";
import { ListingDataContext } from "../context/ListingContext";

const Home = () => {
  const { serverUrl } = useContext(DataContext);
  const { category } = useContext(CategoryDataContext);
  const {
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    priceFilterStatus,
    setPriceFilterStatus,
  } = useContext(ListingDataContext);
  const [listingItems, setListingItems] = useState([]);
  const [displayListingItems, setDisplayListingItems] = useState(null);

  const getListingHandler = () => {
    try {
      axios.get(`${serverUrl}/all-listing`).then((response) => {
        setListingItems(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListingHandler();
  }, []);

  useEffect(() => {
    if (!category) {
      setDisplayListingItems(listingItems);
    } else {
      setDisplayListingItems(
        listingItems.filter((e) => e.category == category)
      );
    }
  }, [category, listingItems]);

  useEffect(() => {
    if (priceFilterStatus) {
      const filteredItems = listingItems.filter((e) => {
        const inPriceRange = e.price >= minPrice && e.price <= maxPrice;
        const inCategory = !category || e.category === category;
        return inPriceRange && inCategory;
      });
      setDisplayListingItems(filteredItems);
      setPriceFilterStatus(false);
      setMinPrice("");
      setMaxPrice("");
    }
  }, [priceFilterStatus]);

  return (
    <div style={{marginBottom: "5vh"}}>
      <NavBar />
      <ExtraSpace />
      <IconsBar />
      <PriceFilter />
      <div
        style={{
          minHeight: "73vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          rowGap: "20px",
        }}
      >
        {displayListingItems && displayListingItems.length > 0 ? (
          displayListingItems.map((e, i) => <Card key={i} data={e}></Card>)
        ) : (
          <div
            style={{
              fontSize: "25px",
              letterSpacing: "1px",
              fontWeight: "600",
            }}
          >
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
