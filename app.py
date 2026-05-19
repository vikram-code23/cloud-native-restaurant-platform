from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
menu_data = {
    "Biryani": [
        {"name": "Chicken Biryani", "price": 220},
        {"name": "Mutton Biryani", "price": 300},
        {"name": "Veg Biryani", "price": 180},
        {"name": "Egg Biryani", "price": 200},
        {"name": "Hyderabadi Biryani", "price": 260},
        {"name": "Fried Biryani", "price": 240}
    ],

    "Pizza": [
        {"name": "Cheese Pizza", "price": 250},
        {"name": "Chicken Pizza", "price": 300},
        {"name": "Paneer Pizza", "price": 270},
        {"name": "Farmhouse Pizza", "price": 320},
        {"name": "BBQ Pizza", "price": 350}
    ],

    "Burgers": [
        {"name": "Chicken Burger", "price": 180},
        {"name": "Veg Burger", "price": 120},
        {"name": "Cheese Burger", "price": 150},
        {"name": "Double Patty Burger", "price": 220}
    ],

    "Chinese": [
        {"name": "Fried Rice", "price": 160},
        {"name": "Noodles", "price": 150},
        {"name": "Manchurian", "price": 170},
        {"name": "Schezwan Rice", "price": 180}
    ],

    "Starters": [
        {"name": "Chicken 65", "price": 200},
        {"name": "Paneer Tikka", "price": 220},
        {"name": "Chilli Chicken", "price": 240},
        {"name": "French Fries", "price": 120}
    ],

    "Ice Cream": [
        {"name": "Vanilla", "price": 80},
        {"name": "Chocolate", "price": 90},
        {"name": "Strawberry", "price": 85},
        {"name": "Butterscotch", "price": 100}
    ],

    "Drinks": [
        {"name": "Coke", "price": 50},
        {"name": "Pepsi", "price": 50},
        {"name": "Lemon Juice", "price": 70},
        {"name": "Mojito", "price": 120},
        {"name": "Milkshake", "price": 150}
    ],

    "Desserts": [
        {"name": "Gulab Jamun", "price": 90},
        {"name": "Brownie", "price": 120},
        {"name": "Cake", "price": 150}
    ],
    "Ice Cream": [
    {"name": "Vanilla Ice Cream", "price": 80},
    {"name": "Chocolate Ice Cream", "price": 90},
    {"name": "Strawberry Ice Cream", "price": 85},
    {"name": "Butterscotch Ice Cream", "price": 100},
    {"name": "Black Currant", "price": 110},
    {"name": "Mango Ice Cream", "price": 95},
    {"name": "Kulfi", "price": 70},
    {"name": "Choco Chip", "price": 120},
    {"name": "Caramel Ice Cream", "price": 110},
    {"name": "Dry Fruit Ice Cream", "price": 130}
]
}
@app.route('/')
def home():
    return "VK Food App is Running 🚀"
@app.route('/menu')
def menu_home():
    return "Use /menu/<category> to view items"
@app.route('/categories')
def categories():
    return jsonify(list(menu_data.keys()))

@app.route('/menu/<category>')
def get_menu(category):
    return jsonify(menu_data.get(category, []))

@app.route('/order', methods=['POST'])
def order():
    data = request.get_json()
    return jsonify({"message": "Order placed successfully ✅", "order": data})

if __name__ == '__main__':
    app.run(debug=True)