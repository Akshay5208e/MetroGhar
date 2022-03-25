import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUserStart } from '../../../backend/redux/User/user.actions';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

function Homepage() {

  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);
  
  const signOut = () => {
    dispatch(signOutUserStart());
  };


  return (
      <div>
          Homepage
        {currentUser&&
        <button onClick={() => signOut()}>Signout</button>}
        
      </div>
  )
}

export default Homepage;
