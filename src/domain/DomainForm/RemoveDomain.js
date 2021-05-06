import React, { useState ,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { fetchAllDomain, setSelectedDomain } from '../../redux/domain'
import { fetchAllKeywords } from '../../redux/keyword'

import alertMessage from '../alertMessage'
import Aos from 'aos'
import "aos/dist/aos.css"
import Select from '../../shared/Select'

const RemoveDomain = () => {
    const [domainId, setDomainId] = useState(0)
    const [domainText, setDomainText] = useState('Please select domain')
    const { data } = useSelector(state => state.domain)
    const dispatch = useDispatch()
    const [isPending, setIsPending] = useState(false)
    const [isPendingClass, setIsPendingClass] = useState('')

    const handleDomainChange = (domain) => {
        setDomainId(domain.id)
        setDomainText(domain.link)
    }

    const handleRemove = () => {
        if (domainId !== 0) {
            setIsPending(true)
            setIsPendingClass('opacity-50 cursor-not-allowed')

            axios.delete(`/api/domains/remove/${domainId}`)
                .then( res => {
                    alertMessage.show(`bg-blue-800`, `${domainText} domain has been deleted.`)
                    setIsPending(false)
                    setIsPendingClass('')
                    dispatch(fetchAllDomain())
                    dispatch(fetchAllKeywords({domainId: domainId}))
                    dispatch(setSelectedDomain([]))
                    setDomainText('Please select domain')
                    setDomainId(0)
                })
                .catch( err => {
                    console.error(err)
                    setIsPending(false)
                    setIsPendingClass('')
                })
        } else alertMessage.show(`bg-red-500`, `Please select domain to be deleted.`)
    }
    useEffect(() => {
        Aos.init({duration: 3000});
      }, [])
    return (
        <>
            <div data-Aos="fade-up" className="flex pt-20">
                <label className="flex font-semibold text-2xl text-gray-800">Remove Domain</label>
            </div>
            <div data-Aos="fade-up" className="flex pt-2 gap-2">
                <div data-Aos="fade-up" className="w-full relative">
                    <Select 
                    data-Aos="fade-right"
                        items={data} 
                        onSelectItem={handleDomainChange} 
                        text={domainText} 
                    />
                </div>
                <div data-Aos="fade-up" data-Aos="fade-up" className="flex justify-end w-1/2">
                    <button onClick={handleRemove} className={`flex justify-center px-10 py-2 text-white rounded-md bg-blue-800 w-full ${isPendingClass}`} disabled={isPending}>Remove Domain</button>
                </div>
            </div>
        </>
    )
}

export default RemoveDomain
