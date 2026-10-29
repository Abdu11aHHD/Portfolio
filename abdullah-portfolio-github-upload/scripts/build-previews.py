"""Rebuild self-contained first-screen previews after changing a portfolio or theme."""
from pathlib import Path
import base64,html,mimetypes,re
from functools import lru_cache
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/'dist'
@lru_cache(None)
def data_uri(path):
 path=Path(path);assert path.is_file(),path
 mime=mimetypes.guess_type(path)[0] or 'application/octet-stream'
 return 'data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode()
def inline_css(path):
 text=path.read_text();text=re.sub(r'@import\s+url\([^)]*\)\s*;','',text)
 def url(m):
  value=m.group(1).strip(' \"\'')
  if value.startswith('data:'):return m[0]
  assert not value.startswith(('https:','http:')),value
  return 'url("'+data_uri((path.parent/value).resolve())+'")'
 return re.sub(r'url\(([^)]+)\)',url,text)
def preview(key):
 folder=DIST/f'version-{key}';source=(folder/'index.html').read_text()
 body=re.search(r'<body[^>]*>(.*)</body>',source,re.S)[1]
 start=body.index('<section class="hero');end=body.index('</section>',start)+len('</section>')
 body=body[:end]+'</main>'
 body=re.sub(r'<script\b[^>]*>.*?</script>','',body,flags=re.S)
 # First-party image files become embedded assets, so private nested fetches cannot fail.
 def image(m):return 'src="'+data_uri((folder/m[1]).resolve())+'"'
 body=re.sub(r'src="([^"#]+)"',image,body)
 css=inline_css(folder/'styles.css')+'\n'+inline_css(DIST/'theme.css')
 if key=='a':css=inline_css(ROOT/'content/preview-fonts/fonts.css')+'\n'+css
 css+='\nhtml{overflow:hidden}body{margin:0}*,*::before,*::after{animation:none!important;transition:none!important}canvas{display:none!important}::-webkit-scrollbar{display:none}'
 return '<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=1200"><style>'+css+'</style></head><body data-surface="'+key+'">'+body+'</body></html>'
index=DIST/'index.html';source=index.read_text();count=0
# Replace both existing remote or self-contained previews on every build.
def replace(m):
 global count
 key='a' if count==0 else 'b';count+=1
 return '<iframe data-portfolio="'+key+'" srcdoc="'+html.escape(preview(key),quote=True)+'" title="Decorative preview of Version '+key.upper()+'" aria-hidden="true" tabindex="-1" loading="lazy"></iframe>'
source=re.sub(r'<iframe\b[^>]*></iframe>',replace,source)
assert count==2,count;index.write_text(source)
print('Built two fully embedded previews from current portfolio source.')
