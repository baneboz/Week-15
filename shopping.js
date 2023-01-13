"use script";
(function () {
  console.log("Hi");

  // helper
  const random5DigitsNum = +Date.now().toString().slice(-5);

  const randomId = () =>
    Math.trunc(Math.random() * (random5DigitsNum - 10000) + 1) + 10000;

  const calcTotal = function (arr) {
    let total = 0;
    arr.forEach(el => (total += el.price));
    return total;
  };

  // Product
  const Product = function (name, price, expDate) {
    this.id = randomId();
    this.name = name;
    this.price = Math.round(price * 100) / 100;
    this.expDate = expDate;
  };

  // ShoppingBag
  const ShoppingBag = function () {
    this.products = [];
  };

  // Payment Card
  const PaymentCard = function (balance, status, expDate) {
    this.balance = balance;
    this.active = status;
    this.expDate = expDate;
  };

  // methods
  Product.prototype.getInfo = function () {
    const info = `${
      this.name[0].toUpperCase() +
      this.name[this.name.length - 1].toUpperCase() +
      this.id
    }, ${this.name}, ${this.price}`;
    console.log(info);
    return info;
  };

  ShoppingBag.prototype.addProduct = function (item) {
    // TODO
    //  if (valid exp date) {}
    this.products.push(item);
  };
  ShoppingBag.prototype.calcAvgPrice = function () {
    let avgPrice = calcTotal(this.products);
    avgPrice = Math.round((avgPrice / this.products.length) * 1000) / 1000;

    console.log("Average price of products in product list: " + avgPrice);
    return avgPrice;
  };
  ShoppingBag.prototype.getMostExpensive = function () {
    let maxPrice = this.products[0].price;
    let mostExpensiveProduct = this.products[0];
    this.products.forEach((product, i) => {
      if (product.price > maxPrice) {
        maxPrice = product.price;
        mostExpensiveProduct = product;
      }
    });
    console.log(
      `Most expensive product: ${mostExpensiveProduct.name}, with price: ${mostExpensiveProduct.price} and exp date: ${mostExpensiveProduct.expDate}`
    );
    return mostExpensiveProduct;
  };
  ShoppingBag.prototype.calcTotalPrice = function () {
    // refactor
    const totalPrice = calcTotal(this.products);
    console.log("Total price price of products in product list: " + totalPrice);
    return totalPrice;
  };

  // function
  const checkoutAndBuy = function (list, paymentCard) {
    listTotalPrice = list.calcTotalPrice();

    if (paymentCard.balance >= listTotalPrice)
      console.log("The purchase is successful");
    else {
      console.log(
        `The amount that is missing to complete the purchase: ${Math.abs(
          (paymentCard.balance - listTotalPrice).toFixed(2)
        )}`
      );
    }
  };

  // data
  const banana = new Product("Banana", 129.312, "12/01/2023");
  const apple = new Product("Apple", 68.45312, "15/01/2023");
  const milk = new Product("Milk", 168.45312, "25/01/2023");

  const shoppingList = new ShoppingBag();

  const card = new PaymentCard(2315, true, "25/01/2023");

  banana.getInfo();
  apple.getInfo();

  shoppingList.addProduct(banana);
  shoppingList.addProduct(apple);
  shoppingList.addProduct(milk);

  shoppingList.calcAvgPrice();
  shoppingList.getMostExpensive();
  shoppingList.calcTotalPrice();

  checkoutAndBuy(shoppingList, card);
})();
