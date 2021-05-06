import React, { useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'

const Select = ({ items = [], onSelectItem, text, showFlag = false, flag = ''}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
            <button onClick={() => toggle(!isOpen)} type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" className="w-full relative bg-white border border-gray-500 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base">
                <span class="flex items-center">
                    {
                        showFlag ? <img src={flag} alt="" class="flex-shrink-0 h-5 w-5 mr-3"/> : ''
                    }
                    <span class="block truncate">
                    {text}
                    </span>
                </span>
                <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </span>
            </button>  
            {
                isOpen && (
                    <div class="absolute mt-1 w-full rounded-md bg-white shadow-lg">
                        <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-base">
                            {
                                items.length > 0 ?
                                    items.map((item, id) => (
                                        <li key={id} onClick={() => {
                                            onSelectItem(item)
                                            setIsOpen(false)
                                        }} id="listbox-item-0" role="option" class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                                            <div class="flex items-center">
                                                {
                                                    showFlag ? <img src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.code}.svg`} alt="" class="flex-shrink-0 h-6 w-6 mr-3"/> : ''
                                                }
                                                <span class="block font-normal truncate">
                                                { item.name !== undefined ? item.name : item.link }
                                                </span>
                                            </div>
                                        </li>
                                    )) :
                                    <li id="listbox-item-0" role="option" class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                                        <div class="flex items-center">
                                            <span class="block font-normal truncate">
                                            No Domain
                                            </span>
                                        </div>
                                    </li>
                            }
                        </ul>
                    </div>
                )
            }
        </OutsideClickHandler>
    )
}

export default Select
