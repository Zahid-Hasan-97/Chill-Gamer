import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders.jsx'; // Import AuthContext

const AllReview = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [displayedReviews, setDisplayedReviews] = useState([]); // Filtered/sorted reviews
    const [sortOption, setSortOption] = useState('default'); // Default sort
    const [filterGenre, setFilterGenre] = useState('all'); // Default filter
    const { user } = useContext(AuthContext); // Access logged-in user

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const response = await fetch('http://localhost:5001/review');
                if (!response.ok) {
                    throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setAllReviews(data);
                setDisplayedReviews(data); // Initially show all reviews
            } catch (error) {
                console.error('Error fetching reviews:', error.message);
            }
        };

        fetchAllReviews();
    }, []);

    // Handle sorting and filtering whenever sortOption or filterGenre changes
    useEffect(() => {
        let updatedReviews = [...allReviews];

        // Apply filter by genre
        if (filterGenre !== 'all') {
            updatedReviews = updatedReviews.filter((review) => review.genre === filterGenre);
        }

        // Apply sorting
        switch (sortOption) {
            case 'rating-asc':
                updatedReviews.sort((a, b) => a.rating - b.rating);
                break;
            case 'rating-desc':
                updatedReviews.sort((a, b) => b.rating - a.rating);
                break;
            case 'year-asc':
                updatedReviews.sort((a, b) => a.publishingYear - b.publishingYear);
                break;
            case 'year-desc':
                updatedReviews.sort((a, b) => b.publishingYear - a.publishingYear);
                break;
            default:
                // 'default' keeps original order (no sorting)
                break;
        }

        setDisplayedReviews(updatedReviews);
    }, [sortOption, filterGenre, allReviews]);

    // Function to handle adding a game to the watchlist
    const handleAddToWatchlist = async (review) => {
        if (!user) {
            alert('Please log in to add games to your watchlist.');
            return;
        }

        const watchlistItem = {
            imageUrl: review.imageUrl,
            gameTitle: review.gameTitle,
            description: review.description,
            rating: review.rating,
            publishingYear: review.publishingYear,
            genre: review.genre,
            userEmail: user.email, // Tie the watchlist item to the logged-in user
        };

        try {
            const response = await fetch('http://localhost:5001/watchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(watchlistItem),
            });

            if (response.ok) {
                alert(`${review.gameTitle} added to your watchlist!`);
            } else {
                throw new Error('Failed to add to watchlist');
            }
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            alert('Failed to add to watchlist. Please try again.');
        }
    };

    // Handle sort change
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Handle filter change
    const handleFilterChange = (e) => {
        setFilterGenre(e.target.value);
    };

    // Available genres for filtering (you can expand this list based on your data)
    const genres = ['all', 'Action', 'Adventure', 'Sports', 'Strategy'];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Reviews</h2>

            {/* Sorting and Filtering Dropdowns */}
            <div className="flex justify-between mb-6">
                {/* Sort Dropdown */}
                <div>
                    <label htmlFor="sort" className="mr-2 font-medium text-gray-700">
                        Sort by:
                    </label>
                    <select
                        id="sort"
                        value={sortOption}
                        onChange={handleSortChange}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="default">Default</option>
                        <option value="rating-asc">Rating (Low to High)</option>
                        <option value="rating-desc">Rating (High to Low)</option>
                        <option value="year-asc">Year (Oldest to Newest)</option>
                        <option value="year-desc">Year (Newest to Oldest)</option>
                    </select>
                </div>

                {/* Filter Dropdown */}
                <div>
                    <label htmlFor="filter" className="mr-2 font-medium text-gray-700">
                        Filter by Genre:
                    </label>
                    <select
                        id="filter"
                        value={filterGenre}
                        onChange={handleFilterChange}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre === 'all' ? 'All Genres' : genre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedReviews.length > 0 ? (
                    displayedReviews.map((review) => (
                        <div key={review._id} className="bg-white rounded-lg shadow-md p-4">
                            <img
                                src={review.imageUrl}
                                alt={review.gameTitle}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold">{review.gameTitle}</h3>
                            <p className="text-gray-600">
                                {review.description.length > 50
                                    ? `${review.description.slice(0, 50)}...`
                                    : review.description}
                            </p>
                            <Link
                                to={`/reviewdetails/${review._id}`}
                                className="text-blue-500 hover:underline"
                            >
                                Explore Details
                            </Link>
                            <button
                                onClick={() => handleAddToWatchlist(review)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mt-2 ml-4"
                            >
                                Add to Watchlist
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No reviews found.</p>
                )}
            </div>
        </div>
    );
};

export default AllReview;