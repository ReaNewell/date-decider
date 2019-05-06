import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
    const { foodPlace, funPlace, setFoodPlace, setFunPlace } = useContext(AppContext);
    const [ location, setLocation ] = useState();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState("");

    const handleSearch = () => {
        if (location) {
            setLoading(true);
            axios.post('/api/randomDate', { location })
                .then(res => {
                    if (res.data.foodPlace && res.data.funPlace) {
                        setFoodPlace(res.data.foodPlace);
                        setFunPlace(res.data.funPlace);
                        setError(false);
                    } else if (res.data.err) {       
                        setError(res.err)
                    } else {
                        console.log(res.data)
                    }
                    setLoading(false);
                });
        } else {
            setError("You need to input a location.")
        }
    }

    return (
        <form className='dashboard' onSubmit={(event) => {event.preventDefault(); handleSearch()}}>
            {/* // INPUTS */}
            <h1 className='dashboard__title'>Randm Date</h1>
            <input className='dashboard__input' onChange={(e) => setLocation(e.target.value) } placeholder='Location'/>

            { error && <p className='dashboard__error'>{error}</p> }

            <input className='dashboard__button' type='submit' value='Make my decision.'/>

            { loading && <div className='loader'/> }

            {/* // RESULTS */}
            { 
                !loading && foodPlace && 
                <div className='results'>
                    <div className='result'>
                        <h2 className='result__title'>Get some food at...</h2>
                        <p className='result__name'>{foodPlace.name}</p>
                        <p className='result__body'>{foodPlace.location}</p>
                        <p className='result__body'>{foodPlace.category}</p>
                    </div>
                    <div className='result'>
                        <h2 className='result__title'>Have some fun at...</h2>
                        <p className='result__name'>{funPlace.name}</p>
                        <p className='result__body'>{funPlace.location}</p>
                        <p className='result__body'>{funPlace.category}</p>
                    </div>
                </div>
            }
        </form>
    )
};

export default Dashboard;