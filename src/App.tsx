import Login from "./routes/loginform";
import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./routes/register";
import ForgotPassword from "./routes/forgotpassword";
import Home from "./routes/home";

import { loginAuth } from "./routes/loginauth";
import ResetPassword from "./routes/resetpasssword";
import Profile from "./routes/profile";
import FollowList from "./routes/followlist";
import Search from "./routes/search";
import DetailPost from "./routes/detailpost";
import useAuthStore from "./hooks/useAuthStore";
import { useEffect } from "react";
import { AuthProvider } from "./hooks/authcontext";
import PrivateRoute from "./components/privateroute";
import ProtectedRoute from "./components/protectedroute";
function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/followlist" element={ <FollowList /> } />
          <Route path="/profile/:username" element={<Profile /> } />
          <Route path="/detailpost/:id" element={ <DetailPost /> } />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
        {/* <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Login />}
          />
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/followlist" element={ isAuthenticated ? <FollowList /> :<Login />} />
          <Route path="/profile/:username" element={isAuthenticated ?  <Profile /> : <Login />} />
          <Route path="/detailpost/:id" element={isAuthenticated ? <DetailPost />: <Login /> } />
          <Route path="/search" element={isAuthenticated ?<Search />: <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} /> */}
      </Routes>
    </>
  );
}

export default App;
