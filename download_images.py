#!/usr/bin/env python3
"""
Script para descargar imágenes de Amazon CDN al repositorio local.
Ejecutar una sola vez desde la raíz del proyecto:
  python3 download_images.py
"""

import urllib.request
import os

OUTPUT_DIR = "img/marcas"
os.makedirs(OUTPUT_DIR, exist_ok=True)

IMAGES = [
    "https://m.media-amazon.com/images/I/5184IXPAQ0L._AC_SX569_.jpg",
    "https://m.media-amazon.com/images/I/51eRDCkjsZL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/618Hvik8anL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61CN0VNlL2L._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61EXt4dz5UL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/61HiQSf9noL._AC_SY606_.jpg",
    "https://m.media-amazon.com/images/I/61QZO3WO1yL._AC_SX569_.jpg",
    "https://m.media-amazon.com/images/I/61QobVx4qYL._AC_SX425_.jpg",
    "https://m.media-amazon.com/images/I/61UAESldg2L._AC_SX425_.jpg",
    "https://m.media-amazon.com/images/I/61ZrVPT1LxL._AC_SY679_.jpg",
    "https://m.media-amazon.com/images/I/61eHrysSU0L._AC_SX425_.jpg",
    "https://m.media-amazon.com/images/I/61f0DShRVNL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/61iSEPiwkYL._AC_SL1000_.jpg",
    "https://m.media-amazon.com/images/I/61lXpQSFyLL._AC_SX569_.jpg",
    "https://m.media-amazon.com/images/I/61qjuVmjJwL._AC_SY550_.jpg",
    "https://m.media-amazon.com/images/I/61tQIltcLuL._AC_SX569_.jpg",
    "https://m.media-amazon.com/images/I/71Po++dL38L._AC_SY741_.jpg",
    "https://m.media-amazon.com/images/I/71ry515aMuL._AC_SY679_.jpg",
    "https://m.media-amazon.com/images/I/811IohSMpYL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81AhGjPs3XL._AC_SX569_.jpg",
    "https://m.media-amazon.com/images/I/81GNaZ5fO2L._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81LKX3knvCL._AC_SY606_.jpg",
    "https://m.media-amazon.com/images/I/81b1VepctZL._AC_SX569_.jpg",
    "https://m.media-amazon.com/images/I/81fOUr20J+L._AC_SX569_.jpg",
    "https://m.media-amazon.com/images/P/B09VT147V5.01._SL500_.jpg",
    "https://m.media-amazon.com/images/P/B0DG5XMR67.01._SL500_.jpg",
]

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.amazon.es/",
}

ok = 0
fail = 0
for url in IMAGES:
    filename = url.split("/")[-1]
    out_path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        print(f"  ✓ Ya existe: {filename}")
        ok += 1
        continue
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
        with open(out_path, "wb") as f:
            f.write(data)
        print(f"  ✓ Descargado: {filename} ({len(data)//1024} KB)")
        ok += 1
    except Exception as e:
        print(f"  ✗ Error: {filename} — {e}")
        fail += 1

print(f"\nResultado: {ok} OK, {fail} errores")
print(f"Ahora ejecuta:\n  git add img/marcas/\n  git commit -m 'Añadir imágenes locales de marcas'\n  git push")
