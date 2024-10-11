import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "Vệ Sinh Hồ Cá", // Đặt giá trị mặc định cho dịch vụ
        message: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý gửi thông tin liên hệ
        console.log("Thông tin liên hệ:", formData);
        alert("Cảm ơn bạn đã liên hệ!");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Liên hệ với chúng tôi</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập họ và tên"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                            Số điện thoại
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập số điện thoại"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
                            Dịch vụ
                        </label>
                        <select
                            id="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="Vệ Sinh Hồ Cá">Vệ Sinh Hồ Cá</option>
                            <option value="Tư Vấn Thiết Kế Hồ Cá">Tư Vấn Thiết Kế Hồ Cá</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                            Nội dung
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="5"
                            placeholder="Nhập nội dung tin nhắn"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                    >
                        Gửi tin nhắn
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
