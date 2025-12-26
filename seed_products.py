
import os
import django
import random
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from base.models import Product
from django.contrib.auth.models import User

def seed_products():
    # Ensure a user exists to be the creator
    user = User.objects.filter(username='admin').first()
    if not user:
        user = User.objects.filter(email='admin@example.com').first()
    
    if not user:
        user = User.objects.create_user(username='admin', email='admin@example.com', password='password')

    products_data = [
        {
            "name": "Sony WH-1000XM5 Wireless Headphones",
            "image": "images/stone.jpg", # Robust fallback
            "brand": "Sony",
            "category": "Electronics",
            "description": "The best noise cancelling headphones on the market. Great battery life and sound quality.",
            "rating": 4.8,
            "numReviews": 120,
            "price": 348.00,
            "countInStock": 15
        },
        {
            "name": "Apple iPhone 15 Pro",
            "image": "images/juju.jpg", 
            "brand": "Apple",
            "category": "Electronics",
            "description": "Titanium design, A17 Pro chip, 48MP Main camera, and USB-C.",
            "rating": 4.9,
            "numReviews": 500,
            "price": 999.00,
            "countInStock": 10
        },
        {
            "name": "Nike Air Max 270",
            "image": "images/ichigo_shirt.jpg",
            "brand": "Nike",
            "category": "Fashion",
            "description": "Nike's first lifestyle Air Max brings you style, comfort and big attitude.",
            "rating": 4.5,
            "numReviews": 85,
            "price": 150.00,
            "countInStock": 25
        },
        {
            "name": "Naruto Uzumaki Collectible Figure",
            "image": "images/naruto_figure.jpg",
            "brand": "Bandai",
            "category": "Gaming",
            "description": "Highly detailed Naruto figure for your collection.",
            "rating": 4.9,
            "numReviews": 210,
            "price": 45.00,
            "countInStock": 30
        },
        {
            "name": "Logitech MX Master 3S",
            "image": "images/mouse.jpg",
            "brand": "Logitech",
            "category": "Electronics",
            "description": "The ultimate productivity mouse. Ergonomic and precise.",
            "rating": 4.8,
            "numReviews": 350,
            "price": 99.00,
            "countInStock": 40
        },
         {
            "name": "PlayStation 5 Console",
            "image": "images/ps5.jpg", # Success download
            "brand": "Sony",
            "category": "Gaming",
            "description": "Experience lightning fast loading with an ultra-high speed SSD.",
            "rating": 4.8,
            "numReviews": 2000,
            "price": 499.00,
            "countInStock": 5
        },
         {
            "name": "Canon EOS R5 Camera",
            "image": "images/camera.jpg", # Success download
            "brand": "Canon",
            "category": "Electronics",
            "description": "Professional 8K video and 45MP stills.",
            "rating": 4.6,
            "numReviews": 45,
            "price": 3899.00,
            "countInStock": 3
        },
        {
            "name": "Amazon Echo Dot (5th Gen)",
            "image": "images/alexa.jpg", # Success download
            "brand": "Amazon",
            "category": "Electronics",
            "description": "Our best sounding Echo Dot yet. Enjoy improved audio experience.",
            "rating": 4.7,
            "numReviews": 1100,
            "price": 49.00,
            "countInStock": 100
        }
    ]

    # clear existing products
    print("Clearing existing products...")
    Product.objects.all().delete()

    print("Seeding new products...")
    for p in products_data:
        product = Product.objects.create(
            user=user,
            name=p['name'],
            image=p['image'], # Path relative to MEDIA_ROOT
            brand=p['brand'],
            category=p['category'],
            description=p['description'],
            rating=p['rating'],
            numReviews=p['numReviews'],
            price=p['price'],
            countInStock=p['countInStock']
        )
        print(f"Created: {product.name}")

    print("Success! Database populated.")

if __name__ == '__main__':
    seed_products()
