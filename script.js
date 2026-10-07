const products = [
  {
    id: 1,
    name: "الملك الذهبي",
    category: "gulf",
    badge: "الأكثر طلباً",
    price: 299,
    rating: 4.9,
    description: "عطر خليجي فاخر بنبرة خشبية دافئة، مناسب للمناسبات الرسمية والوقائع الفاخرة.",
  },
  {
    id: 2,
    name: "روائح الخليج",
    category: "gulf",
    badge: "مميز",
    price: 349,
    rating: 4.8,
    description: "خلط أنيق من المسك والعود والعنبر، مع أثر دافئ يدوم طويلاً.",
  },
  {
    id: 3,
    name: "لا بيل كلافير",
    category: "french",
    badge: "فرنسي",
    price: 420,
    rating: 5.0,
    description: "رائحة فرنسية راقية تجمع بين الزهور والفاخرات مع لمسة أنثوية متوازنة.",
  },
  {
    id: 4,
    name: "إيفان كوليج",
    category: "french",
    badge: "إصدار خاص",
    price: 500,
    rating: 4.9,
    description: "عطر أنيق بطابع باريس الفاخر، يحتوي على رائحة زهرية خشبية متوازنة.",
  },
  {
    id: 5,
    name: "مبخرة الأرز الذهبية",
    category: "incense",
    badge: "مريحة",
    price: 180,
    rating: 4.7,
    description: "مبخرة أنيقة تضيف رائحة هادئة وملطفة للبيت مع لمسة دافئة فاخرة.",
  },
  {
    id: 6,
    name: "مبخرة المسك الفاخرة",
    category: "incense",
    badge: "فاخرة",
    price: 220,
    rating: 4.8,
    description: "مبخرة غنية برائحة المسك السماوية لتزيين المنزل والصالون الفاخر.",
  },
  {
    id: 7,
    name: "بوكس هدية فخم",
    category: "gifts",
    badge: "هدية أنيقة",
    price: 260,
    rating: 4.9,
    description: "مجموعة هدية فاخرة مثالية للاحتفالات والهدايا الشخصية والعرائس.",
  },
  {
    id: 8,
    name: "عطر + مباخر باقة مميزة",
    category: "gifts",
    badge: "عرض خاص",
    price: 610,
    rating: 5.0,
    description: "باقة مختارة بعناية تجمع بين العطر الفاخر والمبخرة الراقية في تغليف أنيق.",
  },
];

const productsGrid = document.getElementById("products-grid");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartPanel = document.getElementById("cartPanel");
const cartToggle = document.getElementById("cartToggle");
const closeCart = document.getElementById("closeCart");
const productModal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalBadge = document.getElementById("modalBadge");
const modalRating = document.getElementById("modalRating");
const modalAddBtn = document.getElementById("modalAddBtn");

let activeFilter = "all";
let cart = [];
let selectedProductId = null;

function formatPrice(value) {
  return `${value.toLocaleString("en-US")} ر.س`;
}

function renderProducts(filter = "all") {
  const filteredProducts =
    filter === "all" ? products : products.filter((product) => product.category === filter);

  productsGrid.innerHTML = filteredProducts
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
              <span class="product-price">${formatPrice(product.price)}</span>
              <span class="product-rating">★ ${product.rating}</span>
            </div>
            <button class="add-btn" data-id="${product.id}">أضف للسلة</button>
          </div>
        </article>
      `
    )
    .join("");

  const addButtons = document.querySelectorAll(".add-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      addToCart(id);
    });
  });

  productsGrid.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("dblclick", () => {
      const id = Number(card.querySelector(".add-btn").dataset.id);
      openProductModal(id);
    });
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">السلة فارغة حالياً.</p>';
    cartTotal.textContent = "0 ر.س";
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = formatPrice(totalPrice);

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-item-art" aria-hidden="true"></div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span>الكمية: ${item.quantity}</span>
          </div>
          <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
      `
    )
    .join("");
}

function openProductModal(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  selectedProductId = productId;
  modalTitle.textContent = product.name;
  modalPrice.textContent = formatPrice(product.price);
  modalDescription.textContent = product.description;
  modalBadge.textContent = product.badge;
  modalRating.textContent = `★ ${product.rating}`;
  productModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  productModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function bindFilters() {
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.toggle("active", btn === button);
      });
      renderProducts(activeFilter);
    });
  });
}

cartToggle.addEventListener("click", () => {
  cartPanel.classList.add("open");
});

closeCart.addEventListener("click", () => {
  cartPanel.classList.remove("open");
});

closeModal.addEventListener("click", closeProductModal);
productModal.addEventListener("click", (event) => {
  if (event.target === productModal) {
    closeProductModal();
  }
});

modalAddBtn.addEventListener("click", () => {
  if (selectedProductId !== null) {
    addToCart(selectedProductId);
    closeProductModal();
    cartPanel.classList.add("open");
  }
});

bindFilters();
renderProducts(activeFilter);
updateCartUI();
