import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const ReviewDetails = () => {
    const { id } = useParams(); // Get the review ID from the route params
    const [review, setReview] = useState(null);
    const [addedToWatchlist, setAddedToWatchlist] = useState(false); // Track if added to watchlist
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await fetch(`http://localhost:5001/review/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch review details');
                }
                const data = await response.json();
                setReview(data);
            } catch (error) {
                console.error('Error fetching review details:', error);
            }
        };

        fetchReview();
    }, [id]); // Run the effect when `id` changes

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
                setAddedToWatchlist(true); // Update state to reflect addition
                alert(`${review.gameTitle} added to your watchlist!`);
            } else {
                throw new Error('Failed to add to watchlist');
            }
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            alert('Failed to add to watchlist. Please try again.');
        }
    };

    if (!review) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Review Details</h1>
                <div className="space-y-4">
                    {/* Game Cover Image */}
                    <img
                        src={review.imageUrl}
                        alt={review.gameTitle}
                        className="w-full h-64 object-cover rounded-md mb-4"
                    />

                    {/* Game Title */}
                    <h2 className="text-2xl font-semibold text-gray-800">{review.gameTitle}</h2>

                    {/* Review Description */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700">Description</h3>
                        <p className="text-gray-600">{review.description}</p>
                    </div>

                    {/* Rating */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700">Rating</h3>
                        <p className="text-gray-600">{review.rating} / 10</p>
                    </div>

                    {/* Genre */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700">Genre</h3>
                        <p className="text-gray-600">{review.genre}</p>
                    </div>

                    {/* Reviewer’s Name */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700">Reviewer</h3>
                        <p className="text-gray-600">{review.userName}</p>
                    </div>

                    {/* Reviewer’s Email */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-700">Reviewer Email</h3>
                        <p className="text-gray-600">{review.userEmail}</p>
                    </div>

                    {/* Additional Info (e.g., Publishing Year, Created At) */}
                    <div className="flex justify-between items-center text-gray-600">
                        <span>Published: {review.publishingYear}</span>
                    </div>

                    {/* Add to Watchlist Button */}
                    <button
                        onClick={() => handleAddToWatchlist(review)}
                        className={`w-full px-4 py-2 rounded-md text-white ${addedToWatchlist
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        disabled={addedToWatchlist}
                    >
                        {addedToWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;