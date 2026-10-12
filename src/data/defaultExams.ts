import { ExamSet } from '../types';

export const DEFAULT_EXAMS: ExamSet[] = [
  {
    id: 'exam-official-sim-1',
    title: 'CLF-C02 Full Practice Exam 1 (Mô Phỏng 65 Câu Chuẩn)',
    titleVi: 'Đề thi thử số 1 (65 câu - 90 phút - Điểm đạt 700/1000)',
    description: 'Complete 65-question mock exam covering all 4 CLF-C02 domains. Timed at 90 minutes, passing score 700/1000.',
    descriptionVi: 'Đề thi thử chuẩn theo cấu trúc CLF-C02: 65 câu trắc nghiệm bao phủ cả 4 Domain, giới hạn 90 phút, thang điểm 1000 (đạt từ 700).',
    timeLimitMinutes: 90,
    passingScore: 700,
    totalScore: 1000,
    questions: [
      {
        id: 1,
        question: 'A company wants to automatically discover, classify, and protect sensitive data (such as Personally Identifiable Information - PII) stored in Amazon S3 buckets. Which AWS service should they use?',
        options: [
          'Amazon Inspector',
          'Amazon Macie',
          'Amazon GuardDuty',
          'AWS Secrets Manager'
        ],
        correctAnswers: [1],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'Amazon Macie is a fully managed data security and privacy service that uses machine learning and pattern matching to discover, classify, and protect sensitive data such as PII in Amazon S3.',
        explanationVi: 'Amazon Macie là dịch vụ bảo mật dữ liệu sử dụng máy học để tự động quét, phát hiện và bảo vệ dữ liệu nhạy cảm (PII) trong các S3 bucket.',
        referenceSection: 'Section 16',
        referenceLecture: 'Lecture 191 & 270'
      },
      {
        id: 2,
        question: 'Which Amazon EC2 purchasing option provides the deepest discount (up to 90%) by allowing customers to bid on unused EC2 capacity, with the caveat that instances can be reclaimed at any time?',
        options: [
          'Reserved Instances',
          'On-Demand Instances',
          'Dedicated Hosts',
          'Spot Instances'
        ],
        correctAnswers: [3],
        domain: 'Domain 4: Billing, Pricing and Support',
        explanation: 'Spot Instances offer up to 90% discount compared to On-Demand by utilizing spare AWS EC2 capacity. However, they can be interrupted with a 2-minute warning, making them suitable only for fault-tolerant workloads.',
        explanationVi: 'Spot Instances mang lại mức giảm giá cao nhất (lên đến 90%) từ dung lượng máy ảo còn dư thừa của AWS, nhưng có thể bị thu hồi bất cứ lúc nào.',
        referenceSection: 'Section 5',
        referenceLecture: 'Lecture 47 & 270'
      },
      {
        id: 3,
        question: 'A web application hosts static images and HTML files in a single Amazon S3 bucket. Which service should be used in front of the bucket to deliver content with lower latency and higher transfer speeds to global users?',
        options: [
          'AWS Elastic Beanstalk',
          'Amazon DynamoDB Accelerator (DAX)',
          'Amazon Route 53',
          'Amazon CloudFront'
        ],
        correctAnswers: [3],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'Amazon CloudFront is a Content Delivery Network (CDN) that caches content at hundreds of global Edge Locations close to viewers, delivering low latency and high transfer speeds.',
        explanationVi: 'Amazon CloudFront là mạng phân phối nội dung (CDN) giúp cache dữ liệu tĩnh ở các Edge Location trên toàn cầu, giảm độ trễ tối đa cho người dùng.',
        referenceSection: 'Section 12',
        referenceLecture: 'Lecture 137 & 270'
      },
      {
        id: 4,
        question: 'Which AWS service is designed specifically for storing and managing developer source code with version control in private Git repositories?',
        options: [
          'AWS CodeArtifact',
          'AWS CodeBuild',
          'AWS CodePipeline',
          'AWS CodeCommit'
        ],
        correctAnswers: [3],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'AWS CodeCommit is a secure, highly scalable, managed source control service that hosts private Git repositories.',
        explanationVi: 'AWS CodeCommit là dịch vụ quản lý mã nguồn Git riêng tư và an toàn trên AWS.',
        referenceSection: 'Section 11',
        referenceLecture: 'Lecture 126 & 270'
      },
      {
        id: 5,
        question: 'What are TWO main benefits of deploying an application across multiple Availability Zones (Multi-AZ) within an AWS Region? (Select TWO)',
        options: [
          'It eliminates single points of failure',
          'It lowers the monthly billing cost of the architecture',
          'It increases overall application availability',
          'It reduces latency for users situated across multiple continents',
          'It increases the individual CPU load on each server'
        ],
        correctAnswers: [0, 2],
        isMultipleResponse: true,
        domain: 'Domain 1: Cloud Concepts',
        explanation: 'Deploying across multiple Availability Zones prevents a single point of failure (if one data center suffers an outage) and increases application availability. It does not reduce cost or serve other continents with lower latency (which requires Multi-Region/CloudFront).',
        explanationVi: 'Triển khai trên nhiều AZ giúp loại bỏ điểm lỗi đơn lẻ (Single Point of Failure) và tăng tính sẵn sàng cao (High Availability) cho hệ thống.',
        referenceSection: 'Section 7 & 22',
        referenceLecture: 'Lecture 64 & 270'
      },
      {
        id: 6,
        question: 'A company wants to migrate an on-premises physical Linux server running an Oracle database into an Amazon EC2 instance with minimal downtime and automated block-level replication. Which service is best suited?',
        options: [
          'AWS Database Migration Service (DMS)',
          'AWS Migration Hub',
          'AWS Application Migration Service (MGN)',
          'AWS Application Discovery Service'
        ],
        correctAnswers: [2],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'AWS Application Migration Service (MGN) is the primary service for lift-and-shift server migration (rehosting physical, virtual, or cloud servers onto EC2). Because the target is an EC2 instance (a server) rather than a managed database service like RDS, MGN is the correct choice.',
        explanationVi: 'Đích đến là máy ảo EC2 (chuyển cả hệ điều hành Linux), do đó AWS Application Migration Service (MGN) là lựa chọn chuẩn xác nhất để lift-and-shift máy chủ.',
        referenceSection: 'Section 20 & 22',
        referenceLecture: 'Lecture 246 & 270'
      },
      {
        id: 7,
        question: 'According to the AWS Shared Responsibility Model, which of the following is an exclusive responsibility of AWS?',
        options: [
          'Configuring Security Groups and firewall rules',
          'Patching the guest operating system on EC2 instances',
          'Physical security and environmental controls of data center facilities',
          'Managing IAM user credentials and access keys'
        ],
        correctAnswers: [2],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'AWS is responsible for security OF the cloud, which includes the physical facilities, hardware, and underlying virtualization infrastructure.',
        explanationVi: 'Bảo mật vật lý của trung tâm dữ liệu thuộc trách nhiệm độc quyền của AWS (Bảo mật CỦA đám mây).',
        referenceSection: 'Section 16',
        referenceLecture: 'Lecture 178'
      },
      {
        id: 8,
        question: 'A developer needs to execute background image processing code without provisioning or managing any virtual servers. The function should run for no longer than 3 minutes when an image is uploaded. Which service is ideal?',
        options: [
          'Amazon EC2',
          'AWS Lambda',
          'AWS Batch',
          'AWS Systems Manager'
        ],
        correctAnswers: [1],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'AWS Lambda is a serverless compute service that executes code in response to events (e.g. S3 uploads) for up to 15 minutes without managing servers.',
        explanationVi: 'AWS Lambda là dịch vụ compute serverless chạy hàm theo sự kiện (thời gian chạy tối đa 15 phút), không cần quản lý máy chủ.',
        referenceSection: 'Section 10',
        referenceLecture: 'Lecture 113'
      },
      {
        id: 9,
        question: 'Which AWS service allows a company to define their cloud infrastructure as declarative code templates formatted in JSON or YAML?',
        options: [
          'AWS CodeDeploy',
          'AWS CloudFormation',
          'AWS Elastic Beanstalk',
          'AWS Systems Manager'
        ],
        correctAnswers: [1],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'AWS CloudFormation enables Infrastructure as Code (IaC) by allowing you to model and provision AWS resources through declarative JSON or YAML templates.',
        explanationVi: 'AWS CloudFormation là dịch vụ Infrastructure as Code (IaC) sử dụng mẫu template khai báo JSON hoặc YAML.',
        referenceSection: 'Section 11',
        referenceLecture: 'Lecture 120'
      },
      {
        id: 10,
        question: 'What is the primary difference between a Security Group and a Network Access Control List (NACL)?',
        options: [
          'Security Groups operate at the subnet level, while NACLs operate at the instance level',
          'Security Groups are stateless, while NACLs are stateful',
          'Security Groups support allow rules only, while NACLs support both allow and deny rules',
          'Security Groups can filter based on domain names, while NACLs filter based on MAC addresses'
        ],
        correctAnswers: [2],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'Security Groups are stateful firewalls at the instance (ENI) level supporting ALLOW rules only. NACLs are stateless firewalls at the subnet level supporting both ALLOW and DENY rules.',
        explanationVi: 'Security Group chỉ có quy tắc ALLOW và mang tính stateful. NACL hỗ trợ cả quy tắc ALLOW và DENY ở cấp độ subnet.',
        referenceSection: 'Section 15',
        referenceLecture: 'Lecture 170'
      },
      {
        id: 11,
        question: 'A company wants to decouple its frontend web application from its backend order-processing tier. If web traffic spikes, orders must be queued safely and processed asynchronously by worker instances. Which service fits best?',
        options: [
          'Amazon Simple Notification Service (SNS)',
          'Amazon Simple Queue Service (SQS)',
          'Amazon Kinesis Data Streams',
          'AWS Step Functions'
        ],
        correctAnswers: [1],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'Amazon SQS is a distributed message queue that decouples application components, allowing backend instances to pull and process messages reliably at their own pace.',
        explanationVi: 'Amazon SQS là dịch vụ hàng đợi giúp tách rời (decouple) các thành phần ứng dụng, lưu giữ tin nhắn an toàn khi tải tăng đột biến.',
        referenceSection: 'Section 13',
        referenceLecture: 'Lecture 147'
      },
      {
        id: 12,
        question: 'Which AWS support plan is the MINIMUM tier that provides access to a designated Technical Account Manager (TAM) and 15-minute response times for business-critical system outages?',
        options: [
          'Developer Support',
          'Business Support',
          'Enterprise On-Ramp Support',
          'Enterprise Support'
        ],
        correctAnswers: [3],
        domain: 'Domain 4: Billing, Pricing and Support',
        explanation: 'Enterprise Support includes a designated Technical Account Manager (TAM), Concierge team, and a response time of under 15 minutes for business-critical system down scenarios.',
        explanationVi: 'Gói Enterprise Support là gói hỗ trợ có kỹ sư TAM chuyên trách và cam kết phản hồi dưới 15 phút cho sự cố kinh doanh nguy cấp.',
        referenceSection: 'Section 18',
        referenceLecture: 'Lecture 226'
      },
      {
        id: 13,
        question: 'An enterprise wants to view historical records of all AWS API actions made in their account, including who made the call, the source IP address, and the timestamp. Which service should they consult?',
        options: [
          'Amazon CloudWatch Logs',
          'AWS CloudTrail',
          'AWS Config',
          'Amazon Inspector'
        ],
        correctAnswers: [1],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'AWS CloudTrail records AWS API calls and account events for governance, compliance, and auditing purposes.',
        explanationVi: 'AWS CloudTrail ghi nhận lịch sử kiểm toán toàn bộ các lệnh gọi API được thực hiện trong tài khoản (ai, làm gì, lúc nào).',
        referenceSection: 'Section 14',
        referenceLecture: 'Lecture 160'
      },
      {
        id: 14,
        question: 'Which AWS service provides an intelligent threat detection system that continuously monitors CloudTrail event logs, VPC Flow Logs, and DNS logs for malicious activity, such as unauthorized cryptocurrency mining?',
        options: [
          'AWS WAF',
          'AWS Shield',
          'Amazon GuardDuty',
          'AWS Trusted Advisor'
        ],
        correctAnswers: [2],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'Amazon GuardDuty is an intelligent threat detection service that analyzes CloudTrail, VPC Flow Logs, and DNS logs using machine learning to detect anomalous activity such as crypto-mining.',
        explanationVi: 'Amazon GuardDuty là dịch vụ phát hiện đe dọa thông minh sử dụng ML phân tích log CloudTrail, VPC Flow Logs và DNS log, phát hiện đào tiền ảo trái phép.',
        referenceSection: 'Section 16',
        referenceLecture: 'Lecture 188'
      },
      {
        id: 15,
        question: 'A company has EC2 instances running inside a private subnet with no internet gateway route. How can these instances securely access Amazon S3 buckets without traversing the public internet or incurring data transfer fees?',
        options: [
          'Deploy a NAT Gateway in the private subnet',
          'Create a VPC Gateway Endpoint for Amazon S3',
          'Establish a Site-to-Site VPN',
          'Attach an Elastic IP directly to each instance'
        ],
        correctAnswers: [1],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'A VPC Gateway Endpoint allows private communication directly between a VPC and Amazon S3 (and DynamoDB) without requiring an Internet Gateway or NAT Gateway.',
        explanationVi: 'VPC Gateway Endpoint cho phép các máy ảo trong private subnet kết nối trực tiếp và an toàn tới Amazon S3 qua mạng nội bộ AWS mà không cần ra internet.',
        referenceSection: 'Section 15',
        referenceLecture: 'Lecture 172'
      },
      {
        id: 16,
        question: 'Which of the following describes the "Elasticity" benefit of cloud computing?',
        options: [
          'The ability to provision larger, more powerful compute instances when needed',
          'The ability to automatically expand or contract computing resources in response to changing workload demands',
          'The ability to deploy cloud infrastructure across multiple global regions in minutes',
          'The ability to experiment quickly with new technology services without long-term commitments'
        ],
        correctAnswers: [1],
        domain: 'Domain 1: Cloud Concepts',
        explanation: 'Elasticity is the ability of a system to dynamically scale computing capacity up and down according to demand, ensuring you pay only for what you consume.',
        explanationVi: 'Elasticity (Tính co giãn) là khả năng hệ thống tự động mở rộng hoặc thu hẹp tài nguyên tính toán theo tải thực tế.',
        referenceSection: 'Section 7',
        referenceLecture: 'Lecture 64'
      },
      {
        id: 17,
        question: 'A startup wants to migrate its on-premises MySQL database to AWS. They want automated software patching, continuous automated backups with point-in-time recovery, and Multi-AZ failover. Which service should they choose?',
        options: [
          'Run MySQL on an Amazon EC2 instance',
          'Amazon Redshift',
          'Amazon Relational Database Service (Amazon RDS)',
          'Amazon DynamoDB'
        ],
        correctAnswers: [2],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'Amazon RDS is a managed relational database service supporting MySQL, providing automated patching, automated backups with point-in-time restore, and Multi-AZ high availability.',
        explanationVi: 'Amazon RDS là dịch vụ CSDL quan hệ được quản lý hoàn toàn, tự động sao lưu, vá lỗi và hỗ trợ Multi-AZ failover.',
        referenceSection: 'Section 9',
        referenceLecture: 'Lecture 91'
      },
      {
        id: 18,
        question: 'Which of the following actions can ONLY be performed by the AWS account root user?',
        options: [
          'Creating a new IAM Role for an EC2 instance',
          'Changing the AWS account root user password and closing the AWS account',
          'Creating an S3 bucket and uploading objects',
          'Configuring CloudWatch alarms for CPU utilization'
        ],
        correctAnswers: [1],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'Changing root user credentials, closing the AWS account, and changing support plans are exclusive root user actions that cannot be delegated to IAM administrators.',
        explanationVi: 'Đổi mật khẩu tài khoản root và đóng tài khoản AWS là những hành động độc quyền mà CHỈ root user mới thực hiện được.',
        referenceSection: 'Section 16',
        referenceLecture: 'Lecture 195'
      },
      {
        id: 19,
        question: 'Which tool allows customers to view their current AWS spending, view spending patterns over time, and forecast their costs for the next 12 months?',
        options: [
          'AWS Budgets',
          'AWS Pricing Calculator',
          'AWS Cost Explorer',
          'AWS Compute Optimizer'
        ],
        correctAnswers: [2],
        domain: 'Domain 4: Billing, Pricing and Support',
        explanation: 'AWS Cost Explorer allows you to visualize, understand, and manage your AWS costs and usage over time, and includes forecasting capabilities for up to 12 months.',
        explanationVi: 'AWS Cost Explorer là công cụ trực quan hóa chi phí và có tính năng DỰ BÁO hóa đơn trong vòng 12 tháng tiếp theo.',
        referenceSection: 'Section 18',
        referenceLecture: 'Lecture 221'
      },
      {
        id: 20,
        question: 'An organization needs to enforce compliance by ensuring that no developer can create Amazon S3 buckets without server-side encryption enabled across any accounts in their AWS Organization. What feature should they use?',
        options: [
          'AWS IAM Policies attached to individual developers',
          'Service Control Policies (SCPs) applied at the organizational unit (OU) level',
          'Amazon CloudWatch Logs filter rules',
          'AWS Trusted Advisor rules'
        ],
        correctAnswers: [1],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'Service Control Policies (SCPs) in AWS Organizations enable centralized control over the maximum permissions available to all accounts within an organization or organizational unit (OU).',
        explanationVi: 'Service Control Policies (SCPs) trong AWS Organizations cho phép đặt rào chắn phân quyền tối đa cho toàn bộ các tài khoản thành viên trong tổ chức.',
        referenceSection: 'Section 18',
        referenceLecture: 'Lecture 209'
      },
      {
        id: 21,
        question: 'Which AWS service is a managed Desktop-as-a-Service (DaaS) solution that allows employees to provision cloud-based virtual Windows or Linux desktops accessible from anywhere?',
        options: [
          'Amazon AppStream 2.0',
          'Amazon WorkSpaces',
          'Amazon Lightsail',
          'AWS Device Farm'
        ],
        correctAnswers: [1],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'Amazon WorkSpaces is a fully managed Desktop-as-a-Service (DaaS) solution that provisions persistent virtual Windows and Linux desktops.',
        explanationVi: 'Amazon WorkSpaces là dịch vụ Desktop-as-a-Service (DaaS) cung cấp máy tính để bàn ảo Windows/Linux trên đám mây.',
        referenceSection: 'Section 20',
        referenceLecture: 'Lecture 235'
      },
      {
        id: 22,
        question: 'A company wants to convert audio voice recordings from customer support calls into written text transcripts. Which service provides this capability?',
        options: [
          'Amazon Polly',
          'Amazon Transcribe',
          'Amazon Comprehend',
          'Amazon Rekognition'
        ],
        correctAnswers: [1],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'Amazon Transcribe converts speech (audio) into written text using Automatic Speech Recognition (ASR). Polly does the reverse (text to speech).',
        explanationVi: 'Amazon Transcribe chuyển đổi giọng nói (audio) thành văn bản (text). Amazon Polly làm ngược lại.',
        referenceSection: 'Section 17',
        referenceLecture: 'Lecture 199'
      },
      {
        id: 23,
        question: 'What is the most cost-effective Disaster Recovery (DR) strategy on AWS, with the lowest operational cost during normal periods?',
        options: [
          'Multi-Site Active-Active',
          'Warm Standby',
          'Pilot Light',
          'Backup and Restore'
        ],
        correctAnswers: [3],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'Backup and Restore is the cheapest DR strategy because data is merely backed up to cloud storage without running servers until a disaster occurs.',
        explanationVi: 'Backup and Restore là chiến lược Disaster Recovery có CHI PHÍ THẤP NHẤT vì không phải duy trì máy chủ chạy thường trực.',
        referenceSection: 'Section 20',
        referenceLecture: 'Lecture 243'
      },
      {
        id: 24,
        question: 'Which of the following is a key design principle of the "Reliability" pillar of the AWS Well-Architected Framework?',
        options: [
          'Perform operations as code',
          'Automatically recover from failure',
          'Adopt a consumption model',
          'Keep people away from data'
        ],
        correctAnswers: [1],
        domain: 'Domain 1: Cloud Concepts',
        explanation: '"Automatically recover from failure" and "Test recovery procedures" are core design principles of the Reliability pillar. "Perform operations as code" is Operational Excellence; "Adopt a consumption model" is Cost Optimization; "Keep people away from data" is Security.',
        explanationVi: '"Automatically recover from failure" (Tự động phục hồi sau sự cố) là nguyên tắc cốt lõi của trụ cột Độ tin cậy (Reliability).',
        referenceSection: 'Section 21',
        referenceLecture: 'Lecture 256'
      },
      {
        id: 25,
        question: 'Which AWS service allows developers to easily test mobile and web applications against an extensive farm of real physical Android and iOS devices and desktop browsers in the cloud?',
        options: [
          'AWS Device Farm',
          'Amazon AppStream 2.0',
          'AWS CodeDeploy',
          'Amazon WorkSpaces'
        ],
        correctAnswers: [0],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'AWS Device Farm is an application testing service that lets you test your mobile and web applications across real desktop browsers and real mobile devices.',
        explanationVi: 'AWS Device Farm cho phép lập trình viên kiểm thử ứng dụng trên hàng ngàn thiết bị di động thật (Android/iOS) và trình duyệt thực tế.',
        referenceSection: 'Section 20',
        referenceLecture: 'Lecture 241'
      },
      {
        id: 26,
        question: 'Which AWS service provides an encrypted, dedicated physical network connection between an on-premises data center and the AWS cloud, bypassing the public internet?',
        options: [
          'AWS Site-to-Site VPN',
          'AWS Direct Connect (DX)',
          'AWS Transit Gateway',
          'Amazon Route 53'
        ],
        correctAnswers: [1],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'AWS Direct Connect (DX) establishes a dedicated, private physical network link from your premises to AWS, providing high bandwidth and low latency without going over the public internet.',
        explanationVi: 'AWS Direct Connect (DX) cung cấp đường truyền vật lý chuyên dụng riêng biệt từ data center tới AWS, không đi qua internet công cộng.',
        referenceSection: 'Section 15',
        referenceLecture: 'Lecture 174'
      },
      {
        id: 27,
        question: 'A company wants to set up proactive alerts when their monthly AWS cloud bill is FORECASTED to exceed $500 before the end of the month. Which service should they use?',
        options: [
          'AWS Trusted Advisor',
          'AWS Budgets',
          'AWS Pricing Calculator',
          'AWS Cost Anomaly Detection'
        ],
        correctAnswers: [1],
        domain: 'Domain 4: Billing, Pricing and Support',
        explanation: 'AWS Budgets allows you to set custom budgets and receive email or SNS alerts when your costs or usage exceed (or are FORECASTED to exceed) your budgeted amount.',
        explanationVi: 'AWS Budgets cho phép đặt ngưỡng ngân sách và gửi cảnh báo khi chi phí thực tế hoặc CHI PHÍ DỰ BÁO vượt quá mức ngân sách định mức.',
        referenceSection: 'Section 18',
        referenceLecture: 'Lecture 222'
      },
      {
        id: 28,
        question: 'What is the primary function of an Amazon Route 53 "Failover" routing policy?',
        options: [
          'Distributing traffic based on predefined percentage weights',
          'Routing users to the endpoint with the lowest network latency',
          'Directing traffic to a primary resource and automatically routing to a secondary backup resource if health checks fail (Disaster Recovery)',
          'Mapping multiple domain names to the same IP address'
        ],
        correctAnswers: [2],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'Route 53 Failover routing is used for active-passive disaster recovery, automatically redirecting traffic to a backup endpoint when health checks detect the primary endpoint has failed.',
        explanationVi: 'Chính sách Failover của Route 53 dùng cho phục hồi thảm họa chủ động - bị động, tự chuyển hướng người dùng sang server dự phòng khi server chính lỗi.',
        referenceSection: 'Section 12',
        referenceLecture: 'Lecture 135'
      },
      {
        id: 29,
        question: 'A developer needs to store application secrets, such as database credentials and API tokens. They also require automatic password rotation integrated with Amazon RDS. Which service should they select?',
        options: [
          'AWS Systems Manager Parameter Store',
          'AWS Key Management Service (AWS KMS)',
          'AWS Secrets Manager',
          'AWS Shield'
        ],
        correctAnswers: [2],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'AWS Secrets Manager enables you to store, manage, and automatically rotate secrets such as database credentials for Amazon RDS using built-in Lambda functions.',
        explanationVi: 'AWS Secrets Manager chuyên dụng lưu trữ và TỰ ĐỘNG XOAY VÒNG mật khẩu cơ sở dữ liệu tích hợp sẵn với Amazon RDS.',
        referenceSection: 'Section 16',
        referenceLecture: 'Lecture 186'
      },
      {
        id: 30,
        question: 'Which service can connect thousands of Amazon VPCs and on-premises networks in a simple hub-and-spoke star network topology, eliminating the need for complex mesh VPC peering?',
        options: [
          'AWS Direct Connect Gateway',
          'AWS Transit Gateway',
          'VPC Endpoints',
          'Amazon Route 53 Resolver'
        ],
        correctAnswers: [1],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'AWS Transit Gateway acts as a central cloud router connecting thousands of VPCs and on-premises networks in a scalable hub-and-spoke architecture.',
        explanationVi: 'AWS Transit Gateway hoạt động như trung tâm điều phối mạng hình sao (hub-and-spoke) kết nối hàng ngàn VPC và mạng on-premises.',
        referenceSection: 'Section 15',
        referenceLecture: 'Lecture 176'
      }
    ]
  },
  {
    id: 'exam-core-diagnostic-2',
    title: 'CLF-C02 Core Diagnostic Test (Bộ 30 Câu Cốt Lõi Hay Gặp)',
    titleVi: 'Bài kiểm tra chẩn đoán kiến thức Core (30 câu - 45 phút)',
    description: 'High-yield diagnostic test focusing strictly on classic exam distinctions (SG vs NACL, SQS vs SNS, KMS vs CloudHSM, 7 Rs, etc.).',
    descriptionVi: 'Đề kiểm tra trọng tâm tập trung vào các câu hỏi phân biệt kinh điển dễ nhầm lẫn trong kỳ thi thật.',
    timeLimitMinutes: 45,
    passingScore: 750,
    totalScore: 1000,
    questions: [
      {
        id: 101,
        question: 'You need to block a specific malicious IP address (198.51.100.5) from accessing any servers in a VPC subnet. Which feature allows you to create an explicit DENY rule?',
        options: [
          'Security Group',
          'Network Access Control List (NACL)',
          'Route Table',
          'Internet Gateway'
        ],
        correctAnswers: [1],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'NACLs support both ALLOW and DENY rules at the subnet level. Security Groups only support ALLOW rules.',
        explanationVi: 'NACL hỗ trợ quy tắc DENY (từ chối IP). Security Group chỉ có quy tắc ALLOW.',
        referenceSection: 'Section 15',
        referenceLecture: 'Lecture 170'
      },
      {
        id: 102,
        question: 'Which Amazon S3 storage class automatically optimizes storage costs by moving data between frequent and infrequent access tiers without retrieval fees or operational overhead?',
        options: [
          'S3 Standard-IA',
          'S3 One Zone-IA',
          'S3 Intelligent-Tiering',
          'S3 Glacier Flexible Retrieval'
        ],
        correctAnswers: [2],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'S3 Intelligent-Tiering automatically moves objects between access tiers based on usage patterns with no retrieval charges.',
        explanationVi: 'S3 Intelligent-Tiering tự động tối ưu chi phí bằng cách di chuyển đối tượng giữa các tầng mà không tốn phí truy xuất dữ liệu.',
        referenceSection: 'Section 8',
        referenceLecture: 'Lecture 82'
      },
      {
        id: 103,
        question: 'A company requires dedicated physical hardware cryptographic modules where the customer retains exclusive ownership and management of the cryptographic keys (FIPS 140-2 Level 3). Which service fulfills this requirement?',
        options: [
          'AWS Key Management Service (AWS KMS)',
          'AWS CloudHSM',
          'AWS Secrets Manager',
          'AWS Certificate Manager (ACM)'
        ],
        correctAnswers: [1],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'AWS CloudHSM provides dedicated hardware security modules (HSM) where the customer exclusively controls and manages the encryption keys.',
        explanationVi: 'AWS CloudHSM cung cấp phần cứng bảo mật chuyên dụng riêng biệt nơi khách hàng nắm quyền kiểm soát độc quyền các khóa mã hóa.',
        referenceSection: 'Section 16',
        referenceLecture: 'Lecture 183'
      },
      {
        id: 104,
        question: 'Which cloud migration strategy involves moving an application to the cloud with ZERO modifications to its architecture or code, commonly known as "lift and shift"?',
        options: [
          'Replatform',
          'Repurchase',
          'Rehost',
          'Refactor'
        ],
        correctAnswers: [2],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'Rehost (lift-and-shift) moves applications to the cloud without code changes.',
        explanationVi: 'Rehost (lift-and-shift) di chuyển ứng dụng nguyên trạng lên đám mây mà không thay đổi mã nguồn.',
        referenceSection: 'Section 20',
        referenceLecture: 'Lecture 245'
      },
      {
        id: 105,
        question: 'Where is the Amazon CloudWatch Billing metric stored?',
        options: [
          'In all regions equally',
          'Only in us-east-1 (N. Virginia)',
          'In the region where the management account was created',
          'In us-west-2 (Oregon)'
        ],
        correctAnswers: [1],
        domain: 'Domain 4: Billing, Pricing and Support',
        explanation: 'CloudWatch billing metric data is aggregated and stored exclusively in the us-east-1 (N. Virginia) region.',
        explanationVi: 'Dữ liệu metric chi phí (Billing) của CloudWatch chỉ duy nhất được lưu trữ tại Region us-east-1.',
        referenceSection: 'Section 14',
        referenceLecture: 'Lecture 154'
      },
      {
        id: 106,
        question: 'A retail company is launching a new mobile shopping application that will serve over 300,000 consumers. The company needs a service that allows customers to register, sign in with their Google or Apple accounts, and securely upload profile photos directly to Amazon S3. Which AWS service should the company use?',
        options: [
          'AWS Identity and Access Management (IAM)',
          'AWS IAM Identity Center',
          'Amazon Cognito',
          'AWS Directory Service'
        ],
        correctAnswers: [2],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'Amazon Cognito provides authentication, authorization, and user management for customer-facing web and mobile applications at scale (millions of users), supporting social sign-in (Google, Apple, Facebook) via User Pools and temporary AWS access (S3 upload) via Identity Pools. IAM users should NEVER be created for consumer app users.',
        explanationVi: 'Amazon Cognito cung cấp tính năng xác thực, phân quyền và quản lý danh bạ cho hàng triệu người dùng ứng dụng web và di động, hỗ trợ đăng nhập qua mạng xã hội (User Pools) và cấp quyền truy cập tạm thời vào S3 (Identity Pools). Tuyệt đối không tạo IAM user cho khách hàng ứng dụng.',
        referenceSection: 'Section 19',
        referenceLecture: 'Lecture 230'
      },
      {
        id: 107,
        question: 'An enterprise manages 50 AWS accounts inside an AWS Organization. The company wants to allow employees to use a single set of corporate credentials to sign into an access portal and easily switch between their authorized AWS accounts and third-party SaaS applications such as Salesforce and Microsoft 365. Which AWS service should be implemented?',
        options: [
          'AWS IAM Identity Center',
          'AWS Security Token Service (STS)',
          'AWS Secrets Manager',
          'Amazon Cognito'
        ],
        correctAnswers: [0],
        domain: 'Domain 2: Security and Compliance',
        explanation: 'AWS IAM Identity Center (formerly AWS Single Sign-On / AWS SSO) enables administrators to centrally manage Single Sign-On (SSO) access to multiple AWS accounts within an AWS Organization and external business applications (Salesforce, Microsoft 365) through a single AWS Access Portal.',
        explanationVi: 'AWS IAM Identity Center (tiền thân là AWS Single Sign-On / AWS SSO) cho phép quản lý đăng nhập một lần (SSO) tập trung cho nhân viên truy cập vào nhiều tài khoản AWS trong AWS Organization và các ứng dụng SaaS doanh nghiệp thông qua một cổng AWS Access Portal duy nhất.',
        referenceSection: 'Section 19',
        referenceLecture: 'Lecture 232'
      },
      {
        id: 108,
        question: 'A company is evaluating four different disaster recovery (DR) strategies for its on-premises workloads migrating to AWS. The company has a strict budget and wants to select the disaster recovery strategy that incurs the LOWEST overall ongoing cost. Which strategy should the company choose?',
        options: [
          'Multi-Site Active-Active',
          'Warm Standby',
          'Pilot Light',
          'Backup and Restore'
        ],
        correctAnswers: [3],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'Backup and Restore has the lowest ongoing cost among all four DR strategies because no compute or database resources are actively running in the secondary cloud region until a disaster is declared. Cost order: Backup & Restore < Pilot Light < Warm Standby < Multi-Site Active-Active.',
        explanationVi: 'Backup and Restore có chi phí vận hành thường xuyên THẤP NHẤT trong 4 chiến lược phục hồi thảm họa vì không có bất kỳ máy chủ hay cơ sở dữ liệu nào phải chạy sẵn ở Region dự phòng cho tới khi có thảm họa. Thứ tự chi phí: Backup & Restore < Pilot Light < Warm Standby < Multi-Site.',
        referenceSection: 'Section 20',
        referenceLecture: 'Lecture 243'
      },
      {
        id: 109,
        question: 'An enterprise plans to migrate hundreds of virtual machines from its on-premises VMware data center to Amazon EC2 instances with zero code changes and minimal migration downtime. Which AWS service provides automated, non-disruptive continuous block-level data replication and cutover to perform this lift-and-shift migration?',
        options: [
          'AWS Application Discovery Service',
          'AWS Application Migration Service (AWS MGN)',
          'AWS Migration Evaluator',
          'AWS Database Migration Service (AWS DMS)'
        ],
        correctAnswers: [1],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'AWS Application Migration Service (AWS MGN) is the primary automated lift-and-shift (Rehost) solution that provides continuous block-level replication of disks from physical, virtual, or cloud servers into a low-cost AWS staging area, enabling fast cutover with minimal downtime.',
        explanationVi: 'AWS Application Migration Service (AWS MGN) là dịch vụ chính thức được khuyến nghị để tự động hóa di chuyển máy chủ theo chiến lược Lift and Shift (Rehost) lên Amazon EC2 bằng cơ chế sao chép liên tục mức khối lưu trữ và chuyển đổi nhanh chóng với thời gian dừng máy tối thiểu.',
        referenceSection: 'Section 20',
        referenceLecture: 'Lecture 246'
      },
      {
        id: 110,
        question: 'A university needs to provide engineering students with access to a proprietary 3D CAD simulation desktop application on their personal Apple Mac laptops and Chromebooks. The university wants to deliver this application directly through any modern web browser without provisioning and managing full virtual desktop operating systems for each student. Which AWS service meets these requirements?',
        options: [
          'Amazon WorkSpaces',
          'Amazon AppStream 2.0',
          'AWS Device Farm',
          'Amazon Connect'
        ],
        correctAnswers: [1],
        domain: 'Domain 3: Cloud Technology and Services',
        explanation: 'Amazon AppStream 2.0 streams individual desktop applications directly into any HTML5 web browser without provisioning a full virtual desktop operating system. In contrast, Amazon WorkSpaces provisions complete virtual desktop environments (VDI/DaaS).',
        explanationVi: 'Amazon AppStream 2.0 truyền tải (stream) trực tiếp một ứng dụng desktop cụ thể vào trình duyệt web HTML5 mà không cần cấp phát cả hệ điều hành máy tính để bàn ảo hoàn chỉnh. Ngược lại, Amazon WorkSpaces cấp phát toàn bộ môi trường máy tính để bàn ảo (VDI/DaaS).',
        referenceSection: 'Section 20',
        referenceLecture: 'Lecture 236'
      },
      {
        id: 111,
        question: 'Which pillar of the AWS Well-Architected Framework includes the design principle "Perform operations as code" and focuses on running and monitoring systems to continually improve processes and procedures?',
        options: [
          'Security',
          'Reliability',
          'Operational Excellence',
          'Performance Efficiency'
        ],
        correctAnswers: [2],
        domain: 'Domain 1: Cloud Concepts',
        explanation: 'Operational Excellence focuses on running and monitoring systems to deliver business value, and continually improving processes and procedures. Key design principles include: perform operations as code, make frequent, small, reversible changes, anticipate failure, and learn from all operational failures.',
        explanationVi: 'Trụ cột Vận hành Xuất sắc (Operational Excellence) tập trung vào việc chạy và giám sát hệ thống để mang lại giá trị kinh doanh, đồng thời liên tục cải tiến quy trình. Các nguyên tắc thiết kế then chốt gồm: thực hiện vận hành dưới dạng code (IaC), thay đổi nhỏ thường xuyên có thể hoàn tác, lường trước sự cố và rút kinh nghiệm từ mọi thất bại vận hành.',
        referenceSection: 'Section 21',
        referenceLecture: 'Lecture 254'
      },
      {
        id: 112,
        question: 'According to the AWS Cloud Adoption Framework (CAF), which perspective serves as the bridge between technology and business, focusing on organizational change management, cloud fluency, and upskilling staff to close skills gaps?',
        options: [
          'Business Perspective',
          'People Perspective',
          'Governance Perspective',
          'Operations Perspective'
        ],
        correctAnswers: [1],
        domain: 'Domain 1: Cloud Concepts',
        explanation: 'The People Perspective of the AWS Cloud Adoption Framework (CAF) serves as the bridge between technology and business. It evaluates organizational structures, culture, leadership, skills gaps, and training needed to evolve people and teams into cloud champions.',
        explanationVi: 'Góc nhìn Con người (People Perspective) trong khuôn khổ AWS CAF đóng vai trò là cầu nối then chốt giữa công nghệ và kinh doanh. Góc nhìn này tập trung vào cấu trúc tổ chức, văn hóa doanh nghiệp, quản trị thay đổi, bù đắp khoảng trống kỹ năng và đào tạo nhân sự thành thạo công nghệ đám mây.',
        referenceSection: 'Section 21',
        referenceLecture: 'Lecture 262'
      },
      {
        id: 113,
        question: 'An enterprise wants to offload the ongoing, day-to-day operational management of its AWS cloud infrastructure—including OS patch management, continuous monitoring, backup management, incident response, and change execution—to a dedicated team of AWS experts 24/7/365. Which AWS offering meets this requirement?',
        options: [
          'AWS Professional Services',
          'AWS Managed Services (AMS)',
          'AWS Support Enterprise Plan',
          'AWS re:Post'
        ],
        correctAnswers: [1],
        domain: 'Domain 1: Cloud Concepts',
        explanation: 'AWS Managed Services (AMS) operates and maintains your AWS infrastructure on your behalf 24/7/365 through a dedicated team of AWS experts who handle patching, monitoring, incident management, change management, and backup operations. In contrast, AWS Professional Services is a consulting team for strategy and migration planning.',
        explanationVi: 'AWS Managed Services (AMS) là dịch vụ vận hành hạ tầng ủy quyền do một đội ngũ chuyên gia AWS trực tiếp đảm nhiệm thay cho khách hàng 24/7/365, phụ trách vá lỗi hệ điều hành, giám sát liên tục, quản lý sự cố, yêu cầu thay đổi và sao lưu. Ngược lại, AWS Professional Services chỉ đóng vai trò tư vấn chiến lược và thiết kế di chuyển.',
        referenceSection: 'Section 21',
        referenceLecture: 'Lecture 267'
      },
      {
        id: 114,
        question: 'A candidate whose native language is not English is preparing to register for the AWS Certified Cloud Practitioner exam in English. Which official exam accommodation can the candidate request in the AWS Certification portal to extend their testing duration by an additional 30 minutes (from 90 to 120 minutes)?',
        options: [
          'AWS Translator Allowance',
          'ESL +30 Minutes Accommodation',
          'AWS Pearson Special Time Credit',
          'Builder ID Extended Session Pass'
        ],
        correctAnswers: [1],
        domain: 'Domain 1: Cloud Concepts',
        explanation: 'Candidates whose native language is not English can request the "ESL +30 Minutes" (English as a Second Language) accommodation under the Exam Accommodations section in the AWS Certification portal BEFORE scheduling their exam with Pearson VUE. Once approved, it extends the exam time from 90 to 120 minutes and never expires.',
        explanationVi: 'Thí sinh có tiếng mẹ đẻ không phải tiếng Anh có thể xin quyền lợi "ESL +30 Minutes" (English as a Second Language) trong mục Exam Accommodations trên cổng chứng chỉ AWS TRƯỚC KHI đặt lịch thi. Khi được duyệt, thời gian làm bài sẽ được tăng từ 90 lên 120 phút và quyền lợi này có hiệu lực vĩnh viễn.',
        referenceSection: 'Section 22',
        referenceLecture: 'Lecture 274'
      },
      {
        id: 115,
        question: 'A candidate has just received notification that they successfully passed the AWS Certified Cloud Practitioner (CLF-C02) exam. Which official benefit is automatically made available in the Benefits section of their AWS Certification portal for their continuing education?',
        options: [
          'A free voucher for any AWS Professional level exam',
          'A 50% discount voucher for their next AWS certification exam',
          'Free access to AWS Enterprise Support for one calendar year',
          '$500 USD in AWS Promotional Cloud Credits'
        ],
        correctAnswers: [1],
        domain: 'Domain 1: Cloud Concepts',
        explanation: 'Each time a candidate passes an AWS certification exam, AWS provides a benefit giving 50% off their next AWS exam. This voucher can be claimed in the Benefits section of the AWS Certification portal and applied at checkout when registering for any subsequent Associate, Professional, or Specialty exam.',
        explanationVi: 'Mỗi khi thi đỗ một chứng chỉ AWS bất kỳ, AWS sẽ trao tặng quyền lợi giảm 50% lệ phí cho kỳ thi AWS tiếp theo. Thí sinh chỉ cần vào tab Benefits trên cổng quản lý chứng chỉ AWS để nhận mã voucher và áp dụng khi thanh toán cho kỳ thi Associate, Professional hoặc Specialty tiếp theo.',
        referenceSection: 'Section 22 & 23',
        referenceLecture: 'Lecture 273'
      }
    ]
  }
];
