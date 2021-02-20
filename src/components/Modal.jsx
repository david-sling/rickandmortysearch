import React from 'react'

export default function Modal({ character, setCharacter }) {
    return (
        <div className="Modal" >
            <div className="close" onClick={()=>setCharacter(null)} ></div>
            <div className="dialog">
                <div className="closeIcon" onClick={()=>setCharacter(null)} >X</div>
                <div className="top">
                    <div className="image">
                        <img src={character.image} alt=""/>
                    </div>
                    <div className="head">
                        <h3>{character.name}</h3>
                        <div className="details">
                            <div className={`dot ${character.status}`}></div>
                            <p>{character.status} - {character.species}</p>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="bottom">
                    <div className="field">
                        <p className="title">Gender</p>
                        <p className="value">{character.gender}</p>
                    </div>
                    <div className="field">
                        <p className="title">Location</p>
                        <p className="value">{character.location.name}</p>
                    </div>
                    <div className="field">
                        <p className="title">Species</p>
                        <p className="value">{character.species}</p>
                    </div>
                    <div className="field">
                        <p className="title">Origin</p>
                        <p className="value">{character.origin.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
