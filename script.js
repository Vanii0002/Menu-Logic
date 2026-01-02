let menuItems = [];
let cart = [];

// HTML elements (ids ke according)
const totalEl = document.getElementById("t1");
const discountEl = document.getElementById("d1");
const finalEl = document.getElementById("f1");

axios.get("./menu.json")
  .then(r => {
    menuItems = r.data;
    renderMenu();
  })
  .catch(error => {
    console.error("Error loading menu JSON:", error);
  });

const renderMenu = () => {
  const menu = document.getElementById("menu");
  menu.innerHTML = menuItems.map(i => `
    <div>
      <b>${i.name}</b> - ₹${i.price}<br/>
      <button onclick="add(${i.id})">Add</button>
    </div>
  `).join("");
};

const add = id => {
  const item = menuItems.find(i => i.id === id);
  cart.push(item);
  update();
};

const sum = () => {
  return cart.reduce((t, i) => t + i.price, 0);
};

const update = () => {
  const t = sum();
  const d = t > 500 ? t * 0.1 : 0;

  totalEl.innerText = t;
  discountEl.innerText = d ? `Discount (10%): ₹${d}` : "";
  finalEl.innerText = t - d;
};

const checkout = () => {
  console.log({
    items: cart,
    total: sum(),
    discount: sum() > 500 ? sum() * 0.1 : 0,
    payable: sum() > 500 ? sum() * 0.9 : sum()
  });
};
