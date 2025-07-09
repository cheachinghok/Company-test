import { useEffect, useState } from 'react';

const fetchItemById = async (id: number) => {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return res.json();
};

interface CommentsWithParentsProps {
  commentIds: number[];
}

export default function CommentsWithParents({ commentIds }: CommentsWithParentsProps) {
  const [items, setItems] = useState<{ parent: any; comment: any }[]>([]);

  useEffect(() => {
    async function loadAllCommentsAndParents() {
      const results = [];

      for (const commentId of commentIds) {
        try {
          // Step 1: fetch comment
          const comment = await fetchItemById(commentId);
          if (!comment) continue;

          // Step 2: fetch parent of comment
          const parent = comment.parent ? await fetchItemById(comment.parent) : null;

          results.push({ parent, comment });
        } catch (err) {
          console.error('Failed to fetch comment or parent:', err);
        }
      }

      setItems(results);
    }

    loadAllCommentsAndParents();
  }, [commentIds]);

  return (
    <div className="space-y-4">
      {items.map(({ parent, comment }) => (
        <div key={comment.id} className="border p-4 rounded">
          <h3 className="font-bold text-gray-700">Parent (ID: {parent?.id || 'Unknown'})</h3>
          <p dangerouslySetInnerHTML={{ __html: parent?.text || '<em>No parent content</em>' }} />

          <h4 className="mt-2 font-semibold text-gray-900">Comment</h4>
          <p className='text-black' dangerouslySetInnerHTML={{ __html: comment.text }} />
        </div>
      ))}
    </div>
  );
}
