import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlogPost } from '../types';
import { getPosts } from '../utils/LocalStorageUtils';
import './BlogPostList.css'; // Import the CSS file for styling

const PAGE_SIZE = 10; // Number of posts per page

const BlogPostList: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const observer = useRef<IntersectionObserver | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    const fetchPosts = async () => {
        setLoading(true);

        // Simulate fetching posts from local storage or an API
        const allPosts = getPosts();
        const offset = (currentPage - 1) * PAGE_SIZE;
        const newPosts = allPosts.slice(offset, offset + PAGE_SIZE);

        if (newPosts.length < PAGE_SIZE) {
            setHasMore(false);
        }

        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setLoading(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
        setCurrentPage(1);
        setPosts([]);
        setHasMore(true);
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const lastPostRef = (node: HTMLLIElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        });
        
        if (node) observer.current.observe(node);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="blog-post-list-container">
            <h1 className="page-title">Blog Post List</h1>
            
            {/* Search bar and create post button */}
            <div className="search-and-create-container">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button onClick={() => navigate('/new')} className="create-post-button">
                    Create New Blog Post
                </button>
            </div>

            {/* List of blog posts */}
            <ul className="blog-post-list">
                {filteredPosts.map((post, index) => (
                    <li
                        key={post.id}
                        ref={index === filteredPosts.length - 1 ? lastPostRef : null}
                        className="blog-post-item"
                    >
                        <Link to={`/post/${post.id}`} className="blog-post-link">
                            <h2 className="blog-post-title">{post.title}</h2>
                            {post.imgUrl && <img src={post.imgUrl} alt={post.title} className="blog-post-img" />}
                            <p className="blog-post-excerpt">{post.content.slice(0, 100)}...</p>
                        </Link>
                    </li>
                ))}
            </ul>

            {loading && <p className="loading">Loading...</p>}
            {!hasMore && <p className="no-more-posts">No more posts</p>}
        </div>
    );
};

export default BlogPostList;

