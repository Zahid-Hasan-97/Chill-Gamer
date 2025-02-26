import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Added useNavigate for redirection
import { AuthContext } from '../Providers/AuthProviders';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for redirection

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('User signed out successfully');
        navigate('/'); // Redirect to homepage after logout
      })
      .catch((error) => console.log("Error during sign out:", error.message));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="flex gap-2 focus:bg-blue-900 focus:p-2 focus:border focus:text-white focus:rounded-3xl focus:shadow-lg"
        >
          <p>Home</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allreview"
          className="flex gap-2 focus:bg-blue-900 focus:p-2 focus:border focus:text-white focus:rounded-3xl focus:shadow-lg"
        >
          <p>All Reviews</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addReview"
          className="flex gap-2 focus:bg-blue-900 focus:p-2 focus:border focus:text-white focus:rounded-3xl focus:shadow-lg"
        >
          <p>Add Review</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myreview"
          className="flex gap-2 focus:bg-blue-900 focus:p-2 focus:border focus:text-white focus:rounded-3xl focus:shadow-lg"
        >
          <p>My Reviews</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/gamewatchlist"
          className="flex gap-2 focus:bg-blue-900 focus:p-2 focus:border focus:text-white focus:rounded-3xl focus:shadow-lg"
        >
          <p>Game WatchList</p>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto navbar pt-5 pb-5 top-0 left-0 z-50 sticky">
      <div className="navbar-start">
        <NavLink to="/" className="font-bold flex items-center gap-3 text-2xl">
          <span>
            <img className="w-12" src="https://i.ibb.co.com/NnsLbLt/game.png" alt="" />
          </span>
          Chill Gamer
        </NavLink>
      </div>
      <div className="navbar-center lg:flex">
        <ul className="menu-horizontal px-1 gap-10 text-black text-xl font-normal">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-3">

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar group relative"
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
                {/* Tooltip for displayName on hover */}
                <span className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded py-1 px-2 -top-30 left-1/2 transform -translate-x-1/2">
                  {user.displayName}
                </span>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <button className='text-red-500' onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <div className="flex gap-4">
              <Link
                className="text-xl border rounded-2xl p-2 bg-blue-900 animate-pulse text-white"
                to="/signup"
              >
                Sign Up
              </Link>
              <Link
                className="text-xl border rounded-2xl p-2 focus:bg-blue-900 focus:p-2 focus:border focus:text-white focus:rounded-2xl focus:shadow-lg"
                to="/signin"
              >
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;