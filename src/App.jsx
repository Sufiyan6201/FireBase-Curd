import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts, createPost, updatePost, deletePost } from './features/posts/postSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './components/Posts';

function App() {
  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState({});
  const [editId, setEditId] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if(editId){
      console.log(editId)      
      dispatch(updatePost(newPost));
      setEditId("");
    }else{
      dispatch(createPost(newPost));
    }
    setNewPost({});
    dispatch(fetchPosts())
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };


  const handleEdit=(post)=>{
    setNewPost(post);
    setEditId(post.id)
  }

  return (
    <div className="container">
      <h1 className="text-center my-4">CRUD Operations using firebase database</h1>

      {/* Create Post Form */}
      <div className="my-4 mx-auto col-8">
        <form onSubmit={handleCreatePost} className="border p-4 rounded shadow-sm">
          <h2 className="mb-3">Create Post</h2>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={newPost.name || ""}
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={newPost.email || ""}
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={newPost.phone || ""}
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={newPost.password || ""}
              onChange={handleInput}
            />
          </div>

          <button type="submit" className="btn btn-primary">Create Post</button>
        </form>
      </div>

      {/* Posts List */}
      <Posts handleEdit={handleEdit} />
    </div>
  );
}

export default App;
