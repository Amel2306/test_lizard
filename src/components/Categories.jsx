import { useState, useEffect } from "react";
import axios from "axios";
import Posts from './Posts';
import "../styles/categories.css"

function Categories() {

    const [posts, setPost] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState(new Set()); // we use a set to stock or different categories to be sure to not have same category 2 times in the selection of categories
    const [selectedCategory, setSelectedCategory] = useState(''); // the category that the user select
    const [filteredPosts, setFilteredPosts] = useState([]); // the post whish have the the selectedCategory
    const [listCat, setListCat] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        setPost(response.data.posts);

        //filteredPosts is initialised with all posts
        setFilteredPosts(response.data.posts); 
      } catch (error) {
        console.error('Erreur getting data :', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // at first we will collect all the different categories
    //we use a set for that to be sure to not have 2 same category in the selection categories
    const categoriesSet = new Set();
    posts.forEach((post) => {
      post.categories.forEach((category) => {
        categoriesSet.add(category.name);
      });
    });
    setUniqueCategories(categoriesSet);
  }, [posts]);
  
    // filtered the posts depending on the category selected
    useEffect(() => {
      if (selectedCategory === '') {
        setFilteredPosts(posts); // if any category is selected, we print all posts
      } else {
        const filtered = posts.filter((post) =>
          post.categories.some((category) => category.name === selectedCategory)
        );
        setFilteredPosts(filtered);
      }
    }, [selectedCategory, posts]);
  
    // manage the change of category
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };

    const handleListCat = () => {
      setListCat(!listCat)
    }

    return (
        <div className="post_categories">
            {listCat && (
            <div>
                <div className="selection_category">
                    <label >
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
            <button className="cat_btn" onClick={() => handleListCat()} > { listCat ? "-" : "Select Category"}</button>
            <div className="list_posts">
                <Posts filteredPosts={filteredPosts} />
            </div>              
        </div>
    );
  }

export default Categories;
