import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Footer from './Footer';

interface StoriesProps {
  stories: any[];
  comments: any[];
  type: string;
}

const App = ({ stories, type, comments }: StoriesProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (stories.length === 0 || comments.length === 0) return;
        // console.log("stories", stories);
        console.log("comments", comments);
        setLoading(false);

    }, [stories, comments]);
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
                        by <span className="font-medium">{story.by}</span>
                        </span>
                        <Link to={`/story/${story.id}`} ><span className="hover:underline">{getTimeAgo(story.time)}</span></Link>
                        <span className="text-gray-400">|</span>

                        <Link to="/submit" ><span className="hover:underline">hide</span></Link>
                        {story.descendants > 0 && (
                            <>
                                <span className="text-gray-400">|</span>
                                <span className="hover:underline text-xs">
                                    {story.descendants} comments
                                </span>
                            </>
                        )}
                    </>
                    )}
                </div>
                </div>
            </div>
            </li>
          ))}
          <div className="w-full max-w-md ml-10 p-4">
            <textarea
                placeholder="Enter your message..."
                className="w-full bg-white p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
            />
            <button
                className="mt-3 bg-blue-600 text-white rounded"
            >
                Add comments
            </button>
            </div>
        {/* <ul className="bg-[#e8e8e8]"> */}
          {comments.map((story, index) => (
            <li key={index} className="px-1 py-2 duration-200">
                <div >  
                  <div className="text-xs text-gray-600 flex flex-wrap items-center gap-1">
                    <span className="text-sm text-gray-500">&#9650; </span>
                    <span className="font-semibold text-gray-800">{story.by}</span>
                    <span>·</span>
                    <span>{getTimeAgo(story.time)}</span>
                  </div>
                  <div className='w-8xl text-black prose break-words pl-4'>
                      Comment: <span dangerouslySetInnerHTML={{ __html: story.text }} />
                  </div>
                </div>
            </li>
          ))}
        </ul>
         <div className="container">
          <Footer />
        </div>
      {/* Loading and Error Messages */}
      {loading && (
        <div className="text-center text-gray-600 text-xl font-semibold mt-8">
          Loading stories...
        </div>
      )}
    </div>
  );
}
export default App;