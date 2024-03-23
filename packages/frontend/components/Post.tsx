import React, { useState } from 'react';

interface PostProps {
  photoUrl: string;
  userAddress: string;
  likeCount: number;
  onLike: (likeAmount: number) => void;
}

const Post: React.FC<PostProps> = ({ photoUrl, userAddress, likeCount, onLike }) => {
  const [likeAmount, setLikeAmount] = useState<number>(1);

  const handleLike = (e: React.FormEvent) => {
    e.preventDefault();
    onLike(likeAmount);
  };

  return (
    <div>
      <img src={photoUrl} alt="Post" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      <div>
        <p>User Address: {userAddress}</p>
        <form onSubmit={handleLike}>
          <label htmlFor="likeAmount">Number of Likes:</label>
          <input
            type="number"
            id="likeAmount"
            value={likeAmount}
            onChange={(e) => setLikeAmount(parseInt(e.target.value))}
            min={1}
          />
          <button type="submit">Like</button>
        </form>
        <span>{likeCount} Likes</span>
      </div>
    </div>
  );
};

export default Post;
