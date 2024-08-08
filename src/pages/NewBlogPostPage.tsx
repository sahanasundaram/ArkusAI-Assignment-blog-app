import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './NewBlogPost.css'; // Import the CSS file for styling
import { BlogPost } from '../types';
import { addPost, getPosts } from '../utils/LocalStorageUtils';

const NewBlogPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form inputs
        if (!title.trim()) {
            alert('Title is required.');
            return;
        }
        if (!content.trim()) {
            alert('Content is required.');
            return;
        }

        // Generate a unique ID for the new post
        const posts = getPosts();
        const newId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;

        const newPost: BlogPost = {
            id: newId,
            title,
            content,
            imgUrl,
            createdAt: new Date().toISOString(),
            excerpt: null
        };

        addPost(newPost);
        navigate(`/post/${newPost.id}`);
    };

    return (
        <div className="form-container">
            <h1>Create New Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="content">Content:</label>
                <input
                    id="content"
                    type="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <label htmlFor="imgUrl">Image URL (optional):</label>
                <input
                    id="imgUrl"
                    type="text"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                />

                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default NewBlogPost;
