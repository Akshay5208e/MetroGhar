import React,{useState,useEffect} from 'react'


export const LocationSearchContext = React.createContext();

export const LocationSearchProvider = ({children})=>{
    const [searchTerm, setSearchTerm] = useState("")

    const update=(text)=>
    {
        setSearchTerm(text)
    }
    

return <LocationSearchContext.Provider value = {{searchTerm,setSearchTerm, update}}>{children}</LocationSearchContext.Provider>
}



export const LocalitySearchContext = React.createContext();

export const LocalitySearchProvider = ({children})=>{
    const [localitySearchTerm, setLocalitySearchTerm] = useState("")

    const localityUpdate=(text)=>
    {
        setLocalitySearchTerm(text)
    }
    

return <LocalitySearchProvider.Provider value = {{localitySearchTerm,setLocalitySearchTerm, localityUpdate}}>{children}</LocalitySearchProvider.Provider>
}