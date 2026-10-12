import { SectionItem } from '../../types';
import { section16Data } from './section16';
import { section17Data } from './section17';
import { section18Data } from './section18';

export const PART3_SECTIONS: SectionItem[] = [
  {
    id: 'section-15',
    sectionNumber: 15,
    titleEn: 'VPC & Networking (Virtual Private Cloud, Subnets, Gateways & Hybrid Connectivity)',
    titleVi: 'Mạng riêng ảo VPC & Hạ tầng kết nối mạng (Subnet, Gateways, Tường lửa & Kết nối Hybrid)',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'Networking Core',
    overviewEn: 'Section 15 delivers a complete foundational breakdown of Amazon VPC (Virtual Private Cloud) and AWS networking. Master VPC boundaries (regional scope, CIDR blocks), Subnets (AZ-scoped, public vs private), routing mechanisms (Internet Gateway vs NAT Gateway vs Route Tables), 2-tier firewalls (Stateful Security Groups vs Stateless Network ACLs), network traffic diagnostics (VPC Flow Logs & VPC Peering), private AWS connectivity (Gateway Endpoints for S3/DynamoDB vs Interface Endpoints/PrivateLink), and hybrid corporate connectivity (AWS Site-to-Site VPN, AWS Direct Connect, Client VPN, and AWS Transit Gateway hub-and-spoke star architecture).',
    overviewVi: 'Section 15 trang bị nền tảng hoàn chỉnh về Amazon VPC (Virtual Private Cloud) và hạ tầng mạng trên AWS phục vụ bài thi AWS Certified Cloud Practitioner CLF-C02 (chiếm 1-2 câu hỏi tình huống trọng tâm). Làm chủ ranh giới mạng riêng ảo VPC theo Region, phân chia Subnet theo từng Availability Zone, cơ chế định tuyến (Internet Gateway cho Public Subnet vs NAT Gateway cho Private Subnet), mô hình bảo mật tường lửa 2 lớp (Security Group mức máy chủ stateful vs Network ACL mức subnet stateless), giám sát lưu lượng IP với VPC Flow Logs, đấu nối VPC Peering không bắc cầu, kết nối riêng tư không qua internet (Gateway Endpoint cho S3/DynamoDB vs Interface Endpoint/PrivateLink), và các giải pháp kết nối Hybrid doanh nghiệp (Site-to-Site VPN, Direct Connect đường truyền cáp vật lý riêng, Client VPN cho nhân viên từ xa, và Transit Gateway mô hình hình sao kết nối hàng nghìn VPC).',
    quickExamFacts: [
      {
        en: 'VPC Scope: A VPC is bound to a single AWS Region and spans all Availability Zones in that Region. A Subnet is bound to a single Availability Zone (AZ) and cannot span multiple AZs.',
        vi: 'Phạm vi VPC: VPC gắn liền với 1 AWS Region duy nhất và trải rộng qua mọi Availability Zone trong Region đó. Một Subnet chỉ gắn với 1 Availability Zone duy nhất và không thể trải dài qua nhiều AZ.',
        isCoreHighlight: true
      },
      {
        en: 'Public vs Private Subnet: A public subnet has a Route Table with a default route (0.0.0.0/0) pointing to an Internet Gateway (IGW). A private subnet routes outbound internet traffic (0.0.0.0/0) through a NAT Gateway deployed in a PUBLIC subnet.',
        vi: 'Public Subnet vs Private Subnet: Public subnet có Route Table chứa tuyến đường 0.0.0.0/0 trỏ ra Internet Gateway (IGW). Private subnet muốn ra internet phải trỏ tuyến đường 0.0.0.0/0 qua NAT Gateway đặt trong PUBLIC subnet.',
        isCoreHighlight: true
      },
      {
        en: 'The 5 Reserved IPs: AWS reserves exactly 5 IP addresses in every subnet (.0 Network, .1 VPC Router, .2 Amazon DNS, .3 Future use, .255 Broadcast). A /28 subnet has 16 - 5 = 11 usable IPs; a /24 subnet has 256 - 5 = 251 usable IPs.',
        vi: '5 IP dự trữ của AWS: AWS giữ lại đúng 5 IP trong mỗi subnet (.0 Mạng, .1 VPC Router, .2 DNS nội bộ, .3 Dự phòng, .255 Broadcast). Subnet /28 có 16 - 5 = 11 IP khả dụng; subnet /24 có 256 - 5 = 251 IP khả dụng.',
        isCoreHighlight: true
      },
      {
        en: 'Firewall 2-Tier Battle: Security Group = Instance/ENI level, ALLOW rules only, STATEFUL (return traffic automatically allowed). Network ACL (NACL) = Subnet level, ALLOW and DENY rules, STATELESS (must explicitly allow ephemeral return ports 1024-65535). To BLOCK a specific malicious IP address, you MUST use NACL Deny rules!',
        vi: 'Đối đầu 2 lớp tường lửa: Security Group = mức máy chủ/ENI, chỉ có luật ALLOW, STATEFUL (tự động cho phép luồng phản hồi về). NACL = mức Subnet, có cả luật ALLOW và DENY, STATELESS (phải mở cổng phản hồi ephemeral 1024-65535). Muốn CHẶN (BLOCK) một địa chỉ IP độc hại cụ thể, BẮT BUỘC dùng luật DENY của NACL!',
        isCoreHighlight: true
      },
      {
        en: 'VPC Endpoints Rule: Gateway Endpoint is ONLY for Amazon S3 and Amazon DynamoDB (free, route table target). Interface Endpoint is for almost all other AWS services (powered by PrivateLink, provisions an ENI with private IP, hourly & data processing fee).',
        vi: 'Quy tắc vàng VPC Endpoint: Gateway Endpoint CHỈ DÀNH RIÊNG CHO Amazon S3 và Amazon DynamoDB (hoàn toàn miễn phí, cấu hình trong Route Table). Interface Endpoint dành cho hầu hết các dịch vụ AWS khác (chạy trên PrivateLink, tạo card mạng ảo ENI có IP riêng, tính phí theo giờ và GB).',
        isCoreHighlight: true
      },
      {
        en: 'Hybrid Connectivity: Site-to-Site VPN = IPSec tunnel over public internet, encrypted, fast 5-minute setup, lower cost. Direct Connect (DX) = Dedicated physical fiber cable, 1+ month setup, high bandwidth, ultra-consistent latency, highly private. Client VPN = OpenVPN for individual laptops/devices to connect directly into VPC.',
        vi: 'Kết nối Hybrid On-Premises: Site-to-Site VPN = Đường hầm IPSec qua internet công cộng, mã hóa, thiết lập nhanh 5 phút, chi phí thấp. Direct Connect (DX) = Đường cáp quang vật lý riêng biệt chuyên dụng, mất hơn 1 tháng thiết lập, băng thông cực lớn, độ trễ ổn định, bảo mật cao. Client VPN = OpenVPN cho máy tính cá nhân kết nối vào VPC.',
        isCoreHighlight: true
      },
      {
        en: 'Transit Gateway: Hub-and-spoke star network that connects thousands of VPCs and on-premises networks together. Eliminates complex mesh VPC Peering (which is non-transitive). Keyword trigger: "connect hundreds/thousands of VPCs in a hub-and-spoke topology" -> Transit Gateway.',
        vi: 'Transit Gateway: Mô hình mạng hình sao Hub-and-Spoke kết nối hàng nghìn VPC và hạ tầng On-Premises với nhau. Xóa bỏ hoàn toàn mạng lưới VPC Peering phức tạp (vốn không có tính chất bắc cầu). Từ khóa đề thi: "kết nối hàng trăm/nghìn VPC theo mô hình hub-and-spoke" -> Transit Gateway.',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-166',
        number: 166,
        titleEn: 'VPC Overview',
        titleVi: 'Tổng quan VPC (Virtual Private Cloud - Mạng Riêng Ảo)',
        summaryEn: 'Foundational architecture of Amazon Virtual Private Cloud (VPC): regional private isolated network, subnet partitioning, gateways, route tables, network firewalls, and cloud connectivity scope for the CLF-C02 exam.',
        summaryVi: 'Kiến trúc nền tảng của Amazon Virtual Private Cloud (VPC): mạng riêng ảo độc lập theo Region, phân chia subnet theo Availability Zone, cổng gateways, bảng định tuyến Route Tables, 2 lớp tường lửa mạng và phạm vi kiểm tra cốt lõi trong kỳ thi CLF-C02.',
        table: {
          headers: ['Thành phần cốt lõi của VPC', 'Phạm vi triển khai (Scope)', 'Chức năng & Nhiệm vụ chính trong mạng', 'Lưu ý đề thi CLF-C02'],
          rows: [
            ['Virtual Private Cloud (VPC)', 'Regional (Gắn với 1 AWS Region)', 'Mạng riêng ảo cách ly hoàn toàn dành riêng cho tài khoản AWS của bạn, chứa toàn bộ tài nguyên (EC2, RDS, ALB)', 'Trải rộng qua toàn bộ các Availability Zone trong Region; mặc định tối đa 5 VPC mỗi Region (có thể xin tăng)'],
            ['Subnet (Mạng con)', 'AZ-level (Gắn với 1 Availability Zone)', 'Phân đoạn dải địa chỉ IP của VPC đặt trong một Availability Zone cụ thể', '1 Subnet KHÔNG THỂ trải rộng qua 2 AZ; chia thành Public Subnet (có lối ra Internet) và Private Subnet (cách ly)'],
            ['Internet Gateway (IGW)', 'Regional (Gắn vào 1 VPC)', 'Cổng giao tiếp 2 chiều giữa VPC và Internet công cộng, thực hiện NAT 1:1 cho các public IP', 'Một VPC chỉ có thể gắn tối đa duy nhất 1 Internet Gateway; dịch vụ được AWS quản lý hoàn toàn, tự động co giãn'],
            ['NAT Gateway', 'AZ-level (Nằm trong Public Subnet)', 'Cho phép các máy chủ trong Private Subnet truy cập ra Internet (tải patch, updates) mà chặn chiều ngược lại', 'Phải đặt trong Public Subnet và gắn Elastic IP; tính phí theo giờ hoạt động và dung lượng GB dữ liệu truyền qua'],
            ['Route Table (Bảng định tuyến)', 'VPC / Subnet level', 'Tập hợp các quy tắc (routes) điều hướng gói tin mạng đi đâu (local, igw, nat, peering, endpoint)', 'Mỗi Subnet bắt buộc phải liên kết với 1 Route Table; mặc định có quy tắc trỏ toàn bộ dải IP VPC về local'],
            ['Security Group (Tường lửa ảo)', 'Instance / ENI level', 'Tường lửa kiểm soát lưu lượng ra/vào ở mức máy chủ ảo (card mạng ENI)', 'Stateful (tự mở luồng phản hồi), chỉ có luật ALLOW, có thể tham chiếu đến Security Group khác'],
            ['Network ACL (NACL)', 'Subnet level', 'Tường lửa kiểm soát lưu lượng ở ranh giới mạng con (Subnet)', 'Stateless (phải mở cả chiều đi và về), hỗ trợ cả luật ALLOW và DENY, đánh số thứ tự từ bé đến lớn']
          ]
        },
        keyPointsEn: [
          'VPC stands for Virtual Private Cloud: a private, logically isolated virtual network dedicated to your AWS account.',
          'VPC is a Regional resource: It spans all Availability Zones within that specific Region. You cannot span a VPC across multiple Regions.',
          'Default VPC vs Custom VPC: Every AWS account comes with a default VPC in every Region with public subnets, an Internet Gateway, and public IPv4 addressing ready to launch EC2 instances immediately.',
          'Exam Scope: The CLF-C02 exam tests VPC at a conceptual and use-case level (1-2 questions). You do NOT need advanced subnetting binary math or BGP routing configuration.',
          'Subnets are bound to a single AZ: To build high-availability architectures, you deploy subnets in multiple AZs and configure Multi-AZ failover.',
          'Core networking components to remember: Subnets, Route Tables, Internet Gateway (IGW), NAT Gateway, Security Groups, NACLs, VPC Flow Logs, VPC Peering, and VPC Endpoints.'
        ],
        keyPointsVi: [
          'VPC viết tắt của Virtual Private Cloud: mạng riêng ảo được cách ly logic dành riêng cho tài khoản AWS của bạn.',
          'VPC có phạm vi theo Region (Regional resource): VPC trải rộng qua toàn bộ các Availability Zone trong Region đó. Một VPC KHÔNG THỂ trải dài qua nhiều Region khác nhau.',
          'VPC Mặc định (Default VPC) vs VPC Tự tạo (Custom VPC): Mọi tài khoản AWS đều có sẵn 1 Default VPC ở mỗi Region kèm các Public Subnet, Internet Gateway gắn sẵn để người dùng chạy ngay EC2 mà không cần cấu hình mạng phức tạp.',
          'Phạm vi đề thi: Kỳ thi CLF-C02 chỉ hỏi VPC ở mức khái niệm, chức năng và tình huống kiến trúc (1-2 câu). Bạn KHÔNG cần tính toán nhị phân chia mạng con phức tạp hay giao thức định tuyến BGP.',
          'Subnet gắn chặt với 1 Availability Zone duy nhất: Để xây dựng hệ thống sẵn sàng cao (High Availability), ta phải tạo các subnet trên nhiều AZ khác nhau rồi phân bổ tài nguyên Multi-AZ.',
          'Các thành phần cốt lõi cần nhớ nằm lòng: Subnet, Route Table, Internet Gateway, NAT Gateway, Security Group, NACL, VPC Flow Logs, VPC Peering và VPC Endpoints.'
        ],
        isCore: true
      },
      {
        id: 'lec-167',
        number: 167,
        titleEn: 'IP Addresses in AWS (IPv4 vs IPv6, Public vs Private, Elastic IP)',
        titleVi: 'Địa chỉ IP trong AWS (IPv4, Private vs Public, Elastic IP & IPv6)',
        summaryEn: 'Comprehensive breakdown of IP address types in AWS: Private IPv4 (persistent internal), Public IPv4 (dynamic external), Elastic IP (fixed public IPv4 with cost caveats), and IPv6 (globally unique and free).',
        summaryVi: 'Phân tích chi tiết các loại địa chỉ IP trong AWS: Private IPv4 (IP nội bộ cố định theo vòng đời instance), Public IPv4 (IP công cộng thay đổi sau mỗi lần stop/start), Elastic IP (IP công cộng cố định gắn vào máy chủ kèm lưu ý chi phí), và IPv6 (luôn là IP công cộng toàn cầu và miễn phí).',
        table: {
          headers: ['Loại địa chỉ IP', 'Đặc tính kết nối & Khả năng truy cập', 'Tính bền bỉ (Persistence sau Stop/Start)', 'Chi phí & Giới hạn sử dụng (AWS Billing)'],
          rows: [
            ['Private IPv4', 'Chỉ dùng nội bộ bên trong VPC và mạng riêng (RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)', 'GIỮ NGUYÊN không đổi trong suốt vòng đời của EC2 instance (kể cả khi Stop rồi Start lại)', 'Hoàn toàn miễn phí; cấp phát tự động từ dải CIDR của Subnet'],
            ['Public IPv4', 'Truy cập được trực tiếp từ Internet công cộng; định tuyến toàn cầu', 'BỊ THAY ĐỔI: Khi bạn STOP một EC2 instance và START lại, IP public cũ sẽ bị giải phóng và cấp 1 IP public mới hoàn toàn!', 'AWS tính phí $0.005/giờ cho mọi địa chỉ Public IPv4 đang sử dụng (kể từ tháng 2/2024)'],
            ['Elastic IP (EIP)', 'Địa chỉ Public IPv4 cố định bạn sở hữu riêng, có thể gắn linh hoạt vào bất kỳ EC2 instance hoặc ENI nào', 'CỐ ĐỊNH: Không bao giờ thay đổi sau khi Stop/Start máy chủ; dùng để che giấu sự cố bằng cách trỏ nhanh sang máy chủ dự phòng', 'Tối đa 5 Elastic IP/Region (mặc định). Tính phí $0.005/giờ; nếu giữ Elastic IP mà KHÔNG gắn vào máy đang chạy thì vẫn bị tính phí phạt lãng phí!'],
            ['IPv6 (128-bit)', 'Định dạng thập lục phân (ví dụ 2001:db8::/32); MỌI địa chỉ IPv6 trên AWS đều là PUBLIC và có thể định tuyến Internet', 'CỐ ĐỊNH gắn với instance; không có khái niệm private IPv6 chuẩn trong VPC (dùng Egress-Only IGW để chặn chiều vào)', 'Hoàn toàn MIỄN PHÍ trên AWS (không bị tính phí $0.005/giờ như IPv4 công cộng)']
          ]
        },
        keyPointsEn: [
          'IPv4 address structure: 32-bit numerical label represented as 4 octets separated by dots (e.g. 172.31.0.0/16).',
          'Private IPv4: Can only be used within the private network (VPC, corporate LAN). Remains constant for the entire lifecycle of the instance, even across stop/start cycles.',
          'Public IPv4: Globally unique and routable on the internet. Crucial exam fact: When you STOP and START an EC2 instance, its public IPv4 address CHANGES because the old IP is released back into the AWS public IP pool!',
          'Elastic IP Address (EIP): A static public IPv4 address allocated to your AWS account. You can mask the failure of an instance by rapidly remapping the address to another instance in your account.',
          'Elastic IP Billing & Best Practice: AWS charges $0.005/hr for all public IPv4s. You are also charged if you allocate an Elastic IP but do NOT attach it to a running instance (anti-hoarding fee). Modern cloud design avoids Elastic IPs by using Application Load Balancers with DNS names or CloudFront.',
          'IPv6 in AWS: 128-bit address space. In AWS VPC, ALL IPv6 addresses are globally routable and public. IPv6 addresses are completely free of charge.'
        ],
        keyPointsVi: [
          'Cấu trúc IPv4: Địa chỉ 32-bit gồm 4 octet ngăn cách bởi dấu chấm (ví dụ: 172.31.0.0/16 = 65.536 địa chỉ IP).',
          'Private IPv4: Chỉ có giá trị trong mạng nội bộ VPC hoặc mạng công ty. Giữ nguyên không đổi trong suốt vòng đời máy chủ, kể cả khi Stop/Start.',
          'Public IPv4: Địa chỉ công cộng định tuyến toàn cầu trên Internet. CÂU HỎI THI KINH ĐIỂN: Khi bạn STOP và START lại một máy chủ EC2, Public IPv4 của nó SẼ BỊ THAY ĐỔI do IP cũ được trả về kho IP dùng chung của AWS!',
          'Elastic IP (EIP): Địa chỉ Public IPv4 tĩnh cố định thuộc sở hữu tài khoản của bạn. Giúp xử lý sự cố nhanh chóng bằng cách trỏ tức thời sang một máy chủ EC2 dự phòng khác mà khách hàng không cần đổi DNS.',
          'Chi phí Elastic IP: AWS tính phí $0.005/giờ cho mọi Public IPv4. Đặc biệt, nếu bạn xin cấp Elastic IP nhưng KHÔNG gắn vào máy chủ đang chạy, AWS sẽ phạt tiền theo giờ để tránh tình trạng chiếm giữ lãng phí IP. Khuyên dùng ALB + DNS thay vì lạm dụng Elastic IP.',
          'IPv6 trên AWS: Không gian 128-bit khổng lồ. MỌI địa chỉ IPv6 trên AWS đều là địa chỉ Public toàn cầu và hoàn toàn MIỄN PHÍ.'
        ],
        isCore: true
      },
      {
        id: 'lec-168',
        number: 168,
        titleEn: 'VPC, Subnet, Internet Gateway & NAT Gateways',
        titleVi: 'VPC, Subnet, Internet Gateway & NAT Gateways (Kiến trúc Luồng mạng)',
        summaryEn: 'Deep architectural comparison of Public Subnets, Private Subnets, Internet Gateways (bidirectional internet communication), NAT Gateways (outbound-only for private instances), and Route Table rules.',
        summaryVi: 'So sánh chuyên sâu kiến trúc Public Subnet, Private Subnet, Internet Gateway (kết nối 2 chiều Internet), NAT Gateway (chỉ cho phép chiều ra Outbound cho Private Subnet) và quy tắc định tuyến Route Tables.',
        table: {
          headers: ['Thành phần cổng mạng', 'Vị trí triển khai (Deployment)', 'Chiều kết nối (Direction)', 'Cơ chế dự phòng & Tính năng chính'],
          rows: [
            ['Internet Gateway (IGW)', 'Gắn trực tiếp vào VPC (1 VPC = 1 IGW)', 'Hai chiều (Inbound & Outbound) cho máy có Public IP', 'Managed Service của AWS, có tính sẵn sàng cao (HA) tuyệt đối, không có điểm nghẽn băng thông, miễn phí tạo cổng'],
            ['NAT Gateway', 'BẮT BUỘC đặt trong PUBLIC SUBNET', 'Một chiều (CHỈ Outbound) từ Private Subnet ra Internet', 'Managed Service của AWS, tự động co giãn lên đến 45 Gbps, gắn Elastic IP, tính phí theo giờ và GB dữ liệu'],
            ['NAT Instance (Cũ / Legacy)', 'Tự cài trên máy chủ EC2 trong Public Subnet', 'Một chiều (Outbound)', 'Tự quản trị (phải tự vá lỗi OS, tự lo High Availability bằng script chuyển đổi failover, phải tắt Source/Destination Check)']
          ]
        },
        keyPointsEn: [
          'VPC CIDR Block: Defines the range of private IP addresses for the VPC (e.g. 10.0.0.0/16). Subnets must have CIDR blocks that are subsets of the VPC CIDR block.',
          'Public Subnet definition: A subnet whose Route Table contains a default route (0.0.0.0/0) pointing to an Internet Gateway (target: igw-xxxx).',
          'Private Subnet definition: A subnet that has NO direct route to an Internet Gateway. Instances have only private IP addresses and cannot be reached directly from the internet.',
          'How Private Subnets access the Internet: Route 0.0.0.0/0 points to a NAT Gateway (target: nat-xxxx). The NAT Gateway translates private IPs to its own Elastic IP to fetch OS updates, patches, or external API data.',
          'NAT Gateway MUST reside in a Public Subnet: Because the NAT Gateway itself needs direct route to the Internet Gateway to communicate with external servers!',
          'NAT Gateway is OUTBOUND ONLY: It allows instances in the private subnet to initiate connections to the internet, but strictly PREVENTS the internet from initiating inbound connections into private instances.',
          'NAT Gateway vs NAT Instance: Always choose NAT Gateway on the exam (AWS-managed, high availability within AZ, automatically scales bandwidth up to 45 Gbps, no maintenance needed).'
        ],
        keyPointsVi: [
          'Dải mạng VPC CIDR: Xác định dải IP nội bộ cho toàn VPC (ví dụ 10.0.0.0/16 = 65.536 IP). Mọi subnet tạo ra phải là tập con của dải CIDR này.',
          'Định nghĩa Public Subnet: Là subnet có Route Table chứa tuyến đường mặc định trỏ 0.0.0.0/0 ra Internet Gateway (target: igw-xxxx). Máy chủ tại đây có thể truy cập 2 chiều với Internet.',
          'Định nghĩa Private Subnet: Là subnet KHÔNG CÓ tuyến đường trực tiếp ra Internet Gateway. Máy chủ chỉ có IP riêng và được cách ly an toàn khỏi mọi kết nối ngoài Internet.',
          'Cách Private Subnet ra Internet: Route Table của nó trỏ 0.0.0.0/0 tới NAT Gateway (target: nat-xxxx). NAT Gateway dịch địa chỉ IP riêng thành Elastic IP công cộng của nó để tải cập nhật hệ điều hành, bản vá bảo mật hoặc gọi API ngoài.',
          'NAT Gateway BẮT BUỘC PHẢI ĐẶT TRONG PUBLIC SUBNET: Vì chính bản thân NAT Gateway phải có đường ra Internet Gateway thì mới đẩy gói tin ra thế giới bên ngoài được!',
          'NAT Gateway CHỈ CHO CHIỀU RA (Outbound-only): Cho phép máy chủ nội bộ chủ động gửi yêu cầu ra ngoài, nhưng TUYỆT ĐỐI NGĂN CHẶN bên ngoài tự ý khởi tạo kết nối đi vào máy chủ nội bộ.',
          'So sánh NAT Gateway vs NAT Instance: Trong bài thi luôn chọn NAT Gateway (được AWS quản lý hoàn toàn, sẵn sàng cao trong AZ, tự co giãn băng thông tới 45 Gbps, không cần quản trị).'
        ],
        isCore: true
      },
      {
        id: 'lec-169',
        number: 169,
        titleEn: 'VPC, Subnet, IGW & NAT - Hands On',
        titleVi: 'Thực hành Khám phá VPC Mặc định & 5 Địa chỉ IP Dự trữ của AWS',
        summaryEn: 'Hands-on exploration of the default VPC architecture (CIDR 172.31.0.0/16), default subnets (/20), the 5 reserved IP addresses per subnet in AWS, and route table mechanics.',
        summaryVi: 'Thực hành trực quan khám phá cấu trúc Default VPC (dải 172.31.0.0/16), các subnet mặc định (/20), quy tắc 5 địa chỉ IP dự trữ bắt buộc của AWS trong mọi subnet và cơ chế hoạt động của Route Table.',
        table: {
          headers: ['Địa chỉ IP trong Subnet', 'Mục đích sử dụng của AWS', 'Khả năng gán cho máy chủ EC2', 'Ví dụ thực tế trong Subnet 10.0.0.0/24'],
          rows: [
            ['IP thứ 1 (.0)', 'Network Address (Địa chỉ định danh mạng con)', 'KHÔNG THỂ gán (AWS bảo lưu)', '10.0.0.0: Network Address'],
            ['IP thứ 2 (.1)', 'VPC Router (Cổng Gateway ngầm mặc định của VPC)', 'KHÔNG THỂ gán (AWS bảo lưu)', '10.0.0.1: Default Router của VPC'],
            ['IP thứ 3 (.2)', 'Amazon Provided DNS (Máy chủ phân giải tên miền Route 53 Resolver)', 'KHÔNG THỂ gán (AWS bảo lưu)', '10.0.0.2: DNS Server nội bộ của AWS'],
            ['IP thứ 4 (.3)', 'Reserved by AWS for future use (Dự phòng cho tính năng tương lai)', 'KHÔNG THỂ gán (AWS bảo lưu)', '10.0.0.3: AWS Future Use'],
            ['IP cuối cùng (.255)', 'Network Broadcast Address (Địa chỉ quảng bá)', 'KHÔNG THỂ gán (AWS không hỗ trợ broadcast trong VPC nhưng vẫn giữ)', '10.0.0.255: Broadcast Address']
          ]
        },
        keyPointsEn: [
          'Default VPC Specifications: CIDR block 172.31.0.0/16 (65,536 total addresses), with default public subnets in each AZ sized at /20 (4,096 total addresses each).',
          'THE 5 RESERVED IP ADDRESSES PER SUBNET (CRITICAL EXAM TRICK): In ANY subnet in AWS, exactly 5 IP addresses are reserved by AWS and CANNOT be assigned to any host:',
          '1. .0: Network address.',
          '2. .1: Reserved by AWS for the VPC router.',
          '3. .2: Reserved by AWS for Amazon DNS mapping (base IP + 2).',
          '4. .3: Reserved by AWS for future use.',
          '5. .255 (last IP in range): Network broadcast address (AWS does not support broadcast, but reserves this).',
          'Exam Calculation Example: If a question asks "How many usable IP addresses are available in a subnet with CIDR block /28?": A /28 subnet has 2^(32-28) = 16 total IPs. Usable IPs = 16 - 5 = 11 usable IPs! For /24 (256 total), usable = 256 - 5 = 251 usable IPs.',
          'Default Route Table configuration: Always contains "VPC CIDR -> local" target so all subnets inside the same VPC can automatically communicate with each other privately.'
        ],
        keyPointsVi: [
          'Thông số Default VPC: Dải CIDR 172.31.0.0/16 (tổng cộng 65.536 IP), chứa các public subnet mặc định ở mỗi AZ với kích thước /20 (tổng cộng 4.096 IP mỗi subnet).',
          'QUY TẮC 5 ĐỊA CHỈ IP BẢO LƯU CỦA AWS (BẪY THI CỰC KỲ PHỔ BIẾN): Trong BẤT KỲ subnet nào trên AWS, luôn có đúng 5 địa chỉ IP bị AWS giữ lại và KHÔNG THỂ gán cho máy chủ:',
          '1. .0: Địa chỉ mạng (Network address).',
          '2. .1: Dành cho bộ định tuyến VPC Router ngầm.',
          '3. .2: Dành cho máy chủ DNS nội bộ của AWS (Amazon Provided DNS).',
          '4. .3: AWS giữ lại để dự phòng cho các tính năng tương lai.',
          '5. .255 (IP cuối cùng của dải): Địa chỉ quảng bá Broadcast (AWS không hỗ trợ broadcast trong VPC nhưng vẫn bảo lưu IP này).',
          'Công thức tính số IP khả dụng trong đề thi: Nếu đề hỏi "Subnet có dải CIDR /28 có bao nhiêu IP gán được cho máy chủ?": Subnet /28 có 2^(32-28) = 16 IP tổng. Số IP khả dụng = 16 - 5 = 11 IP! Tương tự dải /24 (256 IP) thì khả dụng = 256 - 5 = 251 IP.',
          'Quy tắc Route Table ngầm: Luôn luôn có sẵn dòng "Dải CIDR VPC -> local", nghĩa là tất cả các subnet trong cùng một VPC đều có thể nói chuyện trực tiếp với nhau theo mặc định.'
        ]
      },
      {
        id: 'lec-170',
        number: 170,
        titleEn: 'Security Groups & Network Access Control List (NACL)',
        titleVi: 'Security Groups so với Network ACL (NACL) - Tường lửa 2 Lớp',
        summaryEn: 'Deep architectural comparison of the 2 firewall security layers in a VPC: Security Groups (instance/ENI level, allow-only, stateful) versus Network ACLs (subnet level, allow/deny, stateless, numbered rules, IP blocking).',
        summaryVi: 'So sánh chuyên sâu 2 lớp tường lửa bảo vệ hệ thống mạng trong VPC: Security Group (mức máy chủ ảo/ENI, chỉ có luật cho phép, stateful) so với Network ACL (mức mạng con Subnet, có cả luật cho phép và từ chối, stateless, đánh số thứ tự, chặn IP độc hại).',
        table: {
          headers: ['Tiêu chí so sánh', 'Security Group (SG)', 'Network Access Control List (NACL)', 'Ý nghĩa đề thi CLF-C02'],
          rows: [
            ['Cấp độ bảo vệ (Level)', 'Mức Instance / Card mạng ảo (ENI)', 'Mức Subnet (Mạng con)', 'SG bảo vệ từng máy chủ riêng lẻ; NACL là chốt kiểm soát ở cửa ngõ toàn bộ Subnet'],
            ['Loại quy tắc (Rules)', 'CHỈ CÓ LUẬT CHO PHÉP (ALLOW only). Mọi thứ khác mặc định bị chặn', 'HỖ TRỢ CẢ LUẬT CHO PHÉP & TỪ CHỐI (ALLOW and DENY rules)', 'Muốn CHẶN (BLOCK) một IP độc hại cụ thể -> BẮT BUỘC DÙNG NACL (vì SG không có luật DENY)!'],
            ['Trạng thái kết nối (State)', 'STATEFUL: Nếu chiều đi vào (Inbound) được cho phép, luồng phản hồi chiều ra (Outbound) TỰ ĐỘNG được phép đi qua', 'STATELESS: Chiều vào và chiều ra hoàn toàn độc lập! Phải cấu hình luật riêng cho cả 2 chiều', 'NACL Stateless bắt buộc phải mở dải cổng tạm thời (Ephemeral Ports: 1024-65535) cho chiều phản hồi'],
            ['Thứ tự duyệt luật (Evaluation)', 'Đánh giá TẤT CẢ các quy tắc cùng lúc trước khi quyết định cho phép', 'Đánh giá THEO THỨ TỰ SỐ TĂNG DẦN (quy tắc số 100 chạy trước 200; gặp luật khớp đầu tiên sẽ áp dụng ngay)', 'Quy tắc số nhỏ hơn có độ ưu tiên cao hơn. Dấu sao (*) là quy tắc mặc định cuối cùng (chặn tất cả)'],
            ['Khả năng tham chiếu (Reference)', 'Có thể tham chiếu tới dải IP CIDR HOẶC tham chiếu tới một Security Group khác', 'CHỈ THAM CHIẾU TỚI DẢI IP CIDR (Không thể tham chiếu Security Group)', 'Mô hình 3 lớp kinh điển: Web SG chỉ nhận traffic từ ALB SG; DB SG chỉ nhận traffic từ Web SG!']
          ]
        },
        keyPointsEn: [
          'Two layers of defense in depth: NACL acts as the outer gate for the subnet, and Security Groups act as the inner shield on each instance.',
          'Security Group = Stateful: When an inbound packet is allowed through port 80, the response packet is AUTOMATICALLY allowed back out, regardless of outbound rules.',
          'Security Group = Allow Only: There is no DENY rule in a Security Group. By default, all inbound traffic is blocked, and all outbound traffic is allowed.',
          'Security Group Referencing: You can specify another Security Group ID as the traffic source (e.g., RDS Security Group allows port 3306 ONLY from the Web-App Security Group). This is a foundational best practice for AWS multi-tier architecture.',
          'Network ACL = Stateless: Inbound and outbound rules are evaluated completely independently. If you allow inbound traffic on port 80, you MUST also add an outbound rule allowing traffic to the client on ephemeral ports (1024-65535)!',
          'Network ACL = Allow and Deny: Rules are numbered from 1 to 32766. AWS evaluates rules in ascending numerical order and executes the first matching rule immediately.',
          'THE CLASSIC EXAM QUESTION: "How do you block a specific malicious IP address from attacking your application?" -> Create a DENY rule for that IP in the Subnet Network ACL (NACL)! You cannot do this with a Security Group.'
        ],
        keyPointsVi: [
          'Chiến lược phòng thủ 2 lớp (Defense in Depth): NACL đóng vai trò cổng bảo vệ vòng ngoài của Subnet, còn Security Group là tấm khiên bảo vệ vòng trong trực tiếp trên từng máy chủ.',
          'Security Group = Stateful: Khi một gói tin đi vào cổng 80 được chấp thuận, gói tin phản hồi trả về TỰ ĐỘNG ĐƯỢC PHÉP ĐI RA mà không cần quan tâm đến bảng Outbound rules.',
          'Security Group = Chỉ có luật ALLOW: Không có khái niệm luật DENY trong Security Group. Mặc định chặn tất cả chiều vào, và cho phép tất cả chiều ra.',
          'Khả năng tham chiếu Security Group: Bạn có thể điền Source là một Security Group khác (ví dụ: Security Group của RDS chỉ mở cổng 3306 cho Security Group của Web-App). Đây là kiến trúc nhiều lớp chuẩn mực nhất trên AWS.',
          'Network ACL = Stateless: Hai chiều vào và ra hoàn toàn độc lập. Nếu bạn mở cổng 80 ở Inbound, bạn BẮT BUỘC phải mở cổng Ephemeral (1024-65535) ở Outbound thì client mới nhận được dữ liệu!',
          'Network ACL = Hỗ trợ cả ALLOW và DENY: Các quy tắc được đánh số từ 1 đến 32766. Hệ thống quét từ số bé nhất lên; quy tắc nào khớp trước sẽ được áp dụng ngay lập tức mà không xét tiếp các quy tắc phía sau.',
          'CÂU HỎI THI KINH ĐIỂN NHẤT: "Làm thế nào để chặn một địa chỉ IP độc hại cụ thể đang tấn công hệ thống của bạn?" -> Tạo một quy tắc DENY cho địa chỉ IP đó trong Network ACL (NACL) của Subnet! Không thể dùng Security Group để chặn IP cụ thể.'
        ],
        isCore: true
      },
      {
        id: 'lec-171',
        number: 171,
        titleEn: 'VPC Flow Logs & VPC Peering',
        titleVi: 'VPC Flow Logs & VPC Peering (Ghi Log Lưu lượng & Đấu nối Mạng)',
        summaryEn: 'Detailed analysis of VPC Flow Logs (monitoring IP traffic, detecting ACCEPT/REJECT events, S3 and CloudWatch destinations) and VPC Peering (privately connecting two VPCs, non-overlapping CIDRs, non-transitive routing rule).',
        summaryVi: 'Phân tích chi tiết VPC Flow Logs (giám sát lưu lượng IP, phát hiện sự kiện ACCEPT/REJECT của tường lửa, đẩy log sang S3 và CloudWatch Logs) và VPC Peering (kết nối riêng tư 2 VPC qua mạng nội bộ AWS, không chồng lấn CIDR, quy tắc không bắc cầu).',
        table: {
          headers: ['Khái niệm mạng', 'Mục đích & Cách thức hoạt động', 'Quy tắc bắt buộc / Ràng buộc kỹ thuật', 'Điểm mấu chốt trong bài thi'],
          rows: [
            ['VPC Flow Logs', 'Ghi lại thông tin lưu lượng mạng IP đi vào/ra các card mạng (ENI) trong VPC để giám sát và khắc phục sự cố', 'Có thể kích hoạt ở 3 cấp độ: VPC level, Subnet level, hoặc ENI level. Gửi dữ liệu tới Amazon S3, CloudWatch Logs, Kinesis Firehose', 'Giúp điều tra kết nối bị từ chối (REJECT) do lỗi Security Group hoặc NACL; phát hiện tấn công mạng bất thường'],
            ['VPC Peering', 'Kết nối trực tiếp 2 VPC với nhau qua hạ tầng mạng riêng của AWS, các máy chủ giao tiếp bằng Private IP', 'Dải địa chỉ IP (CIDR) của 2 VPC KHÔNG ĐƯỢC PHÉP CHỒNG LẤN NHAU (Non-overlapping IP address ranges)', 'Hoạt động xuyên tài khoản (Cross-account) và xuyên vùng (Cross-region / Inter-region peering)'],
            ['Tính chất Không bắc cầu (NOT Transitive)', 'Nếu VPC A nối với VPC B, và VPC B nối với VPC C -> VPC A KHÔNG THỂ nói chuyện với VPC C qua VPC B!', 'Muốn A nói chuyện với C, bắt buộc phải tạo thêm 1 kết nối Peering trực tiếp giữa A và C, hoặc nâng cấp lên Transit Gateway', 'Bẫy đề thi: Peering không thể chuyển tiếp gói tin gián tiếp qua VPC trung gian!']
          ]
        },
        keyPointsEn: [
          'VPC Flow Logs captures metadata about network IP traffic: source IP, destination IP, source port, destination port, protocol, packets, bytes, and action (ACCEPT or REJECT).',
          'Flow Logs destinations: Send logs to Amazon CloudWatch Logs (for real-time monitoring and alarms), Amazon S3 (for long-term storage and Athena SQL querying), or Kinesis Data Firehose.',
          'Troubleshooting connectivity: If an EC2 connection is failing, checking Flow Logs for REJECT entries tells you whether Security Groups or NACLs are blocking the packets.',
          'VPC Peering: Privately connects two VPCs using AWS backbone network routing. Traffic stays entirely within AWS network and never traverses the public internet.',
          'Rule 1 - No Overlapping CIDRs: You CANNOT create a VPC Peering connection between VPCs that share identical or overlapping IP address spaces (e.g. 10.0.0.0/16 and 10.0.0.0/16 cannot peer).',
          'Rule 2 - VPC Peering is NOT TRANSITIVE: If VPC A is peered with B, and B is peered with C, VPC A CANNOT communicate with VPC C through B. To connect A and C, you must either create a direct peering connection between A and C, or migrate to AWS Transit Gateway.',
          'Route Table update required: Creating a peering connection is not enough; you must explicitly add routes in both VPC route tables pointing to the peering connection (pcx-xxxx).'
        ],
        keyPointsVi: [
          'VPC Flow Logs thu thập siêu dữ liệu về lưu lượng IP: IP nguồn, IP đích, cổng nguồn, cổng đích, giao thức mạng, số lượng gói tin, dung lượng byte và hành động (ACCEPT hoặc REJECT).',
          'Nơi lưu trữ Flow Logs: Có thể đẩy log sang Amazon CloudWatch Logs (để giám sát thời gian thực và bắn alarm), Amazon S3 (để lưu trữ dài hạn và truy vấn bằng Amazon Athena), hoặc Kinesis Data Firehose.',
          'Ứng dụng xử lý sự cố: Khi máy chủ không kết nối được, tra cứu Flow Logs thấy trạng thái REJECT sẽ biết ngay gói tin đang bị chặn bởi Security Group hay NACL.',
          'VPC Peering: Kết nối riêng tư 2 VPC thông qua hạ tầng mạng ngầm của AWS. Gói tin chạy hoàn toàn trên cáp AWS, bảo mật tuyệt đối và không bao giờ đi ra Internet công cộng.',
          'Quy tắc 1 - Không được trùng lặp dải IP: KHÔNG THỂ tạo quan hệ Peering giữa hai VPC nếu dải CIDR của chúng bị chồng lấn nhau (ví dụ cùng là 10.0.0.0/16 sẽ bị từ chối).',
          'Quy tắc 2 - VPC Peering KHÔNG CÓ TÍNH CHẤT BẮC CẦU (Not Transitive): Nếu A nối với B, và B nối với C, thì A KHÔNG THỂ gửi dữ liệu tới C qua trung gian B. Muốn A kết nối với C, bắt buộc phải tạo đường nối trực tiếp A-C hoặc chuyển sang dùng AWS Transit Gateway.',
          'Bắt buộc cập nhật Route Table: Sau khi tạo Peering xong, bạn bắt buộc phải thêm tuyến đường vào Route Table của cả 2 bên trỏ sang ID của Peering (pcx-xxxx) thì gói tin mới đi được.'
        ],
        isCore: true
      },
      {
        id: 'lec-172',
        number: 172,
        titleEn: 'VPC Endpoints (Interface vs Gateway)',
        titleVi: 'VPC Endpoints (Gateway Endpoint vs Interface Endpoint)',
        summaryEn: 'Critical exam comparison of VPC Endpoints: connecting private VPC resources directly to AWS services without traversing the public internet, NAT Gateways, or Internet Gateways. Gateway Endpoint (S3 & DynamoDB only, free) vs Interface Endpoint (PrivateLink, ENI, paid).',
        summaryVi: 'So sánh cốt lõi trong đề thi về VPC Endpoints: cho phép máy chủ trong Private Subnet gọi thẳng tới các dịch vụ AWS mà không cần đi qua Internet công cộng, NAT Gateway hay Internet Gateway. Gateway Endpoint (chỉ dành cho S3 & DynamoDB, miễn phí) so với Interface Endpoint (dùng PrivateLink, tạo card mạng ENI, tính phí).',
        table: {
          headers: ['Đặc điểm so sánh', 'Gateway Endpoint', 'Interface Endpoint', 'Quy tắc vàng ghi nhớ phòng thi'],
          rows: [
            ['Dịch vụ AWS hỗ trợ', 'CHỈ HỖ TRỢ 2 DỊCH VỤ: Amazon S3 và Amazon DynamoDB', 'Hầu hết các dịch vụ AWS còn lại (SNS, SQS, CloudWatch, KMS, Secrets Manager, v.v.)', 'Thấy S3 hoặc DynamoDB kết nối riêng tư -> LUÔN CHỌN GATEWAY ENDPOINT'],
            ['Cơ chế triển khai', 'Cấu hình trực tiếp như một mục tiêu (Target) trong Route Table của Subnet', 'Cấp phát một Elastic Network Interface (ENI) có IP riêng (Private IP) đặt ngay trong Subnet', 'Gateway dùng Prefix List trong Route Table; Interface dùng DNS nội bộ và IP riêng'],
            ['Chi phí sử dụng', 'HOÀN TOÀN MIỄN PHÍ (Không tốn tiền theo giờ, không tốn tiền dữ liệu)', 'TÍNH PHÍ (Phí duy trì ENI theo giờ + Phí xử lý dữ liệu theo dung lượng GB)', 'Gateway Endpoint giúp tiết kiệm chi phí tối đa khi tải khối lượng lớn dữ liệu từ S3'],
            ['Công nghệ nền tảng', 'VPC Gateway Routing', 'AWS PrivateLink', 'Interface Endpoint hoạt động trên nền tảng AWS PrivateLink']
          ]
        },
        keyPointsEn: [
          'The problem solved: Normally, AWS public services like S3, DynamoDB, SNS have public endpoints. For private EC2 instances to access them, traffic usually flows through a NAT Gateway and Internet Gateway, incurring NAT data transfer costs and security concerns.',
          'VPC Endpoints solution: Keep all traffic strictly within the AWS private network without using NAT Gateway, Internet Gateway, or public IP addresses.',
          'Gateway Endpoints (ONLY TWO SERVICES): Amazon S3 and Amazon DynamoDB. It modifies the subnet Route Table by adding a prefix list route. It is completely FREE of charge.',
          'Interface Endpoints: Provisions an Elastic Network Interface (ENI) with a private IP address inside your subnet. It powers almost all other AWS services (e.g., CloudWatch, SQS, SNS, SSM, KMS). It incurs hourly and data transfer fees.',
          'GOLDEN EXAM RULE: Whenever a question mentions "privately and securely access Amazon S3 or DynamoDB from private subnets at lowest cost without internet" -> The answer is ALWAYS Gateway VPC Endpoint!'
        ],
        keyPointsVi: [
          'Vấn đề giải quyết: Các dịch vụ AWS như S3, DynamoDB có địa chỉ public. Để máy chủ trong Private Subnet gọi tới chúng, luồng dữ liệu trước đây phải đi qua NAT Gateway và Internet Gateway, tốn chi phí truyền dữ liệu và rủi ro bảo mật.',
          'Giải pháp VPC Endpoints: Giữ toàn bộ luồng dữ liệu chạy hoàn toàn bên trong mạng nội bộ AWS mà không cần NAT Gateway, Internet Gateway hay địa chỉ IP công cộng.',
          'Gateway Endpoint (CHỈ DÀNH CHO 2 DỊCH VỤ): Amazon S3 và Amazon DynamoDB. Nó hoạt động bằng cách thêm một Prefix List vào Route Table của Subnet. Hoàn toàn MIỄN PHÍ.',
          'Interface Endpoint: Tạo ra một card mạng ảo ENI mang địa chỉ IP nội bộ (Private IP) nằm ngay bên trong Subnet của bạn. Hỗ trợ gần như mọi dịch vụ AWS khác (CloudWatch, SQS, SNS, SSM, KMS). Có tính phí theo giờ và GB dữ liệu.',
          'QUY TẮC PHÒNG THI KINH ĐIỂN: Khi gặp câu hỏi "kết nối riêng tư tới Amazon S3 hoặc DynamoDB từ private subnet với chi phí tối ưu nhất mà không qua internet" -> Đáp án CHẮC CHẮN LÀ Gateway VPC Endpoint!'
        ],
        isCore: true
      },
      {
        id: 'lec-173',
        number: 173,
        titleEn: 'AWS PrivateLink',
        titleVi: 'Tổng quan AWS PrivateLink (Chia sẻ Dịch vụ B2B Riêng tư)',
        summaryEn: 'Exposing services running in one VPC to thousands of customer VPCs privately and securely using AWS PrivateLink (Network Load Balancer + Interface VPC Endpoints), without VPC Peering, NAT, or Internet Gateways.',
        summaryVi: 'Cung cấp dịch vụ từ một VPC tới hàng nghìn VPC khách hàng một cách riêng tư và bảo mật tuyệt đối bằng AWS PrivateLink (Network Load Balancer + Interface VPC Endpoint), không cần thiết lập VPC Peering phức tạp, không cần NAT hay Internet Gateway.',
        table: {
          headers: ['Mô hình kết nối', 'Phương thức triển khai', 'Xử lý trùng lặp IP (Overlapping CIDR)', 'Độ phức tạp & Quy mô mở rộng'],
          rows: [
            ['AWS PrivateLink', 'Nhà cung cấp mở dịch vụ qua NLB; Khách hàng tạo Interface Endpoint (ENI) trong VPC của mình', 'HOÀN TOÀN HỖ TRỢ (Dải IP của 2 bên có thể trùng nhau mà không bị xung đột mạng)', 'Cực kỳ đơn giản; 1 dịch vụ có thể mở rộng an toàn cho hàng nghìn VPC khách hàng khác nhau'],
            ['VPC Peering', 'Đấu nối trực tiếp 2 VPC ngang hàng với nhau', 'KHÔNG HỖ TRỢ (Nếu trùng dải IP CIDR thì không thể Peering)', 'Phức tạp nếu có nhiều khách hàng (phải quản lý mạng lưới mesh khổng lồ N*(N-1)/2 kết nối)'],
            ['Public Internet API', 'Mở public IP và bảo vệ bằng tường lửa/WAF qua Internet', 'Không quan tâm IP nội bộ', 'Tiềm ẩn nguy cơ tấn công mạng từ Internet công cộng; tốn chi phí băng thông NAT Gateway']
          ]
        },
        keyPointsEn: [
          'What is AWS PrivateLink: The most secure and scalable way to expose a service (hosted in your VPC) to thousands of other AWS customer VPCs.',
          'Architecture mechanism: The service provider deploys a Network Load Balancer (NLB) in front of their application and creates an Endpoint Service. The customer creates an Interface VPC Endpoint (ENI) in their VPC.',
          'No Internet exposure: Traffic flows directly across the AWS private backbone. Neither side requires an Internet Gateway, NAT Gateway, or public IP addresses.',
          'Overlapping CIDRs supported: Unlike VPC Peering, PrivateLink works perfectly even if both VPCs use the exact same IP address space (e.g., both use 10.0.0.0/16).',
          'Use cases: SaaS vendors providing private API access to enterprise clients, internal microservices sharing between independent business units without exposing entire VPC networks.'
        ],
        keyPointsVi: [
          'AWS PrivateLink là gì: Là giải pháp an toàn và có khả năng mở rộng cao nhất để chia sẻ một ứng dụng/dịch vụ (nằm trong VPC của bạn) tới hàng nghìn VPC khách hàng khác.',
          'Cơ chế kiến trúc: Bên cung cấp dịch vụ đặt ứng dụng phía sau một Network Load Balancer (NLB) và tạo VPC Endpoint Service. Bên khách hàng chỉ cần tạo một Interface VPC Endpoint (ENI) trong VPC của họ.',
          'Không tiếp xúc với Internet: Toàn bộ lưu lượng truyền tải trực tiếp trên hạ tầng cáp riêng của AWS. Cả hai bên đều không cần Internet Gateway, NAT Gateway hay địa chỉ IP công cộng.',
          'Cho phép trùng dải IP (Overlapping CIDRs): Khác với VPC Peering, PrivateLink hoạt động hoàn hảo ngay cả khi VPC của hai bên có cùng dải mạng CIDR (ví dụ cùng là 10.0.0.0/16).',
          'Ứng dụng tiêu biểu: Các công ty phần mềm SaaS cung cấp API kết nối riêng tư cho doanh nghiệp lớn; các phòng ban trong tập đoàn chia sẻ microservice mà không muốn mở thông toàn bộ mạng VPC của nhau.'
        ],
        isCore: true
      },
      {
        id: 'lec-174',
        number: 174,
        titleEn: 'Direct Connect & Site-to-Site VPN',
        titleVi: 'Direct Connect so với Site-to-Site VPN (Kết nối Doanh nghiệp Hybrid)',
        summaryEn: 'Comprehensive comparison of hybrid connectivity between corporate on-premises data centers and AWS: AWS Site-to-Site VPN (public internet, IPsec encrypted, fast 5-min setup) versus AWS Direct Connect (dedicated physical fiber, 1+ month setup, high bandwidth, private & consistent latency).',
        summaryVi: 'So sánh toàn diện các phương thức kết nối Hybrid giữa trung tâm dữ liệu On-Premises của doanh nghiệp với AWS: AWS Site-to-Site VPN (chạy qua internet công cộng, mã hóa IPsec, thiết lập nhanh trong 5 phút) so với AWS Direct Connect (đường cáp quang vật lý riêng biệt, mất hơn 1 tháng thiết lập, băng thông cực lớn, bảo mật và độ trễ ổn định tuyệt đối).',
        table: {
          headers: ['Tiêu chuẩn đánh giá', 'AWS Site-to-Site VPN', 'AWS Direct Connect (DX)', 'Mẹo quyết định trong đề thi CLF-C02'],
          rows: [
            ['Môi trường truyền dẫn (Medium)', 'Chạy qua INTERNET CÔNG CỘNG (Public Internet) thông qua đường hầm mã hóa IPsec', 'ĐƯỜNG CÁP QUANG VẬT LÝ RIÊNG BIỆT (Dedicated private physical fiber connection)', 'VPN đi qua internet; Direct Connect là đường dây cáp quang vật lý riêng cắm trực tiếp'],
            ['Thời gian thiết lập (Setup Time)', 'CỰC NHANH: Chỉ mất vài phút đến vài chục phút để cấu hình', 'LÂU: Mất từ 1 tháng trở lên (phải phối hợp kéo cáp với đối tác viễn thông và AWS)', 'Cần kết nối gấp trong ngày -> CHẮN CHẮN CHỌN Site-to-Site VPN'],
            ['Độ bảo mật & Mã hóa', 'Dữ liệu được MÃ HÓA MẶC ĐỊNH (IPsec encryption) khi đi qua Internet', 'Đường truyền RIÊNG TƯ hoàn toàn (Không qua internet). Mặc định KHÔNG MÃ HÓA (muốn mã hóa phải chạy thêm VPN trên nền DX)', 'Direct Connect an toàn nhờ đường truyền vật lý riêng biệt'],
            ['Băng thông & Độ trễ', 'Phụ thuộc vào chất lượng mạng Internet công cộng; băng thông giới hạn (tối đa 1.25 Gbps/tunnel), độ trễ biến động', 'Băng thông cực cao (1 Gbps, 10 Gbps, 100 Gbps), độ trễ cực thấp và ổn định 100%', 'Cần truyền tải hàng trăm Terabyte dữ liệu ổn định liên tục -> CHỌN Direct Connect'],
            ['Thành phần kiến trúc cần có', 'Customer Gateway (CGW) ở phía On-premise + Virtual Private Gateway (VGW) ở phía AWS', 'Cổng Direct Connect Location + Cáp Cross-connect tại Data Center đối tác', 'Thấy cặp từ khóa CGW + VGW -> Nghĩ ngay tới Site-to-Site VPN'],
            ['Phương án kết hợp tối ưu', 'Có thể dùng Site-to-Site VPN làm ĐƯỜNG KẾT NỐI DỰ PHÒNG (Backup failover) cho Direct Connect khi gặp sự cố cáp', '', 'Mô hình chuẩn doanh nghiệp: Direct Connect làm đường chính, Site-to-Site VPN làm đường dự phòng giá rẻ']
          ]
        },
        keyPointsEn: [
          'Hybrid Cloud connectivity: Connecting corporate on-premises data centers to AWS Virtual Private Clouds.',
          'AWS Site-to-Site VPN: Established over the public internet using IPsec encrypted tunnels. Highly cost-effective and takes only minutes to configure.',
          'VPN Architecture Components: Requires a Customer Gateway (CGW) on the on-premises side (physical appliance or software) and a Virtual Private Gateway (VGW) on the AWS side (attached to the VPC).',
          'AWS Direct Connect (DX): A physical, dedicated private connection from your corporate data center directly into an AWS Direct Connect Location. Bypasses the public internet entirely.',
          'Direct Connect Characteristics: High throughput (1 Gbps, 10 Gbps, 100 Gbps), ultra-consistent network latency, maximum privacy. Requires 1+ month to provision through telecom partners and has high upfront/fixed costs.',
          'Direct Connect Encryption Caveat: Direct Connect traffic is private, but NOT encrypted by default. To encrypt Direct Connect traffic, you can overlay an AWS Site-to-Site VPN on top of Direct Connect.',
          'EXAM DECISION MATRIX: Fast setup / low cost / over the internet -> Site-to-Site VPN. Consistent latency / massive data transfer / dedicated private line -> Direct Connect. Backup for Direct Connect -> Site-to-Site VPN.'
        ],
        keyPointsVi: [
          'Kết nối Hybrid Cloud: Đấu nối trung tâm dữ liệu on-premise của công ty với đám mây AWS VPC.',
          'AWS Site-to-Site VPN: Thiết lập qua đường truyền Internet công cộng bằng giao thức mã hóa IPsec an toàn. Chi phí thấp và thiết lập cực nhanh chỉ trong vài phút.',
          'Các thành phần của Site-to-Site VPN: Cần có Customer Gateway (CGW) đặt ở phía văn phòng/data center khách hàng và Virtual Private Gateway (VGW) gắn vào VPC phía AWS.',
          'AWS Direct Connect (DX): Đường truyền cáp vật lý riêng biệt chuyên dụng nối thẳng từ trung tâm dữ liệu công ty tới trạm AWS Direct Connect Location. Hoàn toàn không đi qua internet công cộng.',
          'Đặc tính của Direct Connect: Băng thông cực lớn (1 Gbps, 10 Gbps, 100 Gbps), độ trễ mạng ổn định tuyệt đối và có thể dự đoán trước. Cần hơn 1 tháng để triển khai kéo cáp và có chi phí định kỳ cao.',
          'Lưu ý về mã hóa Direct Connect: Đường truyền DX là riêng tư nhưng mặc định KHÔNG MÃ HÓA. Nếu doanh nghiệp yêu cầu mã hóa dữ liệu nghiêm ngặt trên đường truyền, ta có thể chạy một đường hầm IPsec VPN chồng lên trên nền Direct Connect.',
          'MA TRẬN QUYẾT ĐỊNH ĐỀ THI: Cần thiết lập nhanh / chi phí thấp / đi qua internet -> Chọn Site-to-Site VPN. Cần băng thông khổng lồ / độ trễ ổn định / đường dây riêng chuyên dụng -> Chọn Direct Connect. Cần phương án dự phòng chi phí rẻ cho Direct Connect -> Chọn Site-to-Site VPN.'
        ],
        isCore: true
      },
      {
        id: 'lec-175',
        number: 175,
        titleEn: 'AWS Client VPN',
        titleVi: 'AWS Client VPN (Máy tính Cá nhân Kết nối vào VPC)',
        summaryEn: 'Managed client-based VPN service allowing individual remote employees and developers to securely connect their laptops and mobile devices directly into AWS VPC private subnets using OpenVPN over the internet.',
        summaryVi: 'Dịch vụ VPN dành cho người dùng cuối (máy trạm khách) được AWS quản lý toàn diện, cho phép nhân viên làm việc từ xa hoặc lập trình viên kết nối máy tính cá nhân vào các subnet riêng tư của VPC một cách an toàn thông qua giao thức OpenVPN qua Internet.',
        table: {
          headers: ['Giải pháp kết nối người dùng', 'Đối tượng & Thiết bị kết nối', 'Phương thức bảo mật & Giao thức', 'Tình huống sử dụng thực tế'],
          rows: [
            ['AWS Client VPN', 'Máy tính xách tay (Laptop), PC cá nhân của từng nhân viên làm việc từ xa', 'Dùng phần mềm OpenVPN Client, mã hóa TLS qua Internet công cộng; xác thực qua Active Directory, SAML 2.0 hoặc Certificate', 'Lập trình viên làm việc tại nhà (Work from Home) cần truy cập trực tiếp vào máy chủ EC2 hoặc cơ sở dữ liệu RDS bằng Private IP'],
            ['AWS Site-to-Site VPN', 'Toàn bộ mạng chi nhánh văn phòng hoặc Data Center (Router-to-Router)', 'Thiết bị mạng phần cứng Customer Gateway kết nối với Virtual Private Gateway qua IPsec', 'Kết nối toàn bộ chi nhánh văn phòng trụ sở với đám mây AWS để mọi máy tính trong mạng văn phòng tự động thông mạng'],
            ['EC2 Bastion Host', 'Một máy chủ EC2 đặt trong Public Subnet làm bàn đạp SSH/RDP', 'Mở cổng SSH (22) hoặc RDP (3389) từ IP cố định của quản trị viên', 'Giải pháp tạm thời để quản trị máy chủ Linux/Windows; hiện nay AWS khuyến khích dùng AWS Systems Manager Session Manager thay thế']
          ]
        },
        keyPointsEn: [
          'What is AWS Client VPN: A fully managed, client-based VPN service that enables individual users to securely access resources in AWS and their on-premises network from anywhere.',
          'Device-to-Network connection: Unlike Site-to-Site VPN (network-to-network), Client VPN connects individual laptops, mobile devices, and home computers.',
          'Protocol and Clients: Uses the standard OpenVPN protocol. Users install the AWS Client VPN desktop app or any compatible OpenVPN client application.',
          'Authentication mechanisms: Supports Active Directory, federated authentication via SAML 2.0 (Okta, Azure AD), or mutual certificate-based authentication.',
          'Exam scenario: "Remote developers working from home need secure private access to test databases running on EC2 private IPs inside an AWS VPC" -> The ideal solution is AWS Client VPN.'
        ],
        keyPointsVi: [
          'AWS Client VPN là gì: Là dịch vụ VPN quản lý hoàn toàn cho người dùng cuối, cho phép từng cá nhân truy cập an toàn vào tài nguyên trong AWS VPC và mạng nội bộ công ty từ bất kỳ đâu.',
          'Kết nối Thiết bị - tới - Mạng (Device-to-Network): Khác với Site-to-Site VPN là kết nối Mạng - tới - Mạng (Network-to-Network), Client VPN phục vụ cho từng máy tính cá nhân của nhân viên làm việc từ xa.',
          'Giao thức và Ứng dụng: Sử dụng giao thức OpenVPN tiêu chuẩn. Người dùng cài đặt ứng dụng AWS Client VPN hoặc bất kỳ ứng dụng OpenVPN Client nào.',
          'Cơ chế xác thực linh hoạt: Hỗ trợ xác thực qua Microsoft Active Directory, liên kết định danh SAML 2.0 (như Okta, Azure AD), hoặc chứng chỉ số (Mutual Certificate Authentication).',
          'Tình huống đề thi: "Các kỹ sư làm việc từ xa tại nhà cần truy cập trực tiếp vào cơ sở dữ liệu thử nghiệm có IP private trong VPC" -> Giải pháp chính xác là AWS Client VPN.'
        ]
      },
      {
        id: 'lec-176',
        number: 176,
        titleEn: 'Transit Gateway Overview',
        titleVi: 'Tổng quan AWS Transit Gateway (Mô hình Mạng Hình Sao Hub-and-Spoke)',
        summaryEn: 'Hub-and-spoke star network topology connecting thousands of VPCs and on-premises networks together via a single central gateway. Eliminates complex mesh VPC Peering and supports transitive routing.',
        summaryVi: 'Kiến trúc mạng hình sao (Hub-and-Spoke) kết nối hàng nghìn VPC và hạ tầng mạng On-Premises thông qua một cổng trung tâm duy nhất. Xóa bỏ hoàn toàn mạng lưới kết nối chéo phức tạp của VPC Peering và hỗ trợ định tuyến bắc cầu (transitive routing).',
        table: {
          headers: ['Mô hình kiến trúc mạng', 'Cấu trúc đấu nối (Topology)', 'Khả năng bắc cầu (Transitive)', 'Số lượng kết nối & Khả năng mở rộng'],
          rows: [
            ['AWS Transit Gateway', 'Mô hình HÌNH SAO (Hub-and-Spoke): Tất cả VPC, VPN, Direct Connect đều cắm vào 1 Hub trung tâm', 'CÓ HỖ TRỢ BẮC CẦU: VPC A có thể nói chuyện với VPC B xuyên qua Transit Gateway một cách mượt mà', 'Mở rộng lên đến HÀNG NGHÌN VPC và hỗ trợ băng thông lên tới hàng chục Gbps/attachment; hỗ trợ IP Multicast'],
            ['VPC Peering Mesh', 'Mô hình ĐẤU NỐI ĐIỂM - ĐIỂM (Point-to-Point Mesh): Mỗi cặp VPC phải nối riêng 1 đường với nhau', 'KHÔNG BẮC CẦU: A nối B, B nối C thì A không thể nói chuyện với C qua trung gian B', 'Khó quản lý khi quy mô lớn: 10 VPC cần 45 đường nối; 100 VPC cần tới 4.950 đường nối Peering riêng biệt!'],
            ['Direct Connect Gateway', 'Cổng gom kết nối Direct Connect tới nhiều VPC ở các Region khác nhau', 'Không hỗ trợ giao tiếp VPC-to-VPC trực tiếp', 'Chỉ dùng để tối ưu hóa việc định tuyến từ On-premise tới nhiều VPC']
          ]
        },
        keyPointsEn: [
          'The problem with VPC Peering at scale: As companies grow to hundreds or thousands of VPCs across multiple accounts, point-to-point VPC Peering creates a complex "mesh" network with N*(N-1)/2 connections that is nearly impossible to maintain.',
          'Transit Gateway solution: A regional virtual router acting as a central "Hub" in a Hub-and-Spoke architecture. All VPCs, Site-to-Site VPNs, and Direct Connect connections attach directly to the Transit Gateway.',
          'TRANSITIVE ROUTING SUPPORT: Transit Gateway fully supports transitive routing (VPC A -> Transit Gateway -> VPC B works out of the box).',
          'Enormous scalability: Can connect thousands of VPCs and on-premises networks together with centralized routing tables and security policies.',
          'Unique feature: Transit Gateway is the ONLY AWS networking service that supports IP Multicast (one-to-many packet distribution).',
          'THE BIG EXAM KEYWORD: Whenever a question states "connect hundreds or thousands of VPCs in a hub-and-spoke architecture" or "simplify complex VPC peering connections across multiple accounts" -> ALWAYS select AWS Transit Gateway!'
        ],
        keyPointsVi: [
          'Vấn đề của VPC Peering khi mở rộng quy mô: Khi doanh nghiệp phát triển lên hàng trăm hoặc hàng nghìn VPC thuộc nhiều tài khoản, việc dùng VPC Peering điểm-điểm tạo thành một mạng lưới đan chéo ma trận cực kỳ rối rắm (100 VPC cần gần 5.000 đường Peering) và không thể quản lý nổi.',
          'Giải pháp AWS Transit Gateway: Hoạt động như một bộ định tuyến ảo trung tâm (Hub) trong mô hình mạng hình sao (Hub-and-Spoke). Mọi VPC, Site-to-Site VPN và đường truyền Direct Connect chỉ cần cắm 1 đường duy nhất vào Transit Gateway.',
          'HỖ TRỢ ĐỊNH TUYẾN BẮC CẦU (Transitive Routing): Khác với VPC Peering, Transit Gateway cho phép gói tin đi từ VPC A -> xuyên qua Transit Gateway -> tới thẳng VPC B mà không cần nối thêm đường nào khác.',
          'Khả năng mở rộng khổng lồ: Kết nối hàng nghìn VPC và hạ tầng tại chỗ on-premises với nhau, tập trung hóa quản lý bảng định tuyến và chính sách bảo mật.',
          'Tính năng độc nhất vô nhị: Transit Gateway là dịch vụ mạng DUY NHẤT trên AWS hỗ trợ giao thức IP Multicast (truyền phát dữ liệu từ một nguồn tới nhiều đích cùng lúc).',
          'TỪ KHÓA BẮT BÀI ĐỀ THI: Khi đề thi xuất hiện cụm từ "kết nối hàng trăm hoặc hàng nghìn VPC theo mô hình hub-and-spoke" hoặc "đơn giản hóa mạng lưới peering phức tạp giữa nhiều tài khoản" -> ĐÁP ÁN CHÍNH XÁC LUÔN LÀ AWS Transit Gateway!'
        ],
        isCore: true
      },
      {
        id: 'lec-177',
        number: 177,
        titleEn: 'VPC & Networking Summary',
        titleVi: 'Tổng kết Mạng VPC & Ma trận Quyết định Phòng thi CLF-C02',
        summaryEn: 'The definitive AWS Networking cheat sheet and exam decision matrix. Instant service mappings, keyword triggers, and high-frequency exam scenarios across all VPC and connectivity services.',
        summaryVi: 'Bảng tổng hợp kiến thức mạng AWS VPC toàn diện nhất và Ma trận ra quyết định phòng thi CLF-C02. Bắt bài từ khóa, phân biệt các dịch vụ dễ nhầm lẫn và bộ 10 tình huống thực tế thường gặp nhất trong đề thi.',
        table: {
          headers: ['Tình huống câu hỏi trong đề thi CLF-C02', 'Dịch vụ mạng AWS tương ứng', 'Từ khóa nhận diện tức thì (Keywords)', 'Giải thích lý do lựa chọn'],
          rows: [
            ['Máy chủ trong Private Subnet cần tải bản vá lỗi OS từ Internet nhưng chặn Internet gọi vào', 'NAT Gateway', 'Private subnet, outbound internet only, download patches, managed', 'NAT Gateway đặt trong Public Subnet dịch IP riêng ra ngoài tải dữ liệu mà chặn chiều vào'],
            ['Cần chặn một địa chỉ IP độc hại cụ thể đang spam request tới ứng dụng', 'Network ACL (NACL)', 'Block specific IP address, deny rule, subnet firewall', 'Security Group chỉ có luật ALLOW; chỉ có NACL mới hỗ trợ luật DENY để chặn IP đích danh'],
            ['Truy cập riêng tư vào Amazon S3 hoặc DynamoDB với chi phí tối ưu nhất không qua Internet', 'Gateway VPC Endpoint', 'Privately access S3 / DynamoDB, route table target, free of charge', 'Gateway Endpoint chỉ dành riêng cho S3 và DynamoDB, cấu hình qua Route Table và hoàn toàn miễn phí'],
            ['Truy cập riêng tư vào CloudWatch, SNS, SQS, KMS từ bên trong VPC', 'Interface VPC Endpoint (PrivateLink)', 'Privately access AWS services, ENI, private IP address, paid', 'Interface Endpoint tạo card mạng ENI trong subnet và cấp IP riêng cho hầu hết dịch vụ AWS khác'],
            ['Chia sẻ dịch vụ/ứng dụng nội bộ cho hàng nghìn VPC khách hàng an toàn không sợ trùng IP', 'AWS PrivateLink', 'Expose service to customer VPCs, overlapping CIDR, NLB', 'PrivateLink chia sẻ dịch vụ qua NLB và Interface Endpoint mà không cần Peering hay mở Internet'],
            ['Đấu nối 2 VPC với nhau trực tiếp qua đường truyền ngầm của AWS', 'VPC Peering', 'Connect 2 VPCs privately, non-transitive, non-overlapping CIDR', 'Kết nối ngang hàng 2 VPC; lưu ý CIDR không được trùng nhau và không có tính chất bắc cầu'],
            ['Kết nối Data Center công ty với AWS trong vòng 15 phút với chi phí thấp', 'AWS Site-to-Site VPN', 'Quick setup, IPsec, encrypted over public internet, low cost', 'Site-to-Site VPN chạy qua internet công cộng, mã hóa IPsec, thiết lập cực nhanh chỉ vài phút'],
            ['Đường truyền vật lý riêng biệt băng thông 10 Gbps, độ trễ ổn định, bảo mật cao nối Data Center', 'AWS Direct Connect (DX)', 'Dedicated physical fiber, bypass public internet, consistent latency', 'Direct Connect là cáp quang vật lý riêng cắm thẳng vào AWS, mất hơn 1 tháng thiết lập'],
            ['Kỹ sư làm việc từ xa tại nhà cần kết nối laptop cá nhân vào các máy chủ trong VPC', 'AWS Client VPN', 'Remote workers, laptops from home, OpenVPN client, private IP', 'Client VPN cấp quyền truy cập cho từng thiết bị cá nhân qua giao thức OpenVPN'],
            ['Kết nối hàng trăm/hàng nghìn VPC và On-premises theo mô hình mạng hình sao', 'AWS Transit Gateway', 'Hundreds/thousands of VPCs, hub-and-spoke, transitive routing', 'Transit Gateway là bộ định tuyến trung tâm Hub-and-Spoke giải quyết bài toán mạng lớn']
          ]
        },
        keyPointsEn: [
          'Master Networking Cheat Sheet: VPC = Regional isolated network. Subnet = AZ-scoped partition. Route Table = Traffic directions. IGW = Bidirectional internet for public subnets. NAT Gateway = Outbound-only internet for private subnets (lives in public subnet).',
          '5 Reserved IPs Rule: In every subnet, .0, .1, .2, .3, and .255 are reserved by AWS. Total usable IPs in a /24 subnet is 256 - 5 = 251.',
          'Firewalls: Security Group (instance level, stateful, allow only, can reference other SGs) vs NACL (subnet level, stateless, allow & deny, numbered rules, used to block malicious IPs).',
          'Flow Logs: Captures IP traffic (ACCEPT/REJECT) at VPC/Subnet/ENI level, exports to S3, CloudWatch Logs, or Firehose.',
          'VPC Peering: Connects 2 VPCs privately. Non-transitive, non-overlapping CIDRs.',
          'VPC Endpoints: Gateway Endpoint (S3 & DynamoDB only, free, route table) vs Interface Endpoint (PrivateLink, ENI, paid, all other AWS services).',
          'Hybrid Connectivity: Site-to-Site VPN (public internet, fast setup, IPsec encrypted) vs Direct Connect (dedicated physical fiber, 1+ month, high bandwidth, consistent latency) vs Client VPN (remote laptops to VPC via OpenVPN).',
          'Transit Gateway: Star hub-and-spoke network connecting thousands of VPCs and on-premise networks with transitive routing.'
        ],
        keyPointsVi: [
          'Bảng tóm tắt siêu tốc Mạng AWS: VPC = Mạng riêng ảo theo Region. Subnet = Phân đoạn mạng theo từng AZ. Route Table = Bảng chỉ đường lưu lượng. IGW = Cổng Internet 2 chiều cho Public Subnet. NAT Gateway = Cổng Internet 1 chiều ra cho Private Subnet (phải đặt trong Public Subnet).',
          'Quy tắc 5 IP bảo lưu: Trong mọi subnet, 5 địa chỉ .0, .1, .2, .3 và .255 luôn bị AWS giữ lại. Số IP khả dụng trong dải /24 là 256 - 5 = 251 IP.',
          'Tường lửa 2 lớp: Security Group (mức instance, stateful, chỉ allow, tham chiếu được SG khác) vs NACL (mức subnet, stateless, hỗ trợ cả allow và deny, đánh số thứ tự, dùng để chặn đích danh IP độc hại).',
          'Flow Logs: Ghi lại lưu lượng IP (ACCEPT/REJECT) ở mức VPC/Subnet/ENI, xuất sang S3, CloudWatch Logs hoặc Firehose.',
          'VPC Peering: Nối riêng tư 2 VPC với nhau. Không bắc cầu, không cho phép trùng dải IP CIDR.',
          'VPC Endpoints: Gateway Endpoint (chỉ cho S3 và DynamoDB, miễn phí, cấu hình qua Route Table) vs Interface Endpoint (PrivateLink, cấp ENI có IP riêng, tính phí, cho các dịch vụ khác).',
          'Kết nối Hybrid: Site-to-Site VPN (qua internet công cộng, thiết lập 5 phút, mã hóa IPsec) vs Direct Connect (cáp quang vật lý riêng, hơn 1 tháng thiết lập, băng thông lớn, độ trễ ổn định) vs Client VPN (máy tính cá nhân làm việc từ xa kết nối vào VPC qua OpenVPN).',
          'Transit Gateway: Mô hình mạng hình sao Hub-and-Spoke kết nối hàng nghìn VPC và hạ tầng On-premise hỗ trợ định tuyến bắc cầu.'
        ],
        isCore: true
      }
    ]
  },
  section16Data,
  section17Data,
  section18Data
];
