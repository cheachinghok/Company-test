import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Footer from './Footer';

interface StoriesProps {
  stories: any[];
  type: string;
}

const App = ({ stories, type }: StoriesProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (stories.length === 0) return;

        setLoading(false);

    }, [stories]);
    const getTimeAgo = (timestamp:any) => {
        const now = Date.now();
        const time = timestamp * 1000; 
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
    <div>
        <ul className="bg-[#e8e8e8]">
          {stories.map((story, index) => (
            <li
            key={story.id}
            className="px-4 py-3 hover:bg-gray-50 transition-colors"
            >
            <div className="flex items-start space-x-3">
                <span className="text-gray-400 text-sm">{index + 1}.</span>
                <span className="text-orange-500 text-xs mt-0.5">&#9650;</span>

                <div className="flex flex-col">
                    <div>
                        {/* Title */}
                        <a
                            href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base font-medium text-gray-900 hover:text-blue-600 transition mr-2"
                        >
                            <span className='text-black'>{story.title}</span>
                        </a>

                        {/* Source */}
                        {story.url && (
                            <a
                            href={story.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 hover:underline truncate"
                            >
                            ({new URL(story.url).hostname.replace(/^www\./, '')})
                            </a>
                        )}
                    </div>
                {/* Story info */}
                <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-2">
                    {type === 'job' ? (
                    <span>{getTimeAgo(story.time)}</span>
                    ) : (
                    <>
                        <span>{story.score} points</span>
                        <span>
                        by
                        <Link to={`/user/${story.by}`} ><span className="hover:underline ml-1">{story.by}</span></Link>
                        </span>
                        <Link to={`/story/${story.id}`} ><span className="hover:underline">{getTimeAgo(story.time)}</span></Link>
                        <span className="text-gray-400">|</span>

                        <Link to="/submit" ><span className="hover:underline">hide</span></Link>
                        {story.descendants > 0 && (
                            <>
                                <span className="text-gray-400">|</span>
                                <Link to={`/story/${story.id}`} ><span className="hover:underline">{story.descendants} comments</span></Link>
                            </>
                        )}
                    </>
                    )}
                </div>
                </div>
            </div>
            </li>
          ))}
        </ul>
         
      {/* Loading and Error Messages */}
      {loading && (
        <div className="text-center text-gray-600 text-xl font-semibold mt-8">
          Loading stories...
        </div>
      )}
      <div className="container">
          <Footer />
        </div>
    </div>
  );
}
export default App;