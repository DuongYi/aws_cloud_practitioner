import urllib.request, urllib.parse, json, re, time, os
from concurrent.futures import ThreadPoolExecutor, as_completed

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

def translate_worker(q_item):
    qid = q_item['id']
    if qid in cache and cache[qid].get('q_vi') and cache[qid].get('exp_vi'):
        return qid, cache[qid]
        
    q_text = q_item['question']
    exp_text = q_item['explanation']
    clean_exp = re.sub(r'References?:.*$', '', exp_text, flags=re.I).strip()
    clean_exp = re.sub(r'^\(\s*(?:SHOW ANSWER|LEAVE A REPLY)\s*\)\s*', '', clean_exp).strip()
    
    opts = q_item['options']
    payload = f"<<<1>>>\n{q_text}\n<<<2>>>\n{clean_exp}\n<<<3>>>\n" + "\n".join(f"[{i}] {opt}" for i, opt in enumerate(opts))
    
    for attempt in range(3):
        try:
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
                    
                if len(opts_vi) != len(opts):
                    opts_vi = opts
                    
                return qid, {
                    'q_vi': q_vi,
                    'exp_vi': exp_vi,
                    'opts_vi': opts_vi
                }
        except Exception as e:
            time.sleep(1 + attempt)
            
    return qid, {
        'q_vi': q_item['question'],
        'exp_vi': q_item['explanation'],
        'opts_vi': q_item['options']
    }

to_process = [q for q in questions if q['id'] not in cache]
print(f"Items to process: {len(to_process)}")

done_count = 0
with ThreadPoolExecutor(max_workers=6) as executor:
    futures = {executor.submit(translate_worker, q): q['id'] for q in to_process}
    for fut in as_completed(futures):
        qid, res = fut.result()
        cache[qid] = res
        done_count += 1
        if done_count % 15 == 0:
            print(f"Progress: {done_count}/{len(to_process)} translated ({len(cache)}/283 total in cache)")
            with open(CACHE_FILE, 'w', encoding='utf-8') as f:
                json.dump(cache, f, ensure_ascii=False, indent=2)

with open(CACHE_FILE, 'w', encoding='utf-8') as f:
    json.dump(cache, f, ensure_ascii=False, indent=2)

print(f"All translations complete! Total in cache: {len(cache)} / 283")
