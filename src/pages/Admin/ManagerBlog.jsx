import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { onChildAdded, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/FirebaseConfig';

const ManagerBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const blogsRef = ref(db, 'blogs');

        // Listener for when a new child is added to the blogs reference
        const unsubscribe = onChildAdded(blogsRef, (snapshot) => {
            const newBlogKey = snapshot.key; // Get the unique key for the blog
            const newBlogData = snapshot.val(); // Get the blog data

            // Assuming newBlogData is an object with keys as unique IDs for the blogs
            Object.keys(newBlogData).forEach((key) => {
                const blogDetails = {
                    id: newBlogKey, // Use the unique key as the id
                    title: newBlogData[key].title,
                    content: newBlogData[key].content,
                    image: newBlogData[key].image,
                    createdAt: newBlogData[key].createdAt,
                };

                setBlogs((prevBlogs) => {
                    // Check if the blog already exists in the state
                    if (!prevBlogs.some((blog) => blog.id === newBlogKey && blog.title === newBlogData[key].title)) {
                        return [...prevBlogs, blogDetails];
                    }
                    return prevBlogs;
                });
            });
        });

        // Cleanup function to unsubscribe from the listener
        return () => {
            unsubscribe();
        };
    }, []);

    const handleEdit = (blogId) => {
        navigate(`/admin/edit-blog/${blogId}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Blog List</h2>
            {blogs.length === 0 ? (
                <p className="text-center text-gray-600">
                    No blogs found.
                    <button
                        onClick={() => navigate("/admin/create-blog")}
                        className="text-blue-500 underline"
                    >
                        Create a new one!
                    </button>
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <div className="flex flex-col">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                                {blog.image && (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="h-40 w-full object-cover rounded-md mb-4"
                                    />
                                )}
                                <div
                                    className="text-gray-600 line-clamp-1"
                                    dangerouslySetInnerHTML={{ __html: blog.content + '...' }}
                                />
                                <Button icon={<EditOutlined />} onClick={() => handleEdit(blog.id)}>
                                    Edit
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManagerBlog;
