
import { Routes, Route, Link } from 'react-router-dom';
import Hackernews from './pages/Hackernews';
import News from './pages/News';
import Past from './pages/Past';
import Comment from './pages/Comments';
import Ask from './pages/Ask';
import Show from './pages/Show';
import Job from './pages/Job';
// Main App component
const App = () => {

  return (
    <div className='min-h-screen min-w-screen bg-gray-100 font-inter flex flex-col items-center'>
      <header className="w-full max-w-screen rounded-lg text-center px-50">
        <div className="mt-3 w-full bg-orange-500 text-black px-4 py-2 flex items-center justify-between">
            <nav className="flex items-center space-x-2">
                <div className="border border-white text-white font-bold px-1 mr-2">Y</div>
                <Link to="/"><span className='text-black font-bold hover:text-blue-500'>Hacker News</span></Link>
                <Link to="/news"><span className='text-black hover:text-blue-500'>new</span></Link>
                <span>|</span>
                <Link to="/past"><span className='text-black hover:text-blue-500'>past</span></Link>
                <span>|</span>
                <Link to="/comment"><span className='text-black hover:text-blue-500'>comments</span></Link>
                <span>|</span>
                <Link to="/ask"><span className='text-black hover:text-blue-500'>ask</span></Link>
                <span>|</span>
                <Link to="/show"><span className='text-black hover:text-blue-500'>show</span></Link>
                <span>|</span>
                <Link to="/job"><span className='text-black hover:text-blue-500'>jobs</span></Link>
                <span>|</span>
                <span>submit</span>
            </nav>

            {/* Right side: Login */}
            <div className="text-right">
                <span className="cursor-pointer">login</span>
            </div>
        </div>
      </header>
    
     <Routes>
        <Route path="/" element={<Hackernews />} />
        <Route path="/news" element={<News />} />
        <Route path="/past" element={<Past />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/show" element={<Show />} />
        <Route path="/job" element={<Job />} />
      </Routes>
  </div>
  );
};

export default App;