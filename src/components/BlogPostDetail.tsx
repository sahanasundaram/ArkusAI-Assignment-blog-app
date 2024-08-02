import React from 'react';
import { BlogPost } from '../types';
import { Link } from 'react-router-dom';

interface BlogPostDetailProps {
    post: BlogPost | null;
    onDelete: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onDelete }) => {
    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="blog-post-detail">
            <h1>{post.title}</h1>
            {post.image && <img src={post.image} alt={post.title} />}
            <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            <p>
                <small>Created on: {new Date(post.createdAt).toLocaleDateString()}</small>
            </p>
            <div className="actions">
                <Link to={`/edit-post/${post.id}`}>
                    <button>Edit Post</button>
                </Link>
                <button onClick={onDelete}>Delete Post</button>
            </div>
        </div>
    );
};

export default BlogPostDetail;
