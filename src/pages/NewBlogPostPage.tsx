import React from 'react';
import BlogPostForm from '../components/BlogPostForm';

const NewBlogPostPage: React.FC = () => {
    return (
        <div className="container">
            <h1>Create New Blog Post</h1>
            <BlogPostForm />
        </div>
    );
};

export default NewBlogPostPage;
