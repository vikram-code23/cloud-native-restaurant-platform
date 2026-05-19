async function login(event){

    if(event) event.preventDefault();

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    if(!email || !password){

        alert("Please fill all fields");

        return;

    }

    try{

        const response = await fetch("/api/login",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        console.log(
            "LOGIN RESPONSE:",
            data
        );

        if(
            data &&
            data.message === "Login Successful"
        ){

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            showLoginSuccess();

        }

        else{

            alert(
                "Invalid Email or Password"
            );

        }

    }

    catch(err){

        console.log(err);

        alert("Server Error");

    }

}
function showLoginSuccess(){

    const user =
    JSON.parse(
        localStorage.getItem("user")
    );

    const popup =
    document.createElement("div");

    popup.className =
    "luxury-login";

    popup.innerHTML = `

        <!-- BACKGROUND PARTICLES -->

        <div class="bg-particles">

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

        </div>

        <!-- MAIN BOX -->

        <div class="luxury-box">

            <!-- CENTER BURST -->

            <div class="burst-particles">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

            </div>

            <div class="food-icon">
                🍔
            </div>

            <h1>
                Welcome, ${user.name} ✨
            </h1>

            <p class="food-message">
                Eat your favourite food 😋 <br>
                Happiness starts with good meals ❤️
            </p>

            <div class="dots">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    `;

    document.body.appendChild(popup);

    // RANDOM PARTICLE MOVEMENT

    const particles =
    popup.querySelectorAll(
        ".burst-particles span"
    );

    particles.forEach(particle => {

        particle.style.setProperty(
            "--x",
            Math.random()
        );

        particle.style.setProperty(
            "--y",
            Math.random() + 0.5
        );

    });

    // REDIRECT

    setTimeout(() => {

       window.location.href = "/menu.html";

    }, 2800);

}