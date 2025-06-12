import React from 'react'
import cinematchPic from '../../src/CINEMATCHPIC.png'

const Header = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-20 bg-gradient-to-b from-black via-black/90 to-transparent pb-8">
      <div className="flex items-center px-12 py-4">
        <img 
          src={cinematchPic} 
          alt="CineMatch Logo" 
          className="h-20 object-contain"
        />
      </div>
    </div>
  )
}

export default Header