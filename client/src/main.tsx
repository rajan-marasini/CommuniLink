import UserContextProvider from "@/context/UserContextProvider";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { ThemeProvider } from "./components/utils/theme-provider.tsx";
import "./index.css";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <Provider store={store}>
            <UserContextProvider>
                <BrowserRouter>
                    <App />
                    <Toaster />
                </BrowserRouter>
            </UserContextProvider>
        </Provider>
    </ThemeProvider>
);
