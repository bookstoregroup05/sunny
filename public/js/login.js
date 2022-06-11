// $(document).ready(function () {
//   $('ul').hide();

//   // Getting references to our form and inputs
//   var loginForm = $("form.login");
//   var emailInput = $("input#email-input");
//   var passwordInput = $("input#password-input");

//   // When the form is submitted, we validate there's an email and password entered

//   /* $('.btn-default').on('click', (event) => {
//     event.preventDefault();
//     console.log('Clik on btn default');
//   }); */

//   loginForm.on("submit", function (event) {
//     console.log('in click');
//     event.preventDefault();
//     var userData = {
//       email: emailInput.val().trim(),
//       password: passwordInput.val().trim()
//     };

//     if (!userData.email || !userData.password) {
//       return;
//     }

//     // If we have an email and password we run the loginUser function and clear the form
//     loginUser(userData.email, userData.password);
//     emailInput.val("");
//     passwordInput.val("");
//   });

//   // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
//   function loginUser(email, password) {
//     $.post("/api/users/login", {
//       email: email,
//       password: password
//     })
//       .then(function() {
//         window.location.replace("/home");
//         // If there's an error, log the error
//       })
//       .catch(function(err) {
//         console.log(err);
//       });
//   }
// });

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-input').value.trim();
  const password = document.querySelector('#password-input').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      window.location.replace("/home");
      // document.location.replace('/dashboard/');
    } else {
      alert(response.message);
    }
  }
}
document.querySelector('.login').addEventListener('submit', loginFormHandler);