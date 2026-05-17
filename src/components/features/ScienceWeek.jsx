import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Calendar, MapPin, Sparkles, ArrowRight, Users, ChevronRight,
  CheckCircle2, Send, Clock, Target, BookOpen, Zap
} from 'lucide-react';

const VSS_DATA = {
  title: 'Vietnam Summer School of Science (VSS)',
  season: 'Mùa thứ 13',
  date: '05 - 08/08/2026',
  location: 'ICISE, Quy Nhơn, Việt Nam',
  highlights: [
    'Các bài giảng khoa học mở rộng tư duy & truyền cảm hứng',
    'Cơ hội gặp gỡ giảng viên, nhà khoa học & bạn trẻ cùng chí hướng',
    'Trải nghiệm môi trường học thuật quốc tế ngay tại Việt Nam',
    'Kết nối cộng đồng yêu khoa học đa lĩnh vực',
    'Một mùa hè vừa học hỏi, vừa khám phá Quy Nhơn xinh đẹp',
  ],
};

const COMMUNITY_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    alt: 'Khoảnh khắc thảo luận nhóm sôi nổi',
    caption: 'Những buổi thảo luận nhóm tràn đầy năng lượng',
    span: 'large',
  },
  {
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400',
    alt: 'Gặp gỡ chuyên gia đầu ngành',
    caption: 'Đối thoại tự do cùng chuyên gia đầu ngành',
    span: 'small',
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
    alt: 'Think by the Sea thực tế',
    caption: 'Những bước chân trên bờ cát Quy Nhơn chiều tà',
    span: 'small',
  },
];

