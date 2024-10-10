import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles for Quill

const EditBlog = () => {
    const { id } = useParams(); // Get the blog id from the route params
    const navigate = useNavigate();
    const [blog, setBlog] = useState({ title: '', content: '', image: null });
    const [imagePreview, setImagePreview] = useState(null);

    // Load blog from localStorage by id
    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const foundBlog = storedBlogs.find((blog) => blog.id === id);
        if (foundBlog) {
            setBlog(foundBlog);
            setImagePreview(foundBlog.image);
        }
    }, [id]);

    // Handle Save action
    const handleSave = () => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const updatedBlogs = storedBlogs.map((b) =>
            b.id === id ? { ...b, title: blog.title, content: blog.content, image: imagePreview } : b
        );
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        alert('Blog updated successfully!');
        navigate('/admin/manage-blog');
    };

    // Handle Image Upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Edit Blog</h1>

                {/* Title Field */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold mb-2 text-gray-700">Title</label>
                    <input
                        type="text"
                        value={blog.title}
                        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter blog title"
                    />
                </div>

                {/* Content Field with Quill Editor */}
                <div className="mb-12"> {/* Increased bottom margin here */}
                    <label className="block text-lg font-semibold mb-2 text-gray-700">Content</label>
                    <ReactQuill
                        value={blog.content}
                        onChange={(value) => setBlog({ ...blog, content: value })}
                        placeholder="Write your blog content here"
                        className="h-64"
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link', 'image'],
                                ['clean'], // Removes formatting
                            ],
                        }}
                        formats={['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image']}
                        theme="snow"
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold mb-2 text-gray-700">Upload Blog Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-2 text-gray-700">Image Preview</label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <img src={imagePreview} alt="Blog" className="w-full h-auto object-cover" />
                        </div>
                    </div>
                )}

                {/* Save Button */}
                <div className="text-right">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
