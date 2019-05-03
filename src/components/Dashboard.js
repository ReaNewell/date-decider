import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
    const { foodPlace, funPlace, setFoodPlace, setFunPlace } = useContext(AppContext);
    const [ location, setLocation ] = useState();
    const [ loading, setLoading ] = useState(false);
    const [ restrauntCategories, setRestrauntCategories] = useState([]);
    const [ currentCategory, setCurrentCategory ] = useState();
    const [ error, setError ] = useState("");

    const handleSearch = () => {
        if (location) {
            setLoading(true);
            axios.post('/api/randomDate', {
                location,
                currentCategory
            }).then(res => {
                setFoodPlace(res.foodPlace);
                setFunPlace(res.funPlace);
                setLoading(false);
                setError(false);
            })
        } else {
            setError("You need to input a location.")
        }
    }

    useEffect(() => {
        const apiKey = 'KZYGV11BIQWERRMTDE0EC1GU3POA2ZBGXEAD4U0RWTU1TBEK';
        const secret = 'RXSHX4G25QD1WG1M3LLJ0ZDBXMLJ1LKX1KCL0LCQ3VCATHTZ';
        const version = 20190501;
        axios({
            method: 'get',
            url: `https://api.foursquare.com/v2/venues/categories?client_id=${apiKey}&client_secret=${secret}&v=${version}`
        }).then(res => {
            let cats = []
            res.data.response.categories[3].categories.forEach( category => {
                cats.push({id: category.id, name: category.name});
            })
            setRestrauntCategories(cats);
        })
    }, [])

    return (
        <form className='dashboard' onSubmit={(event) => {event.preventDefault(); handleSearch()}}>
            {/* // INPUTS */}
            <h1 className='dashboard__title'>Randm Date</h1>
            <input className='dashboard__input' onChange={(e) => setLocation(e.target.value) } placeholder='City'/>
            <label className='dashboard__label' >Restraunt Preference</label>
            <select defaultValue='4d4b7105d754a06374d81259' className='dashboard__input dashboard__input--select' onChange={(e) => setCurrentCategory(e.target.value)}>
                <option value={'4d4b7105d754a06374d81259'}>No Preference</option>
                { restrauntCategories.map( (category, index) => (
                    <option key={index} value={category.id}>{category.name}</option>
                ))}
            </select>

            { error && <p className='dashboard__error'>{error}</p> }

            <input className='dashboard__button' type='submit' value='Make my decision.'/>

            { loading && <div className='loader'/> }

            {/* // RESULTS */}
            { 
                !loading && foodPlace && 
                <div className='results'>
                    <h2 className='results__title'>Get some food at...</h2>
                    <div className='result'>
                        <h3>{foodPlace.name}</h3>
                        <p>{foodPlace.location}</p>
                        <p>Categories: {foodPlace.category}</p>
                    </div>
                    <h2 className='results__title'>Have some fun at...</h2>
                    <div className='result'>
                        <h3>{funPlace.name}</h3>
                        <p>{funPlace.location}</p>
                        <p>Categories: {funPlace.category}</p>
                    </div>
                </div>
            }
        </form>
    )
};

export default Dashboard;