import json
import re
import glob

# Load translations and practice283
trans = json.load(open('scratch_translations_rich.json', 'r', encoding='utf-8'))
p283 = json.load(open('src/data/practice283.json', 'r', encoding='utf-8'))

# Manual verified corrections
CORRECTIONS = {
    6: {
        "correctAnswers": [0, 1], # A and B: Determine OS dependencies & Provide user access with IAM
        "isMultipleResponse": True
    },
    20: {
        "question": "A company is hosting an application in the AWS Cloud. The company wants to verify that the underlying AWS services and general infrastructure are operating normally. Which AWS services can help the company meet these requirements? (Select TWO.)",
        "questionVi": "Một công ty đang lưu trữ một ứng dụng trên Đám mây AWS. Công ty muốn xác minh rằng các dịch vụ AWS bên dưới và cơ sở hạ tầng chung đang hoạt động bình thường. Những dịch vụ AWS nào có thể giúp công ty đáp ứng các yêu cầu này? (Chọn HAI.)",
        "correctAnswers": [0, 3], # AWS Personal Health Dashboard and AWS Service Health Dashboard
        "isMultipleResponse": True
    },
    60: {
        "correctAnswers": [0], # A: Use EC2 instances across multiple Availability Zones in the same AWS Region.
        "isMultipleResponse": False
    },
    280: {
        "correctAnswers": [1], # B: Make frequent, small, reversible changes
        "isMultipleResponse": False
    }
}

# Load existing explanations from data/explanations/
def norm(text):
    return re.sub(r'\W+', '', text.lower())

existing_exps = {}
for path in glob.glob('data/explanations/exam-*.json'):
    try:
        items = json.load(open(path, 'r', encoding='utf-8'))
        for it in items:
            q_vi = it.get('question_vi', '')
            if q_vi:
                existing_exps[norm(q_vi)] = it
    except Exception:
        pass

# Term replacement dictionary to sanitize machine-translated AWS terms
REPLACEMENTS = [
    ("Cây đậu đàn hồi AWS", "AWS Elastic Beanstalk"),
    ("Cây đậu đàn hồi", "AWS Elastic Beanstalk"),
    ("Khám phá chi phí", "AWS Cost Explorer"),
    ("Cố vấn đáng tin cậy của AWS", "AWS Trusted Advisor"),
    ("Cố vấn đáng tin cậy", "AWS Trusted Advisor"),
    ("Tổ chức AWS", "AWS Organizations"),
    ("Đồng hồ đám mây Amazon", "Amazon CloudWatch"),
    ("Đồng hồ đám mây", "Amazon CloudWatch"),
    ("Dấu vết đám mây AWS", "AWS CloudTrail"),
    ("Dấu vết đám mây", "AWS CloudTrail"),
    ("Hình thành đám mây AWS", "AWS CloudFormation"),
    ("Hình thành đám mây", "AWS CloudFormation"),
    ("Cổng lưu trữ AWS", "AWS Storage Gateway"),
    ("Cổng lưu trữ", "AWS Storage Gateway"),
    ("Hệ thống tệp đàn hồi Amazon", "Amazon EFS"),
    ("Khối lưu trữ đàn hồi Amazon", "Amazon EBS"),
    ("Trình quản lý chứng chỉ AWS", "AWS Certificate Manager (ACM)"),
    ("Trình quản lý bí mật AWS", "AWS Secrets Manager"),
    ("Trình bảo vệ nhiệm vụ", "Amazon GuardDuty"),
    ("Thanh tra Amazon", "Amazon Inspector"),
    ("Cá nhân hóa Amazon", "Amazon Personalize"),
    ("Nhận thức Amazon", "Amazon Rekognition"),
    ("Hiểu Amazon", "Amazon Comprehend"),
    ("Đa giác Amazon", "Amazon Polly"),
    ("Dịch thuật Amazon", "Amazon Translate"),
    ("Bản chép lời Amazon", "Amazon Transcribe"),
    ("Xây dựng mã AWS", "AWS CodeBuild"),
    ("Triển khai mã AWS", "AWS CodeDeploy"),
    ("Đường ống mã AWS", "AWS CodePipeline"),
    ("Giao dịch mã AWS", "AWS CodeCommit"),
    ("Ngăn xếp OpsWorks", "AWS OpsWorks"),
    ("Vùng khả dụng", "Availability Zone (AZ)"),
    ("Vùng sẵn sàng", "Availability Zone (AZ)"),
    ("Khu vực AWS", "AWS Region"),
    ("Nhóm bảo mật", "Security Group"),
    ("Danh sách kiểm soát truy cập mạng", "Network ACL"),
    ("Mạng riêng ảo", "Virtual Private Cloud (VPC)"),
    ("Điểm cuối VPC", "VPC Endpoint"),
    ("Cổng kết nối Internet", "Internet Gateway"),
    ("Cổng NAT", "NAT Gateway"),
    ("Bộ cân bằng tải", "Load Balancer (ELB)"),
    ("Phần cứng chuyên dụng", "Dedicated Host"),
    ("Cơ quan đăng ký bộ chứa đàn hồi", "Amazon Elastic Container Registry (ECR)"),
    ("Dịch vụ bộ chứa đàn hồi", "Amazon Elastic Container Service (ECS)"),
    ("Dịch vụ Kubernetes đàn hồi", "Amazon Elastic Kubernetes Service (EKS)"),
]

