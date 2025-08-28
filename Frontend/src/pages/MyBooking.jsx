import React, { useContext } from "react";
import NavBar from "../components/NavBar/NavBar";
import ExtraSpace from "../components/ExtraSpace";
import { DataContext } from "../context/UserContext";
import Card from "../components/Card/Card";
import BookingCard from "../components/BookingCard/BookingCard";

const MyBooking = () => {
  const { userData } = useContext(DataContext);

  return (
    <div style={{marginBottom: "5vh"}}>
      <NavBar />
      <ExtraSpace />
      <div
        style={{
          minHeight: "73vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          rowGap: "20px",
          paddingTop: "20px",
        }}
      >
        {userData && userData.booking.length > 0 ? (
          userData.booking
            .slice()
            .reverse()
            .map((e, i) => <BookingCard key={i} data={e} />)
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

export default MyBooking;
