"use client";
import { Heart } from "lucide-react";
import { useState } from "react";

interface LikeButtonProps {
  setLike: () => Promise<boolean>;
  liked: boolean;
}

// For some f**** reason TS complains about setLike being unserializable
// when the component is in a function form, but weirdly works in arrow function form
const LikeButton = ({ setLike, liked }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(liked);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation when clicking the heart
    const like = await setLike();
    setIsLiked(like);
  };

  return (
    <button
      onClick={handleLikeClick}
      className="btn btn-circle btn-sm hover:bg-pink-50"
    >
      <Heart
        className={`w-5 h-5 transition-colors ${
          isLiked ? "fill-red-500 stroke-red-500" : "stroke-gray-500"
        }`}
      />
    </button>
  );
};

export default LikeButton;
