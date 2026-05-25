const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});
app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    if(req.method === "OPTIONS"){
        return res.sendStatus(200);
    }

    next();

});



// TEST ROUTE
app.get("/", (req, res) => {
    res.send("VK Food App Backend Running 🚀");
});


// SIGNUP
app.post("/api/signup", (req, res) => {

    const { name, email, password } = req.body;

    // CHECK EMAIL EXISTS

    const checkSql =
    "SELECT * FROM users WHERE email=?";

    db.query(checkSql, [email], (err, result) => {

        if(err){

            console.log(err);

            return res
            .status(500)
            .send("Database Error");
        }

        // EMAIL ALREADY EXISTS

        if(result.length > 0){

            return res.send(
                "Email Already Registered"
            );
        }

        // INSERT USER

        const sql = `
            INSERT INTO users
            (name,email,password)
            VALUES (?,?,?)
        `;

        db.query(
            sql,
            [name, email, password],

            (err, result) => {

                if(err){

                    console.log(err);

                    return res
                    .status(500)
                    .send("Database Error");
                }

                res.send(
                    "User Registered Successfully"
                );

            }

        );

    });

});

// LOGIN
app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    const sql = `
        SELECT * FROM users
        WHERE email = ? AND password = ?
    `;

    db.query(sql, [email, password], (err, result) => {

        if(err){

            console.log(err);

            return res.status(500).json({
                message:"Database Error"
            });

        }

        if(result.length > 0){

            res.json({

                message: "Login Successful",

                user: result[0]

            });

        }

        else{

            res.json({

                message:"Invalid Email or Password"

            });

        }

    });

});

// GET CATEGORIES



// GET MENU
app.get("/api/menu/:category", (req, res) => {

    const category = req.params.category;

    const sql = `
        SELECT *
        FROM foods
        WHERE category = ?
    `;

    db.query(sql, [category], (err, result) => {

        if(err){
            console.log(err);
            return res.status(500).send("Database Error");
        }

        res.json(result);

    });

});

// PLACE ORDER
app.post("/api/place-order", (req, res) => {

    const { userId, tableNo, orders } = req.body;

    const checkoutId =
    "CHK" + Date.now();

    const createdAt =
    new Date().toISOString();

    orders.forEach(item => {

        const total =
        item.price * item.quantity;

        db.query(

            `INSERT INTO orders
            (
                user_id,
                checkout_id,
                food_name,
                quantity,
                price,
                total,
                status,
                table_no,
                created_at
            )

            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            [
                userId,
                checkoutId,
                item.name,
                item.quantity,
                item.price,
                total,
                "Pending",
                tableNo || "-",
                createdAt
            ],

            (err) => {

                if(err){
                    console.log(err);
                }

            }

        );

    });

    res.send("Order placed");
    io.emit("new-order", {
    message: "New order received"
});

});


// SERVER
const PORT = process.env.PORT || 5000;

app.get("/api/orders", (req, res) => {

    const sql = `

    SELECT 
        orders.*,
        users.name AS user_name

    FROM orders

    JOIN users
    ON orders.user_id = users.id

    ORDER BY orders.id DESC

    `;

    db.query(sql, (err, result) => {

        if(err){

            res.status(500).json(err);

        } 
        
        else{

            res.json(result);

        }

    });

});

app.get("/api/foods", (req, res) => {

    const sql = `
        SELECT *
        FROM foods
    `;

    db.query(sql, (err, result) => {

        if(err){

            console.log(err);

            return res
            .status(500)
            .send("Database Error");

        }

        res.json(result);

    });

});
app.get("/api/test-users", (req, res) => {

    db.query(
        "SELECT * FROM users",
        (err, result) => {

            if(err){

                console.log(err);

                return res.status(500).json(err);

            }

            res.json(result);

        }
    );

});

app.put("/api/orders/:id", (req, res) => {

    const { status } = req.body;

    const sql =
    "UPDATE orders SET status=? WHERE id=?";

    db.query(sql,
    [status, req.params.id],
    (err, result) => {

        if(err){
            res.status(500).json(err);
        } else {
            res.json({
                message:"Status Updated"
            });
        }
    });
});

app.get("/api/orders/:userId", (req, res) => {

    const sql = `
    SELECT * FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    `;

    db.query(sql,
    [req.params.userId],
    (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

});
app.put("/api/checkout-status/:checkoutId", (req, res) => {

    const { status } = req.body;

    const sql = `
    UPDATE orders
    SET status=?
    WHERE checkout_id=?
    `;

    db.query(
        sql,
        [status, req.params.checkoutId],
        (err, result) => {

            if(err){

                return res.status(500).json(err);

            }
            io.emit("status-updated", {
            id: req.params.checkoutId,
            status
            });
            res.json({
                message:"Checkout Status Updated"
            });

        }
    );

});
app.get("/api/categories", (req, res) => {

    const sql = `
        SELECT DISTINCT category
        FROM foods
    `;

    db.query(sql, (err, result) => {

        if(err){

            console.log("CATEGORY ERROR:", err);

            return res.status(500).json(err);

        }

        const categories = result.map((item, index) => ({

            id: index + 1,
            name: item.category

        }));

        res.json(categories);

    });

});



server.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});