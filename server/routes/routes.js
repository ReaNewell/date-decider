const { Router } = require('express');
const axios = require('axios');
const router = new Router();

router.post('/randomDate', (req, res) => {
    const { apiKey, secret, version } = require('../config/config');
    const { location } = req.body;

    let selectedRestaurant;
    let selectedEntertainment;
    const categories = (selecedVenue) => {
        let cats = [];
        selecedVenue.categories.forEach(category => {
            cats.push(category.name);
        })
        return cats;
    };

    axios.get(`https://api.foursquare.com/v2/venues/search?near=${location}&radius=20000&limit=50&categoryId=4d4b7105d754a06374d81259&client_id=${apiKey}&client_secret=${secret}&v=${version}`)
        .then((response) => {
            if (response.data.response.venues) {
                //Selects a restaurant
                selectedRestaurant = response.data.response.venues[Math.floor(Math.random()*response.data.response.venues.length)];
    
                axios.get(`https://api.foursquare.com/v2/venues/search?near=${location}&radius=20000&limit=50&categoryId=4d4b7104d754a06370d81259&client_id=${apiKey}&client_secret=${secret}&v=${version}`)
                    .then(response => {
                        if (response.data.response.venues) {
                            entertainment = response.data.response.venues;
                            selectedEntertainment = response.data.response.venues[Math.floor(Math.random()*response.data.response.venues.length)];
    
                            // Set data for both venues.
                            res.send({
                                foodPlace: {
                                    name: selectedRestaurant.name,
                                    location: selectedRestaurant.location.address !== undefined ? `${selectedRestaurant.location.address} , ${selectedRestaurant.location.city}` : selectedRestaurant.location.city,
                                    category: categories(selectedRestaurant)
                                },
                                funPlace: {
                                    name: selectedEntertainment.name,
                                    location: selectedEntertainment.location.address !== undefined ? `${selectedEntertainment.location.address} , ${selectedEntertainment.location.city}` : selectedEntertainment.location.city,
                                    category: categories(selectedEntertainment)
                                }
                            });
                        } else {
                            res.send({err: 'Venues not found.'})
                        }
                    })
            } else {
                res.send({err: 'Venues not found.'})
            }
            
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;