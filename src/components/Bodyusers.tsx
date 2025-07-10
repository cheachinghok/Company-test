import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import Footer from './Footer';

interface StoriesProps {
  users: any[];
}

const App = ({ users }: StoriesProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (users.length === 0) return;

        setLoading(false);

    }, [users]);
    const formatUnixTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
    return date.toLocaleDateString('en-US', options);
    };
    return (
    <div>
        <ul className="bg-[#e8e8e8]">
            {users.map((user, idx) => (
                <li 
                    key={idx}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-start space-x-3">
                        <div className="flex flex-col">
                            <div className='text-black text-sm'>
                               <p>users : <span>{user.id}</span></p>
                               <p>created : <span>{formatUnixTimestamp(user.created)}</span></p>
                               <p>karma : <span>{user.karma}</span></p>
                               <p>about :</p>
                               <div className='ml-14 mt-3'>
                                    <p className='text-black underline'> submission</p>
                                    <p className='text-black underline'>{user.submission}</p>
                                    <p className='text-black underline'> comments</p>
                                    <p className='text-black underline'> favorites</p>
                               </div>
                               
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
    </div>
  );
}
export default App;