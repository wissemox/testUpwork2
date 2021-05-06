import React from 'react'
import AddDomain from './AddDomain';
import AddKeyword from './AddKeyword';
import RemoveDomain from './RemoveDomain';

// container component
function DomainForm() {
    return (
        <div>
            <AddDomain />
            <AddKeyword />
            <RemoveDomain />
        </div>
    )
}

export default DomainForm;
