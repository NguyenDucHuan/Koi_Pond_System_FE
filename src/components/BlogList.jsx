import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        setBlogs(storedBlogs);
    }, []);

    const nextBlogs = () => {
        if (currentIndex < blogs.length - 3) {
            setCurrentIndex(currentIndex + 3);
        }
    };

    const prevBlogs = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 3);
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background Image with Light Blur */}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm z-0"
                style={{
                    backgroundImage: `url('https://plus.unsplash.com/premium_photo-1663948060611-4168fe397a7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                }}
            ></div>

            {/* Foreground Content */}
            <div className="relative z-10 max-w-6xl mx-auto p-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">Blog List</h2>
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-300">No blogs found. Create a new one!</p>
                ) : (
                    <div className="relative">
                        {/* Arrow for sliding left */}
                        {currentIndex > 0 && (
                            <button
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-gray-700 bg-opacity-50 rounded-full"
                                onClick={prevBlogs}
                            >
                                <FaArrowLeft className="text-white" />
                            </button>
                        )}
                        <div className="flex overflow-hidden">
                            <div
                                className="flex transition-transform duration-300"
                                style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
                            >
                                {blogs.map((blog) => (
                                    <Link
                                        key={blog.id}
                                        to={`/blog/${blog.id}`}
                                        className="flex-shrink-0 w-1/3 px-4"
                                        style={{ maxWidth: '33.33%' }} // Ensure 3 blogs per view
                                    >
                                        <div
                                            className="border p-4 rounded-lg shadow-md bg-white bg-opacity-20 backdrop-filter backdrop-blur-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                                            style={{ height: '400px' }} // Ensure fixed height for all blog cards
                                        >
                                            <div className="flex flex-col h-full">
                                                <h3 className="text-xl font-semibold text-white mb-2">
                                                    {blog.title}
                                                </h3>
                                                {blog.image && (
                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        className="h-40 w-full object-cover rounded-md mb-4"
                                                    />
                                                )}
                                                <p className="text-gray-200 line-clamp-3 flex-grow">
                                                    {blog.content.length > 150
                                                        ? blog.content.substring(0, 150) + '...'
                                                        : blog.content}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Arrow for sliding right */}
                        {currentIndex < blogs.length - 3 && (
                            <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-gray-700 bg-opacity-50 rounded-full"
                                onClick={nextBlogs}
                            >
                                <FaArrowRight className="text-white" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;
