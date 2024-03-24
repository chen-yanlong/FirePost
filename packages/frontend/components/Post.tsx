import React, { useState } from 'react';
import styles from '../styles/Post.module.css';
import { useEnsName } from 'wagmi';

interface PostProps {
  photoUrl: string;
  userAddress: string;
  likeCount: number;
  onLike: (likeAmount: number) => void;
}

const Post: React.FC<PostProps> = ({ photoUrl, userAddress, likeCount, onLike }) => {
  const [likeAmount, setLikeAmount] = useState<number>(0);
  
  const sliceAddress = userAddress.slice(0, 6) + '...' + userAddress.slice(-4);

  const handleLike = (e: React.FormEvent) => {
    e.preventDefault();
    onLike(likeAmount);
  };

  return (
    <div className="container max-w-screen-md bg-white mt-6 rounded-2xl p-4">
        <div className="flex items-center justify-between">
            <div className="gap-3.5 flex items-center ">
                <img src="https://images.unsplash.com/photo-1617077644557-64be144aa306?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" className="object-cover bg-yellow-500 rounded-full w-10 h-10" />
                <div className="flex flex-col">
                    <b className="mb-2 capitalize">User: {sliceAddress}</b>
                </div>
            </div>
        </div>

        <div className="mt-5 flex gap-2  justify-center pb-4 flex-wrap p-2">
            <img src={photoUrl} className="bg-red-500 rounded-2xl w-1/3 object-cover h-96 flex-auto" alt="photo"></img>
        </div>

            <div className=" h-20 flex items-center justify-around border-b">
                <div className="flex items-center gap-3">
                    <button className='text-white hover:border-rose-600 hover:border hover:border-solid font-bold py-2 px-2 rounded-full' >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                    <div className="text-sm">{ likeCount } Likes</div>
                </div>
            </div>
    </div>

    // <div classNameName={styles.post}>
    //   <img src={photoUrl} alt="Post" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    //   <div>
    //     <p>User Address: {userAddress}</p>
    //     <form onSubmit={handleLike}>
    //       <label htmlFor="likeAmount">Number of Likes:</label>
    //       <input
    //         type="number"
    //         id="likeAmount"
    //         value={likeAmount}
    //         onChange={(e) => setLikeAmount(parseInt(e.target.value))}
    //         min={1}
    //       />
    //       <button type="submit">Like</button>
    //     </form>
    //     <span>{likeCount} Likes</span>
    //   </div>
    // </div>
  );
};

export default Post;
