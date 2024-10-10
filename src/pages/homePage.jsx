import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Background3 from "../assets/images/bg-3.jpg";
import Background2 from "../assets/images/bg2.jpg";
import Background from "../assets/images/project1-2.jpg";
import ChatIcon from "./Chat/ChatIcon";
import ChatFirebaseLogin from "./Chat/ChatFirebaseLogin";

const Hero = () => (
  <section
    className="mb-10 flex justify-center w-full hero bg-medium h-[32rem] backdrop-blur-3xl"
    style={{ backgroundImage: `url(${Background})` }}
  >
    <div className="relative z-10 flex flex-col items justify-center px-8 py-16 w-full text-white max-w-[1200px]">
      <h1 className="text-5xl font-bold mb-4 font-sans leading-tight">
        Thiết Kế Và Thi Công Hồ Cá Koi
      </h1>
      <p className="text-lg font-light leading-relaxed tracking-wide">
        Trang chủ &raquo; Dịch Vụ &raquo; Thiết Kế Và Thi Công Hồ Cá Koi
      </p>
    </div>
  </section>
);

const Sidebar = ({ isListOpen, toggleList, isDichVuOpen }) => (
  <aside className="md:w-1/4 w-full pl-8">
    <h2 className="font-semibold text-xl mb-4 flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg">
      Nội dung chính
      <button
        onClick={toggleList}
        className="text-xl focus:outline-none transform transition-transform duration-200"
      >
        {isListOpen ? "▲" : "▼"}
      </button>
    </h2>
    <ul
      className={`space-y-4 text-base transition-all duration-300 leading-relaxed ${
        isListOpen ? "max-h-full" : "max-h-0 overflow-hidden"
      }`}
    >
      {[
        "Cách thiết kế hồ nuôi cá koi...",
        "Hình ảnh mẫu thiết kế hồ cá...",
        "Mẫu hồ cá koi sân vườn...",
        "Mẫu hồ cá koi khu du lịch...",
        "Bản vẽ thiết kế phối cảnh...",
        "Mẫu thiết kế hồ cá koi ng...",
        "Concept hồ cá koi cho nh...",
        "Mẫu hồ cá koi mini đẹp...",
        "Mẫu hồ cá koi biệt thự...",
        "Mẫu hồ cá koi ở công viên...",
        "Lựa chọn SGL Vietnam thiết...",
        "Quy trình dịch vụ của SGL...",
        "Các Dự Án Hồ Cá KOI SGL..."
      ].map((item, index) => (
        <li key={index} className="flex items-center gap-2 ml-4 text-sm">
          <FontAwesomeIcon icon={faCircle} className="text-[8px]" /> {item}
        </li>
      ))}
    </ul>

    {/* Dịch Vụ Dropdown Section */}
    <div className="mt-6 border-gray-300 border">
      <h3 className="border-gray-300 border font-semibold py-4 text-lg mb-2 flex items-center justify-center bg-gray-100 p-2">
        DỊCH VỤ
      </h3>
      <ul
        className={`text-sm transition-all duration-300 ${
          isDichVuOpen ? "max-h-full" : "max-h-0 overflow-hidden"
        }`}
      >
        {[
          "THIẾT KẾ KIẾN TRÚC",
          "THIẾT KẾ NHÀ VƯỜN",
          "THIẾT KẾ & THI CÔNG CẢNH QUAN",
          "THIẾT KẾ & THI CÔNG SÂN VƯỜN",
          "THIẾT KẾ & THI CÔNG HỒ CÁ KOI"
        ].map((service, index) => (
          <li key={index} className="py-4 px-4 hover:bg-gray-200">
            {service}
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

const MainContent = () => (
  <main className="flex-1 pr-40 text-xl font-normal leading-relaxed tracking-wide">
    <p className="mb-6">
      Với sự duyên dáng, tuổi thọ và màu sắc tuyệt đẹp của cá Koi, thật dễ dàng
      để biết lý do tại sao những khu vườn được thiết kế theo phong cách Nhật
      Bản không thể thiếu hồ cá Koi. Thiết kế hồ cá Koi đẹp trong vườn không
      những mang lại vẻ đẹp thanh bình, may mắn và tài lộc mà còn mang vẻ đẹp
      thẩm mỹ riêng cho không gian nhà ở của gia chủ.
    </p>
    <div className="flex justify-center px-24 mb-6">
      <img src={Background2} alt="SGL Vietnam" className="rounded-lg shadow-lg" />
    </div>
    <p className="mt-4">
      Khi xây dựng hồ cá koi, tùy thuộc vào không gian và diện tích sân vườn để
      xác định các thông số kỹ thuật độc đáo trong sân, tăng cường không gian
      cảnh quan cho gia chủ. Hãy để SGL Vietnam với đội ngũ kỹ sư nhiều năm kinh
      nghiệm thiết kế thi công hồ cá koi nhiều dự án lớn nhỏ, cam kết sẽ mang
      lại cho gia chủ một sản phẩm chất lượng, độc đáo.
    </p>
    <h3 className="font-bold text-2xl mt-8 mb-4 italic">Cách thiết kế hồ nuôi cá koi đạt chuẩn</h3>
    <h4 className="font-semibold text-xl mt-6 mb-2 italic">1. Hình dáng hồ</h4>
    <p className="mt-2">
      Hình dáng hồ sẽ phụ thuộc vào sở thích cá nhân của bạn và diện tích tổng
      thể của sân vườn. Nếu cần thiết, hãy liên hệ một đơn vị chuyên nghiệp để
      họ có thể giúp bạn tư vấn thiết kế hồ cá koi theo mong muốn và sở thích
      của bạn.
    </p>
    <div className="flex justify-center px-24 mt-6 mb-6">
      <img src={Background3} alt="SGL Vietnam" className="rounded-lg shadow-lg" />
    </div>
    <h4 className="font-semibold text-xl mt-6 mb-2 italic">2. Vị trí đặt hồ</h4>
    <p className="mt-2">
      Hồ cá Koi có thể đặt được rất nhiều vị trí như: thiết kế hồ cá koi ngoài
      trời, trong nhà, ban công, sân thượng,… Tùy vào vị trí bạn muốn đặt hồ cá
      mà sẽ có những yêu cầu và kỹ thuật thi công khác nhau và phải đảm bảo: đầy
      đủ công năng, phù hợp với cảnh quan và đảm bảo chuẩn phong thủy.
    </p>
    <h4 className="font-semibold text-xl mt-6 mb-2 italic">3. Kích thước hồ</h4>
  </main>
);

function HomePage() {
  const [isListOpen, setIsListOpen] = useState(true);
  const [isDichVuOpen, setIsDichVuOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };
  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);

  return (
    <main>
      <Hero />
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar
          isListOpen={isListOpen}
          toggleList={toggleList}
          isDichVuOpen={isDichVuOpen}
        />
        <MainContent />
        <ChatIcon onClick={handleChatOpen} />
        {isChatOpen && (
          <ChatFirebaseLogin isOpen={isChatOpen} onClose={handleChatClose} />
        )}
      </div>
    </main>
  );
}

export default HomePage;