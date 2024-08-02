import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BlogPost } from '../types';

const BlogPostList: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        axios.get('/api/posts').then(response => {
            setPosts(response.data);
        });
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    // Ensure the pagination numbers are generated as an array of numbers
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginationNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="container">
            <h1>Blog Posts</h1>
            <input
                type="text"
                placeholder="Search by title..."
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="blog-post-list">
                {paginatedPosts.map(post => (
                    <div key={post.id} className="blog-post">
                        <h2>{post.title}</h2>
                        {post.image && <img src={post.image} alt={post.title} />}
                        <p>{post.content.substring(0, 100)}...</p>
                        <Link to={`/post/${post.id}`}>Read More</Link>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {paginationNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BlogPostList;

