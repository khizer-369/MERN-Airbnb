import React, { useContext } from 'react'
import "./PriceFilter.css";
import { ListingDataContext } from '../../context/ListingContext';
import { toast } from 'react-toastify';

const PriceFilter = () => {
    const { minPrice, setMinPrice, maxPrice, setMaxPrice, setPriceFilterStatus } = useContext(ListingDataContext);

    const priceFilterHandler = (e)=>{
        e.preventDefault();
        setPriceFilterStatus(true);
        toast.success("Filter Apply");
    }
    return (
        <div className='price-filter-main-container'>
            <h1 style={{ color: "#ff385c" }}>Price Filter</h1>
            <form className="price-filter-container" onSubmit={(e)=>{priceFilterHandler(e)}}>
                <input className='price-filter-inputs' style={{ height: "40px", width: "100%" }} type="number" placeholder='Min Price ...' value={minPrice} onChange={(e) => {
                    setMinPrice(e.target.value);
                }} required/>
                <div>
                    <input className='price-filter-inputs' style={{ height: "40px", width: "75%" }} type="number" placeholder='Max Price ...' value={maxPrice} onChange={(e) => {
                        setMaxPrice(e.target.value);
                    }} required/>
                    <button className='price-filter-btn' style={{ height: "40px", width: "25%" }}>Apply </button>
                </div>
            </form>
        </div>
    )
}

export default PriceFilter
