import json, re, os

# 1. Load raw questions
with open('scratch_parsed_raw.json') as f:
    questions = json.load(f)

# 2. Cleaned OCR for questions 10, 20, ... 280
cleaned_ocr = {
    10: "Which of the following is a fully managed graph database service on AWS?",
    20: "A company is hosting an application in the AWS Cloud. The company wants to verify that the underlying AWS infrastructure is compliant with required standards. Which AWS service should the company use?",
    30: "Which characteristic of the AWS Cloud helps users eliminate underutilized CPU capacity?",
    40: "A company needs to perform data processing once a week that typically takes about 5 hours to complete. Which AWS service should the company use for this workload?",
    50: "A company is running an application on AWS. The company wants to identify and prevent the accidental deletion of Amazon S3 objects. Which AWS service or feature will meet these requirements?",
    60: "A company wants its Amazon EC2 instances to share the same geographic area but use redundant underlying power sources. Which solution will meet these requirements?",
    70: "Which perspective of the AWS Cloud Adoption Framework (AWS CAF) connects technology and business?",
    80: "A company wants to ensure that all of its Amazon EC2 instances have compliant operating system patches. Which AWS service will meet these requirements?",
    90: "A company wants to receive a notification when a specific AWS cost threshold is reached. Which AWS services or tools can the company use to meet this requirement? (Select TWO.)",
    100: "A company wants to track its AWS account's service costs. The company also wants to receive notifications when costs are forecasted to reach a specific level. Which AWS service or tool provides this functionality?",
    110: "A company has a physical tape library to store data backups. The tape library is running out of space. The company needs to extend the tape library's capacity to the AWS Cloud. Which AWS service should the company use to meet this requirement?",
    120: "A company has a workload that requires data to be collected, analyzed, and stored on premises. The company wants to extend the use of AWS services to run on premises with access to the company network and the company's VPC. Which AWS service meets this requirement?",
    130: "What is a benefit of AWS serverless computing?",
    140: "A company is running and managing its own Docker environment on Amazon EC2 instances. The company wants an alternative to help manage cluster size, scheduling, and environment maintenance. Which AWS service meets these requirements?",
    150: "Which AWS Support plan provides customers with access to an AWS technical account manager (TAM)?",
    160: "A company wants to migrate its on-premises data warehouse to AWS. The information in the data warehouse is used to populate analytics dashboards. Which AWS service should the company use for the data warehouse?",
    170: "A company needs to set up user authentication for a mobile application. Users must be able to sign in directly with a user name and password, or through a third-party identity provider. Which AWS service should the company use to meet these requirements?",
    180: "Which options are perspectives that include foundational capabilities of the AWS Cloud Adoption Framework (AWS CAF)? (Select TWO.)",
    190: "Which AWS service should be used when a company needs to provide its remote employees with virtual desktops?",
    200: "Which AWS Support plan is the minimum recommended tier for users who have production workloads on AWS?",
    210: "A company wants to run its production workloads on AWS. The company needs concierge service, a designated AWS technical account manager (TAM), and technical support that is available 24 hours a day, 7 days a week. Which AWS Support plan will meet these requirements?",
    220: "A company needs help managing multiple AWS linked accounts that are reported on a consolidated bill. Which AWS Support plan includes an AWS concierge whom the company can ask for assistance?",
    230: "A company is using AWS Lambda functions to build an application. Which tasks are the company's responsibility, according to the AWS shared responsibility model? (Select TWO.)",
    240: "Which AWS service offers consolidated billing?",
    250: "Which AWS service is designed to help users build conversational interfaces into applications using voice and text?",
    260: "A company needs a fully managed, scalable elastic NFS file system for use with AWS Cloud services and on-premises resources. Which AWS service meets these requirements?",
    270: "Which AWS service or feature is used to send both text and email messages from distributed applications?",
    280: "Which of the following is an AWS Well-Architected Framework design principle for operational excellence in the AWS Cloud?"
}

