import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { getPosts } from '../utils/LocalStorageUtils';
import './BlogPostList.css';

const POSTS_PER_PAGE = 5;

const BlogPostList: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const allPosts = getPosts();
        setPosts(allPosts);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    return (
        <div className="blog-list-container">
            <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={handleSearch}
                className="search-bar"
            />
            <div className="post-list">
                {currentPosts.map(post => (
                    <div key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)}>
                        <h2>{post.title}</h2>
                        <p>{post.excerpt}</p>
                        {post.imgUrl && <img src={post.imgUrl} alt={post.title} />}
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        disabled={currentPage === index + 1}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BlogPostList;
