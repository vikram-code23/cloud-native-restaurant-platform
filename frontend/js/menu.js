let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🔥 LOAD FOODS
async function loadFoods() {

    try {

        const response =
        await fetch("/api/foods");

        const foods =
        await response.json();

        console.log(foods);

        const foodContainer =
        document.getElementById("food-container");

        foodContainer.innerHTML = "";

        foods.forEach(food => {

            foodContainer.innerHTML += `

            <div class="food-card">

                <h2>${food.name}</h2>

                <p>Price: ₹${food.price}</p>

                <p>Category: ${food.category}</p>

                <p>${food.description}</p>

                <button
                onclick="addToCart(
                    '${food.name}',
                    ${food.price}
                )">

                    Add to Cart 🛒

                </button>

            </div>

            `;

        });

    }

    catch(error){

        console.log("Error loading foods:", error);

    }

}

// 🔥 ADD TO CART
function addToCart(name, price){

    console.log("ADD TO CART CLICKED");

    let existingItem =
    cart.find(item => item.name === name);

    if(existingItem){

        existingItem.quantity += 1;

    }

    else{

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    console.log(localStorage.getItem("cart"));

    showToast(`${name} added to cart 🛒`);

}

// 🔥 TOAST MESSAGE
function showToast(message){

    const toast =
    document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

// 🔥 INITIAL LOAD
loadFoods();