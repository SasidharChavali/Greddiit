import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  subgreds: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFollowers: (state, action) => {
      if (state.user) {
        state.user.followers = action.payload.followers;
      } else {
        console.error("user follower non-existent :(");
      }
    },
    setFollowing: (state, action) => {
      if (state.user) {
        state.user.following = action.payload.following;
      } else {
        console.error("user is not following the person with this id :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setSubGreds: (state, action) => {
      state.subgreds = action.payload.subgreds;
    },
    // setSubGred: (state, action) => {
    //   const updatedSubgred = state.posts.map((subgred) => {
    //     if (subgred._id === action.payload.post._id) return action.payload.subgred;
    //        return subgred;
    //   });
    //   state.subgreds = updatedSubgred;
    //  },
  },
});

export const { setMode, setLogin, setLogout, setFollowers, setFollowing, setPosts, setPost, setSubGreds } =
  authSlice.actions;
export default authSlice.reducer;
