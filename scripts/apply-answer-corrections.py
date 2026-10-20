"""Corrects practice questions whose answer key in the source dump is wrong or was mis-parsed.
Each correction updates the app data (src/data/dumpExams.json) and rewrites the matching
explanation (data/explanations/exam-N.json) so the text agrees with the corrected key.
Run: python3 scripts/apply-answer-corrections.py   (then re-seed Supabase)
"""
import json, re, glob

def L(i):
    return chr(65 + i)

CORRECTIONS = {
    'pe15-31': dict(
        correct=[0],
        note="Đề gốc đánh dấu Amazon ElastiCache, nhưng ElastiCache là dịch vụ managed do AWS vá hệ điều hành. Theo Shared Responsibility Model, khách hàng tự quản lý hệ điều hành guest, bản vá và cấu hình mạng của Amazon EC2, nên đáp án đã được chỉnh thành Amazon EC2.",
        explanation="Câu hỏi hỏi dịch vụ mà khách hàng phải tự duy trì cấu hình hệ điều hành, vá bảo mật và mạng. Amazon EC2 là IaaS: AWS lo hạ tầng vật lý và ảo hóa, còn khách hàng chịu trách nhiệm toàn bộ phần từ hệ điều hành guest trở lên, gồm vá lỗi, cấu hình, firewall và ứng dụng. Các dịch vụ managed như ElastiCache hay Fargate chuyển phần quản lý hệ điều hành sang AWS, khách hàng chỉ lo dữ liệu, cấu hình dịch vụ và quyền truy cập.",
        analyses={
            'A': "Đúng. Với EC2 bạn nhận một máy ảo trống: tự chọn AMI, tự vá hệ điều hành, tự cấu hình security group và phần mềm. Đây là ví dụ kinh điển của trách nhiệm khách hàng trong mô hình IaaS.",
            'B': "Sai. ElastiCache là dịch vụ cache được quản lý, AWS vá hệ điều hành và phần mềm engine bên dưới. Khách hàng chỉ lo cấu hình cluster, quyền truy cập và dữ liệu.",
            'C': "Sai. Fargate là compute serverless cho container, AWS quản lý máy chủ và hệ điều hành host. Khách hàng chỉ lo image container, ứng dụng và quyền truy cập, không phải vá OS của host.",
        },
        tips=["Thấy 'vá hệ điều hành' hoặc 'guest OS' thì nghĩ ngay tới EC2 (IaaS): khách hàng chịu trách nhiệm.", "Dịch vụ managed (RDS, ElastiCache, Fargate, Lambda) thì AWS lo hệ điều hành."],
        keywords=[{"term": "operating system configuration, security patching", "points_to": "Amazon EC2, IaaS, trách nhiệm khách hàng"}],
    ),
    'pe15-40': dict(
        correct=[1, 2],
        note="Đề gốc đánh dấu A và B, nhưng A nói AWS 'tự động làm cho workload của khách tuân thủ', điều này sai vì tuân thủ của workload phụ thuộc vào cách khách hàng cấu hình. Theo tài liệu AWS, hai lợi ích đúng là B và C, nên đáp án đã được chỉnh.",
        explanation="Chương trình AWS Compliance giúp khách hàng tin cậy hạ tầng của AWS: AWS được kiểm toán độc lập, duy trì tài liệu và chứng nhận cho các khung tuân thủ phổ biến (SOC, ISO 27001, PCI DSS...), và cam kết duy trì bảo mật vật lý cũng như bảo vệ dữ liệu ở phần mình chịu trách nhiệm. Chương trình này không biến workload của khách hàng thành tự động tuân thủ: theo Shared Responsibility Model, cách khách hàng cấu hình và sử dụng dịch vụ vẫn quyết định workload có tuân thủ hay không. Cần chọn đủ hai đáp án đúng.",
        analyses={
            'A': "Sai. AWS chỉ chịu trách nhiệm tuân thủ ở phần hạ tầng của mình. Workload của khách hàng có tuân thủ hay không còn tùy cách khách hàng cấu hình, quản lý quyền truy cập và dữ liệu, nên không có chuyện tự động tuân thủ.",
            'B': "Đúng. AWS công bố và duy trì tài liệu, báo cáo kiểm toán cho các khung tuân thủ phổ biến (qua AWS Artifact), giúp khách hàng dùng làm bằng chứng cho kiểm toán của mình.",
            'C': "Đúng. Các chứng nhận và báo cáo kiểm toán xác nhận AWS duy trì bảo mật vật lý của trung tâm dữ liệu và biện pháp bảo vệ dữ liệu ở phần thuộc trách nhiệm của AWS, đem lại sự an tâm cho khách hàng.",
            'D': "Sai. Chương trình không nhằm đồng bộ với các khung tuân thủ của nhà cung cấp cloud khác. AWS theo đuổi các chuẩn công nghiệp được công nhận rộng rãi, không phải bám theo đối thủ.",
            'E': "Sai trong ngữ cảnh câu này. AWS có bổ sung chứng nhận mới theo nhu cầu thị trường, nhưng đây không phải lợi ích cốt lõi của chương trình và không phải đáp án trong hai đáp án chuẩn của câu.",
        },
        tips=["'Compliance program' = bằng chứng AWS đã được kiểm toán (qua AWS Artifact), không phải bảo đảm workload của bạn tuân thủ.", "Gặp đáp án nói 'tự động tuân thủ' thì loại: tuân thủ ở tầng workload luôn là trách nhiệm của khách hàng."],
        keywords=[{"term": "automatically compliant", "points_to": "Bẫy: tuân thủ workload là việc của khách hàng"}, {"term": "compliance framework documentation", "points_to": "AWS Artifact"}],
    ),
    'pe15-42': dict(
        correct=[0],
        note="Đề gốc đánh dấu 'Quản lý người dùng và truy cập', nhưng đó là trách nhiệm của khách hàng. Kiểm soát thừa hưởng hoàn toàn từ AWS là kiểm soát vật lý và môi trường, tức quản lý bảo mật data center, nên đáp án đã được chỉnh thành A.",
        explanation="Trong Shared Responsibility Model có ba loại kiểm soát: inherited (thừa hưởng hoàn toàn từ AWS), shared (hai bên cùng áp dụng) và customer specific (chỉ khách hàng). Kiểm soát vật lý và môi trường, như bảo vệ trung tâm dữ liệu, là ví dụ điển hình của inherited control: khách hàng không phải làm gì thêm. Vá lỗi và quản lý cấu hình là shared control, còn quản lý người dùng và quyền truy cập thuộc trách nhiệm của khách hàng.",
        analyses={
            'A': "Đúng. An ninh vật lý của data center (kiểm soát ra vào, camera, bảo vệ, điện, làm mát) hoàn toàn do AWS đảm nhiệm. Khách hàng thừa hưởng mà không phải làm gì thêm.",
            'B': "Sai. Quản lý bản vá là shared control: AWS vá hạ tầng và dịch vụ của mình, còn khách hàng vá hệ điều hành guest và ứng dụng của họ.",
            'C': "Sai. Quản lý cấu hình cũng là shared control: AWS cấu hình thiết bị hạ tầng, khách hàng cấu hình hệ điều hành guest, database và ứng dụng của mình.",
            'D': "Sai. Quản lý người dùng và quyền truy cập (IAM) là trách nhiệm của khách hàng, AWS chỉ cung cấp công cụ. Đây không phải kiểm soát thừa hưởng.",
        },
        tips=["Inherited = vật lý và môi trường (data center). Shared = patch, configuration, awareness và training. Customer specific = IAM, dữ liệu, ứng dụng.", "Thấy 'fully inherit' thì chọn thứ gì thuộc về tòa nhà và phần cứng."],
        keywords=[{"term": "fully inherit", "points_to": "Kiểm soát vật lý và môi trường của AWS"}],
    ),
    'pe17-28': dict(
        correct=[1],
        note="Đề gốc đánh dấu Amazon VPC. Dịch vụ cung cấp kết nối mạng riêng giữa hạ tầng tại chỗ và AWS trong kiến trúc hybrid là AWS Direct Connect (hoặc Site-to-Site VPN), nên đáp án đã được chỉnh thành B.",
        explanation="Kiến trúc hybrid kết hợp hạ tầng tại chỗ với AWS Cloud, nên cần một đường kết nối mạng giữa hai phía. AWS Direct Connect cung cấp đường kết nối chuyên dụng, riêng tư từ trung tâm dữ liệu của khách hàng tới AWS, với băng thông ổn định và độ trễ thấp hơn đi qua Internet. Amazon VPC là mạng ảo bên trong AWS, bản thân nó không nối tới hạ tầng tại chỗ nếu thiếu Direct Connect hoặc VPN.",
        analyses={
            'A': "Sai. VPC là mạng riêng ảo nằm trong AWS. Muốn nối VPC với hạ tầng tại chỗ vẫn phải dùng thêm Direct Connect hoặc Site-to-Site VPN, nên VPC không phải dịch vụ cung cấp kết nối hybrid.",
            'B': "Đúng. Direct Connect tạo đường kết nối mạng chuyên dụng từ data center của bạn tới AWS, là thành phần chính của kiến trúc hybrid khi cần băng thông ổn định và độ trễ thấp.",
            'C': "Sai. AWS Directory Service cung cấp thư mục Active Directory được quản lý để xác thực người dùng. Nó liên quan tới danh tính, không phải kết nối mạng.",
            'D': "Sai. API Gateway là dịch vụ tạo và quản lý API cho ứng dụng. Nó không cung cấp đường kết nối mạng giữa tại chỗ và AWS.",
        },
        tips=["'Hybrid network connectivity' thường là Direct Connect (đường riêng) hoặc Site-to-Site VPN (qua Internet, mã hóa).", "VPC là nơi đặt tài nguyên trong AWS, không phải đường nối ra ngoài."],
        keywords=[{"term": "hybrid architecture", "points_to": "AWS Direct Connect / Site-to-Site VPN"}],
    ),
    'pe20-10': dict(
        correct=[0, 2],
        note="Trong file đề gốc đáp án ghi là 'Ac' (chữ c viết thường) nên bị đọc thiếu. Đáp án đúng gồm hai phương án A và C.",
        explanation="Trụ cột Reliability của Well-Architected Framework yêu cầu quản lý thay đổi một cách có kiểm soát: biết mình đang có tài nguyên nào và theo dõi được ai đã thay đổi gì. AWS Config ghi nhận và đánh giá cấu hình tài nguyên, tạo inventory và lịch sử thay đổi. AWS CloudTrail ghi lại mọi API call vào log có thể kiểm toán. Hai dịch vụ này cùng giúp phát hiện, truy vết và khắc phục thay đổi gây lỗi. Cần chọn đủ hai đáp án đúng.",
        analyses={
            'A': "Đúng. AWS Config tạo inventory tài nguyên và lưu lịch sử cấu hình, giúp biết trạng thái hiện tại và những thay đổi theo thời gian, nền tảng của quản lý thay đổi.",
            'B': "Sai. Service limit (quota) giới hạn số lượng tài nguyên để tránh dùng quá mức, không dùng để chặn người dùng thay đổi tài nguyên. Việc kiểm soát ai được làm gì là việc của IAM.",
            'C': "Đúng. CloudTrail ghi mọi API call thành log có thể kiểm toán, cho biết ai đã thay đổi tài nguyên nào, khi nào, hỗ trợ điều tra sự cố do thay đổi.",
            'D': "Sai. AWS Certificate Manager cấp và quản lý chứng chỉ SSL/TLS. Nó không dùng để whitelist tài nguyên hay dịch vụ được phê duyệt.",
            'E': "Sai. GuardDuty phát hiện mối đe dọa bảo mật từ log và hành vi bất thường, không dùng để xác thực các thay đổi cấu hình tài nguyên.",
        },
        tips=["Quản lý thay đổi trong Reliability: Config (cấu hình hiện tại và lịch sử), CloudTrail (ai đã làm gì).", "Loại các dịch vụ chứng chỉ (ACM) và phát hiện đe dọa (GuardDuty) vì không liên quan tới theo dõi thay đổi."],
        keywords=[{"term": "change management", "points_to": "AWS Config, AWS CloudTrail"}],
    ),
}

# 1) app data
p = 'src/data/dumpExams.json'
data = json.load(open(p))
for e in data:
    for q in e['questions']:
        c = CORRECTIONS.get(q['id'])
        if c:
            q['correctAnswers'] = c['correct']
            q['isMultipleResponse'] = len(c['correct']) > 1
json.dump(data, open(p, 'w'), ensure_ascii=False, indent=1)

# 2) explanations
for f in glob.glob('data/explanations/exam-*.json'):
    rows = json.load(open(f))
    changed = False
    for q in rows:
        c = CORRECTIONS.get(q['id'])
        if not c:
            continue
        q['explanation_vi'] = c['explanation']
        q['answer_note'] = c['note']
        q['tips'] = c['tips']
        q['keywords'] = c['keywords']
        for o in q['options']:
            o['is_correct'] = (ord(o['label']) - 65) in c['correct']
            o['analysis_vi'] = c['analyses'][o['label']]
        changed = True
    if changed:
        json.dump(rows, open(f, 'w'), ensure_ascii=False, indent=1)
print('corrected:', ', '.join(CORRECTIONS))
