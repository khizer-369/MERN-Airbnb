import React, { createContext, useContext, useState } from 'react';
import { DataContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ListingDataContext = createContext();

const ListingContext = ({ children }) => {
    const navigate = useNavigate();
    const { serverUrl } = useContext(DataContext);
    const [cardViewData, setCardViewData] = useState(null);
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [priceFilterStatus, setPriceFilterStatus] = useState(false);

    const getListingById = (ID) => {
        try {
            axios.post(`${serverUrl}/listing-card/${ID}`, {}, { withCredentials: true }).then((response) => {
                setCardViewData(response.data);
                navigate(`/view-card/${ID}`);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const data = { cardViewData, setCardViewData, getListingById,  minPrice, setMinPrice, maxPrice, setMaxPrice, priceFilterStatus, setPriceFilterStatus};
    return (
        <ListingDataContext.Provider value={data}>
            {children}
        </ListingDataContext.Provider>
    )
}

export default ListingContext
