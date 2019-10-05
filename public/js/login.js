var stripe = Stripe('pk_test_2Gg8TAG9mVXkRSwdypPFYaoZ00x2w3s6Xj');
stripe.redirectToCheckout({
  // Make the id field from the Checkout Session creation API response
  // available to this file, so you can provide it as parameter here
  // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
  sessionId: '{{CHECKOUT_SESSION_ID}}'
}).then(function (result) {
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `result.error.message`.
});
const logoutfn = async () => {
  try {
    const res = await axios.get("/api/user/logout");
    console.log(res);
    if (res.data.status == "user logged out") {
      alert("User logged out");
      window.setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};
const update = async (phone, name) => {
  try {
    const data = { phone, name };
    const res = await axios.post("/api/user/patchdata", data);
    if (res.data.status === "user updated") {
      alert("User Updated");
      window.setTimeout(() => {
        location.assign("/home", 1000);
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const resetpass=async (currentpassword,newpassword,confirmpassword)=>{
  try{
    const data = {currentpassword,newpassword,confirmpassword};
    const res = await axios.patch("/api/user/reset",data);
    if(res.data.status=="password updated"){
      alert("Password Updated");
      window.setTimeout(() => {
        location.assign("/home", 1000);
      });
    }
  }catch(err)
  {
    console.log(err);
  }
};
const login = async (email, password) => {
  //  alert("Email :"+email+"  Password: "+ password);
  try {
    const data = { email, password };
    const res = await axios.post("/api/user/login", data);
    //  console.log(res+"uhdfuhfi");
    if (res.data.status === "user logged in") {
      alert("User logged in");
      window.setTimeout(() => {
        location.assign("/home", 1000);
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const form = document.querySelector(".login-form");
const logout = document.querySelector(".logout");
const updateuser = document.querySelector(".updateprofile");
const reset = document.querySelector(".resetform");
const signup = document.querySelector(".signupclass");
// console.log(update);
if(signup)
{
  signup.addEventListener("submit",e=>{
    e.preventDefault
  });
}
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email,password);
  });
}
if (logout) {
  logout.addEventListener("click", e => {
    e.preventDefault();
    logoutfn();
  });
}
if (updateuser) {
  updateuser.addEventListener("submit", e => {
    e.preventDefault();
    const phone = document.getElementById("phone").value;
    const name = document.getElementById("name").value;
    console.log(phone);
    console.log(name);
    update(phone, name);
  });
}
if (reset) {
  reset.addEventListener("submit", e => {
    e.preventDefault();
    const currentpassword = document.getElementById("cpass").value;
    const newpassword = document.getElementById("npass").value;
    const confirmpassword = document.getElementById("conpass").value;
    resetpass(currentpassword,newpassword,confirmpassword);
  });
}
