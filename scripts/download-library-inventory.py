"""Fetch immutable upstream Git trees for complete catalogue discovery (no source execution)."""
import json,pathlib,urllib.request,concurrent.futures,time,os,re
base=pathlib.Path(os.environ.get('CATALOG_LIBRARY_CACHE','/private/tmp/rendyn-complete-libraries'));base.mkdir(parents=True,exist_ok=True)
cfg=json.load(open(pathlib.Path(__file__).resolve().parent.parent/'sources/libraries.json'))
for c in cfg:
 assert re.fullmatch(r'https://github\.com/[\w.-]+/[\w.-]+',c['repository'])
 assert re.fullmatch(r'[a-f0-9]{40}',c['commit'])
 assert re.fullmatch(r'[a-z0-9-]+',c['id'])
def request(url):
 for n in range(3):
  try:
   req=urllib.request.Request(url,headers={'User-Agent':'Rendyn-catalogue-import','Accept':'application/vnd.github+json'})
   return urllib.request.urlopen(req,timeout=60).read()
  except Exception:
   if n==2:raise
   time.sleep(n+1)
def tree(c):
 p=base/(c['id']+'-tree.json')
 if not p.exists():p.write_bytes(request('https://api.github.com/repos/'+c['repository'].split('github.com/')[1]+'/git/trees/'+c['commit']+'?recursive=1'))
 t=json.loads(p.read_text());assert not t.get('truncated'),c['id'];paths=[r['path'] for r in t['tree'] if r['type']=='blob'];(base/(c['id']+'-paths.json')).write_text(json.dumps(paths));return c['id'],paths
for id,paths in concurrent.futures.ThreadPoolExecutor(max_workers=3).map(tree,cfg):
 print(id,len(paths),'upstream files inventoried',flush=True)
