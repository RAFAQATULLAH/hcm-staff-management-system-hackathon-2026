import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import StaffLayout from "./layouts/StaffLayout";
import Login from "./pages/Login";
import HRDashboard from "./pages/hr/HRDashboard";
import Employees from "./pages/hr/Employees";
import EmployeeDetails from "./pages/hr/EmployeeDetails";
import Attendance from "./pages/hr/Attendance";
import Leaves from "./pages/hr/Leaves";
import Reports from "./pages/hr/Reports";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyAttendance from "./pages/employee/MyAttendance";
import MyLeaves from "./pages/employee/MyLeaves";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function StaffRoutes() {
  return <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route element={<ProtectedRoute allowedRoles={["hr","employee"]}/>}>
      <Route element={<StaffLayout/>}>
        <Route element={<ProtectedRoute allowedRoles={["hr"]}/>}>
          <Route path="/hr/dashboard" element={<HRDashboard/>}/>
          <Route path="/hr/employees" element={<Employees/>}/>
          <Route path="/hr/employees/:id" element={<EmployeeDetails/>}/>
          <Route path="/hr/attendance" element={<Attendance/>}/>
          <Route path="/hr/leaves" element={<Leaves/>}/>
          <Route path="/hr/reports" element={<Reports/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["employee"]}/>}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard/>}/>
          <Route path="/employee/attendance" element={<MyAttendance/>}/>
          <Route path="/employee/leaves" element={<MyLeaves/>}/>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["hr","employee"]}/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/notifications" element={<Notifications/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
        </Route>
      </Route>
    </Route>
    <Route path="/" element={<RootRedirect/>}/>
    <Route path="*" element={<RootRedirect/>}/>
  </Routes>;
}
function RootRedirect(){let user=null;try{user=JSON.parse(localStorage.getItem("staffUser")||"null")}catch{}return <Navigate to={user?.role==="hr"?"/hr/dashboard":user?.role==="employee"?"/employee/dashboard":"/login"} replace/>;}
export default function App(){return <BrowserRouter><StaffRoutes/></BrowserRouter>;}
