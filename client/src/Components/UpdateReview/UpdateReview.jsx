import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar } from 'react-icons/fa';

function UpdateReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        imageUrl: '',
        gameTitle: '',
        description: '',
        rating: 1,
        publishingYear: '',
        genre: '',
        userEmail: '',
        userName: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Fetch existing data when the component mounts
        fetch(`http://localhost:5000/review/${id}`)
            .then(response => response.json())
            .then(data => {
                setFormData({
                    imageUrl: data.imageUrl,
                    gameTitle: data.gameTitle,
                    description: data.description,
                    rating: data.rating,
                    publishingYear: data.publishingYear,
                    genre: data.genre,
                    userEmail: data.userEmail,
                    userName: data.userName
                });
            })
            .catch(error => console.error('Error fetching review:', error));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Add validation logic here if needed

        try {
            const response = await fetch(`http://localhost:5001/review/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success('Review updated successfully!');
                navigate('/myreview'); // Redirect after successful submission
            } else {
                throw new Error('Failed to update review');
            }
        } catch (error) {
            toast.error('An error occurred while updating the review.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-right" />
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Update Game Review
                </h1>

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                            Game Cover Image URL
                        </label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.imageUrl ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter image URL"
                        />
                        {errors.imageUrl && (
                            <p className="text-red-500 text-sm">{errors.imageUrl}</p>
                        )}
                        {formData.imageUrl && (
                            <img
                                src={formData.imageUrl}
                                alt="Game cover"
                                className="mt-2 h-48 w-auto object-cover rounded-md"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f";
                                }}
                            />
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="gameTitle" className="block text-sm font-medium text-gray-700">
                            Game Title
                        </label>
                        <input
                            type="text"
                            id="gameTitle"
                            name="gameTitle"
                            value={formData.gameTitle}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.gameTitle ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter game title"
                        />
                        {errors.gameTitle && (
                            <p className="text-red-500 text-sm">{errors.gameTitle}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Review Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className={`w-full px-3 py-2 border rounded-md ${errors.description ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Write your review here"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}
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
                                value={formData.rating}
                                onChange={handleInputChange}
                                min="1"
                                max="10"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Rating (1-10)"
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
                                value={formData.publishingYear}
                                onChange={handleInputChange}
                                min="1970"
                                max={new Date().getFullYear()}
                                className={`w-full px-3 py-2 border rounded-md ${errors.publishingYear ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter publishing year"
                            />
                            {errors.publishingYear && (
                                <p className="text-red-500 text-sm">{errors.publishingYear}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                                Genre
                            </label>
                            <select
                                id="genre"
                                name="genre"
                                value={formData.genre}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                {['Action', 'Adventure', 'RPG', 'Strategy', 'Sports'].map((genre) => (
                                    <option key={genre.toLowerCase()} value={genre.toLowerCase()}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                                User Email
                            </label>
                            <input
                                type="email"
                                id="userEmail"
                                value={formData.userEmail}
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
                                value={formData.userName}
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Review'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateReview;
