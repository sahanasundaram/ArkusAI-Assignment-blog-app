import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogPostDetailPage from '../BlogPostDetailPage';
import { getPostById, deletePost } from '../../utils/LocalStorageUtils';
import { BlogPost } from '../../types';

// Mocking the LocalStorageUtils functions
jest.mock('../../utils/LocalStorageUtils', () => ({
    getPostById: jest.fn(),
    deletePost: jest.fn(),
}));

const mockNavigate = jest.fn();

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const post: BlogPost = {
    id: 1,
    title: 'Test Post',
    content: '<p>This is a test post</p>',
    createdAt: '',
    imgUrl: 'https://example.com/image.jpg',
    excerpt:''
};

describe('BlogPostDetailPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders post details correctly', async () => {
        (getPostById as jest.Mock).mockReturnValue(post);

        render(
            <MemoryRouter initialEntries={['/post/1']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostDetailPage />} />
                </Routes>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Test Post')).toBeInTheDocument();
            expect(screen.getByText('This is a test post')).toBeInTheDocument();
            expect(screen.getByAltText('Test Post')).toHaveAttribute('src', 'https://example.com/image.jpg');
        });
    });

    it('navigates back to home if post not found', async () => {
        (getPostById as jest.Mock).mockReturnValue(null);

        render(
            <MemoryRouter initialEntries={['/post/1']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('calls navigate to edit page on edit button click', async () => {
        (getPostById as jest.Mock).mockReturnValue(post);

        render(
            <MemoryRouter initialEntries={['/post/1']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Test Post')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Edit'));

        expect(mockNavigate).toHaveBeenCalledWith('/edit/1');
    });

    it('deletes post and navigates to home on delete button click', async () => {
        (getPostById as jest.Mock).mockReturnValue(post);

        render(
            <MemoryRouter initialEntries={['/post/1']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Test Post')).toBeInTheDocument();
        });

        window.confirm = jest.fn(() => true); // Mock window.confirm to return true

        fireEvent.click(screen.getByText('Delete'));

        expect(deletePost).toHaveBeenCalledWith(1);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('does not delete post if confirmation is cancelled', async () => {
        (getPostById as jest.Mock).mockReturnValue(post);

        render(
            <MemoryRouter initialEntries={['/post/1']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Test Post')).toBeInTheDocument();
        });

        window.confirm = jest.fn(() => false); // Mock window.confirm to return false

        fireEvent.click(screen.getByText('Delete'));

        expect(deletePost).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalledWith('/');
    });

    it('navigates to home page on save button click', async () => {
        (getPostById as jest.Mock).mockReturnValue(post);

        render(
            <MemoryRouter initialEntries={['/post/1']}>
                <Routes>
                    <Route path="/post/:id" element={<BlogPostDetailPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Test Post')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Save'));

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
