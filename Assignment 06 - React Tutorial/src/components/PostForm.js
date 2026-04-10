import React, { useState, useEffect } from 'react';

export default function PostForm({ onSubmit, editingPost }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            //Keep the existing ID when the user is editing, otherwise addPost handles the new ID
            ...(editingPost && { id: editingPost.id}),
            title,
            body,
            userId: 1,
        };
        onSubmit(post);
        setTitle('');
        setBody('');
    };

    useEffect(() => {
        if (editingPost) {
            setTitle(editingPost.title);
            setBody(editingPost.body);
        } else {
            setTitle('');
            setBody('');
        }
    }, [editingPost]);

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <h2>{editingPost ? 'Edit Post' : 'Add Post'}</h2>
            <input
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
            />
            <textarea
            placeholder="Body"
            value={body}
            required
            onChange={(e) => setBody(e.target.value)}
            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
            />
            <button type="submit">{editingPost ? 'Update' : 'Add'} Post</button>
        </form>
    );
}