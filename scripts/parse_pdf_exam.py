import pypdf, re, json

reader = pypdf.PdfReader('exam_pdf/pdf_exam.pdf')
full_text = '\n'.join([p.extract_text() for p in reader.pages])

# Remove header from first page
raw_chunks = re.split(r'NEW QUESTION:\s*(\d+)', full_text)

questions = []
for i in range(1, len(raw_chunks), 2):
    q_num = int(raw_chunks[i])
    chunk = raw_chunks[i+1].strip()
    questions.append((q_num, chunk))

print(f"Total questions in PDF: {len(questions)}")

parsed_questions = []

for q_num, chunk in questions:
    # Separate question+options from answer+explanation
    parts = re.split(r'Answer:\s*', chunk, maxsplit=1)
    q_and_opts = parts[0].strip()
    exp_raw = parts[1].strip() if len(parts) > 1 else ''
    
    # Check if there is an explicit answer string right after Answer:
    explicit_ans = None
    m_exp = re.match(r'^([A-F](?:\s*,\s*[A-F])*)\s*(?:\([^)]*\))?', exp_raw)
    if m_exp:
        explicit_ans = [x.strip() for x in m_exp.group(1).split(',')]
        explanation = re.sub(r'^[A-F](?:\s*,\s*[A-F])*\s*(?:\([^)]*\))?\s*', '', exp_raw).strip()
    else:
        explanation = re.sub(r'^\(\s*(?:SHOW ANSWER|LEAVE A REPLY)\s*\)\s*', '', exp_raw).strip()
    
    # Fix known OCR/PDF artifacts in q_and_opts: e.g. "Q C." -> "C.", "S B." -> "B."
    q_and_opts_fixed = re.sub(r'(?:^|\n)\s*[A-Z]\s+([A-F]\.)', r'\n\1', q_and_opts)
    
    # Extract options: look for lines starting with A., B., C., D., E., F.
    opt_matches = list(re.finditer(r'(?:^|\n)\s*([A-F])\.\s*(.+?)(?=(?:\n\s*[A-F]\.|\Z))', q_and_opts_fixed, re.DOTALL))
    
    if opt_matches:
        q_text = q_and_opts_fixed[:opt_matches[0].start()].strip()
        options = []
        for m in opt_matches:
            letter = m.group(1)
            text = re.sub(r'\s+', ' ', m.group(2)).strip()
            # Clean any trailing garbage
            options.append((letter, text))
    else:
        q_text = q_and_opts_fixed
        options = []
        
    q_text = re.sub(r'\s+', ' ', q_text).strip()
    explanation = re.sub(r'\s+', ' ', explanation).strip()
    
    # Determine if multi-response
    is_multi = bool(re.search(r'(?:select|choose)\s+(?:two|three|2|3)', q_text, re.I))
    num_to_select = 1
    if is_multi:
        m_sel = re.search(r'(?:select|choose)\s+(two|three|2|3)', q_text, re.I)
        if m_sel:
            val = m_sel.group(1).lower()
            num_to_select = 3 if val in ('three', '3') else 2

    parsed_questions.append({
        'num': q_num,
        'q_text': q_text,
        'options': options,
        'explicit_ans': explicit_ans,
        'is_multi': is_multi,
        'num_to_select': num_to_select,
        'explanation': explanation
    })

with open('scratch_parsed_raw.json', 'w') as f:
    json.dump(parsed_questions, f, indent=2)

print("Saved scratch_parsed_raw.json successfully!")
