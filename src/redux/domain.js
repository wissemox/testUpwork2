import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllDomain = createAsyncThunk(
  'domain/fetchAllDomain',
  async (payload) => {
    const response = await axios.get('/api/domains')

    return response.data;
  }
)

export const fetchHistoryRanking = createAsyncThunk(
  'domain/fetchHistoryRanking',
  async (payload) => {
    const {domainId, keywordId} = payload
    const response = await axios.get('/api/positions', {
      params: {
        domain_id: domainId,
        keyword_id: keywordId
      }
    })

    return response.data;
  }
)


export const domainSlice = createSlice({
  name: 'domain',
  initialState: {
    data: [],
    position: 0,
    historyRank: [],
    selectedDomain: [],
    fetchingHistory: true
  },
  reducers: {
    resetHistoryRanking: (state) => {
      state.historyRank = []
    },
    setSelectedDomain: (state, action) => {
      state.selectedDomain = action.payload
    }
  },
  extraReducers: {
    [fetchAllDomain.fulfilled]: (state, action) => {
      state.data = action.payload
    },
    [fetchHistoryRanking.pending]: (state, action) => {
      state.fetchingHistory = true
    },
    [fetchHistoryRanking.fulfilled]: (state, action) => {
      state.historyRank = action.payload
      state.fetchingHistory = false
    }
  }
})

export const { setSelectedDomain, resetHistoryRanking } = domainSlice.actions

export default domainSlice.reducer