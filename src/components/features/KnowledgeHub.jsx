import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Plus, MessageCircle, Eye, Clock, Pin, Flame, Sparkles,
  BookOpen, Calendar, HelpCircle, FlaskConical, Megaphone,
  Users, Activity, ArrowUpRight, ChevronRight, X, MessageSquare,
  Paperclip, AtSign, ThumbsUp, Share2, Bookmark, Filter,
  ChevronDown, Globe, Star, TrendingUp, Award, Zap,
} from 'lucide-react';

const STATS = {
  members: 1284,
  threads: 486,
  posts: 3720,
  online: 12,
  latest: '2 phút trước',
};

const CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: Activity, color: '#38bdf8' },
  { id: 'research', label: 'Nghiên cứu', icon: FlaskConical, color: '#a78bfa' },
  { id: 'events', label: 'Sự kiện', icon: Calendar, color: '#f59e0b' },
  { id: 'qa', label: 'Hỏi & Đáp', icon: HelpCircle, color: '#2dd4bf' },
  { id: 'resources', label: 'Tài nguyên', icon: BookOpen, color: '#06b6d4' },
  { id: 'announcements', label: 'Thông báo', icon: Megaphone, color: '#f472b6' },
];

const HOT_TAGS = [
  'sustainability', 'marine-biology', '3d-scanning', 'startup', 'ecotherapy',
  'ai-research', 'heritage', 'climate-action',
];

