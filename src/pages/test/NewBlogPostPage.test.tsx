// NewBlogPost.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import NewBlogPost from '../NewBlogPostPage';

// Mock the functions from LocalStorageUtils
jest.mock('../../utils/LocalStorageUtils', () => ({
    addPost: jest.fn(),
    getPosts: jest.fn().mockReturnValue([]),
}));

describe('NewBlogPost Component', () => {
    test('renders form fields and handles submission', async () => {
        render(
            <Router>
                <NewBlogPost />
            </Router>
        );

        // Check if the form fields are present
        expect(screen.getByLabelText(/title:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/content:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
        expect(screen.getByText(/submit/i)).toBeInTheDocument();

        // Simulate user input
        fireEvent.change(screen.getByLabelText(/title:/i), { target: { value: 'My New Post' } });
        fireEvent.change(screen.getByLabelText(/content:/i), { target: { value: 'This is the content of the post.' } });
        fireEvent.change(screen.getByLabelText(/image url/i), { target: { value: 'https://example.com/image.jpg' } });

        // Simulate form submission
        fireEvent.click(screen.getByText(/submit/i));

    });

    test('shows alert if title or content is missing', () => {
        // Mock global alert
        window.alert = jest.fn();

        render(
            <Router>
                <NewBlogPost />
            </Router>
        );

        // Simulate form submission with missing title
        fireEvent.click(screen.getByText(/submit/i));
        expect(window.alert).toHaveBeenCalledWith('Title is required.');

        // Simulate form submission with missing content
        fireEvent.change(screen.getByLabelText(/title:/i), { target: { value: 'Title Only' } });
        fireEvent.click(screen.getByText(/submit/i));
        expect(window.alert).toHaveBeenCalledWith('Content is required.');
    });
});
