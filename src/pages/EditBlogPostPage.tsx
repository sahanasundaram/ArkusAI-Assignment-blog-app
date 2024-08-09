import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPostForm from '../components/BlogPostForm';
import { BlogPost } from '../types';
import { getPostById, updatePost } from '../utils/LocalStorageUtils';
import './EditBlogPostPage.css'; // Import the CSS file

type RouteParams = {
    id?: string;
};

const EditBlogPostPage: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const postId = parseInt(id, 10);
            const existingPost = getPostById(postId);
            if (existingPost) {
                setPost(existingPost);
            } else {
                console.error(`Post with ID ${id} not found.`);
            }
        }
    }, [id]);

    const handleUpdatePost = (updatedPost: BlogPost) => {
        updatePost(updatedPost);
        navigate(`/post/${updatedPost.id}`); // Redirect to the updated post page
    };

    if (!post) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Edit Blog Post</h1>
            <BlogPostForm initialData={post} isEditing onSubmit={handleUpdatePost} />
        </div>
    );
};

export default EditBlogPostPage;
