import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, ShoppingCart, Heart, UserRound, Sun, Moon,
  ArrowLeft, ShieldCheck, Truck, Star, Plus, Minus,
  Menu, X, Leaf, Sparkles, Trash2
} from "lucide-react";
import "./App.css";

const categories = [
  { name: "الكل", emoji: "🛒" },
  { name: "خضار وفاكهة", emoji: "🥑" },
  { name: "ألبان وجبن", emoji: "🥛" },
  { name: "لحوم ودواجن", emoji: "🍗" },
  { name: "مخبوزات", emoji: "🥐" },
  { name: "مشروبات", emoji: "🧃" },
  { name: "سناكس ومعلبات", emoji: "🍿" },
  { name: "منظفات", emoji: "🧴" },
  { name: "عناية شخصية", emoji: "🧼" },
  { name: "أرز ومكرونة", emoji: "🍝" },
  { name: "قهوة وشاي", emoji: "☕" },
  { name: "مستلزمات منزلية", emoji: "🏠" },
];

const products = [
  { id: 1, name: "تفاح أحمر طازج", category: "خضار وفاكهة", detail: "كيلو واحد", price: 55, oldPrice: 65, rating: 4.8, image: "photo-1560806887-1e4cd0b6cbd6", color: "#fff0ed" },
  { id: 2, name: "لبن كامل الدسم", category: "ألبان وجبن", detail: "عبوة 1 لتر", price: 32, oldPrice: 38, rating: 4.7, image: "photo-1563636619-e9143da7973b", color: "#edf5ff" },
  { id: 3, name: "بيض طازج", category: "ألبان وجبن", detail: "طبق 30 بيضة", price: 120, oldPrice: null, rating: 4.9, image: "photo-1506976785307-8732e854ad03", color: "#fff7e8" },
  { id: 4, name: "عصير برتقال طبيعي", category: "مشروبات", detail: "عبوة 1 لتر", price: 45, oldPrice: 52, rating: 4.6, image: "photo-1600271886742-f049cd451bba", color: "#fff2df" },
  { id: 5, name: "خبز طازج", category: "مخبوزات", detail: "عبوة مخبوزات", price: 25, oldPrice: null, rating: 4.5, image: "photo-1509440159596-0249088772ff", color: "#fff0dc" },
  { id: 6, name: "دجاج طازج", category: "لحوم ودواجن", detail: "كيلو واحد", price: 110, oldPrice: 125, rating: 4.7, image: "photo-1604503468506-a8da13d82791", color: "#fff0ef" },
  { id: 7, name: "خضار طازج", category: "خضار وفاكهة", detail: "تشكيلة يومية", price: 40, oldPrice: null, rating: 4.8, image: "photo-1540420773420-3366772f4999", color: "#edf7e9" },
  { id: 8, name: "سناكس متنوعة", category: "سناكس ومعلبات", detail: "عبوة عائلية", price: 35, oldPrice: 42, rating: 4.4, image: "photo-1621939514649-280e2aa2c2a1", color: "#fff0e6" },
  { id: 9, name: "منظف متعدد الاستخدام", category: "منظفات", detail: "عبوة 1 لتر", price: 65, oldPrice: null, rating: 4.5, image: "photo-1563453392212-326f5e854473", color: "#eaf3ff" },
  { id: 10, name: "موز طازج", category: "خضار وفاكهة", detail: "كيلو واحد", price: 35, oldPrice: 40, rating: 4.8, image: "photo-1571771894821-ce9b6c11b08e", color: "#fff8db" },
  { id: 11, name: "جبنة بيضاء", category: "ألبان وجبن", detail: "عبوة 500 جرام", price: 48, oldPrice: null, rating: 4.6, image: "photo-1486297678162-eb2a19b0a32d", color: "#f7f2e8" },
  { id: 12, name: "فراولة طازجة", category: "خضار وفاكهة", detail: "عبوة 500 جرام", price: 60, oldPrice: 75, rating: 4.9, image: "photo-1464965911861-746a04b4bca6", color: "#fff0f2" },
  { id: 13, name: "طماطم بلدي", category: "خضار وفاكهة", detail: "كيلو واحد", price: 22, oldPrice: 28, rating: 4.7, image: "photo-1546094096-0df4bcaaa337", color: "#fff0ed" },
  { id: 14, name: "خيار طازج", category: "خضار وفاكهة", detail: "كيلو واحد", price: 18, oldPrice: null, rating: 4.6, image: "photo-1604977042946-1eecc30f269e", color: "#edf7e9" },
  { id: 15, name: "برتقال عصير", category: "خضار وفاكهة", detail: "كيلو واحد", price: 30, oldPrice: 36, rating: 4.8, image: "photo-1547514701-42782101795e", color: "#fff2df" },
  { id: 16, name: "بطاطس", category: "خضار وفاكهة", detail: "كيلو واحد", price: 20, oldPrice: null, rating: 4.5, image: "photo-1518977676601-b53f82aba655", color: "#f7f0e6" },
  { id: 17, name: "مانجو", category: "خضار وفاكهة", detail: "كيلو واحد", price: 75, oldPrice: 90, rating: 4.9, image: "photo-1553279768-865429fa0078", color: "#fff4d9" },
  { id: 18, name: "زبادي طبيعي", category: "ألبان وجبن", detail: "عبوة 105 جرام", price: 10, oldPrice: null, rating: 4.6, image: "photo-1488477181946-6428a0291777", color: "#f3f6ff" },
  { id: 19, name: "جبنة شيدر", category: "ألبان وجبن", detail: "عبوة 250 جرام", price: 58, oldPrice: 68, rating: 4.7, image: "photo-1552767059-ce182ead6c1b", color: "#fff3d9" },
  { id: 20, name: "زبدة", category: "ألبان وجبن", detail: "عبوة 200 جرام", price: 52, oldPrice: null, rating: 4.5, image: "photo-1589985270826-4b7bb135bc9d", color: "#fff8db" },
  { id: 21, name: "لحم بقري", category: "لحوم ودواجن", detail: "كيلو واحد", price: 360, oldPrice: 390, rating: 4.7, image: "photo-1607623814075-e51df1bdc82f", color: "#fff0ef" },
  { id: 22, name: "صدور دجاج", category: "لحوم ودواجن", detail: "عبوة 1 كيلو", price: 145, oldPrice: null, rating: 4.8, image: "photo-1604503468506-a8da13d82791", color: "#fff0ef" },
  { id: 23, name: "كرواسون", category: "مخبوزات", detail: "قطعتان", price: 28, oldPrice: 34, rating: 4.6, image: "photo-1555507036-ab1f4038808a", color: "#fff0dc" },
  { id: 24, name: "توست أبيض", category: "مخبوزات", detail: "عبوة 500 جرام", price: 30, oldPrice: null, rating: 4.5, image: "photo-1598373182133-52452f7691ef", color: "#fff0dc" },
  { id: 25, name: "مياه معدنية", category: "مشروبات", detail: "عبوة 1.5 لتر", price: 12, oldPrice: null, rating: 4.7, image: "photo-1602143407151-7111542de6e8", color: "#edf5ff" },
  { id: 26, name: "مشروب غازي", category: "مشروبات", detail: "عبوة 1 لتر", price: 25, oldPrice: 30, rating: 4.4, image: "photo-1629203851122-3726ecdf080e", color: "#fff0ed" },
  { id: 27, name: "شيبسي بطعم الجبنة", category: "سناكس ومعلبات", detail: "كيس عائلي", price: 20, oldPrice: 24, rating: 4.4, image: "photo-1566478989037-eec170784d0b", color: "#fff0e6" },
  { id: 28, name: "بسكويت بالشوكولاتة", category: "سناكس ومعلبات", detail: "عبوة 200 جرام", price: 32, oldPrice: null, rating: 4.6, image: "photo-1499636136210-6f4ee915583e", color: "#f7eee8" },
  { id: 29, name: "تونة معلبة", category: "سناكس ومعلبات", detail: "علبة 140 جرام", price: 42, oldPrice: 48, rating: 4.5, image: "photo-1534483509719-3f5af1e9d7e3", color: "#edf5ff" },
  { id: 30, name: "مسحوق غسيل", category: "منظفات", detail: "عبوة 1 كيلو", price: 85, oldPrice: 99, rating: 4.6, image: "photo-1605276374104-dee2a0ed3cd6", color: "#eaf3ff" },
  { id: 31, name: "سائل غسيل الأطباق", category: "منظفات", detail: "عبوة 600 مل", price: 38, oldPrice: null, rating: 4.5, image: "photo-1585421514738-01798e348b17", color: "#eaf3ff" },
  { id: 32, name: "شامبو للشعر", category: "عناية شخصية", detail: "عبوة 400 مل", price: 95, oldPrice: 115, rating: 4.6, image: "photo-1608248543803-ba4f8c70ae0b", color: "#f5efff" },
  { id: 33, name: "صابون لليدين", category: "عناية شخصية", detail: "عبوة 250 مل", price: 35, oldPrice: null, rating: 4.5, image: "photo-1600857544200-b2f666a9a2ec", color: "#f5efff" },
  { id: 34, name: "أرز مصري", category: "أرز ومكرونة", detail: "كيس 1 كيلو", price: 32, oldPrice: 37, rating: 4.7, image: "photo-1586201375761-83865001e31c", color: "#fff8e8" },
  { id: 35, name: "مكرونة", category: "أرز ومكرونة", detail: "كيس 400 جرام", price: 18, oldPrice: null, rating: 4.6, image: "photo-1551462147-ff29053bfc14", color: "#fff4df" },
  { id: 36, name: "زيت عباد الشمس", category: "أرز ومكرونة", detail: "زجاجة 1 لتر", price: 78, oldPrice: 88, rating: 4.6, image: "photo-1474979266404-7eaacbcd87c5", color: "#fff8db" },
  { id: 37, name: "شاي أسود", category: "قهوة وشاي", detail: "عبوة 250 جرام", price: 68, oldPrice: null, rating: 4.7, image: "photo-1544787219-7f47ccb76574", color: "#f5eee7" },
  { id: 38, name: "قهوة مطحونة", category: "قهوة وشاي", detail: "عبوة 200 جرام", price: 115, oldPrice: 130, rating: 4.8, image: "photo-155 coffee", color: "#f3e9df" },
  { id: 39, name: "مناديل ورقية", category: "مستلزمات منزلية", detail: "عبوة 3 علب", price: 45, oldPrice: null, rating: 4.5, image: "photo-1583947215259-38e31be8751f", color: "#f5f5f5" },
  { id: 40, name: "أكياس قمامة", category: "مستلزمات منزلية", detail: "لفة 30 كيس", price: 28, oldPrice: 35, rating: 4.4, image: "photo-1605600659873-d808a13e4d9a", color: "#eef1f3" },
];

