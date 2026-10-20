"""Post-process generated explanations: trim filler, fix notes that became outdated.
Usage: python3 scripts/finalize-explanations.py <in-dir> <out-dir>
Facts below were verified against AWS announcements (Dec 2025 Support plan restructure,
CodeCommit returning to GA in Nov 2025, Snowmobile/Snowcone retirement, Chime end of support).
"""
import json, re, sys, glob, os

src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)

SUPPORT_NOTE = ("AWS đã tái cấu trúc các gói Support từ tháng 12/2025: hiện có Business Support+, Enterprise Support "
                "và Unified Operations. Các gói Developer, Business (cũ) và Enterprise On-Ramp được ngừng dần "
                "(dự kiến từ 01/2027). Đề thi và đáp án ở đây dùng cấu trúc gói cũ nên vẫn giữ nguyên.")
CODECOMMIT_NOTE = ("AWS CodeCommit từng ngừng nhận khách hàng mới (07/2024) rồi mở lại cho khách hàng mới từ tháng 11/2025. "
                   "Về kiến thức thi, nó vẫn là dịch vụ kho mã nguồn Git được quản lý.")
OVERRIDES = {
    'pe4-6': "AWS đã ngừng cung cấp Snowmobile (2024) và Snowcone (11/2024). Về kiến thức thi, Snowmobile vẫn là đáp án cho di chuyển dữ liệu quy mô hàng chục PB đến EB; hiện AWS hướng tới các cách truyền trực tuyến như AWS DataSync.",
    'pe3-22': "Hiện nay AWS có dịch vụ Service Quotas để xem và yêu cầu tăng giới hạn dịch vụ. Đáp án giữ nguyên theo đề gốc.",
    'pe7-39': "AWS khuyến nghị dùng AWS Elemental MediaConvert cho việc chuyển mã media thay cho Amazon Elastic Transcoder. Đáp án A vẫn đúng theo đề gốc.",
}
FILLER = ["Đây là đáp án đúng.", "Đúng yêu cầu.", "Đúng với yêu cầu."]
SUPPORT_RE = re.compile(r'On-Ramp|Unified Operations|gói (Business|Enterprise|support)|Support Concierge|Enterprise On', re.I)

def fix_note(qid, note):
    if qid in OVERRIDES: return OVERRIDES[qid]
    if re.search(r'CodeCommit', note): return CODECOMMIT_NOTE
    if SUPPORT_RE.search(note) and not re.search(r'đáp án gốc (sai|có thể)|gây tranh cãi', note): return SUPPORT_NOTE
    return note

stats = dict(trimmed=0, notes_fixed=0, text_fixed=0)
for f in sorted(glob.glob(os.path.join(src, 'exam-*.json'))):
    data = json.load(open(f))
    for q in data:
        for o in q['options']:
            a = o['analysis_vi'].strip()
            for filler in FILLER:
                b = a.replace(' ' + filler, '').replace(filler, '').strip()
                if b != a and len(b) >= 40:
                    a = b; stats['trimmed'] += 1
            o['analysis_vi'] = a
        if q['id'] == 'pe9-1':
            for o in q['options']:
                o['analysis_vi'] = o['analysis_vi'].replace(', và dịch vụ này cũng đã ngừng nhận khách hàng mới.', '.')
            stats['text_fixed'] += 1
        if q['id'] == 'pe7-43':
            q['explanation_vi'] = q['explanation_vi'].replace('Lưu ý CodeCommit nay đã ngừng nhận khách hàng mới.', 'AWS CodeCommit là kho mã nguồn Git được quản lý.')
            stats['text_fixed'] += 1
        if q.get('answer_note'):
            new = fix_note(q['id'], q['answer_note'])
            if new != q['answer_note']: stats['notes_fixed'] += 1
            q['answer_note'] = new
    json.dump(data, open(os.path.join(dst, os.path.basename(f)), 'w'), ensure_ascii=False, indent=1)
print(stats)
