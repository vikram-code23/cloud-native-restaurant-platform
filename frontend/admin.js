let lastOrdersData = "";
async function fetchOrders() {

    const response =
    await fetch("/api/orders");

    const orders = await response.json();
const currentData =
JSON.stringify(orders);
const notifySound =
new Audio("sounds/notification.mp3");
if(currentData === lastOrdersData){
    notifySound.play();
    
}

lastOrdersData = currentData;
    const container =
    document.getElementById("ordersContainer");

    

    // ===== STATS =====

    document.getElementById(
        "totalOrders"
    ).innerText = orders.length;

    let revenue = 0;
    let pending = 0;
    let delivered = 0;

    orders.forEach(order => {

        revenue += Number(order.total);

        if(order.status === "Pending"){
            pending++;
        }

        if(order.status === "Delivered"){
            delivered++;
        }

    });

    document.getElementById(
        "totalRevenue"
    ).innerText = `₹${revenue}`;

    document.getElementById(
        "pendingOrders"
    ).innerText = pending;

    document.getElementById(
        "deliveredOrders"
    ).innerText = delivered;

    // ===== GROUP ORDERS =====

    const grouped = {};

    orders.forEach(order => {

        const key = order.checkout_id;

        if(!grouped[key]){

            grouped[key] = {

                checkout_id: key,

                customer: order.user_name,

                table: order.table_no,

                status: order.status,

                time: order.created_at,

                total: 0,

                items: []

            };

        }

        grouped[key].items.push({

            food: order.food_name,

            qty: order.quantity,

            price: order.price

        });

        grouped[key].total += Number(order.total);

    });
container.innerHTML = "";
    // ===== DISPLAY =====

    Object.values(grouped)
    
    .forEach(order => {

        const div =
        document.createElement("div");

        div.classList.add("order-card");

        div.innerHTML = `

            <h3>
                🍽 Order
            </h3>

            <p>
            <strong>Customer:</strong>
            ${order.customer}
            </p>

            <p>
            <strong>Table:</strong>
            ${order.table || "-"}
            </p>

<p>
<strong>Time:</strong>
${
!isNaN(new Date(order.time))
? new Date(order.time).toLocaleString()
: "Recently"
}
</p>

            <div class="admin-items">

                ${order.items.map(item => `

                    <div class="food-row">

                        <span>
                            ${item.food}
                        </span>

                        <span>
                            x${item.qty}
                        </span>

                    </div>

                `).join("")}

            </div>

            <p class="grand-total">

                Total: ₹${order.total}

            </p>

<div class="status-buttons">

<button
class="status-btn pending-btn ${order.status === 'Pending' ? 'active-status' : ''}"
onclick="
updateStatusByCheckout(
'${order.checkout_id}',
'Pending'
)"
>
Pending
</button>

<button
class="status-btn preparing-btn ${order.status === 'Preparing' ? 'active-status' : ''}"
onclick="
updateStatusByCheckout(
'${order.checkout_id}',
'Preparing'
)"
>
Preparing
</button>

<button
class="status-btn ready-btn ${order.status === 'Ready' ? 'active-status' : ''}"
onclick="
updateStatusByCheckout(
'${order.checkout_id}',
'Ready'
)"
>
Ready
</button>

<button
class="status-btn delivered-btn ${order.status === 'Delivered' ? 'active-status' : ''}"
onclick="
updateStatusByCheckout(
'${order.checkout_id}',
'Delivered'
)"
>
Delivered
</button>

</div>

        `;

        container.appendChild(div);

    });

}

// ===== UPDATE STATUS =====

async function updateStatusByCheckout(
checkoutId,
status
){

    await fetch(

        `/api/checkout-status/${checkoutId}`,

        {

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({status})

        }

    );

    fetchOrders();

}

fetchOrders();

// ===== DASHBOARD SCROLL =====

document.getElementById(
    "dashboardBtn"
).addEventListener("click", () => {

    document.getElementById(
        "dashboardSection"
    ).scrollIntoView({
        behavior:"smooth"
    });

});

// ===== ORDERS SCROLL =====

document.getElementById(
    "ordersBtn"
).addEventListener("click", () => {

    document.getElementById(
        "ordersSection"
    ).scrollIntoView({
        behavior:"smooth"
    });

});

// ===== REVENUE =====

document.getElementById(
    "revenueBtn"
).addEventListener("click", () => {

    document.getElementById(
        "dashboardSection"
    ).scrollIntoView({
        behavior:"smooth"
    });

});

// ===== SETTINGS =====

document.getElementById(
    "settingsBtn"
).addEventListener("click", () => {

    alert("Settings Feature Coming Soon 🚀");

});
// 🔥 AUTO LIVE REFRESH

setInterval(() => {

    fetchOrders();

}, 8000);