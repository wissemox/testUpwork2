import React from 'react'
import DomainForm from './DomainForm'
import KeywordSection from './KeywordSection'

const Domain = () => {
  return (
    <>
    <div id="alert-container"></div>
    <div className="flex gap-10 px-4 py-4 overflow-x-hidden h-screen">
      <div className="w-2/4">
        <DomainForm />
      </div>
      <div className="w-3/4">
        <KeywordSection />
      </div>
    </div>
    </>
  )
}

export default Domain
