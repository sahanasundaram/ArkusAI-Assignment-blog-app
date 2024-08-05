import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../utils/LocalStorageUtils';
import { BlogPost } from '../types';

const BlogPostList: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchedPosts = getPosts();
        setPosts(fetchedPosts);
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <div>
                {posts.map(post => (
                    <div key={post.id}>
                        <h2>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h2>
                        <p>{post.content.substring(0, 100)}...</p>
                        {post.imgUrl && <img src={post.imgUrl} alt={post.title} />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPostList;