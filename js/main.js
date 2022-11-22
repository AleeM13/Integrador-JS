const products = document.querySelector('.cards-container');
const productsCart = document.querySelector('.products-card');
const categories = document.querySelector('.category-list');
const categoriesList = document.querySelectorAll('.category');
const btnLoad = document.querySelector('.show-more');
const buyBtn = document.querySelector('.btn-buy');
const deleteBtn = document.querySelector('.btn-delete');
const cartBtn = document.querySelector('.cartBtn');
const cartMenu = document.querySelector('.cart');
const total = document.querySelector('.total');
const subTotal = document.querySelector('.sub-total');
const overlay = document.querySelector('.overlay');
const cardsLanzamientos = document.querySelector('.cards-lanzamientos');
const cardsDestacados = document.querySelector('.cards-destacados');
const successModal = document.querySelector('.modal');

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

const renderProduct = (product) => {
  const { id, name, price, img } = product;

  return `
    <div class="card">
        <img src="${img}" alt="${name}">
        <h3>${name}</h3>
        <span>$${price}</span>
        <div class="carrito">
            <p>Envío gratis</p>
            <button class="btn-add"
                data-id='${id}'
                data-name='${name}'
                data-price='${price}'
                data-img='${img}'>Añadir</button>
        </div>
    </div>
  `;
};

const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index]
    .map(renderProduct)
    .join("");
};
  
const renderFilteredProducts = (category) => {
    const productsList = miRopa.filter(
      (product) => product.category === category
    );
    products.innerHTML = productsList.map(renderProduct).join("");
};
  
const renderProducts = (index = 0, category = undefined) => {
    if (!category) {
      renderDividedProducts(index);
      return;
    }
    renderFilteredProducts(category);
};

const changeFilterState = (e) => {
    const selectedCategory = e.target.dataset.category;
    changeBtnActiveState(selectedCategory);
    changeShowMoreBtnState(selectedCategory);
};
  
const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
      if (categoryBtn.dataset.category !== selectedCategory) {
        categoryBtn.classList.remove("active");
        return;
      }
      categoryBtn.classList.add("active");
    });
};

const changeShowMoreBtnState = (category) => {
    if (!category) {
      btnLoad.classList.remove("hidden");
      return;
    }
    btnLoad.classList.add("hidden");
};

const applyFilter = (e) => {
    if (!e.target.classList.contains("category")) return;
    changeFilterState(e);
    if (!e.target.dataset.category) {
      products.innerHTML = "";
      renderProducts();
    } else {
      renderProducts(0, e.target.dataset.category);
      productsController.nextProductsIndex = 1;
    }
};
  
const isLastIndexOF = () =>
    productsController.nextProductsIndex === productsController.productsLimit;
  
  const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if (isLastIndexOF()) {
      btnLoad.classList.add("hidden");
    }
};

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    overlay.classList.toggle("show-overlay");
};

const closeOnScroll = () => {
    if (
      !cartMenu.classList.contains("open-cart")
    )
      return;
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};
  
