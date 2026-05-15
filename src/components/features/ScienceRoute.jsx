import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowUpRight, X, Target, Droplets, Landmark, Coffee, CheckCircle2, Sparkles, Calendar, Zap, Ticket, BookOpen, Compass, Microscope, Waves, Palette, Dumbbell, Users, GlassWater, Laptop, ShoppingBag, Navigation, Map, FileText, Info, Star } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { useEffect } from 'react';
// 1. Cấu trúc dữ liệu chi tiết cho tất cả các điểm
const scienceThemes = [
  {
    id: 'theme-01',
    title: 'Science & Innovation Core',
    vnTitle: 'Hạt nhân Khoa học & Sáng tạo',
    tagline: 'NƠI TRÍ TUỆ NHÂN LOẠI GIAO THOA CÙNG ĐẠI DƯƠNG',
    desc: 'Chào mừng đến với trái tim của "Đô thị Khoa học" Quy Nhơn. Cụm hạt nhân này được thiết kế như một hệ sinh thái khép kín, nơi mọi rào cản học thuật được gỡ bỏ.',
    icon: <Target className="w-8 h-8 text-blue-400" />,
    locations: [
      {
        id: '01',
        title: 'ICISE',
        fullTitle: 'Trung tâm Quốc tế Khoa học và Giáo dục Liên ngành',
        tagline: 'Định vị tọa độ của những bộ óc vĩ đại',
        desc: 'Nơi hội tụ các nhà khoa học đạt giải Nobel và chuyên gia đầu ngành từ khắp thế giới.',
        fullDesc: 'Ẩn mình giữa thung lũng rợp bóng cây và bờ biển thanh bình, ICISE không chỉ là một công trình kiến trúc, mà là một biểu tượng của sự kết nối tri thức toàn cầu. Được sáng lập với khát vọng tạo ra một không gian phi ranh giới, ICISE là nơi vinh dự đón tiếp hàng chục nhà khoa học đạt giải Nobel, huy chương Fields và hàng ngàn chuyên gia đầu ngành. Với không gian hội nghị đẳng cấp quốc tế hài hòa tuyệt đối với thiên nhiên, ICISE mang đến một "bầu không khí" học thuật tĩnh lặng, truyền cảm hứng sâu sắc cho những nghiên cứu mang tính bước ngoặt.',
        highlights: [
          'Hạ tầng hội nghị quốc tế: Khán phòng tiêu chuẩn cao cấp, hệ thống phòng thảo luận mở hướng nhìn trực diện ra thiên nhiên.',
          'Không gian phục hồi nhận thức: Lối kiến trúc "xanh" kết nối trực tiếp với bãi biển nguyên sơ, lý tưởng cho những giờ phút tản bộ và tư duy.',
          'Cộng đồng tinh hoa: Cơ hội kết nối trực tiếp với các giáo sư, nhà nghiên cứu và lãnh đạo tư tưởng trên toàn cầu.'
        ],
        actions: [
          { label: 'Lịch Hội thảo & Sự kiện', icon: <Calendar className="w-4 h-4" /> },
          { label: 'Đăng ký tham dự Hội nghị', icon: <Ticket className="w-4 h-4" /> },
          { label: 'Gói Research Retreat', icon: <Sparkles className="w-4 h-4" /> }
        ],
        location: 'Thung lũng Quy Hòa',
        image: '/asset/1.jpg'
      },
      {
        id: '02',
        title: 'ExploraScience',
        fullTitle: 'Tổ hợp Không gian Khoa học Quy Nhơn',
        tagline: 'Cánh cửa mở ra vũ trụ và tương lai STEM',
        desc: 'Trung tâm khám phá khoa học vũ trụ đầu tiên tại Việt Nam.',
        fullDesc: 'Tại đây, khoa học không nằm trên những trang sách khô khan mà hiện diện qua hàng loạt không gian tương tác đa giác quan. Từ Đài quan sát thiên văn vô cực đến Trạm chiếu hình vũ trụ siêu thực, đây là bệ phóng lý tưởng cho những "đại sứ tri thức" tương lai.',
        highlights: [
          'Trạm chiếu hình Vũ trụ (Planetarium): Trải nghiệm đa chiều với hệ thống máy chiếu độ phân giải cao.',
          '7 Phòng trưng bày chuyên đề: Khám phá hệ mặt trời, vật lý lý thuyết qua các mô hình tương tác thực tế.',
          'Đài quan sát thiên văn: Trang bị kính thiên văn quang học hiện đại để ngắm bầu trời đêm duyên hải.'
        ],
        actions: [
          { label: 'Khám phá Bản đồ Tổ hợp', icon: <Compass className="w-4 h-4" /> },
          { label: 'Đăng ký vé trải nghiệm', icon: <Ticket className="w-4 h-4" /> },
          { label: 'Thẻ Young Scientist Pass', icon: <Star className="w-4 h-4" /> }
        ],
        location: 'Đại lộ Khoa học',
        image: '/asset/2.jpg'
      },
      {
        id: '03',
        title: 'The Beach Lab',
        fullTitle: 'Trạm Sáng tạo và Thực nghiệm Ven biển',
        tagline: 'Không gian làm việc của thế hệ đổi mới sáng tạo',
        desc: 'Nơi quy tụ các nhà nghiên cứu, sinh viên và nghệ sĩ tìm kiếm cảm hứng từ biển cả bao la.',
        fullDesc: 'Nếu bạn đang tìm kiếm một nơi để "chạy trốn" khỏi những khối bê tông ngột ngạt nhưng vẫn cần một hạ tầng công nghệ không giới hạn, The Beach Lab là câu trả lời. Được quy hoạch như một trạm thực nghiệm hiện trường và không gian làm việc chung (Coworking space) ngay bên bờ biển, The Beach Lab tái định nghĩa khái niệm "làm việc từ xa". Tại đây, âm thanh của sóng biển thay thế cho tiếng ồn đô thị, những cơn gió đại dương giúp phục hồi năng lượng nhận thức. Hạ tầng được thiết kế chuyên biệt để đón đầu xu hướng của các Digital Nomads, các startup công nghệ và những nhóm nghiên cứu độc lập đang tìm kiếm một trạm dừng chân truyền cảm hứng',
        highlights: [
          'Trạm làm việc tiêu chuẩn quốc tế: Kết nối Internet vệ tinh tốc độ cao (Starlink), hệ thống bảo mật dữ liệu và phòng họp trực tuyến cách âm.',
          'Nghiên cứu & Thực nghiệm sinh thái: Cung cấp quyền truy cập vào các trạm quan trắc dữ liệu vi khí hậu và hải văn tại chỗ.',
          'Cộng đồng Đổi mới sáng tạo: Không gian giao lưu mở (Open-networking) sau giờ làm việc, kết nối các chuyên gia dữ liệu, lập trình viên và nhà khoa học thông qua các buổi "Sunset Hackathon" hay "Science Bar".'
        ],
        actions: [
          { label: 'Đặt chỗ làm việc linh hoạt', icon: <Laptop className="w-4 h-4" /> },
          { label: 'Trở thành Thành viên', icon: <Users className="w-4 h-4" /> },
          { label: 'Khám phá Trạm dữ liệu', icon: <Microscope className="w-4 h-4" /> }
        ],
        location: 'Đại lộ Khoa học',
        image: '/asset/3.png'
      },

    ]
  },
  {
    id: 'theme-02',
    title: 'Blue Spaces & Ecotherapy',
    vnTitle: 'Không gian Xanh lam & Trị liệu nhận thức',
    tagline: 'NƠI CHỮA LÀNH TÂM TRÍ VÀ TÁI TẠO NĂNG LƯỢNG SÁNG TẠO ',
    desc: 'Khoa học đã chứng minh: "Không gian xanh lam" (Blue Spaces) – những môi trường gần biển, hồ, đầm phá – sở hữu năng lực đặc biệt trong việc giảm tải căng thẳng thần kinh và phục hồi sự tập trung. Tại Quy Nhơn, đại dương không chỉ là điểm đến để vui chơi, mà là một "trạm sạc" tự nhiên khổng lồ. Dành cho những bộ óc vừa trải qua hàng giờ nghiên cứu cường độ cao hay những phiên họp chiến lược căng thẳng, đây là hệ sinh thái được thiết kế để bạn tìm lại sự tĩnh thức, khơi nguồn cảm hứng và cân bằng trí tuệ',
    icon: <Target className="w-8 h-8 text-blue-400" />,
    locations: [
      {
        id: '04',
        title: 'Bãi Kỳ Co',
        fullTitle: 'Kỳ Co Beach - Thiên đường biển đảo',
        tagline: 'Phông nền nguyên sơ cho sự tĩnh lặng tuyệt đối',
        desc: 'Trải nghiệm không gian Blue Space chữa lành tâm trí.',
        fullDesc: 'Nằm biệt lập qua những dãy núi ôm trọn bờ vịnh, Kỳ Co tựa như một cõi riêng tách biệt hoàn toàn khỏi nhịp sống số hóa ồn ào. Không có sự xao nhãng, chỉ có dải cát trắng mịn màng và mặt nước trong vắt màu ngọc bích. Nơi đây được quy hoạch như một "vùng đệm tĩnh lặng" (quiet zone), một chốn ẩn náu lý tưởng để giới học giả, nhà nghiên cứu và doanh nhân thả lỏng tâm trí, thực hành chánh niệm (mindfulness) và để cho tiềm thức tự do kết nối những mảnh ghép ý tưởng còn dang dở.',
        highlights: [
          'Trị liệu âm thanh tự nhiên (Soundscape Therapy): Tần số sóng vỗ đều đặn giúp đưa não bộ về trạng thái thư giãn.',
          'Không gian biệt lập (Seclusion): Địa hình bán đảo tạo nên sự riêng tư tối đa.',
          'Detox Kỹ thuật số: Rời xa màn hình và dữ liệu để đôi mắt và tâm trí được nghỉ ngơi hoàn toàn.'
        ],
        actions: [
          { label: 'Lộ trình Thiền hành', icon: <Waves className="w-4 h-4" /> },
          { label: 'Dịch vụ Silent Transfer', icon: <Compass className="w-4 h-4" /> },
        ],
        location: 'Bán đảo Phương Mai',
        image: '/asset/4.jpg'
      },
      {
        id: '05',
        title: 'Eo Gió',
        fullTitle: 'Eo Gió - Tuyệt tác của Gió và Đá',
        tagline: 'Bản giao hưởng của địa chất kỳ vĩ và cảm hứng vô tận',
        desc: 'Nơi kích hoạt những ý tưởng mang tính đột phá trước sự vĩ đại của thiên nhiên.',
        fullDesc: 'Nếu Kỳ Co là sự tĩnh lặng vỗ về, thì Eo Gió là một cú hích đánh thức mọi giác quan. Được kiến tạo bởi những rặng núi đá vươn mình ra biển khơi đón gió ngàn năm, khung cảnh địa chất ngoạn mục tại đây mang đến một góc nhìn vĩ mô (macro-view) về sự vĩ đại của tự nhiên. Đứng trước không gian bao la của Eo Gió, những áp lực và rào cản tư duy dường như được thu nhỏ lại. Đây là tọa độ lý tưởng để trải nghiệm những khoảnh khắc "Eureka", nơi sự kỳ vĩ của thiên nhiên kích hoạt những ý tưởng mang tính đột phá.',
        highlights: [
          'Cung đường ngắm cảnh viễn vọng: Hệ thống đường đi bộ ven vách đá an toàn, tầm nhìn panorama.',
          'Nghiên cứu địa chất thực địa: Quan sát trực tiếp các tầng đá trầm tích triệu năm tuổi.',
          'Tọa độ đón bình minh: Thời điểm hoàn hảo để thiết lập mục tiêu và khởi động tư duy.'
        ],
        actions: [
          { label: 'Bản đồ Địa chất 3D', icon: <Map className="w-4 h-4" /> },
          { label: 'Tham gia Walking Tour', icon: <Navigation className="w-4 h-4" /> },
        ],
        location: 'Nhơn Lý, Quy Nhơn',
        image: '/asset/5.png'
      },
      {
        id: '06',
        title: 'Đảo Cù Lao Xanh',
        fullTitle: 'Đảo Cù Lao Xanh - Ngọc quý Biển Đông',
        tagline: 'Trạm tiền tiêu sinh thái & Cam kết bảo vệ đại dương',
        desc: 'Nơi du khách trí thức chuyển hóa nhận thức thành hành động bảo tồn di sản biển.',
        fullDesc: 'Vượt ra khỏi khái niệm tham quan thuần túy, Cù Lao Xanh là nơi du khách trí thức chuyển hóa nhận thức thành hành động. Tách biệt với đất liền, hòn đảo này giữ được hệ sinh thái rạn san hô vô cùng phong phú và nhịp sống chài lưới nguyên bản. Đây là trung tâm của gói trải nghiệm "Ocean Guardian" (Vệ binh Đại dương) – một mô hình du lịch trách nhiệm (Responsible Tourism) được thiết kế đặc biệt. Tại đây, sự thư giãn đi kèm với ý nghĩa đóng góp, khi du khách có thể trực tiếp tham gia vào các hoạt động khoa học cộng đồng nhằm bảo tồn di sản biển.',
        highlights: [
          'Chương trình "Ocean Guardian": Lặn ngắm kết hợp ghi chép dữ liệu đa dạng sinh học rạn san hô.',
          'Phòng thí nghiệm sống (Living Lab): Môi trường lý tưởng cho nghiên cứu hải dương học ngắn hạn.',
          'Gắn kết cộng đồng: Sinh hoạt cùng ngư dân, tìm hiểu tri thức bản địa về dòng chảy hải văn.'
        ],
        actions: [
          { label: 'Gói Trải nghiệm Ocean Guardian', icon: <Waves className="w-4 h-4" /> },
          { label: 'Báo cáo Đa dạng sinh học', icon: <FileText className="w-4 h-4" /> },
          { label: 'Đặt chỗ Eco-Lodge', icon: <Star className="w-4 h-4" /> }
        ],
        location: 'Xã đảo Nhơn Châu',
        image: '/asset/6.jpg'
      },
      {
        id: '07',
        title: 'Đầm Thị Nại',
        fullTitle: 'Đầm Thị Nại - Hệ sinh thái Đất ngập nước',
        tagline: 'Lá phổi xanh và hệ sinh thái ngập mặn đa dạng',
        desc: 'Kho tàng dữ liệu thực địa vô giá về bảo tồn đất ngập nước và biến đổi khí hậu.',
        fullDesc: 'Là đầm phá lớn nhất tỉnh Bình Định, Đầm Thị Nại mở ra một thế giới sinh thái hoàn toàn khác biệt so với không gian biển đảo. Với hệ thống rừng ngập mặn nguyên sinh và nguồn thủy sinh vật phong phú, đây là "lá phổi xanh" điều hòa vi khí hậu cho toàn đô thị Quy Nhơn. Đối với cộng đồng nghiên cứu, Đầm Thị Nại là một kho tàng dữ liệu thực địa vô giá về bảo tồn đất ngập nước, chuỗi thức ăn tự nhiên và tác động của biến đổi khí hậu. Không gian tĩnh lặng của mặt đầm cũng là nơi tuyệt vời để thả trôi mọi suy nghĩ phức tạp.',
        highlights: [
          'Nghiên cứu sinh thái ven bờ: Quan sát đa dạng sinh học chim di cư và thực vật rừng ngập mặn.',
          'Chèo SUP / Kayak không tiếng ồn: Hình thức di chuyển low-impact, hòa mình tuyệt đối vào thiên nhiên.',
          'Chứng nhân lịch sử & Thủy văn: Khám phá sự thay đổi của dòng chảy và các di chỉ khảo cổ học.'
        ],
        actions: [
          { label: 'Tour Khảo sát Sinh thái', icon: <Navigation className="w-4 h-4" /> },
          { label: 'Thuê Kayak/SUP', icon: <Waves className="w-4 h-4" /> },
          { label: 'Cẩm nang Sinh vật', icon: <BookOpen className="w-4 h-4" /> }
        ],
        location: 'Quy Nhơn - Tuy Phước',
        image: '/asset/7.jpg'
      },
    ]
  },
  {
    id: 'theme-03',
    title: 'Heritage & Anthropology',
    vnTitle: 'Di sản & Khảo cứu Nhân chủng',
    tagline: 'ĐỐI THOẠI VỚI QUÁ KHỨ BẰNG LĂNG KÍNH KHOA HỌC ',
    desc: 'Một "Đô thị Khoa học" không chỉ hướng về tương lai mà còn phải biết giải mã quá khứ. Tại Quy Nhơn, lớp trầm tích lịch sử hàng ngàn năm không chỉ nằm yên trong các bảo tàng, mà hiện diện như những phòng thí nghiệm mở về nhân chủng học, kiến trúc cổ đại và văn hóa bản địa. Nhóm trải nghiệm Di sản & Khảo cứu được thiết kế để thỏa mãn trí tò mò nguyên thủy của những nhà nghiên cứu, cung cấp những bối cảnh văn hóa sâu sắc nhằm làm phong phú thêm thế giới quan của giới trí thức toàn cầu khi đặt chân đến vùng đất này..',
    icon: <Target className="w-8 h-8 text-blue-400" />,
    locations: [
      {
        id: '08',
        title: 'Tháp Chăm Pa',
        fullTitle: 'Hệ thống Di tích Kiến trúc Chăm Pa',
        tagline: 'Giải mã kỹ thuật xây dựng và Tín ngưỡng cổ đại',
        desc: 'Những chứng nhân hùng hồn của một nền văn minh rực rỡ nghìn năm.',
        fullDesc: 'Vượt ra khỏi khái niệm của những điểm tham quan thông thường, quần thể Tháp Đôi, Tháp Bánh Ít và hệ thống di tích Chăm Pa tại Bình Định là những chứng nhân câm lặng nhưng hùng hồn của một nền văn minh rực rỡ. Đối với giới học giả, đây là những công trình nghiên cứu đầy thách thức về khảo cổ học và kiến trúc. Bí ẩn về kỹ thuật nung gạch, phương pháp kết dính không sử dụng vữa, và sự giao thoa trong nghệ thuật điêu khắc tôn giáo biến mỗi ngọn tháp thành một cuốn biên niên sử bằng đất nung, chờ đợi được các khối óc phân tích và giải mã.',
        highlights: [
          'Nghiên cứu Kiến trúc & Vật liệu: Quan sát trực tiếp cấu trúc vòm giả cuốn và kỹ thuật mài gạch độc bản của người Chăm cổ.',
          'Khảo cứu Tôn giáo & Tín ngưỡng: Tìm hiểu hệ thống biểu tượng điêu khắc và thế giới quan Hindu giáo trong không gian thực tế.',
          'Trải nghiệm AR/VR Di sản: Sử dụng công nghệ thực tế tăng cường để phục dựng không gian nguyên bản của các cụm tháp thời kỳ hoàng kim.'
        ],
        actions: [
          { label: 'Tài liệu Khảo cổ học', icon: <FileText className="w-4 h-4" /> },
          { label: 'Khảo sát cùng Chuyên gia', icon: <Users className="w-4 h-4" /> },
          { label: 'Mô hình 3D Tháp Bánh Ít', icon: <Landmark className="w-4 h-4" /> }
        ],
        location: 'Quy Nhơn - Tuy Phước',
        image: '/asset/8.jpg'
      },
      {
        id: '09',
        title: 'Làng nghề truyền thống',
        fullTitle: 'Di sản Làng nghề Truyền thống Bình Định',
        tagline: 'Ký ức vật chất và Khoa học vật liệu thủ công',
        desc: 'Kho lưu trữ sống động về khoa học vật liệu và hệ giá trị cộng đồng.',
        fullDesc: 'Làng nghề tại Bình Định không đơn thuần là nơi sản xuất hàng lưu niệm, mà là kho lưu trữ sống động về khoa học vật liệu và hệ giá trị cộng đồng. Tại tâm điểm di sản Gốm Gò Sành – một trong những trung tâm sản xuất gốm Chăm Pa cổ đại lớn nhất, hay làng Nón ngựa Gò Găng, du khách sẽ được tiếp cận với những kỹ nghệ thủ công hàng trăm năm tuổi. Đặc biệt, khu vực này đang chứng kiến sự chuyển mình mạnh mẽ khi nghệ thuật chế tác truyền thống kết hợp cùng công nghệ hiện đại, số hóa các họa tiết tinh xảo để lưu giữ giá trị trường tồn.',
        highlights: [
          'Khảo cứu Vật liệu truyền thống: Phân tích thành phần đất sét, kỹ thuật tạo hình và phương pháp kiểm soát nhiệt độ lò nung củi thủ công.',
          'Tương tác số hóa Di sản: Trải nghiệm không gian lưu trữ dữ liệu bản sao 3D các cổ vật gốm và quy trình nhận diện hoa văn ứng dụng công nghệ.',
          'Storytelling & Gắn kết Cộng đồng: Lắng nghe triết lý nhân sinh qua lời kể của những nghệ nhân thế hệ cuối cùng.'
        ],
        actions: [
          { label: 'Workshop Chế tác', icon: <Palette className="w-4 h-4" /> },
          { label: 'Dữ liệu Di sản Gốm', icon: <FileText className="w-4 h-4" /> },
          { label: 'Đối thoại cùng Nghệ nhân', icon: <Users className="w-4 h-4" /> },
        ],
        location: 'An Nhơn - Tây Sơn',
        image: '/asset/9.jpg'
      },
      {
        id: '10',
        title: 'Võ cổ truyền Bình Định',
        fullTitle: 'Không gian Võ cổ truyền Bình Định',
        tagline: 'Triết lý chuyển động và Nhân trắc học bản địa',
        desc: 'Nghiên cứu Cơ sinh học trong tinh hoa võ thuật xứ Nẫu.',
        fullDesc: 'Võ cổ truyền Bình Định không chỉ là một hệ thống kỹ năng tự vệ, mà là một di sản phi vật thể phản ánh sâu sắc điều kiện địa lý, lịch sử và nhân trắc học của con người xứ Nẫu. Bước vào các võ đường truyền thống, du khách trí thức không chỉ thưởng thức các bài quyền, mà thực sự đang nghiên cứu về Biomechanic (Cơ sinh học) trong cách con người tối ưu hóa sức mạnh cơ thể. Những bài thảo luận về triết lý "nhu thắng cương", sự liên kết giữa nhịp điệu hô hấp, binh khí truyền thống và y học phương Đông sẽ mở ra một góc nhìn học thuật hoàn toàn mới về tinh thần thượng võ của một vùng đất từng là cái nôi của phong trào Tây Sơn.',
        highlights: [
          'Phân tích Cơ sinh học (Biomechanics): Quan sát và lý giải cơ sở khoa học đằng sau các thế tấn, đòn đánh và sự chuyển dịch trọng tâm cơ thể.',
          'Triết lý Y - Võ song hành: Khám phá sự kết hợp giữa luyện tập võ thuật, huyệt đạo học và phương pháp phục hồi chấn thương bằng thảo dược bản địa.',
          'Tinh thần Tây Sơn: Tìm hiểu lịch sử và ý chí quật cường của vùng đất võ.'
        ],
        actions: [
          { label: 'Lớp Nhập môn Khí công', icon: <Dumbbell className="w-4 h-4" /> },
          { label: 'Luận văn Nhân trắc học', icon: <BookOpen className="w-4 h-4" /> },
          { label: 'Tham vấn Y thuật cổ truyền', icon: <Info className="w-4 h-4" /> }
        ],
        location: 'Tây Sơn, Bình Định',
        image: '/asset/10.jpg'
      },
    ]
  },
  {
    id: 'theme-04',
    title: 'Local Vibes & Connection',
    vnTitle: 'VIBES & KẾT NỐI ĐỊA PHƯƠNG',
    tagline: 'GIAO ĐIỂM CỦA VĂN HÓA VÀ NHỮNG CUỘC ĐỐI THOẠI SAU GIỜ LÀM',
    desc: 'Lịch sử khoa học đã chứng minh: Rất nhiều ý tưởng vĩ đại không được sinh ra trong phòng thí nghiệm hay khán phòng hội nghị, mà nảy mầm từ những cuộc trò chuyện ngẫu hứng bên ly cà phê hay những buổi tản bộ buổi tối. Khi ánh hoàng hôn buông xuống, "Đô thị Khoa học" Quy Nhơn khoác lên mình một nhịp đập mới – sống động, chân thực và đầy hương vị. Đây là hệ sinh thái trải nghiệm ngoài giờ (after-hours) được thiết kế để bạn hòa mình vào đời sống bản địa, thưởng thức tinh hoa ẩm thực và tiếp tục những cuộc kết nối trí tuệ trong một bầu không khí phóng khoáng nhất..',
    icon: <Target className="w-8 h-8 text-blue-400" />,
    locations: [
      {
        id: '11',
        title: 'Phố đi bộ ven biển',
        fullTitle: 'Science Bar & Phố đi bộ ven biển',
        tagline: 'Nơi những ý tưởng lớn gặp gỡ trong không gian mở',
        desc: 'Chất xúc tác cho sự "tình cờ trí tuệ" (intellectual serendipity).',
        fullDesc: 'Khi các phiên thảo luận học thuật khép lại, Phố đi bộ ven biển và hệ thống "Science Bar" trở thành điểm hẹn lý tưởng để phá vỡ mọi khoảng cách thế hệ và chức danh. Không âm nhạc đinh tai, không gian nơi đây được tinh chỉnh để tôn vinh những cuộc trò chuyện (conversational spaces). Hãy tưởng tượng việc bạn đang nhâm nhi một ly cocktail mang hương vị trái cây nhiệt đới, trong khi thảo luận về một ý tưởng startup công nghệ với một diễn giả bạn vừa quen ban sáng.',
        highlights: [
          'Networking không biên giới: Không gian mở, dễ dàng kết nối giữa các nhóm nghiên cứu và startup.',
          'Concept Đồ uống Sáng tạo: Menu mixology lấy cảm hứng từ đại dương và thảo mộc miền Trung.',
          'Âm nhạc & Trị liệu: Nhạc live acoustic nhẹ nhàng đan xen cùng tiếng sóng biển.'
        ],
        actions: [
          { label: 'Đặt bàn Science Bar', icon: <GlassWater className="w-4 h-4" /> },
          { label: 'Sự kiện Sunset Networking', icon: <Users className="w-4 h-4" /> },
        ],
        location: 'Xuân Diệu, Quy Nhơn',
        image: '/asset/11.jpg'
      },
      {
        id: '12',
        title: 'Chợ đêm Quy Nhơn',
        fullTitle: 'Chợ đêm Quy Nhơn - Sắc màu đô thị',
        tagline: 'Nhịp đập thương mại và sắc màu đô thị',
        desc: 'Bức tranh thu nhỏ về sự năng động của nền kinh tế địa phương.',
        fullDesc: 'Để thực sự hiểu về một thành phố, hãy bước vào khu chợ của nó. Chợ đêm Quy Nhơn là bức tranh thu nhỏ về sự năng động của nền kinh tế địa phương. Tạm gác lại những lý thuyết vĩ mô, đây là lúc du khách trí thức thả mình vào dòng chảy nhộn nhịp của đời sống thường nhật. Khu chợ là một bữa tiệc đa giác quan với những gian hàng thủ công mỹ nghệ, những quầy ẩm thực đường phố tỏa khói nghi ngút và nụ cười hiếu khách.',
        highlights: [
          'Giao thương Bản địa: Đóng góp vào nền kinh tế vi mô thông qua sản phẩm thủ công.',
          'Street Food Tour: Khám phá hàng chục món ăn đặc sắc miền Trung.',
          'Giao lưu Văn hóa: Trải nghiệm nhịp sống ban đêm chân thực cùng người dân bản địa.'
        ],
        actions: [
          { label: 'Sơ đồ Chợ đêm', icon: <Map className="w-4 h-4" /> },
          { label: 'Gợi ý Đặc sản', icon: <ShoppingBag className="w-4 h-4" /> },
        ],
        location: 'Lê Duẩn, Quy Nhơn',
        image: '/asset/12.jpg'
      },
    ]
  }
];

