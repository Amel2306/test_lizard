import React from 'react';
import {useState} from 'react'

const Post = (props) => {

  const [visiblePosts, setVisiblePosts] = useState(5); // 5 Initial nuber of vibile posts

  const filteredPosts = props.filteredPosts;

  const formatDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(isoDate).toLocaleDateString('en-EN', options);
  };

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 5); // we add 5 when we click the "load more" button
  };

  return (
    <div>
      <h1>Posts list :</h1>
      <ul>
        {filteredPosts && filteredPosts.slice(0, visiblePosts).map((post) => (
          <li key={post.id}> 
            <h3>{post.title}</h3>
            <div className="author">
              <img className="author_avatar" src={post.author.avatar}/>
              <h5 className="author_name"> {post.author.name}</h5>
            </div>
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
          <div className="data">
            <p>{formatDate(post.publishDate)}</p>
          </div>
          </li>
        ))}
      </ul>
      {filteredPosts && visiblePosts < filteredPosts.length && (
        <button className="load_more_btn" onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default Post;
