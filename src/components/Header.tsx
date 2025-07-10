import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full bg-orange-500 text-white shadow">
      <div className=" px-4 py-3 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-2">
          <div className="bg-white text-orange-500 font-bold px-2 py-1 rounded">Y</div>
          <Link to="/" className="text-lg font-semibold hover:text-blue-200"><span className='text-black'>Hacker News</span></Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/news" className="hover:text-blue-200"><span className='text-black'>News</span></Link>
          <Link to="/past" className="hover:text-blue-200"><span className='text-black'>Past</span></Link>
          <Link to="/comment" className="hover:text-blue-200"><span className='text-black'>Comments</span></Link>
          <Link to="/ask" className="hover:text-blue-200"><span className='text-black'>Ask</span></Link>
          <Link to="/show" className="hover:text-blue-200"><span className='text-black'>Show</span></Link>
          <Link to="/job" className="hover:text-blue-200"><span className='text-black'>Jobs</span></Link>
          <Link to="/submit" className="hover:text-blue-200"><span className='text-black'>Submit</span></Link>
        </nav>

        {/* Desktop Login */}
        <div className="hidden md:block">
          <Link
            to="/submit"
            className="bg-white text-orange-500 font-semibold px-4 py-1.5 rounded-full shadow hover:bg-orange-100 transition duration-200"
            >
            Login
            </Link>
        </div>

        {/* Mobile Menu Button (Just text) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-sm font-semibold underline"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-orange-600">
          <Link to="/news" className="block hover:text-blue-200">new</Link>
          <Link to="/past" className="block hover:text-blue-200">past</Link>
          <Link to="/comment" className="block hover:text-blue-200">comments</Link>
          <Link to="/ask" className="block hover:text-blue-200">ask</Link>
          <Link to="/show" className="block hover:text-blue-200">show</Link>
          <Link to="/job" className="block hover:text-blue-200">jobs</Link>
          <Link to="/submit" className="block hover:text-blue-200">submit</Link>
          <Link to="/submit" className="block hover:text-blue-200">login</Link>
        </div>
      )}
    </header>
  )
}
