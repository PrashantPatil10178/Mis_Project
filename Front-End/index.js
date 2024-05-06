window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 2500);
});

let loggedIn = false;
let loggedinUserName = "";
axios
  .post("http://localhost:8000/api/v1/users/users", {
    AccessToken: localStorage.getItem("Access token"),
  })
  .then((Response) => {
    console.log(Response);

    const loginLink = document.getElementById("login");
    loggedinUserName = Response.data.username;
    loginLink.innerHTML = `Hi, ${loggedinUserName}`;
    loginLink.setAttribute("href", "#");
    loggedIn = true;
  })
  .catch((err) => {
    console.log(err);
  });

function HandleCart({ name, description, category, price }) {
  if (loggedIn) {
    axios
      .post("http://localhost:8000/api/v1/users/addtoCart", {
        name,
        quantity: 1,
        username: loggedinUserName,
      })
      .then((Response) => {
        console.log(Response);
        alert("Items Added To Cart");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("Please Log In to Continue");
  }
}

function displayCart() {
  if (loggedIn) {
    axios
      .post("http://localhost:8000/api/v1/users/getCart", {
        AccessToken: localStorage.getItem("Access token"),
      })
      .then((Response) => {
        const cartItems = Response.data.items;
        const modalBody = document.getElementById("cartItems");

        modalBody.innerHTML = "";

        let total_price = 0;
        cartItems.forEach((item) => {
          total_price += item.Menu.price * item?.quantity;
          const itemHTML = `
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${item.Menu.image}" class="img-fluid rounded-start" alt="${item.Menu.name}">
                  
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${item.Menu.name}</h5>
                    <p class="card-text">Description: ${item.Menu.description}</p>
                    <p class="card-text">Category: ${item.Menu.category}</p>
                    <p class="card-text">Price: ₹${item.Menu.price}</p>
                    
                    <p class="card-text">Quantity: ${item.quantity}</p>
                    <button type="button" class="btn btn-danger" onclick="removeFromCart('${item._id}')">Remove from Cart</button>
                  </div>
                </div>
              </div>
            </div>
          `;
          modalBody.insertAdjacentHTML("beforeend", itemHTML);
        });

        document.querySelector(
          "#totalPrice"
        ).innerHTML = `<p class='fw-bold' id="getTotalPrice">The Total Price of the Cart is <mark>${total_price}</mark></p>`;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    document.querySelector(
      "#cartItems"
    ).innerHTML = `<p>Login Fist to See the Cart</p>`;
  }
}

const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", () => {
  myInput.focus();
});

function removeFromCart(id) {
  axios
    .post("http://localhost:8000/api/v1/users/removeFromCart", {
      username: loggedinUserName,
      itemId: id,
    })
    .then((Response) => {
      console.log(Response);
      alert("Cart Item Removed Sucessfully");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

function checkout() {
  if (loggedIn) {
    const total_price_string =
      document.querySelector("#getTotalPrice").textContent;
    const totalPrice = parseInt(total_price_string.match(/(\d+)/)[0]);

    axios.post("http://localhost:8000/api/v1/users/removeFromCart", {});
  } else {
    alert("Login To Continue");
  }
}
