
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { firestore } from '../../../backend/firebase/utils';
import { LocationSearchContext } from '../../context/LocationContext';
import { allconstructionStatus, allspaceType, MaxBudget, MaxCoveredArea, MinBudget, MinCoveredArea, OwnerOptions, typeOptions } from './filterData';



// import {LocationOptions,OwnerOptions,typeOptions,PositionOptions} from './filterOptions'

function SearchResultPage() {

  
 


 const history= useHistory();
  
 const [allProperties, setallProperties] = useState([]);

 
 useEffect(()=>{  
   getDataformDatabase()
  
},[])



const {searchTerm,setSearchTerm,update} = useContext(LocationSearchContext)

 
 async function getDataformDatabase(){
   
   try {
       const properties = await firestore.collection('properties').get();
       const propertyArray =[];
       properties.forEach((doc)=>{
       const obj ={
           id:doc.id,
           ...doc.data()
       }
       propertyArray.push(obj)
      
       
   })
   setallProperties(propertyArray);
   } catch (error) {
     console.log(error)  
   }
}


//-----------------------------for filters--------------------------------------------//








// const [filteredProperties, setfilteredProperties] = useState([])

useEffect(() => {
  const filterValuesData = window.sessionStorage.getItem("filter Values")
  const data = JSON.parse(filterValuesData)
  console.log("data",data)
  setLocation(data.location)
   setlocality(data.locality)
   setminBudget(parseFloat(data.minBudget))
   setMaxBudget(parseFloat(data.maxBudget))
   

   setminCoveredArea(parseFloat(data.minCoveredArea))
   setmaxCoveredArea(parseFloat(data.maxCoveredArea))
   setconstructionStatus(data.constructionStatus)
   setpropertyType(data.propertyType)
   setreraPropertyNo(data.reraPropertyNo)
   setspaceType(data.spaceType)
   setpostedBy(data.postedBy)
   setpropertyType(data.propertyType)
 }, [])

 const [location, setLocation] = useState('')
 const [locality, setlocality] = useState('')
 const [minBudget, setminBudget] = useState(0)
 const [maxBudget,setMaxBudget] = useState(10000000000);
 const [propertyType, setpropertyType] = useState('')
 const [spaceType, setspaceType] = useState('')
 const [postedBy, setpostedBy] = useState('')
 const [constructionStatus, setconstructionStatus] = useState('')
 const [minCoveredArea, setminCoveredArea] = useState(0)
 const [maxCoveredArea, setmaxCoveredArea] = useState(10000000000)
 const [reraRegisteredProperty, setreraRegisteredProperty] = useState('')
 const [reraPropertyNo, setreraPropertyNo] = useState('')
 
 

 const searchProperties = allProperties.filter(result=>{return result.propertyApproval===true})



const filteredProperties = searchProperties
                                        .filter(result=>{return result.location.toLowerCase().includes(location.toLowerCase())})
                                        // .filter(result=>{return result.locality.toLowerCase().includes(locality.toLowerCase())})
                                        .filter(result=>{return result.type.toLowerCase().includes(propertyType.toLowerCase())})
                                        .filter(result=>{return result.postedBy.toLowerCase().includes(postedBy.toLowerCase())})
                                        // .filter(result=>{return result.spaceType.toLowerCase().includes(spaceType.toLowerCase())})
                                        .filter(result=>{return result.type.toLowerCase().includes(propertyType.toLowerCase())})
                                        .filter(result=>{return result.status.toLowerCase().includes(constructionStatus.toLowerCase())})
                                        .filter(result=>{return result.reraId.includes(reraPropertyNo)})
                                        .filter(result=>{  if (result.price>=minBudget) return result})
                                        .filter(result=>{ if (result.size>=minCoveredArea) return result })
                                        .filter(result=>{ if (result.price<=maxBudget) return result })
                                        .filter(result=>{  if (result.size<=maxCoveredArea) return result})
                                      
            console.log('SERACH',searchProperties)
            console.log('fol',filteredProperties)
            console.log('all',allProperties)
                                        
  const handleReset=()=>{
    setLocation('')
    setlocality('')
    setminBudget(0)
    setMaxBudget(100000000000)
    setminCoveredArea(0)
    setmaxCoveredArea(1000000000)
    setconstructionStatus('')
    setpropertyType('')
    setreraPropertyNo('')
    setspaceType('')
    setpostedBy('')
    setpropertyType('')
  }
 

  
  useEffect(() => {
    const filterValuestoBeSaved = {
      location,locality,propertyType,postedBy,spaceType,propertyType,constructionStatus,reraPropertyNo,minBudget,minCoveredArea,maxBudget,maxCoveredArea
    }
    window.sessionStorage.setItem("filter Values",JSON.stringify(filterValuestoBeSaved))
  })

  
  

  return (
    <>
  
      <div>
        <button onClick={()=>handleReset()}>Clear</button>
        filterOptions
        
        <div>
          Location
          <input type='text' value ={location} onChange={e=>setLocation(e.target.value)}/>
        </div>
        <div>
          Locality
          <input type='text' value ={locality} onChange={e=>setlocality(e.target.value)}/>
        </div>

        <div>
          Budget

          <select value ={minBudget} onChange={e=>setminBudget(e.target.value)}>
        {MinBudget.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
          </select>


          
            
          <select value ={maxBudget} onChange={e=>setMaxBudget(e.target.value)}>
        {MaxBudget.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
          
          </select>


        </div>
           
        <div>
          Property Type
          <select value ={propertyType}  onChange={e=>setpropertyType(e.target.value)}>
        {typeOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
          </select>
        </div>

        <div>
          Space Type
        <select value ={spaceType} onChange={e=>setspaceType(e.target.value)}>
            
        {allspaceType.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
          </select>
        </div>

        <div>
          PostedBy
          <select value ={postedBy} onChange={e=>setpostedBy(e.target.value)}>
            {OwnerOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
        </div>

        <div>
          ConstructionStatus
          <select value ={constructionStatus} onChange={e=>setconstructionStatus(e.target.value)}>
            {allconstructionStatus.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>
        </div>

        <div>
          Covered Area

          <select value ={minCoveredArea} onChange={e=>setminCoveredArea(e.target.value)}>
            {MinCoveredArea.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
            </select>

          <select value ={maxCoveredArea} onChange={e=>setmaxCoveredArea(e.target.value)}>
            
          {MaxCoveredArea.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
          </select>


        </div>
         
        <div>
          RERA Registered Property
        <select>
            
            <options></options>
          </select>
        </div>

        <div>
          RERA Registered Property
        <input type='text' value={reraPropertyNo} onChange={e=>setreraPropertyNo(e.target.value)}/>
        </div>

      </div>







{/* {minBudget}{typeof(minBudget)}<br/>{maxBudget}{typeof(maxBudget)}<br/>{minCoveredArea}{typeof(minCoveredArea)}<br/>{maxCoveredArea}{typeof(maxCoveredArea)}<br/>{console.log(typeof(maxBudget))} */}

      
      <div>
         
      {(filteredProperties.length>0) ? 
   <>
  

  
     {filteredProperties.map((property,index)=>{
      
    
      return(
        <>
        
        {  (property.propertyApproval===false)? " "
        :
        <>
        <Link to={`/search/${property.id}`}>
          <div>
            {property.propertyName}
          </div>
          </Link>
      </>
     
        }</>
      
      )
     })}

   </>
   :

   <div>No Properties found     </div>}

        
      </div>
    </>
  )
}

export default SearchResultPage