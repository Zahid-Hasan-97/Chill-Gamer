import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [highestRatedGames, setHighestRatedGames] = useState([]);

    useEffect(() => {
        const fetchHighestRatedGames = async () => {
            try {
                const response = await fetch('http://localhost:5001/review');
                const data = await response.json();

                // Sort games by rating in descending order
                const sortedGames = data.sort((a, b) => b.rating - a.rating);
                setHighestRatedGames(sortedGames.slice(0, 6)); // Get top 6 highest rated games
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchHighestRatedGames();
    }, []);

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="container mx-auto">
            {/* Slider Section */}
            <div className="my-4">
                <Slider {...sliderSettings}>
                    <div>
                        <img
                            className="w-full h-auto border rounded-3xl"
                            src="https://i.ibb.co.com/xFMtbG1/GOWR.jpg"
                            alt="Banner 1"
                        />
                    </div>
                    <div>
                        <img
                            className="w-full h-auto border rounded-3xl"
                            src="https://i.ibb.co.com/t8MGF0j/Fifa.jpg"
                            alt="Banner 2"
                        />
                    </div>
                    <div>
                        <img
                            className="w-full h-auto border rounded-3xl"
                            src="https://i.ibb.co.com/cQ2r3kL/AC.jpg"
                            alt="Banner 3"
                        />
                    </div>
                </Slider>
            </div>

            {/* Highest Rated Games Section */}
            <h2 className="text-2xl font-bold mt-8">Highest Rated Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                {highestRatedGames.map((game) => (
                    <div
                        key={game._id}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            src={game.imageUrl}
                            alt={game.gameTitle}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">{game.gameTitle}</h3>
                        <p className="text-gray-600 mb-2">{game.description.slice(0, 50)}...</p>
                        <Link
                            to={`/reviewdetails/${game._id}`}
                            className="text-blue-500 hover:underline"
                        >
                            Explore Details
                        </Link>
                    </div>
                ))}
            </div>

            {/* Community Reviews Section */}
            <section className="mt-16 bg-gray-100 p-8 rounded-lg">
                <h2 className="text-2xl font-bold">Community Reviews</h2>
                <p className="mt-2">
                    See what other gamers are saying about their favorite games. Join the
                    conversation!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">The Witcher 3</h3>
                        <p className="text-gray-600">“An epic adventure!” - <span className="font-medium">Alice</span></p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">DOOM Eternal</h3>
                        <p className="text-gray-600">“Fast and furious!” - <span className="font-medium">Bob</span></p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Stardew Valley</h3>
                        <p className="text-gray-600">“So relaxing!” - <span className="font-medium">Clara</span></p>
                    </div>
                </div>
            </section>

            {/* Upcoming Releases Section */}
            <section className="mt-16">
                <h2 className="text-2xl font-bold">Upcoming Releases</h2>
                <p className="mt-2">
                    Get excited for the latest and greatest games hitting the market soon.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Starfield 2</h3>
                        <p className="text-gray-600">Release: March 2025</p>
                        <p className="text-gray-600">A new space odyssey awaits!</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">FIFA 26</h3>
                        <p className="text-gray-600">Release: September 2025</p>
                        <p className="text-gray-600">Next-gen football action!</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Assassin’s Creed Shadows</h3>
                        <p className="text-gray-600">Release: November 2025</p>
                        <p className="text-gray-600">Stealth in feudal Japan!</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;