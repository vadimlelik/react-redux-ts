import { Extra } from "./../../types/extra";
import { Country } from "./../../types/country";
import { Status } from "./../../types/";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountries = createAsyncThunk<
  { data: Country[] },
  undefined,
  {
    state: { countries: CountiesSlice };
    extra: Extra;
    rejectVlue: string;
  }
>(
  "@@countries/load-countries",
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.ALL_COUNTRIES);
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("unknown");
      }
    }
  },
  {
    condition: (_, { getState }) => {
      const {
        countries: { status },
      } = getState();

      if (status === "loading") {
        return false;
      }
    },
  }
);

type CountiesSlice = {
  status: Status;
  error: string | null;
  list: Country[];
};

const initialState: CountiesSlice = {
  status: "idle",
  error: null,
  list: [],
};

const countrySlice = createSlice({
  name: "@@countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = "rejected";
        // state.error = action.payload || "cannot load data ";
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = "received";
        state.list = action.payload.data;
      });
  },
});

export const countryReducer = countrySlice.reducer;

// selectors