def clean_text(text: str) -> str:
    if not text:
        return ""
    res = text
    for old, new in REPLACEMENTS:
        res = re.sub(re.escape(old), new, res, flags=re.IGNORECASE)
    res = re.sub(r' {2,}', ' ', res)
    return res.strip()

# Detailed knowledge base of AWS services and concepts for rich option analysis
AWS_KNOWLEDGE = {
    # Compute
    "ec2": "Amazon EC2 cung cấp máy chủ ảo có thể cấu hình linh hoạt (vCPU, RAM, OS), phù hợp cho khối lượng công việc đa dạng nhưng yêu cầu khách hàng tự quản lý hệ điều hành và cập nhật bảo mật.",
    "lambda": "AWS Lambda là dịch vụ điện toán không máy chủ (Serverless), tự động chạy mã phản hồi sự kiện và tính phí chính xác theo mili-giây thực thi, không cần quản lý máy chủ.",
    "elastic beanstalk": "AWS Elastic Beanstalk là dịch vụ PaaS cho phép lập trình viên tải mã nguồn lên và AWS tự động xử lý việc cấp phát máy chủ, cân bằng tải, tự động co giãn và giám sát.",
    "fargate": "AWS Fargate là công nghệ điện toán serverless cho container (ECS/EKS), giúp chạy container mà không cần quản trị máy chủ EC2 cơ sở.",
    "ecs": "Amazon ECS là dịch vụ điều phối container Docker có khả năng mở rộng cao và hiệu năng cao trên AWS.",
    "eks": "Amazon EKS là dịch vụ quản lý Kubernetes trên AWS, giúp triển khai và vận hành các cụm Kubernetes mà không cần tự cài đặt cụm điều khiển (control plane).",
    "lightsail": "Amazon Lightsail là dịch vụ máy chủ ảo trọn gói giá rẻ, đơn giản, dễ sử dụng cho các dự án nhỏ hoặc người mới bắt đầu.",
    "batch": "AWS Batch cho phép các nhà phát triển và kỹ sư dễ dàng chạy hàng trăm nghìn công việc xử lý hàng loạt (batch computing) trên AWS.",
    
    # Storage
    "s3": "Amazon S3 là dịch vụ lưu trữ đối tượng (Object Storage) không giới hạn dung lượng với độ bền 99.999999999% (11 số 9), lý tưởng cho backup, media, data lake và static website.",
    "glacier": "Amazon S3 Glacier cung cấp các lớp lưu trữ chi phí cực thấp chuyên dùng cho dữ liệu lưu trữ dài hạn (archival) và sao lưu hiếm khi truy cập.",
    "ebs": "Amazon EBS cung cấp các khối lưu trữ cấp block gắn trực tiếp vào phiên bản EC2 với độ trễ thấp và tính bền vững cao trong một Availability Zone.",
    "efs": "Amazon EFS cung cấp hệ thống tệp chia sẻ mạng (NFS) co giãn hoàn toàn tự động, có thể gắn đồng thời vào hàng nghìn phiên bản EC2 trên nhiều AZ.",
    "storage gateway": "AWS Storage Gateway kết nối môi trường tại chỗ với lưu trữ đám mây AWS, cung cấp quyền truy cập liền mạch vào S3 và EBS.",
    "snowball": "AWS Snowball là thiết bị lưu trữ vật lý an toàn được vận chuyển tận nơi để di chuyển dữ liệu quy mô terabyte đến petabyte vào hoặc ra khỏi AWS.",
    "snowcone": "AWS Snowcone là thiết bị điện toán biên và lưu trữ di động siêu nhỏ gọn và an toàn, dùng để thu thập và truyền dữ liệu trong môi trường khắc nghiệt.",
    
    # Database
    "rds": "Amazon RDS là dịch vụ cơ sở dữ liệu quan hệ được quản lý (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server), tự động sao lưu, vá lỗi và hỗ trợ Multi-AZ cho tính sẵn sàng cao.",
    "aurora": "Amazon Aurora là cơ sở dữ liệu quan hệ tương thích MySQL/PostgreSQL hiệu năng cao gấp 3-5 lần, tự động sao chép 6 bản dữ liệu qua 3 AZ.",
    "dynamodb": "Amazon DynamoDB là cơ sở dữ liệu NoSQL (Key-Value và Document) serverless, cung cấp hiệu năng dưới 10 mili-giây ổn định ở mọi quy mô.",
    "redshift": "Amazon Redshift là kho dữ liệu đám mây (Data Warehouse) phục vụ phân tích dữ liệu lớn và OLAP ở quy mô petabyte.",
    "elasticache": "Amazon ElastiCache là dịch vụ bộ nhớ đệm in-memory (Redis hoặc Memcached) giúp tăng tốc độ truy xuất dữ liệu với độ trễ dưới 1 mili-giây.",
    
    # Networking
    "vpc": "Amazon VPC cho phép khởi tạo mạng ảo riêng biệt được cô lập logic trên đám mây AWS, kiểm soát toàn diện dải IP, subnet, bảng định tuyến và cổng mạng.",
    "route 53": "Amazon Route 53 là dịch vụ định tuyến DNS trên đám mây có tính khả dụng cao và hỗ trợ kiểm tra tình trạng sức khỏe (Health checks) cùng các chính sách định tuyến nâng cao.",
    "cloudfront": "Amazon CloudFront là dịch vụ mạng phân phối nội dung (CDN) toàn cầu với độ trễ thấp thông qua mạng lưới các Edge Location.",
    "direct connect": "AWS Direct Connect thiết lập kết nối mạng chuyên dụng riêng biệt từ hạ tầng on-premises tới AWS, bỏ qua mạng Internet công cộng để có băng thông ổn định.",
    "vpn": "AWS Site-to-Site VPN tạo kết nối mạng riêng ảo bảo mật qua đường truyền Internet công cộng bằng giao thức IPsec giữa mạng on-premises và AWS VPC.",
    "internet gateway": "Internet Gateway là thành phần VPC cho phép giao tiếp hai chiều giữa các tài nguyên trong VPC và mạng Internet công cộng.",
    "nat gateway": "NAT Gateway cho phép các phiên bản trong Private Subnet kết nối ra Internet để tải bản vá/cập nhật nhưng chặn Internet khởi tạo kết nối vào.",
    "security group": "Security Group là tường lửa ảo ở cấp instance, hoạt động có trạng thái (Stateful) và chỉ cấu hình các quy tắc cho phép (Allow rules).",
    "network acl": "Network ACL là tường lửa ở cấp subnet, hoạt động không trạng thái (Stateless) và hỗ trợ cả quy tắc cho phép (Allow) lẫn từ chối (Deny).",
    
    # Security, Identity & Compliance
    "iam": "AWS IAM cho phép quản lý danh tính, phân quyền chi tiết, xác thực đa yếu tố (MFA) và áp dụng nguyên tắc đặc quyền tối thiểu (Least Privilege).",
    "kms": "AWS Key Management Service (KMS) giúp tạo, quản lý và kiểm soát các khóa mã hóa dùng để mã hóa dữ liệu trên các dịch vụ AWS.",
    "secrets manager": "AWS Secrets Manager giúp lưu trữ, xoay vòng tự động và quản lý các thông tin bí mật như mật khẩu database và API key trong suốt vòng đời.",
    "shield": "AWS Shield là dịch vụ phòng chống tấn công từ chối dịch vụ phân tán (DDoS), bản Standard miễn phí tích hợp sẵn và bản Advanced hỗ trợ phản ứng 24/7 từ đội SRT.",
    "waf": "AWS WAF là tường lửa ứng dụng web hoạt động ở tầng 7 (HTTP/S), bảo vệ chống lại các lỗ hổng web phổ biến như SQL Injection và XSS.",
    "guardduty": "Amazon GuardDuty là dịch vụ phát hiện mối đe dọa thông minh sử dụng máy học để liên tục phân tích VPC Flow Logs, CloudTrail Logs và DNS Logs.",
    "inspector": "Amazon Inspector là dịch vụ quản lý lỗ hổng bảo mật tự động, quét các lỗ hổng phần mềm và phát hiện phơi nhiễm mạng ngoài ý muốn trên EC2, ECR và Lambda.",
    "macie": "Amazon Macie sử dụng máy học và đối sánh mẫu để tự động phát hiện, phân loại và bảo vệ dữ liệu nhạy cảm (như PII, số thẻ tín dụng) trên Amazon S3.",
    "artifact": "AWS Artifact là cổng thông tin cung cấp quyền truy cập theo yêu cầu vào các báo cáo kiểm toán bảo mật và tuân thủ của AWS (SOC, PCI-DSS, ISO).",
    "cloudhsm": "AWS CloudHSM cung cấp thiết bị bảo mật phần cứng chuyên dụng (FIPS 140-2 Level 3) do khách hàng độc quyền kiểm soát để quản lý khóa mã hóa.",
    
    # Management & Governance
    "cloudwatch": "Amazon CloudWatch là dịch vụ giám sát và quan sát tài nguyên, thu thập chỉ số (metrics), log và gửi cảnh báo (alarms) theo thời gian thực.",
    "cloudtrail": "AWS CloudTrail ghi nhật ký và giám sát toàn bộ hoạt động gọi API của tài khoản AWS, phục vụ quản trị, kiểm toán bảo mật và tuân thủ.",
    "config": "AWS Config liên tục ghi lại và đánh giá các thay đổi cấu hình tài nguyên so với các quy tắc tuân thủ mong muốn.",
    "trusted advisor": "AWS Trusted Advisor quét toàn bộ tài khoản AWS và đưa ra khuyến nghị tối ưu theo 5 trụ cột: Chi phí, Hiệu năng, Bảo mật, Khả năng chịu lỗi và Giới hạn dịch vụ.",
    "systems manager": "AWS Systems Manager cung cấp giao diện quản lý tập trung tài nguyên, tự động hóa tác vụ vận hành, quản lý bản vá (Patch Manager) và chạy lệnh (Run Command).",
    "well-architected": "Khung AWS Well-Architected bao gồm 6 trụ cột: Vận hành xuất sắc, Bảo mật, Độ tin cậy, Hiệu quả hiệu năng, Tối ưu hóa chi phí và Tính bền vững.",
    "organizations": "AWS Organizations giúp quản lý tập trung nhiều tài khoản AWS, hỗ trợ xuất hóa đơn hợp nhất (Consolidated Billing) và áp dụng chính sách SCP.",
    "service catalog": "AWS Service Catalog cho phép tổ chức tạo và quản lý các danh mục dịch vụ CNTT đã được phê duyệt sẵn để người dùng tự triển khai.",
    "health dashboard": "AWS Health Dashboard cung cấp thông tin cảnh báo cá nhân hóa về tình trạng các dịch vụ AWS và cơ sở hạ tầng ảnh hưởng trực tiếp đến tài khoản của bạn.",
    
    # Billing, Cost & Support
    "cost explorer": "AWS Cost Explorer cung cấp giao diện trực quan để phân tích, hiểu rõ chi phí lịch sử và dự báo chi tiêu AWS trong tương lai lên đến 12 tháng.",
    "budgets": "AWS Budgets cho phép thiết lập ngưỡng ngân sách tùy chỉnh và gửi thông báo hoặc kích hoạt hành động tự động khi chi phí dự kiến vượt ngưỡng.",
    "pricing calculator": "AWS Pricing Calculator là công cụ ước tính chi phí trước khi triển khai kiến trúc trên AWS.",
    "support plan": "AWS Support bao gồm 4 gói chính: Basic (miễn phí), Developer (hỗ trợ giờ hành chính), Business (24/7 <1h khi prod down), Enterprise (24/7 <15m, có TAM và Concierge).",
    "tam": "Technical Account Manager (TAM) là chuyên gia kỹ thuật cấp cao được chỉ định riêng cho khách hàng gói Enterprise Support để hướng dẫn và tối ưu hóa kiến trúc.",
    "concierge": "AWS Concierge là đội ngũ chuyên gia hỗ trợ thanh toán và tài khoản dành riêng cho khách hàng Enterprise Support.",
    
    # Core Cloud Concepts
    "pay-as-you-go": "Mô hình trả tiền theo mức dùng thực tế (Pay-as-you-go) giúp doanh nghiệp chuyển đổi chi phí đầu tư vốn lớn (CapEx) sang chi phí vận hành linh hoạt (OpEx).",
    "capacity forecasting": "Điện toán đám mây giúp bạn 'ngừng đoán định công suất' (Stop guessing capacity), loại bỏ lãng phí tài nguyên hoặc nguy cơ quá tải.",
    "economies of scale": "Tính kinh tế nhờ quy mô khổng lồ (Massive economies of scale) cho phép AWS tổng hợp nhu cầu của hàng triệu khách hàng để hạ giá thành dịch vụ liên tục.",
    "global reach": "Phạm vi tiếp cận toàn cầu (Go global in minutes) cho phép triển khai ứng dụng tới người dùng ở nhiều quốc gia với độ trễ thấp thông qua mạng lưới AWS Regions và Edge Locations.",
    "elasticity": "Độ co giãn (Elasticity) là khả năng hệ thống tự động tăng hoặc giảm tài nguyên máy tính chính xác theo nhu cầu tải công việc thực tế.",
    "agility": "Tính nhanh nhạy (Agility) giúp rút ngắn thời gian khởi tạo và thử nghiệm công nghệ từ hàng tuần xuống chỉ còn vài phút.",
    "high availability": "Tính sẵn sàng cao (High Availability) đảm bảo ứng dụng vận hành liên tục không gián đoạn bằng cách triển khai phân tán trên nhiều Availability Zone.",
    "fault tolerance": "Khả năng chịu lỗi (Fault Tolerance) giúp hệ thống tiếp tục hoạt động trơn tru ngay cả khi một số thành phần phần cứng hoặc mạng gặp sự cố.",
    "shared responsibility": "Mô hình trách nhiệm chung: AWS chịu trách nhiệm 'Bảo mật CỦA đám mây' (hạ tầng, máy chủ, mạng vật lý), Khách hàng chịu trách nhiệm 'Bảo mật TRONG đám mây' (dữ liệu, IAM, hệ điều hành).",
}

