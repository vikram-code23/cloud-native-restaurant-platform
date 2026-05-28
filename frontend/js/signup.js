async function signup(){

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("password").value.trim();

    // VALIDATION

    if(!name || !email || !password){

        alert("Please fill all fields");

        return;

    }

    try{

        const response = await fetch(
            "/api/signup",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    name,
                    email,
                    password
                })

            }
        );

        const data = await response.text();

        console.log(data);

        if(
            data === "User Registered Successfully"
        ){

            alert("Account Created 🚀");

            window.location.href =
            "/login.html";

        }

        else{

            alert(data);

        }

    }

    catch(error){

        console.log(error);

        alert("Server Error");

    }

}