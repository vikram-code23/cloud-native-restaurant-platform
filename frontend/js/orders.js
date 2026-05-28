const socket = io("http://54.252.119.151:5000");

socket.on("status-updated", () => {

    loadOrders();

});

const user = JSON.parse(localStorage.getItem("user"));

let allOrders = [];

let previousOpened = false;
let lastDelivered = null;

async function loadOrders() {

    try{

        const res = await fetch(`http://54.252.119.151:5000/api/orders/${user.id}`);

        const data = await res.json();

        const map = {};

        data.forEach(item => {

            const key = item.checkout_id;

            if (!key) return;

            if (!map[key]) {

                map[key] = {

                    id: key,

                    rawTime: item.created_at,

                    time:
                        item.created_at &&
                        item.created_at !== "NULL"

                        ? new Date(item.created_at)
                        .toLocaleString()

                        : "Recently",

                    table: item.table_no || "-",

                    status: item.status || "Pending",

                    items: []

                };

            }

            map[key].items.push({

                name: item.food_name,

                qty: item.quantity

            });

        });

        // ✅ latest order first

        allOrders = Object.values(map).sort((a, b) => {

            return new Date(b.rawTime) - new Date(a.rawTime);

        });

        renderPage();

    }

    catch(err){

        console.log(err);

    }
}

function getProgressWidth(status){

    switch(status){

        case "Pending":
            return "8%";

        case "Preparing":
            return "38%";

        case "Ready":
            return "68%";

        case "Delivered":
            return "100%";

        default:
            return "0%";
    }
}

function renderPage() {

    const container =
    document.getElementById("myOrders");

    container.innerHTML = "";

    if(allOrders.length === 0){

        container.innerHTML =
        "<p>No orders yet</p>";

        return;
    }

    // ✅ always latest order

    const latest = allOrders.find(
        order => order.status !== "Delivered"
    );

    const deliveredOrder = allOrders.find(
        order => order.status === "Delivered"
    );

    if(
        deliveredOrder &&
        deliveredOrder.id !== lastDelivered
    ){

        lastDelivered = deliveredOrder.id;

        showToast(
            "🎉 Order Delivered! Enjoy your meal ❤️"
        );
    }

    if(!latest){

        container.innerHTML = `

        <div class="live-order-card">

            <div class="top-row">

                <h2>🎉 All Orders Delivered</h2>

                <button class="history-btn"
                onclick="showPrevious()">

                    📜

                </button>

            </div>

            <p class="delivered-msg">
                Enjoy your meal ❤️
            </p>

        </div>

        `;

        if(previousOpened){

            renderPrevious();

        }

        return;
    }

    container.innerHTML = `

    <div class="live-order-card">

        <div class="top-row">

            <h2>🍽 Current Order</h2>

            <button class="history-btn"
            onclick="showPrevious()">

                📜

            </button>

        </div>

        <p class="table">
            🪑 Table:
            ${latest.table}
        </p>

        <p class="time">
            🕒 ${latest.time}
        </p>

        <div class="items">

            ${latest.items.map(i => `

                <div class="item-row">

                    <span>${i.name}</span>

                    <span>x${i.qty}</span>

                </div>

            `).join("")}

        </div>

        <div class="status-track">

            <div class="progress-bar">

                <div class="progress-line"></div>

                <div class="green-line"></div>

                <div class="progress-fill"
                style="width:${getProgressWidth(latest.status)}">
                </div>

                <div class="
                step
                ${latest.status === "Pending" ||
                latest.status === "Preparing" ||
                latest.status === "Ready" ||
                latest.status === "Delivered"
                ? "active" : ""}
                ">

                    <div class="step-circle">✓</div>

                    <p>Confirmed</p>

                </div>

                <div class="
                step
                ${latest.status === "Preparing" ||
                latest.status === "Ready" ||
                latest.status === "Delivered"
                ? "active" : ""}
                ">

                    <div class="step-circle">🍳</div>

                    <p>Preparing</p>

                </div>

                <div class="
                step
                ${latest.status === "Ready" ||
                latest.status === "Delivered"
                ? "active" : ""}
                ">

                    <div class="step-circle">🛵</div>

                    <p>Ready</p>

                </div>

                <div class="
                step
                ${latest.status === "Delivered"
                ? "active" : ""}
                ">

                    <div class="step-circle">🎉</div>

                    <p>Delivered</p>

                </div>

            </div>

        </div>

    </div>

    `;

    // ✅ keep previous orders open after refresh

    if(previousOpened){

        renderPrevious();

    }
}

function showPrevious() {

    previousOpened = !previousOpened;

    renderPage();
}

function renderPrevious(){

    const previous = allOrders.filter(
        order => order.status === "Delivered"
    );

    if(previous.length > 0){

        previous.shift();

    }

    const container =
    document.getElementById("myOrders");

    let html = `

    <div class="previous-wrapper">

        <h2 class="prev-title">
            📜 Previous Orders
        </h2>

        <div class="previous-grid">
    `;

    if(previous.length === 0){

        html += `
        <p>No previous orders</p>
        `;
    }

    previous.forEach((o,index) => {

        html += `

        <div class="prev-card">

            <div class="prev-top">

                <span class="order-id">
                    Order #${index + 101}
                </span>

                <span class="status-pill">
                    ${o.status}
                </span>

            </div>

            <p class="prev-time">

                🕒 ${o.time}

            </p>

            <p class="prev-table">

                🪑 Table:
                ${o.table}

            </p>

            <div class="prev-items">

                ${o.items.map(i => `

                    <div class="prev-food">

                        <span>${i.name}</span>

                        <span>x${i.qty}</span>

                    </div>

                `).join("")}

            </div>

        </div>
        `;
    });

    html += `
        </div>
    </div>
    `;

    container.innerHTML += html;
}

function showToast(message){

    const toast =
    document.createElement("div");

    toast.className = "delivery-toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    },100);

    setTimeout(() => {

        toast.remove();

    },4000);
}

loadOrders();