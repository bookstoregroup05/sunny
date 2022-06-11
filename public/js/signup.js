$(document).ready(function () {
  $('ul').hide();
  

//   // Getting references to our form and input
//   var signUpForm = $("form.signup");
//   var emailInput = $("input#email-input");
//   var passwordInput = $("input#password-input");

//   // When the signup button is clicked, we validate the email and password are not blank
//   signUpForm.on("submit", function(event) {
//     event.preventDefault();
//     var userData = {
//       email: emailInput.val().trim(),
//       password: passwordInput.val().trim()
//     };

//     if (!userData.email || !userData.password) {
//       return;
//     }
//     // If we have an email and password, run the signUpUser function
//     signUpUser(userData.email, userData.password);
//     emailInput.val("");
//     passwordInput.val("");
//   });

//   // Does a post to the signup route. If successful, we are redirected to the members page
//   // Otherwise we log any errors
//   function signUpUser(email, password) {
//     $.post("/api/users/", {
//       email: email,
//       password: password
//     })
//       .then(function(data) {
//         window.location.replace("/home");
//         // If there's an error, handle it by throwing up a bootstrap alert
//       })
//       .catch(handleLoginErr);
//   }

//   function handleLoginErr(err) {
//     $("#alert .msg").text(err.responseJSON);
//     $("#alert").fadeIn(500);
//   }
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert(response.statusText);
    }
  }
}
document.querySelector('.signup').addEventListener('submit', signupFormHandler);
});

