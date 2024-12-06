import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postSlice';

const store = configureStore({
  reducer: {
    post: postsReducer
  },
});

export default store;