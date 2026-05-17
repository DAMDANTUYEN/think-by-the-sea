import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Beaker, TreePine, Palette, Star, Laptop, Waves, Rocket,
  Clock, Users, ArrowRight, Sparkles, X, CheckCircle2, Image,
} from 'lucide-react';

const PROGRAMS_DATA = [
  {
    id: 'research-retreat',
    title: 'Research Retreat',
    vnTitle: 'Kỳ Nghỉ Nghiên Cứu Chuyên Sâu',
    tag: 'Cao cấp',
    desc: 'Biến Quy Nhơn thành "phòng làm việc thứ hai" của giới tinh hoa học thuật với không gian nghiên cứu riêng tư đẳng cấp quốc tế.',
    fullDesc: 'Cung cấp quyền truy cập không giới hạn vào phòng làm việc riêng tư tại Trung tâm ICISE hoặc khu vực VIP của The Beach Lab với internet vệ tinh tốc độ cao. Nghỉ dưỡng tại các resort 5 sao biệt lập hướng biển gần khu vực Kỳ Co/Eo Gió, bao gồm các liệu trình Eco Therapy (thiền định âm thanh sóng biển) để phục hồi nhận thức mỗi ngày. Trợ lý cá nhân (Concierge) lo liệu mọi vấn đề hậu cần; đặc quyền sử dụng xe di chuyển không tiếng ồn (Silent Transfer); phục vụ ẩm thực Farm-to-table tận phòng để đảm bảo mạch tư duy không bị đứt đoạn.',
    duration: '1 – 4 tuần',
    target: 'Giáo sư, Tiến sĩ, Nghiên cứu viên',
    highlights: [
      'Phòng làm việc riêng tại ICISE / The Beach Lab VIP',
      'Resort 5 sao biệt lập + Eco Therapy hàng ngày',
      'Trợ lý cá nhân & xe Silent Transfer',
      'Ẩm thực Farm-to-table tận phòng',
    ],
    Icon: Beaker,
    accent: '#38bdf8',
    glow: 'rgba(56,189,248,0.4)',
    bg: 'rgba(56,189,248,0.08)',
    image: 'https://fxbvmbd9zkjubuwr.public.blob.vercel-storage.com/research-retreat.jpg',
    cta: 'Yêu cầu Thiết kế Lịch trình Cá nhân hóa',
  },
  {
    id: 'sustainable-tourism',
    title: 'Sustainable & Green Tourism',
    vnTitle: 'Hành trình Thực địa Bền vững',
    tag: 'Bổ trợ chiến lược',
    desc: 'Gói trải nghiệm gắn liền với xu hướng tiếp thị xanh và hành vi tiêu dùng bền vững đang được quan tâm toàn cầu.',
    fullDesc: 'Ngày 1: Tham quan Tổ hợp ExploraScience để hiểu về các tác động của biến đổi khí hậu; thảo luận tại không gian mở của Science Bar. Ngày 2: Di chuyển ra Cù Lao Xanh tham gia đánh giá tác động sinh thái, thu thập dữ liệu rạn san hô và đo lường sự sẵn sàng chi trả của khách du lịch đối với các dịch vụ xanh tại đảo. Ngày 3: Khảo sát Đầm Thị Nại bằng chèo SUP (low-impact tourism), nghiên cứu hệ sinh thái rừng ngập mặn và thưởng thức hải sản được khai thác có trách nhiệm.',
    duration: '3 ngày / 2 đêm',
    target: 'Sinh viên, NGOs, Du khách xanh',
    highlights: [
      'Tham quan ExploraScience + thảo luận tại Science Bar',
      'Lặn biển thu thập dữ liệu rạn san hô tại Cù Lao Xanh',
      'Chèo SUP khảo sát rừng ngập mặn Đầm Thị Nại',
      'Hải sản khai thác có trách nhiệm',
    ],
    Icon: TreePine,
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.4)',
    bg: 'rgba(16,185,129,0.08)',
    image: 'https://fxbvmbd9zkjubuwr.public.blob.vercel-storage.com/sustainable-tourism.jpg',
    cta: 'Mua Thẻ Young Scientist Pass',
  },
  {
    id: 'digital-heritage',
    title: 'Digital Heritage & Anthropology',
    vnTitle: 'Khảo cứu & Số hóa Di sản Chăm Pa',
    tag: 'Đặc thù',
    desc: 'Đưa các di tích lịch sử vượt ra khỏi khái niệm "đồ cổ", biến chúng thành tài nguyên cho các dự án số hóa và bảo tồn công nghệ cao.',
    fullDesc: 'Hành trình Kiến trúc: Nghiên cứu kỹ thuật xây dựng và kết cấu vật liệu tại cụm Tháp Đôi và Tháp Bánh Ít. Trạm thực nghiệm Gốm cổ: Dành 1 ngày tại làng Gốm Gò Sành, quan sát quy trình phục dựng, nhận diện hoa văn cổ và tìm hiểu các mô hình áp dụng công nghệ số (scan 3D) để tạo ra các "hệ sinh thái di sản" lưu trữ trên không gian mạng. Đối thoại Nhân trắc học: Gặp gỡ các võ sư tại Võ đường cổ truyền Bình Định để nghiên cứu về chuyển động cơ sinh học (Biomechanics) và y lý bản địa.',
    duration: '4 ngày / 3 đêm',
    target: 'Chuyên gia văn hóa, Startup 3D, Sinh viên Kiến trúc',
    highlights: [
      'Nghiên cứu kiến trúc Tháp Đôi & Tháp Bánh Ít',
      'Trạm thực nghiệm Gốm Gò Sành + Scan 3D',
      'Đối thoại Nhân trắc học tại Võ đường cổ truyền',
      'Số hóa di sản & hệ sinh thái lưu trữ mạng',
    ],
    Icon: Palette,
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.4)',
    bg: 'rgba(167,139,250,0.08)',
    image: 'https://fxbvmbd9zkjubuwr.public.blob.vercel-storage.com/digital-heritage.png',
    cta: 'Đăng ký Hành trình Khảo cứu Di sản',
  },
  {
    id: 'family-weekend',
    title: 'Science Family Weekend',
    vnTitle: 'Kỳ Nghỉ Gia Đình & Ươm Mầm Tri Thức',
    tag: 'Đại chúng',
    desc: 'Biến kỳ nghỉ cuối tuần của gia đình thành một hành trình khám phá STEM thú vị thay vì chỉ tắm biển và ăn uống truyền thống.',
    fullDesc: 'Cung cấp vé đặc quyền tham gia các chuỗi workshop thí nghiệm thực tế (vật lý vui, thiên văn học, robotics) được thiết kế riêng cho gia đình tại Tổ hợp Khám phá Khoa học ExploraScience. Nghỉ dưỡng tại các resort thân thiện với gia đình dọc bờ biển Quy Nhơn. Lồng ghép các hoạt động thể chất nhẹ nhàng như xây mô hình cát kỹ thuật hoặc ngắm sao ban đêm bằng kính viễn vọng ngay tại bãi biển. Điều phối viên giáo dục (Edutainer) đồng hành hướng dẫn trẻ em; thiết kế lịch trình linh hoạt cân bằng giữa học hỏi và thư giãn.',
    duration: '3 ngày / 2 đêm',
    target: 'Gia đình có trẻ 6-15 tuổi',
    highlights: [
      'Workshop STEM tại ExploraScience (vật lý, robotics)',
      'Resort thân thiện gia đình ven biển',
      'Ngắm sao bằng kính viễn vọng tại bãi biển',
      'Edutainer đồng hành xuyên suốt',
    ],
    Icon: Star,
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    bg: 'rgba(245,158,11,0.08)',
    image: 'https://fxbvmbd9zkjubuwr.public.blob.vercel-storage.com/family-weekend.jpg',
    cta: 'Đặt Gói Science Family Weekend',
  },
  {
    id: 'beach-lab',
    title: 'The Beach Lab',
    vnTitle: 'Trạm Làm Việc & Sáng Tạo Ven Biển',
    tag: 'Nhân tài & Đổi mới',
    desc: 'Mô hình du lịch kết hợp làm việc (Workation) tiên phong, giải quyết nhu cầu về môi trường truyền cảm hứng với hạ tầng công nghệ tối ưu.',
    fullDesc: 'Cung cấp thẻ thành viên (Pass) linh hoạt sử dụng không gian co-working sát biển, trang bị đường truyền internet vệ tinh tốc độ cao (Starlink), phòng họp trực tuyến cách âm và khu vực brainstorm mở. Lưu trú tại các căn hộ dịch vụ hoặc homestay cao cấp phong cách tối giản. Tích hợp hoạt động tái tạo năng lượng như lướt ván SUP, yoga bãi biển buổi sáng. Đặc quyền tham gia mạng lưới networking tại Science Bar, sự kiện công nghệ địa phương và hỗ trợ thủ tục lưu trú dài hạn.',
    duration: '1 tuần – 1 tháng',
    target: 'Digital Nomads, Lập trình viên, Founder Startup',
    highlights: [
      'Co-working sát biển với Starlink tốc độ cao',
      'Phòng họp online cách âm + khu brainstorm mở',
      'SUP, Yoga biển & Homestay cao cấp',
      'Networking tại Science Bar & sự kiện công nghệ',
    ],
    Icon: Laptop,
    accent: '#06b6d4',
    glow: 'rgba(6,182,212,0.4)',
    bg: 'rgba(6,182,212,0.08)',
    image: 'https://fxbvmbd9zkjubuwr.public.blob.vercel-storage.com/beach-lab.png',
    cta: 'Đăng ký Trở thành Thành viên',
  },
  {
    id: 'ocean-guardian',
    title: 'Ocean Guardian',
    vnTitle: 'Hành trình Du lịch Trách nhiệm & Bảo tồn',
    tag: 'Bền vững',
    desc: 'Chuyển hóa du khách từ người hưởng thụ đơn thuần thành những "vệ binh" bảo vệ thiên nhiên và hệ sinh thái biển.',
    fullDesc: 'Tham gia trực tiếp vào chiến dịch thu gom rác thải nhựa đại dương, lặn biển (snorkeling/scuba diving) ghi chép dữ liệu, đánh giá sức khỏe và hỗ trợ phục hồi hệ sinh thái rạn san hô tại Cù Lao Xanh hoặc bán đảo Phương Mai. Nghỉ đêm tại Eco-lodge vận hành bằng năng lượng tái tạo, trải nghiệm lối sống Zero-waste, thực đơn hữu cơ và hòa mình vào nhịp sống ngư dân bản địa. Được cấp giấy chứng nhận "Ocean Guardian" danh dự, cùng sự đồng hành của chuyên gia sinh học biển.',
    duration: '2 ngày / 1 đêm',
    target: 'Du khách yêu thiên nhiên, Gen Z, Doanh nghiệp CSR',
    highlights: [
      'Thu gom rác nhựa & lặn phục hồi rạn san hô',
      'Eco-lodge năng lượng tái tạo, lối sống Zero-waste',
      'Thực đơn hữu cơ & sinh hoạt cùng ngư dân',
      'Chứng nhận "Ocean Guardian" danh dự',
    ],
    Icon: Waves,
    accent: '#14b8a6',
    glow: 'rgba(20,184,166,0.4)',
    bg: 'rgba(20,184,166,0.08)',
    image: 'https://fxbvmbd9zkjubuwr.public.blob.vercel-storage.com/Ocean%20Gurdian.png',
    cta: 'Đăng ký Trở thành Ocean Guardian',
  },
  {
    id: 'startup-bootcamp',
    title: 'Startup Bootcamp by the Sea',
    vnTitle: 'Trạm Sạc Khởi Nghiệp Ven Biển',
    tag: 'Đột phá',
    desc: 'Biến Quy Nhơn thành tâm điểm thu hút dòng vốn chất xám và các ý tưởng công nghệ mới với môi trường làm việc truyền cảm hứng.',
    fullDesc: 'Cung cấp "Team Pass" sử dụng khu vực làm việc nhóm tại The Beach Lab, trang bị bảng tương tác thông minh và hệ thống quản trị dữ liệu nội bộ. Tổ chức các phiên họp chiến lược ngay trên bãi biển Kỳ Co (vào sáng sớm) giúp phá vỡ lối mòn tư duy. Tham gia các đêm "Pitching Night" tại Science Bar ở phố đi bộ, cơ hội giao lưu với các học giả từ ICISE để tìm kiếm cố vấn cho dự án. Thưởng thức ẩm thực đường phố tại Chợ đêm sau những giờ làm việc căng thẳng.',
    duration: '5 ngày / 4 đêm',
    target: 'Startup Founder, Remote Teams, Digital Nomads',
    highlights: [
      'Team Pass tại The Beach Lab + bảng tương tác',
      'Brain-storming trên bãi biển Kỳ Co',
      'Pitching Night tại Science Bar & kết nối học giả',
      'Ẩm thực đường phố Chợ đêm Quy Nhơn',
    ],
    Icon: Rocket,
    accent: '#f472b6',
    glow: 'rgba(244,114,182,0.4)',
    bg: 'rgba(244,114,182,0.08)',
    image: 'https://fxbvmbd9zkjubuwr.public.blob.vercel-storage.com/bootcamp.png',
    cta: 'Nhận Báo giá cho Đội nhóm Startup',
  },
];

