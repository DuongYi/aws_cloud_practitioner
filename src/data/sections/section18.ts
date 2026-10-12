import { SectionItem } from '../../types';

export const section18Data: SectionItem = {
  id: 'section-18',
  sectionNumber: 18,
  titleEn: 'Account Management, Billing & AWS Support (Organizations, Control Tower, RAM, Service Catalog, Pricing Models, Cost Tools, Trusted Advisor & Support Plans)',
  titleVi: 'Quản trị Tài khoản, Thanh toán Chi phí & Các gói Hỗ trợ AWS Support (Organizations, Control Tower, RAM, Mô hình giá, Bộ công cụ chi phí, Trusted Advisor & Hỗ trợ kỹ thuật)',
  domain: 'Domain 4: Billing, Pricing and Support',
  weightPercentage: '16%',
  badge: 'Billing & Support Core (16% Exam)',
  overviewEn: 'Section 18 covers essential enterprise governance, multi-account architecture, billing mechanics, costing tools, and technical support plans critical for the AWS Certified Cloud Practitioner CLF-C02 exam (accounting for 16% of total exam questions under Domain 4). Master AWS Organizations (management vs member accounts, consolidated billing, volume discounts, SCP boundary enforcement), AWS Control Tower (automated landing zones, blueprints, preventive and detective guardrails), AWS Resource Access Manager (RAM - sharing subnets, transit gateways, license manager without resource duplication), AWS Service Catalog (governed self-service portals for pre-approved CloudFormation products), Cloud Pricing Models (Compute, Storage, Data Transfer rules), Savings Plans vs Reserved Instances, AWS Compute Optimizer (ML-driven right-sizing recommendations), and the definitive Cost Management Suite: AWS Pricing Calculator (pre-migration workload estimation), AWS Billing Dashboard & Cost Allocation Tags, AWS Cost & Usage Report (CUR - most granular S3 export), AWS Cost Explorer (historical trends & 12-month ML forecasting), AWS Budgets (proactive alerts on actual or forecasted spending/usage), AWS Cost Anomaly Detection (root-cause ML spike analysis), AWS Service Quotas (central limits monitoring & increase requests), AWS Trusted Advisor (6 architecture pillars, free core checks vs full checks), and AWS Support Plans (Basic, Developer, Business, Enterprise On-Ramp, Enterprise with designated TAM & Concierge).',
  overviewVi: 'Section 18 bao quát toàn diện các dịch vụ quản trị doanh nghiệp đa tài khoản, cơ chế thanh toán hóa đơn, mô hình giá điện toán đám mây, bộ công cụ tối ưu hóa chi phí và các gói hỗ trợ kỹ thuật trọng yếu của Domain 4 trong đề thi AWS Certified Cloud Practitioner CLF-C02 (chiếm 16% tổng số câu hỏi bài thi). Nắm vững AWS Organizations (tài khoản quản lý, tài khoản thành viên, thanh toán hợp nhất consolidated billing, gộp lưu lượng nhận chiết khấu theo bậc, chính sách kiểm soát dịch vụ SCP), AWS Control Tower (thiết lập vùng hạ cánh an toàn Landing Zone, áp đặt rào chắn bảo vệ Guardrails ngăn chặn và phát hiện vi phạm), AWS RAM (chia sẻ mạng VPC Subnet, Transit Gateway xuyên tài khoản mà không cần nhân bản tài nguyên), AWS Service Catalog (cổng tự phục vụ các sản phẩm CNTT đã được phê duyệt), Mô hình giá trên Cloud (Tính toán, Lưu trữ, Truyền dữ liệu miễn phí chiều vào - Ingress Free), Savings Plans cam kết chi tiêu theo $/giờ, AWS Compute Optimizer (Machine Learning phân tích và gợi ý thu nhỏ máy chủ EC2/EBS để tiết kiệm tiền), Bộ công cụ quản lý chi phí toàn diện: AWS Pricing Calculator (ước tính chi phí trước khi di chuyển lên cloud), Thẻ phân bổ chi phí Cost Allocation Tags, AWS CUR (bộ dữ liệu hóa đơn chi tiết nhất xuất ra S3), AWS Cost Explorer (theo dõi chi tiêu và dự báo 12 tháng), AWS Budgets (cảnh báo vượt ngưỡng thực tế hoặc DỰ BÁO), AWS Cost Anomaly Detection (AI phát hiện đột biến chi phí bất thường), AWS Service Quotas (quản lý giới hạn tài nguyên tập trung), AWS Trusted Advisor (6 trụ cột tối ưu kiến trúc, phân biệt bài kiểm tra cơ bản miễn phí vs kiểm tra toàn diện), cùng Bảng so sánh 4 gói hỗ trợ kỹ thuật AWS Support Plans (Basic, Developer, Business, Enterprise với kỹ sư TAM và đội Concierge chăm sóc thanh toán chuyên biệt).',
  quickExamFacts: [
    {
      en: 'Organizations Consolidated Billing Benefits: One single bill for all member accounts, aggregation of resource usage across accounts to qualify for higher volume pricing tiers (e.g., S3 tier discounts), and sharing of unused Reserved Instances (RI) and Savings Plans discounts across all linked accounts.',
      vi: 'Lợi ích của Hóa đơn hợp nhất (Consolidated Billing): Nhận duy nhất 1 hóa đơn hàng tháng cho toàn bộ tài khoản; Gộp tổng dung lượng sử dụng của tất cả tài khoản thành viên để đạt các mức chiết khấu theo bậc cao hơn (ví dụ bậc giá S3 rẻ hơn khi dùng nhiều TB); Tự động chia sẻ giảm giá của Reserved Instances và Savings Plans chưa dùng hết cho các tài khoản khác trong cùng Organization.',
      isCoreHighlight: true
    },
    {
      en: 'Service Control Policies (SCPs): Restrict IAM actions that users and roles (including root user of member accounts) can perform within accounts or Organizational Units (OUs). SCPs are guardrails—they only filter permissions and DO NOT grant any permissions. SCPs NEVER apply to the Management (Master) account!',
      vi: 'Chính sách kiểm soát dịch vụ (SCP): Đặt ra ranh giới quyền hạn tối đa (guardrails) cho toàn bộ User và Role (kể cả root user của tài khoản thành viên). SCP chỉ có tác dụng lọc/chặn quyền chứ KHÔNG cấp thêm quyền. Quy tắc thi sống còn: SCP KHÔNG BAO GIỜ áp dụng lên tài khoản Quản lý (Management/Master account)!',
      isCoreHighlight: true
    },
    {
      en: 'AWS Control Tower vs Organizations: Organizations provides multi-account grouping and SCPs. Control Tower is a higher-level managed service that automates the setup of an entire secure multi-account environment ("Landing Zone") based on best-practice blueprints and applies pre-packaged Guardrails (Preventive via SCPs, Detective via AWS Config rules).',
      vi: 'AWS Control Tower so với AWS Organizations: Organizations cung cấp cấu trúc nhóm tài khoản và SCP cơ bản. Control Tower là dịch vụ tự động hóa cấp cao hơn, giúp dựng sẵn một môi trường đa tài khoản an toàn tiêu chuẩn ("Landing Zone") theo khuyến nghị của AWS và áp đặt các rào chắn Guardrails (Rào chắn ngăn chặn qua SCP, Rào chắn phát hiện vi phạm qua AWS Config).',
      isCoreHighlight: true
    },
    {
      en: 'AWS RAM (Resource Access Manager): Allows securely sharing specific AWS resources across AWS accounts or within an AWS Organization without duplicating them. Commonly shared: VPC Subnets (enables EC2 instances in different accounts to live in the same VPC!), AWS Transit Gateway, Route 53 Resolver rules, and License Manager licenses.',
      vi: 'AWS RAM (Resource Access Manager): Cho phép chia sẻ tài nguyên AWS cụ thể cho các tài khoản khác trong Organization mà không cần tạo bản sao. Tài nguyên hay được chia sẻ nhất trong đề thi: VPC Subnets (giúp các máy ảo EC2 của nhiều tài khoản khác nhau cùng cắm chung vào 1 VPC!), AWS Transit Gateway, luật Route 53 Resolver, và giấy phép bản quyền License Manager.',
      isCoreHighlight: true
    },
    {
      en: 'AWS Service Catalog: Central catalog of pre-approved, standardized IT services, stacks, and architectures (packaged as CloudFormation templates) that end users can quickly self-provision without direct IAM administrative permissions.',
      vi: 'AWS Service Catalog: Cổng danh mục tự phục vụ nội bộ chứa các ứng dụng, máy chủ và ngăn xếp hạ tầng (đóng gói bằng CloudFormation) đã được công ty kiểm duyệt và chuẩn hóa sẵn. Người dùng nghiệp vụ/developer có thể tự ấn nút triển khai nhanh mà không cần cấp quyền quản trị IAM sâu.',
      isCoreHighlight: true
    },
    {
      en: 'Cloud Pricing Fundamentals: 3 fundamental cost drivers: Compute (pay per second/minute of running instances), Storage (pay per GB/month stored), and Data Transfer OUT (outbound data to internet incurs fees; Data Transfer IN to AWS is always 100% FREE; intra-region transfers within same AZ are free).',
      vi: '3 Yếu tố cốt lõi tạo nên chi phí Cloud: (1) Compute - trả theo thời gian máy ảo/hàm thực thi (theo giây/phút); (2) Storage - trả theo dung lượng GB lưu trữ mỗi tháng; (3) Data Transfer OUT - truyền dữ liệu ra ngoài Internet bị tính phí (Chiều DỮ LIỆU ĐI VÀO AWS luôn luôn MIỄN PHÍ; truyền dữ liệu nội bộ giữa các dịch vụ trong cùng 1 Availability Zone cũng miễn phí).',
      isCoreHighlight: true
    },
    {
      en: 'Pricing Calculator vs Cost Explorer vs Budgets vs CUR: Pricing Calculator = ESTIMATE costs BEFORE building or migrating (prospective workload architecture). Cost Explorer = TRACK actual historical spend and FORECAST up to 12 months ahead. AWS Budgets = Proactive ALERTS (email/SNS) when actual OR forecasted costs exceed a defined threshold. CUR = Most comprehensive raw billing data exported to S3 for deep analysis.',
      vi: 'Bộ tứ Quản lý Chi phí: Pricing Calculator = ƯỚC TÍNH chi phí TRƯỚC KHI xây dựng hoặc di chuyển lên đám mây. Cost Explorer = THEO DÕI chi phí thực tế đã phát sinh trong quá khứ và DỰ BÁO tới 12 tháng tiếp theo. AWS Budgets = Đặt cảnh báo CHỦ ĐỘNG (email/SMS) khi chi phí thực tế HOẶC chi phí DỰ KIẾN vượt hạn mức định trước. CUR = Bộ dữ liệu chi tiết thô nhất xuất định kỳ vào S3 để chạy truy vấn Athena/Quicksight.',
      isCoreHighlight: true
    },
    {
      en: 'AWS Trusted Advisor Check Tiers: 6 Pillars (Cost Optimization, Performance, Security, Fault Tolerance, Service Limits, Operational Excellence). Basic & Developer Support get 7 Core Security & Quota checks only. Business & Enterprise Support get ALL full checks (including automated alerts, programmatic API access, and all recommendations).',
      vi: 'Các mức kiểm tra của AWS Trusted Advisor: Đánh giá theo 6 trụ cột (Tối ưu chi phí, Hiệu năng, Bảo mật, Chịu lỗi, Giới hạn dịch vụ, Vận hành xuất sắc). Gói Basic & Developer chỉ được kiểm tra 7 mục bảo mật & giới hạn cơ bản miễn phí. Gói Business & Enterprise được mở khóa TOÀN BỘ bài kiểm tra chuyên sâu (bao gồm kiểm tra mở cổng bảo mật, gợi ý xóa tài nguyên nhàn rỗi, hỗ trợ gọi API).',
      isCoreHighlight: true
    },
    {
      en: 'AWS Support Plans Severity & SLA Matrix: Basic (Free, 24/7 customer service & docs only). Developer (Business hours email, General < 24h, System impaired < 12h). Business (24/7 phone/chat/email, Prod system impaired < 4h, Prod system down < 1h). Enterprise (Designated Technical Account Manager TAM, Concierge billing team, Business-critical system down < 15 min response time!).',
      vi: 'Ma trận các gói AWS Support: Basic (Miễn phí, chỉ hỏi đáp thanh toán và xem tài liệu). Developer (Email trong giờ hành chính, hướng dẫn chung < 24h, hệ thống bị ảnh hưởng < 12h). Business (24/7 điện thoại/chat/email, hệ thống Production bị chậm < 4h, hệ thống Production sập < 1h). Enterprise (Có kỹ sư TAM chuyên trách riêng, đội chăm sóc hóa đơn Concierge, hệ thống trọng yếu sống còn sập < 15 PHÚT phản hồi!).',
      isCoreHighlight: true
    }
  ],
  lectures: [
    {
      id: 'lec-209',
      number: 209,
      titleEn: 'AWS Organizations Overview & Service Control Policies (SCPs)',
      titleVi: 'Tổng quan AWS Organizations & Chính sách Kiểm soát Dịch vụ (SCPs)',
      duration: '11m',
      summaryEn: 'AWS Organizations enables central management and governance across multiple AWS accounts. Understand the root container, Organizational Units (OUs), the single Management Account, Member Accounts, hierarchical policy inheritance, and Service Control Policies (SCPs) that enforce permission boundaries.',
      summaryVi: 'AWS Organizations là dịch vụ quản lý và quản trị tập trung nhiều tài khoản AWS trong doanh nghiệp. Hiểu rõ cấu trúc thư mục gốc Root, các Đơn vị Tổ chức (Organizational Units - OUs), Tài khoản Quản lý (Management Account), các Tài khoản Thành viên (Member Accounts), cơ chế kế thừa chính sách dạng cây và Chính sách Kiểm soát Dịch vụ (SCPs) để thiết lập rào chắn quyền hạn tối đa.',
      keyPointsEn: [
        'Multi-Account Strategy: Isolates workloads (dev, test, prod, security, audit), contains security blast radius, separates billing and environments, and prevents single-point administrative compromise.',
        'Core Hierarchy: Root (top-level container) -> Organizational Units (OUs: folders grouping accounts, can be nested) -> AWS Accounts (Management Account and Member Accounts).',
        'Management Account (Master Account): The single root account that creates the Organization, pays all bills, invites member accounts, and configures governance policies. Cannot be restricted by SCPs.',
        'Member Accounts: Independent AWS accounts belonging to the Organization. Can be created directly within Organizations or invited from external accounts.',
        'Service Control Policies (SCPs): JSON policy documents attached to Root, OUs, or individual accounts that define the MAXIMUM allowable permissions for IAM users and roles in those accounts.',
        'SCP Rules for Exam: (1) SCPs DO NOT grant permissions (IAM policies still required inside the account); (2) Explicit DENY in SCP overrides any IAM allow; (3) Root user inside a member account IS subject to SCPs; (4) The Management Account is NEVER affected by SCPs.',
        'Hierarchical Inheritance: If an SCP restricts a service (e.g., deny dynamodb:*) at an OU level, all nested OUs and accounts beneath it automatically inherit that restriction.'
      ],
      keyPointsVi: [
        'Chiến lược Đa tài khoản (Multi-Account): Phân tách môi trường làm việc (dev, test, prod, security, audit), khoanh vùng bán kính thiệt hại khi bị tấn công, tách biệt ngân sách và ngăn chặn rủi ro quản trị tập trung 1 chỗ.',
        'Phân cấp tổ chức: Root (gốc trên cùng) -> OUs (Organizational Units - các thư mục nhóm tài khoản, có thể lồng nhau) -> Các tài khoản AWS (Tài khoản Quản lý và các Tài khoản Thành viên).',
        'Management Account (Tài khoản Quản lý): Tài khoản gốc khởi tạo Organization, chịu trách nhiệm thanh toán toàn bộ chi phí, mời thành viên và ban hành chính sách. Không thể bị áp đặt SCP.',
        'Member Accounts (Tài khoản Thành viên): Các tài khoản AWS độc lập thuộc tổ chức. Có thể được tạo mới trực tiếp từ console Organizations hoặc mời từ bên ngoài vào.',
        'Service Control Policies (SCPs): Văn bản chính sách định dạng JSON gắn vào Root, OU hoặc từng tài khoản riêng lẻ nhằm thiết lập ranh giới quyền hạn TỐI ĐA (Allowlist hoặc Blocklist) cho mọi IAM User/Role trong tài khoản đó.',
        'Quy tắc vàng về SCP khi thi: (1) SCP KHÔNG cấp thêm quyền (bên trong tài khoản vẫn phải có IAM Policy); (2) Lệnh DENY trong SCP luôn ghi đè mọi quyền ALLOW; (3) Root user của tài khoản thành viên CŨNG PHẢI TUÂN THỦ SCP; (4) Tài khoản Management Account KHÔNG BAO GIỜ bị ảnh hưởng bởi SCP.',
        'Kế thừa phân cấp: Nếu SCP chặn một dịch vụ (ví dụ chặn DynamoDB) ở cấp thư mục OU cha, tất cả các OU con và tài khoản bên dưới đều tự động kế thừa lệnh cấm đó.'
      ],
      isCore: true,
      table: {
        headers: ['Đặc điểm so sánh', 'Chính sách IAM (IAM Policy)', 'Chính sách Kiểm soát Dịch vụ (SCP)'],
        rows: [
          ['Nơi gắn chính sách', 'Gắn vào IAM User, Group, Role bên trong 1 tài khoản', 'Gắn vào Root, OU hoặc Tài khoản trong Organizations'],
          ['Mục đích chính', 'CẤP quyền cụ thể để thực thi các lệnh API trên AWS', 'Thiết lập RANH GIỚI quyền tối đa (chỉ lọc, không cấp quyền)'],
          ['Ảnh hưởng tới Root User', 'Root user bỏ qua mọi IAM policy (luôn có quyền tối cao)', 'Root user của Tài khoản Thành viên BỊ KHỐNG CHẾ bởi SCP'],
          ['Ảnh hưởng tới Management Account', 'Áp dụng bình thường cho các User/Role trong Management Acc', 'KHÔNG BAO GIỜ áp dụng lên Management Account']
        ]
      }
    },
    {
      id: 'lec-210',
      number: 210,
      titleEn: 'AWS Organizations Hands-on Walkthrough',
      titleVi: 'Thực hành AWS Organizations: Tạo OU, Mời tài khoản & Cấu hình SCP',
      duration: '9m',
      summaryEn: 'Practical demonstration of creating an AWS Organization, adding Member Accounts, constructing nested Organizational Units (e.g., Core, Workloads, Sandbox), creating custom SCPs (such as disabling unapproved AWS Regions), and observing permission enforcement.',
      summaryVi: 'Thực hành từng bước khởi tạo AWS Organization từ AWS Console: thêm tài khoản thành viên, xây dựng cấu trúc OU phân tầng (Core, Workloads, Sandbox), viết chính sách SCP tùy chỉnh (ví dụ: cấm khởi tạo tài nguyên ngoài khu vực Singapore hoặc chặn xóa VPC Flow Logs) và kiểm tra hiệu lực thực tế.',
      keyPointsEn: [
        'Organization Creation: Initiated from the primary account which automatically becomes the Management Account.',
        'OU Architecture Design: Standard AWS best practice organizes accounts into Core (Log Archive, Security Tooling) and Workloads (Dev, Test, Prod) and Sandbox (experimental, strictly restricted).',
        'Full Features Mode: Required to enable Service Control Policies (Consolidated Billing Only mode only shares invoices but disables SCPs).',
        'Region Restriction SCP Pattern: Common enterprise SCP that denies all actions unless `aws:RequestedRegion` is in an approved list (e.g., ap-southeast-1, us-east-1).',
        'Prevent Leaving Organization: Organizations can prevent member accounts from removing themselves from the organization via SCPs and governance settings.'
      ],
      keyPointsVi: [
        'Khởi tạo Organization: Bắt đầu từ tài khoản chính, tài khoản này sẽ tự động trở thành Management Account vĩnh viễn.',
        'Mô hình cây OU chuẩn: Thực hành tốt nhất của AWS chia thành các OU: Core (chứa Log Archive, Security Tooling), Workloads (chứa Dev, Test, Prod) và Sandbox (môi trường thử nghiệm, bị giới hạn ngân sách nghiêm ngặt).',
        'Chế độ Full Features: Bắt buộc bật chế độ Full Features để sử dụng SCPs (nếu chỉ bật Consolidated Billing Only thì chỉ gộp hóa đơn chứ không quản trị được quyền SCP).',
        'Mẫu SCP chặn Region: Mẫu chính sách kinh điển trong doanh nghiệp chặn người dùng tạo tài nguyên ở các Region lạ để tránh phát sinh chi phí ngầm (chỉ cho phép hoạt động ở Region được phê duyệt).',
        'Ngăn chặn rời tổ chức: Có thể dùng SCP ngăn không cho tài khoản thành viên tự ý rời khỏi Organization.'
      ],
      isCore: false
    },
    {
      id: 'lec-211',
      number: 211,
      titleEn: 'AWS Organizations: Consolidated Billing & Cost Optimization',
      titleVi: 'Thanh toán Hợp nhất (Consolidated Billing) & Tối ưu Chi phí trong Organizations',
      duration: '10m',
      summaryEn: 'How Consolidated Billing aggregates invoices across all member accounts into a single payment method. Learn about aggregated volume tier discounts (S3, Data Transfer), sharing Reserved Instances and Savings Plans across accounts, and how to manage discount sharing preferences.',
      summaryVi: 'Cơ chế hoạt động của tính năng Thanh toán Hợp nhất (Consolidated Billing): gom toàn bộ chi phí của mọi tài khoản thành viên vào 1 phương thức thanh toán duy nhất của Management Account. Khám phá lợi ích gộp dung lượng sử dụng để hưởng chiết khấu bậc thang theo số lượng lớn (S3, Data Transfer) và cơ chế tự động chia sẻ giảm giá của Reserved Instances và Savings Plans xuyên suốt các tài khoản.',
      keyPointsEn: [
        'Single Monthly Bill: Management Account receives one consolidated invoice covering all member accounts, eliminating the need to manage multiple credit cards or corporate purchase orders.',
        'Aggregated Volume Pricing: AWS combines the usage of all member accounts across services with tiered pricing (e.g., Amazon S3 storage tiers, CloudFront data transfer) so the entire company reaches cheaper price brackets faster.',
        'Example of Tier Pooling: If Account A uses 30 TB of S3 and Account B uses 30 TB of S3, they are billed together for 60 TB, unlocking the cheaper 50+ TB pricing tier for both.',
        'Reserved Instance (RI) & Savings Plans Sharing: If Account A purchases an EC2 Reserved Instance but doesn\'t run an instance matching that type at 2 PM, Account B running an identical instance will automatically benefit from that RI discount during that hour!',
        'Disabling Discount Sharing: Management accounts can selectively disable RI and Savings Plans discount sharing for specific accounts if strict financial isolation or business unit chargebacks require it.',
        'No Extra Cost: Consolidated Billing and AWS Organizations are completely FREE services provided by AWS.'
      ],
      keyPointsVi: [
        'Một hóa đơn duy nhất: Tài khoản Quản lý nhận 1 hóa đơn tổng hàng tháng cho toàn bộ công ty, đơn giản hóa quy trình thanh toán tài chính kế toán.',
        'Gộp dung lượng nhận giá sỉ (Aggregated Volume Discounts): AWS cộng dồn tổng mức tiêu thụ của tất cả tài khoản cho các dịch vụ tính giá theo bậc (ví dụ S3, CloudFront) giúp toàn doanh nghiệp chạm tới các nấc giá rẻ hơn nhanh hơn.',
        'Ví dụ thực tế: Nếu Tài khoản Dev dùng 30 TB S3 và Tài khoản Prod dùng 30 TB S3, AWS tính tổng 60 TB trên 1 hóa đơn, từ đó 10 TB vượt ngưỡng 50 TB sẽ được hưởng đơn giá rẻ hơn thay vì tính lẻ từng tài khoản.',
        'Tự động chia sẻ giảm giá RI & Savings Plans: Nếu Tài khoản A mua máy chủ EC2 trả trước (Reserved Instance) nhưng lúc đó không bật máy, Tài khoản B đang chạy máy cùng loại sẽ tự động được hưởng mức giá giảm của RI đó trong giờ đó!',
        'Tùy chỉnh tắt chia sẻ giảm giá: Management Account có thể chủ động tắt tính năng chia sẻ giảm giá RI/Savings Plans cho từng tài khoản nếu phòng kế toán yêu cầu hạch toán chi phí độc lập tuyệt đối giữa các đơn vị kinh doanh.',
        'Dịch vụ Miễn phí: AWS Organizations và tính năng Consolidated Billing hoàn toàn MIỄN PHÍ, không phát sinh bất kỳ khoản phí bổ sung nào.'
      ],
      isCore: true,
      table: {
        headers: ['Lợi ích tài chính', 'Tài khoản Riêng lẻ Độc lập', 'AWS Organizations có Consolidated Billing'],
        rows: [
          ['Quản lý Hóa đơn', 'Mỗi tài khoản thanh toán riêng rẽ bằng thẻ/hóa đơn riêng', 'Duy nhất một hóa đơn thanh toán bởi Management Account'],
          ['Chiết khấu theo sản lượng', 'Tính bậc giá riêng cho từng tài khoản (chậm đạt mốc giá rẻ)', 'Gộp chung toàn bộ tổ chức (nhanh chóng chạm mốc giá sỉ rẻ nhất)'],
          ['Tận dụng RI & Savings Plans', 'Bị khóa cứng trong tài khoản đã mua (lãng phí nếu không dùng)', 'Tự động chia sẻ cho tài khoản khác đang chạy máy tương ứng'],
          ['Theo dõi Chi phí', 'Rời rạc ở từng tài khoản, khó tổng hợp', 'Xem tập trung tại 1 nơi qua Cost Explorer và gán tag tài nguyên']
        ]
      }
    },
    {
      id: 'lec-212',
      number: 212,
      titleEn: 'AWS Control Tower Overview: Automated Landing Zones & Guardrails',
      titleVi: 'Tổng quan AWS Control Tower: Vùng Hạ cánh Tự động (Landing Zone) & Guardrails',
      duration: '11m',
      summaryEn: 'AWS Control Tower provides the easiest way to set up and govern a secure, multi-account AWS environment called a Landing Zone. Understand Landing Zone architecture, Account Factory, and Guardrails (Preventive vs Detective vs Proactive).',
      summaryVi: 'AWS Control Tower là giải pháp đơn giản nhất để thiết lập và quản trị một môi trường AWS đa tài khoản an toàn tuyệt đối theo tiêu chuẩn Landing Zone. Nắm chắc kiến trúc Landing Zone, Account Factory để tạo tài khoản tự động chuẩn hóa và các cơ chế rào chắn Guardrails (Rào chắn ngăn ngừa vi phạm vs Rào chắn phát hiện vi phạm).',
      keyPointsEn: [
        'Landing Zone Concept: A well-architected, multi-account AWS environment configured according to AWS best practices with baseline security, identity, and federated access.',
        'Automated Setup: Control Tower automates what previously required weeks of manual scripting using Organizations, IAM Identity Center, AWS Config, and AWS CloudTrail.',
        'Account Factory: A built-in service catalog that standardizes the provisioning of new AWS accounts with pre-approved networking and security baselines.',
        'Guardrails (Controls): High-level governance rules applied to OUs. Classified by enforcement mechanism:',
        '1. Preventive Guardrails: Enforce compliance by blocking non-compliant actions BEFORE they happen (implemented via Service Control Policies - SCPs, e.g., Disallow changes to AWS Config).',
        '2. Detective Guardrails: Detect non-compliant resources AFTER they are deployed and alert administrators (implemented via AWS Config Rules and CloudWatch, e.g., Detect whether S3 buckets allow public read access).',
        '3. Proactive Guardrails: Scan CloudFormation templates in CI/CD pipelines before deployment (implemented via AWS CloudFormation Guard).',
        'Control Tower Dashboard: Provides real-time visibility into overall organizational compliance, non-compliant resources, and active guardrails.'
      ],
      keyPointsVi: [
        'Khái niệm Landing Zone: Một môi trường AWS đa tài khoản được thiết kế chuẩn mực (Well-Architected), cấu hình sẵn các tiêu chuẩn bảo mật, ghi nhật ký tập trung và định danh liên kết theo chuẩn AWS.',
        'Tự động hóa hoàn toàn: Control Tower tự động làm các công việc mà trước đây kỹ sư mất nhiều tuần để viết code (tích hợp sẵn Organizations, IAM Identity Center, AWS Config, CloudTrail).',
        'Account Factory: Công cụ tự động tạo tài khoản AWS mới theo mẫu chuẩn doanh nghiệp, tự động cài sẵn cấu hình mạng và bảo mật.',
        'Guardrails (Rào chắn quản trị): Các quy tắc quản trị cấp cao áp dụng cho từng OU để đảm bảo tuân thủ. Chia làm 2 loại trọng tâm đề thi:',
        '1. Rào chắn Ngăn chặn (Preventive Guardrails): Chặn đứng hành vi vi phạm NGAY TỪ ĐẦU trước khi nó xảy ra (sử dụng SCPs của Organizations, ví dụ: cấm tắt tính năng ghi log CloudTrail).',
        '2. Rào chắn Phát hiện (Detective Guardrails): Phát hiện các tài nguyên vi phạm SAU KHI đã được tạo và gửi cảnh báo cho quản trị viên (sử dụng AWS Config Rules, ví dụ: phát hiện S3 bucket nào lỡ mở công khai ra ngoài internet).',
        '3. Rào chắn Chủ động (Proactive Guardrails): Quét và chặn các file mẫu CloudFormation ngay từ khâu lập trình CI/CD.',
        'Bảng điều khiển Control Tower: Cung cấp góc nhìn toàn cảnh về mức độ tuân thủ, danh sách tài nguyên vi phạm và trạng thái các guardrails trên toàn doanh nghiệp.'
      ],
      isCore: true,
      table: {
        headers: ['Loại Guardrail', 'Cơ chế Hoạt động', 'Công nghệ AWS Bên dưới', 'Ví dụ Đề thi Kinh điển'],
        rows: [
          ['Preventive (Ngăn chặn)', 'CHẶN ĐỨNG hành vi ngay lập tức; người dùng nhận lỗi Access Denied', 'Service Control Policies (SCPs)', 'Cấm khởi tạo ổ cứng EBS mà không bật mã hóa dữ liệu'],
          ['Detective (Phát hiện)', 'CHO PHÉP tạo nhưng QUÉT và CẢNH BÁO khi phát hiện sai quy chuẩn', 'AWS Config Rules & Amazon EventBridge', 'Phát hiện S3 bucket nào đang mở quyền đọc cho công chúng']
        ]
      }
    },
    {
      id: 'lec-213',
      number: 213,
      titleEn: 'AWS Control Tower Hands-on Walkthrough',
      titleVi: 'Thực hành AWS Control Tower: Khám phá Dashboard & Cơ chế Guardrails',
      duration: '8m',
      summaryEn: 'Touring the AWS Control Tower console: viewing the Landing Zone configuration, exploring the Core OU (Log Archive and Security Tooling accounts), examining mandatory and optional guardrails, and understanding compliance drift.',
      summaryVi: 'Khám phá giao diện bảng điều khiển AWS Control Tower thực tế: quan sát cấu trúc Landing Zone tự động sinh ra 2 tài khoản cốt lõi (Log Archive lưu log tập trung và Audit/Security Tooling), duyệt danh sách các Guardrails bắt buộc (Mandatory) và tùy chọn (Elective), và cách hệ thống báo cáo sai lệch tuân thủ.',
      keyPointsEn: [
        'Core Accounts Created by Control Tower: (1) Log Archive account (stores centralized CloudTrail & Config logs from all accounts); (2) Audit account (read/write security access for security and audit teams).',
        'Guardrail Categories: Mandatory (always on by default), Strongly Recommended (enterprise best practice), and Elective (optional, specific business requirements).',
        'Single Pane of Glass: Central dashboard showing overall compliance percentage across all OUs and linked accounts.',
        'Drift Detection: Automatically alerts if an administrator manually tampers with underlying IAM roles, Config rules, or SCPs managed by Control Tower.'
      ],
      keyPointsVi: [
        '2 Tài khoản Cốt lõi do Control Tower tự tạo: (1) Log Archive (kho lưu trữ nhật ký CloudTrail và Config tập trung chống sửa đổi); (2) Audit Account (tài khoản dành riêng cho đội an ninh mạng kiểm toán).',
        'Phân nhóm Guardrails: Bắt buộc (Mandatory - luôn bật mặc định), Rất khuyến nghị (Strongly Recommended) và Tùy chọn (Elective).',
        'Màn hình quản trị tập trung: Xem tỷ lệ phần trăm tuân thủ quy chuẩn bảo mật của mọi tài khoản trong công ty.',
        'Phát hiện Sai lệch (Drift Detection): Tự động cảnh báo khi có kỹ sư can thiệp bằng tay làm thay đổi các IAM role hoặc luật Config do Control Tower quản lý.'
      ],
      isCore: false
    },
    {
      id: 'lec-214',
      number: 214,
      titleEn: 'AWS Resource Access Manager (RAM): Multi-Account Resource Sharing',
      titleVi: 'AWS Resource Access Manager (RAM): Chia sẻ Tài nguyên Đa Tài khoản',
      duration: '9m',
      summaryEn: 'AWS RAM enables secure sharing of specific AWS resources with any AWS account or within an AWS Organization. Eliminate resource duplication, reduce operational overhead, and share VPC subnets so resources in different accounts live on the same network.',
      summaryVi: 'AWS RAM (Resource Access Manager) cho phép chia sẻ các tài nguyên AWS cụ thể cho các tài khoản khác trong nội bộ Organization hoặc với tài khoản AWS đối tác mà không cần tạo bản sao. Loại bỏ chi phí nhân bản tài nguyên thừa thãi, tối ưu hóa vận hành và đặc biệt là kỹ thuật chia sẻ VPC Subnet để các máy chủ ở nhiều tài khoản khác nhau cắm chung vào cùng một mạng nội bộ.',
      keyPointsEn: [
        'Core Value: Share resources across accounts without duplicating them. Reduces costs and operational complexity.',
        'Primary Exam Trigger Resources for RAM:',
        '1. VPC Subnets: Allows participants to deploy resources (EC2, RDS, Lambda) into subnets owned by a central networking account. Each account only manages its own resources within the shared subnet!',
        '2. AWS Transit Gateway: Share a single central Transit Gateway across dozens of accounts without creating separate gateways in each account.',
        '3. Route 53 Resolver Rules: Share centralized DNS forwarding rules across accounts.',
        '4. AWS License Manager: Share software licenses (e.g., Microsoft SQL, Oracle) to prevent over-licensing and minimize software expenditure.',
        'Security Isolation in Shared Subnet: Account B cannot view, modify, or delete EC2 instances created by Account A in that shared subnet, even though they share the same IP CIDR range.',
        'Integration with Organizations: Sharing within an AWS Organization requires NO invitation handshake; sharing with external accounts requires an explicit invitation acceptance.'
      ],
      keyPointsVi: [
        'Giá trị cốt lõi: Chia sẻ trực tiếp tài nguyên xuyên tài khoản mà không cần nhân bản tạo mới. Giúp tiết kiệm chi phí và đơn giản hóa kiến trúc.',
        'Các tài nguyên kinh điển hay gặp nhất trong câu hỏi đề thi về RAM:',
        '1. VPC Subnets: Cho phép các tài khoản thành viên tự triển khai máy ảo EC2/RDS vào một Subnet thuộc sở hữu của tài khoản mạng trung tâm. Tài khoản nào sở hữu máy ảo đó thì chỉ quản lý máy đó!',
        '2. AWS Transit Gateway: Chia sẻ một Gateway trung tâm duy nhất cho hàng chục tài khoản mà không cần tạo riêng từng cái.',
        '3. Route 53 Resolver: Chia sẻ luật phân giải DNS nội bộ công ty cho toàn bộ hệ thống.',
        '4. AWS License Manager: Chia sẻ giấy phép phần mềm bản quyền (Windows Server, SQL Server) để tránh mua thừa thãi bản quyền.',
        'Tính độc lập bảo mật trong Shared Subnet: Tài khoản B không thể nhìn thấy hay can thiệp vào máy ảo EC2 của Tài khoản A, dù cả hai đang cắm chung vào cùng 1 Subnet.',
        'Tích hợp Organizations: Chia sẻ trong cùng Organization diễn ra tự động không cần xác nhận; nếu chia sẻ cho tài khoản bên ngoài thì tài khoản đó phải chấp nhận lời mời (Invitation).'
      ],
      isCore: true
    },
    {
      id: 'lec-215',
      number: 215,
      titleEn: 'AWS Service Catalog Overview: Governed Self-Service IT Portals',
      titleVi: 'Tổng quan AWS Service Catalog: Cổng Tự Phục vụ CNTT Chuẩn hóa & Kiểm soát',
      duration: '8m',
      summaryEn: 'AWS Service Catalog allows organizations to create and manage catalogs of approved IT services, products, and multi-tier architectures. Enable governed self-service provisioning for end users without granting broad IAM privileges.',
      summaryVi: 'AWS Service Catalog cho phép doanh nghiệp xây dựng và quản lý danh mục các dịch vụ CNTT, sản phẩm phần mềm và kiến trúc máy chủ đã được phòng an ninh/hạ tầng phê duyệt trước. Cho phép người dùng nghiệp vụ tự triển khai nhanh chóng (Self-service) mà không cần cấp quyền quản trị IAM rộng.',
      keyPointsEn: [
        'Core Purpose: Centralized self-service portal for pre-approved IT resources. Solves the conflict between rapid developer agility and strict corporate compliance.',
        'How It Works: Admins package approved architectures as CloudFormation templates -> Group them into "Products" -> Organize products into "Portfolios" -> Grant launch permissions to IAM users, groups, or roles.',
        'Launch Role (Delegated Permission): Users DO NOT need direct IAM permissions to create EC2, RDS, or VPC resources. They only need access to the Service Catalog portfolio, which assumes a trusted Launch Role to deploy resources on their behalf.',
        'Standardization & Governance: Enforces company standards (e.g., only t3.micro allowed, mandatory encryption, mandatory cost center tagging).',
        'Multi-Account Sharing: Portfolios can be shared across multiple AWS accounts within AWS Organizations.'
      ],
      keyPointsVi: [
        'Mục đích cốt lõi: Cổng danh mục tự phục vụ tập trung cho các tài nguyên CNTT đã được phê duyệt. Giải quyết mâu thuẫn giữa tốc độ làm việc của lập trình viên và tiêu chuẩn tuân thủ khắt khe của doanh nghiệp.',
        'Cách thức hoạt động: Quản trị viên đóng gói kiến trúc chuẩn bằng CloudFormation -> Gom thành các "Sản phẩm" (Products) -> Nhóm các sản phẩm vào "Danh mục" (Portfolios) -> Cấp quyền sử dụng danh mục cho các User/Role.',
        'Cơ chế Launch Role (Ủy quyền): Người dùng KHÔNG CẦN quyền IAM tạo máy ảo EC2 hay RDS. Họ chỉ cần quyền truy cập Service Catalog, hệ thống sẽ mượn quyền của Launch Role để tạo hạ tầng an toàn cho họ.',
        'Chuẩn hóa & Kiểm soát: Ép buộc tuân thủ quy định (ví dụ: chỉ được chọn cấu hình máy nhỏ t3.micro, bắt buộc bật mã hóa và tự động gắn thẻ Cost Center).',
        'Chia sẻ đa tài khoản: Danh mục Portfolio có thể chia sẻ cho nhiều tài khoản thành viên trong AWS Organizations cùng dùng chung.'
      ],
      isCore: false
    },
    {
      id: 'lec-216',
      number: 216,
      titleEn: 'Pricing Models of the Cloud: Compute, Storage & Data Transfer Fundamentals',
      titleVi: 'Mô hình Định giá trên Đám mây: Tính toán, Lưu trữ & Quy tắc Truyền Dữ liệu',
      duration: '12m',
      summaryEn: 'Comprehensive breakdown of how AWS bills for services across the three foundational pillars: Compute, Storage, and Data Transfer. Master the exact data transfer fee rules tested on the CLF-C02 exam.',
      summaryVi: 'Phân tích chi tiết toàn diện cách thức AWS tính phí trên 3 trụ cột cơ bản của điện toán đám mây: Năng lực Tính toán (Compute), Dung lượng Lưu trữ (Storage) và Lưu lượng Truyền Dữ liệu (Data Transfer). Nắm chắc các quy tắc tính cước truyền dữ liệu ra/vào và nội bộ cực kỳ phổ biến trong đề thi CLF-C02.',
      keyPointsEn: [
        'Pay-As-You-Go Principle: No upfront capital expense (CapEx to OpEx); pay only for what you provision and consume; terminate resources anytime to stop charges.',
        'Three Fundamental Cost Drivers: Compute, Storage, and Data Transfer OUT.',
        'Compute Billing Mechanics: EC2 billed per-second or per-hour depending on OS; Lambda billed per 1ms of execution time and request count; Fargate billed per vCPU and memory per second.',
        'Storage Billing Mechanics: S3 billed per GB/month stored + request API calls (PUT, GET) + lifecycle transitions; EBS billed for the PROVISIONED capacity (GB/month) regardless of whether data is written; EFS billed for actual storage consumed.',
        'Data Transfer Ingress (Inbound): 100% FREE! Transferring data INTO AWS from the internet or on-premises is never charged.',
        'Data Transfer Egress (Outbound): CHARGED! Transferring data OUT of AWS to the internet incurs per-GB data egress costs (first 100 GB/month is free under AWS Free Tier).',
        'Inter-Region Data Transfer: Transferring data between different AWS Regions is always charged at standard inter-region rates.',
        'Intra-Region / Availability Zone Transfer: Data transfer between instances in the SAME Availability Zone using private IP is 100% FREE. Data transfer ACROSS Availability Zones in the same Region incurs a small per-GB fee ($0.01/GB each direction).'
      ],
      keyPointsVi: [
        'Nguyên lý Trả theo mức sử dụng (Pay-As-You-Go): Chuyển đổi từ chi phí đầu tư ban đầu (CapEx) sang chi phí vận hành linh hoạt (OpEx); dùng bao nhiêu trả bấy nhiêu; tắt tài nguyên là dừng tính tiền ngay lập tức.',
        '3 Yếu tố cốt lõi tạo nên hóa đơn: Compute (Tính toán), Storage (Lưu trữ) và Data Transfer OUT (Dữ liệu truyền ra ngoài).',
        'Cơ chế tính phí Compute: EC2 tính theo giây hoặc theo giờ tùy hệ điều hành; Lambda tính theo từng mili-giây (1ms) thời gian chạy và số lượng request; Fargate tính theo vCPU và RAM tiêu thụ mỗi giây.',
        'Cơ chế tính phí Storage: S3 tính theo dung lượng GB/tháng lưu trữ + số lần gọi API (GET, PUT) + chuyển tầng lưu trữ; EBS tính theo DUNG LƯỢNG ĐÃ KHỞI TẠO (Provisioned Size) dù ổ cứng có ghi dữ liệu hay để trống; EFS tính theo dung lượng thực tế ghi vào.',
        'Dữ liệu ĐI VÀO (Data Transfer IN): 100% MIỄN PHÍ! Đẩy dữ liệu từ internet hoặc on-premises vào AWS không bao giờ mất tiền.',
        'Dữ liệu ĐI RA (Data Transfer OUT): CÓ TÍNH PHÍ! Tải dữ liệu từ AWS ra ngoài internet bị tính cước theo GB (100 GB/tháng đầu tiên được miễn phí theo Free Tier).',
        'Truyền dữ liệu giữa các Region (Inter-Region): Chuyển dữ liệu giữa 2 AWS Region khác nhau luôn bị tính phí.',
        'Truyền dữ liệu nội bộ (Intra-Region & AZ): Truyền giữa các máy chủ trong CÙNG 1 Availability Zone bằng IP nội bộ là 100% MIỄN PHÍ. Truyền xuyên giữa 2 Availability Zone khác nhau trong cùng Region sẽ chịu phí nhẹ ($0.01/GB mỗi chiều).'
      ],
      isCore: true,
      table: {
        headers: ['Kịch bản Truyền Dữ liệu (Data Transfer)', 'Có phí hay Miễn phí?', 'Giải thích Chi tiết / Đơn giá'],
        rows: [
          ['Từ Internet tải dữ liệu vào EC2 / S3', 'MIỄN PHÍ (0.00 / GB)', 'AWS không bao giờ thu tiền dữ liệu đi vào đám mây (Ingress free)'],
          ['Từ EC2 / S3 tải dữ liệu ra Internet', 'CÓ TÍNH PHÍ (theo GB)', '100 GB đầu tiên mỗi tháng miễn phí, sau đó tính phí bậc thang (Egress charged)'],
          ['Giữa 2 máy EC2 trong CÙNG 1 AZ (bằng IP riêng)', 'MIỄN PHÍ', 'Lưu lượng nội bộ cùng 1 AZ hoàn toàn không mất phí truyền dẫn'],
          ['Giữa 2 máy EC2 ở 2 AZ KHÁC NHAU trong cùng 1 Region', 'CÓ TÍNH PHÍ ($0.01/GB mỗi chiều)', 'Dữ liệu đi qua ranh giới giữa các trung tâm dữ liệu AZ chịu phí định tuyến'],
          ['Giữa 2 máy EC2 ở 2 AWS REGION KHÁC NHAU', 'CÓ TÍNH PHÍ (Inter-region rate)', 'Dữ liệu đi qua mạng đường trục toàn cầu xuyên lục địa chịu phí liên vùng']
        ]
      }
    },
    {
      id: 'lec-217',
      number: 217,
      titleEn: 'Savings Plans Overview: Flexible Cloud Cost Commitments',
      titleVi: 'Tổng quan Savings Plans: Cam kết Chi tiêu Linh hoạt Tiết kiệm Chi phí',
      duration: '10m',
      summaryEn: 'Understanding AWS Savings Plans: flexible pricing model offering up to 72% discounts compared to On-Demand rates in exchange for a commitment to a consistent amount of usage ($/hour) for a 1 or 3-year period. Compare Compute Savings Plans, EC2 Instance Savings Plans, and SageMaker Savings Plans.',
      summaryVi: 'Tìm hiểu chi tiết mô hình AWS Savings Plans: mô hình định giá linh hoạt giảm giá tới 72% so với On-Demand khi cam kết mức chi tiêu ổn định tính bằng USD/giờ (ví dụ cam kết tiêu $10/giờ) trong kỳ hạn 1 năm hoặc 3 năm. Phân biệt rõ Compute Savings Plans, EC2 Instance Savings Plans và SageMaker Savings Plans trong các câu hỏi tình huống thi cử.',
      keyPointsEn: [
        'Commitment Structure: You commit to spending a specific monetary amount per hour (e.g., $10/hour) for 1 or 3 years. Any usage beyond the committed $/hour is billed at standard On-Demand rates.',
        'Payment Options: All Upfront (greatest discount), Partial Upfront (balanced), No Upfront (lowest upfront barrier).',
        '1. Compute Savings Plans (Most Flexible, up to 66% discount): Applies automatically across EC2 instances, AWS Fargate, and AWS Lambda REGARDLESS of instance family, size, OS, tenancy, or AWS Region!',
        '2. EC2 Instance Savings Plans (Highest EC2 Discount, up to 72%): Applies to a specific instance family (e.g., c5, m5) within a specific Region. Flexible across instance size (e.g., c5.xlarge vs c5.2xlarge), OS, and tenancy within that family and region.',
        '3. SageMaker Savings Plans (up to 64% discount): Applies to Amazon SageMaker machine learning compute usage.',
        'Savings Plans vs Traditional Reserved Instances: Savings Plans are much easier to manage because they are based on a dollar-per-hour commitment rather than specific server reservations.'
      ],
      keyPointsVi: [
        'Cấu trúc cam kết: Bạn cam kết chi tiêu một số tiền cố định mỗi giờ (ví dụ $10/giờ) trong thời hạn 1 năm hoặc 3 năm. Nếu dùng vượt quá số tiền cam kết, phần vượt sẽ tính theo giá On-Demand thông thường.',
        '3 Hình thức thanh toán: Trả trước 100% (All Upfront - chiết khấu cao nhất), Trả trước một phần (Partial Upfront) và Không trả trước (No Upfront - chỉ trả hàng tháng).',
        '1. Compute Savings Plans (Linh hoạt nhất, giảm tới 66%): Tự động áp dụng giảm giá cho máy ảo EC2, container AWS Fargate và hàm AWS Lambda BẤT KỂ dòng máy, kích thước, hệ điều hành hay Region nào!',
        '2. EC2 Instance Savings Plans (Giảm giá EC2 sâu nhất, tới 72%): Áp dụng cho một dòng máy cụ thể (ví dụ dòng c5 hoặc m5) trong một Region cố định. Vẫn linh hoạt thay đổi kích thước máy (c5.large sang c5.2xlarge) hoặc hệ điều hành.',
        '3. SageMaker Savings Plans (Giảm tới 64%): Áp dụng riêng cho tài nguyên tính toán của dịch vụ Machine Learning Amazon SageMaker.',
        'So sánh với Reserved Instances truyền thống: Savings Plans dễ quản lý hơn nhiều vì cam kết theo số tiền USD/giờ thay vì phải chọn cứng từng cấu hình máy chủ.'
      ],
      isCore: true,
      table: {
        headers: ['Loại Savings Plan', 'Mức Giảm tối đa', 'Các Dịch vụ Áp dụng', 'Mức độ Linh hoạt'],
        rows: [
          ['Compute Savings Plans', 'Tới 66%', 'EC2, Fargate, Lambda', 'Cao nhất: Đổi dòng máy, kích thước, OS hay đổi Region đều được'],
          ['EC2 Instance Savings Plans', 'Tới 72%', 'Chỉ máy ảo EC2', 'Trung bình: Khóa cứng dòng máy và Region, linh hoạt đổi size máy & OS'],
          ['SageMaker Savings Plans', 'Tới 64%', 'Tính toán SageMaker', 'Cao: Áp dụng linh hoạt cho các loại máy chạy ML trong SageMaker']
        ]
      }
    },
    {
      id: 'lec-218',
      number: 218,
      titleEn: 'AWS Compute Optimizer: Machine Learning Right-Sizing Recommendations',
      titleVi: 'AWS Compute Optimizer: Gợi ý Tối ưu Cấu hình Máy bằng Machine Learning',
      duration: '8m',
      summaryEn: 'AWS Compute Optimizer uses machine learning to analyze historical utilization metrics from CloudWatch and delivers actionable recommendations to right-size resources, eliminate waste, and boost performance.',
      summaryVi: 'AWS Compute Optimizer sử dụng công nghệ Machine Learning phân tích các chỉ số sử dụng tài nguyên trong lịch sử từ Amazon CloudWatch để đưa ra các gợi ý điều chỉnh đúng kích thước máy (Right-sizing), cắt giảm lãng phí tài nguyên thừa và tăng cường hiệu năng.',
      keyPointsEn: [
        'How It Works: Analyzes 14 days of CloudWatch utilization metrics (CPU, memory, storage, network) using ML models trained by AWS.',
        'Supported Resources (Exam Favorite!): (1) Amazon EC2 instances; (2) Amazon EC2 Auto Scaling groups; (3) Amazon EBS volumes (IOPS and throughput); (4) AWS Lambda functions (memory configuration).',
        'Categorization of Findings: Under-provisioned (resource is suffering bottleneck -> recommends upgrade), Over-provisioned (resource is oversized and wasting money -> recommends downsizing), or Optimized (appropriately sized).',
        'Cost Impact: Can reduce operational costs by up to 25% by identifying idle or over-provisioned servers.',
        'Memory Metric Requirement: By default CloudWatch does not track OS memory; installing the CloudWatch Agent enables memory-based right-sizing recommendations in Compute Optimizer.',
        'Zero Cost: AWS Compute Optimizer is completely FREE to use.'
      ],
      keyPointsVi: [
        'Cách thức hoạt động: Thu thập và phân tích dữ liệu chỉ số CloudWatch trong 14 ngày gần nhất (CPU, bộ nhớ RAM, mạng, ổ đĩa) bằng thuật toán ML do AWS phát triển.',
        '4 Tài nguyên được hỗ trợ (Trọng tâm thi cử): (1) Máy ảo Amazon EC2; (2) Nhóm tự động giãn nở EC2 Auto Scaling groups; (3) Ổ cứng Amazon EBS (dung lượng, IOPS, băng thông); (4) Hàm AWS Lambda (cấu hình bộ nhớ RAM tối ưu).',
        '3 Trạng thái đánh giá tài nguyên: Under-provisioned (thiếu tải, đang bị nghẽn -> gợi ý nâng cấp cấu hình), Over-provisioned (thừa tải, cấu hình quá to gây lãng phí tiền -> gợi ý hạ cấp xuống máy nhỏ hơn), và Optimized (cấu hình đã chuẩn tối ưu).',
        'Hiệu quả kinh tế: Giúp doanh nghiệp giảm tới 25% hóa đơn bằng cách loại bỏ các máy chủ dư thừa công suất.',
        'Lưu ý về đo RAM: Mặc định CloudWatch không đo RAM của máy ảo; cần cài CloudWatch Agent để Compute Optimizer có dữ liệu RAM đưa ra gợi ý chuẩn xác nhất.',
        'Miễn phí: Dịch vụ AWS Compute Optimizer hoàn toàn MIỄN PHÍ sử dụng.'
      ],
      isCore: true
    },
    {
      id: 'lec-219',
      number: 219,
      titleEn: 'Billing & Costing Tools Overview: Estimation vs Tracking vs Monitoring vs Optimizing',
      titleVi: 'Tổng quan Bộ Công cụ Chi phí: Ước tính vs Theo dõi vs Giám sát vs Tối ưu',
      duration: '9m',
      summaryEn: 'High-level navigation of the AWS cost management ecosystem. Understand the 4 phases of cloud financial management (FinOps): Estimating costs before deployment, Tracking actual spending, Monitoring & Alerting against budgets, and Optimizing ongoing architectures.',
      summaryVi: 'Bản đồ tổng thể hệ sinh thái quản lý tài chính và chi phí trên AWS (Cloud FinOps). Hiểu rõ 4 giai đoạn quản trị chi phí: Ước tính chi phí trước khi làm (Estimating), Theo dõi chi phí thực tế phát sinh (Tracking), Giám sát & Bắn cảnh báo theo hạn mức (Monitoring & Alerting), và Tối ưu hóa liên tục (Optimizing).',
      keyPointsEn: [
        'Phase 1: Estimating Costs -> AWS Pricing Calculator (helps plan future architectures and calculate monthly bills before launching resources).',
        'Phase 2: Tracking Costs -> AWS Billing Dashboard, Cost Allocation Tags, AWS Cost Explorer, and AWS Cost & Usage Report (CUR).',
        'Phase 3: Monitoring & Alerting -> CloudWatch Billing Alarms, AWS Budgets, and AWS Cost Anomaly Detection.',
        'Phase 4: Optimizing & Right-Sizing -> AWS Compute Optimizer and AWS Trusted Advisor.',
        'TCO (Total Cost of Ownership) Concept: Moving to cloud eliminates data center real estate, electricity, server hardware, cooling, and on-premises physical maintenance staff.'
      ],
      keyPointsVi: [
        'Giai đoạn 1: Ước tính chi phí (Estimating) -> AWS Pricing Calculator (giúp lên kế hoạch chi phí cho dự án mới trước khi bấm nút tạo máy chủ).',
        'Giai đoạn 2: Theo dõi chi phí thực tế (Tracking) -> AWS Billing Dashboard, Cost Allocation Tags, AWS Cost Explorer, và AWS Cost & Usage Report (CUR).',
        'Giai đoạn 3: Giám sát & Bắn cảnh báo (Monitoring & Alerting) -> CloudWatch Billing Alarms, AWS Budgets, và AWS Cost Anomaly Detection.',
        'Giai đoạn 4: Tối ưu hóa & Hạ tầng (Optimizing) -> AWS Compute Optimizer và AWS Trusted Advisor.',
        'Khái niệm TCO (Tổng chi phí sở hữu): Di chuyển lên Cloud giúp cắt giảm chi phí thuê mặt bằng trung tâm dữ liệu, tiền điện, tiền mua máy chủ vật lý, hệ thống điều hòa làm mát và đội ngũ bảo trì phần cứng tại chỗ.'
      ],
      isCore: false
    },
    {
      id: 'lec-220',
      number: 220,
      titleEn: 'Estimating Costs: AWS Pricing Calculator',
      titleVi: 'Ước tính Chi phí: AWS Pricing Calculator (Công cụ Báo giá Kiến trúc)',
      duration: '9m',
      summaryEn: 'Detailed exploration of the AWS Pricing Calculator web tool. How architects and developers build prospective cloud architectures, estimate monthly and annual costs, compare pricing models, and share cost estimates with stakeholders before migrating.',
      summaryVi: 'Tìm hiểu chi tiết công cụ nền web AWS Pricing Calculator. Cách các kỹ sư kiến trúc và doanh nghiệp phác thảo kiến trúc dự án tương lai, ước tính chi phí hàng tháng và hàng năm, so sánh các mô hình giá (On-Demand vs Savings Plans) và xuất link chia sẻ báo giá cho các bên liên quan trước khi triển khai thực tế.',
      keyPointsEn: [
        'Public Web Tool: Completely free and does not require an AWS account to use (accessible to anyone at calculator.aws).',
        'Purpose: Estimate costs of your prospective cloud workload or proposed architecture BEFORE you migrate or launch any resources.',
        'Key Features: Add multiple services, specify instance types, storage sizes, data transfer assumptions, and support plans.',
        'Group Estimates: Organize estimates by departments, business units, or environment tiers (e.g., Frontend, Database, Storage tier).',
        'Shareable Link: Generates a persistent public URL or downloadable PDF/CSV summary to share with management or clients.',
        'Replaces Simple Monthly Calculator: Note for exam—AWS Simple Monthly Calculator is legacy and deprecated; AWS Pricing Calculator is the modern official tool.'
      ],
      keyPointsVi: [
        'Công cụ nền Web công khai: Hoàn toàn miễn phí và KHÔNG CẦN đăng nhập tài khoản AWS vẫn sử dụng được (truy cập tại calculator.aws).',
        'Mục đích cốt lõi: Ước tính chi phí của khối lượng công việc dự kiến hoặc kiến trúc đề xuất TRƯỚC KHI di chuyển dữ liệu hoặc bấm nút khởi tạo tài nguyên.',
        'Tính năng nổi bật: Thêm nhiều dịch vụ khác nhau, chọn dòng máy ảo, cấu hình dung lượng ổ đĩa, dự kiến lưu lượng mạng và lựa chọn gói Support.',
        'Nhóm ước tính theo cấu trúc: Phân nhóm chi phí theo phòng ban, dự án hoặc tầng kiến trúc (ví dụ nhóm Tầng Web, Tầng Database, Tầng Storage).',
        'Chia sẻ báo giá dễ dàng: Tạo đường link URL công khai hoặc xuất file PDF/CSV để gửi cho ban giám đốc hoặc khách hàng duyệt dự toán.',
        'Thay thế Simple Monthly Calculator: Lưu ý trong đề thi—công cụ Simple Monthly Calculator cũ đã bị khai tử; AWS Pricing Calculator là công cụ chuẩn hiện nay.'
      ],
      isCore: true
    },
    {
      id: 'lec-221',
      number: 221,
      titleEn: 'Tracking Costs: Billing Dashboard, Cost Allocation Tags, CUR & Cost Explorer',
      titleVi: 'Theo dõi Chi phí: Billing Dashboard, Cost Allocation Tags, CUR & Cost Explorer',
      duration: '14m',
      summaryEn: 'Deep-dive into the four primary tools for tracking actual AWS expenditures: AWS Billing Dashboard, Cost Allocation Tags (AWS-generated vs User-defined), AWS Cost & Usage Reports (CUR - the most detailed raw data), and AWS Cost Explorer (visual graphs, filters, and 12-month forecasting).',
      summaryVi: 'Phân tích chuyên sâu 4 công cụ theo dõi chi phí thực tế phát sinh trên AWS: Bảng điều khiển AWS Billing Dashboard, Thẻ phân bổ chi phí Cost Allocation Tags (thẻ do AWS tự sinh vs thẻ do người dùng định nghĩa), Báo cáo Chi phí & Sử dụng AWS CUR (bộ dữ liệu thô chi tiết nhất lưu vào S3), và AWS Cost Explorer (vẽ biểu đồ trực quan, lọc chi phí và dự báo 12 tháng tương lai).',
      keyPointsEn: [
        '1. AWS Billing Dashboard: High-level overview of current month-to-date spending, top services by spend, and comparison against previous months.',
        '2. Cost Allocation Tags: Key-value metadata labels assigned to AWS resources to track and allocate costs by project, department, client, or environment.',
        '   - AWS-Generated Tags: Automatically created by AWS (e.g., `aws:createdBy`). Starts with `aws:` prefix.',
        '   - User-Defined Tags: Created by customers (e.g., `Environment=Production`, `CostCenter=1049`). Starts with `user:` prefix.',
        '   - Activation Required: Both types of tags MUST be explicitly ACTIVATED in the Billing Console before they appear in Cost Explorer or CUR!',
        '3. AWS Cost Explorer: Visual interactive analytics tool that lets you examine past spending (up to 12 months historical) and FORECAST future spending up to 12 months ahead based on machine learning models.',
        '   - Key Capabilities: Filter and group by Service, Linked Account, Region, or Tag; identify spending anomalies; view Savings Plans utilization.',
        '4. AWS Cost & Usage Report (CUR): The MOST granular, comprehensive raw billing dataset available in AWS.',
        '   - Contains line-by-line hourly or daily usage records with all metadata and tags.',
        '   - Automatically published as CSV/Parquet files into an Amazon S3 bucket for analysis via Amazon Athena, Amazon Redshift, or Amazon QuickSight.'
      ],
      keyPointsVi: [
        '1. AWS Billing Dashboard: Cung cấp góc nhìn tổng quan về số tiền đã tiêu trong tháng hiện tại, các dịch vụ tốn nhiều tiền nhất và so sánh với hóa đơn các tháng trước.',
        '2. Cost Allocation Tags (Thẻ phân bổ chi phí): Cặp nhãn Khóa-Giá trị (Key-Value) gắn vào tài nguyên để theo dõi và bóc tách chi phí theo dự án, phòng ban, môi trường.',
        '   - Thẻ do AWS tạo (AWS-Generated Tags): Tự động sinh ra (ví dụ: `aws:createdBy`). Bắt đầu bằng tiền tố `aws:`.',
        '   - Thẻ do người dùng tạo (User-Defined Tags): Do kỹ sư tự đặt (ví dụ: `Environment=Prod`, `CostCenter=9901`). Bắt đầu bằng tiền tố `user:`.',
        '   - Yêu cầu Kích hoạt: BẮT BUỘC phải vào Billing Console bấm KÍCH HOẠT (Activate) thì các tag này mới bắt đầu xuất hiện trong Cost Explorer và báo cáo CUR!',
        '3. AWS Cost Explorer: Công cụ trực quan hóa chi phí mạnh mẽ dạng biểu đồ, xem lại lịch sử chi tiêu trong quá khứ (lên tới 12 tháng) và DỰ BÁO (Forecast) chi phí tương lai tới 12 tháng tiếp theo.',
        '   - Tính năng chính: Lọc và nhóm theo Tên dịch vụ, Tài khoản thành viên, Region, hoặc Tag; tìm ra xu hướng chi tiêu tăng giảm.',
        '4. AWS Cost & Usage Report (CUR): Bộ dữ liệu thanh toán chi tiết nhất, thô nhất và toàn diện nhất trên AWS.',
        '   - Chứa từng dòng bản ghi tiêu thụ theo từng giờ/ngày kèm đầy đủ thông tin metadata và tag.',
        '   - Tự động xuất định kỳ dạng file nén CSV/Parquet vào một Amazon S3 bucket để phân tích chuyên sâu qua Amazon Athena, Amazon QuickSight.'
      ],
      isCore: true,
      table: {
        headers: ['Công cụ Chi phí', 'Chức năng Chính', 'Từ khóa Đề thi Nhận diện', 'Mức độ Chi tiết'],
        rows: [
          ['Billing Dashboard', 'Tổng quan hóa đơn tháng hiện tại', '"Chi tiêu từ đầu tháng đến nay", dịch vụ tốn tiền nhất', 'Tổng quan tóm tắt'],
          ['Cost Explorer', 'Biểu đồ tương tác & dự báo 12 tháng tới', '"Trực quan hóa xu hướng", "Dự báo chi phí 12 tháng"', 'Tổng hợp theo ngày/tháng'],
          ['Cost & Usage Report (CUR)', 'Xuất dữ liệu thô chi tiết nhất vào S3', '"Dữ liệu chi tiết/thô nhất", "Xuất file S3 để Athena truy vấn"', 'Từng dòng theo từng giờ'],
          ['Cost Allocation Tags', 'Gắn nhãn để phân bổ chi phí theo phòng ban', '"Phân loại chi phí theo dự án / phòng ban / môi trường"', 'Gắn thẻ metadata']
        ]
      }
    },
    {
      id: 'lec-222',
      number: 222,
      titleEn: 'Monitoring Costs: Billing Alarms & AWS Budgets',
      titleVi: 'Giám sát Chi phí: Chuông Cảnh báo Billing Alarms & AWS Budgets',
      duration: '11m',
      summaryEn: 'Understand proactive cost monitoring using CloudWatch Billing Alarms versus the much more advanced AWS Budgets. Learn how AWS Budgets tracks Costs, Usage, Savings Plans, and Reservations with actual and forecasted threshold alerts and automated actions.',
      summaryVi: 'Nắm vững kỹ thuật giám sát chi phí chủ động qua Chuông cảnh báo CloudWatch Billing Alarms so với công cụ nâng cao toàn diện AWS Budgets. Hiểu cách AWS Budgets theo dõi Chi phí (Cost), Mức sử dụng (Usage), Savings Plans và Reservation với các ngưỡng cảnh báo thực tế và DỰ BÁO cùng các hành động can thiệp tự động.',
      keyPointsEn: [
        'CloudWatch Billing Alarms: Simple metric alarm based on total estimated billing data. MUST be configured in us-east-1 (N. Virginia) region where global billing metric data resides. Sends notification via Amazon SNS (email).',
        'AWS Budgets: Dedicated, feature-rich budgeting service for setting custom financial plans.',
        '4 Types of Budgets in AWS Budgets:',
        '1. Cost Budget: Monitor monetary spending against a target (e.g., notify me if spend exceeds $1,000/month).',
        '2. Usage Budget: Monitor resource usage quantity (e.g., notify me if EC2 running hours exceed 5,000 hours/month).',
        '3. RI Utilization / Coverage Budget: Monitor whether purchased Reserved Instances are being sufficiently utilized.',
        '4. Savings Plans Budget: Monitor whether Savings Plans commitments are adequately covered.',
        'Proactive Dual Triggers: Alerts can fire when ACTUAL spending exceeds a percentage (e.g., 85% of budget) OR when FORECASTED spending is projected to exceed the budget by month-end!',
        'Budget Actions: Can automatically execute actions when thresholds are breached, such as attaching an SCP to restrict IAM permissions, stopping EC2 instances, or sending SNS notifications.',
        'Free Tier: First 2 budgets are completely FREE per account.'
      ],
      keyPointsVi: [
        'CloudWatch Billing Alarms: Chuông cảnh báo cơ bản dựa trên chỉ số tổng tiền ước tính. BẮT BUỘC phải tạo ở Region us-east-1 (Bắc Virginia) vì dữ liệu thanh toán toàn cầu tập trung tại đây. Gửi thông báo qua Amazon SNS (email).',
        'AWS Budgets: Dịch vụ lập kế hoạch ngân sách chuyên dụng với nhiều tính năng nâng cao.',
        '4 Loại Ngân sách trong AWS Budgets (Trọng tâm đề thi):',
        '1. Cost Budget: Theo dõi số tiền chi tiêu so với hạn mức (ví dụ: cảnh báo khi chi phí vượt $1.000/tháng).',
        '2. Usage Budget: Theo dõi số lượng giờ sử dụng tài nguyên (ví dụ: cảnh báo khi máy EC2 chạy vượt 5.000 giờ/tháng).',
        '3. RI Utilization / Coverage Budget: Theo dõi tỷ lệ sử dụng máy chủ trả trước Reserved Instance để tránh bỏ phí.',
        '4. Savings Plans Budget: Theo dõi mức độ tận dụng cam kết Savings Plans.',
        '2 Cơ chế Kích hoạt Cảnh báo Song song: Bắn cảnh báo khi chi phí THỰC TẾ vượt ngưỡng (ví dụ đạt 80% ngân sách) HOẶC khi chi phí DỰ KIẾN (Forecasted) được tính toán là sẽ vượt ngân sách vào cuối tháng!',
        'Hành động Tự động (Budget Actions): Có thể tự động kích hoạt hành động ngăn chặn khi vượt hạn mức, ví dụ tự gắn SCP hạn chế quyền người dùng, tự động tắt bớt máy EC2 hoặc gửi cảnh báo SNS.',
        'Miễn phí: 2 ngân sách đầu tiên trong mỗi tài khoản được MIỄN PHÍ hoàn toàn.'
      ],
      isCore: true,
      table: {
        headers: ['Tính năng so sánh', 'CloudWatch Billing Alarm', 'AWS Budgets'],
        rows: [
          ['Mục tiêu Chính', 'Báo động đơn giản khi tổng hóa đơn vượt 1 số tiền nhất định', 'Lập ngân sách toàn diện theo Chi phí, Lượng dùng, RI và Savings Plans'],
          ['Cơ chế Kích hoạt', 'Chỉ báo khi số tiền THỰC TẾ đã vượt qua ngưỡng', 'Báo động cả khi tiền THỰC TẾ vượt HOẶC tiền DỰ KIẾN sẽ vượt'],
          ['Hành động Tự động', 'Chỉ gửi email/tin nhắn qua Amazon SNS', 'Có thể tự động can thiệp (tắt máy EC2, gắn SCP chặn quyền)'],
          ['Ràng buộc Vùng', 'Bắt buộc cấu hình tại us-east-1 (Bắc Virginia)', 'Quản lý toàn cầu từ Billing Console']
        ]
      }
    },
    {
      id: 'lec-223',
      number: 223,
      titleEn: 'AWS Cost Anomaly Detection: Machine Learning Anomaly Detection',
      titleVi: 'AWS Cost Anomaly Detection: Phát hiện Đột biến Chi phí bằng Machine Learning',
      duration: '8m',
      summaryEn: 'AWS Cost Anomaly Detection uses advanced machine learning to continuously monitor spending patterns, detect unexpected cost spikes, identify root causes, and notify administrators before surge bills accumulate.',
      summaryVi: 'AWS Cost Anomaly Detection sử dụng công nghệ Machine Learning tiên tiến để liên tục giám sát thói quen chi tiêu của tài khoản, phát hiện các đợt tăng vọt chi phí bất thường, chỉ ra nguyên nhân gốc rễ và cảnh báo quản trị viên ngay lập tức trước khi hóa đơn bị đội lên quá cao.',
      keyPointsEn: [
        'How It Works: Uses AWS machine learning models to learn an organization\'s individual organic spending patterns and distinguishes between normal seasonal spikes versus anomalous unexpected surges.',
        'Root Cause Analysis: Does not just alert that costs spiked—it pinpoints the exact AWS account, service, Region, and usage type causing the anomaly.',
        'Alert Subscriptions: Sends immediate individual anomaly alerts or daily/weekly summaries via email or Amazon SNS (can route to Slack or Teams).',
        'Cost Monitors: Create monitors by AWS Service, Linked Account, Cost Allocation Tag, or Cost Category.',
        'Free Service: AWS Cost Anomaly Detection is 100% FREE with zero setup fees.'
      ],
      keyPointsVi: [
        'Cơ chế hoạt động: Dùng mô hình Machine Learning tự học thói quen chi tiêu bình thường của doanh nghiệp, từ đó phân biệt được đâu là tăng trưởng tự nhiên theo mùa và đâu là sự cố đột biến bất thường.',
        'Chỉ ra Nguyên nhân Gốc rễ: Không chỉ báo chung chung là tiền tăng, hệ thống chỉ đích danh tài khoản nào, dịch vụ nào, ở Region nào và loại tài nguyên nào đang gây ra đột biến.',
        'Hình thức nhận tin: Gửi cảnh báo tức thì ngay khi phát hiện đột biến hoặc gửi báo cáo tóm tắt hàng ngày/hàng tuần qua Email, SNS (có thể nối vào kênh Slack/Microsoft Teams).',
        'Bộ giám sát linh hoạt: Có thể tạo bộ giám sát theo Từng dịch vụ, theo Tài khoản thành viên, theo Thẻ phân bổ chi phí Tag hoặc Danh mục chi phí.',
        'Hoàn toàn miễn phí: Dịch vụ AWS Cost Anomaly Detection hoàn toàn MIỄN PHÍ sử dụng.'
      ],
      isCore: false
    },
    {
      id: 'lec-224',
      number: 224,
      titleEn: 'AWS Service Quotas: Managing Account Limits Centrally',
      titleVi: 'AWS Service Quotas: Quản lý Tập trung Hạn ngạch & Giới hạn Tài nguyên',
      duration: '8m',
      summaryEn: 'AWS Service Quotas allows administrators to view and manage soft limits across AWS services from a single console, monitor usage against quotas with CloudWatch alarms, and request quota increases programmatically or in one click.',
      summaryVi: 'AWS Service Quotas cho phép quản trị viên xem và quản lý tập trung các giới hạn mềm (Soft Limits) của mọi dịch vụ AWS trên một giao diện duy nhất, giám sát mức sử dụng sát trần bằng cảnh báo CloudWatch và gửi yêu cầu tăng hạn mức chỉ với 1 cú click chuột hoặc qua API.',
      keyPointsEn: [
        'Soft Limits vs Hard Limits: Soft limits (quotas) can be increased upon request (e.g., increasing EC2 vCPU limit from 32 to 128). Hard limits are absolute architectural boundaries that cannot be increased (e.g., 5 VPCs per Region can be increased as a soft limit, but 65,536 IPs in a /16 VPC is fixed).',
        'Central Console: Replaces having to go to individual service pages or submitting open-ended support tickets.',
        'CloudWatch Integration: Automatically configure CloudWatch alarms to notify when usage approaches 80% of a quota limit.',
        'Multi-Account Quota Request Templates: Automatically request quota increases for newly created member accounts in an AWS Organization.',
        'Free to Use: Service Quotas is a completely free AWS management tool.'
      ],
      keyPointsVi: [
        'Giới hạn Mềm (Soft Limits) vs Giới hạn Cứng (Hard Limits): Giới hạn mềm (quotas) là mức trần an toàn mặc định có thể xin nâng lên được (ví dụ nâng số lượng vCPU của máy EC2 từ 32 lên 128). Giới hạn cứng là ranh giới kiến trúc cố định không thể tăng (ví dụ dải mạng VPC /16 tối đa 65.536 IP).',
        'Quản lý tập trung: Xem mọi hạn ngạch dịch vụ ở một nơi duy nhất thay vì phải mở từng dịch vụ riêng hoặc mở vé hỗ trợ thủ công.',
        'Tích hợp CloudWatch: Cấu hình chuông báo động khi mức tiêu thụ đạt ngưỡng 80% hạn ngạch để chủ động xin tăng quota trước khi hệ thống bị quá tải.',
        'Mẫu yêu cầu hạn ngạch đa tài khoản: Tự động xin tăng quota cho các tài khoản thành viên mới tạo trong AWS Organizations.',
        'Miễn phí: Công cụ AWS Service Quotas hoàn toàn miễn phí.'
      ],
      isCore: false
    },
    {
      id: 'lec-225',
      number: 225,
      titleEn: 'AWS Trusted Advisor: Automated Architecture Optimization & 6 Pillars',
      titleVi: 'AWS Trusted Advisor: Cố vấn Tối ưu Kiến trúc Tự động & 6 Trụ cột Đánh giá',
      duration: '11m',
      summaryEn: 'AWS Trusted Advisor evaluates your AWS environment against best practice rules across 6 pillars: Cost Optimization, Performance, Security, Fault Tolerance, Service Limits, and Operational Excellence. Understand the difference between the 7 core free checks and the full check suite.',
      summaryVi: 'AWS Trusted Advisor là dịch vụ cố vấn kiến trúc tự động quét toàn bộ tài nguyên AWS và so sánh với các tiêu chuẩn thực hành tốt nhất theo 6 trụ cột: Tối ưu Chi phí, Hiệu năng, Bảo mật, Khả năng Chịu lỗi, Giới hạn Dịch vụ và Vận hành Xuất sắc. Hiểu rõ sự khác biệt giữa 7 bài kiểm tra cơ bản miễn phí và toàn bộ bài kiểm tra chuyên sâu.',
      keyPointsEn: [
        '6 Pillars of AWS Trusted Advisor (Exam Critical!):',
        '1. Cost Optimization: Identifies idle or underutilized resources (e.g., unattached EBS volumes, unassociated Elastic IPs, idle RDS DB instances, EC2 right-sizing).',
        '2. Performance: Checks rules to optimize speed and responsiveness (e.g., high EC2 utilization, CloudFront CDN usage).',
        '3. Security: Identifies security vulnerabilities (e.g., MFA on Root Account, S3 bucket permissions open to world, unrestricted Security Group ports 22/3389, IAM access key rotation).',
        '4. Fault Tolerance: Evaluates resiliency and disaster recovery readiness (e.g., RDS Multi-AZ configuration, EBS snapshots, Auto Scaling group health).',
        '5. Service Limits (Service Quotas): Warns when resource usage exceeds 80% of service limits.',
        '6. Operational Excellence: Evaluates operational health (e.g., CloudFormation drifts, recovery readiness).',
        'Status Indicators: Green (No problem), Yellow (Investigation recommended), Red (Action recommended).',
        'Support Plan Tiers for Trusted Advisor:',
        '- Basic & Developer Support: ONLY 7 Core Security & Service Limit checks (MFA on Root, public S3 permissions, security groups with open ports, IAM use, service limits).',
        '- Business & Enterprise Support: FULL check suite (hundreds of checks across all 6 pillars) + programmatic access via AWS Support API + CloudWatch integration.'
      ],
      keyPointsVi: [
        '6 Trụ cột Đánh giá của Trusted Advisor (Trọng tâm đề thi):',
        '1. Tối ưu Chi phí (Cost Optimization): Chỉ ra các tài nguyên nhàn rỗi lãng phí tiền (ổ cứng EBS thừa không gắn vào máy nào, địa chỉ Elastic IP không dùng, cơ sở dữ liệu RDS chạy không tải, máy EC2 dư công suất).',
        '2. Hiệu năng (Performance): Kiểm tra các quy tắc tăng tốc độ và độ phản hồi (máy EC2 bị quá tải, tận dụng bộ nhớ đệm CloudFront).',
        '3. Bảo mật (Security): Tìm kiếm các lỗ hổng bảo mật nghiêm trọng (bắt buộc bật MFA cho tài khoản Root, S3 bucket mở quyền công khai, Security Group mở toang cổng SSH 22 hoặc RDP 3389 ra internet 0.0.0.0/0).',
        '4. Khả năng Chịu lỗi (Fault Tolerance): Đánh giá khả năng dự phòng thảm họa (CSDL RDS có bật Multi-AZ không, có sao lưu EBS snapshot định kỳ không).',
        '5. Giới hạn Dịch vụ (Service Limits): Cảnh báo khi tài nguyên dùng vượt quá 80% hạn ngạch.',
        '6. Vận hành Xuất sắc (Operational Excellence): Đánh giá tính kỷ luật trong vận hành hạ tầng.',
        '3 Màu trạng thái trực quan: Xanh lá (Chuẩn an toàn), Vàng (Cần xem xét), Đỏ (Khuyến nghị hành động khắc phục ngay).',
        'Phân cấp theo Gói Support:',
        '- Gói Basic & Developer: CHỈ ĐƯỢC 7 bài kiểm tra cốt lõi về Bảo mật & Giới hạn dịch vụ (MFA tài khoản Root, S3 mở quyền, mở cổng SG).',
        '- Gói Business & Enterprise: Mở khóa TOÀN BỘ bài kiểm tra (hàng trăm bài kiểm tra trên cả 6 trụ cột) + quyền gọi API tự động + tích hợp CloudWatch.'
      ],
      isCore: true,
      table: {
        headers: ['Trụ cột Trusted Advisor', 'Mục tiêu Cốt lõi', 'Ví dụ Kiểm tra Thường gặp trong Đề thi'],
        rows: [
          ['Tối ưu Chi phí', 'Cắt giảm chi phí thừa & tài nguyên bỏ hoang', 'Ổ cứng EBS không gắn máy, CSDL RDS nhàn rỗi, Elastic IP giữ chỗ không dùng'],
          ['Bảo mật', 'Bịt lỗ hổng & tăng cường phòng thủ', 'Chưa bật MFA cho Root User, S3 Bucket mở quyền công khai, mở cổng SSH 22 ra 0.0.0.0/0'],
          ['Khả năng Chịu lỗi', 'Tăng cường tính sẵn sàng & sao lưu phục hồi', 'Bật Multi-AZ cho RDS, định kỳ sao lưu snapshot cho EBS, cấu hình Auto Scaling'],
          ['Hiệu năng', 'Đảm bảo tốc độ xử lý & băng thông tối ưu', 'Kiểm tra máy EC2 bị quá tải CPU/RAM, tận dụng mạng CDN CloudFront'],
          ['Giới hạn Dịch vụ', 'Tránh nghẽn hạn ngạch khi mở rộng tài nguyên', 'Tài nguyên sử dụng vượt quá 80% hạn ngạch cho phép'],
          ['Vận hành Xuất sắc', 'Tuân thủ quy trình chuẩn vận hành đám mây', 'Phát hiện sai lệch mẫu CloudFormation, kiểm toán tài sản qua AWS Config']
        ]
      }
    },
    {
      id: 'lec-226',
      number: 226,
      titleEn: 'AWS Support Plans: Basic, Developer, Business & Enterprise Comparison',
      titleVi: 'So sánh Toàn diện các Gói Hỗ trợ AWS Support: Basic, Developer, Business & Enterprise',
      duration: '14m',
      summaryEn: 'Comprehensive side-by-side comparison of the 4 primary AWS Support Plans: Basic (Free), Developer, Business, and Enterprise (plus Enterprise On-Ramp). Master support channels, response times SLAs, Technical Account Manager (TAM) privileges, Concierge team, and exam triggers.',
      summaryVi: 'Bảng đối chiếu toàn diện 4 gói hỗ trợ kỹ thuật chính thức của AWS: Basic (Miễn phí), Developer, Business và Enterprise (cùng Enterprise On-Ramp). Nắm vững các kênh hỗ trợ, cam kết thời gian phản hồi sự cố (SLA), quyền lợi có kỹ sư TAM riêng, đội ngũ Concierge và các từ khóa trúng đề thi tuyệt đối.',
      keyPointsEn: [
        '1. Basic Support Plan (100% Free for all AWS customers):',
        '   - 24/7 customer service access (Billing & Account inquiries only; NO technical support!).',
        '   - Access to documentation, whitepapers, and AWS re:Post community forums.',
        '   - AWS Health Dashboard (Personal Health Dashboard & Service Health Dashboard).',
        '   - 7 Core Trusted Advisor security and limit checks.',
        '2. Developer Support Plan (Starts at $29/month or 3% of monthly AWS spend):',
        '   - Business hours email access to Cloud Support Associates (1 primary contact).',
        '   - General guidance response SLA: < 24 business hours.',
        '   - System impaired response SLA: < 12 business hours.',
        '   - Intended for testing, experimenting, and non-critical developer workloads.',
        '3. Business Support Plan (Starts at $100/month or tiered percentage):',
        '   - 24/7 phone, email, and live chat access to Cloud Support Engineers (unlimited contacts).',
        '   - Production system impaired response SLA: < 4 hours.',
        '   - Production system DOWN response SLA: < 1 hour!',
        '   - Full suite of AWS Trusted Advisor checks included.',
        '   - Support for 3rd-party software running on AWS (Apache, OS, MySQL).',
        '   - Intended for production workloads.',
        '4. Enterprise Support Plan (Starts at $15,000/month or tiered percentage):',
        '   - All Business features included.',
        '   - Designated Technical Account Manager (TAM): A dedicated AWS senior technical engineer assigned specifically to your organization who coordinates proactively and provides architectural reviews.',
        '   - Dedicated Concierge Support Team: Specialized billing and account operational experts.',
        '   - Business-critical system DOWN response SLA: < 15 MINUTES! (fastest SLA in cloud industry).',
        '   - Infrastructure Event Management (IEM): AWS engineers assist during product launches, Black Friday sales, or critical cloud migrations.',
        '   - Well-Architected Reviews and proactive consultative guidance.'
      ],
      keyPointsVi: [
        '1. Gói Basic Support (Miễn phí 100% cho mọi tài khoản AWS):',
        '   - Hỗ trợ dịch vụ khách hàng 24/7 (CHỈ GIẢI QUYẾT vấn đề thanh toán, hóa đơn; KHÔNG có kỹ sư hỗ trợ kỹ thuật!).',
        '   - Xem tài liệu kỹ thuật, sách trắng (Whitepapers) và diễn đàn AWS re:Post.',
        '   - Truy cập AWS Health Dashboard (theo dõi sự cố hạ tầng cá nhân và toàn cầu).',
        '   - 7 bài kiểm tra cơ bản của Trusted Advisor.',
        '2. Gói Developer Support (Từ $29/tháng hoặc 3% chi phí AWS hàng tháng):',
        '   - Gửi email hỗ trợ kỹ thuật trong giờ hành chính tới kỹ sư AWS (1 đầu mối liên hệ).',
        '   - Thời gian phản hồi hướng dẫn chung: < 24 giờ làm việc.',
        '   - Thời gian phản hồi hệ thống bị chậm/ảnh hưởng: < 12 giờ làm việc.',
        '   - Dành cho môi trường thử nghiệm, lập trình viên nghiên cứu công nghệ.',
        '3. Gói Business Support (Từ $100/tháng hoặc % lũy tiến):',
        '   - Hỗ trợ 24/7 qua ĐIỆN THOẠI, EMAIL và CHAT TRỰC TIẾP tới kỹ sư Cloud Support Engineers (không giới hạn số người liên hệ).',
        '   - Thời gian phản hồi hệ thống Production bị ảnh hưởng: < 4 giờ.',
        '   - Thời gian phản hồi hệ thống Production BỊ SẬP (Production System Down): < 1 GIỜ!',
        '   - Mở khóa TOÀN BỘ bài kiểm tra của AWS Trusted Advisor.',
        '   - Hỗ trợ cả phần mềm của bên thứ ba cài trên EC2 (hệ điều hành, Apache, CSDL).',
        '   - Dành cho môi trường chạy ứng dụng thực tế của khách hàng (Production workloads).',
        '4. Gói Enterprise Support (Từ $15.000/tháng hoặc % lũy tiến):',
        '   - Bao gồm toàn bộ tính năng của gói Business.',
        '   - Kỹ sư TAM Chuyên trách (Designated Technical Account Manager): Kỹ sư cấp cao của AWS được chỉ định riêng cho công ty bạn, hỗ trợ tư vấn kiến trúc định kỳ.',
        '   - Đội ngũ Concierge Support Team: Đội chuyên viên chuyên xử lý mọi khúc mắc về thanh toán hóa đơn và điều phối tài khoản.',
        '   - Thời gian phản hồi sự cố kinh doanh nguy cấp (Business-Critical System Down): < 15 PHÚT! (SLA nhanh nhất ngành đám mây).',
        '   - Quản lý Sự kiện Hạ tầng (Infrastructure Event Management - IEM): Kỹ sư AWS túc trực cùng công ty trong ngày khai trương sản phẩm, siêu sale Black Friday hoặc chuyển đổi dữ liệu lớn.',
        '   - Đánh giá kiến trúc Well-Architected Reviews định kỳ.'
      ],
      isCore: true,
      table: {
        headers: ['Gói Hỗ trợ', 'Kênh Hỗ trợ & Thời gian', 'Cam kết Phản hồi Nhanh nhất (SLA)', 'Kiểm tra Trusted Advisor', 'Đặc quyền Độc quyền Phân biệt'],
        rows: [
          ['Basic', 'Chăm sóc KH (Hóa đơn/Tài khoản)', 'Không có kỹ sư kỹ thuật', '7 bài kiểm tra cơ bản', 'Miễn phí 100%, Health Dashboard'],
          ['Developer', 'Chỉ Email (Giờ hành chính)', '< 12 giờ làm việc (hệ thống bị ảnh hưởng)', '7 bài kiểm tra cơ bản', '1 đầu mối liên hệ, chi phí thấp ($29/tháng)'],
          ['Business', '24/7 Điện thoại, Chat & Email', '< 1 GIỜ (Hệ thống Production sập)', 'ĐẦY ĐỦ mọi bài kiểm tra', 'Không giới hạn người gọi, hỗ trợ phần mềm 3rd party'],
          ['Enterprise', '24/7 Điện thoại, Chat & Email', '< 15 PHÚT (Sự cố sống còn sập)', 'ĐẦY ĐỦ mọi bài kiểm tra', 'Có kỹ sư TAM chuyên trách, đội Concierge, hỗ trợ IEM']
        ]
      }
    },
    {
      id: 'lec-227',
      number: 227,
      titleEn: 'Account Management Best Practices: Multi-Account Architecture & Governance Summary',
      titleVi: 'Tổng kết Quản trị Tài khoản Doanh nghiệp: Kiến trúc Đa Tài khoản & Kiểm soát An ninh',
      duration: '9m',
      summaryEn: 'High-yield exam summary of enterprise AWS account management, security guardrails, multi-account isolation, root user protection, and governance patterns tested on the CLF-C02 exam.',
      summaryVi: 'Bản tóm tắt trọng điểm phục vụ phòng thi về quản trị tài khoản AWS doanh nghiệp, thiết lập rào chắn an ninh, cô lập đa tài khoản, bảo vệ tài khoản Root và các mẫu hình quản trị tuân thủ trong bài thi CLF-C02.',
      keyPointsEn: [
        'Multi-Account Principle: Always use multiple AWS accounts segregated by environment (Dev, Test, Prod), compliance boundary (PCI-DSS), or department rather than putting everything into one massive account.',
        'Root Account Safety: Enable hardware or virtual MFA, never create access keys for root, lock away credentials, and use IAM Identity Center for day-to-day administrative work.',
        'Governance Layering: AWS Organizations (grouping & SCP boundaries) + AWS Control Tower (automated Landing Zone setup) + AWS Service Catalog (governed app provisioning) + AWS RAM (secure cross-account resource sharing without duplication).',
        'Consolidated Invoicing: Management Account pays single bill, qualifies for bulk volume tier pricing, and shares RI/Savings Plans automatically.',
        'SCP Enforcement Golden Rules: SCPs apply to all IAM users and roles in Member Accounts (including root); SCPs NEVER restrict the Management Account; SCPs only filter permissions (deny overrides allow).'
      ],
      keyPointsVi: [
        'Nguyên tắc Đa tài khoản: Luôn chia tách hệ thống thành nhiều tài khoản AWS độc lập theo môi trường (Dev, Test, Prod), theo chuẩn tuân thủ (PCI-DSS) hoặc phòng ban thay vì dồn tất cả vào 1 tài khoản khổng lồ.',
        'Bảo mật Tài khoản Root: Bật MFA bắt buộc, tuyệt đối không tạo Access Key cho Root, cất giữ mật khẩu an toàn và dùng IAM Identity Center cho công việc quản trị hàng ngày.',
        'Mô hình Xếp tầng Quản trị: AWS Organizations (gom nhóm & thiết lập ranh giới SCP) + AWS Control Tower (dựng Landing Zone tự động) + AWS Service Catalog (cổng tự triển khai ứng dụng chuẩn hóa) + AWS RAM (chia sẻ mạng và tài nguyên xuyên tài khoản không nhân bản).',
        'Thanh toán Tập trung: Tài khoản Quản lý trả 1 hóa đơn, tự động nhận chiết khấu theo khối lượng tiêu thụ lớn và tự chia sẻ giảm giá của RI/Savings Plans.',
        'Quy tắc Vàng về SCP: Áp dụng cho mọi User/Role kể cả Root của tài khoản con; KHÔNG áp dụng lên tài khoản Quản trị gốc; SCP chỉ có tác dụng lọc/chặn quyền.'
      ],
      isCore: true
    },
    {
      id: 'lec-228',
      number: 228,
      titleEn: 'Billing & Cost Management Summary: The Definitive Exam Cheat Sheet',
      titleVi: 'Tổng kết Quản lý Chi phí & Hóa đơn: Bảng Tra cứu Siêu Tốc Phòng Thi CLF-C02',
      duration: '12m',
      summaryEn: 'The definitive cheat sheet and decision matrix matching real-world scenario questions to the right AWS cost tool. Master the differences between Pricing Calculator, Cost Explorer, Budgets, CUR, Compute Optimizer, and Trusted Advisor.',
      summaryVi: 'Bảng tra cứu siêu tốc và ma trận quyết định giúp giải quyết chính xác 100% các câu hỏi tình huống về quản lý chi phí trong đề thi AWS Certified Cloud Practitioner. Nắm bắt tức thì sự khác biệt giữa Pricing Calculator, Cost Explorer, Budgets, CUR, Compute Optimizer và Trusted Advisor.',
      keyPointsEn: [
        'Scenario: "Estimate the cost of a new proposed architecture before moving to AWS" -> AWS Pricing Calculator.',
        'Scenario: "Visualize historical spending trends and forecast costs for the next 12 months" -> AWS Cost Explorer.',
        'Scenario: "Receive an email alert when monthly spending is FORECASTED to exceed $500" -> AWS Budgets.',
        'Scenario: "Export the most granular, detailed hourly billing data into S3 for SQL query analysis with Athena" -> AWS Cost & Usage Report (CUR).',
        'Scenario: "Use Machine Learning to detect over-provisioned EC2 instances and receive right-sizing downsizing recommendations" -> AWS Compute Optimizer.',
        'Scenario: "Check if an S3 bucket is publicly accessible or if MFA is missing on Root Account" -> AWS Trusted Advisor (Security Pillar).',
        'Scenario: "Need a dedicated AWS engineer assigned to provide proactive technical guidance and architecture reviews" -> Enterprise Support Plan (Technical Account Manager - TAM).',
        'Scenario: "Need 24/7 phone access with a 1-hour response time SLA for production down emergencies" -> Business Support Plan.'
      ],
      keyPointsVi: [
        'Tình huống: "Ước tính chi phí của một giải pháp kiến trúc đề xuất trước khi chuyển dịch lên AWS" -> AWS Pricing Calculator.',
        'Tình huống: "Vẽ biểu đồ xu hướng chi tiêu trong quá khứ và dự báo chi phí cho 12 tháng tiếp theo" -> AWS Cost Explorer.',
        'Tình huống: "Nhận email cảnh báo khi chi phí DỰ BÁO sẽ vượt quá $500 vào cuối tháng" -> AWS Budgets.',
        'Tình huống: "Xuất bộ dữ liệu hóa đơn thô chi tiết nhất theo từng giờ vào S3 để dùng SQL truy vấn qua Athena" -> AWS Cost & Usage Report (CUR).',
        'Tình huống: "Dùng Machine Learning phát hiện máy EC2 thừa cấu hình và nhận gợi ý thu nhỏ máy để tiết kiệm tiền" -> AWS Compute Optimizer.',
        'Tình huống: "Kiểm tra xem S3 bucket có bị mở công khai hay tài khoản Root chưa bật mã MFA" -> AWS Trusted Advisor (Trụ cột Security).',
        'Tình huống: "Cần một kỹ sư AWS cấp cao chuyên trách hỗ trợ định kỳ và tư vấn kiến trúc riêng cho công ty" -> Gói Enterprise Support (Technical Account Manager - TAM).',
        'Tình huống: "Cần hỗ trợ qua điện thoại 24/7 với cam kết SLA phản hồi dưới 1 giờ khi hệ thống Production bị sập" -> Gói Business Support.'
      ],
      isCore: true,
      table: {
        headers: ['Dịch vụ Chi phí / Thanh toán', 'Từ khóa Nhận diện trong Câu hỏi Đề thi', 'Sản phẩm Đầu ra / Đối tượng Sử dụng'],
        rows: [
          ['AWS Pricing Calculator', '"Ước tính kiến trúc dự kiến", "trước khi di chuyển", "lập dự toán"', 'Đường link báo giá chia sẻ, bảng dự toán chi phí ban đầu'],
          ['AWS Cost Explorer', '"Biểu đồ chi tiêu lịch sử", "trực quan hóa xu hướng", "dự báo tới 12 tháng tới"', 'Biểu đồ trực quan, lọc chi phí theo tag/dịch vụ/tài khoản'],
          ['AWS Budgets', '"Cảnh báo chủ động", "ngưỡng thực tế HOẶC dự báo", "hành động ngân sách"', 'Gửi cảnh báo email/SNS, tự động can thiệp tắt máy hoặc gắn SCP'],
          ['Cost & Usage Report (CUR)', '"Dữ liệu thanh toán thô chi tiết nhất", "xuất file vào S3", "phân tích bằng Athena"', 'Tệp tin nén trong S3, bản ghi sử dụng chi tiết từng giờ'],
          ['AWS Compute Optimizer', '"Gợi ý tối ưu kích thước máy bằng ML", "thừa tải / thiếu tải", "EC2, EBS, Lambda"', 'Danh sách gợi ý cụ thể để hạ cấp máy hoặc đổi dòng cấu hình'],
          ['AWS Trusted Advisor', '"6 trụ cột", "7 bài kiểm tra cơ bản vs toàn bộ bài kiểm tra", "tài nguyên nhàn rỗi"', 'Bảng trạng thái Xanh/Vàng/Đỏ, đánh giá toàn diện kiến trúc'],
          ['Technical Account Manager (TAM)', '"Kỹ sư chuyên trách chỉ định riêng", "tư vấn chủ động", "chỉ có ở gói Enterprise"', 'Cố vấn kỹ thuật AWS đồng hành xuyên suốt cùng doanh nghiệp']
        ]
      }
    }
  ]
};
