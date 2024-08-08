import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { getPostById, deletePost } from '../utils/LocalStorageUtils';

type RouteParams = {
    id?: string;
};

const BlogPostDetailPage: React.FC = () => {
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
                navigate('/'); // Navigate back to home or a 404 page
            }
        }
    }, [id, navigate]);

    const handleEdit = () => {
        if (id) {
            navigate(`/edit/${id}`);
        }
    };

    const handleDelete = () => {
        if (id && window.confirm('Are you sure you want to delete this post?')) {
            deletePost(parseInt(id, 10));
            navigate('/'); // Redirect to home page after deletion
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-detail-container">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.imgUrl && <img src={post.imgUrl} alt={post.title} />}
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            <p>Created at: {new Date(post.createdAt).toLocaleDateString()}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</button>
        </div>
    );
};

export default BlogPostDetailPage;