const closeOnOverlayClick = () => {
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

const renderLanzamientos = (product) => {
    const { id, name, price, img } = product;
  
    return `
      <div class="card">
          <img src="${img}" alt="${name}">
          <h3>${name}</h3>
          <span>$${price}</span>
          <div class="carrito">
              <p>Envío gratis</p>
              <button class="btn-add"
                  data-id='${id}'
                  data-name='${name}'
                  data-price='${price}'
                  data-img='${img}'>Añadir</button>
          </div>
      </div>
    `;
};

const renderCardsLanzamientos = () => {
    cardsLanzamientos.innerHTML += miRopa.slice(4, 8).map(renderLanzamientos)
     .join("");
};

const renderDestacadas = (product) => {
    const { id, name, price, img } = product;
  
    return `
      <div class="card">
          <img src="${img}" alt="${name}">
          <h3>${name}</h3>
          <span>$${price}</span>
          <div class="carrito">
              <p>Envío gratis</p>
              <button class="btn-add"
                  data-id='${id}'
                  data-name='${name}'
                  data-price='${price}'
                  data-img='${img}'>Añadir</button>
          </div>
      </div>
    `;
};

const renderCardsDestacadas = () => {
    cardsDestacados.innerHTML += miRopa.slice(10, 14).map(renderLanzamientos)
    .join("");
};

const renderCartProduct = (cartProduct) => {
    const { id, name, price, img, quantity } = cartProduct;
    return `    
    <div class="product-card">
            <div class="img-cart">
                <img src="${img}" alt="${name}">
            </div>
            <div class="info-cart">
                <p>${name}</p>
                <span class="price-card">$${price}</span>
                <div class="buttons-cart">
                    <span class="quantity-handler down" data-id=${id}>-</span>
                    <span class="item-quantity">${quantity}</span>
                    <span class="quantity-handler up" data-id=${id}>+</span>
                </div>
            </div>
    </div>
    `;
  };
  
  const renderCart = () => {
    if (!cart.length) {
      productsCart.innerHTML = `<p class="empty-msg"> No hay productos en el carrito. </p>`;
      return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join("");
  };
  
  const getCartTotal = () => {
    return cart.reduce(
      (acc, cur) => acc + Number(cur.price) * Number(cur.quantity),
      0
    );
  };
  
  const showTotal = () => {
    total.innerHTML = `$${getCartTotal()}`;
    subTotal.innerHTML = `$${getCartTotal()}`;
  };
  
  const disableBtn = (btn) => {
    if (!cart.length) {
      btn.classList.add("disabled");
      return;
    }
    btn.classList.remove("disabled");
  };
  
  const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => {
      return cartProduct.id === product.id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct;
      });
    };
  
  const createCartProduct = (product) => {
    cart = [...cart, { ...product, quantity: 1 }];
  };
  
  const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
  };
  
  const createProductData = (id, name, price, img) => {
    return { id, name, price, img };
  };

  const checkCartState = () => {
    saveLocalStorage(cart);
    console.log(cart);
    renderCart(cart);
    showTotal(cart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
  };
  
const showSuccessModal = (msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(() => {
      successModal.classList.remove("active-modal");
    }, 1500);
};
  
const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) return;
    const { id, name, price, img } = e.target.dataset;
  
    const product = createProductData(id, name, price, img);
    console.log(product)
  
    if (isExistingCartProduct(product)) {
      addUnitToProduct(product);
      showSuccessModal("Se agregó una unidad del producto al carrito");
    } else {
      createCartProduct(product);
      showSuccessModal("El producto se ha agregado al carrito");
    }
    checkCartState();
};
  
const substractProductUnit = (existingProduct) => {
    cart = cart.map((cartProduct) => {
      return cartProduct.id === existingProduct.id
        ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
        : cartProduct;
    });
};
  
const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    checkCartState();
};
  
const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
  
    if (existingCartProduct.quantity === 1) {
      if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
        removeProductFromCart(existingCartProduct);
      }
      return;
    }
    substractProductUnit(existingCartProduct);
};
  
const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(existingCartProduct);
};
  
const handleQuantity = (e) => {
    if (e.target.classList.contains("down")) {
      handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains("up")) {
      handlePlusBtnEvent(e.target.dataset.id);
    }
    checkCartState();
};
  
const resetCartItems = () => {
    cart = [];
    checkCartState();
};
  
const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
      resetCartItems();
      alert(successMsg);
    }
};

const completeBuy = () => {
    completeCartAction(
      "¿Desea completar su compra?",
      "La compra se ha realizado correctamente"
    );
};
  
const deleteCart = () => {
    completeCartAction(
      "¿Está seguro de que desea vaciar el carrito?",
      "No hay productos en el carrito"
    );
};

const init = () => {
    renderProducts();
    renderCardsLanzamientos();
    renderCardsDestacadas();
    categories.addEventListener("click", applyFilter);
    btnLoad.addEventListener("click", showMoreProducts);
    cartBtn.addEventListener("click", toggleCart);
    window.addEventListener("scroll", closeOnScroll);
    overlay.addEventListener("click", closeOnOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showTotal);
    products.addEventListener("click", addProduct);
    cardsLanzamientos.addEventListener("click", addProduct);
    cardsDestacados.addEventListener("click", addProduct);
    productsCart.addEventListener("click", handleQuantity);
    buyBtn.addEventListener("click", completeBuy);
    deleteBtn.addEventListener("click", deleteCart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
};
  
init();