function ProgramCard({ prog, index, onSelect }) {
  const { title, vnTitle, tag, desc, duration, target, highlights, Icon, accent, glow, bg, image, cta } = prog;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:shadow-2xl"
      style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.4)` }}
    >
      {/* Image section */}
      <div className="relative aspect-[9/16] max-h-52 md:max-h-64 overflow-hidden shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-black/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(to top, ${accent}15, transparent)` }}
        />

        {/* Tag pill */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border"
            style={{
              color: accent,
              background: `${accent}15`,
              borderColor: `${accent}30`,
            }}
          >
            {tag}
          </span>
        </div>
      </div>

      {/* Content section */}
      <div className="flex-1 flex flex-col p-5 md:p-6 relative">
        {/* Accent glow */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-12 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
          style={{ background: glow }}
        />

        {/* Icon + Title */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="p-2.5 rounded-xl shrink-0"
            style={{ background: bg, border: `1px solid ${accent}25` }}
          >
            <Icon size={18} color={accent} />
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-bold text-base md:text-lg leading-tight tracking-tight">
              {title}
            </h3>
            <p className="text-white/40 text-[11px] mt-0.5 font-medium">{vnTitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">
          {desc}
        </p>

        {/* Duration + Target chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            <Clock size={10} className="text-white/40" />
            <span className="text-white/50 text-[10px] font-medium">{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            <Users size={10} className="text-white/40" />
            <span className="text-white/50 text-[10px] font-medium truncate max-w-[160px]">{target}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-1.5 mb-auto">
          {highlights.slice(0, 3).map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={10} className="shrink-0 mt-0.5" style={{ color: accent }} />
              <span className="text-white/40 text-[10.5px] leading-relaxed">{h}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onSelect(prog)}
          className="mt-4 md:mt-5 w-full flex items-center justify-center gap-2 py-3 md:py-3 px-3 md:px-4 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] transition-all duration-300 min-h-[44px]"
          style={{
            background: `${accent}12`,
            border: `1px solid ${accent}25`,
            color: accent,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = accent;
            e.currentTarget.style.color = '#000';
            e.currentTarget.style.boxShadow = `0 0 24px ${glow}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = `${accent}12`;
            e.currentTarget.style.color = accent;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span className="truncate">{cta}</span>
          <ArrowRight size={12} className="shrink-0" />
        </button>
      </div>
    </motion.div>
  );
}

function ProgramModal({ prog, onClose }) {
  const { title, vnTitle, tag, fullDesc, duration, target, highlights, Icon, accent, glow, bg, image, cta } = prog;
  const [showFull, setShowFull] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center p-2 md:p-6"
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl max-h-[95vh] md:max-h-[90vh] rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          style={{ background: '#0a0f1c' }}
        >
          {/* ── Image banner ── */}
          <div className="relative aspect-[9/16] max-h-44 md:max-h-56 overflow-hidden shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-black/30 to-transparent" />

            {/* Tag pill */}
            <div className="absolute top-3 left-3 md:top-4 md:left-4">
              <span
                className="inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border"
                style={{ color: accent, background: `${accent}20`, borderColor: `${accent}40` }}
              >
                {tag}
              </span>
            </div>

            {/* View Full Poster button — centered on image */}
            <button
              onClick={() => setShowFull(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer group"
            >
              <span
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] border backdrop-blur-md transition-all duration-300 group-hover:scale-105"
                style={{ color: '#fff', background: 'rgba(0,0,0,0.5)', borderColor: 'rgba(255,255,255,0.15)' }}
              >
                <Image size={14} /> View Full Poster
              </span>
            </button>
          </div>

          {/* Fixed close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 p-3 md:p-2.5 bg-black/70 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center z-20 shadow-lg"
          >
            <X className="text-white w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* ── Scrollable content ── */}
          <div className="flex-1 overflow-y-auto p-5 md:p-8">
            {/* Header */}
            <div className="mb-5 md:mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl shrink-0" style={{ background: bg, border: `1px solid ${accent}25` }}>
                  <Icon size={20} color={accent} />
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl font-bold text-white leading-tight tracking-tight">{title}</h2>
                  <p className="text-white/50 text-xs md:text-sm font-medium mt-0.5">{vnTitle}</p>
                </div>
              </div>
            </div>

            {/* Info chips */}
            <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <Clock size={12} className="shrink-0" style={{ color: accent }} />
                <span className="text-white/60 text-xs font-medium">{duration}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <Users size={12} className="shrink-0" style={{ color: accent }} />
                <span className="text-white/60 text-xs font-medium">{target}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-5 md:mb-6">
              <h5 className="text-white/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <Sparkles size={14} style={{ color: accent }} /> Mô tả chi tiết
              </h5>
              <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed border-l-2 pl-3 md:pl-4 italic"
                style={{ borderColor: `${accent}50` }}>
                {fullDesc}
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-6 md:mb-8">
              <h5 className="text-white/80 font-bold text-[10px] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <CheckCircle2 size={14} style={{ color: accent }} /> Điểm nhấn trải nghiệm
              </h5>
              <div className="grid grid-cols-1 gap-2">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${accent}20` }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                    </div>
                    <span className="text-white/60 text-xs leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 min-h-[48px]"
              style={{
                background: `${accent}15`,
                border: `1px solid ${accent}30`,
                color: accent,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = accent;
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.boxShadow = `0 0 30px ${glow}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${accent}15`;
                e.currentTarget.style.color = accent;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>{cta}</span>
              <ArrowRight size={14} className="shrink-0" />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Full Poster Overlay ── */}
      <AnimatePresence>
        {showFull && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
            onClick={() => setShowFull(false)}
          >
            <button
              onClick={() => setShowFull(false)}
              className="absolute top-4 right-4 p-3 bg-black/60 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center z-10"
            >
              <X className="text-white w-5 h-5" />
            </button>
            <motion.img
              key={image}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              src={image}
              alt={title}
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Programs({ setShowNavbar }) {
  const [selected, setSelected] = useState(null);
  const [showPoster, setShowPoster] = useState(null);

  useEffect(() => {
    if (selected) {
      setShowNavbar?.(false);
      document.body.style.overflow = 'hidden';
    } else {
      setShowNavbar?.(true);
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; setShowNavbar?.(true); };
  }, [selected, setShowNavbar]);

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed inset-0 bg-black/60 z-[-1] pointer-events-none" />

      <div className="w-full flex flex-col gap-8 md:gap-14 pb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-blue-500" />
            <span className="text-blue-400 text-[10px] font-bold tracking-[0.4em] uppercase font-display">
              Programs & Packages
            </span>
          </div>
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 md:mb-5 leading-[1.1] tracking-tight">
            CHỌN HÀNH TRÌNH{' '}
            <span className="text-blue-400 font-light italic">ĐỂ KHAI PHÁ TƯ DUY</span>
          </h1>
          <p className="text-white/40 text-xs md:text-base font-light leading-relaxed max-w-2xl">
            Tại "Science Coast", chúng tôi không bán các chuyến tham quan vội vã. Chúng tôi cung cấp những "khoảng không gian" được thiết kế có chủ đích để bạn học hỏi, nghiên cứu, phục hồi và sáng tạo. Hãy lựa chọn một gói hành trình phù hợp với mục tiêu trí tuệ của bạn.
          </p>
        </motion.div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {PROGRAMS_DATA.map((prog, i) => (
            <ProgramCard key={prog.id} prog={prog} index={i} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProgramModal prog={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
