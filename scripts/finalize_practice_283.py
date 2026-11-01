import json

with open('src/data/practice283.json') as f:
    questions = json.load(f)

for q in questions:
    num = int(q['id'].replace('practice-283-', ''))
    
    if num == 1:
        q['domain'] = 'Domain 1: Cloud Concepts'
        
    if num == 125:
        q['options'] = [
            'Physical security of AWS facilities',
            'Configuration of security groups',
            'Encryption of customer data on AWS',
            'Management of AWS Lambda infrastructure',
            'Management of network throughput of each AWS Region'
        ]
        q['correctAnswers'] = [1, 2] # B and C
        q['explanationVi'] = (
            "Theo mô hình chia sẻ trách nhiệm của AWS (AWS Shared Responsibility Model):\n"
            "- Khách hàng chịu trách nhiệm bảo mật TRONG đám mây (Security IN the cloud): cấu hình security groups, mã hóa dữ liệu của khách hàng (B và C).\n"
            "- AWS chịu trách nhiệm bảo mật CỦA đám mây (Security OF the cloud): an ninh vật lý các trung tâm dữ liệu, hạ tầng mạng, máy chủ và hạ tầng chạy Lambda."
        )

    if num == 252:
        q['options'] = [
            'VPC endpoint',
            'Virtual private gateway',
            'AWS Shield Standard',
            'AWS Config',
            'AWS WAF'
        ]
        q['correctAnswers'] = [2, 4] # C and E
        q['explanationVi'] = (
            "Đáp án đúng là AWS Shield Standard và AWS WAF (lựa chọn C và E):\n"
            "- AWS WAF là tường lửa ứng dụng web bảo vệ trước các tấn công SQL Injection và Cross-Site Scripting (XSS).\n"
            "- AWS Shield Standard được kích hoạt tự động miễn phí để bảo vệ chống lại các cuộc tấn công từ chối dịch vụ (DDoS) phổ biến ở tầng mạng và tầng truyền tải (Layer 3 & Layer 4)."
        )

    if num == 264:
        q['options'] = [
            'The migration of enterprise applications to the AWS Cloud makes these applications automatically available on mobile devices.',
            'AWS availability and security provide the ability to improve service level agreements (SLAs) while reducing risk and unplanned downtime.',
            'Companies that migrate to the AWS Cloud eliminate the need to plan for high availability and disaster recovery.',
            'Companies that migrate to the AWS Cloud reduce IT costs related to infrastructure, freeing budget for reinvestment in other areas.',
            'Applications are modernized because migration to the AWS Cloud requires companies to rearchitect and rewrite all enterprise applications.'
        ]
        q['correctAnswers'] = [1, 3] # B and D
        q['explanationVi'] = (
            "Đáp án đúng là B và D:\n"
            "- B: Tính sẵn sàng cao và bảo mật nhiều lớp của AWS cho phép doanh nghiệp cải thiện cam kết SLA, giảm thiểu rủi ro và thời gian gián đoạn (unplanned downtime).\n"
            "- D: Chuyển dịch lên AWS giúp giảm chi phí hạ tầng IT cố định, chuyển thành chi phí biến đổi linh hoạt và giải phóng ngân sách đầu tư cho các dự án kinh doanh khác."
        )

# Save clean json
with open('src/data/practice283.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

print("Saved updated src/data/practice283.json")
