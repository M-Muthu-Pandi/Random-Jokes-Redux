import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJoke = createAsyncThunk("jokes/fetchJoke", async (category, thunkAPI) => {
  try {
    // Fetch available categories
    const categoriesResponse = await axios.get(`https://api.chucknorris.io/jokes/categories`);
    const categories = categoriesResponse.data;

    // Check if the category exists
    if (!categories.includes(category)) {
      return (
            `Error:"No jokes for category "${category}" found".|||Available lists are: ${categories.join(", ")}`
      );
    }

    // Fetch joke for the valid category
    const jokeResponse = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
    return jokeResponse.data.value;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error fetching data. Please try again.");
  }
});

const initialState = {
  joke: "No Joke",
};

const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.joke = "Loading...";
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.joke = action.payload;
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.joke = action.payload || "Something went wrong.";
      });
  },
});

export default jokeSlice;