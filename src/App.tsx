
import { Routes, Route,useLocation} from 'react-router-dom';
import Hackernews from './pages/Hackernews';
import News from './pages/News';
import Past from './pages/Past';
import Comment from './pages/Comments';
import Ask from './pages/Ask';
import Show from './pages/Show';
import Job from './pages/Job';
import AuthPage from './pages/Submit';
import Header from './components/Header';
import Storydetail from './pages/Storydetail';
import Usersdetail from './pages/Usersdetail';
// Main App component
const App = () => {
  const location = useLocation()
  const hideHeader = location.pathname === '/submit'
  return (
    <div className=' bg-gray-100 font-inter flex flex-col items-center'>
      <>
      {!hideHeader && (
      <div className="container">
        <Header />
      </div>
      )}
      </>
     <Routes>
        <Route path="/" element={<Hackernews />} />
        <Route path="/news" element={<News />} />
        <Route path="/past" element={<Past />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/show" element={<Show />} />
        <Route path="/job" element={<Job />} />
        <Route path="/submit" element={<AuthPage />} />
        <Route path="/story/:id" element={<Storydetail />} />
        <Route path="/user/:id" element={<Usersdetail />} />
      </Routes>
      <>
      </>
  </div>
  );
};

export default App;