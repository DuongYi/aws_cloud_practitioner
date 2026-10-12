import { CheatSheetComparison, KeywordQuickLookup } from '../types';

export const COMPARISONS_DATA: CheatSheetComparison[] = [
  {
    id: 'sg-vs-nacl',
    title: 'Security Group vs Network ACL (NACL)',
    titleVi: 'So sánh Security Group vs Network ACL (NACL)',
    category: 'Networking & Security',
    headers: ['Tiêu chí', 'Security Group (SG)', 'Network ACL (NACL)'],
    rows: [
      ['Cấp độ hoạt động', 'Instance level (ENI máy ảo)', 'Subnet level (toàn bộ subnet)'],
      ['Loại quy tắc (Rules)', 'CHỈ có quy tắc ALLOW (cho phép)', 'Cả quy tắc ALLOW và DENY (từ chối)'],
      ['Trạng thái (State)', 'Stateful: Chiều về tự động được phép', 'Stateless: Chiều về phải mở tường minh'],
      ['Thứ tự đánh giá', 'Đánh giá toàn bộ quy tắc', 'Đánh giá theo số thứ tự từ thấp đến cao (Rule number)'],
      ['Tham chiếu', 'Địa chỉ IP và Security Group khác', 'Chỉ địa chỉ IP (CIDR block)']
    ],
    keyNoteVi: 'Mẹo thi: Nếu câu hỏi yêu cầu chặn 1 IP cụ thể (DENY IP) -> Chọn NACL! SG không có quy tắc Deny.'
  },
  {
    id: 'storage-comparison',
    title: 'EBS vs EFS vs S3 vs EC2 Instance Store',
    titleVi: 'So sánh 4 loại hình lưu trữ chính của AWS',
    category: 'Storage',
    headers: ['Dịch vụ', 'Loại lưu trữ', 'Phạm vi gắn kết', 'Tính bền vững (Persistence)', 'Trường hợp sử dụng'],
    rows: [
      ['EBS Volume', 'Block Storage (ổ mạng)', '1 EC2 tại 1 thời điểm trong 1 AZ', 'Có (vẫn còn khi stop máy)', 'Ổ đĩa hệ điều hành, CSDL'],
      ['Instance Store', 'Block Storage (ổ cứng vật lý)', 'Gắn trực tiếp máy vật lý', 'KHÔNG (Mất khi stop/terminate)', 'Bộ đệm cache, dữ liệu tạm thời'],
      ['EFS', 'File Storage (NFS chia sẻ)', 'Hàng trăm EC2 Linux trên Multi-AZ', 'Có', 'Chia sẻ file cho web server farm'],
      ['Amazon S3', 'Object Storage (Đối tượng)', 'Toàn cầu qua internet / API / SDK', 'Có (Độ bền 11 số 9)', 'Lưu ảnh, video, backup, static web']
    ],
    keyNoteVi: 'Mẹo thi: Cần ổ đĩa tốc độ I/O cực đại nhưng chấp nhận mất khi tắt máy -> Instance Store. Nhiều máy Linux cùng đọc ghi 1 thư mục -> EFS.'
  },
  {
    id: 'integration-comparison',
    title: 'SQS vs SNS vs Kinesis vs Amazon MQ',
    titleVi: 'So sánh các dịch vụ tích hợp & truyền tin nhắn',
    category: 'Application Integration',
    headers: ['Dịch vụ', 'Mô hình truyền tin', 'Lưu trữ tin nhắn', 'Bên nhận tin', 'Trường hợp dùng'],
    rows: [
      ['Amazon SQS', 'Queue (Hàng đợi kéo - Pull)', 'Tối đa 14 ngày (mặc định 4 ngày)', 'Consumer chia sẻ nhau đọc và XÓA', 'Decouple tách rời các tầng ứng dụng'],
      ['Amazon SNS', 'Pub/Sub (Đẩy tin - Push)', 'Không lưu giữ tin', 'Mọi subscriber nhận cùng 1 tin', 'Gửi thông báo đồng loạt (Email, SMS, Fan-out)'],
      ['Amazon Kinesis', 'Streaming (Dữ liệu luồng lớn)', '1 đến 365 ngày', 'Nhiều ứng dụng đọc stream cùng lúc', 'Phân tích dữ liệu lớn thời gian thực (IoT, click)'],
      ['Amazon MQ', 'Message Broker mở', 'Theo cấu hình broker', 'Các ứng dụng dùng MQTT, AMQP', 'Di chuyển ứng dụng cũ (ActiveMQ/RabbitMQ) lên cloud']
    ],
    keyNoteVi: 'Mẹo thi: Thấy chữ "decouple" -> SQS. Thấy chữ "fan-out / publish-subscribe" -> SNS.'
  },
  {
    id: 'encryption-comparison',
    title: 'KMS vs CloudHSM vs Secrets Manager vs Parameter Store',
    titleVi: 'Phân biệt các giải pháp bảo mật khóa & bí mật',
    category: 'Security & Encryption',
    headers: ['Dịch vụ', 'Bản chất', 'Quản lý khóa mã hóa', 'Tính năng nổi bật', 'Chi phí'],
    rows: [
      ['AWS KMS', 'Quản lý khóa phần mềm', 'AWS quản lý (khách hàng chỉ phân quyền)', 'Tích hợp toàn diện vào mọi dịch vụ AWS', 'Giá rẻ ($1/khóa khách hàng/tháng)'],
      ['AWS CloudHSM', 'Phần cứng chuyên dụng (FIPS 140-2 L3)', 'Khách hàng TOÀN QUYỀN quản lý khóa', 'Dành cho yêu cầu bảo mật tài chính/chính phủ', 'Đắt (phí phần cứng dedicated)'],
      ['Secrets Manager', 'Kho lưu mật khẩu CSDL/API key', 'Mã hóa tự động bằng KMS', 'TỰ ĐỘNG XOAY VÒNG MẬT KHẨU (Rotation) với RDS', '$0.40/secret/tháng'],
      ['Parameter Store', 'Kho tham số cấu hình & mật khẩu', 'Hỗ trợ plaintext hoặc mã hóa KMS', 'Cấu hình serverless, quản lý phiên bản tham số', 'Miễn phí cho tier tiêu chuẩn']
    ],
    keyNoteVi: 'Mẹo thi: Tự động đổi mật khẩu CSDL định kỳ -> Secrets Manager. Khách hàng độc quyền quản lý khóa phần cứng -> CloudHSM.'
  },
  {
    id: 'dr-comparison',
    title: '4 Chiến lược Phục hồi Thảm họa (Disaster Recovery)',
    titleVi: 'So sánh 4 chiến lược Disaster Recovery từ rẻ đến đắt',
    category: 'Resilience & Architecture',
    headers: ['Chiến lược', 'RTO (Thời gian khôi phục)', 'RPO (Mức mất dữ liệu)', 'Mức chi phí', 'Cách thức hoạt động'],
    rows: [
      ['1. Backup & Restore', 'Chậm nhất (hàng giờ/ngày)', 'Lớn nhất', '$ (Rẻ nhất)', 'Dữ liệu chỉ lưu backup; khi có thảm họa mới dựng máy'],
      ['2. Pilot Light', 'Nhanh hơn', 'Nhỏ hơn', '$$', 'Chỉ chạy thành phần lõi (DB) ở mức tối thiểu trong cloud'],
      ['3. Warm Standby', 'Rất nhanh (vài phút)', 'Rất nhỏ', '$$$', 'Chạy toàn bộ hệ thống nhưng ở quy mô thu nhỏ (minimum size)'],
      ['4. Multi-Site Active-Active', 'Tức thì (Real-time)', 'Gần như bằng 0', '$$$$ (Đắt nhất)', 'Chạy 2 hệ thống kích thước đầy đủ song song ở 2 Region']
    ],
    keyNoteVi: 'Câu hỏi thi kinh điển: "Chiến lược Disaster Recovery nào có CHI PHÍ THẤP NHẤT?" -> Đáp án: Backup and Restore!'
  },
  {
    id: 'migration-7rs',
    title: 'The 7 Rs of Cloud Migration',
    titleVi: '7 Chiến lược Di chuyển lên Đám mây (The 7 Rs)',
    category: 'Cloud Migration',
    headers: ['Chiến lược', 'Tên thường gọi', 'Mức độ thay đổi', 'Mô tả & Ví dụ'],
    rows: [
      ['1. Retire', 'Ngừng sử dụng', 'Tắt hoàn toàn', 'Tắt bỏ các máy chủ/ứng dụng không còn giá trị kinh doanh'],
      ['2. Retain', 'Giữ lại tại chỗ', 'Không di chuyển', 'Giữ lại on-premises vì vướng pháp lý hoặc quá phức tạp'],
      ['3. Relocate', 'Di dời nguyên trạng', 'Không thay đổi code', 'Di chuyển máy ảo VMware lên VMware Cloud on AWS'],
      ['4. Rehost', 'Lift and Shift', 'Không tối ưu cloud', 'Chuyển nguyên máy chủ vật lý/ảo lên máy ảo EC2'],
      ['5. Replatform', 'Lift, tinker & shift', 'Tối ưu nhẹ', 'Chuyển database lên RDS, app lên Beanstalk mà không đổi code lõi'],
      ['6. Repurchase', 'Drop and shop', 'Đổi sang SaaS', 'Bỏ phần mềm cũ, mua phần mềm SaaS mới (như CRM -> Salesforce)'],
      ['7. Refactor', 'Re-architect', 'Viết lại cloud-native', 'Tách monolith thành microservices, dùng serverless S3/Lambda (lợi ích nhất)']
    ],
    keyNoteVi: 'Mẹo thi: Chuyển máy chủ lên EC2 nhanh nhất không đổi code -> Rehost (Lift & Shift). Chuyển sang dịch vụ SaaS -> Repurchase.'
  },
  {
    id: 'root-user-actions',
    title: 'Các hành động CHỈ Root User mới thực hiện được',
    titleVi: 'Danh sách độc quyền của Root User',
    category: 'Security & Governance',
    headers: ['Hành động độc quyền', 'Mô tả chi tiết', 'Lưu ý khi thi'],
    rows: [
      ['Đổi cài đặt tài khoản', 'Đổi tên tài khoản, email root, mật khẩu tài khoản root', 'Admin IAM không làm được'],
      ['Đóng tài khoản AWS', 'Close AWS Account', 'Chỉ có root mới được đóng'],
      ['Đổi hoặc hủy Support Plan', 'Thay đổi gói hỗ trợ kỹ thuật AWS Support', 'Chỉ root mới thao tác được'],
      ['Đăng ký bán Reserved Instance', 'Register as seller on Reserved Instance Marketplace', 'Chỉ root mới đăng ký'],
      ['Bật S3 MFA Delete', 'Cấu hình bắt buộc nhập mã MFA khi xóa file trên S3', 'Chỉ thực hiện được bởi root'],
      ['Khôi phục quyền admin', 'Khôi phục quyền truy cập IAM khi lỡ khóa sạch quyền', 'Root là cứu cánh cuối cùng']
    ],
    keyNoteVi: 'Tuyệt đối KHÔNG dùng Root cho công việc hàng ngày, hãy tạo tài khoản IAM Admin riêng!'
  },
  {
    id: 'ai-ml-services-matrix',
    title: 'Machine Learning & AI Services Cheat Sheet',
    titleVi: 'Ma trận Toàn diện 11 Dịch vụ Trí tuệ Nhân tạo & Machine Learning (Section 17)',
    category: 'Machine Learning & AI',
    headers: ['Dịch vụ AWS', 'Từ khóa cốt lõi (Core Keyword)', 'Dữ liệu xử lý', 'Đặc điểm trúng đề thi CLF-C02'],
    rows: [
      ['Amazon Rekognition', 'Computer vision, Face analysis, Content moderation', 'Hình ảnh & Video (S3, Kinesis)', 'Nhận diện đồ vật, khuôn mặt, người nổi tiếng; lọc ảnh bạo lực/nhạy cảm'],
      ['Amazon Transcribe', 'Speech-to-Text, Subtitles, PII redaction', 'Âm thanh (Ghi âm hoặc stream)', 'Chuyển giọng nói thành chữ tự động (ASR), tự động che số thẻ/CCCD [PII]'],
      ['Amazon Polly', 'Text-to-Speech, Lifelike voices, Audiobooks', 'Văn bản (Text, SSML)', 'Đọc chữ thành giọng nói tự nhiên (Neural TTS), từ điển phát âm Lexicons'],
      ['Amazon Translate', 'Language translation, Fluent multilingual', 'Văn bản ngôn ngữ nguồn', 'Dịch thuật ngôn ngữ tự nhiên đa ngữ, tùy biến Custom Terminology tên thương hiệu'],
      ['Amazon Lex', 'Conversational AI, Chatbots, Alexa technology', 'Văn bản chat hoặc giọng nói', 'Tạo chatbot đàm thoại bằng ASR + NLU (công nghệ Alexa), kết nối Lambda'],
      ['Amazon Connect', 'Cloud Contact Center, Virtual PBX, Call routing', 'Cuộc gọi điện thoại của khách', 'Tổng đài chăm sóc khách hàng ảo trên cloud, tính tiền theo phút, rẻ hơn 80%'],
      ['Amazon Comprehend', 'NLP, Sentiment analysis, Entity recognition', 'Văn bản phi cấu trúc (Reviews)', 'Xử lý ngôn ngữ tự nhiên: phân tích cảm xúc (Positive/Negative), phát hiện thực thể'],
      ['Amazon SageMaker', 'Build, train, deploy CUSTOM ML models', 'Dữ liệu huấn luyện thô', 'Dành riêng cho Data Scientist tự xây, huấn luyện và triển khai mô hình ML riêng'],
      ['Amazon Kendra', 'Intelligent enterprise document search', 'Tài liệu (SharePoint, S3, Confluence)', 'Công cụ tìm kiếm tài liệu thông minh bằng câu hỏi tự nhiên trong doanh nghiệp'],
      ['Amazon Personalize', 'Personalized recommendations, Amazon.com tech', 'Lịch sử click, đơn mua hàng', 'Động cơ gợi ý sản phẩm/nội dung cá nhân hóa theo thời gian thực (công nghệ Amazon)'],
      ['Amazon Textract', 'Extract text, tables, and forms from scanned PDFs', 'File quét scan, ảnh hóa đơn, PDF', 'Bóc tách chữ viết tay, bảng biểu (Row/Column) và cặp Key-Value từ giấy tờ']
    ],
    keyNoteVi: 'Quy tắc vàng: Tự huấn luyện mô hình ML riêng -> SageMaker. Tìm kiếm tài liệu nội bộ -> Kendra. Gợi ý sản phẩm -> Personalize. Đọc bảng từ PDF -> Textract. Phân tích ảnh/video -> Rekognition.'
  },
  {
    id: 'support-plans-matrix',
    title: 'AWS Support Plans Comparison (Basic vs Developer vs Business vs Enterprise)',
    titleVi: 'So sánh Toàn diện 4 Gói Hỗ trợ Kỹ thuật AWS Support Plans (Section 18)',
    category: 'Billing & Support',
    headers: ['Gói Hỗ trợ', 'Kênh liên hệ & Thời gian', 'Cam kết Phản hồi (SLA)', 'Kiểm tra Trusted Advisor', 'Đặc quyền Độc quyền Phân biệt'],
    rows: [
      ['Basic', 'Chăm sóc KH (Hóa đơn/Tài khoản)', 'Không có hỗ trợ kỹ thuật', '7 bài kiểm tra cơ bản', 'Miễn phí cho mọi tài khoản, xem Personal Health Dashboard'],
      ['Developer', 'Chỉ Email (Giờ hành chính)', '< 12h làm việc (hệ thống bị lỗi)', '7 bài kiểm tra cơ bản', '1 người liên hệ, hướng dẫn chung < 24h, từ $29/tháng'],
      ['Business', '24/7 Điện thoại, Chat & Email', '< 1 GIỜ (Hệ thống Production sập)', 'ĐẦY ĐỦ kiểm tra toàn diện', 'Không giới hạn người gọi, hỗ trợ phần mềm 3rd party, từ $100/tháng'],
      ['Enterprise', '24/7 Điện thoại, Chat & Email', '< 15 PHÚT (Hệ thống nguy cấp sập)', 'ĐẦY ĐỦ kiểm tra toàn diện', 'Có Kỹ sư TAM chuyên trách, đội Concierge, hỗ trợ sự kiện IEM, từ $15.000/tháng']
    ],
    keyNoteVi: 'Mẹo thi: Có kỹ sư TAM (Technical Account Manager), đội Concierge hoặc cam kết phản hồi 15 phút -> BẮT BUỘC gói Enterprise. Hỗ trợ điện thoại 24/7 khi Production sập < 1 giờ -> Gói Business.'
  },
  {
    id: 'billing-cost-tools-matrix',
    title: 'AWS Cost & Billing Tools Comparison Matrix',
    titleVi: 'Ma trận Phân biệt Bộ Công cụ Quản lý Chi phí & Hóa đơn AWS (Section 18)',
    category: 'Billing & Cost Management',
    headers: ['Công cụ AWS', 'Giai đoạn FinOps', 'Từ khóa Đề thi Trúng đích (Exam Trigger)', 'Sản phẩm Đầu ra & Hành động'],
    rows: [
      ['AWS Pricing Calculator', 'Ước tính (Estimating)', 'Estimate prospective architecture BEFORE migration', 'Báo giá dự toán trước khi làm, xuất link chia sẻ công khai'],
      ['AWS Cost Explorer', 'Theo dõi (Tracking)', 'Historical spending, visualize trends, FORECAST 12 months', 'Biểu đồ trực quan, phân tích xu hướng và dự báo 12 tháng tương lai'],
      ['AWS Budgets', 'Giám sát (Monitoring)', 'Proactive alerts on ACTUAL or FORECASTED thresholds', 'Cảnh báo email/SMS, kích hoạt Budget Actions (tắt máy, gán SCP)'],
      ['Cost & Usage Report (CUR)', 'Dữ liệu thô (Granular)', 'Most detailed/granular billing data, export to S3 for Athena', 'Bộ file nén chi tiết từng giờ lưu S3 để chạy câu lệnh SQL Athena'],
      ['AWS Compute Optimizer', 'Tối ưu máy chủ (Optimizing)', 'ML right-sizing recommendations, over/under-provisioned', 'Gợi ý Machine Learning thu nhỏ cấu hình EC2, EBS, Lambda'],
      ['AWS Trusted Advisor', 'Kiểm toán kiến trúc (Audit)', '6 pillars, Cost Optimization pillar, unattached EBS/idle RDS', 'Đèn tín hiệu Xanh/Vàng/Đỏ cảnh báo tài nguyên nhàn rỗi bỏ hoang']
    ],
    keyNoteVi: 'Quy tắc vàng: Trước khi làm -> Pricing Calculator. Đã làm rồi muốn vẽ biểu đồ dự báo -> Cost Explorer. Đặt hạn mức cảnh báo thực tế/dự kiến -> AWS Budgets. Xuất file thô chi tiết vào S3 -> CUR.'
  },
  {
    id: 'advanced-identity-matrix',
    title: 'Advanced Identity & Access Management Comparison (IAM vs STS vs Cognito vs Directory Services vs Identity Center)',
    titleVi: 'Ma trận Phân biệt 6 Dịch vụ Quản lý Danh tính & Phân quyền trên AWS (Section 19)',
    category: 'Security & Identity',
    headers: ['Dịch vụ Danh tính AWS', 'Đối tượng Phục vụ', 'Cơ chế Xác thực & Loại Khóa', 'Từ khóa Đề thi Trúng tủ (Exam Triggers)', 'Kịch bản Sử dụng Thực tế'],
    rows: [
      ['AWS IAM', 'Nhân viên nội bộ trong 1 tài khoản AWS duy nhất', 'Dài hạn (Mật khẩu, AKIA Access Key) hoặc IAM Role', 'Internal employees, single account, IAM users/groups/policies', 'Cấp quyền cho DevOps quản trị EC2/S3 trong 1 tài khoản'],
      ['AWS Organizations', 'Quản trị viên hạ tầng đa tài khoản doanh nghiệp', 'Chính sách quản trị phân tầng SCPs (JSON)', 'Multi-account, consolidated billing, SCP guardrails, OUs', 'Gộp hóa đơn thanh toán và cấm mở tài nguyên ở region lạ'],
      ['AWS STS', 'Tiến trình tự động, máy ảo EC2, truy cập chéo tài khoản', 'Tạm thời (ASIA keys, Session Token, 15 phút - 36 giờ)', 'Temporary credentials, AssumeRole, cross-account, token', 'EC2 instance role tự xoay vòng khóa không lưu trên ổ cứng'],
      ['Amazon Cognito (User Pools)', 'Khách hàng, người dùng ứng dụng web và di động', 'JSON Web Tokens (JWT: ID, Access, Refresh Token)', 'User directory, sign-up/sign-in, social login Google/Facebook', 'Form đăng ký và đăng nhập cho 1 triệu người dùng app di động'],
      ['Amazon Cognito (Identity Pools)', 'App di động cần gọi trực tiếp dịch vụ AWS', 'Khóa tạm thời AWS từ STS cấp theo IAM Role', 'Federated identities, temporary AWS credentials, guest access', 'Cho phép app di động tải ảnh thẳng lên S3 không qua server'],
      ['AWS Directory Services', 'Doanh nghiệp dùng Microsoft Active Directory', 'Kerberos / LDAP / Windows Domain Controller', 'Microsoft Active Directory, AD trust, AD Connector proxy', 'Gia nhập miền Windows EC2 và dùng tài khoản công ty đăng nhập'],
      ['AWS IAM Identity Center', 'Toàn bộ nhân viên công ty (Workforce SSO)', 'Đăng nhập Một lần (SSO) qua cổng AWS Access Portal', 'Single Sign-On (AWS SSO), access multiple AWS accounts', 'Một tài khoản đăng nhập vào 50 tài khoản AWS và Salesforce']
    ],
    keyNoteVi: 'Quy tắc vàng phân biệt: Khách hàng dùng app mobile -> Cognito. Khóa bảo mật tạm thời / AssumeRole -> STS. Active Directory -> Directory Services. Đăng nhập một lần cho nhiều tài khoản AWS -> IAM Identity Center.'
  },
  {
    id: 'dr-strategies-matrix',
    title: 'Disaster Recovery (DR) Strategies Comparison (Cost vs RTO/RPO)',
    titleVi: 'So sánh 4 Chiến lược Phục hồi Thảm họa (Disaster Recovery - DR) trên AWS',
    category: 'Architecture & Migration',
    headers: ['Chiến lược DR', 'Mức độ Chi phí', 'Thời gian Khôi phục (RTO)', 'Mất mát Dữ liệu (RPO)', 'Trạng thái Hạ tầng tại DR Site', 'Từ khóa Đề thi Trúng tủ'],
    rows: [
      ['Backup & Restore', 'Rẻ nhất ($)', 'Lâu nhất (Vài giờ đến vài ngày)', 'Lớn nhất (Tính theo chu kỳ backup)', 'Không chạy máy chủ nào; chỉ lưu dữ liệu backup (S3 / AWS Backup)', 'Lowest cost, slowest recovery, rebuild from backups, cost-effective'],
      ['Pilot Light', 'Thấp ($$)', 'Nhanh hơn (Vài chục phút đến vài giờ)', 'Nhỏ (Cơ sở dữ liệu đồng bộ liên tục)', 'Chỉ bật CSDL cốt lõi chạy liên tục; máy chủ ứng dụng tắt, bật khi có sự cố', 'Core database running live, small pilot flame, launch app servers on disaster'],
      ['Warm Standby', 'Khá cao ($$$)', 'Nhanh (Vài phút)', 'Rất nhỏ (Vài giây đến vài phút)', 'Hệ thống thu nhỏ chạy 24/7 chịu tải tối thiểu; scale up khi có sự cố', 'Scaled-down minimum version running 24/7, rapid scale up on failover'],
      ['Multi-Site Active-Active', 'Đắt nhất ($$$$)', 'Gần bằng 0 (Giây)', 'Gần bằng 0 (Real-time)', 'Hệ thống sản xuất 100% chạy song song ở cả 2 Region chia tải liên tục qua Route 53', 'Zero downtime, mission-critical, highest cost, active in multiple regions simultaneously']
    ],
    keyNoteVi: 'Thứ tự chi phí (rẻ -> đắt): Backup & Restore < Pilot Light < Warm Standby < Multi-Site Active-Active. Thứ tự khôi phục nhanh nhất: Multi-Site Active-Active > Warm Standby > Pilot Light > Backup & Restore.'
  },
  {
    id: 'migration-7rs-matrix',
    title: 'The 7 Rs of Cloud Migration Framework Comparison',
    titleVi: 'Khuôn khổ 7 Chiến lược Di chuyển lên Đám mây (The 7 Rs of Cloud Migration)',
    category: 'Architecture & Migration',
    headers: ['Chiến lược 7 R', 'Mô tả & Bản chất', 'Thay đổi Mã nguồn / Kiến trúc', 'Mức độ Công sức & Chi phí', 'Lợi ích Đám mây', 'Từ khóa Đề thi & Công cụ AWS'],
    rows: [
      ['Retire', 'Tắt và loại bỏ các ứng dụng/máy chủ không còn sử dụng', 'Không (xóa bỏ)', 'Thấp nhất (ngay lập tức)', 'Tiết kiệm ngay 10-20% chi phí', 'Turn off unneeded servers, eliminate legacy waste'],
      ['Retain', 'Giữ nguyên tại chỗ (on-premises), chưa chuyển lên cloud', 'Không', 'Không làm gì', 'Tuân thủ pháp lý / chờ khấu hao', 'Do nothing for now, revisit later, compliance blocker'],
      ['Relocate', 'Di dời máy ảo lên đám mây mà không mua phần cứng mới', 'Không', 'Rất thấp', 'Tiện lợi hạ tầng', 'Move hypervisor VMs, VMware Cloud on AWS'],
      ['Rehost', 'Lift and Shift: Chuyển nguyên xi máy chủ lên EC2 không đổi code', 'Không thay đổi gì (Zero code change)', 'Thấp (nhanh nhất)', 'Tiết kiệm ~30% chi phí hạ tầng', 'Lift and shift, AWS Application Migration Service (MGN)'],
      ['Replatform', 'Lift, Tinker and Shift: Tối ưu nhẹ dịch vụ quản lý (DB -> RDS)', 'Không đổi code cốt lõi', 'Trung bình', 'Hưởng lợi dịch vụ quản lý', 'Lift, tinker & shift, move database to Amazon RDS'],
      ['Repurchase', 'Drop and Shop: Bỏ phần mềm cũ, chuyển sang mua dịch vụ SaaS', 'Bỏ phần mềm cũ', 'Phụ thuộc tích hợp', 'Tính năng hiện đại không bảo trì', 'Drop and shop, switch to SaaS (Salesforce, M365)'],
      ['Refactor', 'Re-architect: Viết lại hoàn toàn theo serverless & microservices', 'Thiết kế & viết lại từ đầu', 'Cao nhất', 'Tối đa (Agility, Scale, Chi phí)', 'Redesign cloud-native, serverless Lambda, microservices']
    ],
    keyNoteVi: 'Quy tắc vàng 7 Rs: Nhanh nhất & không đổi code -> Rehost (Lift and Shift dùng AWS MGN). Chuyển DB sang RDS mà không đổi code -> Replatform. Mua phần mềm SaaS -> Repurchase. Viết lại hoàn toàn cloud-native -> Refactor. Tắt máy chủ thừa -> Retire.'
  },
  {
    id: 'well-architected-6-pillars',
    title: 'The 6 Pillars of the AWS Well-Architected Framework',
    titleVi: 'So sánh 6 Trụ Cột của AWS Well-Architected Framework',
    category: 'Architecture & Frameworks',
    headers: ['Trụ Cột (Pillar)', 'Mục tiêu Cốt lõi', 'Nguyên tắc Thiết kế Chủ đạo (Design Principles)', 'Dịch vụ AWS Điển hình', 'Từ khóa Đề thi Then chốt'],
    rows: [
      ['1. Operational Excellence', 'Chạy và giám sát hệ thống, liên tục cải tiến quy trình vận hành', 'Perform operations as code (IaC), make frequent small reversible changes, anticipate failure, learn from all operational failures', 'AWS CloudFormation, CloudWatch, Systems Manager, CodePipeline', 'Perform operations as code, evolve procedures, anticipate failure, post-mortem'],
      ['2. Security', 'Bảo vệ thông tin, dữ liệu và hệ thống tài sản số', 'Apply least privilege, apply security at all layers, encrypt data in transit and at rest, keep people away from data, automate security best practices', 'IAM, AWS KMS, AWS WAF, AWS Shield, GuardDuty, Macie, Security Hub', 'Least privilege, encrypt in transit and at rest, keep people away from data, trace requests'],
      ['3. Reliability', 'Khả năng phục hồi sau sự cố gián đoạn và tự động co giãn theo nhu cầu', 'Automatically recover from failure, test recovery procedures, stop guessing capacity, scale horizontally to increase workload availability', 'Auto Scaling, Route 53, Multi-AZ RDS, AWS DRS, AWS Backup', 'Automatically recover from failure, test recovery procedures, scale horizontally, stop guessing capacity'],
      ['4. Performance Efficiency', 'Sử dụng tài nguyên điện toán hiệu quả để đáp ứng yêu cầu hệ thống', 'Democratize advanced technologies, go global in minutes, use serverless architectures, experiment more often, mechanical sympathy', 'AWS Lambda, CloudFront, ElastiCache, Auto Scaling, Graviton', 'Democratize advanced tech, go global in minutes, serverless architectures, experiment more often'],
      ['5. Cost Optimization', 'Vận hành hệ thống đem lại giá trị kinh doanh tối đa với chi phí thấp nhất', 'Implement Cloud Financial Management, adopt a consumption model, measure overall efficiency, stop spending money on undifferentiated heavy lifting, analyze and attribute expenditure', 'Cost Explorer, Compute Optimizer, AWS Budgets, Savings Plans, Spot Instances', 'Adopt a consumption model, measure overall efficiency, stop spending on data center heavy lifting, analyze expenditure with tags'],
      ['6. Sustainability', 'Giảm thiểu tác động môi trường lâu dài của việc vận hành đám mây', 'Understand your impact, establish sustainability goals, maximize utilization, anticipate and adopt new efficient hardware & software, reduce downstream impact', 'AWS Graviton (tiết kiệm 60% điện), Customer Carbon Footprint Tool, S3 Glacier, Serverless', 'Understand your impact, maximize utilization, adopt efficient hardware (Graviton), reduce downstream impact, renewable energy']
    ],
    keyNoteVi: 'Mẹo nhớ nhanh 6 Trụ cột: Vận hành dưới dạng code (IaC) -> Operational Excellence; Mã hóa & tránh xa dữ liệu -> Security; Khôi phục tự động & mở rộng ngang -> Reliability; Phổ cập công nghệ & serverless -> Performance Efficiency; Trả theo mức dùng & gắn tag -> Cost Optimization; Tiết kiệm điện & chip Graviton -> Sustainability.'
  },
  {
    id: 'caf-6-perspectives-matrix',
    title: 'AWS Cloud Adoption Framework (CAF) 6 Perspectives Matrix',
    titleVi: 'Ma trận 6 Góc nhìn (Perspectives) của AWS Cloud Adoption Framework (CAF)',
    category: 'Architecture & Migration',
    headers: ['Góc nhìn (Perspective)', 'Phân nhóm Năng lực', 'Trọng tâm & Mục tiêu Chính', 'Nhân sự / Vai trò Phụ trách', 'Bẫy Đề thi & Từ khóa Nhận diện'],
    rows: [
      ['Business', 'Business Capabilities', 'Đảm bảo chiến lược đám mây căn chỉnh với mục tiêu kinh doanh, giá trị ROI, và mở rộng thị trường', 'CEO, CFO, Giám đốc Chiến lược, Trưởng bộ phận Nghiệp vụ', 'Align cloud with business outcomes, maximize business value, business models, monetization'],
      ['People', 'Business Capabilities', 'ĐÀO TẠO VÀ VĂN HÓA: Cầu nối then chốt giữa công nghệ và kinh doanh, phát triển kỹ năng cloud, quản lý thay đổi văn hóa', 'HR, Trưởng phòng Đào tạo, Trưởng nhóm Chuyển đổi số, People Managers', 'BRIDGE BETWEEN TECHNOLOGY AND BUSINESS, organizational change, skills gap, training, cloud fluency, upskilling staff'],
      ['Governance', 'Business Capabilities', 'Quản trị rủi ro, kiểm soát tài chính đám mây (Cloud Financial Management), đo lường lợi ích dự án', 'CIO, Risk & Compliance Officers, FinOps Managers', 'Risk management, benefit realization, portfolio management, Cloud Financial Management, program control'],
      ['Platform', 'Technical Capabilities', 'Xây dựng nền tảng đám mây mở rộng, hiện đại hóa hạ tầng, kiến trúc hybrid, môi trường CI/CD', 'CTO, Enterprise Cloud Architects, DevOps Engineers', 'Enterprise cloud platform, modern application development, CI/CD, provisioning, infrastructure as code'],
      ['Security', 'Technical Capabilities', 'Bảo đảm tính Bảo mật, Toàn vẹn và Sẵn sàng (CIA triad), danh tính IAM, bảo vệ dữ liệu và tuân thủ', 'CISO, Trưởng ban An toàn thông tin, Security Engineers', 'Confidentiality, integrity, availability, identity and access management, data protection, incident response'],
      ['Operations', 'Technical Capabilities', 'Khả năng quan sát (observability), duy trì SLA hệ thống, quản lý sự cố, quản lý bản vá và phát hành', 'Operations Managers, SREs, Service Desk, SysAdmins', 'Observability, incident management, problem management, capacity management, patch management, release management']
    ],
    keyNoteVi: 'Bẫy đề thi CAF kinh điển nhất: Khi đề thi hỏi "Góc nhìn nào đóng vai trò là CẦU NỐI GIỮA CÔNG NGHỆ VÀ KINH DOANH (bridge between technology and business)" hoặc nói về "đào tạo văn hóa, bù đắp khoảng trống kỹ năng (skills gap), cập nhật kỹ năng cho nhân viên" -> ĐÁP ÁN LUÔN LÀ: PEOPLE PERSPECTIVE.'
  },
  {
    id: 'clf-c02-exam-blueprint-matrix',
    title: 'AWS Certified Cloud Practitioner (CLF-C02) 4 Domains & Scoring Matrix',
    titleVi: 'Cấu Trúc 4 Domain & Trọng Số Đề Thi CLF-C02 (Thang điểm 100-1000)',
    category: 'Exam Strategy & Logistics',
    headers: ['Miền Kiến Thức (Domain)', 'Tỷ Trọng (%)', 'Số Câu Dự Kiến (trên 65 câu)', 'Trọng Tâm & Khái Niệm Then Chốt', 'Chiến Thuật Làm Bài & Bẫy Thi'],
    rows: [
      ['Domain 1: Cloud Concepts', '24%', '~16 câu', 'Định nghĩa đám mây, 6 lợi ích (Agility, Elasticity, Pay-as-you-go, Global in minutes), Well-Architected 6 trụ cột, CAF 6 perspectives, Kinh tế học đám mây (Capex vs Opex)', 'Nắm chắc 6 lợi ích và 6 trụ cột Well-Architected. Nhận diện góc nhìn People trong CAF. Phân biệt Capex (chi phí vốn) vs Opex (chi phí vận hành).'],
      ['Domain 2: Security and Compliance', '30%', '~20 câu', 'Mô hình Trách nhiệm chung (Shared Responsibility Model), IAM (Users, Groups, Roles, Policies, MFA), KMS, WAF, Shield, GuardDuty, Macie, Inspector, Artifact tuân thủ', 'LỚN THỨ 2 TRONG ĐỀ! Phân biệt rõ trách nhiệm "OF the cloud" (AWS) vs "IN the cloud" (Khách hàng). Nhớ: Khách hàng quản lý hệ điều hành trên EC2, AWS quản lý hệ điều hành trên RDS/S3.'],
      ['Domain 3: Cloud Technology and Services', '34%', '~22 câu', 'Dịch vụ cốt lõi: Compute (EC2, Lambda, ECS, Fargate), Storage (S3, EBS, EFS), Database (RDS, DynamoDB, Aurora), Networking (VPC, Subnet, IGW, Route 53, CloudFront), Management (CloudWatch, CloudTrail)', 'DOMAIN CHIẾM TỶ TRỌNG CAO NHẤT (34%)! Tập trung vào ca sử dụng thực tế. Nhớ: CloudWatch = Giám sát hiệu năng; CloudTrail = Ghi log kiểm toán API ai đã làm gì.'],
      ['Domain 4: Billing, Pricing, and Support', '12%', '~8 câu', 'Mô hình giá EC2 (On-Demand, Spot, Savings Plans, Reserved), AWS Organizations & Consolidated Billing, Cost Explorer, Budgets, 4 gói Support (Basic, Developer, Business, Enterprise)', 'Dễ ăn điểm tuyệt đối! Nhớ: Spot rẻ nhất (tiết kiệm đến 90%); Consolidated Billing gộp bậc chiết khấu dung lượng; TAM chỉ có ở gói Enterprise Support.']
    ],
    keyNoteVi: 'Quy tắc 64% đậu đề: Domain 2 (30%) + Domain 3 (34%) chiếm tới 64% toàn bộ câu hỏi. Làm chủ 2 domain này cùng với việc đoán không bị trừ điểm và xin thêm 30 phút ESL đảm bảo đỗ trên 900 điểm!'
  },
  {
    id: 'aws-certification-tiers-paths',
    title: 'AWS Certification 4 Tiers & Career Roadmap Matrix',
    titleVi: 'Hệ Thống 4 Cấp Bậc Chứng Chỉ AWS & Lộ Trình Phát Triển Sự Nghiệp',
    category: 'Exam Strategy & Logistics',
    headers: ['Cấp Bậc (Tier)', 'Chứng Chỉ Chính Thức', 'Kinh Nghiệm Khuyến Nghị', 'Lộ Trình Vai Trò Nghề Nghiệp Khuyên Dùng', 'Lệ Phí & Ưu Đãi Voucher'],
    rows: [
      ['1. Foundational', 'Cloud Practitioner (CLF-C02)\nAI Practitioner (AIF-C01)', '0 - 6 tháng', 'Bước khởi đầu cho MỌI vai trò: Sales, Marketing, Quản lý dự án, Lập trình viên mới bắt đầu, Sinh viên', 'Lệ phí: $100 USD\nĐỗ nhận voucher giảm 50% cho kỳ thi tiếp theo!'],
      ['2. Associate', 'Solutions Architect (SAA-C03)\nDeveloper (DVA-C02)\nSysOps Administrator (SOA-C02)\nData Engineer (DEA-C01)\nML Engineer (MLA-C01)', '1 năm thực hành', 'Solutions Architect: CLF -> SAA\nDevOps: CLF -> DVA / SOA\nData Engineer: CLF -> DEA\nAI/ML: CLF + AIF -> MLA', 'Lệ phí: $150 USD\n(Dùng voucher 50% từ CLF chỉ còn $75 USD!)'],
      ['3. Professional', 'Solutions Architect Professional (SAP-C02)\nDevOps Engineer Professional (DOP-C02)', '2+ năm kiến trúc phức tạp', 'Kiến trúc sư giải pháp cao cấp: SAA -> SAP\nKỹ sư trưởng DevOps: DVA / SOA -> DOP', 'Lệ phí: $300 USD\n(Dùng voucher 50% từ Associate chỉ còn $150 USD!)'],
      ['4. Specialty', 'Security - Specialty (SCS-C02)\nAdvanced Networking - Specialty (ANS-C01)\nMachine Learning - Specialty (MLS-C01)', '2-5 năm chuyên sâu', 'Chuyên gia An ninh mạng: SysOps / SAA -> Security Specialty\nChuyên gia Mạng: SAA -> Advanced Networking\nNhà khoa học dữ liệu: SAA / DEA -> ML Specialty', 'Lệ phí: $300 USD\n(Dùng voucher 50% chỉ còn $150 USD!)']
    ],
    keyNoteVi: 'Lộ trình vàng cho 90% kỹ sư công nghệ: Cloud Practitioner (CLF-C02) -> Solutions Architect Associate (SAA-C03) -> Solutions Architect Professional (SAP-C02) + Security Specialty. Tận dụng liên hoàn voucher 50% để không bao giờ phải trả đủ 100% lệ phí thi!'
  }
];

export const KEYWORDS_LOOKUP: KeywordQuickLookup[] = [
  {
    keyword: 'Hadoop cluster / Apache Spark / Big data',
    keywordVi: 'Cụm Hadoop, phân tích Big data',
    service: 'Amazon EMR',
    category: 'Analytics',
    explanationVi: 'Amazon EMR tạo và quản lý cụm Hadoop/Spark trên hàng trăm EC2 instance.'
  },
  {
    keyword: 'Query S3 files using standard SQL / Serverless',
    keywordVi: 'Truy vấn file trên S3 bằng SQL không cần server',
    service: 'Amazon Athena',
    category: 'Analytics',
    explanationVi: 'Athena chạy truy vấn SQL trực tiếp trên file CSV, JSON, Parquet trong S3 với giá ~$5/TB.'
  },
  {
    keyword: 'Data Warehouse / Columnar storage / OLAP',
    keywordVi: 'Kho dữ liệu phân tích / Lưu trữ theo cột',
    service: 'Amazon Redshift',
    category: 'Databases & Analytics',
    explanationVi: 'Redshift là Data Warehouse hiệu năng cao chuyên dùng cho báo cáo phân tích quy mô petabyte.'
  },
  {
    keyword: 'Decouple applications / Message Queue',
    keywordVi: 'Tách rời ứng dụng / Hàng đợi tin nhắn',
    service: 'Amazon SQS',
    category: 'Application Integration',
    explanationVi: 'SQS là hàng đợi trung gian giúp các tầng ứng dụng hoạt động và mở rộng độc lập.'
  },
  {
    keyword: 'Publish/Subscribe / Fan-out notifications',
    keywordVi: 'Thông báo Pub/Sub / Đẩy tin nhắn tới nhiều nơi',
    service: 'Amazon SNS',
    category: 'Application Integration',
    explanationVi: 'SNS đẩy tin đồng loạt tới email, SMS, SQS, Lambda theo mô hình Pub/Sub.'
  },
  {
    keyword: 'Single-digit millisecond latency / NoSQL Key-value',
    keywordVi: 'Độ trễ vài mili giây / NoSQL Key-value serverless',
    service: 'Amazon DynamoDB',
    category: 'Databases',
    explanationVi: 'DynamoDB là CSDL NoSQL serverless hàng đầu của AWS đáp ứng hàng triệu req/s.'
  },
  {
    keyword: 'MongoDB compatibility / JSON documents',
    keywordVi: 'Tương thích MongoDB / Tài liệu JSON',
    service: 'Amazon DocumentDB',
    category: 'Databases',
    explanationVi: 'DocumentDB là bản Aurora tương thích với MongoDB.'
  },
  {
    keyword: 'Graph database / Social network / Knowledge graph',
    keywordVi: 'CSDL đồ thị / Mạng xã hội / Gian lận',
    service: 'Amazon Neptune',
    category: 'Databases',
    explanationVi: 'Neptune là CSDL đồ thị quan hệ cao phục vụ mạng xã hội, gian lận, wikipedia.'
  },
  {
    keyword: 'Time series data / IoT metrics over time',
    keywordVi: 'Dữ liệu chuỗi thời gian / Số đo theo thời gian',
    service: 'Amazon Timestream',
    category: 'Databases',
    explanationVi: 'Timestream tối ưu lưu trữ và truy vấn chuỗi thời gian nhanh gấp 1.000 lần CSDL quan hệ.'
  },
  {
    keyword: 'Centralized serverless ETL / Data Catalog',
    keywordVi: 'Trích xuất, chuyển đổi và nạp dữ liệu (ETL)',
    service: 'AWS Glue',
    category: 'Analytics',
    explanationVi: 'Glue là dịch vụ ETL serverless chuẩn bị dữ liệu cho Redshift/Athena.'
  },
  {
    keyword: 'Audit API calls / Who did what, when',
    keywordVi: 'Kiểm toán lệnh gọi API / Ai làm gì khi nào',
    service: 'AWS CloudTrail',
    category: 'Management & Governance',
    explanationVi: 'CloudTrail ghi lại lịch sử toàn bộ các lệnh gọi API được thực hiện trong tài khoản.'
  },
  {
    keyword: 'Cryptocurrency mining threat / Intelligent threat detection',
    keywordVi: 'Phát hiện đào tiền ảo / Mối đe dọa thông minh',
    service: 'Amazon GuardDuty',
    category: 'Security',
    explanationVi: 'GuardDuty dùng ML phát hiện bất thường từ VPC Flow Logs, DNS log, CloudTrail.'
  },
  {
    keyword: 'Automated vulnerability scanning / CVE for EC2, ECR, Lambda',
    keywordVi: 'Quét lỗ hổng bảo mật tự động cho EC2, container ECR',
    service: 'Amazon Inspector',
    category: 'Security',
    explanationVi: 'Inspector liên tục quét và đối chiếu các gói phần mềm với cơ sở dữ liệu lỗ hổng CVE.'
  },
  {
    keyword: 'Discover sensitive PII data in S3 buckets',
    keywordVi: 'Phát hiện dữ liệu cá nhân nhạy cảm PII trong S3',
    service: 'Amazon Macie',
    category: 'Security',
    explanationVi: 'Macie dùng ML quét nội dung file trong S3 tìm số thẻ, CMND, hộ chiếu, thông tin PII.'
  },
  {
    keyword: 'Compliance reports / PCI DSS, SOC, ISO auditor documents',
    keywordVi: 'Tải báo cáo tuân thủ của kiểm toán viên',
    service: 'AWS Artifact',
    category: 'Security & Compliance',
    explanationVi: 'Artifact là cổng tải báo cáo chứng nhận tuân thủ pháp lý và thỏa thuận bảo mật.'
  },
  {
    keyword: 'Hub and spoke connecting thousands of VPCs and on-prem',
    keywordVi: 'Mô hình sao nối hàng ngàn VPC và on-prem',
    service: 'AWS Transit Gateway',
    category: 'Networking',
    explanationVi: 'Transit Gateway đóng vai trò trung tâm điều phối kết nối mạng quy mô lớn.'
  },
  {
    keyword: 'Private access to S3 and DynamoDB from VPC without internet',
    keywordVi: 'Truy cập riêng tư vào S3 & DynamoDB từ VPC',
    service: 'VPC Gateway Endpoint',
    category: 'Networking',
    explanationVi: 'Chỉ có S3 và DynamoDB là hỗ trợ Gateway Endpoint (miễn phí).'
  },
  {
    keyword: '5G network edge / Ultra-low latency mobile',
    keywordVi: 'Rìa mạng 5G viễn thông / Độ trễ siêu thấp',
    service: 'AWS Wavelength',
    category: 'Compute & Edge',
    explanationVi: 'Wavelength nhúng hạ tầng AWS vào trung tâm dữ liệu nhà mạng viễn thông 5G.'
  },
  {
    keyword: 'Physical server racks deployed in your own data center',
    keywordVi: 'Rack máy chủ vật lý đặt tại data center của bạn',
    service: 'AWS Outposts',
    category: 'Hybrid Infrastructure',
    explanationVi: 'Outposts mang API và dịch vụ AWS về tận hạ tầng tại chỗ của khách hàng.'
  },
  {
    keyword: 'Single login for multiple AWS accounts (SSO)',
    keywordVi: 'Đăng nhập 1 lần cho nhiều tài khoản AWS',
    service: 'AWS IAM Identity Center',
    category: 'Security',
    explanationVi: 'Kế thừa từ AWS SSO, cung cấp cổng đăng nhập tập trung cho toàn tổ chức.'
  },
  {
    keyword: 'Forecast AWS bills for the next 12 months',
    keywordVi: 'Dự báo hóa đơn AWS trong 12 tháng tới',
    service: 'AWS Cost Explorer',
    category: 'Billing',
    explanationVi: 'Cost Explorer là công cụ trực quan duy nhất có khả năng dự báo chi phí 12 tháng.'
  },
  {
    keyword: 'Estimate costs before building architecture',
    keywordVi: 'Ước tính chi phí trước khi triển khai hệ thống',
    service: 'AWS Pricing Calculator',
    category: 'Billing',
    explanationVi: 'Công cụ web tính toán chi phí dự kiến cho các giải pháp kiến trúc cloud.'
  },
  {
    keyword: 'Dedicated Technical Account Manager (TAM) / Concierge',
    keywordVi: 'Có kỹ sư TAM chuyên trách / Hỗ trợ Concierge',
    service: 'Enterprise Support Plan',
    category: 'Support',
    explanationVi: 'Chỉ từ gói Enterprise Support trở lên mới có Technical Account Manager (TAM).'
  },
  {
    keyword: 'Computer vision / Face analysis / Content moderation / Objects in images & video',
    keywordVi: 'Thị giác máy tính, nhận diện đồ vật, khuôn mặt, kiểm duyệt ảnh/video nhạy cảm',
    service: 'Amazon Rekognition',
    category: 'Machine Learning',
    explanationVi: 'Rekognition phân tích ảnh và video: nhận diện đối tượng, phân tích khuôn mặt, người nổi tiếng và kiểm duyệt nội dung.'
  },
  {
    keyword: 'Speech-to-Text / Transcribe audio / Redact PII in audio transcripts',
    keywordVi: 'Chuyển giọng nói thành văn bản, tự động che thông tin cá nhân PII',
    service: 'Amazon Transcribe',
    category: 'Machine Learning',
    explanationVi: 'Transcribe dùng ASR chuyển file âm thanh hoặc luồng thoại thành văn bản, tự động che [PII] trong bản ghi.'
  },
  {
    keyword: 'Text-to-Speech / Lifelike voices / Audiobooks / SSML & Lexicons',
    keywordVi: 'Chuyển văn bản thành giọng nói tự nhiên, đọc sách nói, tùy biến phát âm',
    service: 'Amazon Polly',
    category: 'Machine Learning',
    explanationVi: 'Polly dùng Deep Learning biến chữ viết thành giọng đọc tự nhiên (TTS), hỗ trợ Neural voices và từ điển Lexicons.'
  },
  {
    keyword: 'Neural language translation / Fluent multilingual / Custom Terminology',
    keywordVi: 'Dịch thuật ngôn ngữ tự nhiên đa ngữ, giữ nguyên tên thương hiệu',
    service: 'Amazon Translate',
    category: 'Machine Learning',
    explanationVi: 'Translate dịch văn bản giữa các ngôn ngữ, hỗ trợ Custom Terminology để không dịch sai tên riêng.'
  },
  {
    keyword: 'Conversational AI / Build chatbots / Alexa technology / ASR + NLU',
    keywordVi: 'Xây dựng chatbot đàm thoại, công nghệ của trợ lý ảo Alexa',
    service: 'Amazon Lex',
    category: 'Machine Learning',
    explanationVi: 'Lex là động cơ tạo bot đàm thoại bằng giọng nói và chữ viết, tự động kích hoạt AWS Lambda để xử lý logic.'
  },
  {
    keyword: 'Cloud contact center / Virtual customer call center / IVR routing',
    keywordVi: 'Tổng đài chăm sóc khách hàng ảo trên cloud, phân luồng cuộc gọi',
    service: 'Amazon Connect',
    category: 'Machine Learning',
    explanationVi: 'Connect là hệ thống contact center ảo trên đám mây, tính phí theo phút cuộc gọi, tích hợp sẵn với Amazon Lex.'
  },
  {
    keyword: 'Natural Language Processing NLP / Sentiment analysis / Entity recognition',
    keywordVi: 'Xử lý ngôn ngữ tự nhiên, phân tích cảm xúc (khen/chê), phát hiện thực thể',
    service: 'Amazon Comprehend',
    category: 'Machine Learning',
    explanationVi: 'Comprehend phân tích văn bản phi cấu trúc: phân loại cảm xúc (Positive/Negative), trích xuất thực thể và chủ đề.'
  },
  {
    keyword: 'Build, train, tune, and deploy CUSTOM ML models / Data scientist platform',
    keywordVi: 'Tự xây dựng, huấn luyện và triển khai mô hình ML riêng cho Data Scientist',
    service: 'Amazon SageMaker',
    category: 'Machine Learning',
    explanationVi: 'SageMaker là nền tảng quản lý toàn diện từ gán nhãn (Ground Truth), huấn luyện đến triển khai mô hình ML tùy chỉnh.'
  },
  {
    keyword: 'Intelligent enterprise document search / Natural language internal search',
    keywordVi: 'Tìm kiếm tài liệu nội bộ doanh nghiệp thông minh bằng câu hỏi tự nhiên',
    service: 'Amazon Kendra',
    category: 'Machine Learning',
    explanationVi: 'Kendra là công cụ tìm kiếm tài liệu thông minh kết nối S3, SharePoint, Salesforce để trích xuất trực tiếp câu trả lời.'
  },
  {
    keyword: 'Real-time personalized recommendations / Amazon.com tech',
    keywordVi: 'Gợi ý sản phẩm và nội dung cá nhân hóa thời gian thực (công nghệ Amazon.com)',
    service: 'Amazon Personalize',
    category: 'Machine Learning',
    explanationVi: 'Personalize cung cấp động cơ gợi ý sản phẩm và cá nhân hóa trải nghiệm người dùng dựa trên hành vi khách hàng.'
  },
  {
    keyword: 'Extract text, tables, and forms from scanned documents / PDFs / Invoices',
    keywordVi: 'Trích xuất chữ viết tay, bảng biểu và biểu mẫu từ file scan và PDF',
    service: 'Amazon Textract',
    category: 'Machine Learning',
    explanationVi: 'Textract vượt trội hơn OCR truyền thống nhờ khả năng hiểu cấu trúc bảng (Table) và cặp Khóa-Giá trị (Key-Value) trong hóa đơn/biểu mẫu.'
  },
  {
    keyword: 'Consolidated billing / Hierarchical multi-account governance / Volume discounts',
    keywordVi: 'Thanh toán hợp nhất 1 hóa đơn, quản trị đa tài khoản dạng cây, chiết khấu theo sản lượng',
    service: 'AWS Organizations',
    category: 'Billing & Account Management',
    explanationVi: 'Organizations gộp mọi tài khoản thành viên về 1 hóa đơn do Management Account chi trả, tự động gom dung lượng nhận giá rẻ và chia sẻ RI.'
  },
  {
    keyword: 'Service Control Policies (SCP) / Organization permission boundaries / Guardrails',
    keywordVi: 'Chính sách kiểm soát dịch vụ SCP, rào chắn quyền tối đa cho OU và tài khoản thành viên',
    service: 'Service Control Policies (SCPs)',
    category: 'Security & Governance',
    explanationVi: 'SCP đặt rào chắn lọc quyền cho User/Role (kể cả Root của tài khoản con); SCP KHÔNG BAO GIỜ áp dụng lên tài khoản Quản lý Management Account!'
  },
  {
    keyword: 'Automated Landing Zone / Multi-account blueprints / Preventive & Detective Guardrails',
    keywordVi: 'Thiết lập vùng hạ cánh Landing Zone tự động, bộ quy chuẩn an toàn đa tài khoản',
    service: 'AWS Control Tower',
    category: 'Management & Governance',
    explanationVi: 'Control Tower tự động dựng môi trường đa tài khoản chuẩn mực, tạo sẵn Log Archive & Audit accounts và áp đặt các Guardrails bảo vệ.'
  },
  {
    keyword: 'Share VPC subnets, Transit Gateways across accounts / Avoid resource duplication',
    keywordVi: 'Chia sẻ VPC Subnet và Transit Gateway xuyên tài khoản, tránh nhân bản tài nguyên',
    service: 'AWS RAM (Resource Access Manager)',
    category: 'Networking & Sharing',
    explanationVi: 'AWS RAM cho phép chia sẻ tài nguyên (như Subnet mạng VPC để máy EC2 ở nhiều tài khoản cắm chung vào 1 VPC) mà không cần tạo mới bản sao.'
  },
  {
    keyword: 'Pre-approved standardized IT services / Governed self-service portal / CloudFormation',
    keywordVi: 'Cổng tự phục vụ danh mục ứng dụng/máy chủ CNTT đã được phê duyệt sẵn',
    service: 'AWS Service Catalog',
    category: 'Management & Governance',
    explanationVi: 'Service Catalog cho phép người dùng tự triển khai máy chủ theo chuẩn công ty mà không cần cấp quyền IAM quản trị trực tiếp.'
  },
  {
    keyword: 'Estimate costs before migration / Prospective architecture pricing / Shareable estimate',
    keywordVi: 'Ước tính chi phí trước khi di chuyển, báo giá kiến trúc dự kiến, xuất link chia sẻ',
    service: 'AWS Pricing Calculator',
    category: 'Billing & Cost Management',
    explanationVi: 'Công cụ web công khai (calculator.aws) giúp tính toán trước chi phí hàng tháng của hệ thống trước khi quyết định khởi tạo tài nguyên.'
  },
  {
    keyword: 'Visualize spending trends / Forecast costs up to 12 months ahead / Interactive charts',
    keywordVi: 'Biểu đồ chi tiêu trực quan, phân tích xu hướng và dự báo chi phí 12 tháng tiếp theo',
    service: 'AWS Cost Explorer',
    category: 'Billing & Cost Management',
    explanationVi: 'Cost Explorer giúp theo dõi chi phí lịch sử, lọc theo nhãn Tag/Dịch vụ/Tài khoản và dùng ML dự báo chi tiêu tới 12 tháng tương lai.'
  },
  {
    keyword: 'Proactive cost alerts / Actual or FORECASTED thresholds / Automated budget actions',
    keywordVi: 'Cảnh báo chi phí chủ động theo ngưỡng thực tế HOẶC DỰ BÁO, tự động can thiệp tắt máy',
    service: 'AWS Budgets',
    category: 'Billing & Cost Management',
    explanationVi: 'AWS Budgets đặt ngân sách theo Chi phí, Lượng dùng, RI, Savings Plans và bắn cảnh báo khi tiền thực tế hoặc tiền DỰ KIẾN chạm ngưỡng.'
  },
  {
    keyword: 'Most granular detailed raw billing data / Line-by-line hourly usage / Export to S3 for Athena',
    keywordVi: 'Bộ dữ liệu hóa đơn thô chi tiết nhất, xuất file từng giờ vào S3 để truy vấn bằng Athena',
    service: 'Cost & Usage Report (CUR)',
    category: 'Billing & Cost Management',
    explanationVi: 'CUR là bản ghi tiêu thụ chi tiết nhất trên AWS xuất định kỳ vào S3 dạng CSV/Parquet để phân tích nghiệp vụ sâu bằng Amazon Athena/QuickSight.'
  },
  {
    keyword: 'ML right-sizing recommendations / Downsize over-provisioned EC2, EBS, Lambda',
    keywordVi: 'Machine Learning gợi ý điều chỉnh đúng kích thước máy, thu nhỏ máy EC2/EBS dư công suất',
    service: 'AWS Compute Optimizer',
    category: 'Cost Optimization',
    explanationVi: 'Compute Optimizer phân tích 14 ngày lịch sử CloudWatch để tìm ra tài nguyên over-provisioned và gợi ý hạ cấp để giảm tới 25% chi phí.'
  },
  {
    keyword: '6 Pillars architecture optimization / 7 Core checks vs Full check suite / Idle resources',
    keywordVi: 'Tối ưu kiến trúc theo 6 trụ cột (Bảo mật, Chi phí, Hiệu năng...), kiểm tra tài nguyên bỏ hoang',
    service: 'AWS Trusted Advisor',
    category: 'Management & Governance',
    explanationVi: 'Trusted Advisor đánh giá tài nguyên theo 6 trụ cột; gói Basic/Dev chỉ xem 7 bài cơ bản, gói Business/Enterprise mở khóa toàn bộ bài kiểm tra.'
  },
  {
    keyword: 'Designated Technical Account Manager (TAM) / Concierge Team / 15-minute response SLA',
    keywordVi: 'Kỹ sư TAM chuyên trách, đội chuyên viên hóa đơn Concierge, SLA phản hồi khẩn cấp 15 phút',
    service: 'AWS Enterprise Support Plan',
    category: 'Support Plans',
    explanationVi: 'Chỉ có ở gói Enterprise Support: sở hữu kỹ sư TAM đồng hành riêng, đội Concierge hỗ trợ thanh toán, và cam kết phản hồi < 15 phút cho sự cố sống còn.'
  },
  {
    keyword: 'Temporary credentials / Limited-privilege / AssumeRole API / Session Token / Expiration 15m-36h',
    keywordVi: 'Thông tin xác thực tạm thời, quyền hạn giới hạn, API AssumeRole, Session Token, tự động xoay vòng cho EC2 Role',
    service: 'AWS STS (Security Token Service)',
    category: 'Security & Identity',
    explanationVi: 'Cấp phát bộ khóa bảo mật tạm thời (bắt đầu bằng ASIA + Secret Key + Session Token) dùng cho ủy quyền chéo tài khoản và IAM Role cho EC2/Lambda.'
  },
  {
    keyword: 'User directory for mobile/web apps / Sign-up & Sign-in / Social login (Google, Facebook, Apple) / Millions of users',
    keywordVi: 'Danh bạ người dùng cho ứng dụng web/mobile, đăng ký và đăng nhập, đăng nhập mạng xã hội Google/Facebook cho hàng triệu khách hàng',
    service: 'Amazon Cognito User Pools',
    category: 'Security & Identity',
    explanationVi: 'User Pools đóng vai trò là cơ sở dữ liệu danh bạ người dùng (CUP) hỗ trợ đăng ký, đăng nhập và trả về mã JWT cho khách hàng của app di động/web.'
  },
  {
    keyword: 'Exchange tokens for temporary AWS credentials / Direct access to S3 or DynamoDB / Guest unauthenticated access',
    keywordVi: 'Đổi token lấy thông tin bảo mật AWS tạm thời từ STS, truy cập trực tiếp S3/DynamoDB từ ứng dụng di động, hỗ trợ khách vãng lai',
    service: 'Amazon Cognito Identity Pools',
    category: 'Security & Identity',
    explanationVi: 'Identity Pools (Federated Identities) phân quyền truy cập tài nguyên AWS trực tiếp cho ứng dụng khách thông qua việc cấp thông tin xác thực tạm thời từ STS.'
  },
  {
    keyword: 'Microsoft Active Directory on AWS / AD trust relationship to on-premises / AD Connector proxy / Simple AD Samba 4',
    keywordVi: 'Tích hợp Microsoft Active Directory, liên kết tin cậy Forest Trust với máy chủ On-premises, cổng proxy AD Connector, Simple AD Samba 4',
    service: 'AWS Directory Services',
    category: 'Security & Identity',
    explanationVi: 'Nhóm giải pháp kết nối hạ tầng AWS với Microsoft Active Directory: Managed Microsoft AD (AD Windows thật), AD Connector (proxy), và Simple AD (Samba 4).'
  },
  {
    keyword: 'Single Sign-On (SSO) / Access multiple AWS accounts with one login / AWS Access Portal / Permission Sets / Formerly AWS SSO',
    keywordVi: 'Đăng nhập một lần (SSO) vào nhiều tài khoản AWS và ứng dụng doanh nghiệp SaaS, cổng AWS Access Portal, Permission Sets tập trung, tên cũ AWS SSO',
    service: 'AWS IAM Identity Center',
    category: 'Security & Identity',
    explanationVi: 'IAM Identity Center (tiền thân là AWS SSO) giúp nhân viên chỉ cần 1 tài khoản duy nhất để truy cập toàn bộ tài khoản trong AWS Organizations và ứng dụng SaaS.'
  },
  {
    keyword: 'Virtual Desktop Infrastructure (VDI) in the cloud / Desktop-as-a-Service (DaaS) / Windows and Linux cloud desktops',
    keywordVi: 'Hạ tầng máy tính ảo VDI trên đám mây, Desktop-as-a-Service (DaaS), máy tính để bàn Windows và Linux ảo',
    service: 'Amazon WorkSpaces',
    category: 'End-User Computing',
    explanationVi: 'Cung cấp toàn bộ máy tính để bàn ảo Windows/Linux có thể truy cập từ xa thay thế hệ thống máy tính VDI tại văn phòng.'
  },
  {
    keyword: 'Stream desktop application to web browser / Non-persistent app streaming / Run legacy Windows app without installing',
    keywordVi: 'Truyền (stream) ứng dụng desktop vào trình duyệt web, không cài đặt phần mềm trên máy tính người dùng',
    service: 'Amazon AppStream 2.0',
    category: 'End-User Computing',
    explanationVi: 'Truyền một phần mềm desktop cụ thể (SAP, Blender, CAD) vào trình duyệt web trên bất kỳ máy tính/tablet nào.'
  },
  {
    keyword: 'Centralized automated backup across AWS services / Backup plans & retention / Backup Vault Lock (WORM against ransomware)',
    keywordVi: 'Quản lý sao lưu tự động tập trung trên nhiều dịch vụ AWS (EBS, RDS, DynamoDB, EFS, S3), khóa kho Backup Vault Lock chống ransomware',
    service: 'AWS Backup',
    category: 'Storage & Management',
    explanationVi: 'Thiết lập kế hoạch sao lưu tập trung, sao chép chéo Region và khóa WORM chống xóa dữ liệu sao lưu trước thời hạn.'
  },
  {
    keyword: 'Continuous block-level replication to low-cost staging / Rapid automated failover / RTO in minutes, RPO in seconds',
    keywordVi: 'Sao chép liên tục mức khối vào vùng đệm staging giá rẻ, phục hồi nhanh chóng khi thảm họa (RTO phút, RPO giây)',
    service: 'AWS Elastic Disaster Recovery (DRS)',
    category: 'Migration & DR',
    explanationVi: 'Đồng bộ ổ đĩa máy chủ liên tục vào staging area trên AWS và tự động chuyển đổi thành máy chủ EC2 production khi xảy ra sự cố.'
  },
  {
    keyword: 'Rehost / Lift and Shift server migration to AWS / Minimal downtime / Automated server replication',
    keywordVi: 'Chiến lược Rehost (Lift and Shift) chuyển máy chủ lên AWS EC2 không đổi code, tự động hóa sao chép máy chủ',
    service: 'AWS Application Migration Service (MGN)',
    category: 'Migration & Transfer',
    explanationVi: 'Dịch vụ chính thức của AWS tự động hóa sao chép đĩa máy chủ và chuyển đổi lên máy ảo EC2 với thời gian dừng máy tối thiểu.'
  },
  {
    keyword: 'Discover on-premises server inventory, performance, and network dependencies / Migration planning / Agentless & Agent-based',
    keywordVi: 'Khám phá danh mục máy chủ on-premises, hiệu suất sử dụng CPU/RAM và sơ đồ phụ thuộc mạng để lập kế hoạch di chuyển',
    service: 'AWS Application Discovery Service',
    category: 'Migration & Transfer',
    explanationVi: 'Quét hệ thống máy chủ tại chỗ bằng Discovery Connector (VMware) hoặc Discovery Agent để lập bản đồ ứng dụng cho dự án migration.'
  },
  {
    keyword: 'Business case for cloud migration / Compare on-premises TCO with AWS cloud costs / Analyze over-provisioned servers',
    keywordVi: 'Xây dựng Business Case cho việc di chuyển, so sánh chi phí TCO tại chỗ với AWS dựa trên số liệu sử dụng thực tế',
    service: 'AWS Migration Evaluator',
    category: 'Migration & Transfer',
    explanationVi: 'Dịch vụ miễn phí giúp CFO đánh giá tài chính, phát hiện máy chủ dư thừa cấu hình và dự toán ngân sách tiết kiệm khi lên AWS.'
  },
  {
    keyword: 'Single pane of glass to track migration progress across multiple tools (MGN, DMS, partners)',
    keywordVi: 'Bảng điều khiển trung tâm duy nhất theo dõi tiến độ di chuyển ứng dụng trên nhiều công cụ AWS và đối tác',
    service: 'AWS Migration Hub',
    category: 'Migration & Transfer',
    explanationVi: 'Màn hình tập trung theo dõi trạng thái di chuyển máy chủ (MGN) và cơ sở dữ liệu (DMS) theo từng nhóm ứng dụng.'
  },
  {
    keyword: 'Serverless visual workflow orchestration / State machine / Branching, retries, and human approvals for Lambda',
    keywordVi: 'Điều phối workflow trực quan serverless, máy trạng thái kết nối nhiều hàm Lambda, rẽ nhánh và phê duyệt bởi con người',
    service: 'AWS Step Functions',
    category: 'Application Integration',
    explanationVi: 'Xây dựng quy trình xử lý nhiều bước tự động (thanh toán, xử lý đơn hàng) phối hợp Lambda, ECS và các dịch vụ AWS khác.'
  },
  {
    keyword: 'Chaos engineering / Inject controlled faults into AWS workloads / Test application resilience and alarms',
    keywordVi: 'Kỹ thuật Chaos Engineering, cố tình tạo lỗi có kiểm soát trên hệ thống để kiểm tra khả năng phục hồi và cảnh báo',
    service: 'AWS Fault Injection Simulator (FIS)',
    category: 'Management & Governance',
    explanationVi: 'Mô phỏng tắt máy ảo EC2, ngốn RAM, trễ mạng có kiểm soát với cơ chế Stop Conditions an toàn để kiểm chứng độ bền vững.'
  },
  {
    keyword: 'Fastest way for mobile & web developers to build full-stack apps / Auth, S3 storage, GraphQL API, and CI/CD hosting',
    keywordVi: 'Nền tảng phát triển ứng dụng full-stack nhanh nhất cho web/mobile, tích hợp Cognito Auth, Storage, AppSync và web hosting CI/CD',
    service: 'AWS Amplify',
    category: 'Frontend Web & Mobile',
    explanationVi: 'Bộ công cụ, thư viện UI và hosting toàn cầu giúp lập trình viên frontend tạo và triển khai ứng dụng full-stack lên AWS cực nhanh.'
  },
  {
    keyword: 'Managed GraphQL API / Real-time updates with WebSockets / Offline data synchronization',
    keywordVi: 'Dịch vụ GraphQL API được quản lý, cập nhật dữ liệu thời gian thực qua WebSockets, đồng bộ dữ liệu ngoại tuyến cho mobile',
    service: 'AWS AppSync',
    category: 'Frontend Web & Mobile',
    explanationVi: 'Tạo API GraphQL gom nhiều nguồn dữ liệu (DynamoDB, Lambda) với khả năng push tin nhắn real-time và đồng bộ offline.'
  },
  {
    keyword: 'Control satellite communications / Downlink satellite data directly into AWS / Eliminate ground antenna infrastructure',
    keywordVi: 'Điều khiển thông tin liên lạc vệ tinh, thu dữ liệu viễn thám trực tiếp vào AWS không cần xây ăng-ten trạm mặt đất',
    service: 'AWS Ground Station',
    category: 'Satellite',
    explanationVi: 'Hệ thống trạm ăng-ten toàn cầu của AWS cho phép liên lạc và tải dữ liệu vệ tinh trực tiếp vào S3 và EC2 theo phút sử dụng.'
  },
  {
    keyword: 'Targeted multichannel marketing / Email, SMS, Push notifications / Audience segmentation and engagement analytics',
    keywordVi: 'Tiếp thị đa kênh có phân khúc khách hàng, gửi Email, SMS, Push Notification dựa trên hành vi và đo lường chuyển đổi',
    service: 'Amazon Pinpoint',
    category: 'Customer Engagement',
    explanationVi: 'Dịch vụ tiếp thị marketing chuyên nghiệp phân tích hành vi người dùng, gửi thông điệp cá nhân hóa đa kênh.'
  },
  {
    keyword: 'Review architectures against best practice pillars / Guided questionnaire / Risk identification & action plan',
    keywordVi: 'Rà soát kiến trúc hệ thống theo 6 trụ cột chuẩn mực, trả lời bộ câu hỏi, nhận kế hoạch cải tiến và đánh giá rủi ro',
    service: 'AWS Well-Architected Tool',
    category: 'Architecture & Governance',
    explanationVi: 'Công cụ miễn phí trong Console giúp kiểm toán workload theo 6 trụ cột Well-Architected Framework và tự động lập kế hoạch cải tiến (Action Plan).'
  },
  {
    keyword: 'Measure carbon emissions / Forecast environmental impact / Track progress toward 100% renewable energy',
    keywordVi: 'Đo lường lượng khí thải carbon từ tài khoản AWS, dự báo phát thải và theo dõi tiến độ hướng tới 100% năng lượng tái tạo',
    service: 'Customer Carbon Footprint Tool',
    category: 'Billing & Sustainability',
    explanationVi: 'Công cụ nằm trong Billing & Cost Management giúp doanh nghiệp đo lường và lập báo cáo ESG về lượng khí thải carbon phát sinh từ hạ tầng AWS.'
  },
  {
    keyword: 'Bridge between technology and business / Organizational change management / Training, cloud fluency, upskilling staff',
    keywordVi: 'Cầu nối giữa công nghệ và kinh doanh, quản trị thay đổi tổ chức, đào tạo nhân sự, bù đắp khoảng trống kỹ năng đám mây',
    service: 'AWS CAF - People Perspective',
    category: 'Cloud Adoption Framework',
    explanationVi: 'Góc nhìn Con người (People) trong CAF chịu trách nhiệm đào tạo kỹ năng đám mây, tiến hóa văn hóa tổ chức và kết nối công nghệ với nghiệp vụ.'
  },
  {
    keyword: 'Cloud financial management / Risk management / Measuring benefits and realizing business value of cloud migration',
    keywordVi: 'Quản lý tài chính đám mây (FinOps), quản trị rủi ro và đo lường lợi ích dự án di chuyển lên cloud',
    service: 'AWS CAF - Governance Perspective',
    category: 'Cloud Adoption Framework',
    explanationVi: 'Góc nhìn Quản trị (Governance) trong CAF kiểm soát rủi ro, phân bổ ngân sách chi phí đám mây và tối đa hóa ROI chuyển đổi số.'
  },
  {
    keyword: 'Match instance types and sizes to workload performance at lowest cost / Reduce over-provisioning / Before and continuously after migration',
    keywordVi: 'Chọn đúng loại và kích thước instance khớp với tải thực tế với chi phí tối ưu, giảm cấp phát dư thừa, thực hiện trước và liên tục sau khi lên cloud',
    service: 'Right Sizing',
    category: 'Cost Optimization',
    explanationVi: 'Kỹ thuật tối ưu liên tục: chọn máy chủ đúng công suất trước khi di chuyển và định kỳ dùng CloudWatch/Cost Explorer sau khi chạy thực tế.'
  },
  {
    keyword: 'Team of AWS experts operate and manage your AWS infrastructure 24/7/365 / Patching, monitoring, incident, change management',
    keywordVi: 'Đội ngũ chuyên gia AWS trực tiếp vận hành, giám sát và bảo trì hạ tầng AWS của doanh nghiệp 24/7/365, quản lý bản vá và xử lý sự cố',
    service: 'AWS Managed Services (AMS)',
    category: 'Management & Operations',
    explanationVi: 'Dịch vụ vận hành ủy quyền cấp doanh nghiệp: kỹ sư AWS thay thế bạn thực hiện vá lỗi OS, trực ca 24/7, xử lý sự cố và kiểm soát thay đổi hạ tầng.'
  },
  {
    keyword: 'Community Q&A forum managed by AWS / Earn expert reputation points / Unresolved tier questions escalate to AWS Support',
    keywordVi: 'Diễn đàn hỏi đáp cộng đồng do AWS quản lý, tích lũy điểm uy tín chuyên gia, câu hỏi chưa được giải đáp sẽ chuyển tới kỹ sư AWS Support',
    service: 'AWS re:Post',
    category: 'Support & Community',
    explanationVi: 'Nền tảng cộng đồng chia sẻ tri thức và hỏi đáp kỹ thuật AWS thay thế AWS Forums, có cơ chế gắn kết với kỹ sư hỗ trợ chính thức.'
  },
  {
    keyword: 'Curated FAQ answers and tutorials by AWS staff / Frequently asked technical questions / Self-service troubleshooting articles',
    keywordVi: 'Kho tài liệu các câu hỏi thường gặp nhất và bài viết hướng dẫn khắc phục sự cố do chính kỹ sư AWS biên soạn',
    service: 'AWS Knowledge Center',
    category: 'Support & Documentation',
    explanationVi: 'Bộ sưu tập câu trả lời chính thức giải quyết các lỗi và thắc mắc phổ biến nhất khi cấu hình các dịch vụ AWS.'
  },
  {
    keyword: 'Digital catalog to find, test, and buy third-party software / 1-click AMI launch / Consolidated billing on AWS invoice',
    keywordVi: 'Chợ số tìm kiếm, dùng thử và mua phần mềm từ bên thứ ba (ISV), triển khai nhanh bằng AMI, tính chung vào hóa đơn hàng tháng của AWS',
    service: 'AWS Marketplace',
    category: 'AWS Ecosystem',
    explanationVi: 'Thị trường phần mềm doanh nghiệp cho phép mua bản quyền tường lửa, cơ sở dữ liệu, công cụ DevOps từ các hãng thứ 3 tính gộp vào bill AWS.'
  },
  {
    keyword: 'Pre-built automated reference architectures / CloudFormation templates deployed in minutes / Vetted best practices',
    keywordVi: 'Kiến trúc tham chiếu mẫu dựng sẵn tự động triển khai qua template CloudFormation chỉ trong vài phút theo chuẩn tốt nhất',
    service: 'AWS Solutions Library (Quick Starts)',
    category: 'AWS Ecosystem',
    explanationVi: 'Thư viện các giải pháp kiến trúc đã kiểm định bởi kỹ sư AWS, giúp dựng toàn bộ hệ thống phức tạp (CI/CD, WordPress, Data Lake) với 1 click.'
  },
  {
    keyword: 'Global team of AWS experts who collaborate with APN partners to deliver enterprise cloud transformation projects',
    keywordVi: 'Đội ngũ chuyên gia tư vấn triển khai của AWS đồng hành cùng đối tác APN thực hiện các dự án chuyển đổi đám mây lớn',
    service: 'AWS Professional Services (ProServe)',
    category: 'Consulting & Services',
    explanationVi: 'Nhóm tư vấn chiến lược chuyên sâu của AWS hỗ trợ khách hàng doanh nghiệp thiết kế và thực thi lộ trình chuyển đổi số thành công.'
  },
  {
    keyword: 'Extra 30 minutes exam accommodation / Non-native English speakers / Request before scheduling / Does not expire',
    keywordVi: 'Chính sách hỗ trợ cộng thêm 30 phút làm bài cho người không bản ngữ tiếng Anh, xin trước khi đặt lịch thi, hiệu lực trọn đời',
    service: 'ESL +30 Minutes Accommodation',
    category: 'Exam Logistics',
    explanationVi: 'Quyền lợi dành cho thí sinh không nói tiếng Anh bản ngữ khi thi bằng tiếng Anh, tăng thời gian làm bài từ 90 lên 120 phút. Phải xin và được duyệt trước khi đặt lịch thi trên Pearson VUE.'
  },
  {
    keyword: '50% discount voucher for next AWS exam / Claim in Benefits tab / Passing any AWS certification benefit',
    keywordVi: 'Voucher giảm giá 50% cho kỳ thi AWS tiếp theo, nhận trong tab Benefits sau khi thi đỗ bất kỳ chứng chỉ AWS nào',
    service: 'AWS 50% Exam Discount Voucher',
    category: 'Exam Logistics',
    explanationVi: 'Đỗ một kỳ thi AWS bất kỳ (kể cả Cloud Practitioner) sẽ được cấp 1 voucher giảm 50% lệ phí cho kỳ thi tiếp theo (Associate còn $75, Pro/Specialty còn $150).'
  },
  {
    keyword: 'Take exam online from home / Webcam proctoring / System test / Clean clear desk / 360 room scan',
    keywordVi: 'Thi online tại nhà qua webcam với giám thị từ xa, chạy system test trước, bàn làm việc dọn sạch hoàn toàn, quay camera 360 độ quanh phòng',
    service: 'Pearson VUE OnVUE',
    category: 'Exam Logistics',
    explanationVi: 'Hình thức thi trực tuyến tại nhà của Pearson VUE đòi hỏi kết nối internet ổn định, webcam/micro và phòng riêng biệt yên tĩnh.'
  },
  {
    keyword: 'Official digital badging / Share verifiable certification credentials on LinkedIn / Provided by Credly',
    keywordVi: 'Huy hiệu số chứng chỉ chính thức, chia sẻ thành tích có thể xác thực lên LinkedIn qua nền tảng Credly',
    service: 'AWS Certified Digital Badge (Credly)',
    category: 'Next Steps',
    explanationVi: 'Huy hiệu số được AWS cấp thông qua Credly trong vòng 2-5 ngày sau khi thi đỗ, cho phép nhà tuyển dụng xác minh tính xác thực trực tuyến.'
  },
  {
    keyword: 'Most popular AWS certification progression / Design cost-effective, resilient, high-performing cloud architectures',
    keywordVi: 'Lộ trình phát triển chứng chỉ phổ biến nhất: Cloud Practitioner -> Solutions Architect Associate (SAA) -> Solutions Architect Professional (SAP)',
    service: 'Solutions Architect Career Track',
    category: 'Career Roadmap',
    explanationVi: 'Lộ trình kiến trúc sư giải pháp là chứng chỉ có giá trị cao nhất trên thị trường tuyển dụng điện toán đám mây toàn cầu.'
  }
];
