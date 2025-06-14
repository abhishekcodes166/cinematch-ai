import React from 'react'
import cinematchPic from '../../src/CINEMATCHPIC.png'
import { auth } from './Firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utiles/Userslice'

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();   
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const {uid, email, displayName} = user;
            dispatch(addUser({uid:uid, email:email, displayName:displayName}));
            if (location.pathname !== "/browse" && location.pathname !== "/gptsearch") {
              navigate("/browse");
            }
        } else {
            dispatch(removeUser());
            if (location.pathname !== "/") {
              navigate("/");
            }
        }
    });
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handlegptsearch = () => { 
    navigate("/gptsearch");
  }

  return (
    <div className="absolute top-0 left-0 w-full z-20 bg-gradient-to-b from-black via-black/90 to-transparent pb-8">
      <div className="flex items-center justify-between px-12 py-4">
        <img 
          src={cinematchPic} 
          alt="CineMatch Logo" 
          className="h-20 object-contain"
        />
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-white">{user.displayName || user.email}</span>
            <button 
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition-colors"
            >
              Sign Out
            </button>
            <button 
              onClick={handlegptsearch}
              className="bg-white text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded font-semibold border-2 border-red-600 transition-colors shadow-md"
            >
              ASK AI
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header