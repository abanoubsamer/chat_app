/*Public variable*/

let=Otp=document.getElementById("otpInput")
let Email=document.getElementById("email")
let Phone=document.getElementById("phoneInput")
let otpInputs = document.querySelectorAll('.otp_num');


document.getElementById("nextButton").addEventListener("click", function(event) {
    verifiyOtp();
   if (Otp.parentNode.style.display === "none")
    {
      event.preventDefault(); // Prevent form submission
      let regex = new RegExp('[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-z]{2,3}');
      if (regex.test(Email.value))
       {
       let email = `<h5>${Email.value}</h5>`;
       email=encodeEmail(email);
     
       document.querySelector('.phonecounter').innerHTML +=email;
       Email.parentNode.style.display = "none"; // Clearing the input field
      
        ////////////////////////////////////////////////////////////////////////////////////////////////
         timer();
        /////////////////////////////////////////////////////////////////
        // Collect form data
        PostData();
        ///////////////////////
        //change style
        Otp.parentNode.style.display = "block"; // Show OTP input field
        Phone.parentNode.style.display = "none"; // Hide phone input field
        //////////////////////////
      }
      else{alert("Invalid Email Address")}
      }
  else{Postopt();}
 
   
}
);

//////////////////////////////////////////////
function PostData()
{

      // Send data to backend
      
          fetch("http://localhost:3000/Signin", {
          method: "POST",
          body: JSON.stringify({
              email:Email.value,
              phone:Phone.value
           }) ,
          headers: {
          "Content-Type": "application/json"
      }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
      })
      .catch(error => {
          console.error("Error sending data:", error);
      });    
    
}

////////////////////////////////////////////////////////////////

Postopt=()=>{
    fetch("http://localhost:3000/otp", {
        method: "POST",
        body: JSON.stringify({
            otp:Array.from(otpInputs).map(input => +input.value).join('')
        }) ,
        headers: {
        "Content-Type": "application/json"
    }
    })
    .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Parse the JSON response
            return response.json();
        }).then(data => {
           if (data.success) {
            window.location.href = "/"; // Assuming "/home" is the route for the home page
        } else {
            console.log("OTP verification failed");
      }
    })
    .catch(error => {
        console.error("Error sending data:", error);
    });
}

function verifiyOtp(){
 otpInputs.forEach(input => {
       input.addEventListener('input', function(event) {
      // Ensure input is a number
      const currentValue = event.target.value;
      if (isNaN(currentValue)) {
          event.target.value = '';
      }
      // Limit input length to 1
      if (currentValue.length > 1) {
          event.target.value = currentValue.slice(0, 1);
      }
  });
});
}



let encodeEmail = (email) => {
     // Split email into local and domain parts
     let parts = email.split("@");
     if (parts.length !== 2) {
         return email;
     }
     let localPart = parts[0];
     let domainPart = parts[1];
     let=index=(localPart.length/2)+localPart.length/6;
     // Replace characters in local part with *
     let encodedLocalPart = localPart.substring(0,6) + "*".repeat(index)+localPart.substring(index,localPart.length);
 
     // Return the encoded email
     return encodedLocalPart + "@" + domainPart;
};


/// timer
let timer =()=>{
    var timeLeft = 60; // in seconds
    var timerInterval = setInterval(function() {
        document.getElementById("timer").innerHTML = "Time left: " + timeLeft + " seconds";
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            document.getElementById("timer").innerHTML = "Time's up!";
        }
    }, 1000);
}