import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Dashboard from "./admin/Dashboard";
import Artists from "./admin/Artists";
import AdminDashboard from "./admin/AdminDashboard";
import EditArtist from "./admin/EditArtist";
import Design from "./admin/Design";
import Category from "./admin/Category";
import EditTattoo from "./admin/EditTattoo";
import EditCategory from "./admin/EditCategory";
import Bookings from "./admin/Bookings";
import BookingDetails from "./admin/BookingDetails";
import StatusReports from "./admin/StatusReports";
import CustomerList from "./admin/CustomerList";
import GuestCustomer from "./admin/GuestCustomer";
import Reviews from "./admin/Reviews";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Dashboard />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "artist",
        element: <Artists />,
      },
      {
        path: "view-artist/:id",
        element: <EditArtist />,
      },
      {
        path: "design",
        element: <Design />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "edit-category/:id",
        element: <EditCategory />,
      },
      {
        path: "edit-tattoo/:id",
        element: <EditTattoo />,
      },
      {
        path: "booking",
        element: <Bookings />,
      },
      {
        path: "details/:id",
        element: <BookingDetails />,
      },
      {
        path: "status",
        element: <StatusReports />,
      },
      {
        path: "customer-list",
        element: <CustomerList />,
      },
      {
        path: "guest-list",
        element: <GuestCustomer />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignIn />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
