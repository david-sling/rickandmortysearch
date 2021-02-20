import React, { useState } from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import Modal from './Modal'

export default function ResultCard( {result, setCharacter} ) {

    const [imageLoaded, setImageLoaded] = useState(false)
    return (
        <>
            <div className='ResultCard' onClick={ ()=>setCharacter(result) } >
                <div className="left">
                    <ReactVisibilitySensor
                        onChange={ isVisible => {
                            if(isVisible) {
                                setImageLoaded(true)
                                // console.log(result.name)
                            }
                        } }
                    >
                        <div className="image">
                            {imageLoaded&&<img src={result.image} alt=""/>}
                        </div>
                    </ReactVisibilitySensor>
                        <h3>{result.name}</h3>
                </div>
                <div className="right">
                    <div className={`dot ${result.status}`}></div>
                    <p>{result.status} - {result.species}</p>
                </div>

            </div>
        </>
    )
}
