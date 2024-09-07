import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import AddBook from "./routes/AddBook";
import UpdateBook from "./routes/UpdateBook";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/edit-book" element={<UpdateBook />} />
            </Routes>
        </Router>
    );
};

export default App;
