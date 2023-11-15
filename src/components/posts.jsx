import React from 'react';

const Post = (props) => {

  const filteredPosts = props.filteredPosts;

  const formatDate = (isoDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(isoDate).toLocaleDateString('en-EN', options);
  };

  return (
    <div>
      <h1>Liste des articles :</h1>
      <ul>
        {filteredPosts && filteredPosts.map((post) => (
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
    </div>
  );
};

export default Post;
