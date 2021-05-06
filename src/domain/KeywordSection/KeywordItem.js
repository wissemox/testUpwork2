import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Collapse from 'react-collapse'
import { useAlert } from 'react-alert'

import HistoryRankingList from './HistoryRankingList'
import HistoryRankingButtons from './HitoryRankingButtons'
import KeywordFetchButton from './KeywordFetchButton'
import RankingList from './RankingList'
import KeywordDeleteButton from './KeywordDeleteButton'
import ReloadButton from './ReloadButton'


import { fetchAllKeywords, setPaginationOffset, setPaginationLimit } from '../../redux/keyword'

const KeywordItem = ({
    positions: historyData,
    rankings: rankingData,
    domain_id: domainId,
    id: keywordId,
    handleShowHistory,
    handleShowRanking,
    text,
    link,
    current_page,
    lang,
    location,
    position,
    handlDeleteKeyword,
    itemKey,
    collapsible,
    content,
    historySvgRef,
    rankingSvgRef,
    pageCount
}) => {
    const dispatch = useDispatch()
    const { fetchingHistory } = useSelector(state => state.domain)
    const {
        paginationOffset,
        paginationLimit,
        collapsibleItem,
        toggle
    } = useSelector(state => state.keywords)
    const [page, setPage] = useState(0)
    const [showReload, setShowReload] = useState(false)
    const btnTextRef = useRef([])
    const btnClassRef = useRef([])
    const pages = [
        {
            start: 0,
            value: 'first'
        },
        {
            start: 11,
            value: 'second'
        },
        {
            start: 21,
            value: 'third'
        },
        {
            start: 31,
            value: 'fourth'
        },
        {
            start: 41,
            value: 'fifth'
        },
        {
            start: 51,
            value: 'sixth'
        },
        {
            start: 61,
            value: 'seventh'
        },
        {
            start: 71,
            value: 'eight'
        },
        {
            start: 81,
            value: 'ninth'
        },
        {
            start: 91,
            value: 'tenth'
        },
    ]
    const [pageText, setPageText] = useState(`Get ${pages[current_page].value} page data`)
    const alert = useAlert()
    
    /**
     * UTILITIES
     */
    const addNumbers = (rank) => {
        let numbers = rank.split("");
        let total = +numbers[0] + +numbers[1]

        return `${total}${numbers[2]}`
    }

    const linkFormat = (link) => {
        let hasProtocolRegEx = new RegExp(`^((http|https):\/\/www\.|(http|https):\/\/)`, "g")

        if (!hasProtocolRegEx.test(link)) {
            return `www.${link}`
        } else {
            return link
        }
    }
    // ============================================================================================
    
    const hanldNextPage = (data) => {
        let currentPage = data.selected
        let last = (currentPage * 10) + 10

        dispatch(setPaginationLimit((currentPage * 10) + 10))
        dispatch(setPaginationOffset(last - 10))
    }

    const paginatedRankData = rankingData.slice(paginationOffset, paginationLimit)

    const paginator = () => {
        if (pages[page].start === 91)  {
            setPage(0)
            storeCurrentPage(keywordId, 0)
                .then(res => {
                    setShowReload(true)
                    setPageText(`Get ${pages[0].value} page data`)
                })
        } else {
            let currentPage = (page + 1)
            setPage(currentPage)
            storeCurrentPage(keywordId, currentPage)
                .then(res => {
                    setShowReload(true)
                    setPageText(`Get ${pages[currentPage].value} page data`)
                })
        }
    }

    const handleFetchSearchResult = () => {
        setPageText('Fetching...')
        if (pageText !== 'Fetching...') {
            fetchResultApi()
                .then(res => {
                    let { items: ranks } = JSON.parse(`{${res}`)
                    const rankings = currentHighestRank(ranks)

                    if (pages[page].value === "first") {
                        clearRankings(keywordId)
                            .then(res => {
                                const rank = rankings.length > 0 ? rankings[0] : 0
                                storeRanking(domainId, keywordId, ranks, page, rankings, rank)
                                    .then(res => paginator())
                                    .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err))
                    } else {
                        storeRanking(domainId, keywordId, ranks, page, rankings, position)
                            .then(res => paginator())
                            .catch(err => console.log(err))
                    } 
                })
                .catch(() => {
                    storeCurrentPage(keywordId, 0)
                        .then(() => {
                            alert.show(text)
                            setPage(0)
                            setPageText(`Get ${pages[0].value} page data`)
                        })
                })
        }
    }
    const fetchResultApi = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_GOOGLE_API_URL}/getresults.php`, {
                params: {
                    q: text,
                    hl: lang,
                    start: pages[page].start,
                    gl: location
                }
            })

            if (response) {
                return response.data
            }
        } catch (err) {
            console.log("Error: " + err)
        }
    }

    const clearRankings = async (keywordId) => {
        try {
            const response = await axios.delete(`/api/rankings/remove/${keywordId}`)

            if (response) {
                return response.data
            }
        } catch (err) {
            console.log("Error: " + err)
        }
    }

    const storeRanking = async (domainId, keywordId, ranks, current_page, googleRanks, currentPosition) => {
        try {
            const response = await axios.post('/api/rankings/store', {
                domainId,
                keywordId,
                ranks,
                current_page,
                googleRanks,
                currentPosition
            })
            
            if (response) {
                return response.data
            }
        } catch (err) {
            console.log("Error: " + err)
        }
    }

    const storeCurrentPage = async (keywordId, currentPage) => {
        try {
            const response = await axios.post(`/api/keywords/store-current-page/${keywordId}`, {
                current_page: currentPage
            })
            
            if (response) {
                return response.data
            }
        } catch (err) {
            console.log("Error: " + err)
        }
    }

    const currentHighestRank = (data) => {
        let ranks = data.map((item, key) => {
            let regex = new RegExp(`${linkFormat(link)}`, "g")
            if (regex.test(item.link)) {
                let addedKey =  (key + 1)
                let position = `${page}${addedKey}`
                let actualRank = position.length === 3 ? addNumbers(position) : position

                return +actualRank
            }
        })

        return ranks = ranks.filter(item => item != undefined)
    }
    
    useEffect(() => {
        setPage(current_page)
    }, [current_page])
    
    return (
        <>
            <tr>
                <td className="whitespace-nowrap">
                    <KeywordDeleteButton
                        collapsible={collapsible}
                        keywordId={keywordId}
                        domainId={domainId}
                        handlDeleteKeyword={handlDeleteKeyword}
                        itemKey={itemKey}
                    />
                </td>
                <td className="py-4 whitespace-nowrap">
                    <div className="flex">
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                {text}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="py-4 whitespace-nowrap text-center">
                    <div className="flex">
                        <div className="ml-4">
                            <div className="text-sm text-center">
                                {position}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="py-4 whitespace-nowrap">
                    <div className="flex">
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                <span>{link}</span>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="py-4 whitespace-nowrap">
                    <div className="flex justify-center gap-2">
                        <HistoryRankingButtons 
                            handleShowHistory={handleShowHistory}
                            handleShowRanking={handleShowRanking}
                            keywordId={keywordId}
                            domainId={domainId}
                            historySvgRef={historySvgRef}
                            rankingSvgRef={rankingSvgRef}
                            clickedSameItem={
                                collapsibleItem.key === itemKey
                                && collapsibleItem.content === content
                                && toggle
                            }
                            itemKey={itemKey}
                        />
                    </div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex justify-end">
                        {
                            showReload && (
                                <div className="mr-2">
                                    <ReloadButton reload={() => dispatch(fetchAllKeywords({domainId}))} />
                                </div>
                            )
                        }
                        <div>
                            <KeywordFetchButton
                                handleClick={() => {
                                    handleFetchSearchResult()
                                }}
                                pageText={pageText}
                                btnTextRef={btnTextRef}
                                btnClassRef={btnClassRef}
                                itemKey={itemKey}
                            />
                        </div>
                    </div>
                </td>
            </tr>
 
                <tr>
                    <td colspan="6">
                        <Collapse isOpened = {
                            toggle
                            && collapsibleItem.key === itemKey
                            && collapsibleItem.show
                            && collapsibleItem.content === 'history'
                        } >
                            <div  className="p-5 bg-gray-200">
                                <HistoryRankingList 
                                    data={historyData} 
                                    text={text} 
                                    itemKey={itemKey}
                                    fetching={fetchingHistory}
                                    content={content}
                                />
                            </div>
                        </Collapse>
                        <Collapse isOpened = {
                            toggle
                            && collapsibleItem.key === itemKey
                            && collapsibleItem.show
                            && collapsibleItem.content === 'ranking'
                        } >
                            <div  className="p-5 bg-gray-200">
                                <RankingList
                                    data={paginatedRankData}
                                    itemKey={itemKey}
                                    hanldNextPage={hanldNextPage}
                                    content={content}
                                    currentPosition={position}
                                    index={paginationOffset}
                                    pageCount={pageCount}
                                />
                            </div>
                        </Collapse>
                    </td> 

                </tr>

            
        </>
    )
}

export default KeywordItem
