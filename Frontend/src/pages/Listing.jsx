import React, { useContext, useRef, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import ExtraSpace from "../components/ExtraSpace";
import "./Listing.css";
import emptyImage from "../assets/emptyImage.png";
import { DataContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const Listing = () => {
  const { serverUrl } = useContext(DataContext);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [landMark, setLandMark] = useState();
  const [city, setCity] = useState();
  const [frontEndImage, setFrontendImage] = useState(emptyImage);
  const [backEndImage, setBackendImage] = useState();
  const file = useRef();

  const fileClick = () => {
    file.current.click();
  };

  const imageHandler = (e) => {
    setBackendImage(e.target.files[0]);
    let frontEndImageUrl = URL.createObjectURL(e.target.files[0]);
    setFrontendImage(frontEndImageUrl);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("landMark", landMark);
      formData.append("city", city);
      formData.append("backendImage", backEndImage);

      axios
        .post(`${serverUrl}/listing`, formData, { withCredentials: true })
        .then((response) => {
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("");
    setLandMark("");
    setCity("");
    setFrontendImage(emptyImage);
    setBackendImage("");
  };

  return (
    <div>
      <NavBar />
      <ExtraSpace />
      <div className="listing-main-container">
        <div className="listing-heading">
          <h1 style={{ color: "#ff385c" }}>List Your Home</h1>
        </div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div>
            <h5>Title:</h5>
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <h5>Description:</h5>
            <textarea
              style={{
                height: "200px",
                width: "100%",
                border: "2px solid #2c2c2c",
                marginTop: "2px",
                fontSize: "16px",
                padding: "5px",
                resize: "none",
                letterSpacing: "1px"
              }}
              placeholder="Description..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            ></textarea>
          </div>
          <div>
            <h5>Price:</h5>
            <input
              type="number"
              placeholder="Price..."
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <h5>Category:</h5>
            <select
              style={{ border: "2px solid #2c2c2c", marginTop: "3px" }}
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              required
            >
              <option value="">Select Category</option>
              <option value={"Trending"}>Trending</option>
              <option value={"Vila"}>Vila</option>
              <option value={"Farm House"}>Farm House</option>
              <option value={"Pool House"}>Pool House</option>
              <option value={"Rooms"}>Rooms</option>
              <option value={"Apartment"}>Apartment</option>
              <option value={"PG"}>PG</option>
              <option value={"Cabins"}>Cabins</option>
              <option value={"Shops"}>Shops</option>
            </select>
          </div>
          <div>
            <h5>Land Mark:</h5>
            <input
              type="text"
              placeholder="Location..."
              value={landMark}
              onChange={(e) => {
                setLandMark(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <h5>City:</h5>
            <select
              style={{ border: "2px solid #2c2c2c", marginTop: "3px" }}
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              required
            >
              <option value="">Select City</option>
              <option value={"Lahore"}>Lahore</option>
              <option value={"Karachi"}>Karachi</option>
              <option value={"Islamabad"}>Islamabad</option>
              <option value={"Rawalpindi"}>Rawalpindi</option>
              <option value={"Peshawar"}>Peshawar</option>
            </select>
          </div>
          <div>
            <h5>Image</h5>
            <div
              className="image"
              onClick={fileClick}
              style={{ backgroundImage: `url(${frontEndImage})` }}
            ></div>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={imageHandler}
              ref={file}
            />
          </div>
          <button className="list-btn">List</button>
        </form>
      </div>
    </div>
  );
};

export default Listing;