def identify_service_note(text: str) -> str:
    t = text.lower()
    for key, desc in AWS_KNOWLEDGE.items():
        if key in t:
            return desc
    return ""

def extract_option_sentence(exp_vi: str, opt_text: str, opt_vi: str) -> str:
    if not exp_vi:
        return ""
    sentences = [s.strip() for s in re.split(r'\. |\.\n', exp_vi) if len(s.strip()) > 15]
    
    # Try keywords from opt_text and opt_vi
    words = [w for w in re.findall(r'[A-Za-z0-9À-ỹ]+', opt_text + " " + opt_vi) if len(w) > 3 and w.lower() not in ['amazon', 'dịch', 'vụ', 'aws', 'với', 'trong', 'cho', 'của', 'không', 'được']]
    for s in sentences:
        match_count = sum(1 for w in words if w.lower() in s.lower())
        if match_count >= 1:
            return s + "."
    return ""

def generate_option_analysis(opt_vi: str, opt_en: str, is_corr: bool, q_vi: str, exp_vi: str) -> str:
    clean_vi = clean_text(opt_vi)
    matched_s = extract_option_sentence(exp_vi, opt_en, opt_vi)
    svc_desc = identify_service_note(opt_en + " " + opt_vi)
    
    if is_corr:
        first_sentence = exp_vi.split('.')[0].strip() if exp_vi else ""
        if matched_s:
            return f"Đúng. {clean_vi} là đáp án chính xác. {matched_s}"
        if svc_desc:
            return f"Đúng. {clean_vi} là giải pháp đáp ứng yêu cầu. {first_sentence}. {svc_desc}"
        return f"Đúng. {clean_vi} đáp ứng đầy đủ yêu cầu của đề bài. {first_sentence}."
    else:
        if matched_s and ("không" in matched_s.lower() or "sai" in matched_s.lower()):
            return f"Sai. {matched_s}"
        if svc_desc:
            return f"Sai. {clean_vi}: {svc_desc} Do đó không phù hợp với yêu cầu cụ thể của câu hỏi."
        return f"Sai. {clean_vi} không phải là giải pháp phù hợp hoặc không đáp ứng các tiêu chuẩn kỹ thuật/nghiệp vụ được đặt ra trong câu hỏi này."

