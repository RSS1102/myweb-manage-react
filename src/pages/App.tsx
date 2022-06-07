import { Routes, Route, HashRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Article from "@/pages/WriteArticle";
import Classify from "@/pages/Classify";
import Home from "@/pages/Home";
import Manage from "@/pages/Manage";
import React from "react";
function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/Login" element={<Login />}></Route>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}></Route>
                    <Route path="/classify" element={<Classify />}></Route>
                    <Route path="/article" element={<Article />}></Route>
                    <Route path="/manage" element={<Manage />}></Route>
                </Route>
            </Routes>
        </HashRouter>
    )
}
export default App;