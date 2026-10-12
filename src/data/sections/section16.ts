import { SectionItem } from '../../types';

export const section16Data: SectionItem = {
  id: 'section-16',
  sectionNumber: 16,
  titleEn: 'Security & Compliance (Shared Responsibility, Firewalls, Encryption, Governance & Threat Detection)',
  titleVi: 'Bảo mật & Tuân thủ (Trách nhiệm chung, Tường lửa, Mã hóa, Báo cáo & Phát hiện đe dọa)',
  domain: 'Domain 2: Security and Compliance',
  weightPercentage: '30%',
  badge: 'Security Core (30% Exam)',
  overviewEn: 'Section 16 covers the mission-critical Domain 2 of the AWS CLF-C02 exam (accounting for 30% of total questions): Shared Responsibility Model across IaaS/PaaS/SaaS, DDoS protection with AWS Shield (Standard vs Advanced) and AWS WAF, AWS Network Firewall, AWS Firewall Manager, Penetration Testing guidelines, Data Encryption with KMS (Customer Managed vs AWS Managed vs AWS Owned) and CloudHSM (Hardware FIPS 140-2 Level 3), SSL/TLS certificate management with ACM, Secrets Manager with automated RDS rotation, AWS Artifact compliance reports & agreements, Amazon GuardDuty intelligent threat detection, Amazon Inspector CVE automated scanning, AWS Config compliance timeline, Amazon Macie PII discovery in S3, AWS Security Hub multi-account aggregator, Amazon Detective root-cause investigation, AWS Abuse reporting, Root User exclusive privileges, and IAM Access Analyzer for zone-of-trust resource sharing.',
  overviewVi: 'Section 16 bao quát trọn vẹn Domain 2 trọng yếu của kỳ thi AWS CLF-C02 (chiếm tới 30% tổng số câu hỏi đề thi): Mô hình Trách nhiệm Chung (Shared Responsibility Model) phân định ranh giới giữa AWS và Khách hàng trên các mô hình IaaS/PaaS/SaaS; Giải pháp chống tấn công DDoS với AWS Shield (Standard miễn phí vs Advanced trả phí 24/7) và AWS WAF (Tường lửa tầng 7 HTTP/HTTPS); Tường lửa quy mô toàn mạng AWS Network Firewall; Quản trị tập trung đa tài khoản với AWS Firewall Manager; Quy định thực hiện thử nghiệm xâm nhập (Penetration Testing); Mã hóa dữ liệu At-Rest & In-Transit với AWS KMS và CloudHSM (phần cứng chuyên dụng đạt chuẩn FIPS 140-2 Level 3); Quản lý chứng chỉ số ACM; Quản lý mật khẩu tự động xoay vòng với Secrets Manager; Tải báo cáo tuân thủ độc lập với AWS Artifact; Phát hiện mã độc đào coin với Amazon GuardDuty; Quét lỗ hổng phần mềm tự động với Amazon Inspector; Kiểm toán thay đổi cấu hình với AWS Config; Quét dữ liệu nhạy cảm PII trong S3 với Amazon Macie; Tổng hợp cảnh báo toàn diện với AWS Security Hub; Điều tra nguyên nhân gốc rễ với Amazon Detective; Báo cáo hành vi vi phạm với AWS Abuse; Danh mục đặc quyền tối cao DUY NHẤT của Root User và công cụ rà soát chia sẻ tài nguyên IAM Access Analyzer.',
  quickExamFacts: [
    {
      en: 'Shared Responsibility Golden Rule: AWS is responsible for security OF the cloud (hardware, global infrastructure, physical data centers, software running managed services). Customer is responsible for security IN the cloud (customer data, OS patching on EC2, IAM credentials, firewall & network config, client/server encryption).',
      vi: 'Quy tắc vàng Trách nhiệm Chung: AWS chịu trách nhiệm bảo mật CỦA đám mây (Security OF the Cloud - phần cứng, hạ tầng toàn cầu, trung tâm dữ liệu vật lý, phần mềm vận hành dịch vụ managed). Khách hàng chịu trách nhiệm bảo mật TRONG đám mây (Security IN the Cloud - dữ liệu khách hàng, vá hệ điều hành EC2, quản lý tài khoản IAM, cấu hình tường lửa SG/NACL, mã hóa dữ liệu).',
      isCoreHighlight: true
    },
    {
      en: 'DDoS Defense Matrix: Shield Standard (Free, automatic for all customers on Route 53/CloudFront against SYN/UDP floods at L3/L4) vs Shield Advanced ($3,000/month, 24/7 Shield Response Team SRT, financial spike protection against surge bills) vs WAF (Web Application Firewall, Layer 7 HTTP/HTTPS filter against SQL Injection, XSS, rate limiting by IP).',
      vi: 'Ma trận phòng thủ DDoS: Shield Standard (Miễn phí, tự động bật cho mọi khách hàng trên Route 53/CloudFront chặn SYN/UDP floods ở Tầng 3/4) vs Shield Advanced ($3.000/tháng, đội phản ứng 24/7 SRT hỗ trợ, chống đội hóa đơn do bị tấn công) vs WAF (Tường lửa ứng dụng web tầng 7 lọc mã độc SQL Injection, Cross-Site Scripting XSS, chặn theo dải IP hoặc quốc gia).',
      isCoreHighlight: true
    },
    {
      en: 'KMS vs CloudHSM: AWS KMS uses multi-tenant software modules managed by AWS, shared infrastructure, FIPS 140-2 Level 2/3. AWS CloudHSM provides dedicated physical hardware appliance completely owned and controlled exclusively by customer with zero AWS admin access, FIPS 140-2 Level 3 compliance.',
      vi: 'KMS so với CloudHSM: AWS KMS sử dụng mô-đun mã hóa phần mềm đa người dùng do AWS quản lý hạ tầng, tự động tích hợp mọi dịch vụ. AWS CloudHSM cấp thiết bị phần cứng mã hóa vật lý chuyên dụng (Hardware Security Module) nằm riêng trong VPC của khách hàng, khách hàng giữ độc quyền chìa khóa và AWS hoàn toàn không thể can thiệp.',
      isCoreHighlight: true
    },
    {
      en: 'Automated Secrets Management: Secrets Manager natively integrates with RDS, Aurora, DocumentDB with automated password rotation via Lambda. AWS Systems Manager Parameter Store is a serverless key-value store without built-in automated rotation.',
      vi: 'Quản lý thông tin mật: AWS Secrets Manager chuyên lưu trữ bí mật (mật khẩu CSDL, API token) và tích hợp sẵn tính năng tự động xoay vòng mật khẩu (rotation) định kỳ cho RDS mà không làm gián đoạn ứng dụng. Parameter Store chỉ là kho lưu chuỗi key-value không có tự động xoay vòng mật khẩu.',
      isCoreHighlight: true
    },
    {
      en: 'Security Audit & Compliance: Artifact = Download 3rd-party compliance reports (SOC 1/2/3, PCI DSS, ISO 27001) & sign BAA agreements. GuardDuty = Intelligent threat detection using ML on VPC Flow Logs, DNS logs, CloudTrail, EKS audit logs (detects crypto mining & compromised credentials). Inspector = Automated vulnerability & CVE scanner on EC2, ECR container images, Lambda functions.',
      vi: 'Bộ ba Kiểm toán & Giám sát: Artifact = Cổng tải báo cáo kiểm toán tuân thủ độc lập (SOC, PCI, ISO) và ký thỏa thuận pháp lý (HIPAA BAA). GuardDuty = Dò tìm đe dọa thông minh dùng Machine Learning phân tích CloudTrail, VPC Flow Logs, DNS logs (nhận diện đào trộm coin, lộ credential). Inspector = Quét lỗ hổng phần mềm CVE tự động cho EC2, container image trên ECR và mã nguồn Lambda.',
      isCoreHighlight: true
    },
    {
      en: 'Data Classification & Posture: Config = Records resource configuration history and evaluates compliance rules over time (drift detection). Macie = Uses pattern matching & ML to discover PII (Personally Identifiable Information) in Amazon S3 buckets.',
      vi: 'Phân loại dữ liệu & Đánh giá cấu hình: AWS Config = Ghi lại lịch sử cấu hình tài nguyên theo dòng thời gian và đánh giá xem tài nguyên có tuân thủ quy chuẩn không (ví dụ kiểm tra security group có mở cổng 22 ra ngoài internet không). Amazon Macie = Dùng ML và Regex quét các file trong S3 bucket để phát hiện dữ liệu nhạy cảm PII (số thẻ tín dụng, số hộ chiếu, CCCD).',
      isCoreHighlight: true
    },
    {
      en: 'Exclusive Root User Tasks: ONLY the root user can change account name/root password/email, close AWS account, change or cancel AWS Support Plan, register as a Reserved Instance seller, configure S3 MFA Delete, restore IAM user permissions if locked out.',
      vi: 'Các việc CHỈ Root User mới làm được: Đổi thông tin gốc của tài khoản (tên, email root, mật khẩu root), đóng tài khoản AWS, thay đổi hoặc hủy gói AWS Support Plan, đăng ký làm người bán Reserved Instance trên sàn giao dịch, bật tính năng S3 MFA Delete, khôi phục quyền IAM khi bị khóa hoàn toàn.',
      isCoreHighlight: true
    }
  ],
  lectures: [
    {
      id: 'lec-178',
      number: 178,
      titleEn: 'Shared Responsibility Model: Reminders & Examples',
      titleVi: 'Mô hình Trách nhiệm Chung: Nguyên lý, Phân định ranh giới & Ví dụ thực tế',
      summaryEn: 'Detailed breakdown of the AWS Shared Responsibility Model across Infrastructure as a Service (EC2), Platform as a Service (RDS, Elastic Beanstalk), and Software/Serverless as a Service (S3, DynamoDB, Lambda).',
      summaryVi: 'Phân tích chi tiết ranh giới trách nhiệm giữa AWS (Bảo mật CỦA Cloud) và Khách hàng (Bảo mật TRONG Cloud) trên các mô hình điện toán IaaS (EC2), PaaS (RDS) và Serverless (S3, DynamoDB, Lambda).',
      keyPointsEn: [
        'AWS Responsibility (Security OF the Cloud): Physical data center facilities, hardware lifecycle, network infrastructure, host hypervisor virtualization layer, edge locations, and decommission/destruction of defective hard drives.',
        'Customer Responsibility (Security IN the Cloud): Customer data confidentiality, operating system patches and guest OS updates on EC2, Security Group & NACL rules, IAM users/passwords/MFA/policies, client-side & server-side data encryption.',
        'EC2 (IaaS): Customer is fully responsible for guest OS updates, security patches, firewall configuration, antivirus, and software installed inside the instance.',
        'RDS (PaaS): AWS manages hardware, OS installation, and operating system security patches. Customer is responsible for database schema, user accounts, data encryption, network firewall rules, and parameter settings.',
        'S3 / DynamoDB (Serverless): AWS manages server scaling, OS, disk encryption engines, and high availability. Customer is responsible for bucket policies, IAM access control, public access blocks, and classification of uploaded data.'
      ],
      keyPointsVi: [
        'Trách nhiệm của AWS (Bảo mật CỦA Đám mây): Cơ sở hạ tầng phòng máy, hệ thống máy chủ vật lý, đường truyền mạng trục chính, lớp ảo hóa hypervisor, các điểm biên Edge Location, quy trình tiêu hủy ổ đĩa hỏng theo tiêu chuẩn quân sự.',
        'Trách nhiệm của Khách hàng (Bảo mật TRONG Đám mây): Dữ liệu khách hàng, cài đặt và vá lỗi hệ điều hành khách (Guest OS) trên EC2, cấu hình tường lửa Security Group và NACL, quản lý người dùng IAM/MFA/Mật khẩu, mã hóa dữ liệu đầu cuối.',
        'Mô hình EC2 (IaaS): Khách hàng phải tự chịu trách nhiệm hoàn toàn việc cập nhật bản vá hệ điều hành, cấu hình tường lửa, diệt virus và phần mềm chạy trên EC2.',
        'Mô hình RDS (PaaS): AWS tự động cài đặt và vá lỗi hệ điều hành cũng như database engine. Khách hàng chỉ chịu trách nhiệm phân quyền tài khoản CSDL, mã hóa dữ liệu và cấu hình Security Group cho phép ai kết nối vào cổng database.',
        'Mô hình S3 / DynamoDB (Serverless): AWS lo toàn bộ phần cứng, hệ điều hành, sao lưu ngầm và phân tán dữ liệu 3 AZ. Khách hàng chỉ chịu trách nhiệm bật Bucket Policy, cấu hình Block Public Access và phân quyền truy cập IAM.'
      ],
      table: {
        headers: ['Hạng mục / Dịch vụ', 'Trách nhiệm của AWS (Security OF Cloud)', 'Trách nhiệm của Khách hàng (Security IN Cloud)'],
        rows: [
          ['EC2 (IaaS)', 'Hạ tầng vật lý, máy chủ chủ (Host Hypervisor), mạng vật lý', 'Vá lỗi Guest OS, cấu hình Firewall (SG/NACL), cài phần mềm, mã hóa EBS'],
          ['RDS (PaaS)', 'Hạ tầng vật lý, cài đặt OS, tự động vá lỗi OS & DB Engine, sao lưu tự động', 'Tối ưu hóa Database, phân quyền user DB, mở port Security Group, bật mã hóa'],
          ['S3 (Serverless)', 'Phần cứng lưu trữ, độ bền dữ liệu 99.999999999%, sao lưu 3 AZ', 'Cấu hình Bucket Policy, IAM Policy, bật Block Public Access, mã hóa dữ liệu'],
          ['Lambda (Serverless)', 'Máy chủ chạy mã nguồn, môi trường runtime, vá lỗi hệ điều hành nền', 'Chất lượng code, quyền IAM Role gán cho hàm Lambda, cấu hình biến môi trường']
        ]
      },
      examTipsEn: [
        'If an exam question asks "Who is responsible for patching the OS on an Amazon EC2 instance?", the answer is ALWAYS the Customer.',
        'If the question asks "Who is responsible for patching the OS on an Amazon RDS database?", the answer is ALWAYS AWS.',
        'Decommissioning physical storage devices and ensuring data erasure conforms to DoD standards is ALWAYS the responsibility of AWS.'
      ],
      examTipsVi: [
        'Nếu đề thi hỏi: "Ai chịu trách nhiệm vá lỗi hệ điều hành trên máy chủ Amazon EC2?" -> Câu trả lời LUÔN LUÔN là KHÁCH HÀNG (Customer).',
        'Nếu đề thi hỏi: "Ai chịu trách nhiệm vá lỗi hệ điều hành trên cơ sở dữ liệu Amazon RDS?" -> Câu trả lời LUÔN LUÔN là AWS.',
        'Tiêu hủy ổ cứng vật lý hỏng và đảm bảo an toàn vật lý của phòng máy Datacenter LUÔN LUÔN là trách nhiệm của AWS.'
      ],
      isCore: true
    },
    {
      id: 'lec-179',
      number: 179,
      titleEn: 'DDoS Protection: AWS Shield & AWS WAF',
      titleVi: 'Bảo vệ chống tấn công DDoS: AWS Shield Standard, Shield Advanced & AWS WAF',
      summaryEn: 'Comprehensive comparison between DDoS defense layers: AWS Shield Standard (free L3/L4 protection), AWS Shield Advanced (enterprise 24/7 protection with SRT), and AWS WAF (Layer 7 web exploit firewall).',
      summaryVi: 'So sánh chuyên sâu 3 lá chắn chống tấn công mạng: AWS Shield Standard (bảo vệ miễn phí tầng mạng 3/4), AWS Shield Advanced (gói cao cấp 24/7 có đội chuyên gia SRT hỗ trợ) và AWS WAF (tường lửa ứng dụng web tầng 7).',
      keyPointsEn: [
        'DDoS (Distributed Denial of Service): Malicious attempt to disrupt normal traffic of a targeted server by overwhelming it with a flood of internet traffic.',
        'AWS Shield Standard: Free service automatically activated for all AWS customers; protects against common Layer 3 (Network) and Layer 4 (Transport) attacks like SYN/UDP floods on CloudFront and Route 53.',
        'AWS Shield Advanced: Paid subscription ($3,000/month + usage fees) offering 24/7 access to AWS Shield Response Team (SRT), financial protection against unexpected bill spikes caused by DDoS attacks, and advanced real-time metrics.',
        'AWS WAF (Web Application Firewall): Protects at Layer 7 (Application layer - HTTP/HTTPS) by inspecting web traffic; can be deployed on Application Load Balancer (ALB), Amazon API Gateway, AWS AppSync, and Amazon CloudFront.',
        'WAF Capabilities: Web ACLs with rules to block SQL Injection (SQLi), Cross-Site Scripting (XSS), rate-based rules (e.g. block IP if sending >100 requests/minute), and Geo-blocking by country IP address.'
      ],
      keyPointsVi: [
        'Khái niệm DDoS: Cuộc tấn công từ chối dịch vụ phân tán nhằm làm tê liệt hệ thống máy chủ bằng cách gửi một lượng khổng lồ lưu lượng truy cập giả mạo cùng một lúc.',
        'AWS Shield Standard: Dịch vụ miễn phí tự động bật sẵn cho mọi khách hàng AWS; tự động bảo vệ chống lại các đòn tấn công Tầng 3 (Mạng) và Tầng 4 (Giao vận) như SYN flood, UDP reflection trên CloudFront và Route 53.',
        'AWS Shield Advanced: Gói bảo hiểm cao cấp ($3.000/tháng); được đội ngũ phản ứng nhanh AWS Shield Response Team (SRT) túc trực 24/7 hỗ trợ giảm thiểu tấn công, và được bồi hoàn chi phí tài chính (DDoS cost protection) nếu bị tấn công làm vọt phí EC2/ALB.',
        'AWS WAF (Web Application Firewall): Tường lửa ứng dụng web hoạt động ở Tầng 7 (HTTP/HTTPS); có thể gắn trực tiếp vào Application Load Balancer (ALB), Amazon API Gateway, CloudFront và AWS AppSync.',
        'Tính năng của WAF: Định nghĩa Web ACL chứa các rule chặn mã độc SQL Injection, Cross-Site Scripting (XSS), giới hạn tần suất truy cập theo IP (Rate limiting) và chặn IP theo vùng địa lý quốc gia (Geo-blocking).'
      ],
      table: {
        headers: ['Đặc điểm so sánh', 'AWS Shield Standard', 'AWS Shield Advanced', 'AWS WAF'],
        rows: [
          ['Tầng mạng bảo vệ (OSI)', 'Tầng 3 (Network) & Tầng 4 (Transport)', 'Tầng 3, Tầng 4 và mở rộng Tầng 7', 'Tầng 7 (Application - HTTP/HTTPS)'],
          ['Chi phí sử dụng', 'Hoàn toàn Miễn phí (Mặc định bật sẵn)', '$3.000 / tháng + phí lưu lượng bổ sung', 'Tính theo số Web ACL, số Rule và số lượng Request'],
          ['Tích hợp dịch vụ', 'Route 53, CloudFront', 'Route 53, CloudFront, ALB, NLB, Elastic IP', 'ALB, API Gateway, CloudFront, AppSync'],
          ['Đội ngũ hỗ trợ chuyên trách', 'Không có', 'Có đội Shield Response Team (SRT) 24/7', 'Không có'],
          ['Bảo vệ chi phí (Cost Protection)', 'Không', 'Có (Được hoàn lại tiền tài nguyên vọt lên do DDoS)', 'Không']
        ]
      },
      examTipsEn: [
        'DDoS at Layer 7 (SQL injection, XSS, HTTP flood) -> Choose AWS WAF.',
        'DDoS at Layer 3/4 with financial spike protection and 24/7 team -> Choose AWS Shield Advanced.',
        'Free automated DDoS defense against SYN floods -> Choose AWS Shield Standard.'
      ],
      examTipsVi: [
        'Đề thi xuất hiện từ khóa "Layer 7", "SQL injection", "XSS", "block specific IP request rate" -> Chọn AWS WAF ngay lập tức.',
        'Đề thi hỏi dịch vụ chống DDoS có "24/7 DDoS response team (SRT)" và "cost spike protection" -> Chọn AWS Shield Advanced.',
        'Đề thi hỏi dịch vụ chống DDoS "miễn phí", "tự động bật sẵn cho Route 53 và CloudFront" -> Chọn AWS Shield Standard.'
      ],
      isCore: true
    },
    {
      id: 'lec-180',
      number: 180,
      titleEn: 'AWS Network Firewall Overview',
      titleVi: 'Tổng quan AWS Network Firewall (Tường lửa mạng toàn diện VPC)',
      summaryEn: 'Stateful, managed network firewall service providing granular traffic inspection and rule filtering across layers 3 through 7 for the entire VPC perimeter.',
      summaryVi: 'Dịch vụ tường lửa mạng được AWS quản lý toàn diện giúp kiểm tra sâu gói tin và lọc lưu lượng hai chiều ở tầng 3 đến tầng 7 cho toàn bộ VPC.',
      keyPointsEn: [
        'Protects the entire Amazon VPC at Layer 3 through Layer 7 in all directions (inbound from Internet, outbound to Internet, VPC-to-VPC, and Direct Connect / VPN hybrid traffic).',
        'Stateful and Stateless inspection rules engine capable of filtering traffic based on source/destination IP, port, protocol, and domain names (FQDN domain filtering).',
        'Intrusion Prevention System (IPS): Deep packet inspection engine compatible with open-source Suricata rulesets to detect and block malicious traffic patterns.',
        'Managed service with built-in high availability and automatic scaling to match network throughput with zero operational overhead.'
      ],
      keyPointsVi: [
        'Bảo vệ toàn diện VPC ở Tầng 3 đến Tầng 7 theo mọi hướng lưu lượng (từ Internet vào, từ VPC ra Internet, giữa các VPC với nhau, hoặc qua đường kết nối Hybrid Direct Connect / VPN).',
        'Hỗ trợ cả Stateless và Stateful rules, có khả năng lọc lưu lượng theo địa chỉ IP nguồn/đích, cổng mạng, giao thức và lọc theo tên miền web đầy đủ (FQDN domain filtering).',
        'Tích hợp công nghệ ngăn chặn xâm nhập (IPS - Intrusion Prevention System) tương thích chuẩn Suricata mã nguồn mở để phát hiện và ngăn chặn các mẫu gói tin tấn công.',
        'Dịch vụ hoàn toàn managed, tự động nhân rộng quy mô (auto-scaling) theo băng thông mạng mà không cần người dùng tự dựng cụm firewall ảo.'
      ],
      examTipsEn: [
        'WAF = Layer 7 HTTP/S on ALB/CloudFront. Network Firewall = Layers 3-7 for entire VPC traffic in all directions.',
        'If a question mentions "filtering outbound domain traffic (FQDN) from a VPC to malicious websites", AWS Network Firewall is the ideal answer.'
      ],
      examTipsVi: [
        'Phân biệt: WAF chỉ lọc HTTP/HTTPS ở tầng 7 trên ALB/CloudFront. Network Firewall lọc toàn diện từ tầng 3 đến tầng 7 cho mọi luồng lưu lượng ra vào toàn VPC.',
        'Nếu đề thi nhắc đến việc "kiểm soát và chặn máy chủ trong VPC kết nối ra các tên miền độc hại (FQDN domain filtering)" -> Chọn AWS Network Firewall.'
      ],
      isCore: true
    },
    {
      id: 'lec-181',
      number: 181,
      titleEn: 'AWS Firewall Manager Overview',
      titleVi: 'Tổng quan AWS Firewall Manager (Quản trị chính sách tường lửa tập trung)',
      summaryEn: 'Centralized security management tool across an entire AWS Organization to govern and enforce VPC Security Groups, AWS WAF rules, AWS Shield, and Network Firewall policies.',
      summaryVi: 'Công cụ quản trị chính sách bảo mật tập trung trên toàn bộ tổ chức AWS Organizations, tự động đồng bộ Security Group, WAF rules, Shield Advanced và Network Firewall.',
      keyPointsEn: [
        'Requires AWS Organizations: Firewall Manager allows security administrators to centrally configure and manage firewall rules across hundreds of AWS accounts in an organization.',
        'Supported Security Services: AWS WAF rules (Web ACLs), AWS Shield Advanced protections, Amazon VPC Security Groups (audit and auto-remediate non-compliant SGs), AWS Network Firewall rules, and Amazon Route 53 Resolver DNS Firewall.',
        'Continuous Compliance: Automatically applies security policies to newly created AWS accounts or resources as soon as they are added to the organization.'
      ],
      keyPointsVi: [
        'Bắt buộc dùng kèm AWS Organizations: Cho phép đội ngũ bảo mật thiết lập chính sách một lần và tự động áp dụng đồng bộ xuống hàng trăm tài khoản AWS thành viên.',
        'Các dịch vụ tường lửa được quản lý tập trung: AWS WAF rules, AWS Shield Advanced, Amazon VPC Security Groups (phát hiện và tự động sửa các SG mở sai quy chuẩn), AWS Network Firewall và Route 53 DNS Firewall.',
        'Tự động thực thi tuân thủ: Bất cứ khi nào một tài khoản AWS mới được tạo hoặc gia nhập vào Organization, Firewall Manager sẽ tự động áp các bộ rule tường lửa vào tài khoản đó ngay lập tức.'
      ],
      examTipsEn: [
        'Keywords: "manage firewall rules across multiple accounts in AWS Organizations" or "audit security groups centrally" -> AWS Firewall Manager.'
      ],
      examTipsVi: [
        'Từ khóa vàng trong đề thi: "quản lý rule tường lửa trên nhiều tài khoản trong AWS Organizations" hoặc "kiểm toán tập trung Security Group trên toàn doanh nghiệp" -> Chọn AWS Firewall Manager.'
      ],
      isCore: true
    },
    {
      id: 'lec-182',
      number: 182,
      titleEn: 'Penetration Testing on AWS',
      titleVi: 'Quy định thực hiện thử nghiệm xâm nhập (Penetration Testing) trên AWS',
      summaryEn: 'Official rules regarding authorized penetration testing and vulnerability assessments on AWS infrastructure without prior approval.',
      summaryVi: 'Quy định chính thức của AWS về việc kiểm thử xâm nhập (Pen-testing) và đánh giá lỗ hổng bảo mật: các dịch vụ được phép kiểm thử mà không cần xin phép trước.',
      keyPointsEn: [
        'NO prior authorization required for 8 specific AWS services: Customers can carry out security assessments and penetration tests against their own resources without contacting AWS for: (1) Amazon EC2 instances, NAT Gateways, Elastic Load Balancers; (2) Amazon RDS; (3) Amazon CloudFront; (4) Amazon Aurora; (5) Amazon API Gateway; (6) AWS Lambda and Lambda Edge functions; (7) Amazon Lightsail; (8) Amazon ECS environments.',
        'Prohibited Activities: Denial of Service (DoS/DDoS) attacks, port flooding, protocol flooding, DNS hijacking, or testing against AWS multi-tenant shared infrastructure.'
      ],
      keyPointsVi: [
        'KHÔNG CẦN xin phép trước cho 8 dịch vụ AWS cụ thể: Khách hàng được tự do thực hiện kiểm thử xâm nhập đối với tài nguyên của chính mình mà không cần gửi ticket xin phép trước trên 8 dịch vụ: (1) Amazon EC2, NAT Gateways, ELB; (2) Amazon RDS; (3) Amazon CloudFront; (4) Amazon Aurora; (5) Amazon API Gateway; (6) AWS Lambda / Lambda Edge; (7) Amazon Lightsail; (8) Amazon ECS.',
        'Các hành vi BỊ NGHIÊM CẤM tuyệt đối: Tự phát động tấn công từ chối dịch vụ (DoS / DDoS), làm tràn ngập cổng (Port Flooding), tấn công hạ tầng dùng chung của AWS hoặc tấn công vào các tài nguyên của khách hàng khác.'
      ],
      examTipsEn: [
        'Can you perform penetration testing on EC2 without notifying AWS? -> YES, permitted without prior authorization.',
        'Can you perform a simulated DDoS attack on AWS infrastructure? -> NO, strictly prohibited.'
      ],
      examTipsVi: [
        'Đề thi hỏi: "Có được phép thực hiện penetration testing trên máy chủ EC2 mà không cần báo trước cho AWS không?" -> ĐƯỢC PHÉP (Yes, permitted without prior approval).',
        'Có được phép tự ý chạy tool tấn công DDoS giả lập để kiểm tra hệ thống không? -> TUYỆT ĐỐI KHÔNG (Strictly prohibited).'
      ],
      isCore: true
    },
    {
      id: 'lec-183',
      number: 183,
      titleEn: 'Data Encryption: KMS & CloudHSM',
      titleVi: 'Mã hóa Dữ liệu: AWS KMS & AWS CloudHSM',
      summaryEn: 'Core cryptographic principles: Encryption at Rest vs In Transit, AWS Key Management Service (KMS) key types, and AWS CloudHSM dedicated hardware security modules.',
      summaryVi: 'Nguyên lý mật mã học cốt lõi: Mã hóa khi lưu trữ (At Rest) vs Mã hóa khi truyền tải (In Transit), các loại khóa AWS KMS và thiết bị phần cứng bảo mật chuyên dụng CloudHSM.',
      keyPointsEn: [
        'Encryption at Rest: Data is encrypted while stored on persistent media (EBS volumes, S3 objects, RDS databases, DynamoDB tables). If physical disk is stolen, data is unreadable.',
        'Encryption in Transit (in flight): Data is encrypted while moving over the network using SSL/TLS (HTTPS). Protects against packet sniffing and Man-in-the-Middle (MitM) attacks.',
        'AWS KMS (Key Management Service): Managed encryption service where AWS handles the underlying infrastructure and software; integrated seamlessly into nearly all AWS services.',
        'KMS Key Types: (1) AWS Owned Keys (free, internal to AWS); (2) AWS Managed Keys (free, aws/service-name format); (3) Customer Managed Keys ($1/month, full control over rotation, key policy, and alias).',
        'AWS CloudHSM: Dedicated physical hardware security module provisioned inside your VPC; customer has exclusive administrative control over encryption keys with zero AWS access; compliant with FIPS 140-2 Level 3.'
      ],
      keyPointsVi: [
        'Mã hóa khi lưu trữ (Encryption at Rest): Dữ liệu được mã hóa khi nằm trên ổ đĩa (EBS, S3, RDS, DynamoDB). Dù ổ cứng vật lý bị lấy cắp thì kẻ xấu cũng không thể đọc được nội dung.',
        'Mã hóa khi truyền tải (Encryption in Transit): Dữ liệu được mã hóa trên đường truyền mạng bằng giao thức SSL/TLS (HTTPS), ngăn chặn hành vi nghe lén gói tin hoặc tấn công đứng giữa (MitM).',
        'AWS KMS (Key Management Service): Dịch vụ quản lý khóa mã hóa đa người dùng được AWS vận hành, tích hợp tự động với hơn 100 dịch vụ AWS khác.',
        '3 loại khóa trong KMS: (1) AWS Owned Keys (miễn phí, nội bộ AWS); (2) AWS Managed Keys (miễn phí, tên dạng aws/s3, aws/ebs); (3) Customer Managed Keys ($1/tháng, khách hàng toàn quyền bật xoay khóa, xóa khóa, chỉnh IAM policy).',
        'AWS CloudHSM: Thiết bị phần cứng mã hóa chuyên dụng (Hardware Security Module) cắm riêng cho khách hàng trong VPC; khách hàng nắm quyền kiểm soát độc quyền và AWS không thể truy cập; đạt chuẩn bảo mật khắt khe FIPS 140-2 Level 3.'
      ],
      table: {
        headers: ['Tiêu chí', 'AWS KMS (Key Management Service)', 'AWS CloudHSM'],
        rows: [
          ['Mô hình hạ tầng', 'Dịch vụ dùng chung (Multi-tenant) do AWS quản trị', 'Thiết bị phần cứng chuyên dụng (Single-tenant dedicated hardware)'],
          ['Mức độ tuân thủ FIPS', 'FIPS 140-2 Level 2 / Level 3 (tùy vùng)', 'FIPS 140-2 Level 3 nghiêm ngặt'],
          ['Quyền quản lý khóa', 'AWS quản lý hạ tầng; Khách hàng quản lý IAM Policy', 'Khách hàng toàn quyền quản trị độc quyền (AWS KHÔNG THỂ can thiệp)'],
          ['Tích hợp dịch vụ AWS', 'Tích hợp sẵn tự động với S3, EBS, RDS, DynamoDB, v.v.', 'Khách hàng tự cấu hình qua các chuẩn PKCS#11, JCE, CNG'],
          ['Chi phí sử dụng', 'Rất rẻ ($1/key/tháng + phí API call)', 'Đắt (tính theo giờ phần cứng chuyên dụng ~$1.45/giờ)']
        ]
      },
      examTipsEn: [
        'Need encryption managed by AWS with seamless service integration? -> AWS KMS.',
        'Need dedicated physical cryptographic hardware with customer-only key management and FIPS 140-2 Level 3? -> AWS CloudHSM.'
      ],
      examTipsVi: [
        'Đề thi hỏi dịch vụ mã hóa do AWS quản lý, tích hợp mượt mà với S3, EBS -> Chọn AWS KMS.',
        'Đề thi có cụm từ "dedicated physical hardware", "FIPS 140-2 Level 3", "customer manages keys exclusively without AWS access" -> Chọn AWS CloudHSM.'
      ],
      isCore: true
    },
    {
      id: 'lec-184',
      number: 184,
      titleEn: 'Encryption with KMS & CloudHSM: Hands-on Concepts',
      titleVi: 'Thực hành Cấu hình Mã hóa: KMS Customer Managed Keys & Envelope Encryption',
      summaryEn: 'Practical workflow of creating KMS Customer Managed Keys, automatic key rotation policies, and the concept of Envelope Encryption using Data Keys.',
      summaryVi: 'Quy trình thực tế tạo khóa Customer Managed Key trong KMS, cơ chế tự động xoay khóa (Key Rotation) hàng năm và nguyên lý Mã hóa Phong bì (Envelope Encryption) bằng Data Key.',
      keyPointsEn: [
        'Customer Managed Keys (CMK) allow configuration of Key Policies (who can administer the key vs who can use it for encrypt/decrypt).',
        'Automatic Key Rotation: KMS can automatically rotate the backing cryptographic key material once every year (365 days) without changing the Key ID or breaking existing encrypted data.',
        'Envelope Encryption: Practice of encrypting plaintext data with a unique Data Key, and then encrypting the Data Key with a top-level KMS Key (Key Encryption Key KEK) to optimize performance for large files.'
      ],
      keyPointsVi: [
        'Khóa do khách hàng quản lý (Customer Managed Key): Cho phép thiết lập Key Policy chi tiết (ai có quyền quản trị xóa khóa vs ai chỉ có quyền gọi lệnh mã hóa/giải mã).',
        'Tự động xoay khóa (Automatic Key Rotation): KMS hỗ trợ tự động xoay vật liệu khóa 1 năm 1 lần (365 ngày), mã khóa Key ID không đổi và các dữ liệu đã mã hóa cũ vẫn được giải mã bình thường.',
        'Mã hóa phong bì (Envelope Encryption): Kỹ thuật dùng một khóa dữ liệu (Data Key) để mã hóa file dữ liệu lớn, sau đó dùng khóa chính của KMS để bọc mã hóa khóa Data Key đó lại, giúp tăng tốc hiệu năng vượt trội.'
      ],
      examTipsEn: [
        'Automatic rotation of KMS Customer Managed Keys happens once every 365 days (1 year).',
        'KMS keys never leave the AWS KMS service unencrypted.'
      ],
      examTipsVi: [
        'Chu kỳ tự động xoay khóa của KMS Customer Managed Key là 1 năm một lần (365 ngày).',
        'Vật liệu khóa KMS không bao giờ bị xuất ra ngoài dưới dạng văn bản thô (unencrypted plaintext).'
      ],
      isCore: false
    },
    {
      id: 'lec-185',
      number: 185,
      titleEn: 'AWS Certificate Manager (ACM) Overview',
      titleVi: 'Tổng quan AWS Certificate Manager (ACM - Quản lý chứng chỉ số SSL/TLS)',
      summaryEn: 'Centralized provisioning, deployment, and automated renewal of public and private SSL/TLS certificates for securing HTTPS web applications.',
      summaryVi: 'Dịch vụ cấp phát, triển khai và tự động gia hạn chứng chỉ bảo mật số SSL/TLS công khai và nội bộ giúp mã hóa lưu lượng HTTPS an toàn.',
      keyPointsEn: [
        'Provisions free public SSL/TLS certificates for custom domain names.',
        'Seamless integration: Easily binds certificates to AWS services including Elastic Load Balancer (ALB/NLB), Amazon CloudFront distributions, and Amazon API Gateway.',
        'Automated Certificate Renewal: ACM automatically renews certificates before expiration without any manual engineering intervention or server downtime.',
        'Private CA: Can also host private Certificate Authorities for internal corporate microservices communication.'
      ],
      keyPointsVi: [
        'Cấp phát chứng chỉ bảo mật SSL/TLS công khai hoàn toàn MIỄN PHÍ cho các tên miền tùy chỉnh của bạn.',
        'Tích hợp nhanh chóng: Gắn trực tiếp chứng chỉ vào Elastic Load Balancer (ALB), mạng phân phối nội dung CloudFront và cổng API Gateway chỉ với vài cú click.',
        'Tự động gia hạn chứng chỉ (Automated Renewal): ACM tự động gia hạn chứng chỉ trước khi hết hạn, loại bỏ rủi ro website bị sập do kỹ sư quên gia hạn SSL thủ công.',
        'Private CA: Hỗ trợ tạo Certificate Authority nội bộ cho các hệ thống microservices giao tiếp nội bộ trong mạng doanh nghiệp.'
      ],
      examTipsEn: [
        'Need to provision and automatically renew free SSL/TLS certificates for ALB or CloudFront? -> AWS Certificate Manager (ACM).'
      ],
      examTipsVi: [
        'Đề thi hỏi: "Dịch vụ nào giúp cấp phát và tự động gia hạn chứng chỉ SSL/TLS miễn phí cho Application Load Balancer hoặc CloudFront?" -> Chọn AWS Certificate Manager (ACM).'
      ],
      isCore: true
    },
    {
      id: 'lec-186',
      number: 186,
      titleEn: 'AWS Secrets Manager Overview',
      titleVi: 'Tổng quan AWS Secrets Manager (Quản lý và tự động xoay vòng mật khẩu CSDL)',
      summaryEn: 'Secure vault designed specifically to store, retrieve, audit, and automatically rotate database credentials, API keys, and application secrets using Lambda.',
      summaryVi: 'Kho lưu trữ an toàn chuyên biệt để lưu, truy xuất, kiểm toán và tự động xoay vòng mật khẩu cơ sở dữ liệu và API key định kỳ thông qua hàm AWS Lambda.',
      keyPointsEn: [
        'Primary purpose: Securely store database passwords, API tokens, and credentials instead of hardcoding them in application source code.',
        'Automatic Secret Rotation: Built-in capability to automatically rotate database passwords on a scheduled basis (e.g. every 30 or 90 days) by calling AWS Lambda to update both the database and Secrets Manager simultaneously.',
        'Out-of-the-box integration with Amazon RDS, Amazon Aurora, and Amazon DocumentDB.',
        'Encrypted at rest using AWS KMS keys.'
      ],
      keyPointsVi: [
        'Mục đích chính: Lưu trữ an toàn mật khẩu CSDL, khóa API token, thay thế việc viết cứng mật khẩu (hardcoding) vào mã nguồn ứng dụng.',
        'Tự động xoay vòng mật khẩu (Automatic Rotation): Tự động đổi mật khẩu định kỳ (ví dụ mỗi 30 hoặc 90 ngày) bằng cách gọi hàm AWS Lambda để cập nhật mật khẩu mới đồng bộ vào cả RDS và Secrets Manager.',
        'Tích hợp sẵn có cho Amazon RDS, Amazon Aurora và Amazon DocumentDB mà không cần viết code phức tạp.',
        'Dữ liệu luôn được mã hóa an toàn khi lưu trữ bằng các khóa AWS KMS.'
      ],
      table: {
        headers: ['Đặc điểm so sánh', 'AWS Secrets Manager', 'AWS Systems Manager Parameter Store'],
        rows: [
          ['Mục đích chính', 'Lưu trữ thông tin mật (Mật khẩu DB, API keys)', 'Lưu trữ cấu hình ứng dụng và biến môi trường (Plaintext / Secret)'],
          ['Tự động xoay vòng mật khẩu', 'HỖ TRỢ SẴN (Built-in automated rotation via Lambda)', 'KHÔNG CÓ tính năng tự động xoay vòng sẵn có'],
          ['Chi phí', 'Có tính phí ($0.40/secret/tháng + phí API call)', 'Miễn phí cho Standard Parameter'],
          ['Tích hợp RDS native', 'Có sẵn tích hợp tạo và đổi mật khẩu RDS trực tiếp', 'Không tích hợp sâu sẵn']
        ]
      },
      examTipsEn: [
        'Keywords: "store database credentials" and "rotate secrets automatically" -> AWS Secrets Manager.',
        'Secrets Manager vs Parameter Store: If the question requires automated rotation of RDS passwords, choose Secrets Manager.'
      ],
      examTipsVi: [
        'Từ khóa trong đề: "lưu mật khẩu CSDL" và "tự động xoay vòng mật khẩu định kỳ (rotate automatically)" -> Chọn ngay AWS Secrets Manager.',
        'Phân biệt với Parameter Store: Chỉ có Secrets Manager mới có tính năng tự động đổi mật khẩu định kỳ (rotation) cho RDS.'
      ],
      isCore: true
    },
    {
      id: 'lec-187',
      number: 187,
      titleEn: 'AWS Artifact Overview: Compliance Reports & Agreements',
      titleVi: 'Tổng quan AWS Artifact: Cổng tải báo cáo tuân thủ & Ký thỏa thuận pháp lý',
      summaryEn: 'Self-service on-demand portal for customers to access AWS compliance documentation, third-party audit reports (PCI, SOC, ISO), and execute legal agreements.',
      summaryVi: 'Cổng thông tin tự phục vụ theo yêu cầu để khách hàng tải về các tài liệu tuân thủ, báo cáo kiểm toán của bên thứ ba (PCI, SOC, ISO) và ký các thỏa thuận pháp lý BAA.',
      keyPointsEn: [
        'Artifact Reports: Download on-demand compliance reports produced by independent third-party auditors proving AWS infrastructure security (e.g. AWS ISO certifications, SOC 1/2/3 reports, Payment Card Industry PCI DSS reports).',
        'Artifact Agreements: Portal to review, accept, sign, and manage legal agreements between your company and AWS for regulated industries (e.g. Business Associate Addendum BAA for healthcare HIPAA compliance).',
        'Used during internal audits or external regulatory investigations to demonstrate that AWS cloud foundation complies with industry standards.'
      ],
      keyPointsVi: [
        'Artifact Reports: Tải trực tiếp các báo cáo kiểm toán độc lập của bên thứ ba chứng minh hạ tầng AWS đạt chuẩn bảo mật toàn cầu (ví dụ: chứng chỉ ISO, báo cáo SOC 1/2/3, chuẩn thẻ tín dụng PCI DSS).',
        'Artifact Agreements: Cổng xem, chấp nhận và ký kết các thỏa thuận pháp lý ràng buộc giữa doanh nghiệp của bạn với AWS (ví dụ: thỏa thuận BAA dành cho ngành y tế tuân thủ đạo luật HIPAA).',
        'Dùng khi công ty bạn bị kiểm toán nội bộ hoặc cơ quan quản lý nhà nước thanh tra, cần bằng chứng chứng minh nhà cung cấp đám mây đạt chuẩn.'
      ],
      examTipsEn: [
        'Keywords: "download AWS compliance reports", "SOC reports", "PCI audit documentation", or "sign HIPAA BAA agreement" -> AWS Artifact.'
      ],
      examTipsVi: [
        'Từ khóa vàng trong đề thi: "tải báo cáo kiểm toán tuân thủ (compliance reports)", "báo cáo SOC 2", "chứng nhận PCI", "ký thỏa thuận HIPAA BAA" -> Chọn AWS Artifact.'
      ],
      isCore: true
    },
    {
      id: 'lec-188',
      number: 188,
      titleEn: 'Amazon GuardDuty Overview',
      titleVi: 'Tổng quan Amazon GuardDuty (Phát hiện đe dọa thông minh & Đào tiền ảo trái phép)',
      summaryEn: 'Intelligent, continuous threat detection service that analyzes billions of events across multiple data sources using machine learning to detect unauthorized behavior.',
      summaryVi: 'Dịch vụ phát hiện đe dọa an ninh thông minh hoạt động liên tục, sử dụng Machine Learning phân tích hàng tỷ sự kiện từ nhiều nguồn log để phát hiện các hành vi bất thường.',
      keyPointsEn: [
        'Data Sources analyzed (without requiring any agent): (1) AWS CloudTrail management events and CloudTrail data events (S3); (2) Amazon VPC Flow Logs; (3) DNS Logs; (4) Kubernetes audit logs (EKS); (5) RDS login activity.',
        'Intelligent Detection: Uses machine learning algorithms, anomaly detection, and integrated threat intelligence feeds to spot compromise.',
        'Cryptocurrency Mining Detection: Famous signature use-case is detecting EC2 instances or containers secretly compromised to mine Bitcoin/Monero.',
        'Compromised IAM Credentials: Detects API calls made from unusual geographical locations or known malicious IP addresses.',
        'EventBridge Integration: Automatically triggers AWS Lambda or SNS alerts to isolate infected instances in real time.'
      ],
      keyPointsVi: [
        'Các nguồn dữ liệu log được phân tích (hoàn toàn không cần cài agent): (1) CloudTrail Management & S3 Data Events; (2) Amazon VPC Flow Logs; (3) DNS Logs; (4) EKS audit logs; (5) Nhật ký đăng nhập RDS.',
        'Phát hiện thông minh: Sử dụng Machine Learning và trí tuệ nhân tạo để nhận diện các hành vi bất thường và đối chiếu với danh sách các IP độc hại toàn cầu.',
        'Phát hiện đào tiền ảo trái phép (Cryptocurrency Mining): Trường hợp kinh điển nhất trong đề thi là phát hiện máy chủ EC2 bị hacker chiếm quyền để đào trộm Bitcoin.',
        'Phát hiện lộ tài khoản IAM: Cảnh báo ngay khi phát hiện tài khoản IAM được sử dụng để gọi API từ một vị trí địa lý lạ hoặc từ mạng Tor.',
        'Tích hợp EventBridge: Tự động kích hoạt Lambda để cô lập máy chủ bị nhiễm mã độc ngay lập tức.'
      ],
      examTipsEn: [
        'Keywords: "intelligent threat detection", "detect cryptocurrency mining", "analyzes CloudTrail / VPC Flow Logs / DNS logs with ML" -> Amazon GuardDuty.'
      ],
      examTipsVi: [
        'Từ khóa vàng trong đề thi: "phát hiện đe dọa thông minh (intelligent threat detection)", "phát hiện đào trộm tiền ảo (cryptocurrency mining)", "dùng ML phân tích VPC Flow Logs và DNS logs" -> Chọn Amazon GuardDuty.'
      ],
      isCore: true
    },
    {
      id: 'lec-189',
      number: 189,
      titleEn: 'Amazon Inspector Overview',
      titleVi: 'Tổng quan Amazon Inspector (Tự động quét lỗ hổng phần mềm CVE)',
      summaryEn: 'Automated vulnerability management service that continually scans AWS workloads for Common Vulnerabilities and Exposures (CVE) and unintended network exposure.',
      summaryVi: 'Dịch vụ quản lý và quét lỗ hổng bảo mật tự động liên tục trên máy chủ EC2, container ECR và hàm Lambda nhằm tìm kiếm các lỗi CVE và rủi ro lộ cổng mạng.',
      keyPointsEn: [
        'Targets scanned: (1) Amazon EC2 instances (uses AWS Systems Manager SSM Agent); (2) Container images stored in Amazon Elastic Container Registry (ECR); (3) AWS Lambda functions and layers code.',
        'Scans for: Known software vulnerabilities (CVE database) and unintended open network paths.',
        'Continuous & Event-driven: Automatically scans EC2 instances when new CVEs are published, scans container images upon push to ECR, and scans Lambda functions when deployed.',
        'Generates prioritized risk scores (Inspector Risk Score) from 1 to 100 based on exploitability context.'
      ],
      keyPointsVi: [
        'Đối tượng quét: (1) Máy chủ Amazon EC2 (thông qua SSM Agent); (2) Container image lưu trên Amazon ECR; (3) Mã nguồn hàm AWS Lambda.',
        'Mục tiêu quét: Tìm kiếm các lỗ hổng phần mềm đã biết trong cơ sở dữ liệu lỗ hổng bảo mật quốc tế (CVE) và phát hiện các cổng mạng bị mở hớ hênh ra ngoài Internet.',
        'Quét liên tục và tự động: Tự động quét lại khi có lỗ hổng CVE mới được công bố, quét container ngay khi được push lên ECR, và quét code Lambda khi deploy.',
        'Chấm điểm rủi ro: Cung cấp điểm số rủi ro Inspector Score (1 - 100) giúp đội ngũ ưu tiên vá các lỗi nguy hiểm nhất trước.'
      ],
      table: {
        headers: ['Tiêu chí so sánh', 'Amazon GuardDuty', 'Amazon Inspector'],
        rows: [
          ['Bản chất dịch vụ', 'Phát hiện đe dọa đang diễn ra (Threat Detection)', 'Quét lỗ hổng phần mềm tiềm ẩn (Vulnerability Assessment)'],
          ['Cơ chế hoạt động', 'Dùng Machine Learning phân tích Log (CloudTrail, VPC Flow, DNS)', 'Quét mã nguồn, thư viện hệ điều hành đối chiếu cơ sở dữ liệu CVE'],
          ['Tình huống nhận diện', 'Đào coin trái phép, hacker dò mật khẩu, lộ API key', 'Gói phần mềm Linux lỗi thời, container chứa mã độc, hở cổng mạng'],
          ['Yêu cầu Agent', 'KHÔNG cần cài agent vào máy chủ', 'Sử dụng AWS Systems Manager SSM Agent trên EC2']
        ]
      },
      examTipsEn: [
        'Keywords: "scan EC2 / ECR container images / Lambda for software vulnerabilities and CVE" -> Amazon Inspector.',
        'GuardDuty vs Inspector: GuardDuty detects active malicious behavior / attacks. Inspector finds passive vulnerabilities and unpatched CVEs in software.'
      ],
      examTipsVi: [
        'Từ khóa vàng trong đề thi: "quét lỗ hổng phần mềm (vulnerabilities)", "quét mã CVE", "quét image trên Amazon ECR" -> Chọn Amazon Inspector.',
        'Phân biệt: GuardDuty là bảo vệ (phát hiện khi đang bị tấn công / đào coin). Inspector là thanh tra (quét xem phần mềm có bị lỗi thời / dính CVE không).'
      ],
      isCore: true
    },
    {
      id: 'lec-190',
      number: 190,
      titleEn: 'AWS Config Overview',
      titleVi: 'Tổng quan AWS Config (Kiểm toán lịch sử cấu hình & Đánh giá tuân thủ)',
      summaryEn: 'Service that continuously tracks, records, and audits resource configuration changes over time, evaluating compliance against desired security baselines.',
      summaryVi: 'Dịch vụ liên tục theo dõi, ghi lại lịch sử thay đổi cấu hình tài nguyên và đánh giá mức độ tuân thủ theo các quy chuẩn bảo mật định trước.',
      keyPointsEn: [
        'Records configuration history and resource relationships over time ("Timeline of Changes").',
        'Answers audit questions: "What did my security group look like 3 weeks ago?" or "Who modified this S3 bucket policy last Tuesday?".',
        'Config Rules: Evaluates resources against rules (e.g. `restricted-ssh` ensures port 22 is not open to 0.0.0.0/0; `s3-bucket-ssl-requests-only` checks that all S3 requests require HTTPS).',
        'Remediation: Can automatically trigger remediation actions using AWS Systems Manager Automation runbooks (e.g. auto-close unauthorized open security group rules).'
      ],
      keyPointsVi: [
        'Ghi lại lịch sử cấu hình và mối quan hệ giữa các tài nguyên theo dòng thời gian (Configuration Timeline).',
        'Trả lời các câu hỏi kiểm toán: "Security Group này trông như thế nào vào 3 tuần trước?" hoặc "Ai đã sửa chính sách S3 bucket này vào thứ Ba tuần trước?".',
        'Config Rules: Đánh giá tài nguyên có vi phạm quy định không (ví dụ: rule kiểm tra cổng SSH 22 có bị mở toang ra thế giới 0.0.0.0/0 không; rule kiểm tra S3 bucket có bắt buộc mã hóa HTTPS không).',
        'Tự động sửa lỗi (Auto Remediation): Tự động thực thi kịch bản Systems Manager để đóng ngay lập tức cổng mạng vi phạm.'
      ],
      examTipsEn: [
        'Keywords: "track configuration changes over time", "audit resource configurations", "compliance timeline" -> AWS Config.'
      ],
      examTipsVi: [
        'Từ khóa vàng trong đề thi: "theo dõi thay đổi cấu hình theo thời gian (track configuration changes over time)", "kiểm toán tuân thủ cấu hình (audit compliance)", "xem lại lịch sử cấu hình trong quá khứ" -> Chọn AWS Config.'
      ],
      isCore: true
    },
    {
      id: 'lec-191',
      number: 191,
      titleEn: 'Amazon Macie Overview',
      titleVi: 'Tổng quan Amazon Macie (Phát hiện dữ liệu nhạy cảm PII trong S3)',
      summaryEn: 'Fully managed data security and data privacy service that uses machine learning and pattern matching to discover, classify, and protect sensitive data in Amazon S3.',
      summaryVi: 'Dịch vụ bảo mật dữ liệu sử dụng Machine Learning và đối sánh mẫu để tự động quét tìm, phân loại và bảo vệ dữ liệu nhạy cảm PII trong các Amazon S3 bucket.',
      keyPointsEn: [
        'Target: Exclusively inspects Amazon S3 buckets.',
        'Discovers PII (Personally Identifiable Information): Credit card numbers, Social Security Numbers (SSN), passport numbers, bank account details, and private healthcare data.',
        'Uses Machine Learning and Regex pattern matching to scan text files, CSV, JSON, Parquet, and PDF documents stored in S3.',
        'Helps organizations comply with data privacy regulations like GDPR, HIPAA, and PCI DSS.'
      ],
      keyPointsVi: [
        'Đối tượng quét: Chuyên biệt quét các bucket lưu trữ trên Amazon S3.',
        'Phát hiện dữ liệu định danh cá nhân nhạy cảm (PII - Personally Identifiable Information): Số thẻ tín dụng, số căn cước công dân (SSN), số hộ chiếu, số tài khoản ngân hàng, thông tin bệnh án.',
        'Sử dụng Machine Learning và biểu thức chính quy (Regex) quét các file văn bản, CSV, JSON, Parquet, tài liệu PDF nằm trong S3.',
        'Giúp doanh nghiệp tuân thủ các quy định bảo vệ dữ liệu nghiêm ngặt như GDPR, HIPAA, PCI DSS.'
      ],
      examTipsEn: [
        'Keywords: "find sensitive data / PII in Amazon S3", "credit card numbers in S3 buckets", "protect data privacy with ML" -> Amazon Macie.'
      ],
      examTipsVi: [
        'Từ khóa vàng trong đề thi: "tìm dữ liệu nhạy cảm PII trong Amazon S3", "quét số thẻ tín dụng hoặc số hộ chiếu trong S3 bucket" -> Chọn Amazon Macie.'
      ],
      isCore: true
    },
    {
      id: 'lec-192',
      number: 192,
      titleEn: 'AWS Security Hub Overview',
      titleVi: 'Tổng quan AWS Security Hub (Trung tâm tổng hợp cảnh báo bảo mật toàn diện)',
      summaryEn: 'Cloud security posture management service that aggregates, organizes, and prioritizes security findings from multiple AWS services and third-party partners.',
      summaryVi: 'Dịch vụ quản trị tư thế bảo mật đám mây giúp thu thập, tổng hợp và xếp thứ tự ưu tiên các cảnh báo bảo mật từ nhiều dịch vụ AWS và đối tác bên thứ ba trên toàn bộ tài khoản.',
      keyPointsEn: [
        'Central Dashboard: Aggregates findings from AWS GuardDuty, Amazon Inspector, Amazon Macie, AWS IAM Access Analyzer, AWS Firewall Manager, and AWS Health.',
        'Automated Security Checks: Runs continuous compliance checks against security industry standards (e.g. AWS Foundational Security Best Practices, CIS AWS Foundations Benchmark, PCI DSS).',
        'Multi-Account Management: Centrally aggregates security alerts across all AWS accounts within an AWS Organization.',
        'Prerequisite: Must enable AWS Config before activating Security Hub.'
      ],
      keyPointsVi: [
        'Bảng điều khiển trung tâm (Single pane of glass): Tổng hợp tất cả cảnh báo từ GuardDuty, Inspector, Macie, IAM Access Analyzer, Firewall Manager.',
        'Đánh giá tuân thủ tự động: Chấm điểm và kiểm tra liên tục theo các bộ tiêu chuẩn bảo mật hàng đầu (AWS Foundational Security Best Practices, chuẩn CIS Benchmark, PCI DSS).',
        'Hỗ trợ đa tài khoản: Gom tất cả phát hiện bảo mật từ hàng trăm tài khoản trong AWS Organizations về một nơi duy nhất.',
        'Điều kiện tiên quyết: Bắt buộc phải bật AWS Config trước khi kích hoạt Security Hub.'
      ],
      examTipsEn: [
        'Keywords: "central dashboard aggregating alerts from multiple AWS security services", "single pane of glass", "CIS benchmark compliance check" -> AWS Security Hub.'
      ],
      examTipsVi: [
        'Từ khóa vàng trong đề thi: "bảng điều khiển trung tâm gom cảnh báo từ GuardDuty, Inspector, Macie", "single pane of glass", "kiểm tra tuân thủ chuẩn CIS Benchmark" -> Chọn AWS Security Hub.'
      ],
      isCore: true
    },
    {
      id: 'lec-193',
      number: 193,
      titleEn: 'Amazon Detective Overview',
      titleVi: 'Tổng quan Amazon Detective (Điều tra nguyên nhân gốc rễ sự cố bảo mật)',
      summaryEn: 'Security analysis service that simplifies and accelerates investigation of root causes of potential security issues using graph theory and machine learning.',
      summaryVi: 'Dịch vụ phân tích bảo mật giúp điều tra nhanh chóng và trực quan hóa nguyên nhân gốc rễ của các sự cố an ninh bằng đồ thị quan hệ và Machine Learning.',
      keyPointsEn: [
        'Purpose: Takes findings from GuardDuty, Macie, and Security Hub and analyzes the root cause (Who did what, when, from where, and which resources were impacted?).',
        'Visual Graph Model: Automatically builds an interactive graph showing timelines, IP connections, and resource interactions over time.',
        'Consumes log data directly from VPC Flow Logs, AWS CloudTrail, and Amazon EKS audit logs without any user configuration.'
      ],
      keyPointsVi: [
        'Mục đích: Tiếp nhận các cảnh báo từ GuardDuty, Macie, Security Hub và tiến hành điều tra sâu nguyên nhân gốc rễ (Ai đã làm gì, vào thời điểm nào, từ địa chỉ IP nào, ảnh hưởng đến tài nguyên nào?).',
        'Mô hình đồ thị trực quan (Visual Graph): Tự động xây dựng đồ thị tương tác thể hiện dòng thời gian, các kết nối IP và tương tác tài nguyên theo thời gian.',
        'Tự động thu thập dữ liệu từ VPC Flow Logs, CloudTrail và nhật ký EKS audit logs mà không đòi hỏi người dùng phải cấu hình đường ống dẫn dữ liệu.'
      ],
      examTipsEn: [
        'GuardDuty detects the threat -> Amazon Detective investigates the root cause using visual graph models.'
      ],
      examTipsVi: [
        'Phân biệt: GuardDuty là bên "bấm chuông báo động" phát hiện ra đe dọa. Còn Amazon Detective là "thám tử điều tra" nguyên nhân gốc rễ (root-cause analysis) bằng sơ đồ đồ thị trực quan.'
      ],
      isCore: true
    },
    {
      id: 'lec-194',
      number: 194,
      titleEn: 'AWS Abuse Team Overview',
      titleVi: 'Tổng quan AWS Abuse Team (Báo cáo hành vi lạm dụng tài nguyên AWS)',
      summaryEn: 'How and when to report abusive, malicious, or illegal activity originating from AWS resources to the dedicated AWS Trust & Safety team.',
      summaryVi: 'Quy trình và tình huống báo cáo hành vi lạm dụng, độc hại hoặc bất hợp pháp bắt nguồn từ tài nguyên AWS tới đội ngũ chuyên trách AWS Abuse.',
      keyPointsEn: [
        'What to report: Spam emails sent from EC2 instances, port scanning originating from AWS IPs, Denial of Service (DoS) attacks launched from AWS, malware distribution hosted on S3 or EC2, copyright infringement, or abusive phishing sites.',
        'Contact method: Submit the web form at `aws.amazon.com/security/abuse` or email directly to `abuse@amazonaws.com`.',
        'AWS Trust & Safety team investigates and works with the resource owner to mitigate the abuse or terminate offending accounts.'
      ],
      keyPointsVi: [
        'Các hành vi cần báo cáo: Phát hiện email rác (spam) gửi từ máy chủ EC2, máy chủ AWS đang quét cổng trái phép vào mạng công ty bạn, máy chủ AWS phát động tấn công DoS, phát tán mã độc từ S3, trang web lừa đảo (phishing) đặt trên AWS.',
        'Cách thức báo cáo: Gửi biểu mẫu qua trang web `aws.amazon.com/security/abuse` hoặc gửi email trực tiếp tới hộp thư `abuse@amazonaws.com`.',
        'Đội ngũ AWS Trust & Safety sẽ trực tiếp điều tra, liên hệ với chủ tài khoản vi phạm để ngăn chặn hành vi hoặc khóa vĩnh viễn tài khoản đó.'
      ],
      examTipsEn: [
        'Keywords: "suspect AWS resources are being used for abusive or illegal activities (spam, port scanning, malware)" -> AWS Abuse Team.'
      ],
      examTipsVi: [
        'Từ khóa trong đề thi: "nghi ngờ tài nguyên AWS đang bị sử dụng để phát tán spam, quét cổng, hoặc tấn công mạng" -> Báo cáo tới AWS Abuse Team (`abuse@amazonaws.com`).'
      ],
      isCore: true
    },
    {
      id: 'lec-195',
      number: 195,
      titleEn: 'Root User Privileges & Exclusive Tasks',
      titleVi: 'Đặc quyền Tối cao của Root User & Các tác vụ ĐỘC QUYỀN',
      summaryEn: 'Comprehensive list of account-level administrative actions that CAN ONLY be performed by the AWS Account Root User and CANNOT be delegated to IAM users.',
      summaryVi: 'Danh sách toàn diện các tác vụ quản trị tài khoản tối cao mà CHỈ DUY NHẤT Root User mới có thể thực hiện, tuyệt đối không thể phân quyền cho IAM User hay IAM Role.',
      keyPointsEn: [
        'Account Lifecycle: Change AWS account name, root user password, root user email address, and permanently close the AWS account.',
        'Billing & Support: Change or cancel AWS Support Plan; register as a seller in the Reserved Instance Marketplace; configure payment currency.',
        'Special Permissions: Enable S3 MFA Delete on a bucket; restore permissions for an IAM user or role if all admin access is accidentally locked out; sign AWS customer agreements.',
        'Security Best Practice: Lock away root credentials, enable hardware/virtual MFA immediately, and use IAM Identity Center / IAM users with least privilege for all daily tasks.'
      ],
      keyPointsVi: [
        'Vòng đời tài khoản: Đổi tên tài khoản AWS, đổi mật khẩu root, đổi địa chỉ email root và đóng tài khoản AWS vĩnh viễn.',
        'Thanh toán & Gói hỗ trợ: Thay đổi hoặc hủy gói AWS Support Plan; đăng ký làm người bán trên sàn trao đổi Reserved Instance; thay đổi đơn vị tiền tệ thanh toán.',
        'Quyền bảo mật đặc biệt: Kích hoạt tính năng S3 MFA Delete; khôi phục quyền truy cập khi tất cả tài khoản quản trị IAM vô tình bị khóa; ký các thỏa thuận khách hàng cấp tài khoản.',
        'Nguyên tắc bảo mật sống còn: Cất kỹ thông tin root, bật ngay MFA (tốt nhất là hardware MFA) và không bao giờ dùng tài khoản root cho các công việc vận hành hàng ngày.'
      ],
      table: {
        headers: ['Tác vụ trên AWS', 'Root User có làm được không?', 'IAM Administrator (Full Access) có làm được không?'],
        rows: [
          ['Đóng vĩnh viễn tài khoản AWS', 'CÓ (ĐỘC QUYỀN)', 'KHÔNG THỂ'],
          ['Thay đổi gói AWS Support Plan', 'CÓ (ĐỘC QUYỀN)', 'KHÔNG THỂ'],
          ['Bật tính năng S3 MFA Delete', 'CÓ (ĐỘC QUYỀN)', 'KHÔNG THỂ'],
          ['Đổi địa chỉ email tài khoản root', 'CÓ (ĐỘC QUYỀN)', 'KHÔNG THỂ'],
          ['Tạo EC2, RDS, S3, VPC hàng ngày', 'CÓ (nhưng KHÔNG NÊN)', 'CÓ (Khuyên dùng chuẩn bảo mật)']
        ]
      },
      examTipsEn: [
        'Questions asking "Which action can ONLY be performed by the AWS account root user?" -> Look for: Close AWS account, Change Support Plan, or Configure S3 MFA Delete.'
      ],
      examTipsVi: [
        'Câu hỏi kinh điển trong đề thi: "Hành động nào sau đây CHỈ CÓ THỂ thực hiện bởi Root User?" -> Tìm ngay các đáp án: Đóng tài khoản (Close account), Đổi gói hỗ trợ (Change AWS Support Plan), hoặc Bật S3 MFA Delete.'
      ],
      isCore: true
    },
    {
      id: 'lec-196',
      number: 196,
      titleEn: 'IAM Access Analyzer Overview',
      titleVi: 'Tổng quan IAM Access Analyzer (Rà soát tài nguyên chia sẻ ngoài Vùng Tin cậy)',
      summaryEn: 'Automated reasoning tool that analyzes resource policies to identify any resources exposed to external entities outside your Zone of Trust.',
      summaryVi: 'Công cụ sử dụng phương pháp chứng minh toán học giúp phân tích các chính sách tài nguyên nhằm phát hiện các tài nguyên bị chia sẻ ra ngoài Vùng Tin cậy (Zone of Trust).',
      keyPointsEn: [
        'Zone of Trust: Defined as the current AWS account or the entire AWS Organization.',
        'Resource Policies inspected: Amazon S3 bucket policies, IAM role trust policies, AWS KMS keys, Amazon SQS queues, and AWS Lambda permissions.',
        'Detects External Access: Alerts when a resource policy allows access from an external AWS account, anonymous public internet, or untrusted federated users.',
        'Provides actionable findings to immediately revoke unintended public or cross-account access.'
      ],
      keyPointsVi: [
        'Vùng tin cậy (Zone of Trust): Được định nghĩa là tài khoản AWS hiện tại hoặc toàn bộ tổ chức AWS Organizations.',
        'Các chính sách tài nguyên được rà soát: S3 Bucket Policy, IAM Role Trust Policy, AWS KMS Key Policy, Amazon SQS Queue Policy và Lambda Resource Policy.',
        'Phát hiện truy cập ngoại lai: Đưa ra cảnh báo ngay khi một tài nguyên đang cho phép truy cập từ một tài khoản AWS lạ bên ngoài, từ Internet công cộng (Public Access), hoặc từ người dùng không tin cậy.',
        'Cung cấp hướng dẫn hành động cụ thể để quản trị viên thu hồi ngay các quyền chia sẻ sai lầm.'
      ],
      examTipsEn: [
        'Keywords: "identify resources shared with external entities outside the zone of trust" -> IAM Access Analyzer.'
      ],
      examTipsVi: [
        'Từ khóa trong đề thi: "xác định tài nguyên nào đang bị chia sẻ ra ngoài vùng tin cậy (zone of trust)" -> Chọn IAM Access Analyzer.'
      ],
      isCore: true
    },
    {
      id: 'lec-197',
      number: 197,
      titleEn: 'Security & Compliance Summary: Rapid Cheat Sheet & Exam Decision Matrix',
      titleVi: 'Tổng kết Bảo mật & Tuân thủ: Bảng tra cứu Siêu tốc & Ma trận Quyết định Đề thi',
      summaryEn: 'High-density recap of all AWS Security, Identity, and Compliance services with a 1-line definition per service and an 8-scenario exam decision matrix.',
      summaryVi: 'Bảng tổng hợp cô đọng toàn bộ các dịch vụ Bảo mật, Danh tính và Tuân thủ của AWS: quy tắc 1 dòng cho mỗi dịch vụ và ma trận phân định tình huống thi CLF-C02.',
      keyPointsEn: [
        'AWS Shield: DDoS protection (Standard = free L3/4, Advanced = $3,000/mo with 24/7 SRT).',
        'AWS WAF: Layer 7 firewall against SQLi, XSS, rate-limiting on ALB/CloudFront.',
        'AWS KMS: Managed encryption keys (Customer Managed vs AWS Managed).',
        'AWS CloudHSM: Dedicated hardware encryption module, FIPS 140-2 Level 3, customer-exclusive management.',
        'AWS ACM: Free SSL/TLS certificates with automated renewals.',
        'AWS Secrets Manager: Secret storage with automated password rotation for RDS.',
        'AWS Artifact: On-demand portal for compliance reports (SOC, PCI) and agreements (HIPAA BAA).',
        'Amazon GuardDuty: Intelligent threat detection using ML on CloudTrail, VPC Flow, and DNS logs (crypto mining).',
        'Amazon Inspector: Automated vulnerability (CVE) scanning on EC2, ECR container images, Lambda.',
        'AWS Config: Resource configuration history, audit timeline, and compliance rules.',
        'Amazon Macie: Discovers sensitive data (PII) in Amazon S3 buckets.',
        'AWS Security Hub: Central dashboard aggregating findings across accounts (requires Config).',
        'Amazon Detective: Root-cause analysis and visual graphs for security findings.',
        'AWS Abuse: Report malicious activity originating from AWS to abuse@amazonaws.com.',
        'Root User: Exclusive privileges (close account, change support plan, S3 MFA Delete).'
      ],
      keyPointsVi: [
        'AWS Shield: Chống DDoS (Standard = miễn phí tầng 3/4; Advanced = $3.000/tháng có đội SRT 24/7).',
        'AWS WAF: Tường lửa tầng 7 chặn SQL Injection, XSS, giới hạn request trên ALB/CloudFront.',
        'AWS KMS: Dịch vụ quản lý khóa mã hóa đa người dùng do AWS vận hành.',
        'AWS CloudHSM: Thiết bị phần cứng mã hóa chuyên dụng FIPS 140-2 Level 3 do khách hàng độc quyền quản lý.',
        'AWS ACM: Cấp phát và tự động gia hạn chứng chỉ số SSL/TLS miễn phí.',
        'AWS Secrets Manager: Lưu trữ mật khẩu CSDL có tính năng tự động xoay vòng (rotation) cho RDS.',
        'AWS Artifact: Cổng tải báo cáo kiểm toán tuân thủ (SOC, PCI, ISO) và ký thỏa thuận pháp lý (HIPAA BAA).',
        'Amazon GuardDuty: Phát hiện đe dọa thông minh dùng ML trên CloudTrail, VPC Flow, DNS log (đào trộm coin).',
        'Amazon Inspector: Quét lỗ hổng phần mềm CVE tự động cho EC2, container ECR và Lambda.',
        'AWS Config: Kiểm toán lịch sử thay đổi cấu hình tài nguyên theo dòng thời gian.',
        'Amazon Macie: Dùng ML quét tìm dữ liệu nhạy cảm PII trong Amazon S3.',
        'AWS Security Hub: Bảng điều khiển trung tâm gom mọi cảnh báo bảo mật từ nhiều tài khoản.',
        'Amazon Detective: Điều tra nguyên nhân gốc rễ sự cố bằng đồ thị trực quan.',
        'AWS Abuse: Báo cáo tài nguyên AWS bị kẻ xấu lợi dụng spam/tấn công tới abuse@amazonaws.com.',
        'Root User: Nắm giữ các quyền tối cao duy nhất (đóng tài khoản, đổi support plan, S3 MFA Delete).'
      ],
      table: {
        headers: ['Tình huống đề thi CLF-C02', 'Dịch vụ AWS chính xác', 'Từ khóa nhận diện cốt lõi'],
        rows: [
          ['Chặn tấn công SQL Injection và XSS vào website', 'AWS WAF', 'Layer 7, HTTP/HTTPS, Web ACL, SQLi, XSS'],
          ['Chống tấn công DDoS có đội ngũ chuyên gia 24/7 và bảo hiểm chi phí', 'AWS Shield Advanced', 'DDoS, 24/7 SRT team, cost protection'],
          ['Mã hóa cần phần cứng chuyên dụng đạt chuẩn FIPS 140-2 Level 3', 'AWS CloudHSM', 'Dedicated hardware, customer manages keys exclusively'],
          ['Tự động đổi mật khẩu cơ sở dữ liệu RDS định kỳ', 'AWS Secrets Manager', 'Database credentials, automated rotation via Lambda'],
          ['Cung cấp báo cáo kiểm toán SOC và ISO cho cơ quan quản lý', 'AWS Artifact', 'Compliance reports, third-party audit, BAA agreement'],
          ['Phát hiện máy chủ EC2 bị chiếm quyền để đào tiền ảo Bitcoin', 'Amazon GuardDuty', 'Intelligent threat detection, ML, crypto mining'],
          ['Quét lỗ hổng bảo mật CVE và thư viện lỗi thời trên EC2 & ECR', 'Amazon Inspector', 'Vulnerability scanning, CVE, container images'],
          ['Tìm số thẻ tín dụng hoặc số định danh cá nhân bị lộ trong S3', 'Amazon Macie', 'PII, sensitive data in Amazon S3, machine learning'],
          ['Kiểm tra xem cổng SSH 22 có bị ai mở ra Internet vào tuần trước', 'AWS Config', 'Configuration history, timeline, compliance rule'],
          ['Hành động đóng tài khoản AWS hoặc đổi gói Support Plan', 'Root User', 'Account closing, support plan change, S3 MFA Delete']
        ]
      },
      examTipsEn: [
        'Memorize the 1-line purpose of each security service: GuardDuty = Detects Threats; Inspector = Scans Vulnerabilities; Config = Audits Configurations; Macie = Finds PII; Artifact = Compliance Reports; Secrets Manager = Rotates Passwords.'
      ],
      examTipsVi: [
        'Ghi nhớ quy tắc thần chú 1 dòng: GuardDuty = Bắt kẻ trộm (đào coin); Inspector = Khám bệnh phần mềm (CVE); Config = Xem camera lịch sử cấu hình; Macie = Tìm số thẻ ngân hàng trong S3; Artifact = Tải bằng khen kiểm toán; Secrets Manager = Đổi chìa khóa định kỳ.'
      ],
      isCore: true
    }
  ]
};
