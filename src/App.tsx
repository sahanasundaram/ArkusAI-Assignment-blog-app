// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import { seedData } from './utils/SeedData';
import { getPostById } from './utils/LocalStorageUtils';
import NewBlogPost from './pages/NewBlogPostPage';
import EditBlogPostPage from './pages/EditBlogPostPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';

const App: React.FC = () => {
    seedData(); // Seed the initial data

    return (
        <Router>
            <Routes>
                <Route path="/" element={<BlogPostList />} />
                <Route path="/post/:id" element={<PostWrapper />} />
                <Route path="/new" element={<NewBlogPost />} />
                <Route path="/edit/:id" element={<EditPostWrapper />} />
            </Routes>
        </Router>
    );
};

// A wrapper component to handle fetching post by ID
const PostWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = id ? getPostById(parseInt(id, 10)) : null;
    return <BlogPostDetailPage/>;
};

// A wrapper component to handle fetching post by ID for editing
const EditPostWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = id ? getPostById(parseInt(id, 10)) : null;
    return <EditBlogPostPage/>
};

export default App;
