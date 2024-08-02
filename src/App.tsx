
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import NewBlogPostPage from './pages/NewBlogPostPage';
import EditBlogPostPage from './pages/EditBlogPostPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BlogPostList />} />
                <Route path="/post/:id" element={<BlogPostDetailPage />} />
                <Route path="/new-post" element={<NewBlogPostPage />} />
                <Route path="/edit-post/:id" element={<EditBlogPostPage />} />
            </Routes>
        </Router>
    );
};

export default App;

