import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signOutUserStart } from '../../../backend/redux/User/user.actions';
import { LocationSearchContext } from '../../context/LocationContext';
import { LocationOptions } from '../searchResultPage.js/filterData';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


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

  const handleChange=(e)=>{
    setlocality(e.target.value)
  }

  const handleSelect= async value =>{
    const result  = await geocodeByAddress(value);
    setlocality(result)
  }
   
  return (
      <div>
          Homepage
        {currentUser&&
        <button onClick={() => signOut()}>Signout</button>}

        <select onChange={e=>setLocation(e.target.value)}>
        {LocationOptions.map((option, index) => {
            const { value, name } = option;
  
            return (
              <option key={index} value={value}>{name}</option>
            );
          })}
          
        </select>
        
     
        {/* {state==='Location' ? <input type ='text' value={searchTerm} onChange={getLocationSearch}/>: <input onChange={getLocalitySearch}/>} */}
      {locality}
        <PlacesAutocomplete
        value={locality}
        onChange={setlocality}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
        
        <button onClick={()=>history.push('/search')}>Search</button>
      
      </div>
  )
}

export default Homepage;
