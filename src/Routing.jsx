import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import DocsPage from "./Docspage";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" />
                <Route path="/chats" />
                <Route path="/docs" element={<DocsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;