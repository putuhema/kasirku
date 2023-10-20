import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Search {
  term: string;
}

const initialState: Search = {
  term: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
    clearSearch: (state) => {
      state.term = "";
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export const searchSelector = (state: RootState) => state.searchReducer;
export default searchSlice.reducer;
