import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../layouts/Home";
import Login from "../layouts/Login";
import UpdateProfile from "../layouts/UpdateProfile";
import UserProfile from "../layouts/UserProfile";
import Register from "../layouts/Register";
import EstatesSection from "../layouts/EstateSection";
import EstateDetails from "../layouts/EstateDetails";
import ProtectedRoute from "../layouts/ProtectedRoute";
import NotFound from "../layouts/NotFound";
import SavedEstates from "../layouts/SavedEstates";

export const router = createBrowserRouter([{
    path: '/',
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },{
        path: 'login',
        element: <Login />
      },
      {
        path: 'update-profile',
        element: <ProtectedRoute><UpdateProfile /></ProtectedRoute>
      },
      {
        path: 'user-profile',
        element: <ProtectedRoute><UserProfile /></ProtectedRoute>
      },
      {
        path:'register',
        element: <Register></Register>
      },
      {
        path:'estate-section',
        element: <EstatesSection></EstatesSection>
      },
      {
        path: 'estateDetails/:id',
        element: <ProtectedRoute><EstateDetails></EstateDetails></ProtectedRoute>
      },
      {
        path: 'saved-states',
        element: 
        <ProtectedRoute>
          <SavedEstates></SavedEstates>
        </ProtectedRoute>
      },
      {
        path: '/property/:id',
        element: <EstateDetails />
      }

    ]
}
])