const THREADS_DATA = [
  {
    id: 't1', title: 'Science Week 2026 — Lịch trình và Chương trình chi tiết',
    category: 'announcements',
    author: { name: 'Admin', avatar: 'A', role: 'Quản trị viên' },
    preview: 'Chúng tôi vui mừng thông báo lịch trình chính thức của Science Week 2026 với sự tham gia của 15 diễn giả quốc tế...',
    tags: ['announcement', 'featured'],
    replies: 24, views: 892, likes: 56,
    isPinned: true, isHot: true,
    lastActivity: '2 giờ trước',
  },
  {
    id: 't2', title: 'Nghiên cứu tác động của biến đổi khí hậu lên hệ sinh thái rạn san hô tại Cù Lao Xanh',
    category: 'research',
    author: { name: 'PGS. Nguyễn Văn An', avatar: 'NA', role: 'Nhà nghiên cứu' },
    preview: 'Bài báo cáo sơ bộ kết quả khảo sát 6 tháng về sự thay đổi nhiệt độ bề mặt nước biển và mức độ tẩy trắng san hô tại khu vực Cù Lao Xanh, Quy Nhơn...',
    tags: ['marine-biology', 'climate-action', 'research'],
    replies: 18, views: 534, likes: 42,
    isPinned: false, isHot: true,
    lastActivity: '5 giờ trước',
  },
  {
    id: 't3', title: 'Workshop: Ứng dụng công nghệ Scan 3D trong bảo tồn di sản Chăm Pa',
    category: 'events',
    author: { name: 'ThS. Trần Thị Bích', avatar: 'TB', role: 'Chuyên gia di sản' },
    preview: 'Workshop thực hành 2 ngày về kỹ thuật quét 3D và photogrammetry áp dụng cho các di tích Tháp Đôi và Tháp Bánh Ít...',
    tags: ['3d-scanning', 'heritage', 'workshop'],
    replies: 12, views: 321, likes: 28,
    isPinned: false, isHot: false,
    lastActivity: '1 ngày trước',
  },
  {
    id: 't4', title: 'Làm thế nào để đăng ký tham gia chương trình Research Retreat?',
    category: 'qa',
    author: { name: 'Lê Hoàng Minh', avatar: 'LM', role: 'Thành viên' },
    preview: 'Tôi là nghiên cứu sinh tiến sĩ ngành Vật lý lý thuyết, muốn tìm hiểu về quy trình đăng ký và các yêu cầu cho gói Research Retreat 4 tuần...',
    tags: ['qa', 'research-retreat'],
    replies: 7, views: 156, likes: 15,
    isPinned: false, isHot: false,
    lastActivity: '3 ngày trước',
  },
  {
    id: 't5', title: 'Eco Therapy: Phương pháp phục hồi nhận thức bằng không gian xanh lam',
    category: 'research',
    author: { name: 'GS. John Smith', avatar: 'JS', role: 'Viện sĩ' },
    preview: 'Một tổng quan về cơ chế thần kinh đằng sau liệu pháp không gian xanh lam (Blue Space Therapy) và ứng dụng tại các khu vực ven biển Việt Nam...',
    tags: ['ecotherapy', 'neuroscience', 'wellness'],
    replies: 31, views: 723, likes: 67,
    isPinned: false, isHot: true,
    lastActivity: '1 ngày trước',
  },
  {
    id: 't6', title: 'Tuyển dụng: Trợ lý nghiên cứu Dự án Đa dạng sinh học biển',
    category: 'announcements',
    author: { name: 'Admin', avatar: 'A', role: 'Quản trị viên' },
    preview: 'Dự án hợp tác giữa ICISE và Viện Hải dương học đang tìm kiếm 02 trợ lý nghiên cứu cho chiến dịch khảo sát mùa khô 2026...',
    tags: ['job', 'research', 'opportunity'],
    replies: 9, views: 412, likes: 33,
    isPinned: false, isHot: false,
    lastActivity: '4 ngày trước',
  },
  {
    id: 't7', title: 'Chia sẻ tài liệu: Bộ dữ liệu vi khí hậu Quy Nhơn 2024-2025',
    category: 'resources',
    author: { name: 'Dr. Phạm Hoàng', avatar: 'PH', role: 'Nhà khoa học dữ liệu' },
    preview: 'Bộ dữ liệu mở về nhiệt độ, độ ẩm, tốc độ gió và bức xạ mặt trời được thu thập từ 12 trạm quan trắc ven biển Quy Nhơn trong 18 tháng...',
    tags: ['open-data', 'climate', 'research-tool'],
    replies: 5, views: 289, likes: 44,
    isPinned: false, isHot: false,
    lastActivity: '1 tuần trước',
  },
  {
    id: 't8', title: 'Startup Pitch Night — Kết nối nhà đầu tư tháng 6',
    category: 'events',
    author: { name: 'Mai Thanh Tú', avatar: 'MT', role: 'Điều phối viên' },
    preview: 'Sự kiện pitching hàng tháng tại Science Bar. Cơ hội trình bày ý tưởng trước hội đồng nhà đầu tư thiên thần và nhận tài trợ lên đến $50,000...',
    tags: ['startup', 'funding', 'networking'],
    replies: 21, views: 567, likes: 39,
    isPinned: false, isHot: true,
    lastActivity: '2 ngày trước',
  },
  {
    id: 't9', title: 'Khóa học: Phân tích dữ liệu môi trường với Python',
    category: 'resources',
    author: { name: 'PGS. Nguyễn Văn An', avatar: 'NA', role: 'Nhà nghiên cứu' },
    preview: 'Tài liệu và mã nguồn cho khóa học online 4 tuần về xử lý dữ liệu hải dương học sử dụng Python, bao gồm các bài tập thực hành với dữ liệu thực tế từ Biển Đông...',
    tags: ['python', 'data-science', 'tutorial'],
    replies: 14, views: 398, likes: 51,
    isPinned: false, isHot: false,
    lastActivity: '6 ngày trước',
  },
  {
    id: 't10', title: 'Đề xuất: Thành lập nhóm nghiên cứu Rạn san hô liên ngành',
    category: 'qa',
    author: { name: 'Hoàng Thị Mai', avatar: 'HM', role: 'Nghiên cứu sinh' },
    preview: 'Tôi đề xuất thành lập một nhóm nghiên cứu liên ngành về bảo tồn rạn san hô, kết hợp giữa sinh học biển, kinh tế môi trường và công nghệ remote sensing...',
    tags: ['collaboration', 'coral-reef', 'proposal'],
    replies: 26, views: 445, likes: 38,
    isPinned: false, isHot: false,
    lastActivity: '5 ngày trước',
  },
];

