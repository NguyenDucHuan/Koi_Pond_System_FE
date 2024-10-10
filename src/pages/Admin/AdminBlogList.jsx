import React, { useState, useEffect } from 'react';

// Component to display and manage blog posts
const AdminBlogList = () => {
    const [blogs, setBlogs] = useState([]);

    // Retrieve blogs from localStorage when the component mounts
    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        setBlogs(storedBlogs);
    }, []);

    // Function to delete a blog
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            const updatedBlogs = blogs.filter((blog) => blog.id !== id);
            setBlogs(updatedBlogs);
            localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        }
    };

    // Function to edit a blog (for simplicity, only title and content can be edited)
    const handleEdit = (id) => {
        const title = prompt('Enter new title:');
        const content = prompt('Enter new content:');
        if (title && content) {
            const updatedBlogs = blogs.map((blog) =>
                blog.id === id ? { ...blog, title, content } : blog
            );
            setBlogs(updatedBlogs);
            localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        }
    };

    return (
        <div
            className="min-h-screen py-10"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1728054506851-8a3d556afba7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-50 rounded-lg shadow-md mt-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Manage Blogs</h2>
                {blogs.length === 0 ? (
                    <p className="text-center text-lg text-gray-700">No blogs found.</p>
                ) : (
                    <div className="space-y-6">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="p-4 bg-white shadow-md rounded-lg flex space-x-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl opacity-80 hover:opacity-90"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                {/* Image Section */}
                                {blog.image && (
                                    <div className="w-1/3">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-auto rounded-md"
                                        />
                                    </div>
                                )}

                                {/* Text Section */}
                                <div className="w-2/3">
                                    <h3 className="text-2xl font-semibold mb-2">{blog.title}</h3>

                                    {blog.videoUrl && (
                                        <div className="mb-4">
                                            <video controls className="w-full h-auto rounded-md">
                                                <source src={blog.videoUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}

                                    <div className="flex justify-end space-x-4">
                                        <button
                                            onClick={() => handleEdit(blog.id)}
                                            className="py-2 px-4 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 focus:outline-none"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="py-2 px-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBlogList;
