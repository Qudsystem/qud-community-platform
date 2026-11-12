import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface PostListProps {
  posts: Post[];
  onLike: (postId: number) => void;
  onEdit: (post: Post) => void;
  onDelete: (postId: number) => void;
  likedPosts: number[];
}

export function PostList({ posts, onLike, onEdit, onDelete, likedPosts }: PostListProps) {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const handleExpand = (postId: number) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm text-gray-500">By {post.author}</p>
              <p className={`mt-2 ${expandedPost === post.id ? '' : 'line-clamp-2'}`}>
                {post.content}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onLike(post.id)}
              >
                {likedPosts.includes(post.id) ? '❤️' : '🤍'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(post)}
              >
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => handleExpand(post.id)}
          >
            {expandedPost === post.id ? 'Show less' : 'Read more'}
          </Button>
        </Card>
      ))}
    </div>
  );
}