const FEATURED_RESEARCH = [
  {
    title: 'Tác động của du lịch khoa học đến nhận thức cộng đồng',
    authors: 'Nguyễn Văn An et al.',
    journal: 'Journal of Sustainable Tourism, 2026',
    citation: 24,
    excerpt: 'Nghiên cứu về hiệu quả của mô hình Science Tourism trong việc nâng cao nhận thức về bảo tồn biển tại Quy Nhơn.',
  },
  {
    title: 'Blue Space Therapy: Cơ chế thần kinh và ứng dụng lâm sàng',
    authors: 'John Smith, Trần Thị Bích',
    journal: 'Frontiers in Psychology, 2025',
    citation: 18,
    excerpt: 'Phân tích cơ chế hoạt động của môi trường ven biển lên sự phục hồi nhận thức và giảm stress.',
  },
  {
    title: '3D Digital Preservation of Champa Heritage Towers',
    authors: 'Trần Thị Bích et al.',
    journal: 'Digital Applications in Archaeology, 2026',
    citation: 12,
    excerpt: 'Phương pháp photogrammetry và laser scanning trong số hóa kiến trúc Chăm Pa tại Bình Định.',
  },
];

const ONLINE_USERS = [
  { name: 'PGS. Nguyễn Văn An', avatar: 'NA', status: 'online' },
  { name: 'Admin', avatar: 'A', status: 'online' },
  { name: 'Dr. Phạm Hoàng', avatar: 'PH', status: 'idle' },
  { name: 'Lê Hoàng Minh', avatar: 'LM', status: 'online' },
  { name: 'Hoàng Thị Mai', avatar: 'HM', status: 'online' },
  { name: 'Mai Thanh Tú', avatar: 'MT', status: 'idle' },
];

function formatNumber(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;
}

function CategoryPill({ cat, active, onClick }) {
  const { label, icon: IconComp, color } = cat;
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 shrink-0"
      style={{
        background: active ? `${color}20` : 'rgba(255,255,255,0.04)',
        color: active ? color : 'rgba(255,255,255,0.4)',
        border: `1px solid ${active ? `${color}40` : 'rgba(255,255,255,0.06)'}`,
      }}
    >
      <IconComp size={11} />
      {label}
    </button>
  );
}

function ThreadRow({ thread, onClick }) {
  const { title, category, author, preview, tags, replies, views, likes, isPinned, isHot, lastActivity } = thread;
  const cat = CATEGORIES.find(c => c.id === category);
  const catColor = cat?.color || '#38bdf8';

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col sm:flex-row sm:items-start gap-4 p-4 md:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
    >
      {/* Accent line (left border) for pinned/hot */}
      {(isPinned || isHot) && (
        <div
          className="absolute left-0 top-3 bottom-3 w-[2px] rounded-r-full"
          style={{ background: `linear-gradient(to bottom, ${catColor}, transparent)` }}
        />
      )}

      {/* Avatar */}
      <div
        className="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center text-[11px] font-bold uppercase shrink-0 border"
        style={{
          background: `${catColor}12`,
          borderColor: `${catColor}20`,
          color: catColor,
        }}
      >
        {author.avatar}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Badges + Title */}
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          {isPinned && <Pin size={11} className="shrink-0" style={{ color: catColor }} />}
          {isHot && <Flame size={11} className="shrink-0 text-orange-400" />}
          <h3 className="text-white text-sm md:text-[15px] font-semibold leading-snug tracking-tight group-hover:brightness-110 transition-all truncate">
            {title}
          </h3>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-[10px] text-white/30 mb-2 flex-wrap">
          <span className="flex items-center gap-1" style={{ color: `${catColor}90` }}>
            {React.createElement(cat?.icon || Activity, { size: 10 })} {cat?.label}
          </span>
          <span className="flex items-center gap-1">
            <AtSign size={9} /> {author.name}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={9} /> {lastActivity}
          </span>
        </div>

        {/* Preview */}
        <p className="text-white/40 text-xs leading-relaxed line-clamp-1 mb-2.5">{preview}</p>

        {/* Tags + Stats */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {tags.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="inline-block px-2 py-0.5 rounded-md text-[8px] font-medium tracking-wide uppercase"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)' }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-[10px] text-white/30 shrink-0">
            <span className="flex items-center gap-1"><MessageCircle size={10} />{replies}</span>
            <span className="flex items-center gap-1"><Eye size={10} />{formatNumber(views)}</span>
            <span className="flex items-center gap-1"><ThumbsUp size={10} />{likes}</span>
          </div>
        </div>
      </div>

      {/* Arrow icon on hover */}
      <div className="hidden sm:flex items-center self-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <ArrowUpRight size={14} className="text-white/30" />
      </div>
    </motion.div>
  );
}

