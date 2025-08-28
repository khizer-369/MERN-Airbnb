import React, { useEffect, useState } from "react";
import "./BookingCard.css";

const BookingCard = ({ data }) => {
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setcheckOutDate] = useState();
  const [stay, setStay] = useState();

  useEffect(() => {
    if (data) {
      setCheckInDate(
        new Date(data.checkIn).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
        })
      );
      setcheckOutDate(
        new Date(data.checkOut).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
        })
      );

      setStay(data.totalRent / data.price);
    }
  }, [data]);

  return (
    <div className="booking-card-container">
      <h4 style={{textAlign: "center"}}>{data.title}</h4>
      <div className="booking-card-image-container">
        <div
          className="booking-card-image"
          style={{
            backgroundImage: `url(${data.image})`,
            display: "flex",
            justifyContent: "end",
          }}
        ></div>
      </div>
      <div className="card-parts">
        <span style={{fontSize: "17px", fontWeight: "600"}}>{data.category}</span>
        <span style={{fontSize: "17px", fontWeight: "600"}}>{data.city}</span>
      </div>
      <div style={{}}>
        <span style={{fontSize: "17px", fontWeight: "600"}}>{data.landMark}</span>
      </div>
      <div className="card-parts">
        <h4>CheckIn: <span style={{fontSize: "15px", fontWeight: "500"}}>{checkInDate}</span></h4>
        <h4>CheckOut: <span style={{fontSize: "15px", fontWeight: "500"}}>{checkOutDate}</span></h4>
      </div>
      <div className="card-parts">
        <h4>{stay} <span style={{fontSize: "15px", fontWeight: "500"}}>days</span></h4>
        <span>×</span>
        <span style={{fontSize: "17px", fontWeight: "600"}}>{data.price}</span>
        <span>=</span>
        <span style={{fontSize: "17px", fontWeight: "600", color: "#16a34a"}}>₹{data.totalRent}</span>
      </div>
    </div>
  );
};

export default BookingCard;
