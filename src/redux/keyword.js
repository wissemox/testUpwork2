import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllKeywords = createAsyncThunk(
  'keywords/fetchAllKeywords',
  async (payload) => {
    const { domainId } = payload
    const response = await axios.get(`/api/keywords/${domainId}`)

    return response.data;
  }
)

export const fetchRankings = createAsyncThunk(
  'keywords/fetchRankings',
  async (payload) => {
    const { keywordId } = payload
    const response = await axios.get(`/api/rankings/${keywordId}`)

    return response.data;
  }
)

export const keywords = createSlice({
  name: 'keywords',
  initialState: {
    data: [],
    rankings: [],
    historyRank: [],
    fetching: null,
    fetchingKeywords: null,
    paginationOffset: 0,
    paginationLimit: 10,
    collapsibleItem: {},
    toggle: false,
    historyCollapse: false,
    rankingCollapse: false
  },
  reducers: {
    setFetching: (state, action) => {
      state.fetching = action.payload
    },
    setIsFetchingKeywords: (state, action) => {
      state.fetchingKeywords = action.payload
    },
    resetRanking: (state) => {
      state.rankings = []
    },
    setPaginationOffset: (state, action) => {
      state.paginationOffset = action.payload
    },
    setPaginationLimit: (state, action) => {
      state.paginationLimit = action.payload
    },
    setCollapsibleItem: (state, action) => {
      state.collapsibleItem = action.payload
    },
    setToggle: (state, action) => {
      state.toggle = action.payload
    },
    setHistoryCollapse: (state, action) => {
      state.historyCollapse = action.payload
    },
    setRankingCollapse: (state, action) => {
      state.rankingCollapse = action.payload
    }
  },
  extraReducers: {
    [fetchAllKeywords.pending]: (state, action) => {
      state.fetchingKeywords = true
      state.collapsibleItem = {}
    },
    [fetchAllKeywords.fulfilled]: (state, action) => {
      const data = action.payload

      state.data = data
      state.rankings = data.rankings
      state.historyRank = data.rankings
    },
  }
})

export const {
  resetRanking,
  setFetching,
  setIsFetchingKeywords,
  setPaginationOffset,
  setPaginationLimit,
  setCollapsibleItem,
  setToggle,
  setHistoryCollapse,
  setRankingCollapse
} = keywords.actions

export default keywords.reducer
