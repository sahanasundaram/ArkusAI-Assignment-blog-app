import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogPostForm from '../components/BlogPostForm';
import { BlogPost } from '../types';

type RouteParams = {
    id?: string; // The id parameter is optional
};

const EditBlogPostPage: React.FC = () => {
    const { id } = useParams<RouteParams>(); // Use RouteParams for useParams
    const [post, setPost] = useState<BlogPost | null>(null);
    const navigate = useNavigate(); // Use useNavigate for navigation

    useEffect(() => {
        if (id) {
            axios.get(`/api/posts/${id}`).then(response => {
                setPost(response.data);
            });
        }
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Edit Blog Post</h1>
            <BlogPostForm initialData={post} isEditing />
        </div>
    );
};

export default EditBlogPostPage;

