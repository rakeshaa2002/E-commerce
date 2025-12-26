import urllib.request
import os

images = {
    "sony_headphones.jpg": "https://images.unsplash.com/photo-1655025492211-5d9c79212002?q=80&w=1000&auto=format&fit=crop",
    "iphone_15_pro.jpg": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
    "nike_shoes.jpg": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    "naruto_figure.jpg": "https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=1000&auto=format&fit=crop",
    "mouse.jpg": "https://images.unsplash.com/photo-1631553127988-3486ec824905?q=80&w=1000&auto=format&fit=crop",
    "ps5.jpg": "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1000&auto=format&fit=crop",
    "camera.jpg": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    "alexa.jpg": "https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1000&auto=format&fit=crop"
}

os.makedirs("media/images", exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

for name, url in images.items():
    print(f"Downloading {name}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            with open(os.path.join("media/images", name), "wb") as f:
                f.write(response.read())
        print(f"Successfully downloaded {name}")
    except Exception as e:
        print(f"Failed to download {name}: {e}")

print("Done!")
