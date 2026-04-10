import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
//import logo from './logo.svg';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function App() {
  const [editingPost, setEditingPost] = useState(null);
  
  const [posts, setPosts] = useState([]);
    useEffect(() => {
    fetch(API_URL + '?_limit=5')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);
  
  const addPost = async (post) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(post),
    });
    //Had to change this from the tutorial, since when I updated a post, all the posts I created got updated at the same time
    const data = await res.json();
    const newPost = { ...data, id: Date.now() };

    setPosts([newPost, ...posts]);
  };

  const updatePost = async (updatedPost) => {
    await fetch(`${API_URL}/${updatedPost.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });
    setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
    setEditingPost(null);
  };

  const deletePost = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    setPosts(posts.filter((p) => p.id !== id));
  };
  
    return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>List of Posts</h1>
      <PostForm
        onSubmit={editingPost ? updatePost : addPost}
        editingPost={editingPost}
      />
      <PostList
        posts={posts}
        onEdit={setEditingPost}
        onDelete={deletePost}
      />
    </div>
  );
}



export default App;