export default function ScienceWeek() {
  const [timeLeft, setTimeLeft] = useState({ days: 80, hours: 12, mins: 30, secs: 19 });
  const [formData, setFormData] = useState({ name: '', email: '', specialty: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs } = prev;
        if (secs > 0) { secs--; }
        else if (mins > 0) { mins--; secs = 59; }
        else if (hours > 0) { hours--; mins = 59; secs = 59; }
        else if (days > 0) { days--; hours = 23; mins = 59; secs = 59; }
        else { clearInterval(timer); return prev; }
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setFormData({ name: '', email: '', specialty: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  }, [formData]);

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed inset-0 bg-black/60 z-[-1] pointer-events-none" />

      <div className="w-full flex flex-col pb-32">

        {/* ═══════════════════════════════════════════════════
           SCREEN 1: HERO SECTION
           ═══════════════════════════════════════════════════ */}
        <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* ── Left: Text ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[1px] bg-amber-400" />
                <span className="text-amber-400/80 text-[10px] font-bold tracking-[0.4em] uppercase font-display">
                  Science Week 2026
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.9] tracking-tighter mb-4 md:mb-6">
                WHERE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                  KNOWLEDGE
                </span>
                <br />
                MEETS THE OCEAN.
              </h1>
              <p className="text-sm md:text-lg text-white/60 max-w-xl leading-relaxed font-light mb-6 md:mb-8">
                Chào đón Vietnam Summer School of Science (VSS) chính thức trở lại mùa thứ 13 tại ICISE, Quy Nhơn — không gian truyền cảm hứng và trải nghiệm mùa hè khoa học biệt lập.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, gap: '1rem' }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 md:px-8 py-3.5 md:py-4 rounded-2xl text-xs md:text-sm tracking-wide transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
              >
                REGISTER NOW
                <ArrowRight size={16} className="transition-all group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

            {/* ── Right: Event Card ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] to-transparent pointer-events-none" />
                <div className="relative p-5 md:p-7 lg:p-8">
                  {/* Countdown */}
                  <div className="mb-6 md:mb-8">
                    <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.25em] mb-3 md:mb-4 flex items-center gap-2">
                      <Clock size={12} className="text-amber-400" /> Countdown
                    </p>
                    <div className="grid grid-cols-4 gap-2 md:gap-3">
                      {[
                        { v: timeLeft.days, l: 'Days' },
                        { v: timeLeft.hours, l: 'Hours' },
                        { v: timeLeft.mins, l: 'Mins' },
                        { v: timeLeft.secs, l: 'Secs' },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center p-2 md:p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                          <span className="text-xl md:text-3xl lg:text-4xl font-bold text-white leading-none tabular-nums">
                            {String(item.v).padStart(2, '0')}
                          </span>
                          <span className="text-[8px] md:text-[10px] text-white/30 uppercase tracking-[0.15em] mt-1.5">{item.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VSS Info */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} className="text-amber-400 shrink-0" />
                      <span className="text-amber-400/90 text-[11px] font-bold tracking-[0.15em] uppercase">
                        {VSS_DATA.season}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm md:text-base leading-snug mb-3">{VSS_DATA.title}</h3>
                    <div className="flex flex-col gap-2 text-[11px] md:text-xs text-white/50">
                      <span className="flex items-center gap-2">
                        <Calendar size={12} className="text-amber-400/70 shrink-0" /> {VSS_DATA.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin size={12} className="text-amber-400/70 shrink-0" /> {VSS_DATA.location}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 mb-2">
                      <Target size={11} className="text-amber-400" /> Điểm nổi bật chương trình
                    </p>
                    {VSS_DATA.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 size={11} className="shrink-0 mt-0.5 text-amber-400/60" />
                        <span className="text-white/50 text-[10px] md:text-[11px] leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           SCREEN 2: COMMUNITY SECTION
           ═══════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* ── Left: Glass Text Block ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.02] to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={14} className="text-amber-400" />
                    <span className="text-amber-400/80 text-[9px] font-bold tracking-[0.3em] uppercase">
                      Science Week Community
                    </span>
                  </div>

                  <h2 className="text-xl md:text-3xl font-display font-bold text-white leading-snug mb-5">
                    <span className="text-amber-400">ĐAM MÊ</span> KHÔNG BIÊN GIỚI
                  </h2>

                  <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-6">
                    Science Week tại Quy Nhơn không chỉ là những bài giảng một chiều, mà là nơi những bộ óc trẻ tự do tranh biện, phá vỡ giới hạn cá nhân để trưởng thành cùng cộng đồng.
                  </p>

                  <div className="mb-6">
                    <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 mb-3">
                      <Sparkles size={11} className="text-amber-400" /> Bạn sẽ tìm thấy gì tại đây?
                    </p>
                    <div className="space-y-2.5">
                      {[
                        'Sự truyền lửa trực tiếp từ những người đi trước giàu kinh nghiệm.',
                        'Mạng lưới bạn bè đồng điệu, trở thành cộng sự trong tương lai.',
                        'Những góc nhìn mới, phương pháp tư duy khoa học chuẩn quốc tế.',
                      ].map((text, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={12} className="shrink-0 mt-0.5 text-amber-400/60" />
                          <span className="text-white/50 text-[11px] md:text-xs leading-relaxed">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="group flex items-center gap-2 text-amber-400 text-[10px] font-bold uppercase tracking-[0.15em] hover:text-amber-300 transition-colors cursor-pointer">
                    XEM SỰ KIỆN ĐÃ DIỄN RA
                    <ChevronRight size={12} className="transition-all group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── Right: Image Grid ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {/* Large image */}
                <div className="col-span-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative h-48 md:h-72 rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer border border-white/[0.06]"
                  >
                    <img
                      src={COMMUNITY_PHOTOS[0].url}
                      alt={COMMUNITY_PHOTOS[0].alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white text-[10px] md:text-xs font-medium">{COMMUNITY_PHOTOS[0].caption}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Two small images */}
                {COMMUNITY_PHOTOS.slice(1).map((photo, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="relative h-36 md:h-56 rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer border border-white/[0.06]"
                  >
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white text-[8px] md:text-xs font-medium">{photo.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-white/20 text-[9px] md:text-[10px] mt-3 text-center tracking-wide">
                * Di chuột qua ảnh để xem mô tả — như một cuốn nhật ký ảnh (Photo Diary)
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
           SCREEN 3: REGISTRATION FORM
           ═══════════════════════════════════════════════════ */}
        <section className="py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Send size={14} className="text-amber-400" />
                  <span className="text-amber-400/80 text-[9px] font-bold tracking-[0.3em] uppercase">
                    Join the Community
                  </span>
                </div>
                <h2 className="text-xl md:text-3xl font-display font-bold text-white mb-2">
                  CẬP NHẬT TIN TỨC & SỰ KIỆN
                </h2>
                <p className="text-white/40 text-xs md:text-sm mb-6 md:mb-8 max-w-md mx-auto">
                  Đăng ký để nhận thông tin mới nhất về Science Week, VSS và các chương trình khoa học tại Quy Nhơn.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2 py-6 text-amber-400"
                  >
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-medium">Đăng ký thành công! Cảm ơn bạn.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                      <input
                        type="text"
                        placeholder="Họ và tên..."
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        required
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 md:py-3.5 px-4 text-white text-sm placeholder-white/20 outline-none focus:border-amber-500/40 focus:bg-amber-500/5 transition-all min-h-[48px]"
                      />
                      <input
                        type="email"
                        placeholder="Email của bạn..."
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        required
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 md:py-3.5 px-4 text-white text-sm placeholder-white/20 outline-none focus:border-amber-500/40 focus:bg-amber-500/5 transition-all min-h-[48px]"
                      />
                      <input
                        type="text"
                        placeholder="Chuyên ngành..."
                        value={formData.specialty}
                        onChange={e => setFormData(p => ({ ...p, specialty: e.target.value }))}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 md:py-3.5 px-4 text-white text-sm placeholder-white/20 outline-none focus:border-amber-500/40 focus:bg-amber-500/5 transition-all min-h-[48px]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full md:w-auto md:min-w-[200px] flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 px-8 rounded-xl text-xs tracking-wide transition-all shadow-lg shadow-amber-500/20 cursor-pointer mx-auto min-h-[48px]"
                    >
                      <Send size={14} />
                      ĐĂNG KÝ NGAY
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
