import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProviders'; // Adjust the path as needed
import { Typewriter } from 'react-simple-typewriter'; // Import Typewriter

const AddReviews = () => {
    const { user } = useContext(AuthContext); // Get the logged-in user from AuthContext

    const handleAddReview = async (e) => {
        e.preventDefault();

        const form = e.target;
        const newReview = {
            imageUrl: form.imageUrl.value,
            gameTitle: form.gameTitle.value,
            description: form.description.value,
            rating: form.rating.value,
            publishingYear: form.publishingYear.value,
            genre: form.genre.value,
            userEmail: user.email, // Use user.email from AuthContext
            userName: user.displayName || 'Anonymous', // Use displayName or fallback
        };

        try {
            const response = await fetch('http://localhost:5001/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });

            const data = await response.json();
            if (data.insertedId) {
                Swal.fire('Success!', 'Review added successfully.', 'success');
                form.reset();
            }
        } catch (error) {
            console.error('Error adding review:', error);
            Swal.fire('Error!', 'There was an error adding the review.', 'error');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Please log in to add a review
                    </h1>
                    <p className="text-gray-600">You need to be logged in to submit a game review.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    <Typewriter
                        words={['Add a New Game Review']}
                        loop={1} // Play once
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>

                <form onSubmit={handleAddReview} className="bg-white shadow-md rounded-lg p-6 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                            Game Cover Image URL
                        </label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter image URL"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="gameTitle" className="block text-sm font-medium text-gray-700">
                            Game Title
                        </label>
                        <input
                            type="text"
                            id="gameTitle"
                            name="gameTitle"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter game title"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Review Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Write your review here"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                                Rating (1-10)
                            </label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Rating (1-10)"
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="publishingYear" className="block text-sm font-medium text-gray-700">
                                Publishing Year
                            </label>
                            <input
                                type="number"
                                id="publishingYear"
                                name="publishingYear"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter publishing year"
                                min="1970"
                                max={new Date().getFullYear()}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                                Genre
                            </label>
                            <select
                                id="genre"
                                name="genre"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Sports">Sports</option>
                                <option value="Strategy">Strategy</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                            User Email
                        </label>
                        <input
                            type="email"
                            id="userEmail"
                            name="userEmail"
                            value={user.email || ''} // Automatically filled from logged-in user
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                            User Name
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={user.displayName || 'Anonymous'} // Use displayName or fallback
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Add Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReviews;