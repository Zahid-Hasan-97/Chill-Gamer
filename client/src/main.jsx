import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddReviews from './Components/AddReviews/AddReviews.jsx';
import UpdateReview from './Components/UpdateReview/UpdateReview.jsx';
import SignIn from './Components/SignIn/SignIn.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import AuthProvider from './Components/Providers/AuthProviders.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import MyReview from './Components/myReview/myReview.jsx';
import AllReview from './Components/AllReview/AllReview.jsx';
import GameWatchList from './Components/GameWatchList/GameWatchList.jsx';
import Home from './Components/Home/Home.jsx';
import Layout from './Components/Layout/Layout.jsx';
import ReviewDetails from './Components/ReviewCard/ReviewDetailes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: async () => {
          try {
            const response = await fetch('http://localhost:5001/review');
            if (!response.ok) {
              throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching home data:', error);
            throw new Response('Error loading home data', { status: 500 });
          }
        },
      },
      {
        path: 'addReview',
        element: (
          <PrivateRoute>
            <AddReviews />
          </PrivateRoute>
        ),
      },
      {
        path: 'allreview',
        element: <AllReview />,
      },
      {
        path: 'myreview',
        element: (
          <PrivateRoute>
            <MyReview />
          </PrivateRoute>
        ),
      },
      {
        path: 'updateReview/:id',
        element: <UpdateReview />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`http://localhost:5001/review/${params.id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch review data');
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error('Error fetching review:', error);
            throw new Response('Review not found', { status: 404 });
          }
        },
      },
      {
        path: 'gamewatchlist',
        element: (
          <PrivateRoute>
            <GameWatchList />
          </PrivateRoute>
        ),
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'reviewdetails/:id',
        element: <ReviewDetails />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
