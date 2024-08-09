import React from 'react';
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogPostList from '../BlogPostList';
import { getPosts } from '../../utils/LocalStorageUtils';

// Mocking the getPosts utility function
jest.mock('../../utils/LocalStorageUtils', () => ({
  getPosts: jest.fn(),
}));

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Sample mock data
const mockPosts = [
  {
    id: 1,
    title: 'First Post',
    content: 'Content of the first post',
    imgUrl: 'https://example.com/image1.jpg',
    createdAt: '2024-08-09T00:00:00Z',
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'Content of the second post',
    imgUrl: 'https://example.com/image2.jpg',
    createdAt: '2024-08-10T00:00:00Z',
  },
];

describe('BlogPostList Component', () => {
  beforeEach(() => {
    (getPosts as jest.Mock).mockReturnValue(mockPosts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('filters the posts based on search term', async () => {
    render(
      <BrowserRouter>
        <BlogPostList />
      </BrowserRouter>
    );

    await waitFor(() => {
      // Verify loading spinner is removed
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText(/search by title/i);
    fireEvent.change(searchInput, { target: { value: 'First' } });

    // Wait for filtering to take effect
    await waitFor(() => {
      // Use getAllByText to confirm only one post is visible
      expect(screen.getAllByText(/First Post/i)).toHaveLength(2); // Ensure only one match
      expect(screen.queryByText(/Second Post/i)).not.toBeInTheDocument();
    });
  });

  test('updates pagination model when page size changes', async () => {
    render(
      <BrowserRouter>
        <BlogPostList />
      </BrowserRouter>
    );

    await waitFor(() => {
      // Verify loading spinner is removed
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    const rowsPerPageSelect = screen.getByLabelText(/rows per page/i);
    fireEvent.mouseDown(rowsPerPageSelect);

    const option20 = await screen.findByText('20');
    fireEvent.click(option20);

    // Check that the posts are re-fetched with the new pagination settings
    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledTimes(2); // One on initial load, one after pagination change
    });
  });

  test('navigates to the correct edit page when a post is clicked', async () => {
    render(
      <BrowserRouter>
        <BlogPostList />
      </BrowserRouter>
    );

    await waitFor(() => {
      // Verify loading spinner is removed
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    // Debug the output to understand the DOM structure
    screen.debug();

    // Use a more specific selector if there are multiple elements with the same text
    const firstPostLink = screen.getAllByText(/First Post/i)[0];
    fireEvent.click(firstPostLink);

    // Check if navigation was triggered correctly
    expect(mockNavigate).toHaveBeenCalledWith('/edit/1');
  });
});
