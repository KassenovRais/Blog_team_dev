import React from "react";
import Typography from "@mui/material/Typography";
import NewPostForm from "@/components/NewPostForm/NewPostForm";
import { useNavigate } from 'react-router-dom';
import { usePostNewPostMutation } from "@/store/services/post";

const NewPost = () => {
    const navigate = useNavigate();
    const [postNewPost] = usePostNewPostMutation();

    const onNewsFormSubmit = async (post: FormData) => {
        const data = await postNewPost(post);
        if (!(data as { error: object }).error) {
            navigate('/');
        }
    };

    return (
        <>
            <NewPostForm onSubmit={onNewsFormSubmit} />
        </>
    );
};

export default NewPost;