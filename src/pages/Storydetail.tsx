import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BodyDetail from '../components/BodyDetail';

// Main App component
const App = () => {
    const { id } = useParams();
  const [stories, setStories] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);   // State to hold full story data
  // Effect to fetch details for each story ID
  useEffect(() => {
    const fetchStoryDetails = async () => {
      // Use Promise.all to fetch all story details concurrently
      try {
          const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for item ${id}`);
          }
          const story = await response.json();
          setStories([story].filter(story => story && !story.deleted && !story.dead)); // Filter out null/deleted/dead stories
      } catch (e) {
        console.error("Error fetching story details:", e);
      } finally {
        // setLoading(false);
      }
    };
    fetchStoryDetails();
  }, [id]); // Re-run when id changes
    useEffect(() => {
    const fetchStoryDetails = async () => {
        console.log("stories[0]?.kids", stories[0]?.kids);
      if (!stories[0]?.kids || stories[0].kids.length === 0) return; // Don't fetch if no IDs
      // Use Promise.all to fetch all story details concurrently
      try {
        const storyPromises = stories[0]?.kids.map(async (id: number) => {
          const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for item ${id}`);
          }
          return response.json();
        });

        // Wait for all promises to resolve
        const results = await Promise.all(storyPromises);
        console.log("results", results);
        setComments(results.filter(story => story && !story.deleted && !story.dead)); // Filter out null/deleted/dead stories
      } catch (e) {
        console.error("Error fetching story details:", e);
      } finally {
      }
    };

    fetchStoryDetails();
  }, [stories]);
  return (
    <div className="w-screen font-inter flex flex-col items-center min-h-screen">
      <main className="container">
        <BodyDetail stories={stories} type={''} comments={comments} />
      </main>
    </div>
  );
};

export default App;