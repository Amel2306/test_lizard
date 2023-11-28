import { useState, useEffect } from "react";
import axios from "axios";
import Posts from './Posts';
import "../styles/home.css"
import Categories from "./Categories";

function Home() {
    return (
      <div className="home_page">
        <Categories />
      </div>
    );
    
}

export default Home;
