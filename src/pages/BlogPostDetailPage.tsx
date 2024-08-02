import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogPostForm from '../components/BlogPostForm';
import { BlogPost } from '../types';


type RouteParams = Record<string, string | undefined>;

const EditBlogPostPage: React.FC = () => {
    const { id } = useParams<RouteParams>(); 
    const [post, setPost] = useState<BlogPost | null>(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        axios.get(`/api/posts/${id}`).then(response => {
            setPost(response.data);
        });
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
