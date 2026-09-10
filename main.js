const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartPanel = document.getElementById("cart-panel");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");
const checkoutForm = document.getElementById("checkout-form");
const checkoutMessage = document.getElementById("checkout-message");
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.querySelector("nav");
const languageToggle = document.getElementById("language-toggle");
const cart = [];
let currentLanguage = localStorage.getItem("pace-language") || "en";

const translations = {
  en: {
    nav: ["Home", "Products", "New style", "About", "Contact"],
    cart: "Your Cart",
    emptyCart: "Your cart is empty.",
    checkout: "Checkout",
    delivery: "Delivery details",
    name: "Name",
    email: "Email",
    phone: "Phone number",
    address: "Delivery address",
    description: "Order description",
    receipt: "Bank transfer receipt photo",
    sendOrder: "Send order",
    homeTitle: "Walk with Confidence",
    homeText:
      "Modern designs, superior quality and unmatched comfort built for every step you take.",
    shopNow: "Shop Now",
    productsTitle: "Our Best Collection",
    productsText:
      "Explore our exclusive collection of premium shoes for every style.",
    newTitle: "Our New Style Shoes",
    newText: "Explore our latest collection of modern footwear.",
    aboutTitle: "About Us",
    aboutText: "Comfort, quality, and confident steps.",
    aboutHeading: "About Pace & Sole",
    aboutBody:
      "We believe the right pair of shoes can make every journey better. Our collection combines modern design, reliable quality, and everyday comfort.",
    orderNow: "Order now",
    contactTitle: "Contact Us",
    contactText: "Have a question about our shoes? Send us a message.",
    message: "Message",
    sendMessage: "Send message",
    whatsapp: "WhatsApp us",
    footerLinks: ["Home", "Products", "About us"],
    productNames: [
      "Cloud Chunky Sneaker",
      "Urban Felt Classic",
      "EasySlip Suede Loafer",
      "Trek High-Top Runner",
      "Modern Street",
      "Daily Runner",
      "City Step",
      "Weekend Walk",
    ],
    productDescriptions: [
      "All-day comfort & modern style",
      "Lightweight & breathable canvas",
      "Effortless style & soft padding",
      "Ankle support & durable design",
      "Lightweight everyday style",
      "Flexible and comfortable",
      "Simple style for every day",
      "Soft support and clean design",
    ],
    explore: "Explore",
    visit: "Visit us",
    footerBrand: "Modern shoes made for every journey.",
    switchLabel: "Switch to Arabic",
    language: "AR",
  },
  ar: {
    nav: ["الرئيسية", "المنتجات", "التشكيلة الجديدة", "من نحن", "اتصل بنا"],
    cart: "سلة التسوق",
    emptyCart: "سلة التسوق فارغة.",
    checkout: "إتمام الطلب",
    delivery: "تفاصيل التوصيل",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "عنوان التوصيل",
    description: "وصف الطلب",
    receipt: "صورة إيصال التحويل البنكي",
    sendOrder: "إرسال الطلب",
    homeTitle: "امشِ بثقة",
    homeText: "تصاميم عصرية وجودة فائقة وراحة لا مثيل لها لكل خطوة تخطوها.",
    shopNow: "تسوق الآن",
    productsTitle: "أفضل مجموعاتنا",
    productsText: "اكتشف مجموعتنا الحصرية من الأحذية الفاخرة لكل أسلوب.",
    newTitle: "أحذيتنا الجديدة",
    newText: "اكتشف أحدث مجموعتنا من الأحذية العصرية.",
    aboutTitle: "من نحن",
    aboutText: "راحة وجودة وخطوات واثقة.",
    aboutHeading: "عن بيس آند سول",
    aboutBody:
      "نؤمن بأن الحذاء المناسب يجعل كل رحلة أفضل. تجمع مجموعتنا بين التصميم العصري والجودة الموثوقة والراحة اليومية.",
    orderNow: "اطلب الآن",
    contactTitle: "اتصل بنا",
    contactText: "هل لديك سؤال عن أحذيتنا؟ أرسل لنا رسالة.",
    message: "الرسالة",
    sendMessage: "إرسال الرسالة",
    whatsapp: "تواصل عبر واتساب",
    footerLinks: ["الرئيسية", "المنتجات", "من نحن"],
    productNames: [
      "حذاء كلاود الرياضي",
      "الحذاء الكلاسيكي الحضري",
      "حذاء إيزي سليب الشامواه",
      "حذاء تريك الرياضي",
      "ستايل عصري",
      "عداء يومي",
      "خطوة المدينة",
      "نزهة نهاية الأسبوع",
    ],
    productDescriptions: [
      "راحة طوال اليوم وتصميم عصري",
      "قماش خفيف وجيد التهوية",
      "أناقة سهلة وبطانة ناعمة",
      "دعم للكاحل وتصميم متين",
      "ستايل يومي خفيف",
      "مرن ومريح",
      "ستايل بسيط لكل يوم",
      "دعم ناعم وتصميم أنيق",
    ],
    explore: "استكشف",
    visit: "زورونا",
    footerBrand: "أحذية عصرية صُنعت لكل رحلة.",
    switchLabel: "التبديل إلى الإنجليزية",
    language: "EN",
  },
};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function translatePage() {
  const language = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  languageToggle.textContent = language.language;
  languageToggle.setAttribute("aria-label", language.switchLabel);

  navigation.querySelectorAll("a").forEach((link, index) => {
    link.textContent = language.nav[index];
  });
  setText(".cart-panel-header h2", language.cart);
  setText(".cart-empty", language.emptyCart);
  setText(".checkout-button", language.checkout);
  setText(".checkout-form h2", language.delivery);
  ["name", "email", "phone", "address", "description", "receipt"].forEach(
    (field) => {
      setText(`label[for="checkout-${field}"]`, language[field]);
    },
  );
  setText(".place-order-button", language.sendOrder);
  setText("#home h1", language.homeTitle);
  setText("#home p", language.homeText);
  setText("#home .shop-1", language.shopNow);
  setText("#products .title h1", language.productsTitle);
  setText("#products .title p", language.productsText);
  setText("#newstyle .title h1", language.newTitle);
  setText("#newstyle .title p", language.newText);
  setText("#about .title h1", language.aboutTitle);
  setText("#about .title p", language.aboutText);
  setText("#about .col h1", language.aboutHeading);
  setText("#about .col p", language.aboutBody);
  setText("#about .buy", language.orderNow);
  setText("#contact .title h1", language.contactTitle);
  setText("#contact .title p", language.contactText);
  setText('label[for="message"]', language.message);
  setText("#contact form .buy", language.sendMessage);
  const whatsappButton = document.querySelector(".whatsapp-button");
  if (whatsappButton) {
    whatsappButton.innerHTML = `<i class="fab fa-whatsapp"></i> ${language.whatsapp}`;
  }
  document.querySelectorAll(".card-content h2").forEach((heading, index) => {
    heading.textContent = language.productNames[index];
  });
  document.querySelectorAll(".card-content p").forEach((description, index) => {
    description.textContent = language.productDescriptions[index];
  });
  document.querySelectorAll(".card-content .buy").forEach((button) => {
    button.textContent =
      currentLanguage === "ar" ? "أضف إلى السلة" : "Add to Cart";
  });
  document
    .querySelectorAll(".footer-column:not(.footer-contact) a")
    .forEach((link, index) => {
      link.textContent = language.footerLinks[index];
    });
  setText(".footer-column h2", language.explore);
  setText(".footer-contact h2", language.visit);
  setText(".footer-brand p", language.footerBrand);
  updateCart();
}

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";
  localStorage.setItem("pace-language", currentLanguage);
  translatePage();
});

