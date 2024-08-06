import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogPost } from '../types';
import { addPost, updatePost } from '../utils/LocalStorageUtils';

interface BlogPostFormProps {
    isEditing?: boolean;
    initialData?: BlogPost;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ isEditing = false, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [image, setImage] = useState(initialData?.imgUrl || '');
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const post: BlogPost = {
            id: isEditing ? parseInt(id!, 10) : Number(Date.now()),
            title,
            content,
            createdAt: initialData?.createdAt || new Date().toISOString(),
            imgUrl: '',
            excerpt: undefined
        };

        if (isEditing) {
            updatePost(post);
        } else {
            addPost(post);
        }

        navigate(`/post/${post.id}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Image URL</label>
                <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default BlogPostForm;
