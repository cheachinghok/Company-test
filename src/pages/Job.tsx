import { useState, useEffect } from 'react';
import BodyDisplay from '../components/BodyDisplay';

// Main App component
const App = () => {
  const [storyIds, setStoryIds] = useState<number[]>([]); // State to hold story IDs
  const [stories, setStories] = useState<any[]>([]);   // State to hold full story data

  // Effect to fetch top story IDs when the component mounts
  useEffect(() => {
    const fetchTopStoryIds = async () => {
      try {
        // Fetch the list of top story IDs
        const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const ids = await response.json();
        // Take only the first 30 stories for display to avoid too many requests
        setStoryIds(ids.slice(0, 30));
      } catch (e) {
        console.error("Error fetching top story IDs:", e);
      } finally {
        // setLoading(false);
      }
    };

    fetchTopStoryIds();
  }, []); // Empty dependency array means this runs once on mount

  // Effect to fetch details for each story ID
  useEffect(() => {
    const fetchStoryDetails = async () => {
      if (storyIds.length === 0) return; // Don't fetch if no IDs
      // const fetchedStories = [];
      // Use Promise.all to fetch all story details concurrently
      try {
        const storyPromises = storyIds.map(async (id) => {
          const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for item ${id}`);
          }
          return response.json();
        });

        // Wait for all promises to resolve
        const results = await Promise.all(storyPromises);
        setStories(results.filter(story => story && !story.deleted && !story.dead)); // Filter out null/deleted/dead stories
      } catch (e) {
        console.error("Error fetching story details:", e);
      } finally {
        // setLoading(false);
      }
    };

    fetchStoryDetails();
  }, [storyIds]); // Re-run when storyIds change
  return (
    <div className="min-h-screen min-w-screen font-inter flex flex-col items-center">
      <main className="container">
        <ul className="bg-[#e8e8e8]">
            <div className='py-4 px-13'>
                <p className='text-[#828282]'>
                    These are jobs at YC startups. See more at
                    <a 
                        href='https://www.ycombinator.com/jobs' 
                    >
                        <span className='text-[#828282] underline px-1'>ycombinator.com/jobs.</span>
                    </a>
                </p>
            </div>
          <BodyDisplay stories={stories} type={'job'} />
        </ul>
      </main>
    </div>
  );
};

export default App;