// utils/localStorageUtils.ts

import { BlogPost } from '../types';

export const getPosts = (): BlogPost[] => {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
};

export const getPostById = (id: number): BlogPost | undefined => {
    const posts = getPosts();
    return posts.find(post => post.id === id);
};

export const addPost = (post: BlogPost) => {
    const posts = getPosts();
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
};

export const updatePost = (updatedPost: BlogPost) => {
    const posts = getPosts();
    const index = posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
        posts[index] = updatedPost;
        localStorage.setItem('posts', JSON.stringify(posts));
    }
};
export const deletePost = (id: number) => {
    const posts = getPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(filteredPosts));
};
