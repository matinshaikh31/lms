import "./App.css";
// Auth
import RegistrationPage from "./pages/Auth/RegistrationPage";
import LoginPage from "./pages/Auth/LoginPage";
import ForgetPasswordForm from "./pages/Auth/ForgetPasswordForm";
import HomePage from "./pages/HomePage";
import EmailConfirmationForm from "./components/EmailConfirmationForm";
import ResetPasswordForm from "./pages/Auth/ResetPasswordForm";

import { Route, Routes } from "react-router-dom";
import NotFoundErrorPage from "./components/NotFoundErrorPage";
import CourseDetail from "./pages/Courses/CourseDetail";
import UserProfile from "./pages/Client/Profile/UserProfile";
import Courses from "./pages/Courses/Courses";
import About from "./pages/About";
import Policy from "./pages/Policy";
import FAQ from "./pages/FAQ";
import LecturePage from "./components/LecturePage";
import Sidebar from "./components/ui/SideBar";
import Header from "./components/ui/Header";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { Outlet } from "react-router-dom";
import ManageUser from "./pages/Admin/ManageUser";
import ManageCourses from "./pages/Admin/ManageCourses";
import EditCourse from "./pages/Admin/EditCourse";
import AddLecuter from "./pages/Admin/AddLecuter";
import AddQuiz from "./pages/Admin/AddQuiz";
import AddBadge from "./pages/Admin/AddBadge";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content area where nested routes will render */}
        <main className="flex-1 transition-all duration-100">
          <Outlet />  {/* This renders the component for each route */}
        </main>
      </div>
    </div>
  );
}


function App() {
  return (
    <Routes>
      {/* Main layout routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/confirm-email" element={<EmailConfirmationForm />} />
        <Route path="/forgot-password" element={<ForgetPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/course/:courseId/lecture/:lectureId" element={<LecturePage />} />
      </Route>

      {/* Admin Dashboard route (separate layout) */}
      <Route path="/adminDashboard" element={<AdminDashboard />} >
            <Route path="manage-users" element={<ManageUser/>} />
            <Route path="manage-courses" element={<ManageCourses/>}/>
            <Route path="edit/:id" element={<EditCourse />} />
            <Route path="add-lecture/:id" element={<AddLecuter />} />
            <Route path="add-quiz/:courseId" element={<AddQuiz />} />
            <Route path="add-badge/:id" element={<AddBadge />} />
      </Route> 
      {/* Wildcard route for 404 Not Found (separate from MainLayout) */}
      <Route path="*" element={<NotFoundErrorPage />} />
    </Routes>
  );
}

export default App;
