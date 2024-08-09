

import {
    getPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost
} from '../LocalStorageUtils';
import { BlogPost } from '../types';

// Mock localStorage
beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
    // Reset localStorage to an empty state before each test
    localStorage.clear();
});

describe('LocalStorageUtils', () => {
    const mockPosts: BlogPost[] = [
        { id: 1, title: 'First Post', content: 'Content of the first post',imgUrl: '',
        createdAt: '',
        excerpt: '' },
        { id: 2, title: 'Second Post', content: 'Content of the second post',imgUrl: '',
        createdAt: '',
        excerpt: '' }
    ];

    it('should get all posts', () => {
        localStorage.setItem('posts', JSON.stringify(mockPosts));
        const posts = getPosts();
        expect(posts).toEqual(mockPosts);
    });

    it('should return a post by ID', () => {
        localStorage.setItem('posts', JSON.stringify(mockPosts));
        const post = getPostById(1);
        expect(post).toEqual(mockPosts[0]);
    });

    it('should return undefined if post by ID is not found', () => {
        localStorage.setItem('posts', JSON.stringify(mockPosts));
        const post = getPostById(3);
        expect(post).toBeUndefined();
    });

    it('should add a new post', () => {
        const newPost: BlogPost = {
            id: 3, title: 'Third Post', content: 'Content of the third post',
            imgUrl: '',
            createdAt: '',
            excerpt: ''
        };
        localStorage.setItem('posts', JSON.stringify(mockPosts));
        addPost(newPost);
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        expect(posts).toHaveLength(3);
        expect(posts).toContainEqual(newPost);
    });

    it('should update an existing post', () => {
        const updatedPost: BlogPost = {
            id: 1, title: 'Updated First Post', content: 'Updated content',
            imgUrl: '',
            createdAt: '',
            excerpt: ''
        };
        localStorage.setItem('posts', JSON.stringify(mockPosts));
        updatePost(updatedPost);
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        expect(posts).toContainEqual(updatedPost);
    });

    it('should delete a post by ID', () => {
        localStorage.setItem('posts', JSON.stringify(mockPosts));
        deletePost(1);
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        expect(posts).toHaveLength(1);
        expect(posts).not.toContainEqual(mockPosts[0]);
    });
});
