const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '637ed637202d311b540848cb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${(sample(places))}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At officiis ipsum quod odio, consequuntur quidem aspernatur illum excepturi voluptatum quasi eum cum nemo, id voluptatibus tempore labore facilis, consectetur nihil.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwesqurjh/image/upload/v1669912496/YelpCamp/uy1fvbuuyhuqdi7wlw84.jpg',
                    filename: 'YelpCamp/uy1fvbuuyhuqdi7wlw84'
                },
                {
                    url: 'https://res.cloudinary.com/dwesqurjh/image/upload/v1669912496/YelpCamp/ctbels4baffzvzmiegpw.jpg',
                    filename: 'YelpCamp/ctbels4baffzvzmiegpw'
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});