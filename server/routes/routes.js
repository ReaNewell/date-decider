const { Router } = require('express');
const axios = require('axios');
const router = new Router();

router.post('/randomDate', (req, res) => {
    const { apiKey, secret, version } = require('../config/config');
    const { location, currentCategory } = req.body;

    let restraunts;
    let selectedRestraunt;
    let entertainment;
    let selectedEntertainment;
    const categories = (selecedVenue) => {
        let cats = [];
        selecedVenue.categories.forEach(category => {
            cats.push(category.name);
        })
        return cats;
    };

    axios({
        method: 'get',
        url: `https://api.foursquare.com/v2/venues/search?client_id=${apiKey}&client_secret=${secret}&v=${version}`,
        params: {
            near: location,
            radius: 20000,
            limit: 50,
            categoryId: currentCategory
        }
    })
        .then((response) => {
            restraunts = response.data.response.venues;
            selectedRestraunt = restraunts[Math.floor(Math.random()*restraunts.length)];

            axios({
                method: 'get',
                url: `https://api.foursquare.com/v2/venues/search?client_id=${apiKey}&client_secret=${secret}&v=${version}`,
                params: {
                    near: location,
                    radius: 20000,
                    limit: 50,
                    categoryId: '4d4b7104d754a06370d81259'
                }
            })
                .then(response => {
                    entertainment = response.data.response.venues;
                    selectedEntertainment = entertainment[Math.floor(Math.random()*entertainment.length)];

                    // Set data for both venues.
                    res.send({
                        foodPlace: {
                            name: selectedRestraunt.name,
                            location: `${selectedRestraunt.location.address}, ${selectedRestraunt.location.city}`,
                            category: categories(selectedRestraunt)
                        },
                        funPlace: {
                            name: selectedEntertainment.name,
                            location: `${selectedEntertainment.location.address}, ${selectedEntertainment.location.city}`,
                            category: categories(selectedEntertainment)
                       }
                    })
                })
    });
});

module.exports = router;