def extract_topic(q_vi: str, domain: str) -> str:
    q_low = q_vi.lower()
    if any(k in q_low for k in ["trách nhiệm", "shared responsibility", "bảo mật của", "bảo mật trong"]):
        return "Mô hình trách nhiệm chung (Shared Responsibility Model)"
    if any(k in q_low for k in ["iam", "người dùng", "mfa", "mật khẩu", "access key", "least privilege"]):
        return "Quản lý danh tính & Kiểm soát truy cập (AWS IAM)"
    if any(k in q_low for k in ["chi phí", "ngân sách", "hóa đơn", "cost", "billing", "budget", "pricing", "tco", "capex", "opex"]):
        return "Quản lý chi phí & Thanh toán AWS"
    if any(k in q_low for k in ["s3", "lưu trữ đối tượng", "bucket", "glacier"]):
        return "Dịch vụ lưu trữ Amazon S3 & Vòng đời dữ liệu"
    if any(k in q_low for k in ["ec2", "máy chủ ảo", "instance", "điện toán"]):
        return "Dịch vụ điện toán đám mây Amazon EC2"
    if any(k in q_low for k in ["cơ sở dữ liệu", "database", "rds", "dynamodb", "aurora", "nosql"]):
        return "Giải pháp cơ sở dữ liệu trên AWS"
    if any(k in q_low for k in ["mạng", "vpc", "subnet", "route 53", "cloudfront", "gateway", "direct connect"]):
        return "Hạ tầng mạng & Phân phối nội dung (VPC & Networking)"
    if any(k in q_low for k in ["well-architected", "trụ cột", "tối ưu hóa", "độ tin cậy", "vận hành xuất sắc"]):
        return "Khung kiến trúc tối ưu AWS (Well-Architected Framework)"
    if any(k in q_low for k in ["hỗ trợ", "support plan", "basic", "developer", "business", "enterprise"]):
        return "Các gói hỗ trợ kỹ thuật AWS Support Plans"
    if any(k in q_low for k in ["khu vực", "vùng sẵn sàng", "region", "availability zone", "toàn cầu", "global reach", "lợi thế"]):
        return "Lợi thế điện toán đám mây & Hạ tầng toàn cầu"
    if any(k in q_low for k in ["bảo vệ", "bảo mật", "tấn công", "ddos", "shield", "waf", "guardduty", "inspector"]):
        return "An ninh & Phòng chống đe dọa (Security & Compliance)"
    return domain.split(":")[-1].strip()

