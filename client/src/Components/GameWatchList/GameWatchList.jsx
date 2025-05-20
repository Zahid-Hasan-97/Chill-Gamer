import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Providers/AuthProviders.jsx';

const GameWatchList = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        if (user) {
          const response = await fetch(
            `http://localhost:5001/watchlist?email=${user.email}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch watchlist');
          }
          const data = await response.json();
          setWatchlist(data);
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    fetchWatchlist();
  }, [user]);

  const handleRemoveFromWatchlist = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/watchlist/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedWatchlist = watchlist.filter((item) => item._id !== id);
        setWatchlist(updatedWatchlist);
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((game) => (
            <div key={game._id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={game.imageUrl}
                alt={game.gameTitle}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{game.gameTitle}</h3>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => handleRemoveFromWatchlist(game._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No games in your watchlist.</p>
      )}
    </div>
  );
};

export default GameWatchList;