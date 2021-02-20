import axios from 'axios'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReactVisibilitySensor from 'react-visibility-sensor'
import ResultCard from './ResultCard'

export default function Search({setCharacter}) {

    const [ search, setSearch ] = useState('')
    const [ results, setResults ] = useState(null)
    const [ info, setInfo ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        getNewData()
    },[search])

    useEffect(()=>{
        if (!error) return null
        console.error(error)
        alert(error)
    },[error])

    useEffect(()=>{
        console.log({results, info})
    },[results, info])

    const getNewData = async () => {

        setLoading(true)
        try {
            console.log('getNewData()')
            // if(Number.isInteger(setPage)) page=setPage
            // console.log(page)

            const data = await axios.get(`https://rickandmortyapi.com/api/character/?name=${search}&page=${1}`)
            setResults(data.data.results)
            setInfo(data.data.info)
            setError(data.data.error) // if error is caught without error code
        } catch (error) {
            console.log(error.request.status)
            if (error.request.status==404) setError('No items found for requested reource')
        }
        setLoading(false)
    }

    const getNextPage = async () => {
        if(loading) return null
        else if (info.count==results.length){
            // setError('End of Results')
            console.log('full')
        }
        else{
            const data = await axios.get(info.next)
            setResults( prevResults=> [ ...prevResults, ...data.data.results ] )
            setInfo(data.data.info)
        }
    }

    return (
        <div className="Search" >
            <div className="fixed">
                <input 
                    placeholder="Search . . ."
                    type="text"
                    value={search}
                    onChange={ (e)=>setSearch(e.target.value) }
                />
                {(results&&info)&&<p>Showing {results.length} of {info.count} results</p>}
            </div>
            {/* <button onClick={ getNextPage } >nextPage</button> */}
            {(results&&info)&&<div className="dataList">
                {results.map( result => (
                    <ResultCard result={result} key={result.id} setCharacter={setCharacter} />) 
                )}
                <ReactVisibilitySensor
                    onChange={ isVisible => {
                        if(isVisible) getNextPage()
                    } }
                >
                    <div className="loader">
                        {loading
                            ?<p>LOADING...</p>
                            :<button onClick={ getNextPage } >{info.count==results.length?'End of Results':'Load more'}</button>
                        }
                    </div>
                </ReactVisibilitySensor>
            </div>}
        </div>
    )
}
