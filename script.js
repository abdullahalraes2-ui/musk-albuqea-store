const products = [
  {
    id: 1,
    name: "عطر الملوك 100",
    category: "gulf",
    badge: "الأكثر طلباً",
    price: 299,
    rating: 4.9,
  },
  {
    id: 2,
    name: "روائح الخليج",
    category: "gulf",
    badge: "فاخر",
    price: 349,
    rating: 4.8,
  },
  {
    id: 3,
    name: "لا بيل كلافير",
    category: "french",
    badge: "فرنسي",
    price: 420,
    rating: 5.0,
  },
  {
    id: 4,
    name: "إيفان كوليج",
    category: "french",
    badge: "إصدار خاص",
    price: 500,
    rating: 4.9,
  },
  {
    id: 5,
    name: "مبخرة الأرز الذهبية",
    category: "incense",
    badge: "رائحة هادئة",
    price: 180,
    rating: 4.7,
  },
  {
    id: 6,
    name: "مبخرة المسك الفاخرة",
    category: "incense",
    badge: "مميزة",
    price: 220,
    rating: 4.8,
  },
  {
    id: 7,
    name: "بوكس هدية فخم",
    category: "gifts",
    badge: "هدية أنيقة",
    price: 260,
    rating: 4.9,
  },
  {
    id: 8,
    name: "مجموعة عطر + مباخر",
    category: "gifts",
    badge: "عرض خاص",
    price: 610,
    rating: 5.0,
  },
];

const productGrid = document.getElementById("products-grid");
const cartCount = document.getElementById("cart-count");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "all";
let itemsInCart = 0;

function renderProducts(filter = "all") {
  const filtered =
    filter === "all" ? products : products.filter((item) => item.category === filter);

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card" data-category="${product.category}">
          <div class="product-image">
            <div class="product-bottle" aria-hidden="true"></div>
          </div>
          <div class="product-body">
            <span class="badge">${product.badge}</span>
            <h3>${product.name}</h3>
            <div class="product-meta">
              <span class="product-price">${product.price} ر.س</span>
              <span class="product-rating">★ ${product.rating}</span>
            </div>
            <button class="add-btn" data-id="${product.id}">أضف للسلة</button>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".add-btn").forEach((button) => {
    button.addEventListener("click", () => {
      itemsInCart += 1;
      cartCount.textContent = itemsInCart;
      button.textContent = "تم الإضافة";
      setTimeout(() => {
        button.textContent = "أضف للسلة";
      }, 900);
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
    renderProducts(activeFilter);
  });
});

renderProducts(activeFilter);
