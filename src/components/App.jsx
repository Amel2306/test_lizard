import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './Post';
import Home from "./Home";

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-detail" element={<Post />} /> 
        <Route path="/category/:selectedCategory" component={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
