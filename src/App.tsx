import Login from "./routes/loginform";
import { Routes, Route } from "react-router-dom";

import Register from "./routes/register";
import ForgotPassword from "./routes/forgotpassword";
import Home from "./routes/home";
import ResetPassword from "./routes/resetpasssword";
import Profile from "./routes/profile";
import FollowList from "./routes/followlist";
import Search from "./routes/search";
import DetailPost from "./routes/detailpost";
import ImageDetail from "./components/Thread/imagedetail";

import ProtectedRoute from "./components/protectedroute";
function App() {

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
          <Route path="/imagedetail/:id" element={<ImageDetail/>}/>
          
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
