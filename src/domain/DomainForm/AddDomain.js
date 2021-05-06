import React, { useState  ,useEffect} from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { fetchAllDomain, setSelectedDomain } from '../../redux/domain'
import { fetchAllKeywords } from '../../redux/keyword'

import alertMessage from '../alertMessage'
import Aos from 'aos'
import "aos/dist/aos.css"
const AddDomain = () => {
    const { register, handleSubmit, errors, data } = useForm()
    const [domainTextValue, setDomainTextValue] =  useState('')
    const [isPending, setIsPending] = useState(false)
    const [isPendingClass, setIsPendingClass] = useState('')
    const dispatch = useDispatch()

    const rules = {
        domain: {
            required: 'The domain field is required.',
            // pattern: {
            //     value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/,
            //     message: 'Please enter a valid domain.'
            // }
        }
    }

    const handleOnChange = (e) => {
        const value = e.target.value
        setDomainTextValue(value)
    }

    const handleValidation = (data, e) => {
        setIsPending(true)
        setIsPendingClass('opacity-50 cursor-not-allowed')

        axios.post('/api/domains/validate', {
            domain: domainTextValue
        }).then( res => {
            if (!res.data.length) {
                axios.post('/api/domains/store', {
                    domain: domainTextValue
                }).then( res => {
                    let { insertId: domainId } = res.data
                    let link = JSON.parse(res.config.data)
                    const domain = {
                        id: domainId,
                        link: link.domain
                    }
                    alertMessage.show(`bg-blue-800`, `We have successfully added ${domainTextValue} domain.`)
                    e.target.reset()
                    dispatch(setSelectedDomain(domain))
                    dispatch(fetchAllDomain())
                    dispatch(fetchAllKeywords({domainId: domain.id}))
                })
                .catch( err => {
                    console.error(err)
                    setIsPending(false)
                    setIsPendingClass('')
                })
            } else alertMessage.show(`bg-red-500`, `${domainTextValue} domain already exist. Please try again!`)
            setIsPending(false)
            setIsPendingClass('')
        })
        .catch( err => {
            console.error(err)
            setIsPending(false)
            setIsPendingClass('')
        })
    }
    useEffect(() => {
        Aos.init({duration: 2000});
      }, [])
    return (
        <>
            <div data-Aos="fade-up">
                <label className="font-semibold text-4xl text-gray-700">Add Domain</label>
            </div>
            <form method="POST" onSubmit={handleSubmit(handleValidation)}>
                <div data-Aos="fade-up" className="flex pt-2 gap-2">
                    <div data-Aos="fade-up" className="flex w-full">
                        <input data-Aos="fade-right"
                            x-model="email"
                            name="domain"
                            placeholder="abc.com"
                            className="w-full rounded placeholder-gray-500 border border-gray-500 px-4"
                            required
                            onChange={handleOnChange}
                            ref={register(rules.domain)}
                        />
                    </div>
                    <div data-Aos="fade-up" className="flex justify-end w-1/2">
                        <button data-Aos="fade-up"
                            type="submit" 
                            className={`flex justify-center px-10 py-2 text-white rounded-md bg-blue-800 w-full inline-flex items-center ${isPendingClass}`}
                            disabled={isPending}
                        >
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span data-Aos="fade-up">Add Domian</span>
                        </button>
                    </div>
                </div>
                <div  data-Aos="fade-up" className="flex pt-2">
                    <div className="flex w-full">
                        <p className="text-red-500 mt-px-2">{errors.domain && errors.domain.message}</p>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddDomain
