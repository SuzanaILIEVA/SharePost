import React, { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction, updatePostAction } from "../redux/actions/post";
import { toast } from "react-toastify";

const Modal = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    user: "",
    title: "",
    description: "",
  });

  const posts = useSelector((state) => state.posts); // Tüm gönderileri Redux store'dan al
  console.log("POSTS ALL ==>", posts);
  const { modal } = useSelector((state) => state.modal);
  console.log("MODAL=>>", modal);

  // Güncellenmek istenen post'u bul ve inputlara yükle
  useEffect(() => {
    if (modal?.updateId) {
      const postToUpdate = Object.values(posts).find(
        (post) => post._id === modal.updateId
      );
      if (postToUpdate) {
        setPostData({
          user: postToUpdate.user || "",
          title: postToUpdate.title || "",
          description: postToUpdate.description || "",
        });
      }
    } else {
      setPostData({ user: "", title: "", description: "" }); // Yeni post için boş alanlar
    }
  }, [modal?.updateId, posts]);

  const onChangeFunc = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const postCreate = () => {
    if (modal?.updateId) {
      dispatch(updatePostAction(modal?.updateId, postData));
      toast("Post updated successfully", {
        position: "top-right",
        autoClose: 5000,
      });
    } else {
      dispatch(createPostAction(postData));
      toast("Post created successfully", {
        position: "top-right",
        autoClose: 5000,
      });
    }

    dispatch({ type: "MODAL", payload: false });
  };

  return (
    <div className="w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
      <div className="bg-white w-1/3 p-2 rounded-md">
        <div
          onClick={() => dispatch({ type: "MODAL", payload: false })}
          className="flex flex-row items-center justify-between cursor-pointer"
        >
          <h1 className="font-bold text-xl">
            {modal?.updateId ? "UPDATE POST" : "SHARE POST"}
          </h1>
          <FaRegWindowClose size={25} />
        </div>
        <div className="my-4 flex flex-col space-y-3">
          <input
            type="text"
            placeholder="User"
            className="input-style"
            value={postData.user}
            name="user"
            onChange={onChangeFunc}
          />
          <input
            type="text"
            placeholder="Title"
            className="input-style"
            value={postData.title}
            name="title"
            onChange={onChangeFunc}
          />
          <input
            type="text"
            placeholder="Description"
            className="input-style"
            value={postData.description}
            name="description"
            onChange={onChangeFunc}
          />
        </div>
        <div
          onClick={postCreate}
          className="w-full p-2 text-center bg-indigo-600 text-white cursor-pointer rounded-sm hover:bg-indigo-800"
        >
          {modal?.updateId ? "UPDATE" : "SHARE"}
        </div>
      </div>
    </div>
  );
};

export default Modal;
