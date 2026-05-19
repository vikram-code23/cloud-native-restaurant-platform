function loadCart() {

    const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const container =
    document.getElementById("cartItems");

    const totalPrice =
    document.getElementById("totalPrice");

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item,index) => {

        total += item.price * item.quantity;

        container.innerHTML += `

        <div class="cart-item">

            <div>

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

            </div>

            <div class="qty-box">

<button onclick="changeQty(${index},-1)">
-
</button>

<span>${item.quantity}</span>

<button onclick="changeQty(${index},1)">
+
</button>

<button
class="remove-btn"
onclick="removeItem(${index})"
>
❌
</button>

            </div>

        </div>

        `;

    });

    totalPrice.innerText =
    `Total: ₹${total}`;

}

function changeQty(index,change){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += change;

    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();

}

function removeItem(index){

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();

}

function showToast(message){

    const toast =
    document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },2500);

}

function placeOrder() {

    const user =
    JSON.parse(localStorage.getItem("user"));

    const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    const paymentMethod =
    document.getElementById("paymentMethod").value;

    const tableNumber =
    document.getElementById("tableNumber").value;

    if(cart.length === 0){

        showToast("Cart empty 😭");

        return;

    }

    // 🔥 fake payment loading

    showToast("Processing Payment... 💳");

    setTimeout(() => {

fetch("/api/place-order", {

    method:"POST",

    headers:{
        "Content-Type":"application/json"
    },

    body:JSON.stringify({

        userId:user.id,

        tableNo:tableNumber,

        paymentMethod,

        orders:cart

    })

})

.then(res => res.text())

.then(data => {

    localStorage.removeItem("cart");

    document.getElementById(
        "successScreen"
    ).style.display = "flex";

    setTimeout(() => {

        window.location.href =
        "orders.html";

    },2500);

})

.catch(err => {

    console.log(err);

    showToast("Order Failed ❌");

});

    },2000);

}