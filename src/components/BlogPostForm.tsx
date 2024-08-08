import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BlogPost } from '../types';

interface BlogPostFormProps {
    initialData?: BlogPost;
    isEditing?: boolean;
    onSubmit?: (data: BlogPost) => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ initialData, isEditing, onSubmit }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [imgUrl, setImgUrl] = useState(initialData?.imgUrl || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (onSubmit) {
            const postToSubmit: BlogPost = {
                id: initialData?.id || 0,
                title,
                content,
                imgUrl,
                createdAt: initialData?.createdAt || new Date().toISOString(),
                excerpt: initialData?.excerpt, // Use the existing excerpt or leave it undefined
            };
    
            onSubmit(postToSubmit);
        }
    };
    return (
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
                value={content}
                onChange={(e)=>setContent(e.currentTarget.value)}
            />

            <label htmlFor="imgUrl">Image URL (optional):</label>
            <input
                id="imgUrl"
                type="text"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
            />

            <button type="submit" className="submit-button">
                {isEditing ? 'Update' : 'Create'}
            </button>
        </form>
    );
};

export default BlogPostForm;
