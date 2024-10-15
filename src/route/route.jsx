import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import CustomerLayout from "../layout/CustomerLayout";
import Services from "../pages//servicesDisplay";
import AboutUs from "../pages/AboutUs";
import CreateBlog from "../pages/Admin/CreateBlog ";
import Dashboard from "../pages/Admin/Dashboard";
import ManagerBlog from "../pages/Admin/ManagerBlog";
import ManagerUser from "../pages/Admin/ManagerUser";
import ChangePassword from "../pages/changePassword";
import ErrorPage from "../pages/errorPage";
import HomePage from "../pages/homePage";
import Login from "../pages/login";
import Register from "../pages/Register";
import StaffChat from "../pages/Staff/StaffChat";
import StaffPage from "../pages/Staff/StaffPage";
import ProtectedRoute from "./../config/ProtectedRoute";
import StaffLayout from "./../layout/StaffLayout";
import BlogDetail from './../pages/Blog/BlogDetail';
import BlogList from './../pages/Blog/BlogList';
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/blog",
        element: <BlogList />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetail />,
        ErrorPage: <ErrorPage />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/forgot-password",
        element: <ChangePassword />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/services",
        element: <Services />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/about",
        element: <AboutUs />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRoles={["Manager"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <ManagerUser />,
      },
      {
        path: "create-blog",
        element: <CreateBlog />,
      },
      {
        path: "blogs",
        element: <ManagerBlog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetail />
      },
      {
        path: "edit-blog/:id",
        element: <CreateBlog />
      }

    ],
  },
  {
    path: "/consultingstaff",
    element: (
      <ProtectedRoute requiredRoles={["ConsultingStaff"]}>
        <StaffLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <StaffPage />,
      },
      {
        path: "chat",
        element: <StaffChat />,
      },
    ],
  },
]);
