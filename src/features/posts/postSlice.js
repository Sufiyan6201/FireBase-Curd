import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiInstance from '../../api/firebaseApi';

// Initial state
const initialState = {
  posts: [],  // Initialized as an empty array
  loading: false,
  error: null,
};



// Create async thunk for fetching posts (replacing books)
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await apiInstance.get('/posts.json');
    return Object.keys(response.data).map((key) => ({ id: key, ...response.data[key] }))
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Create async thunk for creating a post (replacing books)
export const createPost = createAsyncThunk('posts/createPost', async (newPost, { rejectWithValue }) => {
  try {
    const response = await apiInstance.post('/posts.json', newPost);
    return { ...newPost, id: response.data.name };  // Adjusted to map response and newPost
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Create async thunk for updating a post (replacing books)
export const updatePost = createAsyncThunk('posts/updatePost', async ( post , { rejectWithValue }) => {
  try {
    let obj = {
      name: post.name,
      email: post.email,
      phone: post.phone,
      password: post.password
    }
    await apiInstance.patch(`/posts/${post.id}.json`, obj);
    return post;  // Return the updated post data from the response
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Create async thunk for deleting a post (replacing books)
export const deletePost = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
  try {
    await apiInstance.delete(`/posts/${id}.json`);
    return id;  // Return the ID of the deleted post
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.posh(action.payload);  // This now works because posts is an array
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => { 
          let { id, name, email, phone, password } = action.payload;
          if (post.id == id) {
            post.name = name,
            post.email = email,
            post.phone = phone
            post.password = password
          }
          return post;
        })
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      })

      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
