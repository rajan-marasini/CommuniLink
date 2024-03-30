import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import PageNotFound from "./pages/NotFound";
import NotificationPage from "./pages/NotificationPage";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";

const App = () => {
    return (
        <div className="relative text-black dark:bg-[#2e333a] dark:text-white bg-[#f3f3f3] max-w-screen-2xl mx-auto h-screen overflow-auto px-4 ">
            <div className="blur top-[-18%] right-0"></div>
            <div className="blur top-[36%] -left-[8rem]"></div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />}>
                    <Route path="login" element={<Login />} />
                    <Route path="sign-up" element={<SignUp />} />
                </Route>
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/message" element={<Messages />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/notification" element={<NotificationPage />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
};

export default App;
