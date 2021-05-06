import React from 'react'

const HitoryRankingButtons = ({ 
    handleShowHistory, 
    handleShowRanking,
    itemKey,
    clickedSameItem,
    historySvgRef,
    rankingSvgRef
  }) => {
  
  return (
    <>
      <button ref={el => historySvgRef.current[itemKey] = el} onClick={() => handleShowHistory(itemKey, clickedSameItem, historySvgRef, rankingSvgRef)} className="active">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 px-0.5 py-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </button>

      <button ref={el => rankingSvgRef.current[itemKey] = el} onClick={() => handleShowRanking(itemKey, clickedSameItem, rankingSvgRef, historySvgRef)}>
        <svg className="h-6 w-6 px-0.5 py-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  )
}

export default HitoryRankingButtons
