import React from 'react';
import {useState} from 'react'
import { Icon } from '@iconify/react';
import "../styles/post.css"

const Posts = (props) => {

  const [visiblePosts, setVisiblePosts] = useState(5); // 5 Initial nuber of vibile posts

  const filteredPosts = props.filteredPosts;

  const formatDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(isoDate).toLocaleDateString('en-EN', options);
  };

  const handleLoadMore = () => {
    setVisiblePosts(visiblePosts + 5); // we add 5 when we click the "load more" button
  };

  return (
    <div>
      <h1>Posts list :</h1>
      <ul className='container'>
        {filteredPosts && filteredPosts.slice(0, visiblePosts).map((post) => (
          <li key={post.id} className="post_card">

            <div className='post_informations'>
              <div className="author">
                  <img className="author_avatar" src={post.author.avatar}/>
                  <h5 className="author_name"> {post.author.name}</h5>
                </div>
                <div className="date">
                  <p>{formatDate(post.publishDate)}</p>
                </div>
            </div>
   

            <div className='post_content'>
              <h3>{post.title}</h3>
              <div className="summary">
                <p> {post.summary} </p>
              </div>
              <ul className="categories"> 
              {post.categories && post.categories.map((category) => (
                  <li key={category.id} className="category">
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>


          </li>
        ))}
      </ul>
      {filteredPosts && visiblePosts < filteredPosts.length && (
        <div className="load_more_btn">
          <button onClick={handleLoadMore}>
            <Icon className="load_more_icon" icon="mdi:arrow-bottom-circle-outline" width="40" height="40" />
              Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
