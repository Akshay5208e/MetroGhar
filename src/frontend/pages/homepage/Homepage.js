import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOutUserStart } from '../../../backend/redux/User/user.actions';
import { LocationSearchContext } from '../../context/LocationContext';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

function Homepage() {

  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  const {searchTerm,setSearchTerm,update} = useContext(LocationSearchContext)

  const [state, setState] = useState('Location')
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

  
  const history = useHistory();

  

   useEffect(() => {
    const filterValuestoBeSaved = {
      location,locality,propertyType,postedBy,spaceType,propertyType,constructionStatus,reraPropertyNo,minBudget,minCoveredArea,maxBudget,maxCoveredArea
    }
    window.sessionStorage.setItem("filter Values",JSON.stringify(filterValuestoBeSaved))
  })

  return (
      <div>
          Homepage
        {currentUser&&
        <button onClick={() => signOut()}>Signout</button>}

        <select onChange={e=>setState(e.target.value)}>
          
          <option value='Location'>Location</option>
          <option value='Locality'>Locality</option>
        </select>
        
        {state}
        {/* {state==='Location' ? <input type ='text' value={searchTerm} onChange={getLocationSearch}/>: <input onChange={getLocalitySearch}/>} */}
        {state==='Location' ? <input type ='text' value={location} onChange={e=>setLocation(e.target.value)}/>: <input type ='text' value={locality} onChange={e=>setlocality(e.target.value)}/>}
        
        
        <button onClick={()=>history.push('/search')}>Search</button>
      
      </div>
  )
}

export default Homepage;
