import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Landing from './Landing'

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/about" />
                <Route path="/chats" />
                <Route path="/docs" />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;