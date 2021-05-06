import { configureStore } from '@reduxjs/toolkit'
import domainReducer from './domain'
import keywordsReducer from './keyword'

export default configureStore({
  reducer: {
    domain: domainReducer,
    keywords: keywordsReducer
  }
})