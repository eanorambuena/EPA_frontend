import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" />
                <Route path="/chats" />
                <Route path="/docs" />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;