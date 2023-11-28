import React from "react";
import {useLocation} from "react-router-dom"
import "../styles/post.css"

function Post() {

    const location = useLocation();
    const post = location.state.post;


    const formatDate = (isoDate) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(isoDate).toLocaleDateString('en-EN', options);
    };

    return ( 
        <div className="post_details_card">
            <div className='post_content'>
                <div className="post_data">
                    <h2>{post.title}</h2>
                    <div className="summary">
                        <p> {post.summary} </p>
                    </div>
                </div> 
                <div className="post_info">
                    <div className="author">
                        <img className="author_avatar" src={post.author.avatar}/>
                        <h5 className="author_name"> {post.author.name}</h5>
                    </div> 
                    <div className="date">
                        <p>{formatDate(post.publishDate)}</p>
                    </div>                       
                </div>
           
            </div>
 
            <ul className="categories"> 
                {post.categories && post.categories.map((category) => (
                    <li key={category.id} className="category">
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
  }
  
  export default Post;
  