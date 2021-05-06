import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.css'

const RankingList = ({ 
  data,
  hanldNextPage,
  currentPosition,
  index,
  pageCount
}) => {
  const selectedClass = (rank) => {
    return currentPosition === rank ? 'bg-blue-800 text-white ' : ''
  }

  const renderedComponent = () => {
    if (data.length > 0) {
      return (
        <>
          <table>
            <thead>
                <tr>
                  <td className="p-4 w-24">#</td>
                  <td className="p-4 w-2/5">Search Result</td>
                  <td className="p-4 w-3/5">url</td>
                </tr>
            </thead>
            <tbody>
              {
                data.map((rank) => {
                    return <tr className={`${selectedClass(rank.position)}`}>
                      <td className="text-sm p-4">{ rank.position }</td>
                      <td className="text-sm p-4">{ rank.title }</td>
                      <td className="text-sm p-4">
                        <p class="break-normal md:break-all">{ decodeURIComponent(rank.url) }</p>
                      </td>
                    </tr>
                  })
              }
            </tbody>
          </table>
          {
            pageCount > 0 && (
              <div className="flex justify-center mt-4 my-auto">
                <ReactPaginate
                    previousLabel={"＜"}
                    nextLabel={"＞"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    containerClassName={`${styles.pagination}`}
                    activeClassName={`${styles.active}`}
                    onPageChange={hanldNextPage}
                    initialPage={index}
                />
              </div>
            )
          }
        </>
      )
    } else if (data.length === 0) {
      return <><div className="flex justify-center">
        No Ranking Data.
      </div>
      </>
    }
  }

  return (
    <div>
      {renderedComponent()}
    </div>
  )
}

export default RankingList
