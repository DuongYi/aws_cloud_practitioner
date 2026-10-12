import { SectionItem } from '../../types';

export const PART1_SECTIONS: SectionItem[] = [
  {
    id: 'section-4',
    sectionNumber: 4,
    titleEn: 'IAM & Identity Management',
    titleVi: 'Quản lý Danh tính & Quyền truy cập (IAM)',
    domain: 'Domain 2: Security and Compliance',
    weightPercentage: '30%',
    badge: 'Security Core',
    overviewEn: 'Section 4 covers IAM: users, groups, policies, MFA, access keys, CLI/CloudShell, roles and security tools.',
    overviewVi: 'Section 4 về IAM: user, group, policy, MFA, access key, CLI/CloudShell, role và công cụ bảo mật.',
    quickExamFacts: [
      {
        en: 'IAM is global; groups contain only users; apply least privilege.',
        vi: 'IAM là dịch vụ toàn cầu; group chỉ chứa user; áp dụng đặc quyền tối thiểu.',
        isCoreHighlight: true
      },
      {
        en: 'Policy parts: Effect, Principal, Action, Resource (+ optional Condition).',
        vi: 'Thành phần policy: Effect, Principal, Action, Resource (+ Condition tùy chọn).',
        isCoreHighlight: true
      },
      {
        en: 'MFA devices: virtual (Google Authenticator, Authy), U2F key (YubiKey), hardware key fob, GovCloud key fob.',
        vi: 'Thiết bị MFA: ảo (Google Authenticator, Authy), khóa U2F (YubiKey), hardware key fob, key fob cho GovCloud.',
        isCoreHighlight: true
      },
      {
        en: 'Access methods: Console (password + MFA), CLI and SDK (access keys). Keys are secret.',
        vi: 'Cách truy cập: Console (mật khẩu + MFA), CLI và SDK (access key). Khóa phải giữ bí mật.',
        isCoreHighlight: true
      },
      {
        en: 'Roles are for AWS services; audit with Credentials Report (account level) and Access Advisor (user level).',
        vi: 'Role dành cho dịch vụ AWS; kiểm tra bằng Credentials Report (cấp tài khoản) và Access Advisor (cấp user).',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-14',
        number: 14,
        titleEn: 'IAM Introduction: Users, Groups, Policies',
        titleVi: 'Giới thiệu IAM: Users, Groups, Policies',
        summaryEn: 'IAM (Identity and Access Management) is a global service where you create users, put them in groups, and give them permissions through policies.',
        summaryVi: 'IAM (Identity and Access Management) là dịch vụ toàn cầu, nơi bạn tạo người dùng, xếp họ vào nhóm và cấp quyền thông qua policy.',
        keyPointsEn: [
          'The root account is created by default when you open an AWS account. Use it only to set up the account; do not use it afterward and never share it.',
          'Create users in IAM: one user = one person in your organization.',
          'Groups contain ONLY users, not other groups. A user can belong to no group or multiple groups.',
          'Users or groups are assigned JSON documents called policies stating allowed actions.',
          'Least privilege principle: never give more permissions than a user needs.'
        ],
        keyPointsVi: [
          'Root account được tạo mặc định khi mở tài khoản AWS. Chỉ dùng nó để thiết lập tài khoản ban đầu; sau đó không dùng nữa và không bao giờ chia sẻ.',
          'Tạo user trong IAM: một user tương ứng một người trong tổ chức.',
          'Group chỉ chứa user, không chứa group khác. Một user có thể không thuộc nhóm nào hoặc thuộc nhiều nhóm.',
          'User hoặc group được gán tài liệu JSON gọi là policy, nêu rõ họ được phép làm gì.',
          'Nguyên tắc đặc quyền tối thiểu (least privilege): không cấp nhiều quyền hơn mức user cần.'
        ],
        isCore: true
      },
      {
        id: 'lec-15',
        number: 15,
        titleEn: 'IAM Users & Groups Hands On',
        titleVi: 'Thực hành tạo IAM User & Group',
        summaryEn: 'Create an admin IAM user and group, create an account alias, and sign in as that user so you stop using the root account.',
        summaryVi: 'Tạo IAM user và group quản trị, tạo account alias và đăng nhập bằng user đó để không dùng tài khoản root nữa.',
        keyPointsEn: [
          'Open IAM console: Region selector shows Global (IAM is global, users exist everywhere).',
          'If account menu shows only account ID, you are using the root user (not best practice).',
          'Create IAM user with console access and custom password.',
          'Create group "admin" with AdministratorAccess policy and add the user to it.',
          'Create an account alias (e.g. aws-stephane-v3) to get a friendly sign-in URL.',
          'Sign in as IAM user in an incognito window to keep root active side-by-side.'
        ],
        keyPointsVi: [
          'Mở IAM console: Bộ chọn Region hiển thị Global (IAM là dịch vụ toàn cầu, user có hiệu lực mọi nơi).',
          'Nếu menu tài khoản chỉ hiển thị ID tài khoản, bạn đang dùng root user (không nên dùng).',
          'Tạo IAM user có quyền truy cập console với mật khẩu tùy chỉnh.',
          'Tạo group admin với policy AdministratorAccess và thêm user vào đó.',
          'Tạo account alias (duy nhất toàn cầu) để có đường dẫn đăng nhập dễ nhớ.',
          'Đăng nhập bằng IAM user trong cửa sổ ẩn danh để giữ song song phiên root.'
        ]
      },
      {
        id: 'lec-16',
        number: 16,
        titleEn: 'AWS Console Simultaneous Sign-in',
        titleVi: 'Đăng nhập đồng thời nhiều tài khoản AWS',
        summaryEn: 'The AWS console supports multi-session, so you can be signed in to several accounts or roles in the same browser at once, without private windows.',
        summaryVi: 'AWS console hỗ trợ multi-session, cho phép đăng nhập nhiều tài khoản hoặc role cùng lúc trong cùng một trình duyệt mà không cần mở cửa sổ riêng tư.',
        keyPointsEn: [
          'Enable multi-session support from the account menu, then choose Add session.',
          'Each session shows its own account ID in its own browser tab or window.',
          'Demo: creating a 1 GB EBS volume in one session does not appear in the other account, proving account isolation.'
        ],
        keyPointsVi: [
          'Bật multi-session support từ menu tài khoản, rồi chọn Add session.',
          'Mỗi phiên hiển thị ID tài khoản riêng ở tab hoặc cửa sổ trình duyệt riêng.',
          'Tài nguyên tạo ở tài khoản này hoàn toàn cách ly và không xuất hiện ở tài khoản kia.'
        ]
      },
      {
        id: 'lec-17',
        number: 17,
        titleEn: 'IAM Policies',
        titleVi: 'Cấu trúc tài liệu IAM Policy (JSON)',
        summaryEn: 'Policies define permissions using JSON documents. Understand Effect, Principal, Action, and Resource.',
        summaryVi: 'Policy định nghĩa quyền bằng tài liệu JSON. Hiểu rõ Effect, Principal, Action và Resource.',
        table: {
          headers: ['Thành phần', 'Ý nghĩa'],
          rows: [
            ['Version', 'Phiên bản ngôn ngữ policy, thường là 2012-10-17'],
            ['Id', 'Định danh tùy chọn của policy'],
            ['Statement', 'Một hoặc nhiều khối mệnh đề'],
            ['Sid', 'ID tùy chọn của statement'],
            ['Effect', 'Allow hoặc Deny'],
            ['Principal', 'Tài khoản, user hoặc role mà policy áp dụng'],
            ['Action', 'Danh sách lệnh gọi API được phép hoặc bị từ chối'],
            ['Resource', 'Danh sách tài nguyên mà action áp dụng (ví dụ một bucket)'],
            ['Condition', 'Tùy chọn: điều kiện khi nào statement được áp dụng']
          ]
        },
        keyPointsEn: [
          'Policy attached to a group applies to all members (inherited).',
          'Users not in a group can receive inline policies directly.',
          'Users in multiple groups inherit policies from all of them.',
          'Core policy elements for exam: Effect, Principal, Action, Resource.'
        ],
        keyPointsVi: [
          'Policy gắn vào group được kế thừa bởi mọi thành viên trong group.',
          'User không thuộc group vẫn có thể nhận inline policy gắn trực tiếp.',
          'User thuộc nhiều group sẽ kế thừa policy từ tất cả các group đó.',
          'Thành phần cốt lõi cần nhớ cho kỳ thi: Effect, Principal, Action, Resource.'
        ],
        isCore: true
      },
      {
        id: 'lec-18',
        number: 18,
        titleEn: 'IAM Policies Hands On',
        titleVi: 'Thực hành thử nghiệm quyền và Policy',
        summaryEn: 'See how group membership and attached policies change what a user can do, then inspect AdministratorAccess and build custom policies.',
        summaryVi: 'Xem việc thuộc group và policy thay đổi quyền của user, phân tích AdministratorAccess và tạo policy riêng.',
        keyPointsEn: [
          'Remove user from admin group -> access denied on iam:ListUsers.',
          'Attach IAMReadOnlyAccess directly -> user list works again, but creating groups is denied.',
          'AdministratorAccess in JSON: Action: * and Resource: * (every action on every resource).',
          'Create custom policy using visual editor or JSON editor.'
        ],
        keyPointsVi: [
          'Xóa user khỏi group admin -> bị từ chối truy cập iam:ListUsers.',
          'Gắn IAMReadOnlyAccess trực tiếp -> xem được danh sách nhưng không tạo được group mới.',
          'AdministratorAccess dạng JSON: Action: * và Resource: * (mọi action trên mọi tài nguyên).',
          'Tạo policy tùy chỉnh bằng visual editor hoặc JSON editor.'
        ]
      },
      {
        id: 'lec-19',
        number: 19,
        titleEn: 'IAM MFA Overview',
        titleVi: 'Tổng quan xác thực đa yếu tố (MFA)',
        summaryEn: 'MFA = password you know + security device you own. Enforcing MFA makes accounts resilient even if passwords are stolen.',
        summaryVi: 'MFA = mật khẩu bạn biết + thiết bị bảo mật bạn sở hữu. Bắt buộc dùng MFA giúp tài khoản an toàn trước tin tặc.',
        table: {
          headers: ['Thiết bị MFA', 'Ghi chú'],
          rows: [
            ['Thiết bị MFA ảo', 'Google Authenticator, Authy; hỗ trợ nhiều tài khoản/user trên một điện thoại'],
            ['Khóa bảo mật U2F', 'Thiết bị vật lý, ví dụ YubiKey; một khóa hỗ trợ nhiều root và IAM user'],
            ['Hardware key fob MFA', 'Thiết bị vật lý, ví dụ của Gemalto (bên thứ ba)'],
            ['Hardware key fob cho GovCloud', 'Key fob đặc biệt của SurePassID (bên thứ ba)']
          ]
        },
        keyPointsEn: [
          'Password policy: minimum length, uppercase, lowercase, numbers, symbols, expiration (e.g. 90 days), prevent reuse.',
          'MFA: password you know + physical device you own.',
          'Virtual MFA: Google Authenticator, Twilio Authy.',
          'U2F key: YubiKey (physical token).'
        ],
        keyPointsVi: [
          'Password policy: độ dài tối thiểu, loại ký tự, hết hạn (90 ngày), chặn dùng lại.',
          'MFA: mật khẩu bạn biết + thiết bị vật lý bạn sở hữu.',
          'MFA ảo: Google Authenticator, Authy trên điện thoại.',
          'Khóa U2F: YubiKey vật lý.'
        ],
        isCore: true
      },
      {
        id: 'lec-20',
        number: 20,
        titleEn: 'IAM MFA Hands On',
        titleVi: 'Thực hành bật MFA cho tài khoản Root',
        summaryEn: 'Configure a password policy and enable a virtual MFA device for the root account.',
        summaryVi: 'Cấu hình password policy và bật thiết bị MFA ảo cho tài khoản root.',
        keyPointsEn: [
          'IAM -> Account settings -> Password policy -> Edit.',
          'Security credentials -> Assign MFA device -> Authenticator app.',
          'Scan QR code with app, enter two consecutive MFA codes.',
          'Up to 8 MFA devices per user.',
          'Warning: do not lose your phone or MFA device, or you will be locked out of root!'
        ],
        keyPointsVi: [
          'IAM -> Account settings -> Password policy -> Edit tùy chỉnh.',
          'Security credentials -> Assign MFA device -> Authenticator app.',
          'Quét mã QR bằng ứng dụng và nhập 2 mã MFA liên tiếp.',
          'Mỗi user có tối đa 8 thiết bị MFA.',
          'Cảnh báo: không để mất điện thoại chứa MFA tránh bị khóa tài khoản root.'
        ]
      },
      {
        id: 'lec-21',
        number: 21,
        titleEn: 'AWS Access Keys, CLI and SDK',
        titleVi: 'AWS Access Keys, CLI và SDK',
        summaryEn: 'Three ways to access AWS: Management Console (password + MFA), CLI (access keys), and SDK (access keys).',
        summaryVi: 'Ba cách truy cập AWS: Management Console (mật khẩu + MFA), CLI (access key) và SDK (access key).',
        table: {
          headers: ['Cách truy cập', 'Được bảo vệ bởi'],
          rows: [
            ['AWS Management Console (giao diện web)', 'Tên đăng nhập + mật khẩu (+ MFA)'],
            ['AWS CLI (giao diện dòng lệnh)', 'Access keys (Key ID + Secret Key)'],
            ['AWS SDK (bộ phát triển phần mềm)', 'Access keys (Key ID + Secret Key)']
          ]
        },
        keyPointsEn: [
          'Access Key ID is like username; Secret Access Key is like password.',
          'Never share access keys, even with colleagues.',
          'AWS CLI: command-line tool, open-source, commands start with "aws".',
          'AWS SDK: language-specific libraries (Python Boto, Java, Node.js) to call APIs from code.'
        ],
        keyPointsVi: [
          'Access Key ID giống username; Secret Access Key giống password.',
          'Không bao giờ chia sẻ access key.',
          'AWS CLI: công cụ dòng lệnh, mã nguồn mở, câu lệnh bắt đầu bằng aws.',
          'AWS SDK: thư viện theo ngôn ngữ (Python Boto3, Java, JS) để gọi API bằng mã nguồn.'
        ],
        isCore: true
      },
      {
        id: 'lec-22',
        number: 22,
        titleEn: 'AWS CLI Setup on Windows',
        titleVi: 'Cài đặt AWS CLI trên Windows',
        summaryEn: 'Download and install the AWS CLI v2 MSI installer on Windows and verify with "aws --version".',
        summaryVi: 'Tải và cài đặt trình cài đặt MSI AWS CLI v2 trên Windows, kiểm tra bằng lệnh aws --version.',
        keyPointsEn: [
          'Download MSI installer for AWS CLI version 2.',
          'Run installer -> accept license -> finish.',
          'Open Command Prompt and verify: aws --version.'
        ],
        keyPointsVi: [
          'Tải gói cài đặt MSI của AWS CLI bản 2.',
          'Chạy cài đặt theo hướng dẫn.',
          'Mở Command Prompt và kiểm tra: aws --version.'
        ]
      },
      {
        id: 'lec-23',
        number: 23,
        titleEn: 'AWS CLI Setup on Mac',
        titleVi: 'Cài đặt AWS CLI trên Mac',
        summaryEn: 'Download the graphical .pkg installer for macOS, install for all users, and verify with "aws --version" in Terminal.',
        summaryVi: 'Tải trình cài đặt đồ họa .pkg cho macOS và kiểm tra bằng lệnh aws --version trong Terminal.',
        keyPointsEn: [
          'Download .pkg graphical installer from AWS documentation.',
          'Follow install prompts.',
          'Open Terminal and verify: aws --version.'
        ],
        keyPointsVi: [
          'Tải file cài đặt .pkg từ tài liệu AWS.',
          'Tiến hành cài đặt cho mọi người dùng.',
          'Mở Terminal và kiểm tra: aws --version.'
        ]
      },
      {
        id: 'lec-24',
        number: 24,
        titleEn: 'AWS CLI Setup on Linux',
        titleVi: 'Cài đặt AWS CLI trên Linux',
        summaryEn: 'Download zip installer via curl, unzip, and run "sudo ./aws/install". Verify with "aws --version".',
        summaryVi: 'Tải gói zip bằng curl, giải nén và chạy sudo ./aws/install, kiểm tra bằng aws --version.',
        keyPointsEn: [
          'curl zip installer from AWS docs.',
          'unzip and run sudo ./aws/install.',
          'Verify with aws --version in shell.'
        ],
        keyPointsVi: [
          'Tải gói zip cài đặt bằng curl.',
          'Giải nén và chạy lệnh sudo ./aws/install.',
          'Kiểm tra bằng lệnh aws --version trong shell.'
        ]
      },
      {
        id: 'lec-25',
        number: 25,
        titleEn: 'AWS CLI Hands On',
        titleVi: 'Thực hành cấu hình AWS CLI',
        summaryEn: 'Create access keys in console, configure CLI with "aws configure", and verify that CLI permissions match console permissions.',
        summaryVi: 'Tạo access key, chạy lệnh aws configure và thấy quyền của CLI giống hệt quyền trên console.',
        keyPointsEn: [
          'User -> Security credentials -> Create access key -> CLI use case.',
          'Run "aws configure": enter Key ID, Secret Key, default region (e.g. eu-west-1), default format.',
          'Test command: "aws iam list-users" lists account users.',
          'Remove user from admin group -> CLI returns access denied, proving CLI permissions equal console permissions.'
        ],
        keyPointsVi: [
          'Tạo access key cho trường hợp sử dụng CLI.',
          'Chạy aws configure: nhập Key ID, Secret Key, Region mặc định và output format.',
          'Thử nghiệm lệnh: aws iam list-users.',
          'Xóa user khỏi group admin -> lệnh CLI cũng bị denied, chứng minh quyền CLI đồng nhất với console.'
        ]
      },
      {
        id: 'lec-26',
        number: 26,
        titleEn: 'AWS CloudShell',
        titleVi: 'Giới thiệu AWS CloudShell',
        summaryEn: 'CloudShell is a free browser terminal in the AWS cloud with AWS CLI v2 pre-installed and authenticated.',
        summaryVi: 'CloudShell là terminal miễn phí trên đám mây AWS, mở bằng biểu tượng trên console, có sẵn AWS CLI v2.',
        keyPointsEn: [
          'Free browser-based terminal with AWS CLI v2 pre-installed.',
          'Commands run with credentials of the currently signed-in user and region.',
          'Persistent storage: files survive restarts.',
          'Not available in every Region; use an available supported Region.'
        ],
        keyPointsVi: [
          'Terminal miễn phí trên trình duyệt với AWS CLI v2 cài sẵn.',
          'Lệnh tự động dùng thông tin xác thực của user đang đăng nhập.',
          'Có lưu trữ bền vững (persistent storage) giữ file sau khi khởi động lại.',
          'Không có ở mọi Region; chọn một Region được hỗ trợ.'
        ]
      },
      {
        id: 'lec-27',
        number: 27,
        titleEn: 'IAM Roles for AWS Services',
        titleVi: 'IAM Roles cho các Dịch vụ AWS',
        summaryEn: 'An IAM role is used by AWS services (not real people) to perform actions on your behalf with temporary credentials.',
        summaryVi: 'IAM role giống một user nhưng được dịch vụ AWS sử dụng (không phải con người) để thực hiện hành động thay bạn.',
        keyPointsEn: [
          'EC2 instances may need to perform actions on AWS (e.g. read S3, query IAM).',
          'Create an IAM role with proper permissions and attach it to the instance.',
          'Common roles: EC2 instance roles, Lambda function roles, CloudFormation roles.'
        ],
        keyPointsVi: [
          'EC2 instance có thể cần thực hiện hành động trên AWS.',
          'Tạo IAM role với quyền phù hợp và gắn vào instance.',
          'Các role phổ biến: EC2 instance role, Lambda function role, CloudFormation role.'
        ],
        isCore: true
      },
      {
        id: 'lec-28',
        number: 28,
        titleEn: 'IAM Roles Hands On',
        titleVi: 'Thực hành tạo IAM Role cho EC2',
        summaryEn: 'Create an IAM role for EC2 with IAMReadOnlyAccess policy so instances can query IAM.',
        summaryVi: 'Tạo IAM role cho EC2 với policy IAMReadOnlyAccess.',
        keyPointsEn: [
          'IAM -> Roles -> Create role -> Trusted entity type: AWS service -> EC2.',
          'Attach permission policy: IAMReadOnlyAccess.',
          'Name the role: DemoRoleForEC2.',
          'Trusted entity means EC2 service can assume this role.'
        ],
        keyPointsVi: [
          'IAM -> Roles -> Create role -> Trusted entity: AWS service -> EC2.',
          'Gắn policy quyền: IAMReadOnlyAccess.',
          'Đặt tên role: DemoRoleForEC2.',
          'Trusted entity nghĩa là dịch vụ EC2 có thể đảm nhận role này.'
        ]
      },
      {
        id: 'lec-29',
        number: 29,
        titleEn: 'IAM Security Tools',
        titleVi: 'Công cụ kiểm toán bảo mật IAM',
        summaryEn: 'Two tools to audit IAM security: Credentials Report (account level) and Access Advisor (user level).',
        summaryVi: 'Hai công cụ giúp kiểm tra bảo mật IAM: Credentials Report và Access Advisor.',
        table: {
          headers: ['Công cụ', 'Cấp độ', 'Hiển thị gì'],
          rows: [
            ['IAM Credentials Report', 'Cấp tài khoản', 'Báo cáo tất cả user trong tài khoản và trạng thái các thông tin xác thực của họ'],
            ['IAM Access Advisor', 'Cấp user', 'Các quyền dịch vụ được cấp cho user và lần truy cập gần nhất']
          ]
        },
        keyPointsEn: [
          'IAM Credentials Report: Account-level report of all users and credential statuses (CSV format).',
          'IAM Access Advisor: User-level view of service permissions granted and when they were last accessed.',
          'Access Advisor helps apply the least privilege principle by pruning unused permissions.'
        ],
        keyPointsVi: [
          'IAM Credentials Report: Báo cáo cấp tài khoản về mọi user và trạng thái thông tin xác thực (file CSV).',
          'IAM Access Advisor: Xem ở cấp user, cho biết quyền dịch vụ và lần truy cập gần nhất.',
          'Access Advisor giúp áp dụng nguyên tắc đặc quyền tối thiểu bằng cách loại bỏ quyền không dùng.'
        ],
        isCore: true
      },
      {
        id: 'lec-30',
        number: 30,
        titleEn: 'IAM Security Tools Hands On',
        titleVi: 'Thực hành tải Credentials Report & xem Access Advisor',
        summaryEn: 'Download the account-level Credentials Report CSV and inspect user-level service history in Access Advisor.',
        summaryVi: 'Tải tệp CSV Credentials Report cấp tài khoản và xem lịch sử truy cập dịch vụ trong tab Access Advisor của user.',
        keyPointsEn: [
          'IAM -> Credential report -> Download credential report generates CSV file with creation date, MFA status, password/key rotation.',
          'User -> Access Advisor tab: lists accessed services and last access timestamps across all AWS services.',
          'Use findings to trim excessive permissions.'
        ],
        keyPointsVi: [
          'Tải báo cáo CSV kiểm tra ngày tạo, trạng thái MFA, lần xoay mật khẩu và access key.',
          'Mở tab Access Advisor của user: xem dịch vụ đã truy cập và lần truy cập gần nhất.',
          'Dùng thông tin để thu hẹp quyền thừa theo nguyên tắc least privilege.'
        ]
      },
      {
        id: 'lec-31',
        number: 31,
        titleEn: 'IAM Best Practices',
        titleVi: 'Các thực hành tốt nhất cho IAM (Best Practices)',
        summaryEn: 'Nine fundamental best practices for secure identity management on AWS.',
        summaryVi: 'Chín thực hành tốt nhất cốt lõi để quản lý danh tính an toàn trên AWS.',
        keyPointsEn: [
          '1. Do not use the root account except for account setup.',
          '2. One AWS user = one real person. Never share credentials.',
          '3. Assign users to groups and assign permissions to groups.',
          '4. Create a strong password policy.',
          '5. Use and enforce MFA.',
          '6. Create and use roles to give permissions to AWS services.',
          '7. Create access keys for programmatic use and keep them secret.',
          '8. Audit permissions with Credentials Report and Access Advisor.',
          '9. Never share IAM users and access keys.'
        ],
        keyPointsVi: [
          '1. Không dùng tài khoản root trừ khi thiết lập tài khoản ban đầu.',
          '2. Một AWS user = một người thật. Không chia sẻ thông tin đăng nhập.',
          '3. Xếp user vào group và gán quyền cho group để quản lý tập trung.',
          '4. Tạo password policy mạnh.',
          '5. Bắt buộc dùng MFA.',
          '6. Tạo và dùng role để cấp quyền cho dịch vụ AWS (như EC2).',
          '7. Tạo access key cho lập trình (CLI/SDK) và giữ bí mật như mật khẩu.',
          '8. Kiểm tra quyền bằng Credentials Report và Access Advisor.',
          '9. Không bao giờ chia sẻ IAM user và access key.'
        ],
        isCore: true
      },
      {
        id: 'lec-32',
        number: 32,
        titleEn: 'Shared Responsibility Model for IAM',
        titleVi: 'Mô hình trách nhiệm chung cho IAM',
        summaryEn: 'AWS secures the cloud infrastructure; the customer secures users, groups, roles, policies, MFA, and access keys.',
        summaryVi: 'AWS bảo mật đám mây; khách hàng bảo mật những gì mình làm trong đám mây.',
        keyPointsEn: [
          'AWS responsibility: infrastructure, global network, physical host security, compliance certifications.',
          'Customer responsibility: creating and managing users, groups, roles, policies, enabling MFA, rotating keys, analyzing access patterns.'
        ],
        keyPointsVi: [
          'AWS chịu trách nhiệm: hạ tầng, bảo mật mạng toàn cầu, máy chủ vật lý, chứng nhận tuân thủ.',
          'Khách hàng chịu trách nhiệm: tạo và quản lý user, group, role, policy, bật MFA, xoay vòng access key, rà soát quyền.'
        ],
        isCore: true
      },
      {
        id: 'lec-33',
        number: 33,
        titleEn: 'IAM Summary',
        titleVi: 'Tổng kết chuyên đề IAM',
        summaryEn: 'Comprehensive recap of Users, Groups, Policies, Roles, Security (MFA, password policy), CLI/SDK, Access Keys, and Audit tools.',
        summaryVi: 'Ôn tập toàn bộ về User, Group, Policy, Role, Bảo mật (MFA, password policy), CLI/SDK, Access Key và Công cụ kiểm toán.',
        keyPointsEn: [
          'Users: map to real persons, with console password.',
          'Groups: contain only users.',
          'Policies: JSON permission documents attached to users or groups.',
          'Roles: identities for EC2 instances or other AWS services.',
          'Security: MFA and strong password policy.',
          'CLI and SDK: programmatic management using secret access keys.',
          'Audit: Credentials Report (account) and Access Advisor (user).'
        ],
        keyPointsVi: [
          'User: ứng với người thật trong công ty, có mật khẩu console.',
          'Group: chỉ chứa user.',
          'Policy: tài liệu JSON nêu quyền, gắn vào user hoặc group.',
          'Role: danh tính cho EC2 instance hoặc dịch vụ AWS.',
          'Bảo mật: MFA và password policy mạnh.',
          'CLI và SDK: quản lý bằng lập trình qua access key.',
          'Kiểm toán: Credentials Report (cấp tài khoản) và Access Advisor (cấp user).'
        ],
        isCore: true
      }
    ]
  },
  {
    id: 'section-5',
    sectionNumber: 5,
    titleEn: 'EC2 (Elastic Compute Cloud)',
    titleVi: 'EC2 - Máy ảo & Điện toán đám mây',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'Compute Core',
    overviewEn: 'Section 5 introduces EC2: launching instances, security groups, SSH access, IAM roles for instances, and purchasing options.',
    overviewVi: 'Section 5 giới thiệu EC2: khởi chạy instance, security group, truy cập SSH, IAM role cho instance và các lựa chọn mua.',
    quickExamFacts: [
      {
        en: 'Timeout = security group; connection refused = application issue.',
        vi: 'Timeout = security group; connection refused = lỗi ứng dụng.',
        isCoreHighlight: true
      },
      {
        en: 'Ports: 22 SSH/SFTP, 21 FTP, 80 HTTP, 443 HTTPS, 3389 RDP.',
        vi: 'Cổng: 22 SSH/SFTP, 21 FTP, 80 HTTP, 443 HTTPS, 3389 RDP.',
        isCoreHighlight: true
      },
      {
        en: 'Security groups: allow rules only; inbound blocked and outbound allowed by default.',
        vi: 'Security group: chỉ có quy tắc cho phép; mặc định chặn inbound và cho phép outbound.',
        isCoreHighlight: true
      },
      {
        en: 'Never store IAM access keys on an instance; use IAM roles.',
        vi: 'Không lưu IAM access key trên instance; dùng IAM role.',
        isCoreHighlight: true
      },
      {
        en: 'Spot = cheapest but can be lost (not for critical jobs/databases); Reserved/Savings Plans = long steady workloads; Dedicated Host = licensing/compliance.',
        vi: 'Spot = rẻ nhất nhưng có thể mất (không dùng cho job quan trọng/database); Reserved/Savings Plans = tải dài ổn định; Dedicated Host = giấy phép/tuân thủ.',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-34',
        number: 34,
        titleEn: 'AWS Budget Setup',
        titleVi: 'Thiết lập AWS Budget & Cảnh báo chi phí',
        summaryEn: 'Set up a budget and alerts so you are not surprised by unexpected charges while learning.',
        summaryVi: 'Thiết lập ngân sách và cảnh báo để tránh phát sinh chi phí AWS ngoài ý muốn trong khi học.',
        keyPointsEn: [
          'Enable billing access: sign in as root user -> Account -> Activate IAM Access to billing information.',
          'Zero spend budget: notifies you as soon as you spend even 1 cent.',
          'Monthly cost budget: e.g. 10 USD/month, with email alerts at 85% actual spend, 100% actual spend, and 100% forecasted spend.',
          'Free Tier monitoring: check current and forecasted usage vs free limits in Billing Dashboard.'
        ],
        keyPointsVi: [
          'Bật quyền truy cập billing: đăng nhập root -> Account -> Activate IAM Access to billing information.',
          'Zero spend budget (mẫu đơn giản): báo ngay qua email khi bạn chi tiêu dù chỉ 1 cent.',
          'Monthly cost budget: ví dụ 10 USD/tháng, gửi email khi chi tiêu thực tế đạt 85%, 100% và khi dự báo đạt 100%.',
          'Theo dõi Free Tier: hiển thị mức dùng hiện tại và dự báo so với hạn mức miễn phí.'
        ]
      },
      {
        id: 'lec-35',
        number: 35,
        titleEn: 'EC2 Basics',
        titleVi: 'Khái niệm cơ bản về Amazon EC2',
        summaryEn: 'Amazon EC2 (Elastic Compute Cloud) is IaaS on AWS: virtual machines (instances), storage (EBS), load balancing (ELB), and auto scaling (ASG).',
        summaryVi: 'Amazon EC2 (Elastic Compute Cloud) là triển khai Hạ tầng như một dịch vụ (IaaS) trên AWS: máy ảo (EC2 instances), lưu trữ (EBS), cân bằng tải (ELB) và tự động co giãn (ASG).',
        table: {
          headers: ['Lựa chọn cấu hình', 'Các tùy chọn trên AWS'],
          rows: [
            ['Hệ điều hành (OS)', 'Linux, Windows hoặc macOS'],
            ['Tính toán (Compute)', 'Số lượng CPU / lõi'],
            ['Bộ nhớ (RAM)', 'Dung lượng RAM'],
            ['Lưu trữ (Storage)', 'Qua mạng (EBS, EFS) hoặc phần cứng (EC2 Instance Store)'],
            ['Mạng (Network)', 'Tốc độ card mạng, loại IP công cộng'],
            ['Tường lửa (Firewall)', 'Security Group'],
            ['Script khởi động', 'EC2 User Data (bootstrapping)']
          ]
        },
        keyPointsEn: [
          'EC2 is Infrastructure as a Service (IaaS) on AWS.',
          'EC2 includes: instances, EBS volumes, ELB, and ASG.',
          'Bootstrapping means running commands when the machine starts. Script runs ONLY ONCE at first boot.',
          'User Data scripts run as the root user, so every command has sudo rights.'
        ],
        keyPointsVi: [
          'EC2 là dịch vụ nền tảng IaaS (Infrastructure as a Service) cốt lõi của AWS.',
          'EC2 bao gồm: thuê máy ảo (instances), ổ đĩa ảo (EBS), cân bằng tải (ELB) và nhóm tự động co giãn (ASG).',
          'Bootstrapping: chạy lệnh tự động khi máy khởi động. Script chỉ chạy MỘT LẦN ở lần boot đầu tiên.',
          'EC2 User Data chạy dưới quyền root, do đó mọi lệnh đều có đặc quyền sudo tự động.'
        ],
        isCore: true
      },
      {
        id: 'lec-36',
        number: 36,
        titleEn: 'Create EC2 Instance with User Data (Hands On)',
        titleVi: 'Thực hành tạo EC2 instance với User Data',
        summaryEn: 'Launch first EC2 instance (Amazon Linux 2), run web server through User Data, and learn to start, stop, and terminate instances.',
        summaryVi: 'Khởi chạy EC2 instance đầu tiên (Amazon Linux 2), chạy web server HTTPD bằng User Data, xem quy trình stop, start và terminate.',
        keyPointsEn: [
          'AMI (Amazon Machine Image): OS image, e.g. Amazon Linux 2 AMI (Free Tier eligible).',
          'Instance type: t2.micro (1 vCPU, 1 GB RAM, free tier gives 750 hours/month in year 1).',
          'Key pair: RSA key pair (.pem for Mac/Linux/Win10, .ppk for PuTTY).',
          'Storage: 8 GB gp2 root volume (Delete on termination enabled by default).',
          'User Data: runs once at first boot to install httpd and write index.html.',
          'Stop instance: stops compute charges, disk preserved; Start instance: public IPv4 can change, private IPv4 stays the same.',
          'Terminate instance: removes the instance permanently.'
        ],
        keyPointsVi: [
          'AMI (Amazon Machine Image): hệ điều hành của máy ảo, ví dụ Amazon Linux 2.',
          'Loại instance: t2.micro (1 vCPU, 1 GB RAM, miễn phí 750 giờ/tháng trong năm đầu).',
          'Key pair: cặp khóa RSA (.pem cho Mac/Linux/Win10, .ppk cho PuTTY).',
          'Ổ cứng: 8 GB gp2 root volume (mặc định bật Delete on termination).',
          'User Data: script tự động cài đặt web server Apache (httpd) và tạo file index.html.',
          'Stop: ngừng tính phí compute, giữ nguyên ổ đĩa; Start: IP công cộng có thể đổi, IP riêng không đổi.',
          'Terminate: xóa vĩnh viễn máy ảo khỏi tài khoản.'
        ]
      },
      {
        id: 'lec-37',
        number: 37,
        titleEn: 'EC2 Instance Types Basics',
        titleVi: 'Phân loại các họ máy ảo EC2',
        summaryEn: 'Naming convention m5.2xlarge: m (family), 5 (generation), 2xlarge (size). Grouped into 4 main categories.',
        summaryVi: 'Quy ước đặt tên m5.2xlarge: m (họ máy), 5 (thế hệ), 2xlarge (kích thước). Phân thành 4 nhóm mục đích sử dụng.',
        table: {
          headers: ['Nhóm máy ảo', 'Mục đích tối ưu', 'Ví dụ / Ký hiệu họ'],
          rows: [
            ['General purpose (Đa năng)', 'Cân bằng compute, memory, network: web server, git repo', 'T2, T3 (t2.micro), M5, M6'],
            ['Compute optimized (Tối ưu tính toán)', 'Xử lý lô (batch), chuyển mã media, HPC, machine learning, game server', 'Dòng C (C5, C6)'],
            ['Memory optimized (Tối ưu bộ nhớ)', 'CSDL quan hệ/NoSQL, in-memory cache (Redis, ElastiCache), BI, Big Data', 'Dòng R (R = RAM), X1, Z1'],
            ['Storage optimized (Tối ưu lưu trữ)', 'Truy cập I/O cực cao trên ổ cứng cục bộ: OLTP, data warehouse, distributed file system', 'Dòng I, D, H1']
          ]
        },
        keyPointsEn: [
          'Naming convention m5.2xlarge: m = instance class/family, 5 = generation, 2xlarge = size within class.',
          'General purpose: balanced CPU, memory, and network (T and M series).',
          'Compute optimized: CPU-intensive tasks (C family).',
          'Memory optimized: memory-intensive workloads, caches, databases (R, X, Z families; R stands for RAM).',
          'Storage optimized: sequential and random read/write I/O on local disks (I, D, H families).'
        ],
        keyPointsVi: [
          'Quy ước đặt tên m5.2xlarge: m là họ instance, 5 là thế hệ (mới hơn = tốt hơn), 2xlarge là kích thước.',
          'General purpose: cân bằng giữa tính toán, bộ nhớ và mạng (dòng T và M).',
          'Compute optimized: xử lý nặng về CPU như render, batch, machine learning (dòng C).',
          'Memory optimized: xử lý nặng về RAM như database, ElastiCache, dữ liệu in-memory (dòng R - nhớ R = RAM).',
          'Storage optimized: thông lượng I/O ổ đĩa cực lớn cho OLTP, data warehouse (dòng I, D, H).'
        ],
        isCore: true
      },
      {
        id: 'lec-38',
        number: 38,
        titleEn: 'Security Groups & Classic Ports Overview',
        titleVi: 'Security Groups & Cổng mạng kinh điển',
        summaryEn: 'Security groups act as a firewall around EC2 instances controlling inbound and outbound traffic. Contains allow rules only.',
        summaryVi: 'Security group hoạt động như tường lửa bao quanh EC2 instance, kiểm soát lưu lượng được phép vào và ra. Chỉ chứa quy tắc cho phép.',
        table: {
          headers: ['Cổng (Port)', 'Giao thức', 'Công dụng thường gặp trong kỳ thi'],
          rows: [
            ['22', 'SSH / SFTP', 'Đăng nhập dòng lệnh vào máy Linux / Truyền tệp bảo mật'],
            ['21', 'FTP', 'Tải tệp tin lên chia sẻ file không mã hóa'],
            ['80', 'HTTP', 'Truy cập website thông thường (không bảo mật)'],
            ['443', 'HTTPS', 'Truy cập website bảo mật qua SSL/TLS'],
            ['3389', 'RDP', 'Đăng nhập giao diện đồ họa vào máy Windows (Remote Desktop)']
          ]
        },
        keyPointsEn: [
          'Security groups contain ALLOW rules only (no deny rules).',
          'Stateful: return traffic is automatically allowed regardless of inbound/outbound rules.',
          'Default behavior: all inbound blocked, all outbound allowed.',
          'Locked to a specific Region/VPC combination.',
          'Lives outside EC2: blocked traffic never reaches the instance.',
          'Troubleshooting: Connection TIMEOUT = Security Group issue; Connection REFUSED = Application not running or crashing.'
        ],
        keyPointsVi: [
          'Security group CHỈ chứa quy tắc cho phép (ALLOW rules), không có quy tắc chặn (deny rules).',
          'Stateful: nếu lưu lượng vào được cho phép, phản hồi ra ngoài tự động được phép (và ngược lại).',
          'Hành vi mặc định: chặn toàn bộ inbound, cho phép toàn bộ outbound.',
          'Bị khóa theo tổ hợp Region và VPC cụ thể.',
          'Nằm ngoài EC2: lưu lượng bị chặn không bao giờ chạm tới hệ điều hành của instance.',
          'Ghi nhớ thi: Bị TIMEOUT (chờ mãi) = 100% lỗi do Security Group / Tường lửa; Bị CONNECTION REFUSED = đã qua được Security Group nhưng ứng dụng bị lỗi/chưa bật.'
        ],
        isCore: true
      },
      {
        id: 'lec-39',
        number: 39,
        titleEn: 'Security Groups Hands On',
        titleVi: 'Thực hành cấu hình Security Groups',
        summaryEn: 'Inspect, edit and test security group rules on console: deleting HTTP port 80 rule causes a timeout, re-adding restores access.',
        summaryVi: 'Xem, chỉnh sửa và thử nghiệm quy tắc security group trên console: xóa cổng 80 gây timeout ngay lập tức, thêm lại thì trang web hoạt động bình thường.',
        keyPointsEn: [
          'Inbound rules: SSH on port 22 and HTTP on port 80 from anywhere (0.0.0.0/0).',
          'Deleting port 80 rule causes browser to hang and time out (proving timeouts are security group issues).',
          'Sources can be: 0.0.0.0/0 (anywhere), My IP (your current public IP), custom CIDR, or another security group ID.',
          'Referencing other security groups: allows instances with SG-2 to connect to instances with SG-1 regardless of IP (ideal for load balancers).'
        ],
        keyPointsVi: [
          'Quy tắc inbound: SSH cổng 22 và HTTP cổng 80 từ mọi nơi (0.0.0.0/0).',
          'Thử nghiệm: xóa rule cổng 80 -> website tải mãi rồi báo timeout (chứng minh timeout là do security group).',
          'Nguồn (Source): có thể là 0.0.0.0/0 (mọi nơi), My IP (chỉ IP của bạn), CIDR cụ thể hoặc ID của một security group khác.',
          'Tham chiếu Security Group khác: cho phép máy có SG-2 kết nối vào máy có SG-1 mà không cần quan tâm IP (rất phổ biến khi kết hợp Application Load Balancer).'
        ]
      },
      {
        id: 'lec-40',
        number: 40,
        titleEn: 'SSH Overview',
        titleVi: 'Tổng quan kết nối SSH vào máy ảo',
        summaryEn: 'SSH allows secure terminal access to Linux servers over port 22. Methods vary by operating system.',
        summaryVi: 'SSH cho phép mở giao diện dòng lệnh an toàn vào máy chủ Linux qua cổng 22. Tùy thuộc vào hệ điều hành của bạn để chọn công cụ phù hợp.',
        table: {
          headers: ['Hệ điều hành của bạn', 'Cách thức kết nối', 'Ghi chú'],
          rows: [
            ['Mac / Linux', 'Lệnh ssh trong Terminal', 'Dùng file .pem (yêu cầu chmod 0400)'],
            ['Windows 10 trở lên', 'Lệnh ssh trong PowerShell / CMD', 'Tích hợp sẵn OpenSSH, dùng file .pem'],
            ['Windows cũ hơn / PuTTY', 'Phần mềm PuTTY', 'Yêu cầu chuyển .pem sang .ppk bằng PuTTYgen'],
            ['Mọi hệ điều hành', 'EC2 Instance Connect', 'Chạy trực tiếp trên trình duyệt, không cần cài đặt gì']
          ]
        },
        keyPointsEn: [
          'SSH runs over port 22; port 22 must be allowed in the security group.',
          'EC2 Instance Connect works from any browser without key management, but currently requires Amazon Linux 2.',
          'You only need one connection method to work.'
        ],
        keyPointsVi: [
          'SSH chạy qua cổng 22; cổng 22 bắt buộc phải được mở trong inbound của security group.',
          'EC2 Instance Connect chạy được trên mọi trình duyệt, không cần quản lý file khóa, hỗ trợ Amazon Linux 2.',
          'Bạn chỉ cần thành thạo 1 cách kết nối là đủ để theo suốt khóa học.'
        ]
      },
      {
        id: 'lec-41',
        number: 41,
        titleEn: 'How to SSH Using Linux or Mac',
        titleVi: 'Kết nối SSH từ Linux hoặc macOS',
        summaryEn: 'Connect to EC2 using terminal: chmod 0400 on the .pem file, then run ssh -i key.pem ec2-user@<public-ip>.',
        summaryVi: 'Kết nối EC2 từ terminal: cấp quyền chmod 0400 cho file .pem, sau đó chạy ssh -i key.pem ec2-user@<public-ip>.',
        keyPointsEn: [
          'Fix permissions error: chmod 0400 EC2Tutorial.pem.',
          'Default username for Amazon Linux 2 is ec2-user.',
          'Command syntax: ssh -i <path-to-key.pem> ec2-user@<public-ipv4>.',
          'Public IP changes when instance is stopped and started.'
        ],
        keyPointsVi: [
          'Sửa lỗi quyền truy cập file khóa: chạy lệnh chmod 0400 EC2Tutorial.pem.',
          'User mặc định của Amazon Linux 2 là ec2-user.',
          'Cú pháp: ssh -i EC2Tutorial.pem ec2-user@<IPv4-công-cộng>.',
          'Lưu ý: khi stop rồi start lại instance, IP công cộng có thể thay đổi nên cần cập nhật IP mới.'
        ]
      },
      {
        id: 'lec-42',
        number: 42,
        titleEn: 'How to SSH Using Windows (PuTTY)',
        titleVi: 'Kết nối SSH trên Windows bằng PuTTY',
        summaryEn: 'Use PuTTY with .ppk key format. Convert .pem to .ppk using PuTTYgen, configure session, and connect on port 22.',
        summaryVi: 'Dùng PuTTY với định dạng khóa .ppk. Chuyển đổi .pem sang .ppk bằng PuTTYgen, cấu hình session và kết nối qua cổng 22.',
        keyPointsEn: [
          'PuTTY requires .ppk format: use PuTTYgen to Load .pem and Save Private Key as .ppk.',
          'In PuTTY Session: enter host as ec2-user@<public-ip>, port 22.',
          'In Connection -> SSH -> Auth: browse and select the .ppk private key file.',
          'Save session for easy one-click access later.'
        ],
        keyPointsVi: [
          'PuTTY yêu cầu định dạng .ppk: dùng PuTTYgen mở file .pem rồi chọn Save private key thành .ppk.',
          'Trong PuTTY Session: nhập ec2-user@<IP-công-cộng>, cổng 22.',
          'Trong Connection -> SSH -> Auth: chọn file .ppk đã lưu.',
          'Lưu session để lần sau chỉ cần bấm Open là vào được ngay.'
        ]
      },
      {
        id: 'lec-43',
        number: 43,
        titleEn: 'How to SSH Using Windows 10',
        titleVi: 'Kết nối SSH trên Windows 10 qua Command Prompt / PowerShell',
        summaryEn: 'Windows 10 includes native OpenSSH client. Connect directly using ssh -i EC2Tutorial.pem ec2-user@<public-ip>.',
        summaryVi: 'Windows 10 tích hợp sẵn OpenSSH. Kết nối trực tiếp bằng lệnh ssh -i EC2Tutorial.pem ec2-user@<public-ip> trong PowerShell hoặc CMD.',
        keyPointsEn: [
          'Windows 10 and 11 support the native ssh command in PowerShell and CMD.',
          'Command syntax: ssh -i EC2Tutorial.pem ec2-user@<public-ipv4>.',
          'If permission error occurs: right click .pem -> Properties -> Security -> Advanced -> Disable inheritance -> grant yourself Full control.'
        ],
        keyPointsVi: [
          'Windows 10 và 11 có sẵn lệnh ssh trong PowerShell và Command Prompt.',
          'Cú pháp: ssh -i EC2Tutorial.pem ec2-user@<IPv4-công-cộng>.',
          'Nếu gặp lỗi quyền tệp (unprotected key): nhấp chuột phải .pem -> Properties -> Security -> Advanced -> Disable inheritance và gán cho bạn Full control.'
        ]
      },
      {
        id: 'lec-44',
        number: 44,
        titleEn: 'SSH Troubleshooting',
        titleVi: 'Xử lý 7 sự cố thường gặp khi kết nối SSH',
        summaryEn: 'Troubleshooting guide for connection timeout, corporate firewalls, command not found, connection refused, and key permission errors.',
        summaryVi: 'Hướng dẫn khắc phục 7 sự cố SSH: lỗi timeout, tường lửa chặn, lệnh không tồn tại, connection refused, sai key/user và đổi IP.',
        table: {
          headers: ['Sự cố / Triệu chứng', 'Nguyên nhân', 'Cách xử lý'],
          rows: [
            ['1. Connection timeout', 'Lỗi Security Group cổng 22', 'Kiểm tra inbound rule của Security Group đã mở cổng 22 cho IP của bạn chưa'],
            ['2. Vẫn timeout sau khi sửa SG', 'Tường lửa công ty/mạng cá nhân chặn cổng 22', 'Chuyển sang dùng EC2 Instance Connect trên trình duyệt'],
            ['3. ssh command not found', 'Windows cũ chưa có OpenSSH', 'Dùng phần mềm PuTTY hoặc EC2 Instance Connect'],
            ['4. Connection refused', 'Instance chưa bật SSH daemon', 'Khởi động lại instance hoặc tạo mới với Amazon Linux 2'],
            ['5. Permission denied (publickey)', 'Dùng sai file key, sai user', 'Đảm bảo dùng đúng user ec2-user và đúng file private key gắn với instance'],
            ['6. Hoàn toàn không vào được', 'Rối cấu hình máy tính cá nhân', 'Dùng tính năng EC2 Instance Connect trên AWS Console'],
            ['7. Hôm qua vào được, hôm nay không', 'Instance đã stop/start nên đổi IP', 'Lấy IPv4 công cộng mới của instance trên console và cập nhật lệnh kết nối']
          ]
        },
        keyPointsEn: [
          'Timeout = Security group issue (check port 22 inbound rule).',
          'Connection refused = SSH service not running on instance.',
          'Permission denied = wrong key file or wrong user (must be ec2-user for Amazon Linux 2).',
          'IP changed after stop/start: check console for the new public IPv4 address.'
        ],
        keyPointsVi: [
          'Timeout: 100% do security group hoặc tường lửa chặn cổng 22.',
          'Connection refused: gói tin đã tới nơi nhưng instance chưa chạy tiến trình SSH.',
          'Permission denied: sai tệp khóa riêng hoặc sai tên user (Amazon Linux 2 phải là ec2-user).',
          'Đổi IP sau khi stop/start: cập nhật địa chỉ IP công cộng mới từ AWS console.'
        ],
        isCore: true
      },
      {
        id: 'lec-45',
        number: 45,
        titleEn: 'EC2 Instance Connect',
        titleVi: 'Kết nối qua EC2 Instance Connect',
        summaryEn: 'Browser-based SSH session into your EC2 instance with no SSH keys to manage and nothing to install on your computer.',
        summaryVi: 'Phiên kết nối SSH ngay trên trình duyệt web vào máy ảo EC2, không cần tải khóa về máy và không cần cài phần mềm.',
        keyPointsEn: [
          'Browser-based SSH: click Connect -> EC2 Instance Connect tab -> Connect.',
          'Uploads a temporary one-time SSH key behind the scenes valid for 60 seconds.',
          'Username defaults to ec2-user for Amazon Linux 2.',
          'CRITICAL EXAM POINT: Still requires port 22 to be open in the Security Group because it uses SSH under the hood.'
        ],
        keyPointsVi: [
          'Kết nối SSH trực tiếp trên trình duyệt: chọn instance -> Connect -> EC2 Instance Connect -> Connect.',
          'Cơ chế: AWS tự động tạo và tải lên một khóa SSH tạm thời có hiệu lực trong 60 giây.',
          'User mặc định là ec2-user (Amazon Linux 2).',
          'ĐIỂM THI QUAN TRỌNG: Vẫn bắt buộc cổng 22 phải mở trong Security Group vì nó hoạt động dựa trên SSH ở tầng bên dưới.'
        ],
        isCore: true
      },
      {
        id: 'lec-46',
        number: 46,
        titleEn: 'EC2 Instance Roles Demo',
        titleVi: 'Thực hành gán IAM Role cho EC2 Instance',
        summaryEn: 'Give an EC2 instance permissions to call AWS APIs by attaching an IAM role, instead of storing access keys on the instance.',
        summaryVi: 'Cấp cho EC2 instance quyền gọi API AWS bằng cách gắn IAM role, tuyệt đối không lưu access key trên máy ảo.',
        keyPointsEn: [
          'CRITICAL BEST PRACTICE: Never run "aws configure" and type secret access keys on an EC2 instance.',
          'Anyone with access to the instance could read those hardcoded credentials.',
          'Instead, attach an IAM Role (e.g. DemoRoleForEC2 with IAMReadOnlyAccess) directly to the instance via Actions -> Security -> Modify IAM role.',
          'AWS automatically provides and rotates temporary credentials via instance metadata.'
        ],
        keyPointsVi: [
          'QUY TẮC BẢO MẬT SỐ 1: Tuyệt đối KHÔNG chạy aws configure rồi nhập access key lên EC2 instance.',
          'Bất kỳ ai truy cập được máy ảo đều có thể đọc trộm access key lưu trong máy.',
          'Giải pháp chuẩn: Gắn IAM Role (ví dụ DemoRoleForEC2 có policy IAMReadOnlyAccess) vào instance qua Actions -> Security -> Modify IAM role.',
          'Instance sẽ tự động nhận thông tin xác thực tạm thời từ AWS một cách an toàn.'
        ],
        isCore: true
      },
      {
        id: 'lec-47',
        number: 47,
        titleEn: 'EC2 Instance Purchasing Options',
        titleVi: 'Các lựa chọn thanh toán máy ảo EC2',
        summaryEn: 'Compare On-Demand, Reserved Instances, Convertible RI, Savings Plans, Spot Instances, Dedicated Hosts, Dedicated Instances, and Capacity Reservations.',
        summaryVi: 'So sánh chi tiết 7 mô hình giá EC2: On-Demand, Reserved Instances, Convertible RI, Savings Plans, Spot, Dedicated Hosts, Dedicated Instances và Capacity Reservations.',
        table: {
          headers: ['Lựa chọn thanh toán', 'Đặc điểm chính', 'Mức giảm giá', 'Trường hợp sử dụng phù hợp'],
          rows: [
            ['On-Demand', 'Trả theo mức dùng thực tế (theo giây/giờ), không cam kết', '0% (giá gốc cao nhất)', 'Khối lượng công việc ngắn hạn, đột xuất, ứng dụng mới chưa đoán trước tải'],
            ['Reserved Instances (RI)', 'Cam kết thời hạn 1 hoặc 3 năm, chọn trước loại máy, Region, OS', 'Giảm tới 72%', 'Tải công việc ổn định, liên tục dài hạn (ví dụ Database, Core backend)'],
            ['Convertible Reserved Instances', 'Cam kết 1 hoặc 3 năm nhưng linh hoạt đổi họ máy, OS, tenancy', 'Giảm tới 66%', 'Tải dài hạn nhưng cần linh hoạt thay đổi loại máy theo tiến hóa công nghệ'],
            ['EC2 Savings Plans', 'Cam kết số tiền chi tiêu USD/giờ (ví dụ $10/h) trong 1 hoặc 3 năm', 'Giảm tới 72%', 'Linh hoạt thay đổi kích thước máy, OS, tenancy trong cùng họ máy và Region'],
            ['Spot Instances', 'Đấu giá dung lượng dư thừa của AWS, có thể bị thu hồi bất cứ lúc nào', 'Giảm tới 90% (rẻ nhất)', 'Tải chịu lỗi: batch job, phân tích dữ liệu, xử lý ảnh. KHÔNG dùng cho CSDL/critical job!'],
            ['Dedicated Hosts', 'Thuê trọn vẹn một máy chủ vật lý riêng biệt cho tài khoản', 'Đắt nhất', 'Yêu cầu tuân thủ nghiêm ngặt hoặc dùng giấy phép phần mềm theo socket/core/VM'],
            ['Dedicated Instances', 'Chạy trên phần cứng riêng (không chung với khách khác), không chọn vị trí', 'Giá cao hơn On-Demand', 'Tuân thủ bảo mật riêng tư mà không cần quản lý phần cứng mức thấp'],
            ['Capacity Reservations', 'Đặt trước chỗ trống tính toán ở một AZ cụ thể, hủy lúc nào cũng được', 'Không giảm giá', 'Đảm bảo chắc chắn có máy khi cần chạy sự kiện lớn tại 1 AZ nhất định']
          ]
        },
        keyPointsEn: [
          'On-Demand: Pay for what you use, highest cost, no commitment. Best for short unpredictable workloads.',
          'Reserved Instances (1 or 3 yrs): Up to 72% discount for steady-state workloads (databases).',
          'Convertible Reserved: Up to 66% discount with ability to change instance types.',
          'Savings Plans: Commit to $ spend/hour (1 or 3 yrs). Flexible size, OS, tenancy.',
          'Spot Instances: Up to 90% discount (cheapest). CAN BE LOST ANYTIME. NEVER for critical workloads or databases.',
          'Dedicated Hosts: Entire physical server dedicated to you. Best for server-bound licensing (per core/socket) and regulatory compliance.',
          'Capacity Reservations: Reserve compute capacity in a specific AZ without time commitment; pay On-Demand rates.'
        ],
        keyPointsVi: [
          'On-Demand: Trả theo mức dùng thực tế, đắt nhất, không cam kết, phù hợp cho khối lượng công việc ngắn hạn khó đoán trước.',
          'Reserved Instances (1 hoặc 3 năm): Giảm tới 72% cho ứng dụng chạy ổn định liên tục như cơ sở dữ liệu.',
          'Convertible Reserved: Giảm tới 66%, cho phép đổi họ máy ảo, hệ điều hành.',
          'Savings Plans: Cam kết số tiền chi tiêu theo giờ (ví dụ $10/h), linh hoạt đổi kích thước máy.',
          'Spot Instances: Rẻ nhất (giảm tới 90%), nhưng có thể bị thu hồi bất kỳ lúc nào khi AWS cần lại tài nguyên. TUYỆT ĐỐI KHÔNG DÙNG CHO DATABASE HOẶC JOB QUAN TRỌNG.',
          'Dedicated Hosts: Thuê nguyên máy chủ vật lý thực tế. Đắt nhất, dùng cho giấy phép phần mềm theo core/socket và tuân thủ pháp lý.',
          'Capacity Reservations: Đặt trước công suất tại 1 AZ cụ thể; trả theo giá On-Demand dù có chạy máy hay không.'
        ],
        isCore: true
      },
      {
        id: 'lec-48',
        number: 48,
        titleEn: 'Shared Responsibility Model for EC2',
        titleVi: 'Mô hình trách nhiệm chung cho EC2',
        summaryEn: 'AWS is responsible for security OF the cloud (infrastructure, data centers, hardware); customer is responsible for security IN the cloud (OS, patches, security groups, IAM roles, data).',
        summaryVi: 'AWS chịu trách nhiệm bảo mật CỦA đám mây (hạ tầng, máy chủ, phần cứng); khách hàng chịu trách nhiệm bảo mật TRONG đám mây (hệ điều hành, bản vá, security group, IAM role, dữ liệu).',
        table: {
          headers: ['Bên chịu trách nhiệm', 'Hạng mục cụ thể'],
          rows: [
            ['AWS (Bảo mật CỦA đám mây)', 'Toàn bộ data center, hạ tầng vật lý, mạng toàn cầu, thay thế phần cứng hỏng, cách ly trên máy chủ vật lý, tuân thủ tiêu chuẩn quốc tế'],
            ['Khách hàng (Bảo mật TRONG đám mây)', 'Cấu hình quy tắc Security Group (ai được vào/ra), cài đặt và vá lỗi hệ điều hành (OS patches), phần mềm cài trên máy, gán đúng IAM Role, mã hóa và bảo mật dữ liệu']
          ]
        },
        keyPointsEn: [
          'AWS responsibility: data centers, physical servers, hardware replacement, physical isolation, global infrastructure.',
          'Customer responsibility: OS installation, OS updates and security patches, software/utilities, security group configuration, IAM role assignments, data security.'
        ],
        keyPointsVi: [
          'AWS chịu trách nhiệm: trung tâm dữ liệu, máy chủ vật lý, thay thế phần cứng hỏng, cách ly vật lý, hạ tầng đám mây.',
          'Khách hàng chịu trách nhiệm: cài đặt và cập nhật bản vá hệ điều hành (OS), phần mềm ứng dụng, quy tắc tường lửa Security Group, gán IAM Role đúng quyền, mã hóa dữ liệu.'
        ],
        isCore: true
      },
      {
        id: 'lec-49',
        number: 49,
        titleEn: 'EC2 Summary',
        titleVi: 'Tổng kết chuyên đề EC2',
        summaryEn: 'Comprehensive recap: EC2 instance formula, security groups, User Data bootstrapping, SSH, IAM roles, and purchasing options cheat sheet.',
        summaryVi: 'Ôn tập toàn diện: công thức tạo máy ảo EC2, cơ chế security group, script User Data, kết nối SSH, IAM role cho máy ảo và bảng tổng kết các lựa chọn mua.',
        keyPointsEn: [
          'EC2 instance = AMI (OS) + instance size (CPU/RAM) + storage + security groups + EC2 User Data.',
          'Security groups: firewall outside your instance; stateful; allow rules only; controls ports and IPs.',
          'EC2 User Data: bootstrap script run at the first launch of the instance.',
          'SSH: terminal access over port 22 (SSH, PuTTY, or EC2 Instance Connect).',
          'EC2 instance roles: attach IAM roles to instance instead of hardcoding access keys.',
          'Purchasing options: On-Demand (unpredictable), Spot (cheapest, failure-resilient, not for DB), Reserved/Savings Plans (steady state 1-3 yrs), Dedicated Hosts (licensing/compliance).'
        ],
        keyPointsVi: [
          'Công thức EC2 = AMI (hệ điều hành) + loại instance (CPU/RAM) + lưu trữ + security group + User Data.',
          'Security group: tường lửa nằm ngoài máy ảo, stateful, chỉ có rule allow, kiểm soát cổng và IP.',
          'EC2 User Data: script tự động chạy một lần duy nhất lúc khởi động đầu tiên với quyền root.',
          'SSH: mở terminal vào máy Linux qua cổng 22 (lệnh ssh, PuTTY, hoặc EC2 Instance Connect).',
          'EC2 instance role: luôn gán IAM role cho máy ảo, tuyệt đối không nhập access key vào máy.',
          'Mô hình giá thi hay hỏi: On-Demand (ngắn hạn), Spot (rẻ nhất tới 90%, có thể mất, không dùng cho DB), Reserved/Savings Plans (ổn định 1-3 năm), Dedicated Host (giấy phép theo socket/core).'
        ],
        isCore: true
      }
    ]
  },
  {
    id: 'section-6',
    sectionNumber: 6,
    titleEn: 'EC2 Instance Storage (EBS, EFS, Instance Store & FSx)',
    titleVi: 'Lưu trữ EC2: EBS, EFS, Instance Store & FSx',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'Storage Core',
    overviewEn: 'Section 6 covers five storage options for EC2. Exam favorites: EBS is tied to one AZ, Instance Store loses data when stopped, EFS is shared across many instances.',
    overviewVi: 'Section 6 giới thiệu 5 lựa chọn lưu trữ cho EC2. Điểm hay ra thi: EBS gắn theo 1 AZ, Instance Store mất dữ liệu khi stop/terminate, EFS dùng chung cho nhiều instance trên nhiều AZ.',
    quickExamFacts: [
      {
        en: 'EBS is network block drive tied to one AZ; one instance at a time (CCP level). To move AZs, take a snapshot!',
        vi: 'EBS là ổ block mạng gắn theo 1 AZ; 1 instance tại 1 thời điểm. Muốn chuyển sang AZ khác, chụp snapshot!',
        isCoreHighlight: true
      },
      {
        en: 'Instance Store is physical hardware disk on the server, extreme I/O, but EPHEMERAL (lost on stop/terminate)!',
        vi: 'Instance Store là ổ cứng phần cứng trên máy chủ vật lý, I/O cực cao, nhưng TẠM THỜI (mất dữ liệu khi stop/terminate)!',
        isCoreHighlight: true
      },
      {
        en: 'EFS is shared network file system (NFS) across multiple AZs for hundreds of Linux instances.',
        vi: 'EFS là hệ thống tệp mạng (NFS) dùng chung trên nhiều AZ trong Region cho hàng trăm máy Linux.',
        isCoreHighlight: true
      },
      {
        en: 'FSx for Windows = SMB, NTFS, Active Directory. FSx for Lustre = HPC, machine learning, extreme Linux performance.',
        vi: 'FSx for Windows = SMB, NTFS, Active Directory. FSx for Lustre = HPC, machine learning, Linux hiệu năng cực cao.',
        isCoreHighlight: true
      },
      {
        en: 'AMI (Amazon Machine Image) packages OS + software + config for fast launching of identical instances.',
        vi: 'AMI đóng gói sẵn OS + phần mềm + cấu hình giúp khởi chạy các máy ảo giống nhau cực nhanh.',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-50',
        number: 50,
        titleEn: 'EBS Overview',
        titleVi: 'Tổng quan ổ đĩa mạng EBS (Elastic Block Store)',
        summaryEn: 'EBS is a network drive you attach to EC2 instances so data persists even after termination. Think of it as a "network USB stick".',
        summaryVi: 'EBS (Elastic Block Store) là ổ đĩa mạng gắn vào EC2 để dữ liệu vẫn còn sau khi instance bị terminate. Hãy hình dung nó như một "USB mạng".',
        table: {
          headers: ['Thuộc tính', 'Đặc điểm của EBS Volume'],
          rows: [
            ['Bản chất', 'Ổ đĩa mạng (network drive), không phải đĩa vật lý trực tiếp'],
            ['Phạm vi', 'Bị gán chặt vào một Availability Zone (AZ) cụ thể'],
            ['Gắn vào máy', 'Ở mức CCP: 1 volume chỉ gắn vào 1 instance tại 1 thời điểm (1 instance gắn được nhiều volume)'],
            ['Cung cấp dung lượng', 'Phải chỉ định trước dung lượng (GB) và IOPS, thanh toán theo dung lượng đã provision'],
            ['Chuyển sang AZ khác', 'Chụp Snapshot rồi khôi phục thành Volume mới ở AZ đích'],
            ['Delete on Termination', 'Mặc định: Ổ root = BẬT (bị xóa khi terminate); Ổ gắn thêm = TẮT (được giữ lại)']
          ]
        },
        keyPointsEn: [
          'EBS is a network drive, not a physical disk; can be detached and re-attached quickly for failover.',
          'Locked to a single Availability Zone (AZ): volume in us-east-1a cannot directly attach to instance in us-east-1b.',
          'Capacity must be provisioned in advance (GB and IOPS) and can be increased later.',
          'Delete on Termination: controls what happens when instance is terminated. Default: root volume deleted, additional volumes preserved.'
        ],
        keyPointsVi: [
          'EBS là ổ đĩa mạng, không phải đĩa vật lý; có thể tháo và gắn sang instance khác rất nhanh (hữu ích cho failover).',
          'Bị gán chặt vào 1 AZ cụ thể: volume ở us-east-1a không thể gắn vào máy ở us-east-1b.',
          'Dung lượng và IOPS phải được provision trước và trả tiền theo mức đã đặt trước này.',
          'Delete on Termination: kiểm soát việc xóa đĩa khi máy bị terminate. Mặc định ổ root bị xóa, ổ gắn thêm được giữ lại.'
        ],
        isCore: true
      },
      {
        id: 'lec-51',
        number: 51,
        titleEn: 'About EBS Multi-Attach',
        titleVi: 'Tìm hiểu về tính năng EBS Multi-Attach',
        summaryEn: 'Short reading: EBS volume types io1 and io2 support EBS Multi-Attach, allowing one volume to attach to multiple instances simultaneously.',
        summaryVi: 'Bài đọc ngắn: Các loại volume io1 và io2 hỗ trợ EBS Multi-Attach, cho phép gắn 1 volume vào nhiều instance cùng lúc trong cùng AZ.',
        keyPointsEn: [
          'Available on io1 and io2 Family (Provisioned IOPS SSD).',
          'Allows attaching a single volume to multiple EC2 instances within the same AZ.',
          'Out of scope for the AWS Cloud Practitioner (CLF-C02) exam (covered in Solutions Architect Associate).'
        ],
        keyPointsVi: [
          'Chỉ hỗ trợ trên các loại volume io1 và io2 (Provisioned IOPS SSD).',
          'Cho phép gắn 1 volume vào nhiều EC2 instance trong cùng một Availability Zone.',
          'Tính năng nâng cao nằm ngoài phạm vi kỳ thi Cloud Practitioner (được học ở Solutions Architect Associate).'
        ]
      },
      {
        id: 'lec-52',
        number: 52,
        titleEn: 'EBS Hands On',
        titleVi: 'Thực hành tạo, gắn và kiểm tra EBS Volume',
        summaryEn: 'Console demo showing volume creation, attaching to instance in the same AZ, AZ-bound constraint, and Delete on Termination behavior.',
        summaryVi: 'Thực hành tạo volume, gắn vào instance cùng AZ, chứng minh không gắn được sang AZ khác và quan sát cơ chế Delete on Termination.',
        keyPointsEn: [
          'Created second volume gp2 (2 GB) in the same AZ (eu-west-1b): attached successfully.',
          'Created third volume in a different AZ (eu-west-1a): cannot attach to instance, proving EBS is AZ-bound.',
          'Delete on Termination: root volume deleted upon termination, additional 2 GB volume becomes available and is preserved.'
        ],
        keyPointsVi: [
          'Tạo volume thứ hai (2 GB) ở cùng AZ với instance: gắn thành công vào máy ảo.',
          'Tạo volume thứ ba ở AZ khác: không thể chọn máy ảo để gắn, chứng minh EBS bị khóa theo AZ.',
          'Khi terminate máy ảo: ổ root 8 GB bị xóa theo; ổ phụ 2 GB chuyển sang trạng thái available và được giữ lại.'
        ]
      },
      {
        id: 'lec-53',
        number: 53,
        titleEn: 'EBS Snapshots Overview',
        titleVi: 'Tổng quan về EBS Snapshots & Sao lưu',
        summaryEn: 'A snapshot is a point-in-time backup of an EBS volume stored on Amazon S3. Used to back up or move volumes across AZs and Regions.',
        summaryVi: 'Snapshot là bản sao lưu tại một thời điểm của EBS volume được lưu trên S3. Dùng để backup hoặc chuyển dữ liệu sang AZ/Region khác.',
        table: {
          headers: ['Tính năng Snapshot', 'Mô tả chi tiết', 'Lợi ích'],
          rows: [
            ['Chuyển AZ bằng Snapshot', 'Chụp Snapshot ổ ở AZ 1a -> Khôi phục thành Volume mới ở AZ 1b -> Gắn vào máy ở 1b', 'Di chuyển dữ liệu giữa các vùng khả dụng'],
            ['Copy sang Region khác', 'Copy snapshot sang Region bất kỳ qua hạ tầng AWS toàn cầu', 'Chiến lược khắc phục thảm họa (Disaster Recovery)'],
            ['EBS Snapshot Archive', 'Chuyển snapshot ít dùng sang tầng lưu trữ lưu trữ archive rẻ hơn ~75%', 'Tiết kiệm chi phí (thời gian khôi phục 24-72h)'],
            ['Recycle Bin (Thùng rác)', 'Bảo vệ snapshot và AMI khỏi bị xóa nhầm, giữ từ 1 ngày đến 1 năm', 'Khôi phục lại tài nguyên bị xóa sơ ý']
          ]
        },
        keyPointsEn: [
          'Snapshots are incremental point-in-time backups stored on Amazon S3.',
          'Do not need to detach volume to snapshot, but recommended to stop instance for clean state.',
          'Move volume across AZs: snapshot in AZ-a -> restore new volume in AZ-b.',
          'EBS Snapshot Archive: 75% cheaper archive tier (restoring takes 24-72 hours).',
          'Recycle Bin: protects snapshots and AMIs from accidental deletion with retention rules (1 day to 1 year).'
        ],
        keyPointsVi: [
          'Snapshot là bản sao lưu tăng dần (incremental) tại thời điểm của EBS volume, lưu trữ trên S3.',
          'Không bắt buộc tháo ổ trước khi chụp, nhưng nên stop instance để dữ liệu toàn vẹn.',
          'Quy trình chuyển AZ: chụp snapshot ở AZ 1a -> khôi phục thành volume mới ở AZ 1b.',
          'EBS Snapshot Archive: tầng lưu trữ rẻ hơn khoảng 75% cho snapshot hiếm khi khôi phục gấp (mất 24-72h).',
          'Recycle Bin: bảo vệ snapshot và AMI khỏi xóa nhầm, cho phép khôi phục trong thời gian lưu giữ (1 ngày đến 1 năm).'
        ],
        isCore: true
      },
      {
        id: 'lec-54',
        number: 54,
        titleEn: 'EBS Snapshots Hands On',
        titleVi: 'Thực hành tạo Snapshot, khôi phục sang AZ khác & Recycle Bin',
        summaryEn: 'Hands on: create snapshot of 2 GB volume, simulate copy to another Region, restore into different AZ, and test Recycle Bin recovery.',
        summaryVi: 'Thực hành tạo snapshot volume 2 GB, xem tùy chọn copy sang Region khác, khôi phục sang AZ khác và thử nghiệm phục hồi từ Recycle Bin.',
        keyPointsEn: [
          'Create snapshot: status completes at 100%.',
          'Create volume from snapshot: choose target AZ (eu-west-1a -> eu-west-1b), enable encryption if needed.',
          'Recycle Bin: create retention rule for EBS Snapshots, delete snapshot, and recover from Recycle Bin.',
          'Storage Tier: can change tier to Archive for long-term cold backup.'
        ],
        keyPointsVi: [
          'Tạo snapshot: trạng thái chuyển sang 100% completed.',
          'Tạo volume từ snapshot: chọn AZ đích khác với AZ ban đầu, có thể bật mã hóa.',
          'Recycle Bin: tạo retention rule cho EBS Snapshots, xóa snapshot và nhấn Recover để phục hồi lại.',
          'Tầng lưu trữ: có thể chuyển sang Archive cho bản sao lưu nguội dài hạn.'
        ]
      },
      {
        id: 'lec-55',
        number: 55,
        titleEn: 'AMI Overview (Amazon Machine Image)',
        titleVi: 'Tổng quan về AMI (Amazon Machine Image)',
        summaryEn: 'An AMI represents a customized EC2 image (OS, software, config). Every EC2 instance launches from an AMI.',
        summaryVi: 'AMI là "ảnh máy" đại diện cho một phiên bản EC2 đã tùy biến (hệ điều hành, phần mềm, cấu hình). Mọi EC2 instance đều khởi chạy từ một AMI.',
        table: {
          headers: ['Nguồn AMI', 'Mô tả', 'Trường hợp sử dụng'],
          rows: [
            ['Public AMI', 'Do AWS cung cấp sẵn (ví dụ: Amazon Linux 2, Ubuntu)', 'Khởi tạo nhanh môi trường chuẩn của AWS'],
            ['Your own AMI (Tự tạo)', 'Do bạn tự cài đặt, tùy biến phần mềm và lưu lại', 'Đóng gói ứng dụng riêng của công ty, rút ngắn thời gian boot'],
            ['AWS Marketplace AMI', 'Do bên thứ ba phát triển và bán (hoặc miễn phí)', 'Các phần mềm thương mại cài sẵn (cơ sở dữ liệu, firewall, CMS)']
          ]
        },
        keyPointsEn: [
          'AMI contains OS, pre-installed software, configuration, and monitoring tools.',
          'Faster boot and configuration time because prerequisites are already baked in.',
          'Built for a specific Region and can be copied across Regions.',
          'Creating an AMI automatically creates underlying EBS snapshots.'
        ],
        keyPointsVi: [
          'AMI đóng gói sẵn hệ điều hành, phần mềm, cấu hình và công cụ giám sát.',
          'Rút ngắn thời gian khởi động máy ảo vì phần mềm đã được cài sẵn (baked in).',
          'Được xây dựng cho một Region cụ thể và có thể copy sang Region khác.',
          'Khi tạo AMI từ một instance, AWS tự động tạo EBS snapshot cho các ổ đĩa của instance đó.'
        ],
        isCore: true
      },
      {
        id: 'lec-56',
        number: 56,
        titleEn: 'AMI Hands On',
        titleVi: 'Thực hành tạo Custom AMI từ web server Apache',
        summaryEn: 'Build custom AMI (DemoImage) from instance with Apache pre-installed, launch a new instance from it, and observe faster boot time.',
        summaryVi: 'Tạo custom AMI từ instance đã cài sẵn Apache, khởi chạy instance mới từ AMI đó và thấy thời gian khởi động nhanh hơn rõ rệt.',
        keyPointsEn: [
          'Launch base instance -> install Apache HTTPD via user data -> test web page.',
          'Create image: Actions -> Image and templates -> Create image (name DemoImage).',
          'Launch instance from AMI: software is already installed, user data only needs to write custom HTML.',
          'Clean up: terminate instances, deregister AMI, and delete snapshots.'
        ],
        keyPointsVi: [
          'Khởi chạy instance gốc -> cài Apache HTTPD -> kiểm tra website hoạt động.',
          'Tạo ảnh máy: Actions -> Image and templates -> Create image (đặt tên DemoImage).',
          'Khởi chạy từ AMI: phần mềm đã có sẵn, user data chỉ cần ghi nội dung HTML là chạy ngay.',
          'Quy trình dọn dẹp: terminate instance -> deregister AMI -> xóa snapshot.'
        ]
      },
      {
        id: 'lec-57',
        number: 57,
        titleEn: 'EC2 Image Builder Overview',
        titleVi: 'Tự động hóa với EC2 Image Builder',
        summaryEn: 'Automates the creation, maintenance, validation, testing, and distribution of AMIs and container images.',
        summaryVi: 'Dịch vụ tự động hóa việc tạo, bảo trì, xác thực, kiểm thử và phân phối AMI (hoặc container image).',
        keyPointsEn: [
          'Workflow: Builder EC2 instance installs software -> creates AMI -> Test EC2 instance validates -> distributes to multiple Regions.',
          'Can run on a schedule (e.g. weekly), on OS updates, or manually.',
          'The service itself is FREE; you only pay for underlying compute instances and storage used during creation.'
        ],
        keyPointsVi: [
          'Quy trình tự động: Tạo Builder EC2 cài phần mềm -> tạo AMI -> tạo Test EC2 kiểm thử bảo mật -> phân phối sang nhiều Region.',
          'Có thể chạy theo lịch định kỳ (hàng tuần), khi có bản vá hệ điều hành hoặc chạy thủ công.',
          'Bản thân dịch vụ hoàn toàn MIỄN PHÍ; bạn chỉ trả tiền cho các instance tạm và lưu trữ phát sinh trong quá trình build.'
        ],
        isCore: true
      },
      {
        id: 'lec-58',
        number: 58,
        titleEn: 'EC2 Instance Store',
        titleVi: 'EC2 Instance Store (Ổ cứng phần cứng tốc độ cao)',
        summaryEn: 'Physical hardware disk attached to the host server. Extreme I/O performance, but EPHEMERAL (data is lost on stop/terminate).',
        summaryVi: 'Ổ cứng vật lý gắn trực tiếp vào máy chủ vật lý chạy EC2. Hiệu suất I/O cực cao nhưng là lưu trữ tạm thời (mất dữ liệu khi stop/terminate).',
        table: {
          headers: ['Đặc điểm so sánh', 'EC2 Instance Store', 'Amazon EBS'],
          rows: [
            ['Bản chất', 'Ổ cứng vật lý gắn trên máy chủ phần cứng', 'Ổ đĩa mạng (network drive)'],
            ['Hiệu suất I/O', 'Cực cao (hàng triệu IOPS, thông lượng cực lớn)', 'Giới hạn theo gói (khoảng hàng chục nghìn IOPS)'],
            ['Tính bền vững (Persistence)', 'TẠM THỜI: Mất dữ liệu khi STOP hoặc TERMINATE', 'BỀN VỮNG: Giữ dữ liệu khi STOP hoặc TERMINATE'],
            ['Khắc phục sự cố phần cứng', 'Máy chủ hỏng -> mất toàn bộ dữ liệu trên ổ', 'AWS tự sao chép dữ liệu trên nhiều phần cứng'],
            ['Mục đích sử dụng tối ưu', 'Bộ đệm (buffer), cache, dữ liệu tạm thời, scratch pad', 'Lưu trữ hệ điều hành gốc, CSDL, dữ liệu cần giữ lâu dài']
          ]
        },
        keyPointsEn: [
          'Instance Store is a hardware disk physically attached to the host server running the instance.',
          'Data is LOST when the instance is stopped or terminated (ephemeral storage).',
          'Good for buffers, caches, and temporary scratch content where data can be regenerated.',
          'Customer is 100% responsible for backups and replication if using Instance Store.',
          'Exam keyword: "very high-performance disk attached to the hardware" -> EC2 Instance Store.'
        ],
        keyPointsVi: [
          'Instance Store là ổ cứng phần cứng vật lý gắn trực tiếp trên máy chủ chứa máy ảo.',
          'Dữ liệu BỊ MẤT khi máy ảo bị stop hoặc terminate (lưu trữ tạm thời - ephemeral storage).',
          'Phù hợp cho bộ nhớ đệm (buffer), cache, dữ liệu xử lý tạm thời có thể tạo lại được.',
          'Khách hàng tự chịu trách nhiệm 100% về sao lưu và nhân bản dữ liệu.',
          'Từ khóa vàng trong đề thi: "ổ đĩa hiệu suất cực cao gắn vào phần cứng" -> chọn EC2 Instance Store.'
        ],
        isCore: true
      },
      {
        id: 'lec-59',
        number: 59,
        titleEn: 'EFS Overview (Elastic File System)',
        titleVi: 'Amazon EFS - Hệ thống tệp mạng dùng chung',
        summaryEn: 'Managed network file system (NFS) mountable on hundreds of Linux instances simultaneously across multiple AZs in a Region.',
        summaryVi: 'Hệ thống tệp mạng (NFS) được quản lý, có thể mount vào hàng trăm EC2 instance cùng lúc trên nhiều AZ trong một Region.',
        table: {
          headers: ['Tiêu chí so sánh', 'Amazon EBS', 'Amazon EFS'],
          rows: [
            ['Gắn vào instance', '1 instance tại 1 thời điểm (ở mức CCP)', 'Hàng trăm instance cùng một lúc'],
            ['Phạm vi hoạt động', 'Gắn với 1 Availability Zone duy nhất', 'Đa vùng (Multi-AZ) trong toàn bộ Region'],
            ['Hệ điều hành hỗ trợ', 'Linux, Windows, macOS', 'CHỈ hỗ trợ Linux (giao thức NFSv4)'],
            ['Cách tính phí dung lượng', 'Provision trước dung lượng (đặt 100 GB trả 100 GB)', 'Pay per use (lưu bao nhiêu GB trả bấy nhiêu GB, tự co giãn)'],
            ['Chi phí tương đối', 'Rẻ hơn (chuẩn cơ bản gp2/gp3)', 'Khoảng gấp 3 lần EBS gp2'],
            ['Chia sẻ tệp đồng thời', 'Không thể chia sẻ tệp giữa các máy', 'Có: mọi máy đều đọc/ghi trên cùng cây thư mục tệp']
          ]
        },
        keyPointsEn: [
          'Linux instances only; multi-AZ service (regional, not tied to a single AZ).',
          'Highly available, scalable, pay per use: no capacity provisioning needed.',
          'Instances in us-east-1a, 1b, and 1c all mount the same EFS file system.',
          'EFS-IA (Infrequent Access): cost-optimized tier up to 92% cheaper for files not accessed in X days (managed by lifecycle policy).'
        ],
        keyPointsVi: [
          'Chỉ dành cho instance Linux (dùng giao thức NFS); dịch vụ cấp Regional hoạt động trên nhiều AZ.',
          'Tính sẵn sàng cao, tự động mở rộng, trả theo mức dùng thực tế (không cần lập kế hoạch dung lượng).',
          'Các máy ảo ở AZ us-east-1a, 1b, 1c đều mount chung một file system EFS.',
          'EFS-IA (Infrequent Access): tầng lưu trữ rẻ hơn tới 92% cho tệp ít truy cập, tự chuyển tệp qua Lifecycle Policy.'
        ],
        isCore: true
      },
      {
        id: 'lec-60',
        number: 60,
        titleEn: 'Shared Responsibility Model for EC2 Storage',
        titleVi: 'Mô hình trách nhiệm chung cho lưu trữ EC2',
        summaryEn: 'AWS is responsible for infrastructure and disk replication; customer is responsible for backups, snapshots, encryption, and Instance Store risk.',
        summaryVi: 'AWS lo hạ tầng và nhân bản phần cứng; khách hàng lo quy trình sao lưu, mã hóa và quản lý rủi ro mất dữ liệu trên Instance Store.',
        table: {
          headers: ['Bên chịu trách nhiệm', 'Hạng mục bảo mật & lưu trữ'],
          rows: [
            ['AWS chịu trách nhiệm', 'Hạ tầng lưu trữ; sao chép dữ liệu trên nhiều thiết bị phần cứng (EBS, EFS); thay thế ổ đĩa hỏng; ngăn chặn nhân viên AWS truy cập dữ liệu khách hàng'],
            ['Khách hàng chịu trách nhiệm', 'Thiết lập quy trình sao lưu (backup) và snapshot định kỳ; bật mã hóa dữ liệu (encryption); dữ liệu ghi lên ổ; hiểu rủi ro mất dữ liệu trên Instance Store để tự sao lưu']
          ]
        },
        keyPointsEn: [
          'AWS responsibility: storage infrastructure, hardware replication (EBS/EFS), faulty disk replacement.',
          'Customer responsibility: backup/snapshot procedures, data encryption, data on disk, managing Instance Store ephemeral risk.'
        ],
        keyPointsVi: [
          'AWS chịu trách nhiệm: hạ tầng lưu trữ, nhân bản dữ liệu qua nhiều phần cứng, thay thế đĩa hỏng.',
          'Khách hàng chịu trách nhiệm: thiết lập quy trình backup/snapshot, bật mã hóa dữ liệu, rà soát rủi ro mất dữ liệu của Instance Store.'
        ],
        isCore: true
      },
      {
        id: 'lec-61',
        number: 61,
        titleEn: 'Amazon FSx Overview (FSx for Windows & FSx for Lustre)',
        titleVi: 'Tổng quan Amazon FSx (Windows File Server & Lustre)',
        summaryEn: 'Managed high-performance third-party file systems on AWS. Two key offerings: FSx for Windows (SMB, AD) and FSx for Lustre (HPC, Linux).',
        summaryVi: 'Dịch vụ quản lý hệ thống tệp hiệu suất cao của bên thứ ba trên AWS. Hai loại quan trọng cho kỳ thi: FSx for Windows File Server và FSx for Lustre.',
        table: {
          headers: ['Loại FSx', 'Giao thức & Đặc điểm', 'Trường hợp sử dụng điển hình', 'Mẹo thi (Exam Keywords)'],
          rows: [
            ['FSx for Windows File Server', 'Hệ thống tệp Windows gốc, hỗ trợ SMB, NTFS, tích hợp Microsoft Active Directory, Multi-AZ', 'Chia sẻ tệp cho các máy chủ Windows, ứng dụng doanh nghiệp Microsoft', '"Windows file share", "SMB", "NTFS", "Active Directory" -> Chọn FSx for Windows'],
            ['FSx for Lustre', 'Lưu trữ tệp Linux cụm (Lustre = Linux + Cluster), thông lượng hàng trăm GB/s, hàng triệu IOPS, kết nối S3', 'Tính toán hiệu năng cao (HPC), máy học (ML), xử lý video, phân tích tài chính', '"High Performance Computing", "HPC", "Machine Learning", "Linux cluster" -> Chọn FSx for Lustre']
          ]
        },
        keyPointsEn: [
          'FSx for Windows: fully managed native Windows shared file system (SMB, NTFS, Active Directory integration).',
          'FSx for Lustre: high performance file storage for High Performance Computing (HPC), ML, financial modeling.',
          'Exam tips: "Windows / SMB / Active Directory" -> FSx for Windows; "Storage for HPC" -> FSx for Lustre.'
        ],
        keyPointsVi: [
          'FSx for Windows File Server: hệ thống tệp chia sẻ gốc Windows (SMB, NTFS, tích hợp Active Directory).',
          'FSx for Lustre: lưu trữ tệp hiệu năng cực cao cho HPC, machine learning, phân tích dữ liệu lớn.',
          'Mẹo thi: Thấy Windows / SMB / Active Directory -> Chọn FSx for Windows; Thấy tính toán hiệu năng cao HPC -> Chọn FSx for Lustre.'
        ],
        isCore: true
      },
      {
        id: 'lec-62',
        number: 62,
        titleEn: 'EC2 Instance Storage Summary',
        titleVi: 'Tổng kết các giải pháp lưu trữ cho EC2',
        summaryEn: 'Comprehensive comparison: EBS (AZ-bound block), AMI (custom image), Instance Store (ephemeral hardware), EFS (multi-AZ Linux NFS), FSx (Windows & HPC).',
        summaryVi: 'Bảng tổng kết toàn diện 5 giải pháp lưu trữ: EBS (ổ block theo AZ), AMI (ảnh máy), Instance Store (phần cứng tạm thời), EFS (NFS Linux đa AZ), FSx (Windows & HPC).',
        keyPointsEn: [
          'EBS: network drive attached to 1 instance at a time in 1 AZ. Move using snapshots.',
          'AMI: customized image to launch instances fast. EC2 Image Builder automates creation.',
          'EC2 Instance Store: very high-performance hardware disk, but lost on stop or termination.',
          'EFS: multi-AZ network file system for hundreds of Linux instances. EFS-IA for cost saving.',
          'FSx: FSx for Windows (SMB/AD) and FSx for Lustre (HPC Linux).'
        ],
        keyPointsVi: [
          'EBS: ổ đĩa mạng gắn vào 1 instance tại 1 thời điểm ở 1 AZ. Chuyển vùng bằng snapshot.',
          'AMI: ảnh máy tùy biến để khởi chạy instance nhanh chóng. EC2 Image Builder tự động hóa quy trình.',
          'EC2 Instance Store: ổ phần cứng tốc độ cực cao, nhưng mất dữ liệu khi stop hoặc terminate.',
          'EFS: hệ thống tệp mạng đa vùng (Multi-AZ) cho hàng trăm máy Linux. Có tầng EFS-IA tiết kiệm chi phí.',
          'FSx: FSx for Windows (SMB/Active Directory) và FSx for Lustre (tính toán hiệu năng cao HPC).'
        ],
        isCore: true
      },
      {
        id: 'lec-63',
        number: 63,
        titleEn: 'Section Cleanup',
        titleVi: 'Hướng dẫn dọn dẹp tài nguyên Section 6',
        summaryEn: 'Clean up all resources to avoid any charges: terminate EC2 instances, delete EBS volumes, deregister AMIs, and delete snapshots.',
        summaryVi: 'Dọn dẹp tài nguyên đã tạo trong Section để tránh phát sinh chi phí: terminate instance, xóa volume EBS, hủy đăng ký AMI và xóa snapshot.',
        keyPointsEn: [
          'Instances: select all and terminate.',
          'Volumes: root deleted automatically; manually delete any remaining EBS volumes.',
          'Snapshots: must deregister AMI first before deleting associated snapshot.',
          'Key pairs and security groups cost nothing and can stay.'
        ],
        keyPointsVi: [
          'Instance: chọn tất cả và bấm Terminate.',
          'Volume: ổ root tự xóa; xóa thủ công các volume EBS gắn thêm còn lại.',
          'Snapshot: bắt buộc phải hủy đăng ký (deregister) AMI trước khi xóa snapshot gắn với AMI đó.',
          'Key pair và Security Group hoàn toàn miễn phí nên có thể giữ lại.'
        ]
      }
    ]
  },
  {
    id: 'section-7',
    sectionNumber: 7,
    titleEn: 'ELB & ASG: Elastic Load Balancing & Auto Scaling',
    titleVi: 'Cân bằng tải ELB & Tự động mở rộng ASG',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'Scalability Core',
    overviewEn: 'Section 7 shows the power of the AWS cloud: how load balancers and Auto Scaling Groups make applications scale seamlessly and stay highly available.',
    overviewVi: 'Section 7 cho thấy sức mạnh của AWS cloud: load balancer và Auto Scaling Group giúp ứng dụng mở rộng liền mạch và luôn sẵn sàng cao.',
    quickExamFacts: [
      {
        en: 'Vertical = bigger instance (scale up/down); horizontal = more instances (scale out/in); high availability = at least 2 AZs; elasticity = auto scale with load; agility is a distractor.',
        vi: 'Dọc = instance lớn hơn (scale up/down); ngang = nhiều instance hơn (scale out/in); sẵn sàng cao = ít nhất 2 AZ; elasticity = tự co giãn theo tải; agility là đáp án gây nhiễu.',
        isCoreHighlight: true
      },
      {
        en: 'ALB = Layer 7 (HTTP/HTTPS/gRPC); NLB = Layer 4 (TCP/UDP, very high performance, static IP); GWLB = Layer 3 (firewalls/appliances); CLB retired.',
        vi: 'ALB = tầng 7 (HTTP/HTTPS/gRPC); NLB = tầng 4 (TCP/UDP, hiệu suất rất cao, IP tĩnh); GWLB = tầng 3 (tường lửa/thiết bị ảo); CLB đã ngừng.',
        isCoreHighlight: true
      },
      {
        en: 'ASG: min / desired / max capacity; replaces unhealthy instances; integrates tightly with the load balancer.',
        vi: 'ASG: min / desired / max capacity; tự động thay thế instance không khỏe; tích hợp chặt chẽ với load balancer.',
        isCoreHighlight: true
      },
      {
        en: 'Scaling strategies: manual, dynamic (simple/step, target tracking), scheduled, predictive (uses Machine Learning to forecast and pre-provision).',
        vi: 'Chiến lược scaling: thủ công, động (simple/step, target tracking), theo lịch, predictive (dùng Machine Learning để dự báo và chuẩn bị máy trước).',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-64',
        number: 64,
        titleEn: 'High Availability, Scalability, Elasticity',
        titleVi: 'Tính sẵn sàng cao, Khả năng mở rộng & Co giãn (HA, Scalability, Elasticity)',
        summaryEn: 'Scalability (vertical vs horizontal) vs High Availability (multi-AZ) vs Elasticity vs Agility definitions and analogies.',
        summaryVi: 'Phân biệt mở rộng dọc, mở rộng ngang, tính sẵn sàng cao, tính co giãn (elasticity) và độ nhanh nhạy (agility) qua ví dụ trung tâm cuộc gọi.',
        table: {
          headers: ['Thuật ngữ', 'Ý nghĩa cốt lõi', 'Ví dụ / Thuật ngữ liên quan'],
          rows: [
            ['Vertical Scalability (Mở rộng dọc)', 'Tăng hoặc giảm kích thước (CPU/RAM) của một instance', 'Scale up (lớn hơn: t2.micro -> t2.large) / Scale down (nhỏ hơn). Thường dùng cho CSDL không phân tán'],
            ['Horizontal Scalability (Mở rộng ngang)', 'Tăng hoặc giảm số lượng instance/hệ thống', 'Scale out (thêm máy) / Scale in (bớt máy). Rất phổ biến cho ứng dụng web phân tán'],
            ['High Availability (Sẵn sàng cao)', 'Chạy ứng dụng trên ÍT NHẤT 2 Availability Zones (AZ) để sống sót khi mất 1 data center', 'Đi đôi với mở rộng ngang: ASG đa AZ, load balancer đa AZ'],
            ['Elasticity (Tính co giãn)', 'Hệ thống TỰ ĐỘNG co giãn lên xuống theo nhu cầu thực tế của tải, trả tiền theo mức dùng', 'Khái niệm cốt lõi của cloud: tiết kiệm chi phí, không lãng phí tài nguyên thừa'],
            ['Agility (Độ nhanh nhạy)', 'Khả năng cấp phát hoặc hủy tài nguyên CNTT chỉ với 1 cú nhấp chuột (vài phút thay vì vài tuần)', 'Đáp án gây nhiễu trong câu hỏi về scalability/elasticity']
          ]
        },
        keyPointsEn: [
          'Vertical scalability: increase the size of an instance (scale up/down). Common for non-distributed systems (databases).',
          'Horizontal scalability: increase the number of instances (scale out/in). Common for distributed web apps.',
          'High availability: run applications across AT LEAST TWO Availability Zones to survive data center loss.',
          'Elasticity: ability to auto-scale up and down based on demand; pay per use.',
          'Agility: cloud concept that helps you innovate faster because IT resources are available in minutes (distractor for scaling questions).'
        ],
        keyPointsVi: [
          'Mở rộng dọc (Vertical): tăng kích thước máy ảo (scale up / scale down), ví dụ từ t2.micro lên t2.large. Phù hợp cho database.',
          'Mở rộng ngang (Horizontal): tăng số lượng máy ảo (scale out / scale in). Phù hợp cho ứng dụng web hiện đại.',
          'Sẵn sàng cao (High Availability): chạy ứng dụng trên ít nhất 2 Availability Zones để chống sập khi 1 data center mất điện/thiên tai.',
          'Elasticity (Tính co giãn): tự động tăng giảm số lượng máy ảo theo lưu lượng thực tế để tối ưu chi phí.',
          'Agility: tạo và xóa máy trong vài phút thay vì vài tuần mua sắm phần cứng (chú ý: agility là đáp án gây nhiễu trong câu hỏi về co giãn).'
        ],
        isCore: true
      },
      {
        id: 'lec-65',
        number: 65,
        titleEn: 'Elastic Load Balancing (ELB) Overview',
        titleVi: 'Tổng quan Elastic Load Balancer (ELB)',
        summaryEn: 'A managed service that distributes incoming traffic across multiple downstream EC2 instances across multiple AZs and conducts health checks.',
        summaryVi: 'Dịch vụ phân phối lưu lượng truy cập tới nhiều EC2 instance phía sau trên nhiều AZ, kiểm tra sức khỏe health check và cung cấp 1 DNS URL duy nhất.',
        table: {
          headers: ['Loại Load Balancer', 'Tầng mạng', 'Giao thức', 'Đặc điểm chính & Từ khóa thi'],
          rows: [
            ['Application Load Balancer (ALB)', 'Tầng 7 (Application)', 'HTTP, HTTPS, gRPC', 'Định tuyến thông minh theo URL/path, URL DNS tĩnh, tối ưu cho ứng dụng web'],
            ['Network Load Balancer (NLB)', 'Tầng 4 (Transport)', 'TCP, UDP, TLS', 'Hiệu suất cực cao (hàng triệu req/sec), độ trễ siêu thấp, hỗ trợ IP TĨNH (Elastic IP)'],
            ['Gateway Load Balancer (GWLB)', 'Tầng 3 (Network)', 'GENEVE protocol', 'Định tuyến lưu lượng qua các thiết bị mạng ảo của bên thứ ba (Firewall, IDS/IPS, kiểm tra gói sâu)'],
            ['Classic Load Balancer (CLB)', 'Tầng 4 & 7', 'Thế hệ cũ', 'Đã ngừng hoạt động từ năm 2023, thay thế hoàn toàn bằng ALB và NLB']
          ]
        },
        keyPointsEn: [
          'ELB is a managed load balancer: AWS handles upgrades, maintenance, and high availability.',
          'Exposes a single point of access (DNS name) for your application; supports SSL termination (HTTPS).',
          'Conducts health checks on downstream instances and automatically stops sending traffic to unhealthy ones.',
          'Exam keywords: HTTP/HTTPS/gRPC, URL routing -> ALB; TCP/UDP, extreme performance, static IP -> NLB; Virtual firewalls/appliances -> GWLB.'
        ],
        keyPointsVi: [
          'ELB là dịch vụ được AWS quản lý toàn diện: tự động nâng cấp, bảo trì và đảm bảo tính sẵn sàng cao.',
          'Cung cấp một điểm truy cập duy nhất (tên miền DNS) cho ứng dụng; hỗ trợ chứng chỉ SSL (HTTPS).',
          'Thực hiện Health Check định kỳ và tự động ngừng chuyển tiếp lưu lượng tới instance không khỏe mạnh.',
          'Từ khóa thi: HTTP/HTTPS/gRPC, định tuyến URL -> chọn ALB; TCP/UDP, hiệu suất cực cao, IP tĩnh -> chọn NLB; Tường lửa ảo/IDS/IPS -> chọn GWLB.'
        ],
        isCore: true
      },
      {
        id: 'lec-66',
        number: 66,
        titleEn: 'Application Load Balancer (ALB) Hands On',
        titleVi: 'Thực hành tạo và kiểm tra Application Load Balancer',
        summaryEn: 'Launch two EC2 instances with web servers, deploy an internet-facing ALB with target group across AZs, and observe round-robin load balancing and health checks.',
        summaryVi: 'Khởi chạy 2 EC2 web server, tạo ALB internet-facing qua các AZ, cấu hình target group và quan sát lưu lượng luân phiên giữa 2 máy cùng cơ chế health check.',
        keyPointsEn: [
          'Create ALB: internet-facing, deployed across ALL Availability Zones in the VPC.',
          'Target Group (demo-tg-alb): groups instances on HTTP port 80 with health checks configured.',
          'Test DNS name in browser: refreshing alternates responses between Instance 1 and Instance 2 (round-robin load balancing).',
          'Health check test: stopping instance 1 causes it to become unhealthy in target group; ALB automatically routes all traffic to healthy instance 2.'
        ],
        keyPointsVi: [
          'Tạo ALB: loại internet-facing, triển khai qua TẤT CẢ các Availability Zone trong VPC.',
          'Target Group (demo-tg-alb): nhóm các EC2 instance lại trên cổng HTTP 80 với cấu hình kiểm tra sức khỏe.',
          'Thử nghiệm: truy cập tên miền DNS của ALB trên trình duyệt, làm mới liên tục thấy phản hồi luân phiên giữa Máy 1 và Máy 2.',
          'Thử nghiệm Health Check: dừng Máy 1 -> sau 30s ALB đánh dấu unhealthy và tự động chuyển toàn bộ truy cập sang Máy 2 còn sống.'
        ]
      },
      {
        id: 'lec-67',
        number: 67,
        titleEn: 'Auto Scaling Groups (ASG) Overview',
        titleVi: 'Tổng quan Auto Scaling Groups (ASG)',
        summaryEn: 'ASG automatically adds (scales out) and removes (scales in) EC2 instances to match demand, enforcing min/desired/max capacity and replacing unhealthy instances.',
        summaryVi: 'ASG tự động thêm máy (scale out) khi tải tăng và bớt máy (scale in) khi tải giảm, đảm bảo số máy min/desired/max và tự thay thế máy hỏng.',
        table: {
          headers: ['Thông số dung lượng', 'Ý nghĩa', 'Ví dụ thực tế'],
          rows: [
            ['Minimum Size (Tối thiểu)', 'Số lượng instance ít nhất luôn phải chạy, không bao giờ giảm xuống dưới mức này', 'Min = 1 (đảm bảo luôn có ít nhất 1 máy phục vụ khách)'],
            ['Desired Capacity (Mong muốn)', 'Số lượng instance mục tiêu hiện tại hệ thống đang duy trì', 'Desired = 2 (tải bình thường chạy 2 máy)'],
            ['Maximum Size (Tối đa)', 'Số lượng instance nhiều nhất mà ASG được phép mở rộng ra khi quá tải', 'Max = 4 hoặc 10 (chặn chi phí không vượt quá ngân sách)']
          ]
        },
        keyPointsEn: [
          'Scale out: add EC2 instances when load increases. Scale in: remove instances when load decreases.',
          'Maintains min, desired, and max capacity settings.',
          'Automatically registers new instances to the load balancer target group and deregisters removed ones.',
          'Replaces unhealthy instances automatically: detects failure, terminates bad instance, launches a healthy replacement.',
          'Realizes elasticity to optimize cost: run only what you need.'
        ],
        keyPointsVi: [
          'Scale out: thêm EC2 instance khi tải tăng. Scale in: giảm bớt EC2 instance khi tải giảm.',
          'Quản lý 3 mốc công suất: Minimum size (tối thiểu), Desired capacity (mong muốn), Maximum size (tối đa).',
          'Tự động đăng ký máy mới vào Target Group của Load Balancer và hủy đăng ký máy bị tắt.',
          'Tự phục hồi (Self-healing): phát hiện máy lỗi, terminate máy đó và tự khởi chạy máy mới thay thế.',
          'Thực hiện hóa nguyên lý Elasticity của cloud: tiết kiệm tiền bằng cách chỉ chạy số máy đủ dùng.'
        ],
        isCore: true
      },
      {
        id: 'lec-68',
        number: 68,
        titleEn: 'Auto Scaling Groups (ASG) Hands On',
        titleVi: 'Thực hành tạo ASG & Trải nghiệm tính năng tự phục hồi (Self-Healing)',
        summaryEn: 'Create launch template, configure ASG across 3 AZs attached to ALB target group, enable ELB health checks, and test automatic instance replacement upon termination.',
        summaryVi: 'Tạo launch template, tạo ASG trải trên 3 AZ gắn vào target group của ALB, bật ELB health check và xem ASG tự sinh máy mới khi 1 máy bị terminate.',
        keyPointsEn: [
          'Launch Template (DemoLaunchTemplate): defines AMI, instance type (t2.micro), security group, and User Data script.',
          'Attach to load balancer: targets auto-join target group demo-tg-alb with ELB health checks enabled.',
          'Self-healing demo: manually terminating an instance causes ASG to detect the loss and launch a replacement instance automatically.',
          'Changing desired capacity: easily scales up or down with instances automatically added or removed from ALB.'
        ],
        keyPointsVi: [
          'Launch Template: bản mẫu cấu hình máy ảo cho ASG gồm AMI, loại máy t2.micro, security group và User Data.',
          'Gắn vào load balancer: các máy mới sinh tự động gia nhập target group demo-tg-alb, bật ELB health check.',
          'Demo tự phục hồi: tự tay terminate 1 máy -> ASG phát hiện thiếu máy và tự động khởi chạy 1 máy mới thay thế ngay lập tức.',
          'Thay đổi desired capacity: đổi từ 2 lên 4 hoặc về 1, các máy được thêm/bớt mượt mà trên load balancer.'
        ]
      },
      {
        id: 'lec-69',
        number: 69,
        titleEn: 'Auto Scaling Groups (ASG) Strategies',
        titleVi: 'Các chiến lược co giãn của Auto Scaling Groups',
        summaryEn: 'Detailed comparison of Manual scaling, Dynamic scaling (Simple/Step & Target Tracking), Scheduled scaling, and Predictive scaling using Machine Learning.',
        summaryVi: 'So sánh chi tiết các chiến lược co giãn: Thủ công (Manual), Động (Simple/Step & Target Tracking), Theo lịch (Scheduled) và Dự báo bằng Machine Learning (Predictive).',
        table: {
          headers: ['Chiến lược Co Giãn', 'Cách thức hoạt động', 'Ví dụ / Từ khóa đề thi'],
          rows: [
            ['Manual Scaling (Thủ công)', 'Người quản trị tự đăng nhập console và đổi Desired Capacity', 'Tự tăng từ 1 lên 2 bằng tay khi cần bảo trì'],
            ['Dynamic: Simple / Step Scaling', 'Kích hoạt hành động dựa trên cảnh báo CloudWatch Alarm', 'Nếu CPU trung bình > 70% trong 5 phút -> Thêm 2 máy; Nếu CPU < 30% trong 10 phút -> Bớt 1 máy'],
            ['Dynamic: Target Tracking', 'Đặt một chỉ số mục tiêu cố định, ASG tự động tính toán số máy để giữ mức đó', 'Cách dễ nhất: Đặt mục tiêu giữ CPU trung bình toàn nhóm quanh mức 40%'],
            ['Scheduled Scaling (Theo lịch)', 'Lên lịch co giãn theo quy luật thời gian đã biết trước', 'Mỗi thứ Sáu lúc 17:00 tăng min capacity lên 10 máy trước trận bóng lớn cuối tuần'],
            ['Predictive Scaling (Dự báo bằng ML)', 'Dùng Machine Learning phân tích lịch sử lưu lượng để dự báo tương lai và chuẩn bị máy trước', 'HAY RA THI: Từ khóa "Machine Learning", "forecast", "ahead of time" -> Chọn Predictive Scaling']
          ]
        },
        keyPointsEn: [
          'Manual scaling: update ASG size yourself.',
          'Dynamic - Simple/Step scaling: CloudWatch alarm triggers scaling action based on metrics (CPU, network).',
          'Dynamic - Target tracking: easiest method; set a target metric (e.g. keep average CPU at 40%) and ASG adjusts capacity automatically.',
          'Scheduled scaling: anticipate load from known patterns (e.g. scale up every Friday at 5 pm).',
          'Predictive scaling (EXAM FAVORITE): uses Machine Learning to forecast traffic patterns and pre-provisions instances ahead of time with zero manual effort.'
        ],
        keyPointsVi: [
          'Manual scaling: tự chỉnh tay kích thước nhóm.',
          'Simple/Step scaling: dùng CloudWatch alarm theo dõi CPU để kích hoạt lệnh thêm/bớt máy.',
          'Target Tracking: cách đơn giản và phổ biến nhất, ví dụ giữ CPU trung bình toàn nhóm ở mức 40%.',
          'Scheduled scaling: lên lịch định kỳ theo mẫu thời gian đã biết (thứ Sáu, Black Friday, giờ mở bán vé).',
          'Predictive scaling (ĐIỂM NÓNG TRONG KỲ THI): dùng Machine Learning để dự báo lưu lượng từ dữ liệu quá khứ và CHUẨN BỊ MÁY TRƯỚC (pre-provision) mà không cần can thiệp thủ công.'
        ],
        isCore: true
      },
      {
        id: 'lec-70',
        number: 70,
        titleEn: 'Section Cleanup',
        titleVi: 'Hướng dẫn dọn dẹp tài nguyên Section 7',
        summaryEn: 'Delete Auto Scaling Group first (which deletes instances), then delete Application Load Balancer. Target group is free and can stay.',
        summaryVi: 'Xóa Auto Scaling Group trước (các instance tự động biến mất theo), sau đó xóa Application Load Balancer. Target group không tính phí.',
        keyPointsEn: [
          'Do NOT terminate EC2 instances directly: the ASG would immediately recreate them.',
          'Delete the Auto Scaling Group first (type "delete" to confirm); its instances terminate automatically.',
          'Delete the Application Load Balancer next.',
          'Target groups cost nothing and become empty once ASG and ALB are gone.'
        ],
        keyPointsVi: [
          'ĐỪNG terminate trực tiếp các máy ảo: ASG sẽ tự động tạo lại các máy mới vì tưởng máy bị lỗi.',
          'Xóa Auto Scaling Group trước (gõ "delete" để xác nhận): toàn bộ máy ảo của nhóm sẽ tự động biến mất.',
          'Tiếp theo xóa Load Balancer (Application Load Balancer).',
          'Target Group hoàn toàn miễn phí và tự động trống khi ASG và ALB đã bị xóa.'
        ]
      },
      {
        id: 'lec-71',
        number: 71,
        titleEn: 'ELB & ASG Summary',
        titleVi: 'Tổng kết chuyên đề ELB & Auto Scaling Groups',
        summaryEn: 'Comprehensive recap of High Availability, Scalability (vertical vs horizontal), Elasticity, Agility, Load Balancers (ALB, NLB, GWLB), and ASG integration.',
        summaryVi: 'Ôn tập toàn diện các khái niệm High Availability, Scalability (dọc vs ngang), Elasticity, Agility, 4 loại Load Balancer và sự kết hợp hoàn hảo giữa ELB và ASG.',
        keyPointsEn: [
          'High Availability: applications running across MULTIPLE Availability Zones.',
          'Vertical Scalability: increase instance SIZE (scale up/down).',
          'Horizontal Scalability: increase instance NUMBER (scale out/in).',
          'Elasticity: ability to scale up and down dynamically based on demand.',
          'Agility: cloud advantage of provisioning resources in minutes.',
          'ELB: distributes traffic across instances in multiple AZs with health checks (ALB Layer 7, NLB Layer 4, GWLB Layer 3).',
          'ASG: scales EC2 instances dynamically, replaces unhealthy instances, and tightly integrates with ELB.'
        ],
        keyPointsVi: [
          'Tính sẵn sàng cao (High Availability): ứng dụng chạy trên NHIỀU Availability Zone.',
          'Mở rộng dọc: tăng kích thước máy (scale up / scale down).',
          'Mở rộng ngang: tăng số lượng máy (scale out / scale in).',
          'Elasticity: khả năng co giãn tự động theo nhu cầu để tối ưu chi phí.',
          'Agility: tính nhanh nhẹn của điện toán đám mây, cấp phát máy trong vài phút.',
          'ELB: phân phối lưu lượng qua nhiều máy ở nhiều AZ kèm health check (ALB tầng 7, NLB tầng 4, GWLB tầng 3).',
          'ASG: co giãn máy ảo linh hoạt, tự thay thế máy lỗi và tích hợp chặt chẽ với ELB để tạo nên hệ thống tự động hoàn hảo.'
        ],
        isCore: true
      }
    ]
  },
  {
    id: 'section-8',
    sectionNumber: 8,
    titleEn: 'Amazon S3 (Simple Storage Service)',
    titleVi: 'Amazon S3 - Lưu trữ Đối tượng & Dữ liệu',
    domain: 'Domain 3: Cloud Technology and Services',
    weightPercentage: '34%',
    badge: 'Storage Core',
    overviewEn: 'Section 8 covers Amazon S3, one of the core AWS services: buckets and objects, security, static websites, versioning, replication, storage classes, encryption and Storage Gateway.',
    overviewVi: 'Section 8 học Amazon S3, một trong những dịch vụ cốt lõi của AWS: bucket và object, bảo mật, website tĩnh, versioning, replication, storage class, mã hóa và Storage Gateway.',
    quickExamFacts: [
      {
        en: 'Bucket = Region-specific; object key = prefix + object name; S3 has no real folders; multi-part upload for objects above 5 GB.',
        vi: 'Bucket gắn với Region; key = prefix + tên object; S3 không có thư mục thật; dùng multi-part upload cho object trên 5 GB (tối đa 5 TB).',
        isCoreHighlight: true
      },
      {
        en: 'Bucket policy (JSON: Resource, Effect, Action, Principal) is the most common way to grant public or cross-account access; Block Public Access overrides it.',
        vi: 'Bucket policy (JSON: Resource, Effect, Action, Principal) là cách phổ biến để cấp truy cập công khai hoặc cross-account; Block Public Access được ưu tiên hơn.',
        isCoreHighlight: true
      },
      {
        en: 'Versioning: delete without a version ID adds a delete marker (reversible); delete with a version ID is permanent. Replication (CRR/SRR) needs versioning on both buckets.',
        vi: 'Versioning: xóa không có version ID thêm delete marker (khôi phục được); xóa có version ID là vĩnh viễn. Replication (CRR/SRR) cần versioning ở cả hai bucket.',
        isCoreHighlight: true
      },
      {
        en: 'Durability is 11 nines (99.999999999%) for every class; availability varies. Glacier minimum durations: 90 days (Instant, Flexible), 180 days (Deep Archive). Intelligent-Tiering has no retrieval fee.',
        vi: 'Độ bền 11 số 9 cho mọi class; tính sẵn sàng thay đổi. Thời gian lưu tối thiểu Glacier: 90 ngày (Instant, Flexible), 180 ngày (Deep Archive). Intelligent-Tiering không có phí truy xuất.',
        isCoreHighlight: true
      },
      {
        en: 'SSE (Server-Side Encryption) is on by default; Access Analyzer for S3 finds public or cross-account buckets; Storage Gateway = hybrid cloud bridge.',
        vi: 'SSE bật mặc định; Access Analyzer for S3 tìm bucket công khai hoặc chia sẻ cross-account; Storage Gateway = cầu nối hybrid cloud.',
        isCoreHighlight: true
      }
    ],
    lectures: [
      {
        id: 'lec-72',
        number: 72,
        titleEn: 'S3 Overview',
        titleVi: 'Tổng quan về Amazon S3: Buckets và Objects',
        summaryEn: 'Amazon S3 is infinitely scaling object storage. Buckets are region-specific with globally unique names. Objects have keys, bodies, metadata, tags, max 5 TB.',
        summaryVi: 'Amazon S3 là dịch vụ lưu trữ đối tượng mở rộng vô hạn. Bucket thuộc 1 Region có tên duy nhất toàn cầu. Object gồm key, body, metadata, tags, tối đa 5 TB.',
        table: {
          headers: ['Khái niệm S3', 'Đặc điểm kỹ thuật', 'Quy tắc thi'],
          rows: [
            ['Bucket', 'Thư mục cấp cao nhất trên cloud, tạo ở một Region cụ thể', 'Tên duy nhất toàn cầu (hoặc dùng account-regional namespace), chữ thường, số, gạch ngang, 3-63 ký tự'],
            ['Object Key', 'Đường dẫn đầy đủ của tệp (VD: images/2026/photo.jpg)', 'Key = Prefix (images/2026/) + Tên tệp (photo.jpg). S3 KHÔNG có thư mục thật sự'],
            ['Kích thước Object', 'Tối đa 5 TB cho một object', 'Tệp lớn hơn 5 GB BẮT BUỘC dùng Multi-part Upload'],
            ['Metadata & Tags', 'Cặp key-value gắn với object', 'Tối đa 10 tags, hữu ích cho phân quyền và quản lý vòng đời']
          ]
        },
        keyPointsEn: [
          'Buckets are created in a specific Region; console provides a global list.',
          'Bucket names must be globally unique across all accounts (or use account-regional namespace).',
          'S3 has no real concept of directories: everything is an object key with slashes.',
          'Max object size is 5 TB. Uploads larger than 5 GB MUST use multi-part upload.'
        ],
        keyPointsVi: [
          'Bucket được tạo ở một Region cụ thể; console hiển thị danh sách toàn cầu.',
          'Tên bucket phải duy nhất toàn cầu trên toàn bộ các tài khoản AWS (hoặc dùng account-regional namespace).',
          'S3 không có khái niệm thư mục vật lý thật sự: tất cả chỉ là Object Key chứa dấu gạch chéo.',
          'Kích thước tối đa của 1 object là 5 TB. Các file lớn hơn 5 GB bắt buộc phải dùng Multi-part Upload.'
        ],
        isCore: true
      },
      {
        id: 'lec-73',
        number: 73,
        titleEn: 'S3 Hands On',
        titleVi: 'Thực hành tạo Bucket, tải tệp & Phân biệt URL',
        summaryEn: 'Create a bucket, upload files, explore folders, and compare the pre-signed Open URL with the public Object URL (AccessDenied by default).',
        summaryVi: 'Tạo bucket, tải lên tệp tin, tạo thư mục giả lập, phân biệt nút Open (URL ký sẵn pre-signed) và Object URL công khai (mặc định bị AccessDenied).',
        keyPointsEn: [
          'Account-regional namespace appends account ID and region suffix so bucket names are always available.',
          'Default settings: Block all public access ON, ACLs disabled, SSE-S3 encryption enabled by default.',
          'Open button uses a pre-signed URL with your credentials; public Object URL returns AccessDenied by default.'
        ],
        keyPointsVi: [
          'Account-regional namespace tự thêm hậu tố ID tài khoản và Region nên không lo trùng tên bucket.',
          'Cài đặt an toàn mặc định: Bật Block all public access, tắt ACL, bật sẵn mã hóa SSE-S3.',
          'Nút Open dùng URL có chữ ký xác thực (pre-signed URL) để chủ tài khoản xem được; trong khi link Object URL công khai bị chặn AccessDenied.'
        ]
      },
      {
        id: 'lec-74',
        number: 74,
        titleEn: 'S3 Security: Bucket Policy',
        titleVi: 'Bảo mật S3 & Cấu trúc S3 Bucket Policy',
        summaryEn: 'User-based (IAM policies) vs Resource-based (Bucket policies). Anatomy of JSON bucket policy. Block Public Access security layer.',
        summaryVi: 'Bảo mật theo người dùng (IAM policy) và theo tài nguyên (Bucket policy). Cấu trúc tài liệu JSON và lá chắn Block Public Access.',
        table: {
          headers: ['Cơ chế bảo mật S3', 'Phạm vi', 'Cách áp dụng'],
          rows: [
            ['IAM Policies (User-based)', 'Gắn vào IAM User, Group hoặc Role', 'Chỉ định user/role đó được thực hiện hành động API nào trên S3'],
            ['S3 Bucket Policies (Resource-based)', 'Gắn trực tiếp vào S3 Bucket', 'Phổ biến nhất: Cấp quyền đọc công khai (public read), chia sẻ cross-account, bắt buộc mã hóa'],
            ['Block Public Access', 'Cấp bucket hoặc toàn bộ tài khoản', 'Lá chắn chống rò rỉ dữ liệu, ghi đè mọi policy công khai nếu đang BẬT'],
            ['Mã hóa (Encryption)', 'Mã hóa dữ liệu lưu trữ', 'Bảo vệ dữ liệu ở trạng thái nghỉ (at-rest)']
          ]
        },
        keyPointsEn: [
          'Bucket policy elements (JSON): Resource (arn:aws:s3:::bucket/*), Effect (Allow/Deny), Action (s3:GetObject), Principal (* for everyone).',
          'An IAM principal can access an object if IAM policy allows OR bucket policy allows, AND no explicit deny.',
          'Block Public Access: ON by default. Even if a bucket policy grants public access, Block Public Access overrides and blocks it.'
        ],
        keyPointsVi: [
          'Thành phần Bucket Policy (JSON): Resource (ARN bucket/*), Effect (Allow/Deny), Action (s3:GetObject), Principal (* là mọi người).',
          'Một người được truy cập nếu IAM policy cho phép HOẶC bucket policy cho phép, VÀ không có lệnh Deny rõ ràng.',
          'Block Public Access: Bật mặc định; nếu đang bật thì dù có viết bucket policy public cũng không ai bên ngoài truy cập được.'
        ],
        isCore: true
      },
      {
        id: 'lec-75',
        number: 75,
        titleEn: 'S3 Security: Bucket Policy Hands On',
        titleVi: 'Thực hành tạo Bucket Policy với AWS Policy Generator',
        summaryEn: 'Disable Block Public Access, use AWS Policy Generator to generate JSON policy allowing s3:GetObject to *, and test public image access.',
        summaryVi: 'Tắt Block Public Access, dùng công cụ Policy Generator tạo JSON cho phép s3:GetObject cho mọi người (*), kiểm tra mở ảnh công khai.',
        keyPointsEn: [
          'Step 1: Disable Block Public Access on bucket Permissions tab and confirm warning.',
          'Step 2: Generate S3 Bucket Policy: Effect Allow, Principal *, Action GetObject, Resource arn:aws:s3:::bucket/*.',
          'Step 3: Save bucket policy JSON -> object is now publicly accessible via Object URL.'
        ],
        keyPointsVi: [
          'Bước 1: Bỏ chọn Block all public access trong tab Permissions và xác nhận.',
          'Bước 2: Dùng Policy Generator tạo policy: Effect Allow, Principal *, Action GetObject, Resource arn:aws:s3:::tên-bucket/*.',
          'Bước 3: Dán JSON và lưu thay đổi -> ảnh lập tức hiển thị công khai trên trình duyệt.'
        ]
      },
      {
        id: 'lec-76',
        number: 76,
        titleEn: 'S3 Website Overview',
        titleVi: 'Tổng quan lưu trữ Website tĩnh trên S3',
        summaryEn: 'S3 can host static websites (HTML, CSS, JS, images). Requires public bucket policy; 403 Forbidden indicates missing public read.',
        summaryVi: 'S3 có thể lưu trữ website tĩnh (HTML, CSS, JS, ảnh). Yêu cầu bucket phải cho phép đọc công khai; lỗi 403 Forbidden nghĩa là chưa cấp quyền.',
        keyPointsEn: [
          'Enables hosting of static websites directly from S3 without web servers.',
          'Endpoint URL format depends on region: s3-website-<region>.amazonaws.com or s3-website.<region>.amazonaws.com.',
          'Will not work unless bucket allows public reads via bucket policy.',
          '403 Forbidden error means the bucket is not public.'
        ],
        keyPointsVi: [
          'Cho phép chạy website tĩnh trực tiếp từ S3 mà không cần thuê máy chủ web (như EC2).',
          'Định dạng URL trang web phụ thuộc Region: s3-website-<region>.amazonaws.com.',
          'Bắt buộc bucket phải được cấp quyền đọc công khai (public read) qua Bucket Policy.',
          'Nếu gặp lỗi 403 Forbidden sau khi bật hosting -> kiểm tra lại Block Public Access và Bucket Policy.'
        ]
      },
      {
        id: 'lec-77',
        number: 77,
        titleEn: 'S3 Website Hands On',
        titleVi: 'Thực hành bật Static Website Hosting trên S3',
        summaryEn: 'Enable static website hosting in bucket properties, specify index.html as index document, and open the website endpoint in browser.',
        summaryVi: 'Bật tính năng Static website hosting trong tab Properties, đặt index document là index.html và mở endpoint website trên trình duyệt.',
        keyPointsEn: [
          'Properties -> Static website hosting -> Enable -> Host a static website -> Index document: index.html.',
          'Upload index.html with HTML markup referencing images.',
          'Open bucket website endpoint URL: site renders with images loaded successfully.'
        ],
        keyPointsVi: [
          'Properties -> Static website hosting -> Edit -> Bật -> chọn Host a static website -> Index document: index.html.',
          'Upload file index.html chứa nội dung trang chủ.',
          'Mở đường link Bucket website endpoint: trang web và hình ảnh hiển thị trơn tru.'
        ]
      },
      {
        id: 'lec-78',
        number: 78,
        titleEn: 'S3 Versioning Overview',
        titleVi: 'Tổng quan S3 Versioning (Quản lý phiên bản)',
        summaryEn: 'Versioning is enabled at bucket level. Overwriting creates new version numbers. Protects against accidental deletes and enables rollback.',
        summaryVi: 'Versioning được bật ở cấp bucket. Ghi đè tệp sẽ tạo ra phiên bản mới. Giúp chống xóa nhầm và dễ dàng khôi phục phiên bản cũ.',
        keyPointsEn: [
          'Enabled at bucket level; re-uploading the same key creates Version 2, Version 3, etc.',
          'Protects against unintended deletes and overwrites.',
          'Files uploaded before versioning have version ID null.',
          'Suspending versioning does NOT delete previous versions.'
        ],
        keyPointsVi: [
          'Bật ở cấp bucket; upload đè cùng 1 key sẽ tạo ra Version 2, Version 3, v.v.',
          'Bảo vệ dữ liệu khỏi bị xóa nhầm hoặc ghi đè vô ý.',
          'Các file tải lên trước khi bật versioning sẽ có version ID là null.',
          'Tạm dừng (suspend) versioning không làm mất đi các phiên bản cũ đã có.'
        ],
        isCore: true
      },
      {
        id: 'lec-79',
        number: 79,
        titleEn: 'S3 Versioning Hands On',
        titleVi: 'Thực hành kiểm tra Versioning, Rollback & Delete Marker',
        summaryEn: 'Hands on: edit index.html and overwrite, inspect version IDs, delete specific version ID (permanent), delete with Show Versions off (adds delete marker), and restore.',
        summaryVi: 'Thực hành sửa index.html và ghi đè, xem version ID, xóa theo version ID (vĩnh viễn), xóa thông thường (thêm delete marker) và khôi phục.',
        keyPointsEn: [
          'Show versions ON: displays all version IDs for each object key.',
          'Rollback: permanently delete the newest version ID to revert to the previous version.',
          'Delete with Show Versions OFF: adds a Delete Marker (reversible; file returns 404).',
          'Restore: delete the Delete Marker permanently to restore the original object.'
        ],
        keyPointsVi: [
          'Bật Show versions: nhìn thấy mọi version ID của từng file.',
          'Quay lại bản cũ (Rollback): xóa vĩnh viễn version ID mới nhất để bản trước đó trở thành bản hiện hành.',
          'Xóa khi tắt Show versions: S3 chỉ gắn thêm Delete Marker lên trên (có thể hoàn tác; web báo 404).',
          'Khôi phục: xóa vĩnh viễn Delete Marker -> file cũ lập tức hiện lại bình thường.'
        ],
        isCore: true
      },
      {
        id: 'lec-80',
        number: 80,
        titleEn: 'S3 Replication Overview',
        titleVi: 'Tổng quan sao chép S3 Replication (CRR & SRR)',
        summaryEn: 'Cross-Region Replication (CRR) and Same-Region Replication (SRR). Requires versioning on both source and target buckets; asynchronous replication.',
        summaryVi: 'Sao chép xuyên Region (CRR) và trong cùng Region (SRR). Bắt buộc phải bật versioning trên cả 2 bucket nguồn và đích; sao chép bất đồng bộ.',
        table: {
          headers: ['Loại Replication', 'Đặc điểm', 'Trường hợp sử dụng thực tế'],
          rows: [
            ['CRR (Cross-Region Replication)', 'Sao chép sang bucket ở Region KHÁC, có thể khác tài khoản AWS', 'Tuân thủ pháp lý, giảm độ trễ cho người dùng ở vùng địa lý khác, khắc phục thảm họa'],
            ['SRR (Same-Region Replication)', 'Sao chép sang bucket trong CÙNG một Region', 'Gom log tập trung từ nhiều bucket, đồng bộ dữ liệu giữa môi trường Prod và Test']
          ]
        },
        keyPointsEn: [
          'Source and target buckets can be in the same or different AWS accounts.',
          'CRITICAL REQUIREMENT: Versioning must be enabled on BOTH source and target buckets.',
          'Replication is asynchronous; requires an IAM service role for S3.',
          'Only replicates objects uploaded AFTER the rule is created (use S3 Batch Operations for existing objects).'
        ],
        keyPointsVi: [
          'Bucket nguồn và đích có thể cùng hoặc khác tài khoản AWS.',
          'ĐIỀU KIỆN TIÊN QUYẾT: Bắt buộc phải BẬT VERSIONING trên cả 2 bucket nguồn và đích.',
          'Quá trình sao chép diễn ra bất đồng bộ ở chế độ nền qua một IAM role.',
          'Mặc định chỉ sao chép các object tải lên SAU KHI tạo rule (muốn chép object cũ phải dùng S3 Batch Operations).'
        ],
        isCore: true
      },
      {
        id: 'lec-81',
        number: 81,
        titleEn: 'S3 Replication Hands On',
        titleVi: 'Thực hành tạo quy tắc S3 Replication (CRR)',
        summaryEn: 'Create origin bucket in eu-west and target in us-east with versioning enabled, create replication rule, upload files, and verify replicated version IDs.',
        summaryVi: 'Tạo bucket gốc (eu-west) và bucket đích (us-east) cùng bật versioning, tạo replication rule, tải tệp lên và thấy version ID được nhân bản nguyên vẹn.',
        keyPointsEn: [
          'Replication rules require IAM role created automatically by console.',
          'Uploading new file to origin replicates to replica bucket within seconds.',
          'Version IDs in the target bucket are identical to the source bucket.'
        ],
        keyPointsVi: [
          'Tạo Replication rule: console tự động tạo IAM role với quyền đọc nguồn và ghi đích.',
          'Upload file mới lên bucket gốc -> sau vài giây file tự xuất hiện ở bucket đích bên Mỹ.',
          'Khi bật Show versions ở bucket đích: version ID của file giống hệt version ID ở bucket gốc.'
        ]
      },
      {
        id: 'lec-82',
        number: 82,
        titleEn: 'S3 Storage Classes Overview',
        titleVi: 'Các lớp lưu trữ S3 Storage Classes & Độ bền 11 số 9',
        summaryEn: 'Comprehensive overview of Standard, Standard-IA, One Zone-IA, Glacier tiers, and Intelligent-Tiering. 11 nines durability for all classes.',
        summaryVi: 'Tổng quan các lớp lưu trữ: Standard, Standard-IA, One Zone-IA, ba tầng Glacier và Intelligent-Tiering. Độ bền 11 số 9 cho mọi lớp lưu trữ.',
        table: {
          headers: ['Storage Class', 'Tính sẵn sàng', 'Thời gian lưu tối thiểu', 'Đặc điểm chính & Trường hợp dùng'],
          rows: [
            ['S3 Standard (General Purpose)', '99.99%', 'Không', 'Dữ liệu truy cập thường xuyên, độ trễ thấp, chịu mất đồng thời 2 cơ sở (data center)'],
            ['S3 Standard-IA (Infrequent Access)', '99.9%', '30 ngày', 'Ít truy cập nhưng cần lấy ngay lập tức, rẻ hơn Standard nhưng CÓ PHÍ TRUY XUẤT. Dùng cho backup, disaster recovery'],
            ['S3 One Zone-IA', '99.5%', '30 ngày', 'CHỈ LƯU TRONG 1 AZ (mất dữ liệu nếu AZ bị phá hủy), rẻ hơn 20% so với Standard-IA. Dùng cho bản sao phụ hoặc dữ liệu tạo lại được'],
            ['Glacier Instant Retrieval', '99.9%', '90 ngày', 'Lưu trữ lạnh lấy trong mili-giây, truy cập ~1 lần/quý. Tối thiểu 90 ngày'],
            ['Glacier Flexible Retrieval', '99.9%', '90 ngày', 'Trước đây là S3 Glacier: Expedited (1-5 phút), Standard (3-5 giờ), Bulk miễn phí (5-12 giờ). Tối thiểu 90 ngày'],
            ['Glacier Deep Archive', '99.9%', '180 ngày', 'Chi phí rẻ nhất trên AWS: Standard (12 giờ), Bulk (48 giờ). Tối thiểu 180 ngày, lưu trữ tuân thủ nhiều năm'],
            ['S3 Intelligent-Tiering', '99.9%', 'Không', 'TỰ ĐỘNG chuyển file giữa các tầng theo mức dùng, phí giám sát nhỏ/tháng, KHÔNG CÓ PHÍ TRUY XUẤT']
          ]
        },
        keyPointsEn: [
          'Durability is identical across ALL storage classes: 11 nines (99.999999999%).',
          'Availability varies by class (e.g. 99.99% for Standard, 99.5% for One Zone-IA).',
          'Glacier minimum storage durations: Instant & Flexible = 90 days; Deep Archive = 180 days.',
          'Intelligent-Tiering: ideal when access patterns are unpredictable; no retrieval fees.'
        ],
        keyPointsVi: [
          'Độ bền (Durability) là 11 số 9 (99.999999999%) GIỐNG NHAU ở tất cả các Storage Class.',
          'Tính sẵn sàng (Availability) thay đổi tùy theo class (Standard 99.99%, One Zone 99.5%).',
          'Thời gian lưu tối thiểu của Glacier: Instant & Flexible là 90 ngày; Deep Archive là 180 ngày.',
          'Intelligent-Tiering: giải pháp tối ưu khi không biết trước tần suất truy cập; KHÔNG thu phí lấy dữ liệu (no retrieval fee).'
        ],
        isCore: true
      },
      {
        id: 'lec-83',
        number: 83,
        titleEn: 'S3 Storage Classes Hands On',
        titleVi: 'Thực hành chọn Storage Class & Cấu hình Lifecycle Rules',
        summaryEn: 'Select storage class on upload, change class on existing objects, and automate transitions using S3 Lifecycle Rules (e.g. 30d -> IA, 60d -> Intelligent, 180d -> Glacier).',
        summaryVi: 'Chọn class khi upload, đổi class cho file đã có và tự động hóa chuyển tầng lưu trữ bằng S3 Lifecycle Rules theo thời gian.',
        keyPointsEn: [
          'Can change storage class anytime via Object Properties -> Edit Storage Class.',
          'S3 Lifecycle Rules automate moving objects between tiers based on age (e.g. 30 days -> Standard-IA, 180 days -> Glacier Flexible).',
          'Helps optimize storage costs transparently without application changes.'
        ],
        keyPointsVi: [
          'Có thể đổi storage class bất cứ lúc nào qua tab Properties của object.',
          'S3 Lifecycle Rules giúp tự động chuyển tầng lưu trữ theo số ngày (ví dụ: 30 ngày -> Standard-IA, 180 ngày -> Glacier).',
          'Giúp doanh nghiệp tự động tiết kiệm chi phí mà ứng dụng không hề bị ảnh hưởng.'
        ]
      },
      {
        id: 'lec-84',
        number: 84,
        titleEn: 'S3 Express One Zone',
        titleVi: 'S3 Express One Zone (Lưu trữ Directory Bucket siêu tốc)',
        summaryEn: 'High-performance single-AZ storage class living in Directory Buckets. Single-digit millisecond latency, 10x faster than S3 Standard at 50% lower cost.',
        summaryVi: 'Lớp lưu trữ hiệu năng cao trong 1 AZ duy nhất sử dụng Directory Bucket. Độ trễ vài mili-giây, nhanh gấp 10 lần S3 Standard với chi phí thấp hơn 50%.',
        table: {
          headers: ['Tiêu chí', 'S3 Express One Zone', 'S3 Standard'],
          rows: [
            ['Loại Bucket', 'Directory Bucket (đặt trong 1 AZ cụ thể)', 'General Purpose Bucket (đa AZ)'],
            ['Hiệu năng / Độ trễ', 'Hàng trăm nghìn req/giây, độ trễ vài mili-giây (nhanh gấp 10 lần)', 'Độ trễ mili-giây tiêu chuẩn'],
            ['Chi phí', 'Chi phí xử lý request rẻ hơn ~50%', 'Giá tiêu chuẩn'],
            ['Tính sẵn sàng', 'Thấp hơn (chỉ ở 1 AZ, rủi ro nếu AZ gặp sự cố)', 'Cao hơn (chịu mất 2 cơ sở AZ đồng thời)'],
            ['Trường hợp sử dụng', 'AI/ML Training, phân tích tài chính, SageMaker, Athena, EMR, HPC', 'Ứng dụng thông thường, web, media, backup']
          ]
        },
        keyPointsEn: [
          'Lives in Directory Buckets in a SINGLE Availability Zone.',
          'Handles hundreds of thousands of requests per second with single-digit millisecond latency.',
          '10x faster performance than S3 Standard at up to 50% lower request costs.',
          'Co-locate storage and compute in the same AZ for minimum latency and zero inter-AZ network fees.'
        ],
        keyPointsVi: [
          'Lưu trữ trong Directory Bucket nằm trong DUY NHẤT 1 Availability Zone do bạn chọn.',
          'Xử lý hàng trăm nghìn request mỗi giây với độ trễ chỉ vài mili-giây (single-digit ms).',
          'Hiệu năng nhanh gấp 10 lần S3 Standard và chi phí request rẻ hơn tới 50%.',
          'Đặt chung vị trí (co-locate) giữa S3 Express và EC2 tính toán trong cùng 1 AZ để triệt tiêu phí mạng giữa các AZ.'
        ],
        isCore: true
      },
      {
        id: 'lec-85',
        number: 85,
        titleEn: 'S3 Encryption',
        titleVi: 'Mã hóa dữ liệu trên Amazon S3',
        summaryEn: 'Server-Side Encryption (SSE) vs Client-Side Encryption. Server-Side Encryption is enabled by default on all S3 buckets.',
        summaryVi: 'Mã hóa phía máy chủ (SSE) và Mã hóa phía client. Mã hóa phía máy chủ luôn được BẬT MẶC ĐỊNH trên mọi bucket S3.',
        keyPointsEn: [
          'Server-Side Encryption (SSE): S3 encrypts the object upon arrival. ALWAYS ENABLED BY DEFAULT on every bucket.',
          'Client-Side Encryption: client encrypts file before upload; key management handled by client.',
          'Exam question favorite: Server-Side Encryption is always on by default on S3.'
        ],
        keyPointsVi: [
          'Mã hóa phía server (Server-Side Encryption - SSE): S3 tự động mã hóa file ngay khi tải lên. LUÔN BẬT MẶC ĐỊNH trên mọi bucket.',
          'Mã hóa phía client: người dùng tự mã hóa file trên máy tính trước khi gửi lên S3.',
          'Điểm thi cốt lõi: Mã hóa phía server (SSE) luôn luôn được kích hoạt mặc định trên S3.'
        ],
        isCore: true
      },
      {
        id: 'lec-86',
        number: 86,
        titleEn: 'IAM Access Analyzer for S3',
        titleVi: 'Giám sát quyền truy cập với IAM Access Analyzer for S3',
        summaryEn: 'Monitors S3 buckets to identify which ones are publicly accessible or shared with external AWS accounts.',
        summaryVi: 'Tính năng giám sát bảo mật rà soát toàn bộ bucket S3 để phát hiện bucket nào đang bị mở công khai hoặc chia sẻ ra ngoài tài khoản.',
        keyPointsEn: [
          'Analyzes bucket policies, ACLs, and Access Point policies.',
          'Alerts you to buckets that are publicly accessible or shared with other AWS accounts.',
          'Allows security teams to review findings and remediate accidental exposures.'
        ],
        keyPointsVi: [
          'Phân tích Bucket Policy, ACL và Access Point policy.',
          'Cảnh báo ngay các bucket đang mở công khai ra internet hoặc chia sẻ sang tài khoản AWS khác.',
          'Giúp quản trị viên kiểm tra xem việc chia sẻ là có chủ đích hay do sơ hở bảo mật để xử lý kịp thời.'
        ],
        isCore: true
      },
      {
        id: 'lec-87',
        number: 87,
        titleEn: 'Shared Responsibility Model for S3',
        titleVi: 'Mô hình trách nhiệm chung cho Amazon S3',
        summaryEn: 'AWS manages infrastructure, 11 nines durability, and facility loss tolerance. Customer manages versioning, bucket policies, monitoring, storage classes, and encryption.',
        summaryVi: 'AWS chịu trách nhiệm hạ tầng, độ bền 11 số 9, chịu mất 2 cơ sở. Khách hàng quản lý versioning, bucket policy, giám sát, chọn storage class và mã hóa.',
        table: {
          headers: ['AWS chịu trách nhiệm (Bảo mật CỦA đám mây)', 'Khách hàng chịu trách nhiệm (Bảo mật TRONG đám mây)'],
          rows: [
            ['Hạ tầng lưu trữ, máy chủ, đĩa vật lý', 'Cấu hình Versioning đúng để bảo vệ dữ liệu'],
            ['Độ bền 11 số 9 và tính sẵn sàng của dịch vụ', 'Cấu hình S3 Bucket Policy và phân quyền IAM'],
            ['Khả năng chịu mất đồng thời 2 cơ sở dữ liệu (data center)', 'Tự bật Logging và Monitoring (CloudTrail, Access Logs)'],
            ['Phân tích cấu hình và lỗ hổng hạ tầng của AWS', 'Lựa chọn Storage Class tối ưu chi phí cho dữ liệu'],
            ['Chứng nhận tuân thủ hạ tầng toàn cầu', 'Cấu hình mã hóa dữ liệu (SSE-KMS, Client-side keys)']
          ]
        },
        keyPointsEn: [
          'AWS is responsible for infrastructure, durability (11 nines), availability, and sustaining concurrent loss of 2 facilities.',
          'Customer is responsible for S3 versioning, bucket policies, logging/monitoring, cost-optimal storage classes, and encryption.'
        ],
        keyPointsVi: [
          'AWS chịu trách nhiệm: hạ tầng phần cứng, độ bền 11 số 9, chịu được sự cố mất đồng thời 2 cơ sở.',
          'Khách hàng chịu trách nhiệm: bật versioning, viết bucket policy bảo vệ dữ liệu, bật logging, chọn storage class tiết kiệm và mã hóa.'
        ],
        isCore: true
      },
      {
        id: 'lec-88',
        number: 88,
        titleEn: 'Storage Gateway Overview',
        titleVi: 'Tổng quan AWS Storage Gateway (Cầu nối Hybrid Cloud)',
        summaryEn: 'Bridges on-premises data and AWS cloud storage (S3, EBS, Glacier) in a hybrid cloud setup for disaster recovery, backups, and tiered storage.',
        summaryVi: 'Cầu nối giữa hệ thống dữ liệu tại chỗ (on-premises) và lưu trữ đám mây AWS (S3, EBS, Glacier) trong mô hình Hybrid Cloud.',
        table: {
          headers: ['Loại lưu trữ trên AWS', 'Dịch vụ tương ứng', 'Kết nối qua Storage Gateway'],
          rows: [
            ['Block Storage', 'Amazon EBS, EC2 Instance Store', 'Volume Gateway'],
            ['File Storage', 'Amazon EFS, Amazon FSx', 'File Gateway (NFS, SMB)'],
            ['Object Storage', 'Amazon S3, S3 Glacier', 'Tape Gateway & File Gateway']
          ]
        },
        keyPointsEn: [
          'Hybrid cloud solution: extends on-premises storage into Amazon S3 seamlessly.',
          'Acts as a bridge between on-premises protocols (NFS, SMB, iSCSI) and cloud storage (S3, EBS, Glacier).',
          'Key use cases: disaster recovery, backup and restore, and tiered cloud storage.',
          'For Cloud Practitioner: know that Storage Gateway connects on-premises systems directly to the AWS cloud.'
        ],
        keyPointsVi: [
          'Giải pháp Hybrid Cloud: mở rộng hệ thống lưu trữ tại chỗ của doanh nghiệp lên Amazon S3.',
          'Đóng vai trò cầu nối chuyển đổi giữa giao thức tại chỗ (NFS, SMB, iSCSI) sang đám mây (S3, EBS, Glacier).',
          'Ứng dụng chính: sao lưu và phục hồi thảm họa (Disaster Recovery), mở rộng dung lượng không giới hạn.',
          'Đối với kỳ thi Cloud Practitioner: ghi nhớ Storage Gateway là cầu nối giữa on-premises và AWS cloud.'
        ],
        isCore: true
      },
      {
        id: 'lec-89',
        number: 89,
        titleEn: 'S3 Summary',
        titleVi: 'Tổng kết chuyên đề Amazon S3',
        summaryEn: 'Comprehensive recap of buckets and objects, security, static website hosting, versioning, replication, storage classes, and Storage Gateway.',
        summaryVi: 'Ôn tập toàn diện về bucket, object, bảo mật bucket policy, website tĩnh, versioning, replication, các lớp lưu trữ và Storage Gateway.',
        keyPointsEn: [
          'Buckets vs Objects: globally unique bucket names; max object size 5 TB (> 5 GB requires multi-part upload).',
          'Security: IAM policies, S3 bucket policies, default SSE encryption, Block Public Access.',
          'Static websites: enable hosting on public bucket with index.html.',
          'Versioning & Replication: rollback, delete markers, CRR/SRR requires versioning.',
          'Storage classes: Standard, Standard-IA, One Zone-IA, Intelligent-Tiering, Glacier tiers, S3 Express One Zone.',
          'Storage Gateway: hybrid cloud bridge connecting on-premises to S3.'
        ],
        keyPointsVi: [
          'Bucket & Object: tên bucket duy nhất toàn cầu; object tối đa 5 TB (> 5 GB bắt buộc dùng Multi-part Upload).',
          'Bảo mật: IAM policy, S3 Bucket Policy, mã hóa SSE mặc định, Block Public Access chống lộ lọt.',
          'Website tĩnh: bật hosting trên bucket công khai với file index.html.',
          'Versioning & Replication: bảo vệ xóa nhầm bằng Delete Marker, sao chép CRR/SRR bắt buộc bật versioning.',
          'Storage Classes: Standard, Standard-IA, One Zone-IA, Intelligent-Tiering, Glacier, S3 Express One Zone.',
          'Storage Gateway: cầu nối hybrid cloud giữa hệ thống on-premises và Amazon S3.'
        ],
        isCore: true
      }
    ]
  }
];
