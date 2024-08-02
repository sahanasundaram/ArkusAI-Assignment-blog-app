import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { BlogPost } from '../types';

interface BlogPostFormProps {
    initialData?: BlogPost;
    isEditing?: boolean;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData, isEditing }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [image, setImage] = useState(initialData?.image || '');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const postData = { title, content, image };

        if (isEditing && initialData) {
            axios.put(`/api/posts/${initialData.id}`, postData).then(() => {
                navigate(`/post/${initialData.id}`); // Navigate to the updated post's detail page
            });
        } else {
            axios.post('/api/posts', postData).then(response => {
                navigate(`/post/${response.data.id}`); // Navigate to the new post's detail page
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <label htmlFor="content">Content:</label>
            <ReactQuill value={content} onChange={setContent} />
            <label htmlFor="image">Image URL:</label>
            <input
                type="text"
                id="image"
                value={image}
                onChange={e => setImage(e.target.value)}
            />
            <button type="submit">{isEditing ? 'Save Changes' : 'Create Post'}</button>
        </form>
    );
};

export default BlogPostForm;
