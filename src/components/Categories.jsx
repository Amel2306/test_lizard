import { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";
import "../styles/categories.css";

function Categories() {
  const [posts, setPost] = useState([]); // State for storing posts fetched from the API
  const [uniqueCategories, setUniqueCategories] = useState(new Set()); // To store unique categories using Set
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category by the user
  const [filteredPosts, setFilteredPosts] = useState([]); // Posts filtered by the selected category
  const [listCat, setListCat] = useState(false); // To toggle displaying categories

  useEffect(() => {
    // Fetching posts from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        setPost(response.data.posts);

        // Initialize filteredPosts with all posts
        setFilteredPosts(response.data.posts);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Collecting unique categories
    const categoriesSet = new Set();
    posts.forEach((post) => {
      post.categories.forEach((category) => {
        categoriesSet.add(category.name);
      });
    });
    setUniqueCategories(categoriesSet);
  }, [posts]);

  useEffect(() => {
    // Filter posts based on the selected category
    if (selectedCategory === "") {
      setFilteredPosts(posts); // Display all posts if no category is selected
    } else {
      const filtered = posts.filter((post) =>
        post.categories.some((category) => category.name === selectedCategory)
      );
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, posts]);

  // Handle change of category
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Toggle displaying categories
  const handleListCat = () => {
    setListCat(!listCat);
  };

  return (
    <div className="post_categories">
      {listCat && (
        <div>
          <div className="selection_category">
            <label>
              <input
                className="select_category"
                type="checkbox"
                value={""}
                checked={selectedCategory === ""}
                onChange={handleCategoryChange}
              />
              All posts
            </label>

            {[...uniqueCategories].map((category) => (
              <label key={category}>
                <input
                  className="select_category"
                  type="checkbox"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={handleCategoryChange}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      )}
      <button className="cat_btn" onClick={handleListCat}>
        {listCat ? "-" : "Select Category"}
      </button>
      <div className="list_posts">
        <Posts filteredPosts={filteredPosts} />
      </div>
    </div>
  );
}

export default Categories;
