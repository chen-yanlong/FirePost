import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import styles from '../styles/Home.module.css';

interface PostData {
  id: number;
  photoUrl: string;
  userAddress: string;
  likeCount: number;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    // Fetch posts data from backend API
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/posts`);

        if (response.ok) {
          const res = await response.json();
          // re-config the data here
          const postData: PostData[] = res.map((post: any) => ({
            id: post.id,
            photoUrl: post.photo_url,
            userAddress: post.user_address,
            likeCount: post.likeNum,
          }));
          setPosts(postData);
        } else {
          console.error('Failed to fetch posts data');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId: number, likeAmount: number) => {
    // Send like data to backend API
    try {
      const response = await fetch(`/api/like/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likeAmount }),
      });
      if (response.ok) {
        // Update like count in local state
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likeCount: post.likeCount + likeAmount } : post
          )
        );
      } else {
        console.error('Failed to like post');
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.title}>Posts</h1>
        {posts.map((post) => {
          return <Post
            key={post.id}
            photoUrl={post.photoUrl}
            userAddress={post.userAddress}
            likeCount={post.likeCount}
            onLike={(likeAmount) => handleLike(post.id, likeAmount)}
          />
        })}
      </div>
    </main>
    
  );
};

export default Posts;
