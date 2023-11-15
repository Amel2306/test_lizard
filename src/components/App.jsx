import { useState, useEffect } from "react";
import axios from "axios";
import Post from './posts'; 

function App() {

  const [posts, setPost] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // the category that the user select
  const [filteredPosts, setFilteredPosts] = useState([]); // the post whish have the the selectedCategory
  const [uniqueCategories, setUniqueCategories] = useState(new Set()); // we use a set to stock or different categories to be sure to not have same category 2 times in the selection of categories



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        setPost(response.data.posts);

        //filteredPosts is initialised with all posts
        setFilteredPosts(response.data.posts); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
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

    


  return ( 
    <div>
      <h1>Posts list</h1>

      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All posts</option>
        {[...uniqueCategories].map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <Post filteredPosts={filteredPosts} />
      
    
    </div>);
}

export default App;
