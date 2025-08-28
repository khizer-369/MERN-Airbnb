import React, { useContext, useState } from "react";
import "./Card.css";
import { ListingDataContext } from "../../context/ListingContext";
import { FaCircleCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { DataContext } from "../../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const Card = ({ data }) => {
  const { getListingById } = useContext(ListingDataContext);
  const { serverUrl, userData } = useContext(DataContext);
  const [isBooked, setIsBooked] = useState(data.status);

  const listingViewHandler = () => {
    if (isBooked) {
      toast.error("Already Booked");
      return;
    }
    if (!userData) {
      toast.error("Please Login OR Signup");
      return;
    }
    getListingById(data._id);
  };

  const cancelBooking = () => {
    try {
      axios
        .delete(`${serverUrl}/cancel-booking/${data._id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setIsBooked(false);
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-container" onClick={listingViewHandler}>
      <div className="card-image-container">
        <div
          className="card-image"
          style={{
            backgroundImage: `url(${data.image})`,
            display: "flex",
            justifyContent: "end",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
            {isBooked && (
              <div
                style={{
                  height: "30px",
                  width: "90px",
                  backgroundColor: "#fff",
                  margin: "10px 10px 0px 0px",
                  color: "#16a34a",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FaCircleCheck
                  style={{
                    color: "#16a34a",
                    fill: "#16a34a",
                    fontSize: "20px",
                  }}
                />
                Booked
              </div>
            )}
            {isBooked && userData?._id == data.guest && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  cancelBooking();
                }}
                style={{
                  height: "30px",
                  width: "90px",
                  backgroundColor: "#fff",
                  margin: "10px 10px 0px 0px",
                  color: "#dc2626",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <FcCancel
                  style={{
                    fontSize: "20px",
                  }}
                />
                Cancel
              </div>
            )}
          </div>
        </div>
      </div>
      <p>{data.title}</p>
      <div>
        <span style={{ color: "#16a34a" }}>₹{data.price}/day</span>
      </div>
    </div>
  );
};

export default Card;
