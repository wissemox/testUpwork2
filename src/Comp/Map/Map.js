import React, { useState , useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import { countries } from '../../config/countries.json'
import { languages } from '../../config/languages.json'
import { setSelectedDomain } from '../../redux/domain'
import { fetchAllKeywords } from '../../redux/keyword'
import alertMessage from '../../domain/alertMessage'
import './Map.css'
import Select from '../../shared/Select'
import Aos from 'aos'
import "aos/dist/aos.css"
const AddKeyword = () => {
    useEffect(() => {
        Aos.init({duration: 2000});
      }, [])
    const { data, selectedDomain } = useSelector(state => state.domain)
    const { register, handleSubmit, errors, result } = useForm()

    const dispatch = useDispatch()

    const [keywords, setKeywords] = useState('')
    const [isPendingClass, setIsPendingClass] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [lang, setLang] = useState('en')
    const [languageText, setLanguageText] = useState('English')
    const [location, setLocation] = useState('us')
    const [locationText, setLocationText] = useState('United States')
    const [flag, setFlag] = useState(`http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg`)

    const rules = {
        keyword: {
            required: 'The keyword field is required.',
            pattern: {
                value: /^[^\s,]/,
                message: 'Invalid keyword format. Keyword should not start with whitespaces or comma.'
            }
        }
    }

    const handleLocationChange = (location) => {
        setLocation(location.code)
        setLocationText(location.name)
        setFlag(`http://purecatamphetamine.github.io/country-flag-icons/3x2/${location.code}.svg`)
    }

    const handleDomainChange = (domain) => {
        dispatch(setSelectedDomain(domain))
        dispatch(fetchAllKeywords({domainId: domain.id}))
    }

    const handleLangChange = (language) => {
        setLang(language.code)
        setLanguageText(language.name)
    }

    const handleKeywordChange = (e) => {
        const value = e.target.value
        setKeywords(value)
    }

    const handleAddKeyword = (data, e) => {
        let arr = keywords.split(/[\n]|[,]/)
        let validKeywords = arr.filter((value) => {
            return value.trim() !== ""
        })
        if (selectedDomain.id !== undefined) {
            setIsPending(true)
            setIsPendingClass('opacity-50 cursor-not-allowed')

            axios.post('/api/keywords/store', {
                domainId: selectedDomain.id,
                location,
                lang,
                keywords: validKeywords
            })
            .then( res => {
                setIsPending(false)
                setIsPendingClass('')
                alertMessage.show(`bg-blue-800`, `New keywords has been added to ${selectedDomain.link} domain.`)
                e.target.reset()

                dispatch(setSelectedDomain(selectedDomain))
                dispatch(fetchAllKeywords({domainId: selectedDomain.id}))
            })
            .catch( err => {
                console.error(err)
                setIsPending(false)
                setIsPendingClass('')
            })
        } else alertMessage.show(`bg-red-500`, `Please select domain to add new keywords.`)
    }

    return (
        <div data-Aos="fade-left" className="Background">
        <div data-Aos="fade-up" className="Dazd">
            <form method="POST" onSubmit={handleSubmit(handleAddKeyword)}>
               
                
              
                <div data-Aos="fade-up" className="flex pt-2">
                    <div data-Aos="fade-up" className="flex w-full justify-end">
                        <p data-Aos="fade-up" className="text-red-500 mt-px-2">{errors.keyword && errors.keyword.message}</p>
                    </div>
                </div>
<div data-Aos="fade-up" className="Selectad">
                <label data-Aos="fade-right" className="flex py-2">Search Engine Settings</label>
                <div data-Aos="fade-up" className="flex pt-2 gap-2">
                    <div className="flex justify-center gap-2">
                        <svg className="mt-2 w-7 h-7 text-gray-700" fill="none" viewBox="0 0 26 26" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                            <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                            <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                            <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                            <path fill="none" d="M2 2h44v44H2z" />
                        </svg>
                    </div>
                    <div className="Monji">
                        <div className="Select5">
                    <div className="w-full relative z-10">
                        <Select 
                        data-Aos="fade-up"
                            items={countries} 
                            onSelectItem={handleLocationChange} 
                            text={locationText} 
                            showFlag={true}
                            flag={flag}
                        />
                    </div>
                    <div className="w-full relative z-10">
                        <Select 
                            items={languages} 
                            onSelectItem={handleLangChange} 
                            text={languageText} 
                        />
                     </div>
                    </div>
                    </div>
                    
                </div>
           
                <img id="Image" src="Capture.jpg"/>
               
                <div className="flex pt-4">
                
                </div>
                </div>
            </form>
        </div>
        </div>
    )
}

export default AddKeyword