function updateCart() {
  const itemCount = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = `$${total.toFixed(2)}`;
  checkoutButton.disabled = itemCount === 0;

  if (itemCount === 0) {
    cartItems.innerHTML = `<p class="cart-empty">${translations[currentLanguage].emptyCart}</p>`;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item" data-index="${index}" aria-label="Remove ${item.name}">&times;</button>
        </div>
    `,
    )
    .join("");

  cartItems.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      cart.splice(Number(button.dataset.index), 1);
      updateCart();
    });
  });
}

function setCartVisibility(isOpen) {
  cartPanel.classList.toggle("is-open", isOpen);
  cartPanel.setAttribute("aria-hidden", String(!isOpen));
  cartToggle.setAttribute("aria-expanded", String(isOpen));
}

document
  .querySelectorAll("#products .card .buy, #newstyle .card .buy")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const price = Number(
        card.querySelector("h3").textContent.replace("$", ""),
      );

      cart.push({
        name: card.querySelector("h2").textContent.trim(),
        price,
        image: card.querySelector("img").src,
      });
      updateCart();
      setCartVisibility(true);
    });
  });

cartToggle.addEventListener("click", () => {
  setCartVisibility(!cartPanel.classList.contains("is-open"));
});
cartClose.addEventListener("click", () => setCartVisibility(false));
checkoutButton.addEventListener("click", () => {
  checkoutForm.hidden = false;
  checkoutForm.querySelector("input").focus();
  checkoutForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const orderItems = cart
    .map((item) => `${item.name} - $${item.price.toFixed(2)}`)
    .join("\n");
  document.getElementById("order-items").value =
    orderItems || "No items listed";
  HTMLFormElement.prototype.submit.call(checkoutForm);
});

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
  menuToggle.querySelector("i").className = isOpen
    ? "fas fa-times"
    : "fas fa-bars";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.querySelector("i").className = "fas fa-bars";
  });
});

translatePage();