def extract_tips_and_keywords(q_vi: str, exp_vi: str, options_vi: list, correct_indices: list):
    tips = []
    keywords = []
    q_low = q_vi.lower()
    
    if "support" in q_low or "hỗ trợ" in q_low:
        tips.append("Ghi nhớ các ngưỡng SLA phản hồi: Business (<1h cho production down, 24/7 phone/chat/email), Enterprise (<15m cho mission-critical, có TAM).")
        keywords.append({"term": "support plan", "points_to": "Developer / Business / Enterprise"})
    elif "trách nhiệm" in q_low or "shared" in q_low:
        tips.append("Nguyên tắc vàng: AWS quản lý 'Bảo mật CỦA đám mây' (phần cứng, hạ tầng vật lý), Khách hàng quản lý 'Bảo mật TRONG đám mây' (dữ liệu, cấu hình IAM, OS).")
        keywords.append({"term": "trách nhiệm của AWS", "points_to": "Hạ tầng vật lý, data center, ảo hóa"})
    elif "s3" in q_low or "lưu trữ" in q_low:
        tips.append("S3 là Object Storage với 11 số 9 độ bền (99.999999999%). Muốn lưu trữ rẻ nhất cho dữ liệu lâu dài hiếm khi truy cập: S3 Glacier Deep Archive.")
        keywords.append({"term": "lưu trữ đối tượng", "points_to": "Amazon S3"})
    elif "chi phí" in q_low or "cost" in q_low:
        tips.append("Phân biệt: Cost Explorer (dự báo và phân tích lịch sử chi tiêu), AWS Budgets (đặt ngưỡng cảnh báo ngân sách).")
        keywords.append({"term": "dự báo chi phí", "points_to": "AWS Cost Explorer"})
    elif "bảo mật" in q_low or "threat" in q_low:
        tips.append("Cặp dịch vụ bảo mật hay gặp: GuardDuty (phát hiện mối đe dọa thông minh), Inspector (quét lỗ hổng phần mềm trên EC2/Lambda), WAF (tường lửa web lớp 7).")
        keywords.append({"term": "phát hiện mối đe dọa", "points_to": "Amazon GuardDuty"})
    else:
        tips.append("Đọc kỹ từ khóa trong câu hỏi (như 'least operational overhead', 'most cost-effective', 'serverless') để loại trừ các phương án đòi hỏi quản trị máy chủ.")
        tips.append("Sử dụng phương pháp loại trừ: Các dịch vụ có tiền tố Amazon/AWS thường có chức năng chuyên biệt, không chọn dịch vụ hạ tầng cho tác vụ phân tích kinh doanh.")
        keywords.append({"term": "tối ưu & tự động hóa", "points_to": "Dịch vụ Managed / Serverless"})
        
    return tips, keywords

