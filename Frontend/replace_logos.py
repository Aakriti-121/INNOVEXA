import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define the global defs SVG to insert after <body>
global_defs = '''
  <!-- GLOBAL SVG DEFS FOR ANNOVEXA LOGO -->
  <svg width="0" height="0" style="position:absolute; width:0; height:0; overflow:hidden;" aria-hidden="true">
    <defs>
      <linearGradient id="annovexaGrad_GLOBAL" x1="52" y1="16" x2="52" y2="92" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#00f2fe"/><stop offset="25%" stop-color="#00d2ff"/><stop offset="70%" stop-color="#0284c7"/><stop offset="100%" stop-color="#0369a1"/>
      </linearGradient>
      <filter id="annovexaGlow_GLOBAL" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#00d2ff" flood-opacity="0.45"/>
      </filter>
      <filter id="softHalo_GLOBAL" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3.5"/>
      </filter>
    </defs>
  </svg>
'''

# The unified logo container HTML
unified_logo = '''<div class="annovexa-logo-container" style="width: 36px; height: 36px; border-radius: 9px; background: linear-gradient(135deg, rgba(0, 210, 255, 0.18), rgba(0, 210, 255, 0.04)); border: 1px solid rgba(0, 210, 255, 0.35); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px rgba(0, 210, 255, 0.3); flex-shrink: 0;">
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 28px; height: 28px; filter: drop-shadow(0 0 6px rgba(0, 210, 255, 0.6));">
    <g filter="url(#annovexaGlow_GLOBAL)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M 53 19.5 L 57 19.5 L 85 86 L 71.5 86 L 65 67 L 39 67 L 32.5 86 L 19 86 L 47 19.5 Z M 52 38 L 60 57.5 L 44 57.5 Z" fill="url(#annovexaGrad_GLOBAL)"/>
      <circle cx="21" cy="85.5" r="5" fill="#00b4d8"/>
      <circle cx="83" cy="85.5" r="5" fill="#0284c7"/>
      <circle cx="52" cy="19.5" r="9" fill="#00f2fe" opacity="0.4" filter="url(#softHalo_GLOBAL)"/>
      <circle cx="52" cy="19.5" r="5" fill="#38bdf8"/>
      <line x1="52" y1="49" x2="79" y2="38" stroke="#38bdf8" stroke-width="2" stroke-dasharray="2.5 2" stroke-linecap="round" opacity="0.95"/>
      <circle cx="79" cy="38" r="9" fill="#38bdf8" opacity="0.38" filter="url(#softHalo_GLOBAL)"/>
      <circle cx="79" cy="38" r="4.5" fill="#7dd3fc"/>
      <circle cx="52" cy="49" r="6.5" fill="#00d2ff" opacity="0.5" filter="url(#softHalo_GLOBAL)"/>
      <circle cx="52" cy="49" r="4.2" fill="#ffffff"/>
    </g>
  </svg>
</div>'''

# Regex to match the logo containers
pattern = r'<div style="width: 3[268]px; height: 3[268]px; border-radius: [89]px; background: linear-gradient[^>]+>.*?<\/svg>\s*<\/div>'

count = 0
def repl(m):
    global count
    count += 1
    return unified_logo

new_html = re.sub(pattern, repl, html, flags=re.DOTALL)
print(f"Replaced {count} logos.")

# Insert global defs after <body> if not already present
if 'GLOBAL SVG DEFS FOR ANNOVEXA LOGO' not in new_html:
    new_html = new_html.replace('<body>', f'<body>\n{global_defs}')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