# 3. Verified answers
overrides = {
    1: ['D'], 2: ['B'], 3: ['C'], 4: ['B'], 5: ['B'], 6: ['B', 'E'], 7: ['A'], 8: ['A'], 9: ['A', 'E'],
    10: ['D'], 20: ['C'], 26: ['A', 'C'], 30: ['A'], 39: ['C'], 40: ['A'], 43: ['A'], 46: ['B'],
    47: ['D'], 50: ['A'], 58: ['A', 'B'], 60: ['B'], 62: ['A'], 70: ['D'], 75: ['C'], 80: ['D'],
    89: ['B', 'C'], 90: ['A', 'C'], 92: ['B'], 97: ['C'], 100: ['A'], 107: ['B'], 110: ['B'],
    113: ['A', 'C'], 116: ['A', 'C'], 120: ['A'], 125: ['B', 'C'], 130: ['D'], 140: ['B'],
    150: ['D'], 151: ['A'], 160: ['D'], 161: ['A'], 165: ['B', 'C'], 170: ['C'], 172: ['B'],
    179: ['B'], 180: ['C', 'D'], 185: ['B', 'D'], 187: ['A'], 190: ['D'], 195: ['A', 'D'],
    198: ['C'], 200: ['C'], 201: ['C', 'E'], 210: ['B'], 211: ['B'], 216: ['C', 'E'], 219: ['D'],
    220: ['B'], 223: ['A'], 227: ['A'], 230: ['B', 'C'], 234: ['C'], 239: ['B'], 240: ['C'],
    242: ['A'], 244: ['B'], 250: ['A'], 252: ['C', 'D'], 255: ['A', 'E'], 260: ['D'], 261: ['B', 'C'],
    264: ['B', 'D'], 270: ['A'], 272: ['B'], 280: ['A']
}

def get_answer(q):
    num = q['num']
    if num in overrides:
        return overrides[num]
        
    if q.get('explicit_ans'):
        return q['explicit_ans']
        
    exp = q['explanation']
    opts = q['options']
    is_multi = q.get('is_multi', False)
    num_to_sel = q.get('num_to_select', 1)

    m = re.search(r'correct\s+answers?\s+(?:to\s+the\s+question\s+)?(?:are|is)\s+(?:option\s+|options\s+)?([A-F](?:\s*(?:and|,)\s*[A-F])*)', exp, re.I)
    if m:
        ans = re.findall(r'[A-F]', m.group(1).upper())
        if ans and (not is_multi or len(ans) == num_to_sel):
            return ans

    m = re.search(r'\b([A-F])\s+and\s+([A-F])\s+(?:are|were)\s+(?:the\s+)?correct\b', exp, re.I)
    if m:
        return [m.group(1).upper(), m.group(2).upper()]

    m = re.search(r'\bare\s+([A-F])\s+and\s+([A-F])\b', exp, re.I)
    if m:
        return [m.group(1).upper(), m.group(2).upper()]

    first_sentence = exp.split('.')[0] if '.' in exp else exp[:200]
    scores = []
    for letter, text in opts:
        clean = re.sub(r'\(.*?\)', '', text).strip()
        if len(clean) > 4 and clean.lower() in first_sentence.lower():
            scores.append((letter, 100 + len(clean)))
            continue
        words = [w.lower() for w in re.split(r'[^a-zA-Z0-9]+', clean) if len(w) > 3 and w.lower() not in {'using', 'with', 'from', 'that', 'this', 'have', 'make', 'which', 'deploy', 'company', 'customer'}]
        if words:
            matched = [w for w in words if re.search(r'\b' + re.escape(w) + r'\b', first_sentence, re.I)]
            if len(matched) / len(words) >= 0.7:
                scores.append((letter, 50))
                
    if scores:
        scores.sort(key=lambda x: x[1], reverse=True)
        if not is_multi:
            if len(scores) == 1 or scores[0][1] > scores[1][1]:
                return [scores[0][0]]
        else:
            if len(scores) >= num_to_sel:
                return [s[0] for s in scores[:num_to_sel]]

    return ['A']

