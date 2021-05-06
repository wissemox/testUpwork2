import React,{useState} from 'react'

const CryptoMap = ({el , i , Bolen,setBolen}) => {
    
    return (
        <div className="MapCrypto">
            <p>{i+1}</p>
            {console.log(i)}
            <div  className="Crypto">
                {console.log(Bolen)}
                  <p>Name crypto </p>
          </div>
          <div className="Linkd">
              {el.link}
          </div>
        </div>
    )
}

export default CryptoMap
