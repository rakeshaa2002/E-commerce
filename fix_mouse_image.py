import urllib.request
import os

# New, more direct URL for Logitech MX Master 3S type image
mouse_url = "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop"

os.makedirs("media/images", exist_ok=True)
headers = {'User-Agent': 'Mozilla/5.0'}

print("Downloading mouse.jpg...")
try:
    req = urllib.request.Request(mouse_url, headers=headers)
    with urllib.request.urlopen(req) as response:
        with open("media/images/mouse.jpg", "wb") as f:
            f.write(response.read())
    print("Successfully downloaded mouse.jpg")
except Exception as e:
    print(f"Failed to download mouse.jpg: {e}")