# 4. Domain classification
def classify_domain(q_text, exp_text):
    q_lower = q_text.lower()
    exp_lower = exp_text.lower()
    combined = q_lower + " " + exp_lower
    
    if any(k in q_lower for k in ['support plan', 'concierge', 'technical account manager', 'tam', 'budgets', 'cost explorer', 'pricing calculator', 'consolidated bill', 'billing report', 'cost allocation tag', 'purchasing option', 'reserved instance', 'savings plan', 'spot instance', 'free tier']):
        return 'Domain 4: Billing, Pricing and Support'
        
    if any(k in q_lower for k in ['shared responsibility', 'iam', 'mfa', 'root user', 'least privilege', 'security group', 'network acl', 'waf', 'shield', 'kms', 'encryption', 'guardduty', 'inspector', 'macie', 'artifact', 'compliance', 'security hub', 'secrets manager', 'certificate manager', 'cloudtrail', 'firewall', 'security best practice']):
        return 'Domain 2: Security and Compliance'

    if any(k in q_lower for k in ['cloud adoption framework', 'caf', 'well-architected', 'pillar', 'agility', 'elasticity', 'economies of scale', 'global reach', 'capex', 'opex', 'hybrid', 'advantage of cloud', 'benefit of cloud', 'design principle']):
        return 'Domain 1: Cloud Concepts'
        
    if any(k in combined for k in ['support plan', 'concierge', 'cost explorer', 'aws budgets', 'pricing calculator', 'reserved instance', 'savings plan', 'spot instance']):
        return 'Domain 4: Billing, Pricing and Support'
        
    if any(k in combined for k in ['shared responsibility', 'iam', 'security group', 'network acl', 'aws waf', 'aws shield', 'kms', 'guardduty', 'inspector', 'macie', 'artifact', 'cloudtrail']):
        return 'Domain 2: Security and Compliance'

    if any(k in combined for k in ['well-architected', 'cloud adoption framework', 'economies of scale', 'agility', 'elasticity']):
        return 'Domain 1: Cloud Concepts'

    return 'Domain 3: Cloud Technology and Services'

# Load cache if available
translations_cache = {}
if os.path.exists('scratch/translations_cache.json'):
    try:
        with open('scratch/translations_cache.json') as f:
            translations_cache = json.load(f)
    except:
        pass

print(f"Loaded {len(translations_cache)} cached translations.")

# Function to generate clean Vietnamese explanation
def make_vietnamese_explanation(num, ans_letters, options, exp, domain):
    num_str = str(num)
    if num_str in translations_cache and len(translations_cache[num_str]) > 15:
        base_vi = translations_cache[num_str].strip()
        # Ensure it starts nicely
        return base_vi

    # Clean the English explanation: remove References
    clean_exp = re.sub(r'References?:.*$', '', exp, flags=re.I).strip()
    clean_exp = re.sub(r'^\(\s*(?:SHOW ANSWER|LEAVE A REPLY)\s*\)\s*', '', clean_exp).strip()

    ans_str = ', '.join(ans_letters)
    ans_texts = []
    for l in ans_letters:
        for opt_l, opt_t in options:
            if opt_l == l:
                ans_texts.append(f"{l} ({opt_t})")
                
    first_two = '. '.join([s.strip() for s in clean_exp.split('.')[:2] if s.strip()]) + '.'
    
    # Common AWS translations / explanations
    vi_exp = f"Đáp án đúng là {ans_str}: {', '.join(ans_texts)}.\n\n"
    vi_exp += f"Giải thích chi tiết: {first_two}\n"
    vi_exp += f"(Phân loại kiến thức: {domain})"
    return vi_exp

final_questions = []

for q in questions:
    num = q['num']
    q_text = cleaned_ocr.get(num, q['q_text'])
    
    # Clean options
    raw_opts = q['options']
    if num == 240:
        raw_opts = [(l, 'AWS Trusted Advisor' if 'A company wants to limit' in t else t) for l, t in raw_opts]
    
    options_text = [t.strip() for l, t in raw_opts]
    ans_letters = get_answer(q)
    
    opt_letters = [l for l, t in raw_opts]
    correct_indices = [opt_letters.index(l) for l in ans_letters if l in opt_letters]
    
    domain = classify_domain(q_text, q['explanation'])
    exp_vi = make_vietnamese_explanation(num, ans_letters, raw_opts, q['explanation'], domain)
    
    final_questions.append({
        'id': f'practice-283-{num}',
        'question': q_text,
        'options': options_text,
        'correctAnswers': correct_indices,
        'isMultipleResponse': len(correct_indices) > 1,
        'domain': domain,
        'explanation': q['explanation'],
        'explanationVi': exp_vi
    })

print(f"Generated {len(final_questions)} final questions.")

# Save to src/data/practice283.json
with open('src/data/practice283.json', 'w', encoding='utf-8') as f:
    json.dump(final_questions, f, ensure_ascii=False, indent=2)

print("Saved src/data/practice283.json successfully!")