export default function KnowledgeHub() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewThread, setShowNewThread] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  const filtered = THREADS_DATA.filter(t => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory;
    const matchSearch = !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Sort: pinned first, then hot, then by last activity (approximate)
  const sorted = [...filtered].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    if (a.isHot && !b.isHot) return -1;
    if (!a.isHot && b.isHot) return 1;
    return 0;
  });

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed inset-0 bg-black/60 z-[-1] pointer-events-none" />

      <div className="w-full flex flex-col gap-8 pb-32">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-teal-500" />
            <span className="text-teal-400 text-[10px] font-bold tracking-[0.4em] uppercase font-display">
              Knowledge Hub
            </span>
          </div>
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 md:mb-5 leading-[1.1] tracking-tight">
            DIỄN ĐÀN{' '}
            <span className="text-teal-400 font-light italic">TRI THỨC.</span>
          </h1>
          <p className="text-white/40 text-xs md:text-base font-light leading-relaxed max-w-2xl">
            Trung tâm trao đổi học thuật — nơi các nhà khoa học, researcher và cộng đồng yêu tri thức gặp gỡ, thảo luận và lan tỏa những ý tưởng khoa học.
          </p>
        </motion.div>

        {/* ── Stats Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4"
        >
          {[
            { icon: Users, label: 'Thành viên', value: formatNumber(STATS.members), color: '#38bdf8' },
            { icon: MessageSquare, label: 'Chủ đề', value: STATS.threads, color: '#a78bfa' },
            { icon: MessageCircle, label: 'Bài viết', value: formatNumber(STATS.posts), color: '#2dd4bf' },
            { icon: Activity, label: 'Đang online', value: STATS.online, color: '#f59e0b' },
            { icon: Zap, label: 'Hoạt động', value: STATS.latest, color: '#f472b6' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 md:p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
            >
              <div
                className="hidden md:flex w-9 h-9 rounded-xl items-center justify-center shrink-0"
                style={{ background: `${stat.color}12`, border: `1px solid ${stat.color}20` }}
              >
                <stat.icon size={15} style={{ color: stat.color }} />
              </div>
              <div className="min-w-0 overflow-hidden">
                <p className="text-white text-xs md:text-base font-bold leading-tight truncate">{stat.value}</p>
                <p className="text-white/30 text-[9px] font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Search + New Thread ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm kiếm chủ đề..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 md:py-2.5 pl-9 pr-4 text-white text-sm placeholder-white/20 outline-none focus:border-teal-500/40 focus:bg-teal-500/5 transition-all duration-300 min-h-[44px]"
            />
          </div>
          <button
            onClick={() => setShowNewThread(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 md:py-2.5 rounded-xl bg-teal-500/15 border border-teal-500/25 text-teal-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] md:tracking-[0.15em] hover:bg-teal-500 hover:text-black hover:shadow-[0_0_24px_rgba(20,184,166,0.4)] transition-all duration-300 shrink-0 min-h-[44px]"
          >
            <Plus size={14} />
            Thảo luận mới
          </button>
        </motion.div>

        {/* ── Category Filters ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin" style={{ WebkitOverflowScrolling: 'touch' }}>
          {CATEGORIES.map(cat => (
            <CategoryPill
              key={cat.id}
              cat={cat}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>

        {/* ── Thread List ── */}
        <div className="flex flex-col gap-1.5">
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-white/20">
              <Search size={40} className="mb-4 opacity-30" />
              <p className="text-sm font-medium">Không tìm thấy chủ đề phù hợp</p>
              <p className="text-xs mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          ) : (
            sorted.map(thread => (
              <ThreadRow
                key={thread.id}
                thread={thread}
                onClick={() => setSelectedThread(thread)}
              />
            ))
          )}
        </div>

        {/* ── Featured Research Section ── */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-teal-500/50" />
            <Star size={12} className="text-teal-400" />
            <span className="text-teal-400/80 text-[10px] font-bold tracking-[0.3em] uppercase font-display">
              Nghiên cứu nổi bật
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_RESEARCH.map((paper, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group p-4 md:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Award size={12} className="text-teal-400 shrink-0" />
                  <span className="text-white/40 text-[8px] font-bold uppercase tracking-[0.15em]">{paper.journal}</span>
                </div>
                <h4 className="text-white text-sm font-semibold leading-snug mb-2 group-hover:text-teal-300 transition-colors">
                  {paper.title}
                </h4>
                <p className="text-white/30 text-xs leading-relaxed mb-3 line-clamp-2">{paper.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/20 text-[9px]">{paper.authors}</span>
                  <span className="flex items-center gap-1 text-teal-400/50 text-[9px]">
                    <Bookmark size={9} /> {paper.citation} trích dẫn
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Online Members ── */}
        <div className="mt-4 p-4 md:p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-4">
            <Users size={12} className="text-teal-400" />
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">
              Thành viên đang hoạt động
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-[9px] text-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {STATS.online} online
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {ONLINE_USERS.map((user, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <div className="relative">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold uppercase"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}
                  >
                    {user.avatar}
                  </div>
                  <span
                    className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#0a0f1c] ${user.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`}
                  />
                </div>
                <span className="text-white/40 text-xs">{user.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Hot Tags ── */}
        <div className="flex items-center gap-2 flex-wrap">
          <TrendingUp size={11} className="text-teal-400 shrink-0" />
          {HOT_TAGS.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-lg text-[9px] font-medium tracking-wide border border-white/[0.04] bg-white/[0.02] text-white/25 hover:text-teal-400 hover:border-teal-500/20 transition-all duration-300 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Thread Detail Modal ── */}
      <AnimatePresence>
        {selectedThread && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedThread(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[1.5rem] border border-white/10 shadow-2xl p-6 md:p-8"
              style={{ background: '#0a0f1c' }}
            >
              <button
                onClick={() => setSelectedThread(null)}
                className="sticky top-0 float-right p-3 md:p-1.5 bg-white/5 rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={16} className="text-white/60" />
              </button>

              {(() => {
                const t = selectedThread;
                const cat = CATEGORIES.find(c => c.id === t.category);
                const cc = cat?.color || '#38bdf8';
                return (
                  <div className="-mt-1">
                    {/* Header */}
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      {t.isPinned && <Pin size={13} style={{ color: cc }} />}
                      {t.isHot && <Flame size={13} className="text-orange-400" />}
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border"
                        style={{ color: cc, borderColor: `${cc}30`, background: `${cc}10` }}>
                        {cat?.label}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-snug mb-4">{t.title}</h2>

                    {/* Author info */}
                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.06]">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold uppercase border"
                        style={{ background: `${cc}12`, borderColor: `${cc}20`, color: cc }}>
                        {t.author.avatar}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{t.author.name}</p>
                        <p className="text-white/30 text-[10px]">{t.author.role} · {t.lastActivity}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-white/50 text-sm leading-relaxed mb-6">{t.preview}</p>
                    <p className="text-white/30 text-xs leading-relaxed mb-6 italic">
                      "Chúng tôi tin rằng những trao đổi học thuật cởi mở là nền tảng cho mọi khám phá khoa học. Hãy tham gia thảo luận để đóng góp ý kiến của bạn."
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {t.tags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg text-[9px] font-medium border border-white/[0.04] bg-white/[0.02] text-white/30">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-[11px] text-white/30 pb-5 border-b border-white/[0.06] mb-5">
                      <span className="flex items-center gap-1.5"><MessageCircle size={12} /> {t.replies} trả lời</span>
                      <span className="flex items-center gap-1.5"><Eye size={12} /> {formatNumber(t.views)} lượt xem</span>
                      <span className="flex items-center gap-1.5"><ThumbsUp size={12} /> {t.likes}</span>
                    </div>

                    {/* Reply preview */}
                    <div className="space-y-3 mb-5">
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.15em]">Trả lời gần đây</p>
                      {[
                        { name: 'Dr. Phạm Hoàng', avatar: 'PH', time: '1 giờ trước', text: 'Một chủ đề rất thú vị! Tôi đã có cơ hội nghiên cứu về vấn đề này và xin phép chia sẻ thêm một vài dữ liệu bổ sung...' },
                        { name: 'Hoàng Thị Mai', avatar: 'HM', time: '3 giờ trước', text: 'Hoàn toàn đồng ý với quan điểm trên. Bên cạnh đó, tôi muốn bổ sung thêm về khía cạnh kinh tế - xã hội của mô hình này...' },
                      ].map((reply, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[8px] font-bold uppercase shrink-0 border"
                            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)' }}>
                            {reply.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white/60 text-xs font-medium">{reply.name}</span>
                              <span className="text-white/20 text-[9px]">{reply.time}</span>
                            </div>
                            <p className="text-white/40 text-xs leading-relaxed">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reply input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Viết trả lời của bạn..."
                        className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 md:py-2.5 px-3.5 text-white text-sm placeholder-white/20 outline-none focus:border-teal-500/40 transition-all min-h-[44px]"
                      />
                      <button className="px-5 md:px-4 py-3 md:py-2.5 rounded-xl bg-teal-500/15 border border-teal-500/25 text-teal-400 text-[9px] font-bold uppercase tracking-[0.12em] hover:bg-teal-500 hover:text-black transition-all duration-300 shrink-0 min-h-[44px]">
                        Gửi
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── New Thread Modal ── */}
      <AnimatePresence>
        {showNewThread && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setShowNewThread(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-lg rounded-[1.5rem] border border-white/10 shadow-2xl p-6 md:p-8"
              style={{ background: '#0a0f1c' }}
            >
              <button
                onClick={() => setShowNewThread(false)}
                className="absolute top-3 right-3 md:top-4 md:right-4 p-3 md:p-1.5 bg-white/5 rounded-full hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={16} className="text-white/60" />
              </button>
              <h3 className="text-white font-bold text-lg mb-6">Tạo chủ đề thảo luận mới</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.15em] block mb-1.5">Tiêu đề</label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề chủ đề..."
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 md:py-2.5 px-3.5 text-white text-sm placeholder-white/20 outline-none focus:border-teal-500/40 transition-all min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.15em] block mb-1.5">Danh mục</label>
                  <div className="flex gap-2 flex-wrap">
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <button
                        key={cat.id}
                        className="px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] border transition-all"
                        style={{
                          background: `${cat.color}10`,
                          borderColor: `${cat.color}20`,
                          color: cat.color,
                        }}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase tracking-[0.15em] block mb-1.5">Nội dung</label>
                  <textarea
                    rows={4}
                    placeholder="Viết nội dung thảo luận..."
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl py-3 md:py-2.5 px-3.5 text-white text-sm placeholder-white/20 outline-none focus:border-teal-500/40 transition-all resize-none min-h-[44px]"
                  />
                </div>
                <button className="w-full py-3 md:py-3 rounded-xl bg-teal-500/15 border border-teal-500/25 text-teal-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] md:tracking-[0.15em] hover:bg-teal-500 hover:text-black transition-all duration-300 min-h-[44px]">
                  Đăng chủ đề
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
