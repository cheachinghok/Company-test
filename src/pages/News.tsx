import { useState, useEffect } from 'react';

// Main App component
const App = () => {
  const [storyIds, setStoryIds] = useState<number[]>([]); // State to hold story IDs
  const [stories, setStories] = useState<any[]>([]);   // State to hold full story data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null);     // Error state

  // Effect to fetch top story IDs when the component mounts
  useEffect(() => {
    const fetchTopStoryIds = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch the list of top story IDs
        const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const ids = await response.json();
        // Take only the first 30 stories for display to avoid too many requests
        setStoryIds(ids.slice(0, 30));
      } catch (e) {
        console.error("Error fetching top story IDs:", e);
        setError("Failed to load top stories. Please try again later.");
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

      setLoading(true);
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
        setError("Failed to load story details. Some stories might not be displayed.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoryDetails();
  }, [storyIds]); // Re-run when storyIds change
    const getTimeAgo = (timestamp:any) => {
    const now = Date.now(); // Current time in milliseconds
    const time = timestamp * 1000; // Convert seconds to milliseconds
    const diff = now - time;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    };
  return (
    <div className="min-h-screen min-w-screen font-inter flex flex-col items-center">
      {/* Header */}
      

      {/* Loading and Error Messages */}
      {loading && (
        <div className="text-center text-gray-600 text-xl font-semibold mt-8">
          Loading stories...
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-4xl mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {/* Stories List */}
      {!loading && stories.length === 0 && !error && (
        <div className="text-center text-gray-600 text-xl mt-8">
          No stories found.
        </div>
      )}

      <main className="w-full max-w-scree px-50">
        <ul className="bg-[#e8e8e8]">
          {stories.map((story, index) => (
            <li key={story.id} className="px-5 py-2 duration-200">
                <div>
                    <span className='text-gray-500'>{index+1} .</span> 
                    <span className="text-sm text-gray-500">&#9650; </span>
                    <a
                        href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" font-semibold hover:text-blue-900 transition-colors duration-200 mb-2 truncate"
                    >
                        <span className='text-black text-base'>{story.title}</span> 
                    </a>
                    <a 
                        href={story.url || `https://news.ycombinator.com/item?id=${story.id}`} 
                        target="_blank"
                        className=" font-semibold hover:text-blue-900 transition-colors duration-200 mb-2 truncate">
                        <span className='text-xs text-gray-500'>(</span>
                        <span className='text-xs text-gray-500 hover:underline'>{story.url ? new URL(story.url).hostname.replace(/^www\./, '') : ""}</span>
                        <span className='text-xs text-gray-500'>)</span>  
                    </a> 
                </div>
                <div className="text-gray-600 text-xs ml-9">
                    <span className="mr-1">
                    <span className="">{story.score}</span> points 
                    </span>
                    <span className="mr-1">
                    by <span className="">{story.by}</span>
                    </span>
                    <span className="mr-1">
                    <span className="">{getTimeAgo(story.time)}</span> 
                    </span>
                    <span>|</span>
                    <span className="mx-1">
                    hide 
                    </span>
                    <span className="mr-1">|</span>
                    <span className="mx-1">
                    past 
                    </span>
                    <span className="mr-1">|</span>
                    <span className="mx-1">
                    discuss 
                    </span>
                    {story.descendants != 0 && (
                        <>
                            <span className="mr-1">|</span>
                            <span>
                                <span className="">{story.descendants || 0}</span> comments
                            </span>
                        </>
                    )}
                </div>
              {/* {story.url && (
                <p className="text-gray-500 text-xs sm:text-sm mt-2 truncate">
                  URL: <a href={story.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{story.url}</a>
                </p>
              )} */}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;