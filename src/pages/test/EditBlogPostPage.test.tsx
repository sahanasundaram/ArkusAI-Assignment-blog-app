// EditBlogPostPage.test.tsx

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EditBlogPostPage from '../EditBlogPostPage';
import { getPostById, updatePost } from '../../utils/LocalStorageUtils';
import { BlogPost } from '../../types';

// Mock the utility functions
jest.mock('../../utils/LocalStorageUtils', () => ({
    getPostById: jest.fn(),
    updatePost: jest.fn(),
}));

// Mock the BlogPostForm component
jest.mock('../../components/BlogPostForm', () => {
    return ({ initialData, onSubmit }: { initialData: BlogPost; onSubmit: (post: BlogPost) => void }) => (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...initialData, title: 'Updated Title' }); }}>
            <input type="text" defaultValue={initialData.title} />
            <button type="submit">Submit</button>
        </form>
    );
});

describe('EditBlogPostPage', () => {
    const mockPost: BlogPost = {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post content.',
        excerpt: undefined,
        imgUrl: '',
        createdAt: ''
    };

    it('should render the loading state initially', () => {
        (getPostById as jest.Mock).mockReturnValue(null);
        
        render(
            <MemoryRouter initialEntries={['/edit/1']}>
                <Routes>
                    <Route path="/edit/:id" element={<EditBlogPostPage />} />
                </Routes>
            </MemoryRouter>
        );
        
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('should fetch and display the post data', async () => {
        (getPostById as jest.Mock).mockReturnValue(mockPost);

        render(
            <MemoryRouter initialEntries={['/edit/1']}>
                <Routes>
                    <Route path="/edit/:id" element={<EditBlogPostPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Edit Blog Post/i)).toBeInTheDocument();
        });
    });
});
