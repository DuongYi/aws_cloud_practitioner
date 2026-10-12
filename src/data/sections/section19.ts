import { SectionItem } from '../../types';

export const section19Data: SectionItem = {
  id: 'section-19',
  sectionNumber: 19,
  titleEn: 'Advanced Identity: STS, Cognito, Directory Services & IAM Identity Center (AWS SSO)',
  titleVi: 'Danh tính Nâng cao: AWS STS, Amazon Cognito, AWS Directory Services & IAM Identity Center (AWS SSO)',
  domain: 'Domain 2: Security and Compliance',
  weightPercentage: '30%',
  badge: 'Security Core (30% Exam)',
  overviewEn: 'Section 19 dives into advanced identity, federation, and access management services tested under Domain 2 (Security and Compliance, representing 30% of the CLF-C02 exam). While basic IAM handles internal users within a single AWS account, modern enterprise architectures require scalable identity strategies. Master AWS Security Token Service (STS) for issuing temporary, limited-privilege credentials (AssumeRole API, session tokens, cross-account access, and automated EC2 instance role credential rotation); Amazon Cognito for customer-facing mobile and web applications (Cognito User Pools for user directories and social sign-in with Google/Facebook vs Cognito Identity Pools for exchanging tokens for temporary AWS credentials); AWS Directory Services for seamless integration with Microsoft Active Directory (AWS Managed Microsoft AD with forest trust, AD Connector proxy gateway, and Samba 4-powered Simple AD); and AWS IAM Identity Center (formerly AWS Single Sign-On / AWS SSO) for workforce single sign-on across multi-account AWS Organizations and SaaS business applications via centralized Permission Sets and the AWS Access Portal.',
  overviewVi: 'Section 19 đi sâu vào các dịch vụ quản lý danh tính nâng cao, liên kết danh tính (identity federation) và kiểm soát truy cập trong Domain 2 (Bảo mật và Tuân thủ - chiếm tỷ trọng áp đảo 30% toàn bài thi CLF-C02). Nếu như IAM cơ bản chỉ quản lý người dùng nội bộ trong 1 tài khoản đơn lẻ, thì kiến trúc doanh nghiệp hiện đại đòi hỏi các giải pháp danh tính quy mô lớn hơn nhiều. Nắm vững AWS Security Token Service (STS) cấp thông tin xác thực tạm thời với quyền hạn giới hạn (API AssumeRole, token phiên, truy cập chéo tài khoản và cơ chế tự động xoay vòng khóa bí mật cho EC2 instance role); Amazon Cognito chuyên biệt cho khách hàng sử dụng ứng dụng web và di động (Cognito User Pools làm danh bạ người dùng hỗ trợ đăng nhập Google/Facebook vs Cognito Identity Pools đổi token lấy quyền AWS truy cập trực tiếp S3/DynamoDB); AWS Directory Services giúp tích hợp liền mạch với Microsoft Active Directory (AWS Managed Microsoft AD có quan hệ tin cậy Forest Trust, AD Connector làm cổng chuyển tiếp proxy, và Simple AD chạy Samba 4); cùng AWS IAM Identity Center (tiền thân là AWS Single Sign-On / AWS SSO) cung cấp giải pháp Đăng nhập Một lần (SSO) cho nhân viên truy cập hàng trăm tài khoản AWS trong AWS Organization và ứng dụng SaaS thông qua cổng AWS Access Portal và các bộ quyền Permission Sets.',
  quickExamFacts: [
    {
      en: 'AWS STS (Security Token Service): Generates temporary, short-lived security credentials (access key ID starting with ASIA, secret access key, session token) with configurable lifetime (15 mins to 36 hours). Used by AssumeRole API, cross-account delegation, federated identity logins, and automatically rotated behind the scenes by EC2 instance roles and Lambda execution roles.',
      vi: 'AWS STS (Security Token Service): Cấp phát thông tin bảo mật TẠM THỜI, có thời hạn ngắn (access key ID bắt đầu bằng ký tự ASIA, secret access key, session token) với thời gian hết hạn tùy chỉnh từ 15 phút đến 36 giờ. Được dùng bởi API AssumeRole, ủy quyền chéo tài khoản (cross-account), đăng nhập liên kết và tự động xoay vòng ngầm cho EC2 instance role và AWS Lambda.',
      isCoreHighlight: true
    },
    {
      en: 'Cognito vs IAM Golden Rule: IAM Users are ONLY for internal company employees who access AWS directly. NEVER create IAM users for mobile app or web app customers! For customer-facing applications with thousands or millions of users, ALWAYS use Amazon Cognito.',
      vi: 'Quy tắc vàng phân biệt Cognito vs IAM: IAM User CHỈ DÀNH RIÊNG cho nhân viên, kỹ sư nội bộ công ty truy cập vào AWS. TUYỆT ĐỐI KHÔNG BAO GIỜ tạo IAM user cho khách hàng sử dụng app di động hoặc web! Với ứng dụng có hàng trăm nghìn hoặc hàng triệu người dùng bên ngoài, BẮT BUỘC dùng Amazon Cognito.',
      isCoreHighlight: true
    },
    {
      en: 'Cognito User Pools (CUP) vs Identity Pools: User Pools provide AUTHENTICATION (Who are you? Sign-up, sign-in, password reset, MFA, social login with Google/Facebook/Apple, returns JWT tokens). Identity Pools provide AUTHORIZATION (What AWS resources can you access? Exchanges tokens or guest logins for temporary AWS credentials via STS to access S3/DynamoDB directly).',
      vi: 'Cognito User Pools (CUP) vs Identity Pools: User Pools phục vụ XÁC THỰC (Authentication - Bạn là ai? Đăng ký, đăng nhập, quên mật khẩu, MFA, đăng nhập bằng Google/Facebook/Apple, trả về JWT token). Identity Pools phục vụ PHÂN QUYỀN (Authorization - Bạn được làm gì trên AWS? Đổi token hoặc phiên khách vãng lai lấy thông tin bảo mật AWS tạm thời từ STS để truy cập trực tiếp S3/DynamoDB).',
      isCoreHighlight: true
    },
    {
      en: 'AWS Directory Services Keyword Trigger: Whenever an exam question mentions "Microsoft Active Directory" or "on-premises AD integration", think AWS Directory Services immediately! Options include AWS Managed Microsoft AD (real Windows AD with trust relationship to on-prem AD), AD Connector (proxy gateway redirecting queries to on-prem AD), and Simple AD (Samba 4 low-cost Linux directory).',
      vi: 'Từ khóa phản xạ đề thi về AWS Directory Services: Cứ khi nào đề thi nhắc tới "Microsoft Active Directory" hoặc "tích hợp AD tại chỗ (on-premises AD)", hãy nghĩ ngay tới AWS Directory Services! Gồm có: AWS Managed Microsoft AD (AD Windows thật có liên kết tin cậy Forest Trust), AD Connector (cổng proxy chuyển tiếp truy vấn về AD tại chỗ), và Simple AD (danh bạ giá rẻ chạy Samba 4 trên Linux).',
      isCoreHighlight: true
    },
    {
      en: 'AWS IAM Identity Center (formerly AWS Single Sign-On / AWS SSO): Provides a single login portal (AWS Access Portal) for workforce users to access multiple AWS accounts within an AWS Organization and SaaS business applications (Salesforce, Microsoft 365, Box). Administrators centrally assign permissions using Permission Sets across accounts without creating separate IAM users per account.',
      vi: 'AWS IAM Identity Center (tên cũ AWS Single Sign-On / AWS SSO): Cung cấp một cổng đăng nhập duy nhất (AWS Access Portal) cho nhân viên truy cập vào nhiều tài khoản AWS trong AWS Organization và các ứng dụng SaaS doanh nghiệp (Salesforce, Microsoft 365, Box). Quản trị viên phân quyền tập trung bằng các bộ quyền Permission Sets xuyên tài khoản mà không cần tạo IAM user riêng ở từng tài khoản.',
      isCoreHighlight: true
    },
    {
      en: 'IAM Identity Center Identity Sources: Supports three identity backends: (1) Built-in Identity Center directory store; (2) AWS Directory Service (Microsoft Active Directory); (3) External Identity Providers (IdP) via SAML 2.0 (Okta, Microsoft Entra ID / Azure AD, Ping Identity, Google Workspace).',
      vi: 'Kho nguồn danh tính cho IAM Identity Center: Hỗ trợ 3 nguồn định danh: (1) Kho lưu trữ danh tính nội bộ có sẵn của Identity Center; (2) AWS Directory Service (Microsoft Active Directory); (3) Các nhà cung cấp danh tính bên ngoài (External IdP) qua chuẩn SAML 2.0 (Okta, Microsoft Entra ID / Azure AD, Ping Identity, Google Workspace).',
      isCoreHighlight: true
    }
  ],
  lectures: [
    {
      id: 'lec-229',
      number: 229,
      titleEn: 'AWS Security Token Service (STS) Overview',
      titleVi: 'Tổng quan AWS Security Token Service (STS) - Thông tin Xác thực Tạm thời',
      duration: '9m',
      summaryEn: 'Deep dive into AWS Security Token Service (STS), a core web service that enables requesting temporary, limited-privilege credentials for AWS IAM users, federated enterprise users, and cross-account access delegation. Understand temporary credential anatomy, AssumeRole API mechanics, expiration policies, and automated role rotation for EC2 instances.',
      summaryVi: 'Đi sâu vào AWS Security Token Service (STS) - dịch vụ web cốt lõi cho phép tạo và cấp phát thông tin bảo mật tạm thời với quyền hạn giới hạn cho IAM User, người dùng liên kết doanh nghiệp và cơ chế ủy quyền truy cập chéo tài khoản. Hiểu rõ cấu trúc bộ khóa tạm thời, nguyên lý hoạt động của API AssumeRole, thời hạn hết hạn và cơ chế tự động xoay vòng khóa cho EC2 Instance Role.',
      keyPointsEn: [
        'Definition & Purpose: AWS STS is a global web service that issues short-lived temporary security credentials to authenticate and authorize requests to AWS APIs and services.',
        'Anatomy of STS Credentials: STS returns 3 components: (1) Access Key ID (starts with "ASIA" prefix to distinguish from permanent "AKIA" keys); (2) Secret Access Key; (3) Session Token (security token header required in every API request); plus an Expiration timestamp.',
        'Configurable Expiration: Credentials are valid for a specified duration ranging from 15 minutes up to 36 hours (default is usually 1 hour). Once expired, they cannot be used or renewed; a new request must be made.',
        'Primary STS APIs: (1) AssumeRole: Assumes an IAM role within the same account or another AWS account; (2) AssumeRoleWithSAML: Authenticates enterprise users via SAML 2.0 (Active Directory, Ping); (3) AssumeRoleWithWebIdentity: Authenticates mobile/web users via OAuth/OIDC IdPs (Amazon, Google, Facebook, Cognito); (4) GetSessionToken: Generates temporary keys for IAM users (often required when MFA is enforced).',
        'Cross-Account Access Delegation: Instead of sharing permanent access keys or creating separate IAM users in multiple accounts, Account A creates an IAM Role trusting Account B. Authorized users in Account B call sts:AssumeRole to obtain temporary credentials to manage Account A safely.',
        'Behind the Scenes of EC2 & Lambda Roles: When an IAM role is attached to an EC2 instance or Lambda function, the AWS SDK and Instance Metadata Service (IMDS at 169.254.169.254) automatically invoke STS under the hood to fetch and rotate temporary credentials every few hours. No hardcoded secrets on disks or code repositories!',
        'Exam Rule: "Temporary, limited-privilege credentials", "AssumeRole", "session token", or "short-lived access" -> AWS STS is the correct answer.'
      ],
      keyPointsVi: [
        'Định nghĩa & Mục đích: AWS STS là dịch vụ toàn cầu cấp phát thông tin bảo mật tạm thời có thời hạn ngắn để xác thực và phân quyền các yêu cầu gọi API tới tài nguyên AWS.',
        'Cấu trúc bộ khóa STS: STS trả về 3 thành phần: (1) Access Key ID (bắt đầu bằng tiền tố "ASIA" để phân biệt với khóa dài hạn bắt đầu bằng "AKIA"); (2) Secret Access Key; (3) Session Token (chuỗi mã bảo mật phiên bắt buộc gửi kèm trong HTTP header của mỗi lệnh gọi API); cùng thời gian hết hạn (Expiration).',
        'Thời hạn hết hạn cấu hình linh hoạt: Thông tin xác thực có hiệu lực từ tối thiểu 15 phút đến tối đa 36 giờ (mặc định thường là 1 giờ). Khi hết hạn, bộ khóa sẽ bị hủy vĩnh viễn và không thể tái sử dụng; ứng dụng phải yêu cầu cấp bộ khóa mới.',
        'Các API trọng tâm của STS: (1) AssumeRole: Đảm nhận một IAM Role trong cùng tài khoản hoặc khác tài khoản (Cross-account); (2) AssumeRoleWithSAML: Xác thực người dùng doanh nghiệp qua giao thức SAML 2.0 (Active Directory, Ping); (3) AssumeRoleWithWebIdentity: Xác thực người dùng web/mobile qua mạng xã hội (Google, Facebook, Cognito); (4) GetSessionToken: Cấp khóa tạm cho IAM User khi bắt buộc xác thực đa yếu tố MFA.',
        'Ủy quyền truy cập chéo tài khoản (Cross-Account): Thay vì chia sẻ Access Key dài hạn nguy hiểm hoặc tạo IAM User trùng lặp ở nhiều tài khoản, Tài khoản A tạo một IAM Role tin cậy Tài khoản B. Kỹ sư hoặc tiến trình tự động ở Tài khoản B gọi API sts:AssumeRole để nhận bộ khóa tạm thời quản trị Tài khoản A an toàn.',
        'Cơ chế ngầm của EC2 Instance Role & AWS Lambda: Khi bạn gán IAM Role cho EC2 hoặc hàm Lambda, AWS SDK kết hợp cùng Dịch vụ Dữ liệu Máy chủ (IMDS tại 169.254.169.254) sẽ tự động gọi STS định kỳ để lấy và xoay vòng khóa mới sau mỗi vài giờ. Không bao giờ phải lưu cứng khóa bí mật trong mã nguồn hay ổ đĩa!',
        'Quy tắc thi phản xạ: Thấy cụm từ "thông tin xác thực tạm thời (temporary credentials)", "quyền hạn giới hạn (limited-privilege)", "AssumeRole", "session token" hoặc "truy cập chéo tài khoản an toàn" -> Chọn ngay AWS STS.'
      ],
      examTipsEn: [
        'Remember that STS keys always start with ASIA (Access key Starting with I and A) whereas permanent IAM user keys start with AKIA.',
        'STS credentials CANNOT be renewed manually after expiration; applications must request new ones using AssumeRole.',
        'EC2 instance metadata service (IMDSv2) delivers STS credentials to running applications automatically without storing credentials anywhere on disk.'
      ],
      examTipsVi: [
        'Ghi nhớ: Khóa tạm thời do STS cấp luôn bắt đầu bằng ASIA, trong khi khóa dài hạn của IAM User bắt đầu bằng AKIA.',
        'Khóa STS KHÔNG THỂ gia hạn thủ công khi đã hết hạn; ứng dụng phải gửi một yêu cầu AssumeRole mới để lấy bộ khóa tiếp theo.',
        'Dịch vụ máy chủ ảo EC2 và Lambda nhận khóa STS hoàn toàn tự động qua Instance Metadata (IMDSv2) mà không lưu trữ bất kỳ tệp mật khẩu nào trên ổ cứng.'
      ],
      isCore: true,
      table: {
        headers: ['Đặc điểm so sánh', 'Khóa dài hạn (IAM Long-term Credentials)', 'Khóa tạm thời (AWS STS Temporary Credentials)'],
        rows: [
          ['Tiền tố Access Key', 'Bắt đầu bằng chữ "AKIA..." (ví dụ AKIAIOSFODNN7EXAMPLE)', 'Bắt đầu bằng chữ "ASIA..." (ví dụ ASIAIOSFODNN7EXAMPLE)'],
          ['Các thành phần trả về', 'Access Key ID và Secret Access Key (2 thành phần)', 'Access Key ID, Secret Access Key VÀ Session Token (3 thành phần)'],
          ['Thời hạn sử dụng', 'Vĩnh viễn cho đến khi bị Admin xóa hoặc xoay vòng thủ công', 'Ngắn hạn, tự hủy sau 15 phút đến tối đa 36 giờ (mặc định 1 giờ)'],
          ['Rủi ro lộ lọt bí mật', 'Cực kỳ nguy hiểm nếu bị đẩy lên GitHub hoặc lộ ra ngoài', 'Rủi ro rất thấp vì khóa sẽ tự động vô hiệu hóa sau thời gian ngắn'],
          ['Tình huống áp dụng', 'IAM User nội bộ chạy CLI trên máy trạm dev cá nhân', 'IAM Role cho EC2/Lambda, truy cập Cross-account, người dùng di động']
        ]
      }
    },
    {
      id: 'lec-230',
      number: 230,
      titleEn: 'Amazon Cognito Overview (User Pools vs Identity Pools)',
      titleVi: 'Tổng quan Amazon Cognito: Danh tính Khách hàng Web & Mobile (User Pools vs Identity Pools)',
      duration: '11m',
      summaryEn: 'Comprehensive breakdown of Amazon Cognito, the AWS customer identity and access management (CIAM) solution built for internet-scale consumer applications. Learn the critical boundary between Cognito User Pools (CUP for authentication, directories, and social login) and Cognito Identity Pools (Federated Identities for authorization and temporary AWS credentials).',
      summaryVi: 'Phân tích toàn diện Amazon Cognito - giải pháp quản lý danh tính và quyền truy cập khách hàng (CIAM) được thiết kế cho các ứng dụng web và di động có quy mô hàng triệu người dùng. Nắm vững ranh giới cốt lõi giữa Cognito User Pools (CUP phục vụ xác thực, lưu danh bạ người dùng và đăng nhập mạng xã hội) và Cognito Identity Pools (Liên kết danh tính cấp quyền AWS và thông tin bảo mật tạm thời).',
      keyPointsEn: [
        'Definition & Scale: Amazon Cognito provides simple and secure sign-up, sign-in, and access control for web and mobile applications, easily scaling to millions of consumer users.',
        'Crucial Distinction from IAM: IAM is strictly for company employees and cloud administrators (dozens or hundreds of users). Amazon Cognito is for application end-users and customers (millions of users). NEVER create IAM users for mobile app customers!',
        'Cognito User Pools (CUP) - Authentication (Who are you?): Acts as an identity directory (user store) for your app. Provides sign-up, sign-in, password recovery, email/SMS verification, and built-in Multi-Factor Authentication (MFA).',
        'Social & Enterprise Federation in User Pools: Seamlessly integrates with third-party Identity Providers including Google, Facebook, Amazon, Apple, as well as enterprise SAML 2.0 and OpenID Connect (OIDC).',
        'Tokens Returned: Successful login returns JSON Web Tokens (JWT: ID Token, Access Token, Refresh Token) that verify user identity to your application backend or Amazon API Gateway.',
        'Cognito Identity Pools (Federated Identities) - Authorization (What can you do?): Exchanges identity tokens (from User Pools or social IdPs) for temporary, limited-privilege AWS credentials (via AWS STS) allowing client apps to access AWS resources directly (e.g., upload photos straight to S3 or write data to DynamoDB).',
        'Guest (Unauthenticated) Access: Identity Pools can grant temporary AWS credentials to guest users who haven’t created an account or logged in yet.',
        'Exam Trigger: "Web or mobile application users", "millions of users", "sign-up and sign-in directory", "social login (Google/Facebook/Apple)", or "upload directly to S3 from mobile app" -> Amazon Cognito.'
      ],
      keyPointsVi: [
        'Định nghĩa & Quy mô: Amazon Cognito cung cấp giải pháp đăng ký, đăng nhập và quản lý quyền truy cập đơn giản, an toàn cho các ứng dụng web và di động, dễ dàng mở rộng phục vụ hàng triệu người dùng người tiêu dùng.',
        'Ranh giới sống còn với IAM: IAM chỉ dành riêng cho nhân viên, kỹ sư và quản trị viên nội bộ của doanh nghiệp (vài chục đến vài trăm người). Amazon Cognito dành riêng cho khách hàng và người dùng cuối của ứng dụng (hàng triệu người). TUYỆT ĐỐI KHÔNG BAO GIỜ tạo IAM user cho khách hàng dùng app di động!',
        'Cognito User Pools (CUP) - Xác thực (Authentication - Bạn là ai?): Đóng vai trò là cơ sở dữ liệu danh bạ người dùng cho ứng dụng. Cung cấp tính năng đăng ký tài khoản, đăng nhập, đặt lại mật khẩu, gửi mã OTP xác thực qua Email/SMS và hỗ trợ xác thực đa yếu tố MFA.',
        'Liên kết mạng xã hội & doanh nghiệp trong User Pools: Hỗ trợ người dùng đăng nhập bằng tài khoản mạng xã hội có sẵn như Google, Facebook, Apple, Amazon, hoặc các kho định danh doanh nghiệp qua SAML 2.0 và OpenID Connect (OIDC).',
        'Mã định danh trả về: Sau khi đăng nhập thành công, User Pools trả về bộ token JWT (ID Token, Access Token, Refresh Token) để ứng dụng gửi lên backend hoặc Amazon API Gateway xác minh danh tính.',
        'Cognito Identity Pools (Liên kết danh tính) - Phân quyền (Authorization - Bạn được làm gì trên AWS?): Đổi token xác thực (từ User Pools hoặc mạng xã hội) lấy thông tin bảo mật AWS tạm thời (thông qua AWS STS) để ứng dụng di động có thể gọi trực tiếp tới tài nguyên AWS (ví dụ: tải ảnh thẳng lên S3 hoặc ghi dữ liệu vào DynamoDB mà không cần đi qua máy chủ trung gian).',
        'Hỗ trợ khách vãng lai (Guest / Unauthenticated User): Identity Pools cho phép cấp quyền AWS tạm thời với quyền hạn tối thiểu cho cả những người dùng chưa tạo tài khoản hoặc chưa đăng nhập.',
        'Từ khóa trúng tủ đề thi: "Người dùng ứng dụng web hoặc di động (web/mobile app users)", "hàng triệu người dùng (millions of users)", "đăng ký và đăng nhập (sign-up/sign-in)", "đăng nhập Google/Facebook", hoặc "tải file trực tiếp lên S3 từ app điện thoại" -> Chọn ngay Amazon Cognito.'
      ],
      examTipsEn: [
        'Exam trick: If a question asks how to manage login for 500,000 mobile app gamers to store their high scores in DynamoDB, the answer is Cognito (User Pool + Identity Pool), NOT creating 500,000 IAM users.',
        'User Pools = User Directory & Sign-in (JWT tokens). Identity Pools = AWS Credentials (IAM permissions to call AWS APIs).'
      ],
      examTipsVi: [
        'Bẫy đề thi: Nếu đề bài hỏi phương án quản lý đăng nhập cho 500.000 game thủ trên điện thoại để lưu điểm số vào DynamoDB, đáp án chính xác là Amazon Cognito, KHÔNG BAO GIỜ chọn tạo 500.000 IAM user.',
        'Ghi nhớ ngắn gọn: User Pools = Danh bạ người dùng & Đăng nhập (trả về JWT token). Identity Pools = Cấp quyền AWS (đổi token lấy khóa STS để gọi API AWS).'
      ],
      isCore: true,
      table: {
        headers: ['Đặc điểm so sánh', 'Cognito User Pools (CUP)', 'Cognito Identity Pools (Federated Identities)'],
        rows: [
          ['Chức năng cốt lõi', 'Xác thực người dùng (Authentication - Who you are)', 'Phân quyền tài nguyên AWS (Authorization - What you can access)'],
          ['Sản phẩm đầu ra', 'Trả về JSON Web Tokens (ID Token, Access Token, Refresh Token)', 'Trả về thông tin bảo mật AWS tạm thời từ STS (Access Key, Secret, Token)'],
          ['Tính năng người dùng', 'Form đăng ký, đăng nhập, quên mật khẩu, xác thực OTP email/SMS, MFA', 'Không có giao diện đăng nhập; chỉ làm cổng hoán đổi token lấy quyền AWS'],
          ['Hỗ trợ người dùng khách', 'Không hỗ trợ (bắt buộc phải có tài khoản đã đăng ký)', 'Hỗ trợ khách vãng lai chưa đăng nhập (Unauthenticated/Guest access)'],
          ['Đích đến của quyền hạn', 'Gửi token lên backend/API Gateway để xác thực phiên làm việc', 'Cho phép app gọi trực tiếp các dịch vụ AWS như S3, DynamoDB, Polly']
        ]
      }
    },
    {
      id: 'lec-231',
      number: 231,
      titleEn: 'AWS Directory Services Overview (Microsoft Active Directory)',
      titleVi: 'Tổng quan AWS Directory Services: Tích hợp Microsoft Active Directory',
      duration: '10m',
      summaryEn: 'Examine AWS Directory Services, the family of managed directory solutions designed to integrate AWS environments with Microsoft Active Directory. Master the three options tested on the CLF-C02 exam: AWS Managed Microsoft AD (full Windows AD with trust relationship to on-premises AD), AD Connector (proxy gateway without local caching), and Simple AD (Samba 4 Linux-based standalone directory).',
      summaryVi: 'Khảo sát AWS Directory Services - nhóm giải pháp dịch vụ thư mục được quản lý giúp kết nối môi trường đám mây AWS với hệ thống Microsoft Active Directory của doanh nghiệp. Nắm vững 3 phiên bản xuất hiện trong đề thi CLF-C02: AWS Managed Microsoft AD (Active Directory chuẩn Windows có liên kết Forest Trust tới máy chủ tại chỗ), AD Connector (cổng proxy chuyển tiếp không lưu trữ tài khoản), và Simple AD (danh bạ độc lập giá rẻ chạy Samba 4 trên Linux).',
      keyPointsEn: [
        'Enterprise Identity Context: Microsoft Active Directory (AD) is the dominant enterprise directory service for Windows environments, centralizing employee accounts, domain joins, Group Policy Objects (GPO), and Kerberos authentication.',
        'What is AWS Directory Service: A managed AWS service that enables cloud workloads (EC2 Windows, Amazon WorkSpaces, Amazon FSx for Windows, Amazon RDS) to use Active Directory credentials and policies.',
        'Option 1 - AWS Managed Microsoft AD: Genuine Microsoft Windows Server Active Directory hosted on AWS infrastructure across multiple Availability Zones. Fully managed with automated backups and OS patching.',
        'Trust Relationships: AWS Managed Microsoft AD supports one-way and two-way Forest Trusts with your on-premises Active Directory. Corporate users can log in to AWS applications using their existing corporate credentials without replicating passwords.',
        'Option 2 - AD Connector: A directory proxy / gateway that directs directory requests (authentication and lookup) directly to your existing on-premises Active Directory without caching or storing user credentials in AWS.',
        'AD Connector Requirements: Requires a network connection (AWS Direct Connect or Site-to-Site VPN) between AWS VPC and on-premises data center. Best when you already have on-prem AD and only need cloud workloads to authenticate against it.',
        'Option 3 - Simple AD: A low-cost, standalone Active Directory-compatible directory powered by Samba 4 on Linux (NOT actual Microsoft Windows Server). Provides basic AD features (domain joins, simple LDAP, Kerberos).',
        'Simple AD Limitations: Does NOT support trust relationships with on-premises AD, does NOT support schema extensions, dynamic DNS updates, or integration with AWS IAM Identity Center.',
        'Exam Rule: "Microsoft Active Directory", "on-premises AD integration", "AD trust relationship", or "domain-join Windows EC2 instances" -> AWS Directory Service.'
      ],
      keyPointsVi: [
        'Bối cảnh danh tính doanh nghiệp: Microsoft Active Directory (AD) là dịch vụ thư mục tiêu chuẩn thống trị trong các doanh nghiệp sử dụng môi trường Windows, giúp quản lý tập trung tài khoản nhân viên, gia nhập miền (domain join), chính sách nhóm (GPO) và xác thực Kerberos.',
        'AWS Directory Service là gì: Dịch vụ đám mây được quản lý toàn diện giúp các ứng dụng và máy chủ AWS (EC2 Windows, Amazon WorkSpaces, Amazon FSx, Amazon RDS) sử dụng tài khoản và chính sách của Active Directory.',
        'Phiên bản 1 - AWS Managed Microsoft AD: Hệ thống Microsoft Windows Server Active Directory thật sự chạy trên hạ tầng AWS qua nhiều Availability Zone. Được AWS quản lý tự động sao lưu, vá lỗi hệ điều hành và giám sát độ sẵn sàng cao.',
        'Quan hệ tin cậy Forest Trust: AWS Managed Microsoft AD hỗ trợ thiết lập liên kết tin cậy một chiều hoặc hai chiều (Trust Relationship) với máy chủ AD tại trung tâm dữ liệu On-premises của doanh nghiệp. Nhân viên dùng luôn tài khoản email công ty để đăng nhập vào ứng dụng trên AWS mà không cần sao chép mật khẩu.',
        'Phiên bản 2 - AD Connector: Đóng vai trò là một cổng chuyển tiếp proxy (gateway) chuyển hướng toàn bộ yêu cầu xác thực trực tiếp về hệ thống Active Directory On-premises hiện có mà KHÔNG lưu trữ, KHÔNG đồng bộ hay lưu bộ nhớ đệm thông tin tài khoản trên AWS.',
        'Yêu cầu của AD Connector: Đòi hỏi phải có kết nối mạng riêng (AWS Direct Connect hoặc AWS Site-to-Site VPN) giữa VPC đám mây và trung tâm dữ liệu on-premise. Thích hợp nhất khi doanh nghiệp muốn giữ nguyên toàn bộ tài khoản tại chỗ và chỉ dùng AWS làm hạ tầng chạy ứng dụng.',
        'Phiên bản 3 - Simple AD: Dịch vụ thư mục độc lập giá rẻ tương thích với Active Directory nhưng chạy bằng phần mềm mã nguồn mở Samba 4 trên Linux (KHÔNG PHẢI Windows Server thật). Cung cấp các tính năng AD cơ bản như gia nhập miền máy ảo Windows, tra cứu LDAP đơn giản.',
        'Hạn chế của Simple AD: KHÔNG hỗ trợ liên kết tin cậy (Trust Relationship) với AD tại chỗ, không mở rộng được Schema, không có MFA nâng cao và không tích hợp được với AWS IAM Identity Center.',
        'Quy tắc phản xạ đề thi: Thấy các từ khóa "Microsoft Active Directory", "tích hợp AD tại chỗ (on-premises AD)", "quan hệ tin cậy (trust relationship)" hoặc "gia nhập miền cho máy chủ EC2 Windows (domain-join)" -> Chọn ngay AWS Directory Service.'
      ],
      examTipsEn: [
        'Exam keyword matching: "Real Microsoft AD in AWS with trust relationship to on-premise" -> AWS Managed Microsoft AD.',
        'Exam keyword matching: "Proxy directory requests to on-premise Active Directory without caching credentials in AWS" -> AD Connector.',
        'Exam keyword matching: "Low-cost standalone Samba 4 AD without on-premise trust" -> Simple AD.'
      ],
      examTipsVi: [
        'Khớp từ khóa đề thi: "Active Directory Windows thật trên AWS có liên kết tin cậy Trust với máy chủ tại chỗ" -> AWS Managed Microsoft AD.',
        'Khớp từ khóa đề thi: "Cổng proxy chuyển tiếp yêu cầu xác thực về AD tại chỗ mà không lưu mật khẩu trên AWS" -> AD Connector.',
        'Khớp từ khóa đề thi: "Danh bạ giá rẻ chạy Samba 4 không có liên kết tin cậy với on-premise" -> Simple AD.'
      ],
      isCore: true,
      table: {
        headers: ['Tiêu chí so sánh', 'AWS Managed Microsoft AD', 'AD Connector (Proxy)', 'Simple AD (Samba 4)'],
        rows: [
          ['Bản chất công nghệ', 'Hệ điều hành Windows Server AD thật do AWS vận hành', 'Cổng Gateway/Proxy chuyển tiếp yêu cầu xác thực', 'Phần mềm Samba 4 tương thích AD chạy trên Linux'],
          ['Nơi lưu trữ tài khoản', 'Lưu trực tiếp trong cụm Domain Controller trên AWS', 'KHÔNG lưu trên AWS; lưu tại Active Directory On-premises', 'Lưu cục bộ trong cụm Samba trên AWS'],
          ['Liên kết tin cậy (Trust)', 'HỖ TRỢ liên kết Forest Trust 1 chiều hoặc 2 chiều với On-prem', 'Không tạo Trust; trực tiếp trỏ về Domain Controller On-prem', 'KHÔNG HỖ TRỢ bất kỳ liên kết tin cậy nào với bên ngoài'],
          ['Yêu cầu kết nối mạng', 'Tùy chọn (chỉ cần VPN/Direct Connect nếu thiết lập Trust)', 'BẮT BUỘC có kết nối Direct Connect hoặc Site-to-Site VPN', 'Chạy độc lập nội bộ trong VPC, không cần kết nối On-prem'],
          ['Tình huống thi CLF-C02', 'Cần AD đầy đủ tính năng trong cloud và liên kết với On-premises', 'Muốn nhân viên dùng tài khoản On-prem đăng nhập không lưu trên cloud', 'Doanh nghiệp nhỏ cần giải pháp AD giá rẻ cơ bản, không có On-prem']
        ]
      }
    },
    {
      id: 'lec-232',
      number: 232,
      titleEn: 'AWS IAM Identity Center (Successor to AWS Single Sign-On / AWS SSO)',
      titleVi: 'AWS IAM Identity Center: Đăng nhập Một lần (SSO) Đa tài khoản & Ứng dụng Doanh nghiệp',
      duration: '10m',
      summaryEn: 'Comprehensive guide to AWS IAM Identity Center (formerly AWS Single Sign-On / AWS SSO), the central hub for enterprise workforce access management. Understand how a single set of corporate credentials grants unified access to hundreds of AWS accounts within an AWS Organization and third-party SaaS cloud applications through the AWS Access Portal and centralized Permission Sets.',
      summaryVi: 'Hướng dẫn toàn diện về AWS IAM Identity Center (tên gọi trước đây là AWS Single Sign-On / AWS SSO) - trung tâm quản lý quyền truy cập cho lực lượng lao động doanh nghiệp. Hiểu rõ cách một bộ thông tin đăng nhập duy nhất mở ra quyền truy cập vào hàng trăm tài khoản AWS trong AWS Organization và các ứng dụng SaaS đám mây thông qua cổng AWS Access Portal và các bộ quyền Permission Sets tập trung.',
      keyPointsEn: [
        'Definition & Name Evolution: AWS IAM Identity Center is the recommended successor to AWS Single Sign-On (AWS SSO). It centralizes workforce authentication and authorization across multiple AWS accounts and business cloud applications.',
        'Pain Point Solved: In an enterprise with 50 AWS accounts and 200 developers, creating individual IAM users in every account requires managing 10,000 sets of credentials! IAM Identity Center eliminates this by providing ONE single login across all organization accounts.',
        'AWS Access Portal: A single, personalized web URL (e.g., https://my-company.awsapps.com/start) where employees log in once. The portal displays interactive tiles for every AWS account, AWS role, and authorized third-party business application.',
        'Permission Sets: Centralized policy templates managed inside Identity Center. Administrators assign permission sets (e.g., ViewOnlyAccess, PowerUserAccess, AdministratorAccess) to specific users or groups across selected AWS accounts. Identity Center automatically provisions the necessary IAM roles inside the target member accounts.',
        'Supported Identity Sources: (1) Built-in Identity Center directory (create and manage users directly); (2) AWS Directory Service (integrate with existing Microsoft Active Directory); (3) External Identity Providers (IdP) via SAML 2.0 (Okta, Microsoft Entra ID / Azure AD, Ping Identity, Google Workspace).',
        'Business Applications Integration: In addition to AWS accounts, supports Single Sign-On into pre-integrated SaaS applications like Salesforce, Microsoft 365, Box, Jira, Slack, and custom SAML 2.0 web applications.',
        'Multi-Factor Authentication (MFA): Supports built-in, context-aware MFA policies (FIDO2 security keys, authenticator apps) enforced at the portal level.',
        'Exam Trigger: "Single Sign-On (SSO)", "access multiple AWS accounts with one login", "centralized portal for AWS accounts and business applications", "formerly AWS Single Sign-On", or "integrate Okta/Azure AD for AWS organization access" -> AWS IAM Identity Center.'
      ],
      keyPointsVi: [
        'Định nghĩa & Lịch sử đổi tên: AWS IAM Identity Center là dịch vụ kế thừa được khuyến nghị của AWS Single Sign-On (AWS SSO). Dịch vụ này tập trung hóa toàn bộ việc xác thực và phân quyền cho nhân viên doanh nghiệp trên quy mô nhiều tài khoản AWS và các ứng dụng đám mây.',
        'Bài toán thực tế được giải quyết: Trong doanh nghiệp có 50 tài khoản AWS và 200 lập trình viên, nếu tạo IAM User riêng rẽ ở từng tài khoản thì người quản trị phải quản lý tới 10.000 bộ tài khoản và mật khẩu! IAM Identity Center xóa bỏ hoàn toàn gánh nặng này bằng cơ chế ĐĂNG NHẬP MỘT LẦN (Single Sign-On) duy nhất.',
        'Cổng truy cập AWS Access Portal: Một đường dẫn web duy nhất (ví dụ: https://cong-ty.awsapps.com/start) để nhân viên đăng nhập. Cổng này hiển thị trực quan danh sách tất cả các tài khoản AWS, vai trò quản trị được cấp quyền và các ứng dụng đám mây doanh nghiệp mà người đó được phép vào.',
        'Bộ quyền Permission Sets: Là các khuôn mẫu chính sách IAM được cấu hình tập trung trong Identity Center. Quản trị viên chỉ cần gắn Permission Set (như ReadOnlyAccess, DevOpsAdmin) cho một nhóm người dùng trên các tài khoản AWS mong muốn. Identity Center sẽ tự động khởi tạo IAM Role tương ứng trong từng tài khoản thành viên.',
        'Nguồn cung cấp danh tính hỗ trợ: (1) Kho danh tính nội bộ có sẵn của Identity Center (quản lý trực tiếp trên giao diện console); (2) AWS Directory Service (kết nối với Microsoft Active Directory); (3) Các nhà cung cấp danh tính bên ngoài (External IdP) qua chuẩn SAML 2.0 (Okta, Microsoft Entra ID / Azure AD, Google Workspace, Ping Identity).',
        'Tích hợp ứng dụng doanh nghiệp SaaS: Ngoài các tài khoản AWS, IAM Identity Center còn hỗ trợ SSO vào các ứng dụng đám mây thông dụng như Salesforce, Microsoft 365, Box, Slack, Jira hoặc bất kỳ ứng dụng web nội bộ nào hỗ trợ giao thức SAML 2.0.',
        'Bảo mật đa yếu tố MFA: Hỗ trợ bắt buộc cài đặt MFA (khóa bảo mật FIDO2, ứng dụng Google Authenticator) ngay tại cổng đăng nhập tập trung, kiểm toán toàn bộ phiên đăng nhập qua AWS CloudTrail.',
        'Từ khóa trúng tủ đề thi: "Đăng nhập một lần (Single Sign-On / SSO)", "truy cập nhiều tài khoản AWS bằng 1 lần đăng nhập (access multiple AWS accounts with one login)", "cổng truy cập tập trung (AWS Access Portal)", "tên cũ AWS Single Sign-On (AWS SSO)", hoặc "kết nối Okta / Azure AD để vào các tài khoản AWS trong Organization" -> Chọn ngay AWS IAM Identity Center.'
      ],
      examTipsEn: [
        'Remember that AWS SSO was renamed to AWS IAM Identity Center, but both names refer to the exact same service and can appear interchangeably on exam questions.',
        'IAM is per-account. IAM Identity Center is multi-account organization-wide SSO.',
        'Permission Sets in Identity Center define what users can do in member accounts without having to manually log into those member accounts to configure IAM policies.'
      ],
      examTipsVi: [
        'Ghi nhớ: AWS Single Sign-On (AWS SSO) đã được đổi tên thành AWS IAM Identity Center, nhưng đề thi CLF-C02 có thể dùng cả hai tên này thay thế cho nhau.',
        'IAM thông thường áp dụng cho từng tài khoản đơn lẻ. IAM Identity Center là giải pháp SSO đa tài khoản trên toàn tổ chức AWS Organization.',
        'Bộ quyền Permission Sets trong Identity Center cho phép định nghĩa quyền hạn tập trung từ tài khoản quản lý mà không cần phải đăng nhập thủ công vào từng tài khoản con để cấu hình.'
      ],
      isCore: true,
      table: {
        headers: ['Đặc điểm so sánh', 'Quản trị IAM truyền thống (Single-Account)', 'AWS IAM Identity Center (AWS SSO)'],
        rows: [
          ['Phạm vi quản lý', 'Cục bộ trong 1 tài khoản AWS duy nhất', 'Toàn bộ các tài khoản trong AWS Organization & ứng dụng SaaS'],
          ['Số lượng tài khoản đăng nhập', 'Mỗi tài khoản AWS yêu cầu 1 IAM User và 1 mật khẩu riêng', '1 tài khoản đăng nhập duy nhất cho tất cả các tài khoản AWS'],
          ['Cổng truy cập tập trung', 'Không có (phải nhớ từng URL đăng nhập riêng của từng tài khoản)', 'Có cổng web duy nhất (AWS Access Portal) hiển thị đầy đủ tài khoản'],
          ['Cơ chế phân quyền', 'Gắn trực tiếp IAM Policy vào từng User/Group trong từng tài khoản', 'Quản trị tập trung bằng các bộ quyền Permission Sets xuyên tài khoản'],
          ['Tích hợp nhà cung cấp ngoài', 'Cấu hình Identity Provider SAML riêng rẽ ở từng tài khoản AWS', 'Cấu hình kết nối 1 lần duy nhất với Okta / Azure AD cho toàn tổ chức']
        ]
      }
    },
    {
      id: 'lec-233',
      number: 233,
      titleEn: 'Advanced Identity Summary & Exam Master Decision Matrix',
      titleVi: 'Tổng kết Danh tính Nâng cao & Ma trận Phân biệt Ra quyết định Thi CLF-C02',
      duration: '12m',
      summaryEn: 'Comprehensive master synthesis of all AWS identity, security, and access management services. Compare AWS IAM, AWS Organizations, AWS STS, Amazon Cognito (User Pools vs Identity Pools), AWS Directory Services, and AWS IAM Identity Center. Review the definitive 6-way decision matrix, key exam trigger phrases, and high-frequency exam traps.',
      summaryVi: 'Tổng kết toàn diện bộ 6 dịch vụ quản lý danh tính, bảo mật và kiểm soát truy cập trên AWS. Đối chiếu chi tiết giữa AWS IAM, AWS Organizations, AWS STS, Amazon Cognito (User Pools vs Identity Pools), AWS Directory Services và AWS IAM Identity Center. Nắm vững ma trận ra quyết định 6 chiều, các cụm từ kích hoạt phản xạ trúng đề và các bẫy đề thi hay gặp nhất trong Domain 2.',
      keyPointsEn: [
        'The Big Picture: AWS provides specialized identity tools for distinct audiences: IAM for internal single-account staff, Organizations for account governance, STS for temporary credentials, Cognito for external app consumers, Directory Services for Microsoft AD integration, and Identity Center for enterprise multi-account SSO.',
        'IAM (Identity and Access Management): Internal staff managing cloud infrastructure inside ONE AWS account. Permanent credentials (passwords, access keys) or IAM roles.',
        'AWS Organizations & SCPs: Multi-account hierarchy and boundary guardrails. SCPs define maximum permissions across accounts but NEVER apply to the management account and NEVER grant permissions.',
        'AWS STS (Security Token Service): Short-lived temporary credentials (15 min - 36h). Key triggers: AssumeRole, cross-account access, EC2 instance roles, session tokens.',
        'Amazon Cognito: Consumer identities for web and mobile apps. User Pools = Authentication & User Directory (Google/Facebook/Apple login). Identity Pools = Authorization & temporary AWS credentials via STS to access AWS services directly.',
        'AWS Directory Services: Microsoft Active Directory integration in the cloud. Managed Microsoft AD (real Windows AD with forest trust), AD Connector (proxy to on-prem AD), Simple AD (Samba 4).',
        'AWS IAM Identity Center (AWS SSO): Enterprise workforce Single Sign-On across multi-account AWS Organizations and SaaS apps. Central AWS Access Portal and Permission Sets.',
        'Top Exam Pitfall #1: Creating IAM users for mobile app customers -> WRONG. Always use Amazon Cognito!',
        'Top Exam Pitfall #2: Believing SCPs grant permissions -> WRONG. SCPs only restrict boundaries (filter permissions); IAM policies grant permissions.',
        'Top Exam Pitfall #3: Confusing AD Connector with Managed Microsoft AD -> AD Connector is a proxy with no local storage; Managed AD is a real Windows AD in AWS with trust relationships.'
      ],
      keyPointsVi: [
        'Bức tranh tổng thể: AWS chia các công cụ quản lý danh tính theo từng đối tượng sử dụng cụ thể: IAM cho nhân viên nội bộ trong 1 tài khoản; Organizations quản trị cấu trúc đa tài khoản; STS cấp khóa tạm thời; Cognito cho khách hàng dùng app di động; Directory Services tích hợp Microsoft AD; và IAM Identity Center cho đăng nhập một lần SSO toàn doanh nghiệp.',
        'AWS IAM: Dành cho nhân viên nội bộ quản trị hạ tầng trong 1 tài khoản AWS duy nhất. Sử dụng thông tin xác thực dài hạn (mật khẩu, Access Key) hoặc IAM Role.',
        'AWS Organizations & SCP: Quản trị phân cấp đa tài khoản và rào chắn tối đa. SCP chỉ có tác dụng lọc/chặn quyền, KHÔNG BAO GIỜ cấp thêm quyền và KHÔNG BAO GIỜ áp dụng lên tài khoản Master Management Account.',
        'AWS STS: Cấp phát thông tin xác thực tạm thời có thời hạn ngắn (15 phút - 36 giờ). Từ khóa then chốt: AssumeRole, ủy quyền chéo tài khoản, IAM Role cho máy ảo EC2, Session Token.',
        'Amazon Cognito: Quản lý danh tính khách hàng của ứng dụng web/mobile. User Pools = Xác thực & Danh bạ người dùng (đăng nhập Google/Facebook). Identity Pools = Phân quyền & đổi khóa STS tạm thời để truy cập trực tiếp S3/DynamoDB.',
        'AWS Directory Services: Tích hợp Microsoft Active Directory lên đám mây. Managed Microsoft AD (AD Windows thật có Forest Trust), AD Connector (proxy chuyển tiếp về On-prem), Simple AD (Samba 4 giá rẻ).',
        'AWS IAM Identity Center (AWS SSO): Đăng nhập một lần cho toàn bộ nhân viên truy cập hàng trăm tài khoản AWS và ứng dụng SaaS. Cung cấp cổng AWS Access Portal và quản trị quyền tập trung bằng Permission Sets.',
        'Bẫy đề thi số 1: Tạo IAM user cho khách hàng sử dụng app điện thoại -> SAI. Luôn luôn chọn Amazon Cognito!',
        'Bẫy đề thi số 2: Nghĩ rằng SCP có khả năng cấp quyền -> SAI. SCP chỉ là rào chắn chặn quyền tối đa; quyền thực thi bắt buộc phải được cấp bởi IAM Policy bên trong tài khoản.',
        'Bẫy đề thi số 3: Nhầm lẫn giữa AD Connector và Managed Microsoft AD -> AD Connector chỉ là cổng proxy không lưu tài khoản; Managed AD là cụm Windows AD độc lập chạy trên AWS có liên kết Forest Trust.'
      ],
      examTipsEn: [
        'Decision Tree Cheat Sheet: Web/mobile app users -> Cognito. Temporary keys / AssumeRole -> STS. Active Directory -> Directory Services. Multi-account single sign-on -> IAM Identity Center. Internal single-account staff -> IAM.',
        'Remember that Domain 2 accounts for 30% of the entire CLF-C02 exam—mastering Section 19 gives you an immense advantage on identity and security questions.'
      ],
      examTipsVi: [
        'Cây quyết định siêu tốc: Khách hàng dùng app di động/web -> Cognito. Khóa bảo mật tạm thời / AssumeRole -> STS. Nghe thấy Active Directory -> Directory Services. Đăng nhập 1 lần cho nhiều tài khoản AWS -> IAM Identity Center. Nhân viên kỹ thuật nội bộ trong 1 tài khoản -> IAM.',
        'Ghi nhớ: Domain 2 chiếm tới 30% tổng số điểm bài thi CLF-C02—nắm vững Section 19 sẽ giúp bạn ăn trọn điểm tất cả các câu hỏi về danh tính và bảo mật nâng cao.'
      ],
      isCore: true,
      table: {
        headers: ['Dịch vụ Danh tính AWS', 'Đối tượng Phục vụ Chính', 'Loại Thông tin Xác thực', 'Mục đích Kiến trúc Cốt lõi', 'Từ khóa Đề thi Trúng tủ (Exam Triggers)'],
        rows: [
          ['AWS IAM', 'Nhân viên, kỹ sư nội bộ công ty trong 1 tài khoản', 'Dài hạn (Mật khẩu, AKIA keys) hoặc Role', 'Quản lý quyền chi tiết bên trong 1 tài khoản AWS', 'Single AWS account, IAM users, groups, policies, roles'],
          ['AWS Organizations', 'Quản trị viên hạ tầng đa tài khoản doanh nghiệp', 'Chính sách quản trị phân tầng (JSON SCPs)', 'Gộp hóa đơn và đặt rào chắn quyền hạn tối đa', 'Consolidated billing, OUs, SCP guardrails, master account'],
          ['AWS STS', 'Tiến trình tự động, IAM Roles, người dùng tạm', 'Ngắn hạn (ASIA keys, Session Token, 15m-36h)', 'Cấp quyền tạm thời, truy cập chéo tài khoản', 'Temporary credentials, limited-privilege, AssumeRole, EC2 role rotation'],
          ['Amazon Cognito (CUP)', 'Khách hàng, người dùng cuối ứng dụng web/mobile', 'JSON Web Tokens (JWT: ID, Access, Refresh)', 'Cung cấp danh bạ đăng ký, đăng nhập người dùng', 'Mobile/web app users, millions of users, social login Google/Facebook'],
          ['Amazon Cognito (IP)', 'Ứng dụng di động cần gọi API AWS trực tiếp', 'Khóa tạm thời AWS từ STS (gắn IAM Role)', 'Cấp quyền AWS trực tiếp cho app không qua backend', 'Federated identities, guest access, direct access to S3/DynamoDB'],
          ['AWS Directory Services', 'Hệ thống doanh nghiệp dùng Microsoft Active Directory', 'Tài khoản Kerberos / Windows Domain credentials', 'Kết nối hạ tầng AWS với Microsoft AD', 'Microsoft Active Directory, AD trust, AD Connector proxy, Windows EC2 join'],
          ['AWS IAM Identity Center', 'Toàn bộ nhân viên công ty (workforce)', 'Đăng nhập Một lần (SSO) qua cổng Web Portal', 'Một lần đăng nhập cho nhiều tài khoản AWS & SaaS', 'Single Sign-On (AWS SSO), access multiple AWS accounts, Permission Sets']
        ]
      }
    }
  ]
};
