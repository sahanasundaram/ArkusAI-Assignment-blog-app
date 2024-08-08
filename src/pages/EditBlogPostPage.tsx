import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPostForm from '../components/BlogPostForm';
import { BlogPost } from '../types';
import { getPostById, updatePost } from '../utils/LocalStorageUtils';

type RouteParams = {
    id?: string; // The id parameter is optional
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
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Edit Blog Post</h1>
            <BlogPostForm initialData={post} isEditing onSubmit={handleUpdatePost} />
        </div>
    );
};

export default EditBlogPostPage;

