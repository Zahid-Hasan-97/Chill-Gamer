import React, { useState, useEffect, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProviders.jsx'; // Adjust path as needed

const MyReview = () => {
    const { user, loading: authLoading } = useContext(AuthContext); // Get user and loading from AuthContext
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                if (user) {
                    setLoading(true);
                    setError(null);
                    const response = await fetch(`http://localhost:5001/myreviews?email=${user.email}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch reviews: ${response.status}`);
                    }
                    const data = await response.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error('Error fetching user reviews:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Fetch reviews only if user is available and auth is not loading
        if (!authLoading && user) {
            fetchUserReviews();
        } else if (!authLoading && !user) {
            setLoading(false);
            setError('Please log in to view your reviews');
        }
    }, [user, authLoading]); // Depend on user and authLoading

    const handleDelete = async (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5001/review/${_id}`, {
                    method: 'DELETE',
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`Failed to delete review: ${res.status}`);
                        }
                        Swal.fire("Deleted!", "Your review has been deleted.", "success");
                        setReviews(reviews.filter((review) => review._id !== _id));
                    })
                    .catch((error) => {
                        console.error('Error deleting review:', error);
                        Swal.fire("Error!", "Failed to delete the review.", "error");
                    });
            }
        });
    };

    if (authLoading || loading) {
        return <div>Loading reviews...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">My Reviews</h1>
            {reviews.length > 0 ? (
                <div className="container mx-auto px-4 py-8">
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3">Review</th>
                                    <th className="px-6 py-3">Rating</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reviews.map((review) => (
                                    <tr key={review._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{review.gameTitle}</td>
                                        <td className="px-6 py-4 line-clamp-2">{review.description}</td>
                                        <td className="px-6 py-4">{review.rating}</td>
                                        <td className="px-6 py-4">
                                            <Link to={`/updateReview/${review._id}`}>
                                                <FaEdit className="text-blue-600 hover:text-blue-900 mr-4" />
                                            </Link>
                                            <button onClick={() => handleDelete(review._id)}>
                                                <FaTrash className="text-red-600 hover:text-red-900" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No reviews added yet.</p>
            )}
        </div>
    );
};

export default MyReview;