def extract_related_services(q_text: str, options: list) -> list:
    full = (q_text + " " + " ".join(options)).lower()
    services = []
    candidates = [
        "Amazon EC2", "Amazon S3", "AWS Lambda", "AWS Elastic Beanstalk", "Amazon RDS",
        "Amazon Aurora", "Amazon DynamoDB", "Amazon CloudFront", "Amazon Route 53",
        "Amazon CloudWatch", "AWS CloudTrail", "AWS Trusted Advisor", "AWS Cost Explorer",
        "AWS Budgets", "AWS Organizations", "AWS Shield", "AWS WAF", "Amazon GuardDuty",
        "Amazon Inspector", "Amazon Macie", "AWS KMS", "AWS Secrets Manager", "AWS Artifact",
        "AWS IAM", "Amazon VPC", "AWS Direct Connect", "Amazon SNS", "Amazon SQS",
        "AWS CloudFormation", "AWS Storage Gateway", "AWS Snowball"
    ]
    for s in candidates:
        name_short = s.split()[-1].lower()
        if name_short in full:
            services.append(s)
    return list(dict.fromkeys(services))[:5]

# Build explanations
final_explanations = []
updated_questions = []

for idx, q in enumerate(p283):
    qid = q['id'] # e.g. "practice-283-1"
    q_num = idx + 1
    
    # Apply manual corrections if present
    if q_num in CORRECTIONS:
        corr_info = CORRECTIONS[q_num]
        if "correctAnswers" in corr_info:
            q['correctAnswers'] = corr_info["correctAnswers"]
        if "isMultipleResponse" in corr_info:
            q['isMultipleResponse'] = corr_info["isMultipleResponse"]
        if "question" in corr_info:
            q['question'] = corr_info["question"]
        if "questionVi" in corr_info:
            q['questionVi'] = corr_info["questionVi"]
    
    t_item = trans.get(qid, {})
    q_vi = clean_text(q.get('questionVi') or t_item.get('q_vi') or q['question'])
    exp_vi = clean_text(t_item.get('exp_vi') or q.get('explanationVi') or q.get('explanation') or "")
    opts_vi = [clean_text(o) for o in (q.get('optionsVi') or t_item.get('opts_vi') or q['options'])]
    
    # Check if there is an exact match in existing handwritten explanations
    norm_vi = norm(q_vi)
    matched_existing = existing_exps.get(norm_vi)
    
    domain = q.get('domain', 'Domain 1: Cloud Concepts')
    topic = matched_existing.get('topic') if matched_existing else extract_topic(q_vi, domain)
    
    # Build options
    explanation_options = []
    labels = ['A', 'B', 'C', 'D', 'E', 'F']
    correct_indices = q.get('correctAnswers', [0])
    
    for o_idx, opt_en in enumerate(q['options']):
        label = labels[o_idx] if o_idx < len(labels) else chr(65 + o_idx)
        opt_v = opts_vi[o_idx] if o_idx < len(opts_vi) else opt_en
        is_corr = o_idx in correct_indices
        
        # Check if matched_existing has analysis for this option
        analysis = ""
        if matched_existing and 'options' in matched_existing:
            for ex_opt in matched_existing['options']:
                if ex_opt.get('label') == label:
                    analysis = clean_text(ex_opt.get('analysis_vi', ''))
                    break
        
        if not analysis:
            analysis = generate_option_analysis(opt_v, opt_en, is_corr, q_vi, exp_vi)
            
        explanation_options.append({
            "label": label,
            "text_vi": opt_v,
            "is_correct": is_corr,
            "analysis_vi": analysis
        })
        
    tips = matched_existing.get('tips') if matched_existing else []
    keywords = matched_existing.get('keywords') if matched_existing else []
    if not tips or not keywords:
        gen_tips, gen_kw = extract_tips_and_keywords(q_vi, exp_vi, opts_vi, correct_indices)
        if not tips:
            tips = gen_tips
        if not keywords:
            keywords = gen_kw
            
    related_services = matched_existing.get('related_services') if matched_existing else []
    if not related_services:
        related_services = extract_related_services(q['question'], q['options'])
        
    explanation_obj = {
        "question_id": qid,
        "question_vi": q_vi,
        "domain": domain,
        "topic": topic,
        "explanation_vi": exp_vi,
        "options": explanation_options,
        "tips": tips,
        "keywords": keywords,
        "related_services": related_services,
        "answer_note": None
    }
    final_explanations.append(explanation_obj)
    
    # Update question for practice283.json
    q_copy = dict(q)
    q_copy['questionVi'] = q_vi
    q_copy['optionsVi'] = opts_vi
    
    # Multi-line formatted Vietnamese explanation for text mode
    corr_labels = [labels[c] for c in correct_indices if c < len(labels)]
    analysis_lines = []
    for opt in explanation_options:
        mark = "✓" if opt['is_correct'] else "✗"
        analysis_lines.append(f"{mark} {opt['label']}. {opt['text_vi']}: {opt['analysis_vi']}")
        
    formatted_exp_vi = (
        f"Đáp án đúng: {', '.join(corr_labels)}\n\n"
        f"Vì sao chọn đáp án này:\n{exp_vi}\n\n"
        f"Phân tích các phương án:\n" + "\n".join(analysis_lines)
    )
    q_copy['explanationVi'] = formatted_exp_vi
    updated_questions.append(q_copy)

# Save practice283_explanations.json
with open('src/data/practice283_explanations.json', 'w', encoding='utf-8') as f:
    json.dump(final_explanations, f, ensure_ascii=False, indent=2)

# Save updated practice283.json
with open('src/data/practice283.json', 'w', encoding='utf-8') as f:
    json.dump(updated_questions, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(final_explanations)} rich explanations in src/data/practice283_explanations.json")
print(f"Successfully updated {len(updated_questions)} questions in src/data/practice283.json")
