import React, { useContext, useEffect, useState } from "react";
import { ListingDataContext } from "../context/ListingContext";
import NavBar from "../components/NavBar/NavBar";
import ExtraSpace from "../components/ExtraSpace";
import { useParams } from "react-router-dom";
import "./ListingCard.css";
import { DataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";

const ListingCard = () => {
  const { serverUrl, userData } = useContext(DataContext);
  const { cardViewData, setCardViewData } = useContext(ListingDataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingContainer, setBookingContainer] = useState(false);
  const [today, setToday] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [totalRent, setTotalRent] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [landMark, setLandMark] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    try {
      axios
        .post(`${serverUrl}/listing-card/${id}`, {}, { withCredentials: true })
        .then((response) => {
          setCardViewData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const updateListingNavigationHandler = () => {
    navigate(`/update-listing/${id}`);
  };

  const deleteListingHandler = () => {
    try {
      axios
        .delete(`${serverUrl}/delete-listing/${id}`, { withCredentials: true })
        .then((response) => {
          navigate("/");
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-CA"));
  }, []);

  useEffect(() => {
    if (cardViewData) {
      setTitle(cardViewData.title);
      setImage(cardViewData.image);
      setCity(cardViewData.city);
      setLandMark(cardViewData.landMark);
      setPrice(cardViewData.price);
      setCategory(cardViewData.category);
    }
  }, [cardViewData]);

  useEffect(() => {
    if (checkIn && checkOut) {
      let date1 = new Date(checkIn);
      let date2 = new Date(checkOut);
      setTotalDays((date2 - date1) / (24 * 60 * 60 * 1000));
      setTotalRent(totalDays * cardViewData.price);
    }
  }, [checkIn, checkOut, totalDays, totalRent]);

  const bookingHandler = () => {
    setLoader(true);
    if (totalRent <= 0) {
      toast.error("Please Provide Right Details");
      return;
    }
    try {
      axios
        .post(
          `${serverUrl}/booking/${id}`,
          {
            checkIn,
            checkOut,
            totalRent,
            totalDays,
            title,
            image,
            city,
            landMark,
            price,
            category,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setLoader(false);
          setBookingContainer(false);
          navigate("/");
          toast.success(response.data.message);
        })
        .catch((error) => {
          setLoader(false);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
    setCheckIn("");
    setCheckOut("");
    setTotalRent(0);
  };

  return (
    <div className="card-view-main-container">
      <NavBar />
      <ExtraSpace />
      {cardViewData && (
        <div className="card-view-container">
          <div className="card-view-parts">
            <h2>{cardViewData.title}</h2>
            <img className="image" src={cardViewData.image} />
            <h3>
              Category:{" "}
              <p style={{ fontSize: "16px", paddingTop: "5px" }}>
                {cardViewData.category}
              </p>
            </h3>
          </div>
          <div className="card-view-parts" style={{ paddingTop: "12px" }}>
            <h3>
              Location:{" "}
              <p style={{ fontSize: "15px", paddingTop: "5px" }}>
                {cardViewData.landMark}
              </p>
            </h3>
            <h3>
              City:{" "}
              <p style={{ fontSize: "15px", paddingTop: "5px" }}>
                {cardViewData.city}
              </p>
            </h3>
            <h3>
              Description:{" "}
              <p
                style={{
                  fontSize: "15px",
                  paddingTop: "5px",
                  fontWeight: "500",
                  letterSpacing: "1px",
                }}
              >
                {cardViewData.description}
              </p>
            </h3>
            <h3>
              Price:{" "}
              <p
                style={{
                  color: "#16a34a",
                  fontSize: "17px",
                  paddingTop: "5px",
                  fontWeight: "500",
                }}
              >
                ₹{cardViewData.price}/day
              </p>
            </h3>
          </div>
        </div>
      )}
      {cardViewData &&
        (userData?._id != cardViewData?.host ? (
          <div className="card-btns">
            <button
              onClick={() => {
                setBookingContainer(true);
              }}
            >
              Book
            </button>
          </div>
        ) : (
          <div className="card-btns">
            <button onClick={updateListingNavigationHandler}>Edit</button>{" "}
            <button onClick={deleteListingHandler}>Delete</button>
          </div>
        ))}
      {bookingContainer && (
        <div className="booking-container">
          <div className="cross-section">
            <ImCross
              style={{ fontSize: "22px", cursor: "pointer" }}
              onClick={() => {
                setBookingContainer(false);
              }}
            />
          </div>
          <h1 style={{ color: "#ff385c" }}>Confirm Booking</h1>
          <div className="booking-input-container">
            <p>Check In Date:</p>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            />
          </div>
          <div className="booking-input-container">
            <p>Check Out Date:</p>
            <input
              disabled={!checkIn}
              type="date"
              min={
                checkIn
                  ? new Date(new Date(checkIn).getTime() + 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  : today
              }
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
            />
          </div>
          <div className="booking-input-container">
            <p>Total Rent:</p>
            <input type="number" readOnly value={totalRent} />
          </div>
          <button
            className="booking-btn"
            onClick={bookingHandler}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px"
            }}
          >
            Confirm Booking {loader && <div className="loader"></div>}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingCard;
