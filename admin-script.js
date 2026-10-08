// بيانات تسجيل الدخول الآمنة
const ADMIN_CREDENTIALS = {
  username: 'maskalbqae',
  password: 'musk2026secure',
};

// الحصول على البيانات من localStorage
function getStoredProducts() {
  const stored = localStorage.getItem('maskProducts');
  return stored ? JSON.parse(stored) : [];
}

function saveProducts(products) {
  localStorage.setItem('maskProducts', JSON.stringify(products));
  // تحديث الموقع الرئيسي
  updateMainSiteProducts(products);
}

function updateMainSiteProducts(products) {
  localStorage.setItem('storeProducts', JSON.stringify(products));
}

// المنتجات الأولية
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'الملك الذهبي',
    category: 'gulf',
    badge: 'الأكثر طلباً',
    price: 299,
    rating: 4.9,
    description: 'عطر خليجي فاخر بنبرة خشبية دافئة، مناسب للمناسبات الرسمية والوقائع الفاخرة.',
  },
  {
    id: 2,
    name: 'روائح الخليج',
    category: 'gulf',
    badge: 'مميز',
    price: 349,
    rating: 4.8,
    description: 'خلط أنيق من المسك والعود والعنبر، مع أثر دافئ يدوم طويلاً.',
  },
  {
    id: 3,
    name: 'لا بيل كلافير',
    category: 'french',
    badge: 'فرنسي',
    price: 420,
    rating: 5.0,
    description: 'رائحة فرنسية راقية تجمع بين الزهور والفاخرات مع لمسة أنثوية متوازنة.',
  },
  {
    id: 4,
    name: 'إيفان كوليج',
    category: 'french',
    badge: 'إصدار خاص',
    price: 500,
    rating: 4.9,
    description: 'عطر أنيق بطابع باريس الفاخر، يحتوي على رائحة زهرية خشبية متوازنة.',
  },
  {
    id: 5,
    name: 'مبخرة الأرز الذهبية',
    category: 'incense',
    badge: 'مريحة',
    price: 180,
    rating: 4.7,
    description: 'مبخرة أنيقة تضيف رائحة هادئة وملطفة للبيت مع لمسة دافئة فاخرة.',
  },
  {
    id: 6,
    name: 'مبخرة المسك الفاخرة',
    category: 'incense',
    badge: 'فاخرة',
    price: 220,
    rating: 4.8,
    description: 'مبخرة غنية برائحة المسك السماوية لتزيين المنزل والصالون الفاخر.',
  },
  {
    id: 7,
    name: 'بوكس هدية فخم',
    category: 'gifts',
    badge: 'هدية أنيقة',
    price: 260,
    rating: 4.9,
    description: 'مجموعة هدية فاخرة مثالية للاحتفالات والهدايا الشخصية والعرائس.',
  },
  {
    id: 8,
    name: 'عطر + مباخر باقة مميزة',
    category: 'gifts',
    badge: 'عرض خاص',
    price: 610,
    rating: 5.0,
    description: 'باقة مختارة بعناية تجمع بين العطر الفاخر والمبخرة الراقية في تغليف أنيق.',
  },
];

// تهيئة البيانات
if (!localStorage.getItem('maskProducts')) {
  localStorage.setItem('maskProducts', JSON.stringify(DEFAULT_PRODUCTS));
}

let currentUser = null;
let isLoggedIn = false;

// معالجة تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('loginError');

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    isLoggedIn = true;
    currentUser = username;
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminUser', username);
    showDashboard();
  } else {
    errorMsg.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
  }
});

// تسجيل الخروج
document.getElementById('logoutBtn').addEventListener('click', () => {
  isLoggedIn = false;
  currentUser = null;
  localStorage.removeItem('adminLoggedIn');
  localStorage.removeItem('adminUser');
  location.reload();
});

function showDashboard() {
  document.getElementById('loginContainer').classList.add('hidden');
  document.getElementById('adminDashboard').classList.remove('hidden');
  document.getElementById('adminUsername').textContent = `مرحباً، ${currentUser}`;
  loadProducts();
}

// التحقق من جلسة تسجيل الدخول عند تحميل الصفحة
if (localStorage.getItem('adminLoggedIn') === 'true') {
  currentUser = localStorage.getItem('adminUser');
  isLoggedIn = true;
  showDashboard();
}

// تبديل الألسنة
document.querySelectorAll('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(tab).classList.add('active');
  });
});