const imageUrl = (id, width = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function App() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("seltak-theme") === "dark"
  );
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleTheme = () => {
    setDark((current) => {
      localStorage.setItem("seltak-theme", current ? "light" : "dark");
      return !current;
    });
  };

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "الكل" || product.category === activeCategory;
      const matchesSearch = product.name.includes(search.trim());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartItems = products.filter((product) => cart[product.id] > 0);
  const cartTotal = cartItems.reduce(
    (sum, product) => sum + product.price * cart[product.id], 0
  );

  const addToCart = (id) =>
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));

  const changeQuantity = (id, amount) => {
    setCart((current) => {
      const next = { ...current };
      const qty = (next[id] || 0) + amount;
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className={dark ? "site dark" : "site"} dir="rtl">
      <div className="announcement">
        <Sparkles size={15} />
        <span>طازة لحد باب بيتك — تسوّق احتياجاتك اليومية بسهولة</span>
      </div>

      <header className="header">
        <a className="brand" href="#home" aria-label="سلتك - الرئيسية">
          <span className="brand-icon"><ShoppingCart size={27} /></span>
          <span>
            <strong>سِلّتك</strong>
            <small>كل طلبات البيت في مكان واحد</small>
          </span>
        </a>

        <div className="search-box">
          <Search size={19} />
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
            placeholder="ابحث عن منتجك المفضل..."
            aria-label="ابحث عن منتج"
          />
          {search && (
            <button className="clear-search" onClick={() => setSearch("")} aria-label="مسح البحث">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="header-actions">
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label="تغيير الوضع">
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="icon-button desktop-action" aria-label="حسابي">
            <UserRound size={21} />
            <span>حسابي</span>
          </button>
          <button className="icon-button desktop-action" onClick={() => setActiveCategory("الكل")} aria-label="المفضلة">
            <Heart size={21} />
            <span>المفضلة {favorites.length > 0 && `(${favorites.length})`}</span>
          </button>
          <button className="icon-button cart-button" onClick={() => setShowCart(true)} aria-label="سلة المشتريات">
            <ShoppingCart size={22} />
            <span>السلة</span>
            <b className="cart-count">{cartCount}</b>
          </button>
          <button className="icon-button mobile-menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="القائمة">
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <nav className={`nav ${mobileMenu ? "nav-open" : ""}`}>
        <a className="nav-active" href="#home" onClick={() => setMobileMenu(false)}>الرئيسية</a>
        <a href="#categories" onClick={() => setMobileMenu(false)}>الأقسام</a>
        <a href="#offers" onClick={() => setMobileMenu(false)}>عروض اليوم</a>
        <a href="#products" onClick={() => setMobileMenu(false)}>المنتجات</a>
        <a href="#delivery" onClick={() => setMobileMenu(false)}>التوصيل</a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Leaf size={17} /> طازة كل يوم
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            أطعمة طازجة
            <br />
            <span>لحياة أفضل</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            من المزرعة لباب بيتك.. كل ما تحتاجه وأكثر
          </motion.p>
          <motion.a
            className="primary-button"
            href="#products"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            تسوّق الآن <ArrowLeft size={18} />
          </motion.a>
          <div className="hero-points">
            <span><ShieldCheck size={16} /> جودة مضمونة</span>
            <span><Truck size={16} /> توصيل سريع</span>
          </div>
        </div>

        <motion.div
          className="hero-image-wrap"
          initial={{ opacity: 0, scale: 0.78, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <motion.div
            className="hero-orbit orbit-one"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="hero-orbit orbit-two"
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          />
          <motion.img
            className="hero-produce"
            src={imageUrl("photo-1542838132-92c53300491e", 1000)}
            alt="خضروات وفاكهة طازجة"
            animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="floating-note note-top"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span>🌿</span><div><strong>طازة يوميًا</strong><small>من أفضل المزارع</small></div>
          </motion.div>
          <motion.div
            className="floating-note note-bottom"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity }}
          >
            <span>🚚</span><div><strong>توصيل سريع</strong><small>لحد باب بيتك</small></div>
          </motion.div>
        </motion.div>

        <div className="hero-side-label">اختياراتك الأفضل دائمًا <span>♥</span></div>
        <div className="hero-decoration decor-one">✳</div>
        <div className="hero-decoration decor-two">✳</div>
      </section>

      <section className="category-section section-wrap" id="categories">
        <div className="section-heading">
          <div><span className="section-kicker">اختار اللي محتاجه</span><h2>تسوّق حسب القسم</h2></div>
          <span className="section-caption">كل احتياجاتك في مكان واحد</span>
        </div>
        <div className="category-list">
          {categories.slice(1).map((category, index) => (
            <motion.button
              key={category.name}
              className={`category-card category-${index} ${activeCategory === category.name ? "selected" : ""}`}
              onClick={() => {
                setActiveCategory(category.name);
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ y: -8, scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="category-emoji">{category.emoji}</span>
              <strong>{category.name}</strong>
              <span className="category-arrow"><ArrowLeft size={15} /></span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="offers-section section-wrap" id="offers">
        <motion.div
          className="offer-card offer-green"
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <div className="offer-copy">
            <span className="offer-tag">لفترة محدودة</span>
            <h2>عروض اليوم</h2>
            <p>وفّر أكتر مع خصومات على منتجات مختارة</p>
            <a href="#products">شاهد العروض <ArrowLeft size={16} /></a>
          </div>
          <motion.div
            className="offer-art offer-fruit"
            animate={{ y: [0, -7, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >🍓</motion.div>
          <span className="discount-bubble">خصم<br /><b>50%</b></span>
        </motion.div>

        <motion.div
          className="offer-card offer-peach"
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <div className="offer-copy">
            <span className="offer-tag">وصل حديثًا</span>
            <h2>منتجات جديدة</h2>
            <p>اكتشف أحدث المنتجات في سِلّتك</p>
            <a href="#products">اكتشف الجديد <ArrowLeft size={16} /></a>
          </div>
          <motion.div
            className="offer-art offer-bowl"
            animate={{ y: [0, -9, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 5.5, repeat: Infinity }}
          >🥗</motion.div>
        </motion.div>
      </section>

      <section className="products-section section-wrap" id="products">
        <div className="section-heading">
          <div><span className="section-kicker">اختيارات مميزة ليك</span><h2>{search ? "نتائج البحث" : activeCategory === "الكل" ? "الأكثر مبيعًا" : activeCategory}</h2></div>
          <button className="view-all" onClick={() => { setActiveCategory("الكل"); setSearch(""); }}>
            عرض الكل <ArrowLeft size={16} />
          </button>
        </div>

        <div className="product-filter">
          {categories.slice(0, 6).map((category) => (
            <button
              key={category.name}
              className={activeCategory === category.name ? "filter-active" : ""}
              onClick={() => setActiveCategory(category.name)}
            >{category.name}</button>
          ))}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <motion.article
                className="product-card"
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.07 }}
                whileHover={{ y: -6 }}
              >
                <div className="product-image" style={{ backgroundColor: product.color }}>
                  <img src={imageUrl(product.image)} alt={product.name} loading="lazy" />
                  {product.oldPrice && (
                    <span className="product-discount">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  )}
                  <button
                    className={`favorite-button ${favorites.includes(product.id) ? "is-favorite" : ""}`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="إضافة للمفضلة"
                  >
                    <Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className="product-detail">{product.detail}</p>
                  <div className="product-rating"><Star size={15} fill="currentColor" /> {product.rating}</div>
                  <div className="price-row">
                    <strong>{product.price} <small>ج.م</small></strong>
                    {product.oldPrice && <del>{product.oldPrice} ج.م</del>}
                  </div>
                  <motion.button
                    className="add-button"
                    onClick={() => addToCart(product.id)}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Plus size={17} /> أضف إلى السلة
                    {cart[product.id] > 0 && <span className="added-qty">{cart[product.id]}</span>}
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={35} />
            <h3>ملقيناش المنتج ده</h3>
            <p>جرّب اسم تاني أو اختار قسم مختلف.</p>
            <button className="primary-button" onClick={() => { setSearch(""); setActiveCategory("الكل"); }}>عرض كل المنتجات</button>
          </div>
        )}
      </section>

      <motion.section
        className="delivery-banner section-wrap"
        id="delivery"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="delivery-copy">
          <span className="section-kicker">تجربة تسوّق أسهل</span>
          <h2>كل اللي بيتك محتاجه.. في سِلّتك</h2>
          <p>اختيارات طازة، أسعار مناسبة، وتجربة تسوّق بسيطة.</p>
          <a href="#products" className="primary-button">ابدأ التسوق <ArrowLeft size={17} /></a>
        </div>
        <motion.div
          className="delivery-illustration"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >🛒🥬🍊</motion.div>
        <div className="delivery-benefits">
          <div><Truck /><span><strong>توصيل سريع</strong><small>طلبك لحد باب البيت</small></span></div>
          <div><ShieldCheck /><span><strong>تسوّق بأمان</strong><small>تجربة سهلة ومريحة</small></span></div>
          <div><Leaf /><span><strong>منتجات طازجة</strong><small>اختيارات يومية</small></span></div>
        </div>
      </motion.section>

      <footer className="footer">
        <div className="footer-main section-wrap">
          <div className="footer-brand">
            <a className="brand" href="#home">
              <span className="brand-icon"><ShoppingCart size={27} /></span>
              <span><strong>سِلّتك</strong><small>كل طلبات البيت في مكان واحد</small></span>
            </a>
            <p>تجربة تسوّق يومية أسهل وأقرب ليك.</p>
          </div>
          <div className="footer-column"><h4>روابط مهمة</h4><a href="#home">الرئيسية</a><a href="#categories">الأقسام</a><a href="#offers">عروض اليوم</a></div>
          <div className="footer-column"><h4>خدمة العملاء</h4><a href="#delivery">التوصيل</a><a href="#products">المنتجات</a><a href="#home">تواصل معنا</a></div>
          <div className="footer-column"><h4>تابعنا</h4><div className="social-links"><span>f</span><span>◎</span><span>▶</span></div></div>
        </div>
        <div className="footer-bottom section-wrap">
          <span>© 2026 سِلّتك — جميع الحقوق محفوظة</span>
          <span>صُنع بحب لبيتك ♥</span>
        </div>
      </footer>

      <AnimatePresence>
        {showCart && (
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)}
          >
            <motion.aside
              className="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="cart-drawer-header">
                <div><h2>سلة مشترياتك</h2><p>{cartCount} منتج في السلة</p></div>
                <button className="icon-button" onClick={() => setShowCart(false)} aria-label="إغلاق السلة"><X /></button>
              </div>
              {cartItems.length === 0 ? (
                <div className="cart-empty"><ShoppingCart size={46} /><h3>سلتك لسه فاضية</h3><p>اختار منتجاتك المفضلة وابدأ التسوق.</p><button className="primary-button" onClick={() => setShowCart(false)}>تسوّق الآن</button></div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((product) => (
                      <div className="cart-item" key={product.id}>
                        <img src={imageUrl(product.image, 200)} alt={product.name} />
                        <div className="cart-item-info"><strong>{product.name}</strong><span>{product.price} ج.م</span><div className="quantity-control"><button onClick={() => changeQuantity(product.id, -1)} aria-label="تقليل الكمية"><Minus size={14} /></button><b>{cart[product.id]}</b><button onClick={() => changeQuantity(product.id, 1)} aria-label="زيادة الكمية"><Plus size={14} /></button></div></div>
                        <button className="remove-item" onClick={() => setCart((current) => { const next = { ...current }; delete next[product.id]; return next; })} aria-label="حذف المنتج"><Trash2 size={17} /></button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary"><div><span>الإجمالي</span><strong>{cartTotal} ج.م</strong></div><p>دي سلة تجريبية للواجهة الأمامية فقط.</p><button className="primary-button" onClick={() => alert("دي تجربة Front-End؛ إتمام الطلب الحقيقي يحتاج Backend.")}>متابعة الطلب <ArrowLeft size={18} /></button></div>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
