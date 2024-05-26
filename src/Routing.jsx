import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import About from "./About";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/about" element={<About />}/>
                <Route path="/chats" />
                <Route path="/docs" />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;