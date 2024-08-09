
import { render, screen, fireEvent } from '@testing-library/react';
import BlogPostForm from '../BlogPostForm';
import { BlogPost } from '../../types';

// Mock BlogPost type
const mockBlogPost: BlogPost = {
    id: 1,
    title: 'Sample Title',
    content: 'Sample Content',
    imgUrl: 'https://example.com/image.jpg',
    createdAt: '2024-08-09T00:00:00Z',
    excerpt: 'Sample excerpt',
};

describe('BlogPostForm', () => {
    test('renders form with initial data', () => {
        render(<BlogPostForm initialData={mockBlogPost} />);

        expect(screen.getByLabelText(/title/i)).toHaveValue('Sample Title');
        expect(screen.getByLabelText(/content/i)).toHaveValue('Sample Content');
        expect(screen.getByLabelText(/image url/i)).toHaveValue('https://example.com/image.jpg');
    });

    test('renders form without initial data', () => {
        render(<BlogPostForm />);

        expect(screen.getByLabelText(/title/i)).toHaveValue('');
        expect(screen.getByLabelText(/content/i)).toHaveValue('');
        expect(screen.getByLabelText(/image url/i)).toHaveValue('');
    });

    test('calls onSubmit with default ID and createdAt when initialData is not provided', () => {
        const handleSubmit = jest.fn();

        render(<BlogPostForm onSubmit={handleSubmit} />);

        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Title' } });
        fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'New Content' } });
        fireEvent.change(screen.getByLabelText(/image url/i), { target: { value: 'https://example.com/new-image.jpg' } });

        fireEvent.click(screen.getByRole('button', { name: /create/i }));

        expect(handleSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 0,
                title: 'New Title',
                content: 'New Content',
                imgUrl: 'https://example.com/new-image.jpg',
            })
        );
    });

    test('renders correct button text when isEditing is true', () => {
        render(<BlogPostForm isEditing />);

        expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    });

    test('renders correct button text when isEditing is false', () => {
        render(<BlogPostForm />);

        expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    });
});
