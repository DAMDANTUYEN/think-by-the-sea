import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, ArrowUpRight, X, Clock, Ticket, Info } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

// 1. DỮ LIỆU CÁC ĐIỂM CHÍNH (3 Điểm nổi bật nhất)
const mainLocations = [
  {
    id: '01',
    title: 'ICISE',
    desc: 'Nơi hội tụ các nhà khoa học đạt giải Nobel và chuyên gia đầu ngành từ khắp thế giới.',
    fullDesc: 'Ẩn mình giữa thung lũng Quy Hòa, ICISE là biểu tượng kết nối tri thức toàn cầu. Không gian hội nghị đẳng cấp quốc tế hài hòa tuyệt đối với thiên nhiên, mang đến bầu không khí học thuật tĩnh lặng và truyền cảm hứng cho những nghiên cứu mang tính bước ngoặt.',
    location: 'Thung lũng Quy Hòa',
    distance: '8 km từ trung tâm',
    time: '07:30 - 16:30 (Cần đặt lịch trước)',
    ticket: 'Dành cho hội nghị / Miễn phí tham quan ngoài',
    tags: ['Nghiên cứu', 'Hội nghị'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '02',
    title: 'ExploraScience Quy Nhon',
    desc: 'Trung tâm khám phá khoa học vũ trụ đầu tiên tại Việt Nam và thứ hai tại Đông Nam Á.',
    fullDesc: 'Trải dài trên Đại lộ Khoa học, ExploraScience phá vỡ mọi quy chuẩn bảo tàng truyền thống. Nhà chiếu hình vũ trụ, 7 phòng trưng bày chuyên đề và đài quan sát thiên văn hiện đại — nơi khoa học hiện diện qua những trải nghiệm đa giác quan.',
    location: 'Đại lộ Khoa học, Ghềnh Ráng',
    distance: '7 km từ trung tâm',
    time: '08:00 - 17:00 (Thứ 3 - Chủ Nhật)',
    ticket: '120.000 VNĐ / Người',
    tags: ['Thiên văn học', 'Triển lãm'],
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '03',
    title: 'The Beach Lab',
    desc: 'Trạm sáng tạo và coworking space ven biển dành cho Digital Nomads và nhóm nghiên cứu.',
    fullDesc: 'Internet vệ tinh Starlink tốc độ cao, phòng họp cách âm và trạm quan trắc vi khí hậu — tất cả ngay bên bờ biển. The Beach Lab tái định nghĩa làm việc từ xa, nơi tiếng sóng thay thế tiếng ồn đô thị và Sunset Hackathon kết nối các khối óc sáng tạo.',
    location: 'Bờ biển Quy Nhơn',
    distance: '2 km từ trung tâm',
    time: '07:00 - 22:00 (Hàng ngày)',
    ticket: 'Hot Desk / Weekly / Monthly Pass',
    tags: ['Coworking', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
  }
];

const subLocations = [
  {
    id: '04',
    title: 'Bãi Kỳ Co',
    desc: 'Vùng đệm tĩnh lặng cho giới học giả — thiền hành, soundscape therapy và detox kỹ thuật số.',
    fullDesc: 'Dải cát trắng mịn và mặt nước ngọc bích biệt lập sau những dãy núi. Tần số sóng vỗ đều đặn tại vịnh kín đưa não bộ về trạng thái sóng Alpha — trạng thái của sự thư giãn và sáng tạo tinh khôi.',
    location: 'Nhơn Lý, Quy Nhơn',
    distance: '25 km từ trung tâm',
    time: '06:00 - 18:00',
    ticket: 'Phí tàu + vào cửa',
    tags: ['Ecotherapy', 'Thiên nhiên'],
    image: 'https://images.unsplash.com/photo-1518021287102-3c87e41662fb?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '05',
    title: 'Đảo Cù Lao Xanh',
    desc: 'Trung tâm Ocean Guardian — lặn khảo sát rạn san hô và nghiên cứu sinh thái biển thực địa.',
    fullDesc: 'Vượt ra khỏi du lịch thuần túy, Cù Lao Xanh là nơi nhận thức chuyển hóa thành hành động. Sinh viên hải dương học thực hiện dự án ngắn hạn, du khách tham gia đánh giá đa dạng sinh học và làm sạch môi trường biển cùng ngư dân bản địa.',
    location: 'Cách Quy Nhơn 24 km',
    distance: '24 km (đường biển)',
    time: 'Theo lịch tàu',
    ticket: 'Liên hệ đặt trước',
    tags: ['Sinh thái', 'Nghiên cứu'],
    image: 'https://images.unsplash.com/photo-1582967261453-339cbfa75c6d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '06',
    title: 'Tháp Chăm Pa',
    desc: 'Phòng thí nghiệm mở về kiến trúc cổ đại, khảo cổ học và công nghệ số hóa di sản.',
    fullDesc: 'Tháp Đôi và Tháp Bánh Ít là những cuốn biên niên sử bằng đất nung chờ được giải mã. Kỹ thuật nung gạch không dùng vữa, điêu khắc Kala-Makara và trải nghiệm AR/VR phục dựng không gian nguyên bản thời kỳ hoàng kim.',
    location: 'TP Quy Nhơn & Tây Sơn',
    distance: '3 - 50 km từ trung tâm',
    time: '07:00 - 17:30 (Hàng ngày)',
    ticket: '30.000 - 50.000 VNĐ / Người',
    tags: ['Di sản', 'Khảo cổ'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '07',
    title: 'Đầm Thị Nại',
    desc: 'Lá phổi xanh của Quy Nhơn — chèo SUP khảo sát rừng ngập mặn và bird-watching sinh thái.',
    fullDesc: 'Đầm phá lớn nhất Bình Định với hệ sinh thái rừng ngập mặn nguyên sinh và đa dạng chim di cư. Kho tàng dữ liệu thực địa về bảo tồn đất ngập nước và tác động biến đổi khí hậu, lý tưởng cho nghiên cứu sinh thái low-impact.',
    location: 'Phía Bắc TP Quy Nhơn',
    distance: '5 km từ trung tâm',
    time: '05:30 - 18:00 (Hàng ngày)',
    ticket: 'Thuê Kayak/SUP riêng lẻ',
    tags: ['Sinh thái', 'Bird-watching'],
    image: 'https://images.unsplash.com/photo-1518021287102-3c87e41662fb?auto=format&fit=crop&q=80&w=1000',
  }
];

const ScienceRoute = () => {
  // State quản lý việc đóng/mở Modal và lưu trữ data của địa điểm đang chọn
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full flex flex-col gap-12 pt-10 pb-20"
      >
        {/* Tiêu đề chính */}
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            The Science <span className="text-blue-400 font-light">Route.</span>
          </h2>
          <p className="text-white/60 max-w-2xl text-lg font-light leading-relaxed">
            Khám phá những điểm đến công nghệ và khoa học hàng đầu nằm dọc theo đường bờ biển tuyệt đẹp của Quy Nhơn.
          </p>
        </div>

        {/* --- 3 ĐIỂM CHÍNH (THẺ LỚN) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {mainLocations.map((item) => (
            <GlassCard
              key={item.id}
              onClick={() => setSelectedLocation(item)}
              className="relative h-[450px] overflow-hidden group cursor-pointer p-0 border-white/10 hover:border-blue-400/30 transition-colors"
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="absolute top-6 left-6">
                <span className="text-5xl font-display font-bold text-white/20 group-hover:text-white/40 transition-colors duration-500">{item.id}</span>
              </div>
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] uppercase tracking-widest font-bold rounded-full backdrop-blur-sm">{tag}</span>
                  ))}
                </div>
                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{item.title}</h4>
                <div className="flex flex-col gap-1.5 mb-4 text-xs font-medium text-white/70">
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-teal-400" />{item.location}</div>
                </div>
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-in-out overflow-hidden">
                  <p className="text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">{item.desc}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* --- CÁC ĐIỂM PHỤ (THẺ NHỎ) --- */}
        <div className="mt-8">
          <h3 className="text-2xl font-display font-bold text-white mb-6 border-b border-white/10 pb-4">
            Vệ tinh Khoa học & Đổi mới
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subLocations.map((item) => (
              <GlassCard
                key={item.id}
                onClick={() => setSelectedLocation(item)}
                className="relative h-[250px] overflow-hidden group cursor-pointer p-0 border-white/5 hover:border-teal-400/30 transition-colors"
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/80 transition-opacity duration-500 group-hover:bg-slate-900/60" />
                </div>

                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-display font-bold text-white/10 group-hover:text-white/30">{item.id}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">{item.title}</h4>
                    <p className="text-white/50 text-xs line-clamp-2">{item.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </motion.div>

      {/* --- MODAL HIỂN THỊ CHI TIẾT --- */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-12"
          >
            {/* Lớp phủ đen nhòe - Bấm vào đây để đóng */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedLocation(null)}
            />

            {/* Khung nội dung Modal */}
            <motion.div
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#0a0f1c]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black"
            >
              {/* Nút Đóng (Mobile trôi nổi, PC cố định) */}
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Phân nửa trái: Hình ảnh */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img src={selectedLocation.image} alt={selectedLocation.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Phân nửa phải: Thông tin */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedLocation.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-[10px] uppercase tracking-widest font-bold rounded-full">{tag}</span>
                  ))}
                </div>

                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">
                  {selectedLocation.title}
                </h3>

                <p className="text-white/70 text-base leading-relaxed mb-8 font-light">
                  {selectedLocation.fullDesc}
                </p>

                {/* Các thông số kỹ thuật / Info */}
                <div className="mt-auto space-y-4 border-t border-white/10 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider font-bold mb-1">Vị trí</p>
                      <p className="text-white/90 text-sm">{selectedLocation.location} <span className="text-white/40">({selectedLocation.distance})</span></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider font-bold mb-1">Giờ hoạt động</p>
                      <p className="text-white/90 text-sm">{selectedLocation.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                      <Ticket className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider font-bold mb-1">Vé tham quan</p>
                      <p className="text-white/90 text-sm">{selectedLocation.ticket}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-8 bg-white text-black font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-blue-400 hover:text-white transition-colors">
                  Get Directions
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScienceRoute;