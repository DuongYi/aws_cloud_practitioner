import { SectionItem } from '../../types';

export const section20Data: SectionItem = {
  id: 'section-20',
  sectionNumber: 20,
  titleEn: 'Other Services & Cloud Migration: WorkSpaces, AppStream, Backup, Disaster Recovery & The 7 Rs',
  titleVi: 'Các Dịch vụ Chuyên biệt & Di chuyển lên Cloud: WorkSpaces, AppStream, Backup, Disaster Recovery & 7 Rs Migration',
  domain: 'Domain 3: Cloud Technology and Services',
  weightPercentage: '34%',
  badge: 'Migration & DR Core (34% Exam)',
  overviewEn: 'Section 20 covers specialized end-user computing, mobile/application development, edge IoT, and most crucially: Enterprise Cloud Migration strategies (The 7 Rs), Disaster Recovery (DR) models, and automated migration tooling tested under Domain 3 (Cloud Technology and Services, 34% of CLF-C02). In this section, the CLF-C02 exam frequently tests high-level service definitions, differences between paired services (e.g., WorkSpaces vs AppStream 2.0; AppSync vs Amplify; DRS vs Backup), the 4 standard disaster recovery strategies arranged by RTO/RPO and cost, and the 7 Rs of cloud migration decision framework.',
  overviewVi: 'Section 20 bao gồm các dịch vụ điện toán người dùng cuối (End-User Computing), phát triển ứng dụng di động/web, Internet of Things (IoT), và đặc biệt quan trọng: Các chiến lược Di chuyển Doanh nghiệp lên Đám mây (7 Rs Migration), 4 mô hình Khắc phục Thảm họa (Disaster Recovery - DR), cùng bộ công cụ tự động hóa di chuyển thuộc Domain 3 (Công nghệ và Dịch vụ Đám mây - chiếm 34% đề thi CLF-C02). Trong phần này, bài thi CLF-C02 chủ yếu kiểm tra định nghĩa mục đích cốt lõi (One-liner definition), phân biệt các cặp dịch vụ dễ gây nhầm lẫn (WorkSpaces vs AppStream 2.0; AppSync vs Amplify; DRS vs AWS Backup), thứ tự 4 chiến lược DR theo chi phí và thời gian khôi phục (RTO/RPO), và ma trận quyết định 7 Rs khi di chuyển hệ thống lên AWS.',
  quickExamFacts: [
    {
      en: 'WorkSpaces vs AppStream 2.0: Amazon WorkSpaces delivers a full virtual desktop experience (Desktop-as-a-Service - DaaS, Windows or Linux desktop OS). Amazon AppStream 2.0 streams a single, specific desktop application directly into any standard web browser on any client device without provisioning an entire desktop environment.',
      vi: 'WorkSpaces vs AppStream 2.0: Amazon WorkSpaces cung cấp toàn bộ máy tính để bàn ảo (Desktop-as-a-Service - DaaS, hệ điều hành desktop Windows hoặc Linux). Amazon AppStream 2.0 chỉ truyền tải (stream) duy nhất 1 ứng dụng desktop cụ thể trực tiếp vào bất kỳ trình duyệt web tiêu chuẩn nào mà không cần tạo toàn bộ môi trường desktop ảo.',
      isCoreHighlight: true
    },
    {
      en: 'AppSync vs Amplify: AWS AppSync is a managed GraphQL API service with real-time WebSocket subscriptions and offline data synchronization. AWS Amplify is a complete frontend developer framework/platform (CLI, UI libraries, hosting, authentication, backend integration) that accelerates building full-stack web and mobile apps.',
      vi: 'AppSync vs Amplify: AWS AppSync là dịch vụ API GraphQL được quản lý hỗ trợ cập nhật dữ liệu thời gian thực (real-time qua WebSocket) và đồng bộ dữ liệu ngoại tuyến (offline sync). AWS Amplify là bộ công cụ và nền tảng phát triển frontend toàn diện (CLI, thư viện UI, web hosting, xác thực Auth, kết nối backend) giúp tăng tốc xây dựng ứng dụng web/di động full-stack.',
      isCoreHighlight: true
    },
    {
      en: '4 Disaster Recovery Strategies (Cost & RTO Order): (1) Backup & Restore (lowest cost, highest RTO/downtime hours to days); (2) Pilot Light (core data replicated, minimal core services on standby, servers launched on disaster); (3) Warm Standby (scaled-down minimum working copy of whole system running 24/7); (4) Multi-Site Active-Active (highest cost, near-zero RTO/RPO seconds, full traffic served across multiple regions simultaneously).',
      vi: '4 Chiến lược Phục hồi Thảm họa (Thứ tự Chi phí & RTO): (1) Backup & Restore (chi phí rẻ nhất, thời gian khôi phục RTO lâu nhất từ vài giờ đến vài ngày); (2) Pilot Light (chỉ sao chép dữ liệu cốt lõi, khi thảm họa xảy ra mới bật máy chủ); (3) Warm Standby (bản sao thu nhỏ của toàn bộ hệ thống chạy 24/7 ở mức tối thiểu); (4) Multi-Site Active-Active (chi phí đắt nhất, RTO/RPO gần bằng 0 giây, chia tải song song đa Region).',
      isCoreHighlight: true
    },
    {
      en: 'The 7 Rs of Cloud Migration: (1) Retire (turn off unneeded servers, saving 10-20%); (2) Retain (do nothing, keep on-premises due to compliance/legacy constraints); (3) Relocate (move hypervisor VMs e.g. VMware to AWS without changes); (4) Rehost / Lift & Shift (move servers as-is to EC2 via AWS MGN); (5) Replatform / Lift, Tinker & Shift (minor optimizations without code changes, e.g. move DB to Amazon RDS); (6) Repurchase / Drop & Shop (switch to modern SaaS, e.g. self-hosted CRM to Salesforce); (7) Refactor / Re-architect (complete cloud-native rewrite to serverless/microservices, highest business value).',
      vi: '7 Chiến lược Di chuyển lên Cloud (7 Rs): (1) Retire (tắt bỏ ứng dụng thừa, tiết kiệm ngay 10-20%); (2) Retain (giữ lại tại chỗ do rào cản tuân thủ/pháp lý); (3) Relocate (di dời máy ảo cùng nền tảng như VMware lên AWS không cần cấu hình lại); (4) Rehost / Lift and Shift (chuyển nguyên khối máy chủ lên EC2 không đổi code nhờ AWS MGN); (5) Replatform / Lift, Tinker & Shift (tối ưu nhẹ kiến trúc không đổi code, ví dụ chuyển DB sang RDS); (6) Repurchase / Drop & Shop (bỏ phần mềm tự host, mua dịch vụ SaaS hiện đại như Salesforce); (7) Refactor / Re-architect (thiết kế và viết lại hoàn toàn theo cloud-native serverless, giá trị cao nhất).',
      isCoreHighlight: true
    },
    {
      en: 'AWS DRS vs AWS Backup: AWS Elastic Disaster Recovery (DRS) minimizes downtime via continuous block-level server replication into a low-cost staging area for rapid failover (RTO in minutes). AWS Backup is a centralized backup management service for creating periodic scheduled point-in-time snapshots and lifecycle policies across AWS services (EBS, RDS, DynamoDB, EFS, S3).',
      vi: 'AWS DRS vs AWS Backup: AWS Elastic Disaster Recovery (DRS) giảm thiểu thời gian gián đoạn thông qua sao chép liên tục mức khối (block-level continuous replication) vào vùng đệm staging chi phí thấp để chuyển đổi dự phòng khẩn cấp trong vài phút (RTO tính bằng phút). AWS Backup là dịch vụ quản lý sao lưu tập trung theo lịch định kỳ (snapshot theo thời điểm) và chính sách vòng đời trên nhiều dịch vụ AWS.',
      isCoreHighlight: true
    },
    {
      en: 'AWS Step Functions vs Amazon EventBridge: Step Functions is a visual workflow state machine orchestrating multi-step workflows, loops, conditions, retries, and human approvals for serverless microservices. EventBridge is a serverless event bus routing real-time events between SaaS apps and AWS services based on JSON filtering rules.',
      vi: 'AWS Step Functions vs Amazon EventBridge: Step Functions là máy trạng thái (state machine) trực quan điều phối các workflow nhiều bước, vòng lặp, rẽ nhánh, thử lại và phê duyệt thủ công cho kiến trúc serverless. EventBridge là bus sự kiện serverless định tuyến các sự kiện thời gian thực giữa ứng dụng SaaS và dịch vụ AWS dựa trên quy tắc lọc JSON.',
      isCoreHighlight: true
    }
  ],
  lectures: [
    {
      id: 'lec-234',
      number: 234,
      titleEn: 'Other Services Section Introduction',
      titleVi: 'Giới thiệu Phần Các Dịch vụ Khác & Chiến lược Ôn thi CLF-C02',
      duration: '3m',
      summaryEn: 'Introduction to Section 20. Learn the proven strategy for exam success on AWS specialized services: focus on one-sentence core definitions, identify primary target audiences, recognize service pairs, and memorize decision triggers for migration and disaster recovery.',
      summaryVi: 'Giới thiệu Section 20. Nắm vững chiến lược ôn thi đạt điểm tối đa cho các dịch vụ chuyên biệt của AWS: tập trung vào định nghĩa cốt lõi 1 câu, nhận diện đúng đối tượng phục vụ, phân biệt các cặp dịch vụ song hành và ghi nhớ các từ khóa phản xạ cho phần Di chuyển (Migration) và Khắc phục Thảm họa (Disaster Recovery).',
      keyPointsEn: [
        'CLF-C02 Exam Scope: This section covers services that typically appear as 1 or 2 specific questions or as multiple-choice distractors on the exam.',
        'One-Liner Definition Strategy: You do not need deep configuration knowledge. You only need to know what problem the service solves in one clear sentence.',
        'Service Categorization: (1) End-User Computing (WorkSpaces, AppStream 2.0); (2) Mobile & Application Development (AppSync, Amplify, Device Farm, Infrastructure Composer); (3) IoT & Edge (IoT Core, Ground Station); (4) Governance & Testing (FIS); (5) Data Protection & DR (AWS Backup, DRS, 4 DR strategies); (6) Cloud Migration (7 Rs, Discovery Service, Migration Evaluator, MGN, Migration Hub); (7) Orchestration & Engagement (Step Functions, Amazon Pinpoint).',
        'Distractor Identification: Knowing these services prevents being misled by plausible-sounding decoy options in exam questions.'
      ],
      keyPointsVi: [
        'Phạm vi đề thi CLF-C02: Phần này bao gồm các dịch vụ thường xuất hiện dưới dạng câu hỏi nhận biết định nghĩa trực tiếp hoặc đóng vai trò các đáp án nhiễu (distractors) cần loại trừ.',
        'Chiến lược \"Định nghĩa Một Câu\": Bạn không cần biết cấu hình chi tiết chuyên sâu, chỉ cần thuộc nằm lòng dịch vụ đó sinh ra để giải quyết bài toán gì trong đúng 1 câu ngắn gọn.',
        'Phân nhóm dịch vụ: (1) Điện toán người dùng cuối (WorkSpaces, AppStream 2.0); (2) Phát triển Web/Mobile (AppSync, Amplify, Device Farm, Infrastructure Composer); (3) Vệ tinh & IoT (IoT Core, Ground Station); (4) Thử nghiệm chịu lỗi (FIS); (5) Bảo vệ dữ liệu & DR (AWS Backup, DRS, 4 chiến lược DR); (6) Di chuyển lên Đám mây (7 Rs, Discovery Service, Migration Evaluator, MGN, Migration Hub); (7) Điều phối & Tương tác (Step Functions, Pinpoint).',
        'Kỹ năng loại trừ đáp án nhiễu: Hiểu rõ công dụng của các dịch vụ này giúp bạn tự tin loại ngay các phương án mồi nhử trong phòng thi.'
      ],
      examTipsEn: [
        'Do not spend hours reading whitepapers for niche services. Memorize the keyword table and key use cases highlighted in this section.',
        'Whenever an exam question describes a scenario matching a niche requirement (e.g., streaming a Windows 3D CAD app into Chrome), the specialized service is almost always the correct answer!'
      ],
      examTipsVi: [
        'Không mất quá nhiều thời gian đào sâu tài liệu kỹ thuật phức tạp cho các dịch vụ này. Hãy ghi nhớ bảng từ khóa phản xạ và kịch bản sử dụng điển hình.',
        'Khi câu hỏi thi mô tả một bài toán chuyên biệt (ví dụ: stream ứng dụng đồ họa 3D CAD vào trình duyệt Chrome mà không cài đặt), dịch vụ chuyên biệt tương ứng gần như chắc chắn là đáp án đúng!'
      ],
      isCore: false
    },
    {
      id: 'lec-235',
      number: 235,
      titleEn: 'Amazon WorkSpaces Overview',
      titleVi: 'Tổng quan Amazon WorkSpaces - Máy tính Để bàn Ảo (DaaS)',
      duration: '7m',
      summaryEn: 'Comprehensive overview of Amazon WorkSpaces, a fully managed, secure Desktop-as-a-Service (DaaS) solution that provisions Windows and Linux cloud desktops. Understand enterprise use cases, Active Directory integration, KMS encryption, BYOL, and cost models.',
      summaryVi: 'Tổng quan toàn diện về Amazon WorkSpaces - giải pháp Desktop-as-a-Service (DaaS) bảo mật, được quản lý toàn diện giúp cấp phát máy tính để bàn ảo Windows và Linux trên đám mây. Hiểu rõ các bài toán doanh nghiệp, tích hợp Active Directory, mã hóa KMS, mang bản quyền riêng (BYOL) và mô hình chi phí.',
      keyPointsEn: [
        'Definition: Amazon WorkSpaces is a fully managed Desktop-as-a-Service (DaaS) solution on AWS that delivers virtual cloud-based desktops accessible from anywhere on any supported device.',
        'Operating Systems: Supports Microsoft Windows, Amazon Linux 2, and Ubuntu Desktop environments.',
        'Supported Client Devices: Windows PCs, Mac, Chromebooks, iPads, Android tablets, Fire tablets, and HTML5 web browsers (via Chrome/Firefox).',
        'Elimination of On-Premises VDI: Replaces expensive, complex on-premises Virtual Desktop Infrastructure (VDI) servers, SAN storage, and licensing contracts with a scalable pay-as-you-go cloud service.',
        'Enterprise Security: Integrated with AWS KMS to encrypt root and user volumes; data is never stored locally on employee endpoints, preventing corporate data leakage if a laptop is lost or stolen.',
        'Active Directory Integration: Integrates directly with on-premises Microsoft Active Directory via AWS Directory Service (AD Connector or Managed Microsoft AD) so employees use existing corporate credentials and Group Policies (GPO).',
        'Cost Models: Monthly subscription pricing (for full-time workers) or Hourly metering pricing (for contractors, remote part-time staff, and interns).'
      ],
      keyPointsVi: [
        'Định nghĩa: Amazon WorkSpaces là giải pháp Desktop-as-a-Service (DaaS) được AWS quản lý hoàn toàn, cung cấp máy tính để bàn ảo trên nền tảng đám mây, có thể truy cập từ bất cứ đâu trên mọi thiết bị được hỗ trợ.',
        'Hệ điều hành hỗ trợ: Hỗ trợ môi trường Microsoft Windows, Amazon Linux 2 và Ubuntu Desktop.',
        'Thiết bị đầu cuối: Máy tính Windows, Mac, Chromebook, iPad, máy tính bảng Android, Kindle Fire và trình duyệt web HTML5.',
        'Xóa bỏ hạ tầng VDI tại chỗ: Thay thế hệ thống Virtual Desktop Infrastructure (VDI) tại chỗ đắt đỏ, phức tạp, hệ thống lưu trữ SAN và hợp đồng bản quyền bằng dịch vụ đám mây linh hoạt trả theo mức sử dụng.',
        'Bảo mật doanh nghiệp: Tích hợp với AWS KMS để mã hóa ổ đĩa root và ổ đĩa dữ liệu người dùng; dữ liệu không bao giờ lưu trữ trên máy cá nhân của nhân viên, ngăn ngừa lộ lọt dữ liệu khi mất laptop.',
        'Tích hợp Active Directory: Kết nối trực tiếp với Active Directory doanh nghiệp qua AWS Directory Service (AD Connector hoặc Managed AD), nhân viên đăng nhập bằng tài khoản công ty quen thuộc và tuân thủ Group Policy (GPO).',
        'Mô hình chi phí: Trả phí cố định theo tháng (cho nhân viên chính thức làm việc toàn thời gian) hoặc tính theo giờ thực tế sử dụng (cho cộng tác viên, nhân viên bán thời gian, thực tập sinh).'
      ],
      examTipsEn: [
        'Exam Keyword Trigger: "Virtual Desktop Infrastructure (VDI) in the cloud", "Desktop-as-a-Service (DaaS)", "provision remote desktops for employees without managing on-premises hardware" -> Amazon WorkSpaces.',
        'Remember that WorkSpaces delivers the ENTIRE desktop operating system, not just an isolated window.'
      ],
      examTipsVi: [
        'Từ khóa trúng đề: "Virtual Desktop Infrastructure (VDI) on cloud", "Desktop-as-a-Service (DaaS)", "cung cấp máy tính từ xa cho nhân viên làm việc tại nhà mà không mua sắm phần cứng" -> Amazon WorkSpaces.',
        'Hãy nhớ rằng WorkSpaces mang lại TRỌN VẸN cả hệ điều hành desktop ảo (có màn hình desktop, thanh Start menu, khay hệ thống), không phải chỉ 1 cửa sổ phần mềm đơn lẻ.'
      ],
      isCore: true
    },
    {
      id: 'lec-236',
      number: 236,
      titleEn: 'Amazon AppStream 2.0 Overview',
      titleVi: 'Tổng quan Amazon AppStream 2.0 - Truyền phát Ứng dụng Desktop (Application Streaming)',
      duration: '6m',
      summaryEn: 'Learn Amazon AppStream 2.0, a fully managed application streaming service that delivers desktop software directly to web browsers without provisioning full virtual desktops. Compare WorkSpaces vs AppStream 2.0.',
      summaryVi: 'Tìm hiểu Amazon AppStream 2.0 - dịch vụ truyền phát (streaming) ứng dụng desktop được quản lý toàn diện, đưa các phần mềm desktop trực tiếp vào trình duyệt web mà không cần cấp phát cả máy tính ảo hoàn chỉnh. So sánh chi tiết WorkSpaces vs AppStream 2.0.',
      keyPointsEn: [
        'Definition: Amazon AppStream 2.0 is a fully managed non-persistent application streaming service that streams desktop applications from AWS to any computer or mobile browser (HTML5) with zero local installation.',
        'Application-Centric Delivery: Unlike WorkSpaces which gives users an entire OS desktop, AppStream delivers just the application window (e.g., SAP, SolidWorks, Blender, medical imaging, proprietary legacy CAD).',
        'Multi-Platform Compatibility: Enables legacy Windows desktop software to run seamlessly on Macs, Chromebooks, iPads, and Linux workstations through a modern web browser.',
        'Zero Data on Client: The application runs inside an ephemeral EC2 instance fleet in AWS VPC. Only encrypted video and audio pixels are streamed to the client; all proprietary source code, datasets, and intellectual property remain safely inside AWS.',
        'Scalable Fleet Management: Automatically scales streaming fleets up and down based on user demand, drastically lowering infrastructure costs compared to dedicated 24/7 virtual desktops.',
        'Ideal Use Cases: Software vendors (ISVs) offering instant SaaS web trials of desktop apps; universities providing specialized lab software to students on personal laptops; enterprises securing access to legacy client/server tools.'
      ],
      keyPointsVi: [
        'Định nghĩa: Amazon AppStream 2.0 là dịch vụ truyền phát ứng dụng phi lưu trạng thái (non-persistent application streaming) được quản lý toàn diện, truyền ứng dụng desktop từ AWS tới bất kỳ trình duyệt web nào (HTML5) mà không cần cài đặt phần mềm trên máy.',
        'Mô hình chỉ truyền ứng dụng: Khác với WorkSpaces cung cấp cả màn hình hệ điều hành, AppStream 2.0 chỉ truyền duy nhất cửa sổ ứng dụng (ví dụ: SAP GUI, Blender, SolidWorks, phần mềm chẩn đoán hình ảnh y tế, phần mềm CAD cũ).',
        'Tương thích đa nền tảng: Giúp các phần mềm desktop Windows cổ điển có thể chạy mượt mà trên Mac, Chromebook, iPad hay máy trạm Linux qua trình duyệt web thông thường.',
        'Không lưu dữ liệu trên máy khách: Ứng dụng thực thi trên cụm instance EC2 tạm thời trong AWS VPC. Chỉ có luồng hình ảnh/âm thanh mã hóa được truyền tới màn hình người dùng; mã nguồn và dữ liệu mật của công ty luôn nằm an toàn trong AWS.',
        'Quản lý cụm tự động co giãn: Tự động scale cụm máy chủ truyền phát theo số lượng người dùng đồng thời, giúp tiết kiệm chi phí vượt trội so với việc duy trì desktop ảo 24/7.',
        'Trường hợp sử dụng lý tưởng: Các công ty phần mềm (ISV) muốn người dùng dùng thử phần mềm desktop qua web như SaaS; trường đại học cấp phần mềm chuyên ngành cho sinh viên học từ xa; doanh nghiệp cấp quyền dùng công cụ nội bộ an toàn.'
      ],
      examTipsEn: [
        'Exam Comparison Favorite: WorkSpaces = Full virtual desktop (DaaS) with persistent user storage; AppStream 2.0 = Stream a SINGLE desktop application to a web browser on any device.',
        'Trigger: "Stream a proprietary engineering application to students using Chromebooks without installing software" -> AppStream 2.0.'
      ],
      examTipsVi: [
        'Cặp so sánh kinh điển đề thi: WorkSpaces = Toàn bộ máy tính ảo (DaaS) có lưu trạng thái cá nhân lâu dài; AppStream 2.0 = Chỉ stream MỘT ứng dụng cụ thể vào trình duyệt web trên bất kỳ thiết bị nào.',
        'Từ khóa trúng tủ: "Truyền phát phần mềm kỹ thuật cho sinh viên dùng Chromebook mà không cần cài đặt" -> Amazon AppStream 2.0.'
      ],
      isCore: true
    },
    {
      id: 'lec-237',
      number: 237,
      titleEn: 'AWS IoT Core Overview',
      titleVi: 'Tổng quan AWS IoT Core - Kết nối Hàng tỷ Thiết bị Thông minh',
      duration: '5m',
      summaryEn: 'Explore AWS IoT Core, a managed cloud platform that lets connected Internet of Things devices easily and securely interact with cloud applications and other devices over lightweight protocols like MQTT, HTTPS, and WebSockets.',
      summaryVi: 'Khám phá AWS IoT Core - nền tảng đám mây được quản lý giúp hàng tỷ thiết bị IoT kết nối và tương tác dễ dàng, bảo mật với các ứng dụng đám mây và thiết bị khác qua các giao thức tối ưu như MQTT, HTTPS và WebSockets.',
      keyPointsEn: [
        'Definition: AWS IoT Core is a managed cloud platform that connects billions of Internet-of-Things (IoT) sensors, embedded devices, and smart hardware to AWS services securely at low latency and massive scale.',
        'Lightweight Protocols: Native support for MQTT (Message Queuing Telemetry Transport - ultra-low overhead pub/sub protocol ideal for battery-powered sensors), HTTPS, and WebSockets.',
        'Device Gateway & Message Broker: Manages persistent device connections and routes trillions of messages between devices and AWS backends.',
        'Rules Engine: Evaluates incoming sensor messages in real-time using SQL-like syntax and automatically routes data to services like Amazon S3, DynamoDB, Lambda, Kinesis, or SNS without writing server code.',
        'Device Shadow: Maintains a persistent virtual JSON state ("shadow") of each device in the cloud, allowing mobile and cloud applications to read and update device settings even when the physical device is temporarily offline or disconnected.',
        'End-to-End Security: Mutual authentication using X.509 client certificates and fine-grained AWS IoT policies ensuring only authorized devices communicate with the platform.'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS IoT Core là nền tảng đám mây được quản lý, cho phép kết nối hàng tỷ cảm biến, thiết bị nhúng và phần cứng thông minh với các dịch vụ AWS một cách an toàn, độ trễ thấp và quy mô khổng lồ.',
        'Giao thức mạng nhẹ: Hỗ trợ tự nhiên giao thức MQTT (giao thức publish/subscribe cực nhẹ, tiết kiệm băng thông và pin cho cảm biến), HTTPS và WebSockets.',
        'Cổng thiết bị & Bộ môi giới tin nhắn: Quản lý kết nối bền vững của hàng triệu thiết bị cùng lúc và định tuyến hàng nghìn tỷ gói tin dữ liệu.',
        'Công cụ quy tắc (Rules Engine): Xử lý các thông điệp cảm biến theo thời gian thực bằng cú pháp giống SQL và tự động đẩy dữ liệu sang Amazon S3, DynamoDB, Lambda, Kinesis hoặc SNS mà không cần máy chủ trung gian.',
        'Bóng thiết bị (Device Shadow): Lưu giữ trạng thái ảo (file JSON) của thiết bị trên đám mây, giúp ứng dụng di động đọc và thay đổi cấu hình thiết bị ngay cả khi thiết bị vật lý đang bị mất mạng hoặc tắt nguồn.',
        'Bảo mật đầu cuối: Xác thực hai chiều bằng chứng chỉ số X.509 và chính sách phân quyền IoT Policy chi tiết, đảm bảo chỉ thiết bị được ủy quyền mới được gửi dữ liệu.'
      ],
      examTipsEn: [
        'Exam Trigger: "Collect sensor data from millions of smart thermostats or connected vehicles", "MQTT protocol support", "Device Shadow" -> AWS IoT Core.',
        'Do not confuse with Amazon Kinesis (data streaming ingestion for general web logs/clicks). If the prompt mentions hardware sensors, embedded devices, or MQTT -> always pick AWS IoT Core.'
      ],
      examTipsVi: [
        'Từ khóa trúng đề: "Thu thập dữ liệu cảm biến từ hàng triệu thiết bị gia dụng thông minh hoặc xe hơi", "Giao thức MQTT", "Device Shadow" -> AWS IoT Core.',
        'Đừng nhầm với Amazon Kinesis (thu thập stream log web/clickstream). Cứ khi nào đề thi nhắc tới cảm biến phần cứng, thiết bị nhúng hay giao thức MQTT -> chọn ngay AWS IoT Core.'
      ],
      isCore: true
    },
    {
      id: 'lec-238',
      number: 238,
      titleEn: 'AWS AppSync Overview',
      titleVi: 'Tổng quan AWS AppSync - Dịch vụ Quản lý GraphQL API & Real-time Sync',
      duration: '5m',
      summaryEn: 'Understand AWS AppSync, an enterprise-level fully managed GraphQL API service that simplifies application development by letting apps query exact data shapes with real-time subscriptions and built-in offline synchronization.',
      summaryVi: 'Tìm hiểu AWS AppSync - dịch vụ GraphQL API được quản lý toàn diện cấp doanh nghiệp, đơn giản hóa việc phát triển ứng dụng bằng cách cho phép app truy vấn đúng dữ liệu cần thiết với cơ chế cập nhật thời gian thực và đồng bộ dữ liệu ngoại tuyến (offline sync).',
      keyPointsEn: [
        'Definition: AWS AppSync is a fully managed service that makes it easy to build, scale, and secure GraphQL APIs, connecting client applications to data and events across multiple data sources.',
        'GraphQL Power: Unlike REST APIs where clients often get too much or too little data across multiple endpoints, GraphQL enables clients to query exactly the data fields they need in a single round-trip API call.',
        'Multiple Backend Data Sources: AppSync unifies access to Amazon DynamoDB, AWS Lambda functions, Amazon OpenSearch, Aurora databases, and external HTTP APIs into a single cohesive GraphQL schema.',
        'Real-Time Updates via WebSockets: Built-in support for GraphQL subscriptions that push real-time data updates to millions of mobile and web clients using managed WebSockets.',
        'Offline Data Synchronization: Automatically synchronizes mobile and web client local data stores with cloud databases when network connectivity drops and gracefully resolves conflict upon reconnection.',
        'Enterprise Security: Supports API keys, IAM credentials, Amazon Cognito User Pools, and OpenID Connect (OIDC) authentication.'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS AppSync là dịch vụ được quản lý toàn diện giúp dễ dàng xây dựng, mở rộng quy mô và bảo mật các API GraphQL, kết nối ứng dụng người dùng với dữ liệu từ nhiều nguồn khác nhau.',
        'Sức mạnh của GraphQL: Khác với REST API hay bị thừa hoặc thiếu dữ liệu qua nhiều endpoint khác nhau, GraphQL cho phép ứng dụng truy vấn chính xác các trường dữ liệu cần thiết chỉ trong 1 lệnh gọi duy nhất.',
        'Đa dạng nguồn dữ liệu backend: AppSync gom các nguồn dữ liệu như DynamoDB, hàm AWS Lambda, OpenSearch, cơ sở dữ liệu quan hệ Aurora và HTTP API bên ngoài vào một schema GraphQL duy nhất.',
        'Cập nhật thời gian thực qua WebSockets: Tích hợp sẵn cơ chế GraphQL Subscriptions để tự động đẩy dữ liệu mới tức thì tới hàng triệu thiết bị người dùng qua kết nối WebSockets được quản lý.',
        'Đồng bộ ngoại tuyến (Offline Synchronization): Tự động lưu dữ liệu vào bộ nhớ cục bộ của điện thoại khi mất mạng và tự động đồng bộ lên cloud kèm giải quyết xung đột khi có mạng trở lại.',
        'Bảo mật cấp doanh nghiệp: Hỗ trợ API Key, quyền IAM, Amazon Cognito User Pools và OpenID Connect (OIDC).'
      ],
      examTipsEn: [
        'Exam Trigger: "GraphQL API", "Real-time subscriptions via WebSockets", "Offline data synchronization for mobile apps" -> AWS AppSync.',
        'Contrast with Amazon API Gateway: API Gateway is used primarily for REST and WebSocket APIs. AppSync is used specifically for GraphQL APIs.'
      ],
      examTipsVi: [
        'Từ khóa trúng tủ: "GraphQL API", "Cập nhật dữ liệu thời gian thực qua WebSockets", "Đồng bộ dữ liệu offline cho ứng dụng di động" -> AWS AppSync.',
        'Phân biệt với Amazon API Gateway: API Gateway chủ yếu dùng cho REST API và WebSocket API thông thường. AppSync chuyên biệt độc quyền cho GraphQL API.'
      ],
      isCore: true
    },
    {
      id: 'lec-239',
      number: 239,
      titleEn: 'AWS Amplify Overview',
      titleVi: 'Tổng quan AWS Amplify - Bộ Công cụ Phát triển Web & Mobile Toàn diện',
      duration: '6m',
      summaryEn: 'Discover AWS Amplify, an all-in-one set of purpose-built tools, client libraries, UI components, and global hosting designed to help frontend web and mobile developers build and ship full-stack applications rapidly on AWS.',
      summaryVi: 'Khám phá AWS Amplify - bộ công cụ, thư viện client, linh kiện UI và dịch vụ lưu trữ hosting toàn cầu được thiết kế để giúp các lập trình viên web/mobile xây dựng và triển khai ứng dụng full-stack cực nhanh trên AWS.',
      keyPointsEn: [
        'Definition: AWS Amplify is an end-to-end framework and platform that empowers web and mobile developers to build, configure, deploy, and host full-stack applications effortlessly on AWS.',
        'Core Pillars of Amplify: (1) Amplify Studio / Gen 2 CLI: Visual code-first backend configuration; (2) Amplify Libraries: Open-source client SDKs for JavaScript, React, Next.js, Vue, iOS, Android, Flutter, and React Native; (3) Amplify Hosting: Fast, secure static and SSR web hosting backed by Amazon CloudFront CDN with automated CI/CD git workflows.',
        'Out-of-the-Box Capabilities: Simplifies adding Authentication (powered by Amazon Cognito), Storage (Amazon S3), APIs (AppSync GraphQL and API Gateway REST), Analytics (Amazon Pinpoint), and AI/ML predictions.',
        'Automated CI/CD Web Hosting: Connect your GitHub, GitLab, or Bitbucket repository; Amplify automatically builds, tests, and deploys every git commit with custom domains and free auto-renewing SSL certificates.',
        'Target Audience: Frontend and full-stack mobile/web developers who want to avoid managing raw AWS infrastructure and focus strictly on user features.'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS Amplify là một framework và nền tảng phát triển trọn gói từ đầu đến cuối, giúp các lập trình viên web và di động dễ dàng xây dựng, cấu hình backend, triển khai và lưu trữ ứng dụng full-stack trên AWS.',
        'Các trụ cột chính của Amplify: (1) Amplify Studio / CLI: Cấu hình tài nguyên backend bằng giao diện hoặc code; (2) Amplify Libraries: Bộ SDK mã nguồn mở cho React, Next.js, Vue, iOS, Android, Flutter, React Native; (3) Amplify Hosting: Dịch vụ web hosting tĩnh và SSR tốc độ cao tích hợp CDN CloudFront và CI/CD tự động từ git repository.',
        'Các tính năng tích hợp sẵn: Thêm xác thực Auth (dùng Amazon Cognito), lưu trữ tệp (Amazon S3), API (AppSync GraphQL hoặc API Gateway), đo lường phân tích (Amazon Pinpoint) chỉ với vài lệnh đơn giản.',
        'Tự động hóa CI/CD Hosting: Kết nối kho code GitHub/GitLab; Amplify tự động build, test và triển khai ứng dụng sau mỗi lần git commit kèm tên miền riêng và chứng chỉ SSL miễn phí tự gia hạn.',
        'Đối tượng phục vụ: Các kỹ sư Frontend, Full-stack web và Mobile muốn rút ngắn thời gian ra mắt sản phẩm mà không cần bận tâm quản trị chi tiết hạ tầng AWS bên dưới.'
      ],
      examTipsEn: [
        'Exam Trigger: "Fastest way for mobile and web developers to build full-stack apps on AWS", "Integrates authentication, storage, API, and git-based CI/CD web hosting" -> AWS Amplify.',
        'Remember: Amplify uses Cognito, S3, AppSync, and CloudFront under the hood, but packages them into a friendly developer toolkit.'
      ],
      examTipsVi: [
        'Từ khóa đề thi: "Cách nhanh nhất để lập trình viên web/mobile xây dựng ứng dụng full-stack", "Tích hợp sẵn Auth, Storage, API và CI/CD web hosting từ git" -> AWS Amplify.',
        'Ghi nhớ: Bản chất bên dưới Amplify sử dụng các dịch vụ như Cognito, S3, AppSync và CloudFront nhưng đóng gói lại thành bộ công cụ cực kỳ thân thiện cho lập trình viên.'
      ],
      isCore: true
    },
    {
      id: 'lec-240',
      number: 240,
      titleEn: 'AWS Infrastructure Composer Overview',
      titleVi: 'Tổng quan AWS Infrastructure Composer - Thiết kế Hạ tầng Bằng Sơ đồ Trực quan',
      duration: '4m',
      summaryEn: 'Explore AWS Infrastructure Composer (formerly Application Composer), a visual drag-and-drop canvas that lets you visually design, configure, and generate production-ready AWS CloudFormation and SAM infrastructure-as-code templates.',
      summaryVi: 'Tìm hiểu AWS Infrastructure Composer (tiền thân là Application Composer) - bảng vẽ trực quan kéo thả giúp bạn thiết kế, cấu hình kiến trúc ứng dụng và tự động sinh mã nguồn Infrastructure-as-Code chuẩn CloudFormation và AWS SAM.',
      keyPointsEn: [
        'Definition: AWS Infrastructure Composer is a visual drag-and-drop tool in the AWS Management Console that allows developers to design application architectures and automatically generates deployment-ready Infrastructure-as-Code (IaC).',
        'Drag-and-Drop Canvas: Drag AWS serverless and cloud resources (Lambda, API Gateway, SQS, DynamoDB, S3) onto a visual canvas and connect them together with simple lines.',
        'Automated IaC Generation: As you draw and configure services on the canvas, Infrastructure Composer automatically generates matching, validated AWS CloudFormation or AWS Serverless Application Model (SAM) templates in real-time.',
        'Bidirectional Sync: Changes made to the visual canvas update the code template immediately; conversely, manual edits in the code editor update the visual diagram in real-time.',
        'Built-in Best Practices: Automatically applies AWS architectural best practices, configuring necessary IAM least-privilege policies and environment variables when connecting two resources together.'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS Infrastructure Composer là công cụ trực quan kéo thả trong AWS Management Console cho phép các kỹ sư thiết kế kiến trúc ứng dụng và tự động sinh mã hạ tầng Infrastructure-as-Code (IaC) chuẩn xác.',
        'Bảng vẽ kéo thả trực quan: Kéo các tài nguyên AWS (như hàm Lambda, API Gateway, hàng đợi SQS, bảng DynamoDB, bucket S3) vào giao diện và nối dây liên kết chúng với nhau bằng chuột.',
        'Tự động sinh mã IaC: Trong lúc bạn vẽ sơ đồ, công cụ sẽ tự động biên dịch và tạo ra các template mã nguồn AWS CloudFormation hoặc AWS SAM (Serverless Application Model) tương ứng theo thời gian thực.',
        'Đồng bộ hai chiều: Sửa sơ đồ trên bảng vẽ thì code tự sinh thay đổi; ngược lại nếu sửa mã template trong trình soạn thảo thì sơ đồ trực quan cũng tự động cập nhật ngay lập tức.',
        'Tích hợp nguyên tắc kiến trúc tối ưu: Tự động cấu hình các quyền IAM tối thiểu (least privilege) và biến môi trường cần thiết khi bạn nối hai dịch vụ với nhau.'
      ],
      examTipsEn: [
        'Exam Trigger: "Visually design architectures on a canvas and generate CloudFormation/SAM templates", "Drag-and-drop serverless architecture designer" -> AWS Infrastructure Composer.',
        'Often contrasted with AWS CloudFormation Designer (older legacy tool replaced by Infrastructure Composer).'
      ],
      examTipsVi: [
        'Từ khóa đề thi: "Thiết kế kiến trúc trực quan kéo thả trên bảng vẽ và tự động sinh template CloudFormation/SAM" -> AWS Infrastructure Composer.',
        'Thường được so sánh nâng cấp từ công cụ CloudFormation Designer cũ trước đây.'
      ],
      isCore: false
    },
    {
      id: 'lec-241',
      number: 241,
      titleEn: 'AWS Device Farm Overview',
      titleVi: 'Tổng quan AWS Device Farm - Thử nghiệm Ứng dụng Di động trên Thiết bị Thật',
      duration: '4m',
      summaryEn: 'Understand AWS Device Farm, an app testing service that lets developers test and optimize web and mobile apps against a vast fleet of real physical Android and iOS smartphones, tablets, and desktop browsers hosted in the AWS cloud.',
      summaryVi: 'Tìm hiểu AWS Device Farm - dịch vụ kiểm thử ứng dụng cho phép các nhà phát triển thử nghiệm và tối ưu ứng dụng web và di động trên hàng nghìn thiết bị điện thoại, máy tính bảng iOS/Android thật và trình duyệt web trên đám mây AWS.',
      keyPointsEn: [
        'Definition: AWS Device Farm is an application testing service that enables developers to test Android, iOS, and web applications on real, physical mobile devices and desktop browsers without hosting physical hardware labs.',
        'Real Physical Hardware: Tests run on actual physical phones and tablets (iPhone, Samsung Galaxy, Google Pixel, iPad), NOT software emulators or simulators. This catches real-world hardware, camera, battery, and OEM OS bugs.',
        'Automated Testing: Run automated test scripts using popular testing frameworks (Appium, Espresso, XCTest, Calabash, Selenium).',
        'Remote Access for Manual Debugging: Swipe, gesture, and interact directly with real devices remotely in real-time through your web browser to reproduce and debug tricky bugs.',
        'Comprehensive Test Reports: Generates rich test logs, high-resolution screenshots, video recordings of test runs, and performance telemetry (CPU, memory, battery drain) to pinpoint issues fast.'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS Device Farm là dịch vụ kiểm thử ứng dụng cho phép các lập trình viên thử nghiệm ứng dụng Android, iOS và web trên các thiết bị di động thật và trình duyệt desktop mà không cần tự duy trì phòng lab phần cứng tốn kém.',
        'Thiết bị phần cứng THẬT 100%: Ứng dụng chạy trên máy điện thoại và máy tính bảng thật (iPhone, iPad, Samsung Galaxy, Google Pixel), KHÔNG PHẢI phần mềm giả lập (emulators/simulators). Nhờ đó phát hiện chính xác lỗi phần cứng, camera, hao pin và xung đột hệ điều hành của từng hãng sản xuất.',
        'Kiểm thử tự động hóa: Hỗ trợ chạy các kịch bản test tự động bằng các framework phổ biến hàng đầu như Appium, Espresso, XCTest, Selenium.',
        'Truy cập từ xa để debug thủ công: Có thể trực tiếp vuốt chạm, tương tác với điện thoại thật từ xa ngay trên trình duyệt web để tái hiện và bắt các lỗi phức tạp.',
        'Báo cáo kết quả toàn diện: Tự động ghi lại video toàn bộ quá trình test, chụp ảnh màn hình các bước lỗi, lưu log chi tiết và biểu đồ hiệu năng (CPU, RAM, tiêu thụ pin).'
      ],
      examTipsEn: [
        'Exam Trigger: "Test mobile apps on real physical smartphones and tablets in the cloud", "Automated mobile app testing without maintaining a hardware lab" -> AWS Device Farm.',
        'Keyword rule: "Device Farm = Real mobile devices lab in the AWS cloud".'
      ],
      examTipsVi: [
        'Từ khóa trúng đề: "Thử nghiệm ứng dụng di động trên các thiết bị điện thoại/máy tính bảng vật lý thật trên đám mây", "Kiểm thử app mà không cần mua phần cứng" -> AWS Device Farm.',
        'Quy tắc ghi nhớ: "Device Farm = Nông trại thiết bị di động thật trên mây của AWS".'
      ],
      isCore: false
    },
    {
      id: 'lec-242',
      number: 242,
      titleEn: 'AWS Backup Overview',
      titleVi: 'Tổng quan AWS Backup - Quản lý và Tự động hóa Sao lưu Tập trung Toàn diện',
      duration: '7m',
      summaryEn: 'Deep dive into AWS Backup, a fully managed, policy-based service that centralizes and automates data protection across AWS services and hybrid workloads. Master backup plans, cross-region and cross-account copies, AWS Organizations integration, and AWS Backup Vault Lock.',
      summaryVi: 'Đi sâu vào AWS Backup - dịch vụ quản lý theo chính sách toàn diện giúp tập trung hóa và tự động hóa công tác bảo vệ dữ liệu trên các dịch vụ AWS và hệ thống lai. Nắm vững kế hoạch sao lưu (Backup Plans), sao chép chéo Region và chéo tài khoản, tích hợp AWS Organizations, và cơ chế chống xóa AWS Backup Vault Lock.',
      keyPointsEn: [
        'Definition: AWS Backup is a centralized, fully managed data protection service that makes it easy to automate and consolidate backups across multiple AWS services and hybrid workloads into a single console.',
        'Supported Services: Amazon EC2, Amazon EBS volumes, Amazon RDS databases, Amazon Aurora clusters, Amazon DynamoDB, Amazon EFS file systems, Amazon FSx, Amazon S3, AWS Storage Gateway, and VMware workloads.',
        'Backup Plans: Define automated schedules (hourly, daily, weekly), retention periods (e.g., retain for 90 days), and lifecycle transitions (e.g., move cold backups to cold storage/archive to save costs).',
        'Centralized Governance with AWS Organizations: Enforce organization-wide backup policies across all member accounts automatically, ensuring no team neglects compliance.',
        'Cross-Region & Cross-Account Backup: Automatically copy backup snapshots to a secondary AWS Region or an isolated disaster recovery AWS account to protect against regional outages or compromised credentials.',
        'AWS Backup Vault Lock: Enforces a WORM (Write Once, Read Many) compliance state on backups. Prevents any user—including the AWS root account and administrators—from deleting or modifying backups before the retention period expires. Essential defense against ransomware!'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS Backup là dịch vụ bảo vệ dữ liệu tập trung, được quản lý toàn diện giúp dễ dàng tự động hóa và hợp nhất công việc sao lưu trên hàng loạt dịch vụ AWS và hệ thống on-premises vào một bảng điều khiển duy nhất.',
        'Các dịch vụ AWS được hỗ trợ: Máy chủ EC2, ổ đĩa EBS, cơ sở dữ liệu RDS, cụm Aurora, DynamoDB, hệ thống tệp EFS, FSx, Amazon S3, Storage Gateway và máy ảo VMware.',
        'Kế hoạch sao lưu (Backup Plans): Thiết lập lịch sao lưu tự động (hàng giờ, hàng ngày, hàng tuần), thời hạn lưu giữ (ví dụ lưu 90 ngày) và quy tắc chuyển đổi vòng đời (chuyển sang kho lưu trữ lạnh cold storage để tiết kiệm chi phí).',
        'Quản trị tập trung với AWS Organizations: Áp đặt chính sách sao lưu tự động bắt buộc cho tất cả các tài khoản thành viên trong tổ chức, ngăn ngừa tình trạng nhân viên quên sao lưu dữ liệu quan trọng.',
        'Sao lưu chéo Region & chéo tài khoản: Tự động sao chép bản snapshot sang một Region thứ hai hoặc sang một tài khoản AWS độc lập chuyên dùng cho cứu hộ, bảo vệ doanh nghiệp trước sự cố sập cả vùng hoặc bị tin tặc chiếm quyền tài khoản.',
        'AWS Backup Vault Lock: Cơ chế khóa kho sao lưu tuân thủ nguyên tắc WORM (Ghi một lần, Đọc nhiều lần). Ngăn chặn TẤT CẢ mọi người—kể cả tài khoản Root hay Quản trị viên—xóa hoặc chỉnh sửa bản backup trước khi hết hạn lưu trữ. Đây là vũ khí tối thượng chống lại mã độc tống tiền (Ransomware)!'
      ],
      examTipsEn: [
        'Exam Trigger: "Centrally manage and automate backups across multiple AWS services", "Cross-region / cross-account backup automation", "Enforce WORM compliance / protect backups from accidental or malicious deletion" -> AWS Backup (and Backup Vault Lock).',
        'If a question asks how to back up EC2, EBS, RDS, and EFS in ONE place with ONE schedule -> ALWAYS select AWS Backup, NOT custom scripts or individual service snapshots!'
      ],
      examTipsVi: [
        'Từ khóa trúng đề: "Quản lý và tự động hóa sao lưu tập trung trên nhiều dịch vụ AWS", "Tự động sao chép backup chéo Region / chéo tài khoản", "Bảo vệ bản sao lưu không thể bị xóa kể cả bởi tài khoản Root (WORM / chống ransomware)" -> AWS Backup (và Backup Vault Lock).',
        'Nếu đề thi hỏi làm thế nào để sao lưu EC2, EBS, RDS, EFS tại MỘT nơi duy nhất theo CÙNG một lịch trình -> BẮT BUỘC chọn AWS Backup, không chọn viết script thủ công hay snapshot riêng lẻ!'
      ],
      isCore: true
    },
    {
      id: 'lec-243',
      number: 243,
      titleEn: 'Disaster Recovery (DR) Strategies on AWS',
      titleVi: '4 Chiến lược Phục hồi Thảm họa (Disaster Recovery) Kinh điển trên AWS',
      duration: '9m',
      summaryEn: 'Master the 4 core Disaster Recovery (DR) strategies tested heavily on the CLF-C02 exam. Understand RTO (Recovery Time Objective) and RPO (Recovery Point Objective), and rank Backup & Restore, Pilot Light, Warm Standby, and Multi-Site Active-Active by cost and downtime.',
      summaryVi: 'Nắm vững 4 chiến lược Phục hồi Thảm họa (Disaster Recovery - DR) trọng tâm thường xuyên xuất hiện trong đề thi CLF-C02. Hiểu rõ hai chỉ số RTO (Mục tiêu Thời gian Khôi phục) và RPO (Mục tiêu Điểm Khôi phục), sắp xếp thứ bậc 4 mô hình: Backup & Restore, Pilot Light, Warm Standby và Multi-Site Active-Active theo chi phí và thời gian gián đoạn.',
      keyPointsEn: [
        'Key DR Metrics: (1) RPO (Recovery Point Objective): The maximum acceptable amount of data loss measured in time (e.g., losing up to 1 hour of data); (2) RTO (Recovery Time Objective): The maximum acceptable downtime before the system is restored and operational (e.g., system must be back up within 30 minutes). Lower RTO/RPO means higher cost!',
        '1. Backup & Restore (Lowest Cost, Highest RTO/RPO): Data is regularly backed up to AWS (e.g., S3, AWS Backup). No infrastructure is running in the DR site. If disaster strikes, new servers and databases must be provisioned and data restored from scratch. Recovery takes hours to days. Cheapest option.',
        '2. Pilot Light (Low Cost, Medium RTO/RPO): Critical core components (primarily the database) are constantly running and replicated live in the DR region (like a small pilot flame in a gas furnace). Application servers and web servers are NOT running; they are launched and scaled up via AMIs/CloudFormation only after disaster strikes. Recovery takes 10s of minutes to hours.',
        '3. Warm Standby (Medium-to-High Cost, Low RTO/RPO): A scaled-down, fully functional copy of the entire production environment runs 24/7 in the secondary region. It can handle minimal traffic continuously. Upon disaster, the environment quickly scales up (via Auto Scaling) to handle full production load. Recovery takes minutes.',
        '4. Multi-Site Active-Active (Highest Cost, Near-Zero RTO/RPO): Full-scale production environments run simultaneously across two or more AWS Regions. Traffic is actively distributed using Route 53 latency/weighted/geolocation routing. If one region fails, traffic immediately diverts to the surviving region with zero downtime and zero data loss. Most expensive, mission-critical option.'
      ],
      keyPointsVi: [
        'Hai chỉ số cốt lõi trong DR: (1) RPO (Recovery Point Objective - Điểm khôi phục): Lượng dữ liệu tối đa chấp nhận bị mất tính theo thời gian (ví dụ chấp nhận mất dữ liệu trong vòng 1 giờ qua); (2) RTO (Recovery Time Objective - Thời gian khôi phục): Khoảng thời gian gián đoạn tối đa chấp nhận được để đưa hệ thống hoạt động trở lại (ví dụ phải phục hồi xong trong 30 phút). RTO và RPO càng nhỏ thì chi phí đầu tư càng đắt đỏ!',
        '1. Backup & Restore (Chi phí THẤP NHẤT, RTO/RPO LÂU NHẤT): Dữ liệu được định kỳ sao lưu lên AWS (S3, AWS Backup). Hoàn toàn không có máy chủ nào chạy sẵn ở vùng dự phòng. Khi có thảm họa, kỹ sư mới bắt đầu tạo máy chủ mới và khôi phục dữ liệu từ bản sao lưu. Mất từ vài giờ đến vài ngày để phục hồi. Lựa chọn rẻ nhất.',
        '2. Pilot Light (Chi phí THẤP, RTO/RPO TRUNG BÌNH): Chỉ duy trì thành phần cốt lõi nhất (chủ yếu là cơ sở dữ liệu) chạy liên tục và đồng bộ dữ liệu sang vùng dự phòng (như ngọn lửa mồi nhỏ trong bếp gas). Các máy chủ ứng dụng KHÔNG chạy sẵn mà chỉ được bật lên qua AMI/CloudFormation khi có thảm họa. Phục hồi trong khoảng vài chục phút đến vài giờ.',
        '3. Warm Standby (Chi phí KHÁ CAO, RTO/RPO NHANH): Một phiên bản thu nhỏ nhưng hoạt động đầy đủ của toàn bộ hệ thống được chạy 24/7 ở Region thứ hai. Hệ thống này có thể xử lý lượng tải nhỏ liên tục. Khi có thảm họa ở Region chính, hệ thống phụ sẽ lập tức tăng tốc mở rộng quy mô (Auto Scaling) để gánh toàn bộ tải. Phục hồi chỉ trong vài phút.',
        '4. Multi-Site Active-Active (Chi phí ĐẮT NHẤT, RTO/RPO GẦN BẰNG 0): Cả hai Region đều chạy phiên bản sản xuất đầy đủ 100% song song với nhau. Lưu lượng người dùng được chia tải qua Amazon Route 53. Nếu một Region sập hoàn toàn, toàn bộ lưu lượng lập tức chuyển sang Region còn lại mà người dùng không hề nhận thấy gián đoạn. Không mất dữ liệu, chi phí cực cao cho các ứng dụng tối quan trọng.'
      ],
      examTipsEn: [
        'Guaranteed Exam Questions: (1) "Which DR strategy has the LOWEST cost?" -> Backup and Restore; (2) "Which DR strategy provides the LOWEST RTO/RPO and fastest failover?" -> Multi-Site Active-Active; (3) "Which strategy keeps a scaled-down minimal version of the whole stack running 24/7?" -> Warm Standby; (4) "Which strategy keeps only core data/databases replicated while keeping compute off until disaster?" -> Pilot Light.',
        'Cost Order (Lowest to Highest): Backup & Restore < Pilot Light < Warm Standby < Multi-Site Active-Active.',
        'RTO Order (Fastest to Slowest): Multi-Site Active-Active (seconds) < Warm Standby (minutes) < Pilot Light (10s of mins) < Backup & Restore (hours to days).'
      ],
      examTipsVi: [
        'Các câu hỏi thi chắc chắn gặp: (1) "Chiến lược DR nào có CHI PHÍ THẤP NHẤT?" -> Backup and Restore; (2) "Chiến lược DR nào có RTO/RPO THẤP NHẤT (khôi phục nhanh nhất)?" -> Multi-Site Active-Active; (3) "Chiến lược nào chạy phiên bản thu nhỏ của toàn bộ hệ thống 24/7?" -> Warm Standby; (4) "Chiến lược nào chỉ giữ ngọn lửa mồi cơ sở dữ liệu còn máy chủ ứng dụng tắt hết?" -> Pilot Light.',
        'Thứ tự chi phí (Rẻ nhất đến Đắt nhất): Backup & Restore < Pilot Light < Warm Standby < Multi-Site Active-Active.',
        'Thứ tự thời gian khôi phục (Nhanh nhất đến Lâu nhất): Multi-Site Active-Active (vài giây) < Warm Standby (vài phút) < Pilot Light (vài chục phút) < Backup & Restore (vài giờ đến vài ngày).'
      ],
      isCore: true
    },
    {
      id: 'lec-244',
      number: 244,
      titleEn: 'AWS Elastic Disaster Recovery (DRS) Overview',
      titleVi: 'Tổng quan AWS Elastic Disaster Recovery (DRS) - Phục hồi Thảm họa Tự động Khối',
      duration: '6m',
      summaryEn: 'Explore AWS Elastic Disaster Recovery (DRS), the recommended cloud-native disaster recovery service that provides continuous block-level data replication from physical, virtual, or cloud servers into a low-cost AWS staging area for rapid automated failover.',
      summaryVi: 'Tìm hiểu AWS Elastic Disaster Recovery (DRS) - dịch vụ phục hồi thảm họa tự động được AWS khuyến nghị, cung cấp khả năng sao chép dữ liệu liên tục mức khối (block-level) từ máy chủ vật lý, máy ảo hoặc đám mây khác vào vùng đệm staging chi phí thấp trên AWS để khôi phục nhanh chóng khi có sự cố.',
      keyPointsEn: [
        'Definition: AWS Elastic Disaster Recovery (DRS) is the recommended service for disaster recovery to AWS, providing continuous block-level data replication, minimal downtime (RTO in minutes), and minimal data loss (RPO in seconds).',
        'Source Workloads: Protects physical on-premises servers, VMware vSphere VMs, Microsoft Hyper-V VMs, or cloud instances from other cloud providers (Azure, GCP) or other AWS Regions.',
        'Cost-Effective Staging Area: DRS continuously replicates server storage at the block level into a low-cost staging area in your AWS account (using low-cost EC2 instances and EBS gp3 volumes), without running full-price compute instances 24/7.',
        'Rapid Automated Recovery: During a disaster or test drill, DRS automatically converts the replicated disks into fully sized production EC2 instances within minutes.',
        'Non-Disruptive DR Drills: Conduct frequent disaster recovery testing and failover rehearsals at any time without impacting on-premises production operations or disrupting replication.',
        'Failback Capability: After the primary data center is restored, DRS supports automated failback to return workloads to the original on-premises infrastructure.'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS Elastic Disaster Recovery (DRS) là dịch vụ phục hồi thảm họa tiêu chuẩn được AWS khuyên dùng, sao chép liên tục dữ liệu ở mức khối lưu trữ (block-level), giúp đạt RTO tính bằng phút và RPO tính bằng giây.',
        'Nguồn máy chủ bảo vệ: Bảo vệ máy chủ vật lý tại chỗ (on-premises), máy ảo VMware vSphere, Microsoft Hyper-V, hoặc máy chủ từ các nhà cung cấp đám mây khác (Azure, Google Cloud) hoặc giữa các Region AWS với nhau.',
        'Vùng đệm Staging tiết kiệm chi phí: DRS liên tục đồng bộ ổ đĩa vào một vùng staging chi phí thấp trên tài khoản AWS của bạn (chỉ dùng máy ảo EC2 siêu nhỏ và ổ EBS giá rẻ), không cần duy trì các máy chủ đắt tiền chạy 24/7.',
        'Khôi phục tự động trong vài phút: Khi xảy ra thảm họa thực tế hoặc diễn tập, DRS tự động phóng to ổ đĩa và bật các máy chủ EC2 cấu hình cao tương đương môi trường production chỉ trong vài phút.',
        'Diễn tập DR không gián đoạn: Doanh nghiệp có thể diễn tập phục hồi thảm họa bất cứ lúc nào mà không làm ảnh hưởng hay gián đoạn hệ thống đang chạy tại trụ sở.',
        'Khả năng khôi phục ngược (Failback): Khi trung tâm dữ liệu chính đã được sửa chữa xong, DRS hỗ trợ tự động đồng bộ ngược dữ liệu từ AWS về lại hệ thống tại chỗ.'
      ],
      examTipsEn: [
        'Exam Trigger: "Continuous block-level replication to a low-cost AWS staging area for disaster recovery", "Minimize RTO to minutes and RPO to seconds for on-premises servers moving to AWS during a disaster" -> AWS Elastic Disaster Recovery (DRS).',
        'Note: AWS DRS replaces the legacy CloudEndure Disaster Recovery tool.'
      ],
      examTipsVi: [
        'Từ khóa đề thi: "Sao chép liên tục mức khối (block-level replication) vào vùng đệm staging chi phí thấp để phục hồi thảm họa", "RTO tính bằng phút và RPO tính bằng giây khi có sự cố" -> AWS Elastic Disaster Recovery (DRS).',
        'Lưu ý: AWS DRS chính là giải pháp nâng cấp thay thế cho công cụ CloudEndure Disaster Recovery trước đây.'
      ],
      isCore: true
    },
    {
      id: 'lec-245',
      number: 245,
      titleEn: 'Cloud Migration Strategies: The 7 Rs',
      titleVi: '7 Chiến lược Di chuyển lên Đám mây (The 7 Rs of Cloud Migration)',
      duration: '10m',
      summaryEn: 'Deep dive into the 7 Rs of cloud migration framework: Retire, Retain, Relocate, Rehost (lift and shift), Replatform (lift, tinker, and shift), Repurchase (drop and shop), and Refactor / Re-architect (cloud-native rewrite). Understand their trade-offs in time, cost, effort, and business value.',
      summaryVi: 'Đi sâu vào khuôn khổ 7 chiến lược di chuyển lên đám mây (7 Rs of Cloud Migration): Retire (loại bỏ), Retain (giữ lại), Relocate (di dời), Rehost (lift and shift), Replatform (lift, tinker & shift), Repurchase (drop and shop), và Refactor/Re-architect (thiết kế lại cloud-native). Hiểu rõ sự đánh đổi về thời gian, chi phí, nỗ lực và giá trị mang lại.',
      keyPointsEn: [
        'Background: AWS established the 7 Rs framework based on thousands of enterprise migration journeys to help organizations classify and modernize portfolios of applications.',
        '1. Retire: Identify and shut down redundant, obsolete, or unused applications and servers. Typically frees up 10% to 20% of an enterprise IT portfolio with immediate cost savings.',
        '2. Retain (Revisit): Keep applications in their current on-premises environment. Common reasons: compliance or regulatory requirements, recent heavy hardware investments not yet amortized, or technical dependencies not ready for cloud.',
        '3. Relocate: Move workloads to the cloud without purchasing new hardware, rewriting software, or modifying OS configurations (e.g., relocating VMware vSphere VMs directly to VMware Cloud on AWS).',
        '4. Rehost (Lift and Shift): Move applications from on-premises to AWS EC2 without making ANY changes to the architecture or application code. Fastest migration method; saves up to 30% in infrastructure costs. Automated by AWS Application Migration Service (MGN).',
        '5. Replatform (Lift, Tinker, and Shift): Make a few minor cloud optimizations to achieve tangible benefits without altering the core application architecture (e.g., migrating a self-hosted Oracle/MySQL database to Amazon RDS, or moving web apps to AWS Elastic Beanstalk).',
        '6. Repurchase (Drop and Shop): Discard the legacy custom or commercial application entirely and replace it with a modern Software-as-a-Service (SaaS) cloud platform (e.g., replacing on-premise Siebel CRM with Salesforce, or on-prem email with Microsoft 365).',
        '7. Refactor / Re-architect: Redesign and rewrite the application from scratch using cloud-native architectures (serverless with Lambda, microservices with containers, DynamoDB). Takes the highest time, effort, and upfront investment, but delivers the maximum agility, scalability, and long-term cost benefits.'
      ],
      keyPointsVi: [
        'Bối cảnh: AWS đúc kết khuôn khổ 7 Rs từ hàng nghìn dự án di chuyển thực tế của các tập đoàn lớn để giúp doanh nghiệp phân loại và hiện đại hóa danh mục ứng dụng.',
        '1. Retire (Loại bỏ / Tắt): Rà soát và tắt hoàn toàn các ứng dụng và máy chủ không còn ai sử dụng. Thường giúp doanh nghiệp cắt giảm ngay 10% đến 20% chi phí hạ tầng công nghệ thông tin.',
        '2. Retain (Giữ lại tại chỗ): Giữ nguyên ứng dụng tại trung tâm dữ liệu hiện tại, chưa chuyển lên cloud. Lý do thường do vướng mắc quy định pháp lý, ứng dụng vừa đầu tư phần cứng chưa khấu hao xong, hoặc chưa có kế hoạch nâng cấp.',
        '3. Relocate (Di dời nền tảng): Chuyển máy ảo lên đám mây mà không cần cấu hình lại hệ điều hành hay mua phần cứng mới (ví dụ chuyển cụm máy ảo VMware vSphere lên VMware Cloud on AWS).',
        '4. Rehost (Lift and Shift - Nhấc và Đặt): Chuyển nguyên xi máy chủ từ on-premises lên máy ảo Amazon EC2 mà KHÔNG thay đổi bất kỳ dòng mã hay kiến trúc nào. Đây là cách di chuyển nhanh nhất, tiết kiệm đến 30% chi phí vận hành. Được tự động hóa bởi AWS MGN.',
        '5. Replatform (Lift, Tinker and Shift - Tối ưu hóa nhẹ): Thực hiện một vài tinh chỉnh nhỏ trên cloud để hưởng lợi ích dịch vụ quản lý mà không thay đổi mã nguồn cốt lõi (ví dụ chuyển database tự cài sang Amazon RDS, chuyển app web sang Elastic Beanstalk).',
        '6. Repurchase (Drop and Shop - Bỏ cũ mua mới): Vứt bỏ phần mềm cũ tự cài đặt và chuyển sang mua một giải pháp SaaS trên đám mây (ví dụ bỏ phần mềm CRM cũ sang dùng Salesforce, bỏ máy chủ email sang Microsoft 365).',
        '7. Refactor / Re-architect (Thiết kế & Viết lại hoàn toàn): Đập đi xây lại ứng dụng từ đầu theo kiến trúc đám mây hiện đại (serverless với Lambda, microservices với ECS/EKS, DynamoDB). Tốn nhiều thời gian, công sức và chi phí ban đầu nhất, nhưng mang lại độ linh hoạt, khả năng mở rộng và giá trị kinh doanh cao nhất về lâu dài.'
      ],
      examTipsEn: [
        'High Probability Exam Questions: (1) "Which migration strategy involves moving applications to AWS without making any changes?" -> Rehost (Lift and Shift); (2) "Which strategy involves switching to a SaaS solution?" -> Repurchase; (3) "Which strategy involves moving a database to a managed service like Amazon RDS without architectural changes?" -> Replatform; (4) "Which strategy involves completely rewriting an app natively using microservices and serverless?" -> Refactor / Re-architect; (5) "Which strategy shuts down unneeded applications?" -> Retire.',
        'Order of Effort & Cloud Benefit: Rehost (low effort, low cloud benefit) < Replatform < Refactor (highest effort, highest cloud-native benefit).'
      ],
      examTipsVi: [
        'Các câu hỏi thi xác suất cực cao: (1) "Chiến lược nào chuyển ứng dụng lên AWS mà KHÔNG THAY ĐỔI GÌ?" -> Rehost (Lift and Shift); (2) "Chiến lược nào thay thế ứng dụng cũ bằng dịch vụ SaaS?" -> Repurchase; (3) "Chiến lược nào chuyển database sang dịch vụ quản lý như Amazon RDS mà không đổi kiến trúc code?" -> Replatform; (4) "Chiến lược nào viết lại toàn bộ ứng dụng từ đầu theo serverless/microservices?" -> Refactor / Re-architect; (5) "Chiến lược nào tắt bỏ ứng dụng thừa?" -> Retire.',
        'Thứ tự công sức & lợi ích: Rehost (ít công, lợi ích cơ bản) < Replatform < Refactor (nhiều công nhất, hưởng tối đa lợi ích đám mây).'
      ],
      isCore: true
    },
    {
      id: 'lec-246',
      number: 246,
      titleEn: 'Application Discovery Service & Application Migration Service (MGN)',
      titleVi: 'AWS Application Discovery Service & AWS Application Migration Service (MGN)',
      duration: '8m',
      summaryEn: 'Understand the two key tools in the AWS migration journey: AWS Application Discovery Service for planning and dependency mapping, and AWS Application Migration Service (MGN) for automated, non-disruptive lift-and-shift server replication to EC2.',
      summaryVi: 'Tìm hiểu hai công cụ trụ cột trong hành trình di chuyển lên AWS: AWS Application Discovery Service giúp lập kế hoạch và khám phá phụ thuộc hệ thống, và AWS Application Migration Service (MGN) giúp tự động hóa việc sao chép và chuyển đổi máy chủ lift-and-shift lên EC2 mà không gây gián đoạn.',
      keyPointsEn: [
        'Two Phases of Server Migration: Phase 1: Discover & Plan (Application Discovery Service) -> Phase 2: Execute & Rehost (Application Migration Service - MGN).',
        'AWS Application Discovery Service: Scans on-premises data centers to gather server inventory, hardware specifications (CPU, RAM, disk), performance utilization, and network communication dependencies between servers to build an accurate migration plan.',
        'Discovery Service Options: (1) Agentless Discovery (AWS Discovery Connector for VMware environments; collects VM inventory and CPU/RAM without installing software inside OS); (2) Agent-based Discovery (AWS Discovery Agent installed on physical or virtual servers; captures deep network connection dependencies and detailed processes).',
        'Data Export & Integration: Discovered data is viewed in AWS Migration Hub and exported to Amazon Athena for detailed SQL cost and sizing analysis.',
        'AWS Application Migration Service (MGN): The primary, recommended automated service for lift-and-shift (Rehost) server migrations to AWS.',
        'How MGN Works: (1) Install lightweight AWS Replication Agent on source servers; (2) Continuous block-level data replication to a low-cost staging area in AWS VPC; (3) Non-disruptive cutover testing; (4) Cutover: Source server is converted into a running production EC2 instance with minutes of downtime.',
        'Replaces Legacy Tools: AWS MGN replaces AWS Server Migration Service (SMS) and CloudEndure Migration.'
      ],
      keyPointsVi: [
        'Hai giai đoạn di chuyển máy chủ: Giai đoạn 1: Khám phá & Lập kế hoạch (Application Discovery Service) -> Giai đoạn 2: Thực thi di chuyển Lift & Shift (Application Migration Service - MGN).',
        'AWS Application Discovery Service: Quét toàn bộ trung tâm dữ liệu tại chỗ để thu thập danh mục máy chủ, thông số phần cứng (CPU, RAM, ổ đĩa), hiệu suất sử dụng thực tế và sơ đồ phụ thuộc mạng giữa các máy chủ để lập kế hoạch di chuyển chính xác.',
        'Hai phương thức thu thập của Discovery Service: (1) Agentless Discovery (Dùng Discovery Connector cài trên máy ảo quản lý VMware; không cần cài phần mềm vào từng máy chủ); (2) Agent-based Discovery (Cài Agent trực tiếp vào từng máy chủ vật lý/máy ảo; thu thập chi tiết luồng giao tiếp mạng và các tiến trình đang chạy).',
        'Tích hợp dữ liệu: Dữ liệu khám phá được hiển thị trong AWS Migration Hub và có thể xuất sang Amazon Athena để phân tích chi phí và cấu hình tối ưu.',
        'AWS Application Migration Service (MGN): Dịch vụ chính thức được AWS khuyến nghị để tự động hóa di chuyển máy chủ theo chiến lược Rehost (Lift and Shift) lên AWS.',
        'Nguyên lý hoạt động của MGN: (1) Cài Replication Agent nhẹ lên máy chủ nguồn; (2) Sao chép liên tục dữ liệu mức khối sang vùng đệm staging chi phí thấp trên AWS; (3) Thử nghiệm cutover không làm gián đoạn hệ thống đang chạy; (4) Cutover chính thức: Chuyển đổi thành máy chủ EC2 production chỉ với thời gian dừng máy tính bằng phút.',
        'Thay thế công cụ cũ: AWS MGN là giải pháp hiện đại thay thế hoàn toàn AWS Server Migration Service (SMS) và CloudEndure Migration.'
      ],
      examTipsEn: [
        'Exam Trigger Discovery Service: "Discover on-premises server inventory, performance, and network dependencies for migration planning" -> AWS Application Discovery Service.',
        'Exam Trigger MGN: "Automated lift-and-shift (rehost) migration of physical, virtual, or cloud servers to AWS EC2 with minimal downtime" -> AWS Application Migration Service (MGN).',
        'Remember the pairing: Discovery Service = Planning/Inventory; MGN = Actual server replication and migration.'
      ],
      examTipsVi: [
        'Từ khóa trúng đề Discovery Service: "Khám phá danh mục máy chủ tại chỗ, hiệu suất và bản đồ phụ thuộc mạng để lập kế hoạch di chuyển" -> AWS Application Discovery Service.',
        'Từ khóa trúng đề MGN: "Tự động hóa di chuyển lift-and-shift (rehost) máy chủ vật lý, máy ảo lên AWS EC2 với thời gian gián đoạn tối thiểu" -> AWS Application Migration Service (MGN).',
        'Ghi nhớ cặp đôi: Discovery Service = Khám phá và lập kế hoạch; MGN = Trực tiếp sao chép và di chuyển máy chủ.'
      ],
      isCore: true
    },
    {
      id: 'lec-247',
      number: 247,
      titleEn: 'AWS Migration Evaluator Overview',
      titleVi: 'Tổng quan AWS Migration Evaluator - Đánh giá Dự toán Chi phí & Xây dựng Business Case',
      duration: '5m',
      summaryEn: 'Explore AWS Migration Evaluator (formerly Quick Starts / TSO Logic), a complimentary service that helps organizations build a data-driven business case for migrating to AWS by projecting on-premises costs versus optimized AWS cloud spending.',
      summaryVi: 'Tìm hiểu AWS Migration Evaluator (tiền thân là TSO Logic) - dịch vụ miễn phí giúp các tổ chức xây dựng báo cáo luận cứ kinh doanh (Business Case) dựa trên dữ liệu thực tế, so sánh chi phí vận hành tại chỗ với chi phí tối ưu khi chuyển lên đám mây AWS.',
      keyPointsEn: [
        'Definition: AWS Migration Evaluator is a complimentary assessment service that helps organizations create a comprehensive business case for AWS migration based on actual resource utilization data.',
        'Over-Provisioning Analysis: On-premises servers are often significantly over-provisioned (e.g., a server allocated 64 GB RAM may only ever use 8 GB). Migration Evaluator discovers actual CPU, memory, and storage utilization to recommend optimal right-sized EC2 instances.',
        'Financial Comparison (TCO): Compares the Total Cost of Ownership (TCO) of maintaining current on-premises data centers (hardware refresh, power, cooling, real estate, OS licensing) against optimized AWS cloud configurations.',
        'Licensing Optimization: Analyzes Microsoft Windows and SQL Server licenses to recommend bring-your-own-license (BYOL) savings versus license-included models on AWS.',
        'Executive Business Case: Delivers a polished executive report with multiple migration scenarios, cost projections, and projected savings to present to CFOs and leadership.'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS Migration Evaluator là dịch vụ đánh giá miễn phí giúp doanh nghiệp xây dựng bộ hồ sơ kinh tế (Business Case) chuẩn xác cho việc chuyển đổi lên AWS dựa trên số liệu đo lường mức độ sử dụng tài nguyên thực tế.',
        'Phân tích dư thừa tài nguyên: Máy chủ tại chỗ thường được mua dư thừa công suất rất lớn (ví dụ máy chủ cấp 64 GB RAM nhưng thực tế chỉ dùng 8 GB). Migration Evaluator phát hiện mức sử dụng CPU/RAM thực tế để đề xuất cấu hình EC2 tối ưu tương ứng (Right-Sizing).',
        'So sánh chi phí TCO: So sánh Tổng chi phí sở hữu (Total Cost of Ownership - TCO) giữa việc tiếp tục duy trì data center (tiền điện, làm mát, mua sắm phần cứng thay thế, bản quyền phần mềm) so với chi phí khi chạy trên AWS.',
        'Tối ưu hóa chi phí bản quyền: Phân tích bản quyền Windows Server và SQL Server để tư vấn mang bản quyền sẵn có (BYOL) lên đám mây nhằm giảm thiểu chi phí.',
        'Báo cáo cho ban lãnh đạo: Cung cấp báo cáo chuyên nghiệp gồm nhiều kịch bản tài chính khác nhau và tỷ lệ phần trăm tiết kiệm dự kiến để trình bày cho Giám đốc Tài chính (CFO) và Hội đồng Quản trị phê duyệt ngân sách.'
      ],
      examTipsEn: [
        'Exam Trigger: "Build a business case for cloud migration", "Compare on-premises TCO with estimated AWS cloud costs based on actual server utilization data" -> AWS Migration Evaluator.',
        'Contrast: Migration Evaluator = Financial & business case analysis; Application Discovery Service = Technical server inventory and network dependency mapping.'
      ],
      examTipsVi: [
        'Từ khóa đề thi: "Xây dựng Business Case cho việc di chuyển lên đám mây", "So sánh chi phí TCO tại chỗ với dự toán chi phí AWS dựa trên số liệu sử dụng tài nguyên thực tế" -> AWS Migration Evaluator.',
        'Phân biệt: Migration Evaluator = Phân tích tài chính và làm hồ sơ kinh doanh; Application Discovery Service = Khảo sát kỹ thuật máy chủ và bản đồ kết nối mạng.'
      ],
      isCore: true
    },
    {
      id: 'lec-248',
      number: 248,
      titleEn: 'AWS Migration Hub Overview',
      titleVi: 'Tổng quan AWS Migration Hub - Bảng Điều khiển Theo dõi Tiến độ Di chuyển Tập trung',
      duration: '5m',
      summaryEn: 'Understand AWS Migration Hub, the single central dashboard to track the progress of application migrations across multiple AWS and partner tools (MGN, DMS, Discovery Service).',
      summaryVi: 'Tìm hiểu AWS Migration Hub - bảng điều khiển trung tâm duy nhất giúp theo dõi tiến độ di chuyển của toàn bộ các ứng dụng qua nhiều công cụ của AWS và đối tác (AWS MGN, AWS DMS, Discovery Service).',
      keyPointsEn: [
        'Definition: AWS Migration Hub provides a single location to track the progress of application migrations across multiple AWS and partner solutions.',
        'Single Pane of Glass: Instead of navigating between different tools, Migration Hub aggregates progress updates from AWS Application Migration Service (MGN), AWS Database Migration Service (DMS), and partner solutions into one centralized view.',
        'Application Portfolio View: Group discovered servers into logical applications (e.g., "ERP System", "Customer Portal") and monitor migration status at the application level rather than tracking individual server IP addresses.',
        'Centralized Strategy Guidance: Provides access to Migration Hub Strategy Recommendations (formerly Cloudamize integration) to help identify modernization pathways (e.g., containerize vs serverless vs rehost).',
        'No Extra Charge: AWS Migration Hub is available at no additional charge; you only pay for the underlying migration tools and AWS resources provisioned.'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS Migration Hub là một trung tâm duy nhất cho phép theo dõi và giám sát tiến độ di chuyển ứng dụng trên nhiều giải pháp của AWS và đối tác.',
        'Giao diện theo dõi tập trung: Thay vì phải mở nhiều trang quản trị khác nhau, Migration Hub tổng hợp toàn bộ tiến độ từ AWS MGN (di chuyển máy chủ), AWS DMS (di chuyển database) và công cụ của đối tác vào một màn hình duy nhất.',
        'Quản lý theo danh mục ứng dụng: Cho phép nhóm các máy chủ rời rạc thành các cụm ứng dụng logic (ví dụ nhóm 10 máy chủ vào ứng dụng "Hệ thống ERP", nhóm 5 máy chủ vào "Cổng khách hàng") và theo dõi tiến độ theo từng ứng dụng.',
        'Gợi ý chiến lược hiện đại hóa: Cung cấp tính năng Strategy Recommendations giúp đề xuất hướng nâng cấp phù hợp (đóng gói container, chuyển sang serverless hay chỉ lift-and-shift).',
        'Miễn phí sử dụng: AWS Migration Hub hoàn toàn không tính phí dịch vụ; bạn chỉ trả tiền cho các tài nguyên AWS thực tế được tạo ra.'
      ],
      examTipsEn: [
        'Exam Trigger: "Central dashboard to track the progress of migrations across multiple AWS tools", "Single pane of glass for migration status" -> AWS Migration Hub.',
        'Rule of thumb: Whenever the question mentions TRACKING or MONITORING migration progress across multiple tools -> AWS Migration Hub.'
      ],
      examTipsVi: [
        'Từ khóa trúng đề: "Bảng điều khiển trung tâm theo dõi tiến độ di chuyển trên nhiều công cụ AWS", "Màn hình duy nhất giám sát trạng thái migration" -> AWS Migration Hub.',
        'Mẹo nhớ: Cứ khi nào đề thi nhắc tới THEO DÕI hoặc GIÁM SÁT TIẾN ĐỘ di chuyển xuyên suốt nhiều công cụ -> chọn ngay AWS Migration Hub.'
      ],
      isCore: true
    },
    {
      id: 'lec-249',
      number: 249,
      titleEn: 'AWS Fault Injection Simulator (FIS) Overview',
      titleVi: 'Tổng quan AWS Fault Injection Simulator (FIS) - Kỹ thuật Kiểm thử Chịu lỗi (Chaos Engineering)',
      duration: '5m',
      summaryEn: 'Discover AWS Fault Injection Simulator (FIS), a fully managed service for running controlled fault injection experiments (Chaos Engineering) on AWS workloads to build resilience and validate failure recovery mechanisms.',
      summaryVi: 'Khám phá AWS Fault Injection Simulator (FIS) - dịch vụ được quản lý toàn diện giúp chạy các kịch bản cố tình tạo lỗi có kiểm soát (Chaos Engineering) trên hệ thống AWS nhằm đo lường khả năng phục hồi và kiểm chứng các cơ chế tự động xử lý sự cố.',
      keyPointsEn: [
        'Definition: AWS Fault Injection Simulator (FIS) is a fully managed chaos engineering service that allows teams to inject controlled faults and stress into AWS workloads to discover blind spots and validate resilience.',
        'Chaos Engineering Principle: Instead of waiting for an unexpected outage in production, proactively cause controlled failures during business hours to verify that alarms, auto-scaling, and failovers work as designed.',
        'Simulated Fault Actions: CPU stress, memory exhaustion, terminating EC2 instances, draining ECS/EKS nodes, rebooting RDS databases, introducing network latency, or simulating cross-region connectivity loss.',
        'Safety Guardrails: Built-in stop conditions that automatically abort the experiment and roll back faults if application performance drops below predefined CloudWatch alarm thresholds.',
        'Supports Real-World Architectures: Works seamlessly across EC2, ECS, EKS, RDS, and network layers.'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS Fault Injection Simulator (FIS) là dịch vụ Chaos Engineering được quản lý toàn diện, cho phép các đội ngũ kỹ thuật chủ động tạo ra các sự cố có kiểm soát trên hệ thống AWS để tìm ra các lỗ hổng tiềm ẩn và kiểm chứng độ bền vững.',
        'Triết lý Chaos Engineering: Thay vì ngồi thụ động chờ sự cố bất ngờ xảy ra vào lúc nửa đêm, hãy chủ động tự tạo ra lỗi trong giờ làm việc để kiểm tra xem hệ thống cảnh báo, tự động mở rộng (Auto Scaling) và chuyển đổi dự phòng có chạy đúng như thiết kế hay không.',
        'Các lỗi mô phỏng phổ biến: Làm quá tải CPU, ngốn sạch RAM, đột ngột tắt máy ảo EC2, khởi động lại database RDS, tạo độ trễ đường truyền mạng hoặc ngắt kết nối giữa các Region.',
        'Cơ chế an toàn (Stop Conditions): Tích hợp tính năng dừng khẩn cấp tự động; nếu các chỉ số CloudWatch cảnh báo ứng dụng bị ảnh hưởng vượt quá giới hạn an toàn, thử nghiệm sẽ lập tức hủy bỏ và đưa hệ thống về trạng thái bình thường.',
        'Hỗ trợ toàn diện: Hoạt động trơn tru trên EC2, ECS, EKS, RDS và tầng mạng VPC.'
      ],
      examTipsEn: [
        'Exam Trigger: "Chaos engineering on AWS", "Controlled fault injection experiments to test application resilience and failover mechanisms" -> AWS Fault Injection Simulator (FIS).',
        'Keyword match: Fault Injection / Chaos Testing = FIS.'
      ],
      examTipsVi: [
        'Từ khóa trúng tủ: "Chaos engineering trên AWS", "Chủ động tạo lỗi có kiểm soát để kiểm tra độ tin cậy và khả năng tự phục hồi của ứng dụng" -> AWS Fault Injection Simulator (FIS).',
        'Khớp từ khóa: Tạo lỗi mô phỏng (Fault Injection) / Chaos Engineering = FIS.'
      ],
      isCore: false
    },
    {
      id: 'lec-250',
      number: 250,
      titleEn: 'AWS Step Functions Overview',
      titleVi: 'Tổng quan AWS Step Functions - Điều phối Workflow Trực quan Serverless',
      duration: '7m',
      summaryEn: 'Master AWS Step Functions, a serverless visual orchestration service that lets developers combine AWS Lambda functions and other AWS services into robust, automated business workflows and state machines.',
      summaryVi: 'Làm chủ AWS Step Functions - dịch vụ điều phối trực quan serverless cho phép các lập trình viên kết hợp các hàm AWS Lambda và các dịch vụ AWS khác thành các luồng quy trình nghiệp vụ (workflow) và máy trạng thái (state machines) mạnh mẽ và tự động.',
      keyPointsEn: [
        'Definition: AWS Step Functions is a serverless visual workflow orchestration service that lets you coordinate multiple AWS services into flexible, resilient automated workflows (state machines).',
        'Visual State Machine: Workflows are modeled as a series of steps (states) represented visually. You can inspect the execution history step-by-step and see exact inputs, outputs, and errors for every task.',
        'Workflow Building Blocks: Supports sequential execution, parallel branches, conditional branching (Choice states), delays (Wait states), automated retries with exponential backoff, and catch-all error handling.',
        'Human Approval Integration: Can pause a workflow and wait for human approval (e.g., manager approval email) before resuming execution.',
        'Direct Service Integrations: Natively calls over 220 AWS services directly (Lambda, ECS tasks, DynamoDB, SNS, SQS, SageMaker, Athena) without writing glue code.',
        'Two Workflow Types: (1) Standard Workflows (ideal for long-running up to 1 year, audited, financial/order processing workflows with exactly-once execution); (2) Express Workflows (ideal for high-volume, high-throughput, short-duration up to 5 minutes streaming/IoT data pipelines).'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS Step Functions là dịch vụ điều phối workflow trực quan serverless, giúp kết nối nhiều dịch vụ AWS thành các chuỗi quy trình tự động linh hoạt và có khả năng chịu lỗi cao (State Machines).',
        'Mô hình máy trạng thái trực quan: Luồng xử lý được thể hiện dưới dạng sơ đồ trực quan từng bước. Bạn có thể theo dõi trực tiếp tiến độ chạy, kiểm tra dữ liệu đầu vào, đầu ra và lỗi phát sinh tại từng bước cụ thể.',
        'Các thành phần khối của workflow: Hỗ trợ chạy tuần tự, chạy song song nhiều nhánh, rẽ nhánh có điều kiện (Choice), tạm dừng chờ thời gian (Wait), tự động thử lại khi lỗi (Retry) và cơ chế bắt lỗi ngoại lệ (Catch).',
        'Tích hợp phê duyệt bởi con người: Có khả năng tạm dừng luồng quy trình và chờ con người bấm nút phê duyệt (ví dụ quản lý duyệt đơn hàng qua email) rồi mới tiếp tục chạy bước tiếp theo.',
        'Tích hợp trực tiếp hơn 220 dịch vụ AWS: Kết nối thẳng tới AWS Lambda, ECS, DynamoDB, SNS, SQS, SageMaker, Athena mà không cần lập trình các đoạn mã kết nối phức tạp.',
        'Hai loại workflow: (1) Standard Workflows (thích hợp cho quy trình dài tối đa 1 năm, cần kiểm toán chặt chẽ, xử lý thanh toán, đảm bảo thực thi đúng 1 lần); (2) Express Workflows (thích hợp cho xử lý thông lượng cực lớn, thời gian ngắn tối đa 5 phút như pipeline dữ liệu IoT/streaming).'
      ],
      examTipsEn: [
        'Exam Trigger: "Serverless visual workflow orchestration", "Coordinate multiple Lambda functions with branching, retries, and error handling", "State machine with human approval steps" -> AWS Step Functions.',
        'Do not confuse with Amazon SQS (message queue for decoupling two services) or Amazon SNS (pub/sub notification push). Step Functions is an ORCHESTRATOR that manages entire multi-step processes.'
      ],
      examTipsVi: [
        'Từ khóa trúng đề: "Điều phối workflow trực quan serverless", "Kết nối nhiều hàm Lambda có điều kiện rẽ nhánh, thử lại và bắt lỗi", "Máy trạng thái (state machine) có bước phê duyệt của con người" -> AWS Step Functions.',
        'Đừng nhầm với Amazon SQS (hàng đợi tách rời 2 thành phần) hay Amazon SNS (bắn thông báo). Step Functions là BỘ ĐIỀU PHỐI (Orchestrator) quản lý toàn bộ quy trình nhiều bước phức tạp.'
      ],
      isCore: true
    },
    {
      id: 'lec-251',
      number: 251,
      titleEn: 'AWS Ground Station Overview',
      titleVi: 'Tổng quan AWS Ground Station - Trạm Mặt đất Vệ tinh Dịch vụ (Satellite-as-a-Service)',
      duration: '4m',
      summaryEn: 'Explore AWS Ground Station, a fully managed service that lets satellite operators control satellite communications, downlink satellite telemetry, and process satellite data without building or leasing expensive physical ground station antennas.',
      summaryVi: 'Tìm hiểu AWS Ground Station - dịch vụ được quản lý toàn diện cho phép các đơn vị vận hành vệ tinh điều khiển thông tin liên lạc, thu dữ liệu vệ tinh xuống mặt đất và xử lý hình ảnh vệ tinh mà không cần tự xây dựng hay thuê các ăng-ten trạm mặt đất đắt đỏ.',
      keyPointsEn: [
        'Definition: AWS Ground Station is a fully managed service that allows customers to communicate with, downlink data from, and control their satellites using a global network of AWS ground station antennas.',
        'Eliminates Astronomical Capital Expenditures: Building, maintaining, and licensing physical satellite ground station dishes globally costs millions of dollars. AWS Ground Station provides pay-as-you-go antenna access by the minute.',
        'Direct Cloud Ingestion: Satellite data downlinks directly into an AWS Region, delivering raw telemetry and imagery straight into Amazon S3, EC2, and Amazon SageMaker for near-instant AI analysis.',
        'Common Use Cases: Weather forecasting, earth observation and satellite imaging, maritime tracking, disaster relief response, and agricultural crop monitoring.'
      ],
      keyPointsVi: [
        'Định nghĩa: AWS Ground Station là dịch vụ được quản lý toàn diện cho phép khách hàng liên lạc, thu dữ liệu viễn thám và điều khiển vệ tinh thông qua mạng lưới ăng-ten trạm mặt đất toàn cầu của AWS.',
        'Xóa bỏ chi phí đầu tư khổng lồ: Tự xây dựng, xin giấy phép và bảo trì hệ thống chảo ăng-ten vệ tinh trên khắp thế giới tốn hàng triệu đô la. AWS Ground Station cung cấp quyền sử dụng ăng-ten tính tiền linh hoạt theo từng phút sử dụng.',
        'Truyền thẳng dữ liệu vào đám mây: Dữ liệu từ vệ tinh được truyền trực tiếp vào các Region AWS, đổ thẳng vào Amazon S3, máy chủ EC2 và Amazon SageMaker để phân tích hình ảnh AI gần như ngay lập tức.',
        'Các ứng dụng phổ biến: Dự báo thời tiết, chụp ảnh viễn thám giám sát tài nguyên Trái Đất, theo dõi hành trình tàu biển trên đại dương, cứu trợ thiên tai lũ lụt và giám sát mùa màng nông nghiệp.'
      ],
      examTipsEn: [
        'Exam Trigger: "Control satellite communications and process satellite data directly on AWS without building ground antenna infrastructure" -> AWS Ground Station.',
        'Very easy to identify on the exam: if the question mentions "satellites", "downlink", or "orbiting spacecraft" -> AWS Ground Station!'
      ],
      examTipsVi: [
        'Từ khóa trúng tủ: "Điều khiển thông tin liên lạc vệ tinh và xử lý dữ liệu vệ tinh mà không cần xây dựng hệ thống ăng-ten mặt đất" -> AWS Ground Station.',
        'Cực kỳ dễ nhận biết trong đề thi: Cứ thấy xuất hiện từ "vệ tinh (satellites)", "quỹ đạo Trái Đất" hay "downlink dữ liệu vũ trụ" -> chọn ngay AWS Ground Station!'
      ],
      isCore: false
    },
    {
      id: 'lec-252',
      number: 252,
      titleEn: 'Amazon Pinpoint Overview',
      titleVi: 'Tổng quan Amazon Pinpoint - Tương tác Khách hàng & Tiếp thị Đa kênh Quy mô Lớn',
      duration: '5m',
      summaryEn: 'Understand Amazon Pinpoint, a scalable customer engagement and outbound marketing communications service that delivers targeted push notifications, emails, SMS text messages, and voice messages based on user behavior and audience segmentation.',
      summaryVi: 'Tìm hiểu Amazon Pinpoint - dịch vụ tương tác khách hàng và truyền thông tiếp thị đa kênh có khả năng mở rộng cao, gửi thông báo đẩy (push notifications), email, tin nhắn SMS và tin nhắn thoại được cá nhân hóa dựa trên hành vi và phân khúc người dùng.',
      keyPointsEn: [
        'Definition: Amazon Pinpoint is a flexible and scalable multichannel marketing communication service that enables businesses to engage customers across Email, SMS, Push Notifications, In-App Messaging, and Voice.',
        'Audience Segmentation: Segment users dynamically based on demographic attributes (location, device type) and behavioral data (last app open, completed purchases, abandoned carts).',
        'Personalized Marketing Campaigns: Create targeted marketing campaigns and automated transactional journeys (e.g., send welcome email, wait 2 days, send SMS discount code if user has not purchased).',
        'Rich Analytics & Telemetry: Tracks user app engagement, campaign delivery rates, open rates, click-through rates, and conversion metrics in real-time.',
        'Contrast with Amazon SNS: Amazon SNS is primarily a developer messaging pub/sub service for high-volume system notifications and alerts. Amazon Pinpoint is a business marketing and customer engagement tool with audience segmentation, templates, and analytics.'
      ],
      keyPointsVi: [
        'Định nghĩa: Amazon Pinpoint là dịch vụ truyền thông tiếp thị đa kênh linh hoạt và mở rộng quy mô, giúp doanh nghiệp tương tác với người dùng qua Email, SMS, Thông báo đẩy (Push Notifications), Tin nhắn trong ứng dụng và Tin nhắn thoại.',
        'Phân khúc đối tượng người dùng (Segmentation): Tự động phân loại khách hàng dựa trên đặc điểm nhân khẩu học (vị trí, loại điện thoại) và hành vi thực tế (lần cuối mở ứng dụng, đã mua hàng hay bỏ giỏ hàng).',
        'Chiến dịch tiếp thị cá nhân hóa: Thiết kế các chiến dịch gửi thông điệp và hành trình tự động (ví dụ: gửi email chào mừng, đợi 2 ngày, nếu khách chưa mua hàng thì tự động bắn tin nhắn SMS tặng mã giảm giá).',
        'Báo cáo đo lường chi tiết: Theo dõi tỷ lệ gửi thành công, tỷ lệ mở tin nhắn, tỷ lệ click vào đường link và tỷ lệ chuyển đổi đơn hàng theo thời gian thực.',
        'Phân biệt với Amazon SNS: Amazon SNS là dịch vụ pub/sub dành cho kỹ sư phần mềm bắn thông báo kỹ thuật và cảnh báo hệ thống. Amazon Pinpoint là công cụ tiếp thị kinh doanh (Marketing) chuyên nghiệp có phân khúc người dùng, mẫu nội dung và phân tích chuyển đổi.'
      ],
      examTipsEn: [
        'Exam Trigger: "Targeted marketing campaigns with audience segmentation across Email, SMS, and Push Notifications", "Engage customers based on app usage behavior" -> Amazon Pinpoint.',
        'Remember: SNS = Technical developer messaging/alerts; Pinpoint = Marketing, campaigns, user segmentation, and engagement analytics.'
      ],
      examTipsVi: [
        'Từ khóa trúng đề: "Chiến dịch tiếp thị hướng đối tượng có phân khúc khách hàng qua Email, SMS và Push Notification", "Tương tác với người dùng dựa trên hành vi sử dụng ứng dụng" -> Amazon Pinpoint.',
        'Quy tắc phân biệt vàng: Amazon SNS = Bắn tin kỹ thuật / cảnh báo hệ thống; Amazon Pinpoint = Tiếp thị Marketing, chiến dịch theo phân khúc người dùng và đo lường chuyển đổi.'
      ],
      isCore: false
    }
  ]
};
