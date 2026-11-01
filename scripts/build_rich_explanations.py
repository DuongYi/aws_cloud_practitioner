import urllib.request, urllib.parse, json, re, time, os

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

CACHE_FILE = 'scratch_translations_rich.json'
cache = {}
if os.path.exists(CACHE_FILE):
    try:
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            cache = json.load(f)
    except:
        cache = {}

print(f"Loaded {len(cache)} existing rich translations from cache.")

with open('src/data/practice283.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

def translate_q(q_item):
    q_text = q_item['question']
    exp_text = q_item['explanation']
    # Strip References:
    clean_exp = re.sub(r'References?:.*$', '', exp_text, flags=re.I).strip()
    clean_exp = re.sub(r'^\(\s*(?:SHOW ANSWER|LEAVE A REPLY)\s*\)\s*', '', clean_exp).strip()
    
    opts = q_item['options']
    payload = f"<<<1>>>\n{q_text}\n<<<2>>>\n{clean_exp}\n<<<3>>>\n" + "\n".join(f"[{i}] {opt}" for i, opt in enumerate(opts))
    
    url = 'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=vi&q=' + urllib.parse.quote(payload)
    req = urllib.request.Request(url, headers=headers)
    
    with urllib.request.urlopen(req, timeout=12) as r:
        res = json.loads(r.read().decode('utf-8'))
        trans = res[0] if isinstance(res, list) and res else str(res)
        
        parts_1 = trans.split('<<<1>>>')
        after_1 = parts_1[1] if len(parts_1) > 1 else trans
        parts_2 = after_1.split('<<<2>>>')
        q_vi = parts_2[0].strip()
        after_2 = parts_2[1] if len(parts_2) > 1 else ""
        parts_3 = after_2.split('<<<3>>>')
        exp_vi = parts_3[0].strip()
        opts_raw = parts_3[1].strip() if len(parts_3) > 1 else ""
        
        opts_vi = []
        for line in opts_raw.split('\n'):
            line = line.strip()
            if not line:
                continue
            clean_line = re.sub(r'^\[\d+\]\s*', '', line)
            opts_vi.append(clean_line)
            
        # Fallback if opts count doesn't match
        if len(opts_vi) != len(opts):
            opts_vi = opts
            
        return {
            'q_vi': q_vi,
            'exp_vi': exp_vi,
            'opts_vi': opts_vi
        }

print(f"Starting translation of remaining questions (total {len(questions)})...")
completed = 0
for idx, q in enumerate(questions):
    qid = q['id']
    if qid in cache and cache[qid].get('q_vi') and cache[qid].get('exp_vi'):
        continue
        
    try:
        data = translate_q(q)
        cache[qid] = data
        completed += 1
        print(f"[{idx+1}/283] {qid}: {data['q_vi'][:50]}...")
        if completed % 10 == 0:
            with open(CACHE_FILE, 'w', encoding='utf-8') as f:
                json.dump(cache, f, ensure_ascii=False, indent=2)
        time.sleep(0.3)
    except Exception as e:
        print(f"Error on {qid}: {e}")
        time.sleep(1)

with open(CACHE_FILE, 'w', encoding='utf-8') as f:
    json.dump(cache, f, ensure_ascii=False, indent=2)

print(f"Translation finished! Total translated in cache: {len(cache)} / 283")
