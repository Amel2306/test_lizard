import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Post from './Post';
import Home from "./Home";

function Rootes() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-detail" element={<Post />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default Rootes;
