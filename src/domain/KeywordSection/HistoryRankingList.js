import React , {useEffect} from 'react'
import Aos from 'aos'
import "aos/dist/aos.css"
 
const HistoryRankingList = ({ 
  
    data, 
    panelHistoryRef, 
    text,
    itemKey,
    fetching,
    content
}) => {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, [])
  const renderedComponent = () => {
    
   if (data.length > 0) {
      return (
        <>
          <p className="font-semibold text-sm">Showing history for "{ text }"</p>
          <table>
            <thead>
                <tr>
                    <td className="p-4">Date</td>
                    <td className="p-4">Position</td>
                </tr>
            </thead>
            <tbody>
              {
                data.map( log => {
                  const { created_at, position } = log
                  let date = new Date(created_at)
                  let day = ("0" + date.getDate()).slice(-2)
                  let month = ("0" + (date.getMonth() + 1)).slice(-2)
                  let year = date.getFullYear()
                  let newDate = `${day}-${month}-${year}`

                  return <tr className="">
                    <td className="text-sm px-4 py-2">{ newDate }</td>
                    <td className="text-sm text-center px-4 py-2">{ position }</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </>
      )
    } else if (data.length === 0) {
      return <div className="flex justify-center">
        No History Data.
      </div>
    }
  }

  return (
    <div>
      {renderedComponent()}
    </div>
  )
}

export default HistoryRankingList
