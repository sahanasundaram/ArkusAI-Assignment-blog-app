// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetail from './components/BlogPostDetail';
import BlogPostForm from './components/BlogPostForm';
import { seedData } from './utils/SeedData';
import { getPostById } from './utils/LocalStorageUtils';
import NewBlogPost from './pages/NewBlogPostPage';

const App: React.FC = () => {
    seedData(); // Seed the initial data

    return (
        <Router>
            <Routes>
                <Route path="/" element={<BlogPostList />} />
                <Route path="/post/:id" element={<PostWrapper />} />
                <Route path="/create" element={<BlogPostForm />} />
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
    return <BlogPostDetail post={post || null} />;
};

// A wrapper component to handle fetching post by ID for editing
const EditPostWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = id ? getPostById(parseInt(id, 10)) : null;
    return <BlogPostForm isEditing={true} initialData={post || undefined} />;
};

export default App;
