const socket = io("http://localhost:5000");

let lastOrderCount = 0;

// ===== FETCH ORDERS =====

async function fetchOrders(playSound = false) {

    const response =
    await fetch("/api/orders");

    const orders = await response.json();

    // ===== PLAY SOUND ONLY NEW ORDER =====

    const groupedCheckouts =
    [...new Set(
        orders.map(order => order.checkout_id)
    )];

    if(
        playSound &&
        groupedCheckouts.length > lastOrderCount
    ){

        const notifySound =
        new Audio("sounds/notification.mp3");

        notifySound.play();

    }

    lastOrderCount =
    groupedCheckouts.length;

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

    // ===== GROUP =====

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
            qty: order.quantity

        });

        grouped[key].total += Number(order.total);

    });

    // ===== RENDER =====

    Object.values(grouped).forEach(order => {

        let card =
        document.querySelector(
            `[data-checkout="${order.checkout_id}"]`
        );

        // ===== CREATE ONLY ONCE =====

        if(!card){

            card =
            document.createElement("div");

            card.className =
            "order-card";

            card.setAttribute(
                "data-checkout",
                order.checkout_id
            );

            card.innerHTML = `

                <h3>🍽 Order</h3>

                <p class="customer"></p>

                <p class="table"></p>

                <p class="time"></p>

                <div class="admin-items"></div>

                <p class="grand-total"></p>

                <div class="status-buttons">

                    <button class="status-btn pending-btn">
                    Pending
                    </button>

                    <button class="status-btn preparing-btn">
                    Preparing
                    </button>

                    <button class="status-btn ready-btn">
                    Ready
                    </button>

                    <button class="status-btn delivered-btn">
                    Delivered
                    </button>

                </div>

            `;

            container.prepend(card);

        }

        // ===== UPDATE CONTENT =====

        card.querySelector(".customer")
        .innerHTML =
        `<strong>Customer:</strong> ${order.customer}`;

        card.querySelector(".table")
        .innerHTML =
        `<strong>Table:</strong> ${order.table || "-"}`;

        card.querySelector(".time")
        .innerHTML =
        `<strong>Time:</strong>
        ${
        !isNaN(new Date(order.time))
        ? new Date(order.time).toLocaleString()
        : "Recently"
        }`;

        // ===== ITEMS =====

        const itemsHTML =
        order.items.map(item => `

            <div class="food-row">

                <span>${item.food}</span>

                <span>x${item.qty}</span>

            </div>

        `).join("");

        card.querySelector(".admin-items")
        .innerHTML = itemsHTML;

        // ===== TOTAL =====

        card.querySelector(".grand-total")
        .innerHTML =
        `Total: ₹${order.total}`;

        // ===== BUTTONS =====

        const buttons =
        card.querySelectorAll(".status-btn");

        buttons.forEach(btn => {

            btn.classList.remove(
                "active-status"
            );

            if(
                btn.innerText.trim() ===
                order.status
            ){

                btn.classList.add(
                    "active-status"
                );

            }

            btn.onclick = () => {

                updateStatusByCheckout(
                    order.checkout_id,
                    btn.innerText.trim(),
                    card
                );

            };

        });

    });

}

// ===== UPDATE STATUS =====

async function updateStatusByCheckout(
checkoutId,
status,
card
){

    // ===== SMOOTH BUTTON MOVE =====

    const buttons =
    card.querySelectorAll(".status-btn");

    buttons.forEach(btn => {

        btn.classList.remove(
            "active-status"
        );

        if(
            btn.innerText.trim() === status
        ){

            btn.classList.add(
                "active-status"
            );

        }

    });

    // ===== API =====

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

}

// ===== INITIAL =====

fetchOrders(false);

// ===== SOCKET =====

socket.on("new-order", () => {

    fetchOrders(true);

});

socket.on("status-updated", () => {

    fetchOrders(false);

});
