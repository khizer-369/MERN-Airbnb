import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserContext from "./context/UserContext";
import Listing from "./pages/Listing";
import MyListing from "./pages/MyListing";
import ListingCard from "./pages/ListingCard";
import CategoryContext from "./context/CategoryContext";
import ListingContext from "./context/ListingContext";
import UpdateListing from "./pages/UpdateListing";
import MyBooking from "./pages/MyBooking";
import { ToastContainer } from 'react-toastify'

const App = () => {

  return (
    <UserContext>
      <CategoryContext>
        <ListingContext>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/my-listing" element={<MyListing />} />
            <Route path="/my-booking" element={<MyBooking/>}/>
            <Route path="/view-card/:id" element={<ListingCard />} />
            <Route path="/update-listing/:id" element={<UpdateListing/>}/>
          </Routes>
        </ListingContext>
      </CategoryContext>
    </UserContext>
  );
};

export default App;
