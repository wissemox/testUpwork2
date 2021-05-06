import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSelectedDomain } from '../../redux/domain'
import { fetchAllKeywords } from '../../redux/keyword'
import Aos from 'aos'
import "aos/dist/aos.css"
import Select from '../../shared/Select'

const DomainDropdown = () => {
    const { data, selectedDomain } = useSelector(state => state.domain)
    const dispatch = useDispatch()

    const handleDomainChange = (domain) => {
        dispatch(setSelectedDomain(domain))
        dispatch(fetchAllKeywords({ domainId: domain.id }))
    }
    useEffect(() => {
        Aos.init({duration: 2000});
      }, [])

    return (
        <>
            <div  data-Aos="fade-up" className="flex pt-10">
                <div  data-Aos="fade-up" className="flex w-full">   
                    <label  data-Aos="fade-up" className="font-semibold mr-5 pt-1.5 text-2xl text-gray-700">Show keywords for domain</label>
               
                    <div  data-Aos="fade-up" className="w-1/3">
                        <Select 
                         data-Aos="fade-up"
                            items={data} 
                            onSelectItem={handleDomainChange} 
                            text={selectedDomain.link === undefined ? 'Please select domain' : selectedDomain.link} 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DomainDropdown
