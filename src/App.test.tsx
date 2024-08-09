import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import BlogPostList from './components/BlogPostList';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import EditBlogPostPage from './pages/EditBlogPostPage';
import NewBlogPost from './pages/NewBlogPostPage';
import { getPostById } from './utils/LocalStorageUtils';
import { seedData } from './utils/SeedData';
import { BlogPost } from './types';

// Mocking the necessary modules
jest.mock('./components/BlogPostList');
jest.mock('./pages/BlogPostDetailPage');
jest.mock('./pages/EditBlogPostPage');
jest.mock('./pages/NewBlogPostPage');
jest.mock('./utils/LocalStorageUtils', () => ({
    getPostById: jest.fn(),
}));
jest.mock('./utils/SeedData', () => ({
    seedData: jest.fn(),
}));

const post: BlogPost = {
  id: 1,
  title: 'Test Post',
  content: '<p>This is a test post</p>',
  createdAt: '',
  imgUrl: 'https://example.com/image.jpg',
  excerpt: undefined
};

describe('App Routing', () => {
    beforeEach(() => {
        (BlogPostList as jest.Mock).mockReturnValue(<div>BlogPostList Component</div>);
        (BlogPostDetailPage as jest.Mock).mockReturnValue(<div>BlogPostDetailPage Component</div>);
        (EditBlogPostPage as jest.Mock).mockReturnValue(<div>EditBlogPostPage Component</div>);
        (NewBlogPost as jest.Mock).mockReturnValue(<div>NewBlogPost Component</div>);
        (getPostById as jest.Mock).mockReturnValue(post);
    });

    it('renders BlogPostList component for the root route', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                   <App/>
            </MemoryRouter>
        );
        expect(screen.getByText('BlogPostList Component')).toBeInTheDocument();
    });

    it('renders BlogPostDetailPage component for a specific post route', async () => {
        render(
            <MemoryRouter initialEntries={['/post/1']}>
                <App/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('BlogPostDetailPage Component')).toBeInTheDocument();
        });

        expect(getPostById).toHaveBeenCalledWith(1);
    });

    it('renders NewBlogPost component for the new post route', () => {
        render(
            <MemoryRouter initialEntries={['/new']}>
               <App/>
            </MemoryRouter>
        );

        expect(screen.getByText('NewBlogPost Component')).toBeInTheDocument();
    });

    it('renders EditBlogPostPage component for editing a specific post', async () => {
        render(
            <MemoryRouter initialEntries={['/edit/1']}>
                <App/>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('EditBlogPostPage Component')).toBeInTheDocument();
        });

        expect(getPostById).toHaveBeenCalledWith(1);
    });

    it('calls seedData on initial load', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );

        expect(seedData).toHaveBeenCalledTimes(1);
    });
});
