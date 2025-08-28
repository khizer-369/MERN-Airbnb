import React, { useContext } from "react";
import { DataContext } from "../context/UserContext";
import NavBar from "../components/NavBar/NavBar";
import ExtraSpace from "../components/ExtraSpace";
import Card from "../components/Card/Card";

const MyListing = () => {
  const { userData } = useContext(DataContext);
  
  return (
    <div style={{marginBottom: "5vh"}}>
      <NavBar />
      <ExtraSpace />
      <div style={{
        minHeight: "73vh",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        rowGap: "20px",
        paddingTop: "20px",
      }}>
        {(userData && userData.listing.length > 0) ? userData.listing.map((e, i) => (
          <Card key={i} data={e} />
        )) : <div style={{ fontSize: "25px", letterSpacing: "1px", fontWeight: "600" }}>No data available</div>}
      </div>
    </div>
  );
};

export default MyListing;
