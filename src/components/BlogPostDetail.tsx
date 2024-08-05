import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogPost } from '../types';
import { deletePost, getPostById } from '../utils/LocalStorageUtils';

interface BlogPostDetailProps {
    post: BlogPost | null;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post }) => {
    const navigate = useNavigate();

    if (!post) {
        return <div>Post not found</div>;
    }

    const handleDelete = () => {
        deletePost(post.id);
        navigate('/');
    };

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.imgUrl && <img src={post.imgUrl} alt={post.title} />}
            <p>Created at: {new Date(post.createdAt).toLocaleDateString()}</p>
            <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default BlogPostDetail;