// إضافة منتج
document.getElementById('addProductForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const products = getStoredProducts();
  const newId = Math.max(...products.map((p) => p.id), 0) + 1;

  const newProduct = {
    id: newId,
    name: document.getElementById('productName').value,
    price: Number(document.getElementById('productPrice').value),
    category: document.getElementById('productCategory').value,
    rating: Number(document.getElementById('productRating').value),
    badge: document.getElementById('productBadge').value,
    description: document.getElementById('productDescription').value,
  };

  products.push(newProduct);
  saveProducts(products);
  e.target.reset();
  alert('تم إضافة المنتج بنجاح!');
  loadProducts();
});

// تحميل المنتجات
function loadProducts() {
  const products = getStoredProducts();
  const list = document.getElementById('productsList');

  list.innerHTML = products
    .map(
      (product) => `
        <div class="product-item" onclick="openEditModal(${product.id})">
          <div class="product-info">
            <h3>${product.name}</h3>
            <span>${product.description.substring(0, 60)}...</span>
          </div>
          <div class="product-meta">
            <span class="product-price">${product.price} ر.س</span>
            <span class="product-category">${getCategoryName(product.category)}</span>
            <button class="edit-btn" onclick="event.stopPropagation(); openEditModal(${product.id})">تعديل</button>
          </div>
        </div>
      `
    )
    .join('');

  updateStats();
}

function getCategoryName(category) {
  const names = {
    gulf: 'عطور خليجية',
    french: 'عطور فرنسية',
    incense: 'مباخر',
    gifts: 'هدايا',
  };
  return names[category];
}

// فتح نافذة التعديل
function openEditModal(productId) {
  const products = getStoredProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  document.getElementById('editProductId').value = product.id;
  document.getElementById('editProductName').value = product.name;
  document.getElementById('editProductPrice').value = product.price;
  document.getElementById('editProductCategory').value = product.category;
  document.getElementById('editProductRating').value = product.rating;
  document.getElementById('editProductBadge').value = product.badge;
  document.getElementById('editProductDescription').value = product.description;
  document.getElementById('editModal').classList.remove('hidden');
}

// إغلاق نافذة التعديل
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('editModal').classList.add('hidden');
});

// معالجة تعديل المنتج
document.getElementById('editProductForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const products = getStoredProducts();
  const productId = Number(document.getElementById('editProductId').value);
  const product = products.find((p) => p.id === productId);

  if (product) {
    product.name = document.getElementById('editProductName').value;
    product.price = Number(document.getElementById('editProductPrice').value);
    product.category = document.getElementById('editProductCategory').value;
    product.rating = Number(document.getElementById('editProductRating').value);
    product.badge = document.getElementById('editProductBadge').value;
    product.description = document.getElementById('editProductDescription').value;
    saveProducts(products);
    document.getElementById('editModal').classList.add('hidden');
    loadProducts();
    alert('تم تحديث المنتج بنجاح!');
  }
});

// حذف المنتج
document.getElementById('deleteBtn').addEventListener('click', () => {
  if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
    const products = getStoredProducts();
    const productId = Number(document.getElementById('editProductId').value);
    const filtered = products.filter((p) => p.id !== productId);
    saveProducts(filtered);
    document.getElementById('editModal').classList.add('hidden');
    loadProducts();
    alert('تم حذف المنتج بنجاح!');
  }
});

// تحديث الإحصائيات
function updateStats() {
  const products = getStoredProducts();

  const gulfCount = products.filter((p) => p.category === 'gulf').length;
  const frenchCount = products.filter((p) => p.category === 'french').length;
  const incenseCount = products.filter((p) => p.category === 'incense').length;
  const giftsCount = products.filter((p) => p.category === 'gifts').length;

  document.getElementById('gulfCount').textContent = gulfCount;
  document.getElementById('frenchCount').textContent = frenchCount;
  document.getElementById('incenseCount').textContent = incenseCount;
  document.getElementById('giftsCount').textContent = giftsCount;

  document.getElementById('totalProducts').textContent = products.length;
  const avgRating = (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1);
  document.getElementById('avgRating').textContent = avgRating;
  const avgPrice = (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(0);
  document.getElementById('avgPrice').textContent = avgPrice + ' ر.س';
}

// البحث عن المنتجات
document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const products = getStoredProducts();
  const filtered = products.filter((p) => p.name.includes(query) || p.description.includes(query));
  const list = document.getElementById('productsList');

  list.innerHTML = filtered
    .map(
      (product) => `
        <div class="product-item" onclick="openEditModal(${product.id})">
          <div class="product-info">
            <h3>${product.name}</h3>
            <span>${product.description.substring(0, 60)}...</span>
          </div>
          <div class="product-meta">
            <span class="product-price">${product.price} ر.س</span>
            <span class="product-category">${getCategoryName(product.category)}</span>
            <button class="edit-btn" onclick="event.stopPropagation(); openEditModal(${product.id})">تعديل</button>
          </div>
        </div>
      `
    )
    .join('');
});
