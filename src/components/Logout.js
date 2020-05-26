import React, {useContext} from 'react';
import { Redirect } from 'react-router';
import {UserContext} from '../UserContext';
export default function Logout() {
  const {user, setUser} = useContext(UserContext);
  localStorage.clear();
  setUser({loggedIn:false});
  return(<Redirect to="/" />);
}
