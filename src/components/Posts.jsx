import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchPosts } from '../features/posts/postSlice';

function Posts({handleEdit}) {
  const dispatch = useDispatch()
  const { posts, loading, error } = useSelector((state) => state.post);

  if (loading)  return <div>Loading...</div>;
  if (posts.length == 0) return <div>No posts found</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="row mt-3 justify-content-center">
        {
          posts.map((post, index) => (
            <div key={ index } className="col-md-4">
              <div className="card" style={ { width: "18rem" } }>
                <div className="card-body">
                  <h5 className="card-title">{ post.name }</h5>
                  <p className="card-text">{ post.email }</p>
                  <p className="card-text">{ post.phone }</p>
                  <p className="card-text">{ post.password }</p>
                  <button
                    className="btn btn-danger me-1"
                    onClick={ () => dispatch(deletePost(post.id)) }
                  >Delete</button>
                  <button
                  className="btn btn-primary"
                  onClick={ ()=>handleEdit(post) }
                  >Edit</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Posts
