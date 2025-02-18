import React from "react";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deletePostAction } from "../redux/actions/post";
import { toast } from "react-toastify";

const HomeCard = ({ post }) => {
  const dispatch = useDispatch();
  const deletePost = (id) => {
    dispatch(deletePostAction(id));
    // window.location.reload();
    toast("Post deleted successfully", {
      position: "top-right",
      autoClose: 5000,
    });
  };
  const updatePost = (id) => {
    dispatch({ type: "MODAL", payload: { open: true, updateId: id } });
  };
  return (
    <div className="relative w-1/4 border p-3 rounded-md bg-gray-50 m-3">
      <div className="font-bold text-xl">{post?.title}</div>
      <div className=" text-sm text-gray-700">{post?.description}</div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-gray-500">{post?.user}</span>
        <span className="text-xs text-gray-500">
          {post?.date?.substring(0, 10)}
        </span>
      </div>

      <div className="absolute -top-3 -right-3 flex items-center space-x-3">
        <MdDelete
          onClick={() => deletePost(post?._id)}
          size={20}
          color="white"
          className="bg-red-600 rounded-full p-0.5 cursor-pointer"
        />
        <GrUpdate
          onClick={() => updatePost(post?._id)}
          size={20}
          color="white"
          className="bg-blue-600 rounded-full p-0.5 cursor-pointer "
        />
      </div>
    </div>
  );
};

export default HomeCard;
