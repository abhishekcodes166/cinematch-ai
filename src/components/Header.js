import React from 'react'
import cinematchPic from '../../src/CINEMATCHPIC.png'
import { auth } from './Firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
          </div>
        )}
      </div>
    </div>
  )
}

export default Header