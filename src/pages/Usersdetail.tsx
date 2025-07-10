import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Bodyusers from '../components/Bodyusers';

// Main App component
const App = () => {
    const { id } = useParams();
  const [user, setUser] = useState<any[]>([]);
  // Effect to fetch details for each story ID
  useEffect(() => {
    const fetchStoryDetails = async () => {
      // Use Promise.all to fetch all story details concurrently
      try {
          const response = await fetch(` https://hacker-news.firebaseio.com/v0/user/${id}.json?print=pretty`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for item ${id}`);
          }
          const story = await response.json();
          setUser([story].filter(story => story && !story.deleted && !story.dead)); // Filter out null/deleted/dead stories
      } catch (e) {
        console.error("Error fetching story details:", e);
      } finally {
        // setLoading(false);
      }
    };
    fetchStoryDetails();
  }, [id]); // Re-run when id changes
  return (
    <div className="w-screen font-inter flex flex-col items-center min-h-screen">
      <main className="container">
        <Bodyusers users={user}  />
      </main>
    </div>
  );
};

export default App;