const ScienceRoute = ({ setShowNavbar }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  useEffect(() => {
    if (selectedLocation) {
      setShowNavbar(false);
      document.body.style.overflow = 'hidden';
    } else {
      setShowNavbar(true);
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; setShowNavbar(true); };
  }, [selectedLocation]);
  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed inset-0 bg-black/60 z-[-1] pointer-events-none" />

      <div className="w-full flex flex-col gap-16 pt-20 pb-32 px-4 md:px-12 max-w-7xl mx-auto">

        {/* Header giới thiệu */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-blue-500" />
            <span className="text-blue-400 text-[10px] font-bold tracking-[0.4em] uppercase font-display">Discovery Journey</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
            The Science <span className="text-blue-400 font-light italic">Route.</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-2xl">
            Hành trình kết nối các điểm đến tri thức, di sản và không gian trị liệu nhận thức giữa lòng đại dương Quy Nhơn.
          </p>
        </motion.div>

        {scienceThemes.map((theme, index) => (
          <section key={theme.id} className="relative flex flex-col gap-8">
            {/* Theme Header */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative p-6 md:p-10 rounded-[2rem] overflow-hidden bg-black/40 backdrop-blur-md border border-white/10">
              <div className="relative z-10">
                <h3 className="text-xl md:text-3xl font-display font-bold text-white uppercase tracking-tight">
                  <span className="text-blue-500 mr-3">0{index + 1}</span> {theme.title}
                </h3>
                <h2 className="text-lg md:text-xl font-display font-medium text-white/70 tracking-tight mt-2">{theme.vnTitle}</h2>
                <div className="border-l-2 border-blue-500/50 pl-4 mb-6 mt-8">
                  <p className="text-blue-400/80 font-bold tracking-[0.15em] text-[10px] md:text-xs uppercase italic">{theme.tagline}</p>
                </div>
                <p className="text-white/50 text-sm md:text-base font-light leading-relaxed max-w-3xl">{theme.desc}</p>
              </div>
            </motion.div>

            {/* Grid các Card địa điểm */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
              {theme.locations.map((loc) => (
                <GlassCard
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className="group relative overflow-hidden p-0 border-white/5 hover:border-blue-400/30 transition-all h-[340px]"
                >
                  <div className="absolute inset-0 z-0">
                    <img src={loc.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                  </div>
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                    <span className="text-2xl font-display font-bold text-white/10 group-hover:text-white/20 mb-2">{loc.id}</span>
                    <h4 className="text-xl font-bold text-white leading-tight">{loc.title}</h4>
                    <p className="text-white/40 text-[10px] mt-1 uppercase tracking-widest">{loc.tagline}</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">View Detail <ArrowUpRight size={12} /></span>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* --- COMMON MODAL FORMAT FOR ALL LOCATIONS --- */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // z-[1000] đảm bảo Modal đè lên toàn bộ Navbar và các thành phần khác
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8"
          >
            {/* Lớp nền mờ tối toàn màn hình */}
            <div
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              onClick={() => setSelectedLocation(null)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative w-full max-w-6xl max-h-[92vh] bg-[#0a0f1c] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-blue-500/10"
            >

              {/* Phân nửa trái: Hình ảnh nghệ thuật với lớp fade mờ */}
              <div className="w-full md:w-[45%] h-64 md:h-auto overflow-hidden relative">
                <img src={selectedLocation.image} className="w-full h-full object-cover" alt={selectedLocation.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0f1c]/40" />
              </div>

              {/* Phân nửa phải: Nội dung chi tiết */}
              <div className="w-full md:w-[55%] overflow-y-auto custom-scrollbar flex flex-col relative">
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="sticky top-0 self-end m-4 mr-6 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-20 shrink-0"
                >
                  <X className="text-white w-6 h-6" />
                </button>
                <div className="px-8 md:px-14 pb-8 md:pb-14 flex flex-col">

                {/* Header Modal */}
                <div className="mb-10">
                  <div className="flex items-center gap-2 text-blue-400 mb-3">
                    <Target size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-display italic">
                      {selectedLocation.tagline}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 leading-tight tracking-tight">
                    {selectedLocation.fullTitle || selectedLocation.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/40 text-[11px] uppercase tracking-[0.2em] font-bold">
                    <MapPin size={12} className="text-blue-400" /> {selectedLocation.location}
                  </div>
                </div>

                {/* Đoạn mô tả chi tiết */}
                <p className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-12 border-l-2 border-blue-500/30 pl-8 italic">
                  {selectedLocation.fullDesc}
                </p>

                {/* Điểm nhấn trải nghiệm */}
                <div className="mb-12">
                  <h5 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                    <Sparkles size={16} className="text-blue-400" /> Điểm nhấn trải nghiệm
                  </h5>
                  <div className="space-y-6">
                    {selectedLocation.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-5 group/item">
                        <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-blue-500 transition-colors">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover/item:bg-white" />
                        </div>
                        <p className="text-white/70 text-[15px] leading-relaxed font-light">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hệ thống nút CTA sắp xếp dọc với kích thước đồng nhất */}
                <div className="flex flex-col w-full gap-4 mt-auto pt-10 border-t border-white/10">
                  {selectedLocation.actions.map((action, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center justify-between px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 hover:border-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all group"
                    >
                      <span className="flex items-center gap-4">
                        {action.icon} {action.label}
                      </span>
                      <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  ))}
                </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScienceRoute;