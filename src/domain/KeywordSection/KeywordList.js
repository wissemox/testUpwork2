import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import KeywordItem from './KeywordItem'

import {
    fetchAllKeywords,
    setIsFetchingKeywords,
    setPaginationOffset,
    setPaginationLimit,
    setCollapsibleItem,
    setToggle,
    setHistoryCollapse,
    setRankingCollapse
} from '../../redux/keyword'

const KeywordList = () =>{
    const { 
        data, 
        fetchingKeywords, 
        toggle, 
        historyCollapse, 
        rankingCollapse 
    } = useSelector(state => state.keywords)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const FILL = 'rounded-sm bg-blue-800 text-white focus:outline-none'
    // const collapsible = useRef([])
    const historySvgRef = useRef([])
    const rankingSvgRef = useRef([])
    // const panelHistoryRef = useRef([])
    // const panelRankingRef = useRef([])

    const handlDeleteKeyword = (keywordId, domainId) => {
        // removeStateInLocalStorage(keywordId)
        axios.delete(`/api/keywords/remove/${keywordId}`)
            .then( res => {
                dispatch(fetchAllKeywords({domainId}))
            }) 
            .catch( err => {
                console.error(err)
            })
    }

    const handleShowHistory = (itemKey, clickedSameItem, historySvgRef, rankingSvgRef) => {
        const history = historySvgRef.current
        const ranking = rankingSvgRef.current

        for (let i = 0; i < data.length; i++) {
            history[i].className = 'focus:outline-none'
            ranking[i].className = 'focus:outline-none'
        }
        if (!toggle && !historyCollapse) {
            history[itemKey].className = FILL
            dispatch(setToggle(true))
            dispatch(setHistoryCollapse(true))
            dispatch(setRankingCollapse(false))
        } else if (toggle && !historyCollapse && rankingCollapse) {
            history[itemKey].className = FILL
            dispatch(setToggle(true))
            dispatch(setHistoryCollapse(true))
            dispatch(setRankingCollapse(false))
        } else if (toggle && !rankingCollapse && historyCollapse && !clickedSameItem) {
            history[itemKey].className = FILL
            dispatch(setToggle(true))
        } else if (toggle && !rankingCollapse && historyCollapse && clickedSameItem) {
            dispatch(setToggle(false))
        } else {
            history[itemKey].className = FILL
            dispatch(setToggle(true))
        }

        setContent('history')
        dispatch(setCollapsibleItem({key: itemKey, show: true, content: 'history'}))
    }

    const handleShowRanking = (itemKey, clickedSameItem, rankingSvgRef, historySvgRef) => {
        const history = historySvgRef.current
        const ranking = rankingSvgRef.current

        for (let i = 0; i < data.length; i++) {
            history[i].className = 'focus:outline-none'
            ranking[i].className = 'focus:outline-none'
        }
        if (!toggle && !rankingCollapse) {
            ranking[itemKey].className = FILL
            dispatch(setToggle(true))
            dispatch(setHistoryCollapse(false))
            dispatch(setRankingCollapse(true))
        } else if (toggle && !rankingCollapse && historyCollapse) {
            ranking[itemKey].className = FILL
            dispatch(setToggle(true))
            dispatch(setHistoryCollapse(false))
            dispatch(setRankingCollapse(true))
        } else if (toggle && !historyCollapse && rankingCollapse && !clickedSameItem) {
            ranking[itemKey].className = FILL
            dispatch(setToggle(true))
        } else if (toggle && !historyCollapse && rankingCollapse && clickedSameItem) {
            dispatch(setToggle(false))
        } else {
            ranking[itemKey].className = FILL
            dispatch(setToggle(true))
        }

        setContent('ranking')
        dispatch(setPaginationOffset(0))
        dispatch(setPaginationLimit(10))
        dispatch(setCollapsibleItem({key: itemKey, show: true, content: 'ranking'}))
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch(setIsFetchingKeywords(false))
        }, 2000)
    }, [data])

    useEffect(() => {
        if (localStorage.getItem('reloadStates') === null) {
            localStorage.setItem('reloadStates', JSON.stringify([]))
        }
    }, [])

    return (
        <div className="flex flex-col pt-10">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4"></th>
                                    <th scope="col" className="px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                                    <th scope="col" className="px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                                    <th scope="col" className1="px-4"></th>
                                    <th scope="col" className1="px-4"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    fetchingKeywords ?
                                        <tr>
                                            <td colspan="6" className="p-4 text-center animate-pulse text-2xl">Loading...</td>
                                        </tr> :
                                        data.length > 0
                                        ? (
                                            data.map((item, key) => {
                                                return <KeywordItem
                                                    itemKey={key}
                                                    handlDeleteKeyword={handlDeleteKeyword}
                                                    handleShowHistory={handleShowHistory}
                                                    handleShowRanking={handleShowRanking}
                                                    content={content}
                                                    historySvgRef={historySvgRef}
                                                    rankingSvgRef={rankingSvgRef}
                                                    pageCount={Math.ceil(item.rankings.length / 10)}
                                                    {...item} 
                                                />
                                            })
                                    ) : (
                                        <tr>
                                            <td colspan="6" className="p-4 text-center">No Keywords.</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KeywordList
