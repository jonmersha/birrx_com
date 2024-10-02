const selectOP = require("../utils/select");
const updateOP = require("../utils/update");
const deleteOP = require("../utils/delete");
// "0. categories",
//============================================
let categories = {
  Data: [
    {
      category_id: 1,
      category_name: "Mobile Phones",
      description: "Latest smartphones and accessories.",
      parent_category_id: 1,
      created_at: "2024-10-02T02:48:23.000Z",
      updated_at: "2024-10-02T02:48:23.000Z",
    },
  ],
};

// "1. merchant_subscriptions",

merchant_subscriptions = {
  Data: [
    {
      subscription_id: 1,
      merchant_id: 1,
      plan_id: 1,
      created_at: "2024-10-02T03:17:03.000Z",
      end_date: "2024-11-01T03:17:03.000Z",
      status: "active",
    },
  ],
};
// "2. merchants",
merchants = {
  Data: [
    {
      merchant_id: 1,
      user_id: 1,
      business_name: "Tech Gadgets Inc.",
      business_address: "123 Tech Lane, Silicon Valley, CA",
      contact_email: "contact@techgadgets.com",
      contact_phone: "123-456-7890",
      created_at: "2024-10-02T03:15:29.000Z",
      updated_at: "2024-10-02T03:15:29.000Z",
    },
  ],
};

// "3. order_items",
order_items = {
  Data: [
    {
      order_item_id: 6,
      order_id: 1,
      product_id: 1,
      quantity: 2,
      price: 999.99,
      created_at: "2024-10-02T03:04:43.000Z",
      updated_at: "2024-10-02T03:04:43.000Z",
    },
  ],
};
// "4. orders",
orders = {
  Data: [
    {
      order_id: 1,
      user_id: 1,
      total_amount: 199.99,
      status: "paid",
      shipping_address: "123 Main St, Springfield, IL, 62704",
      created_at: "2024-10-02T03:02:20.000Z",
      updated_at: "2024-10-02T03:02:20.000Z",
    },
    {
      order_id: 2,
      user_id: 2,
      total_amount: 59.99,
      status: "shipped",
      shipping_address: "456 Oak St, Los Angeles, CA, 90001",
      created_at: "2024-10-02T03:02:20.000Z",
      updated_at: "2024-10-02T03:02:20.000Z",
    },
  ],
};
// "5. parent_categories",
parent_categories = {
  Data: [
    {
      id: 1,
      name: "Electronics",
      description: "Devices and gadgets including phones, laptops, and more.",
    },
    {
      id: 2,
      name: "Fashion",
      description: "Clothing, shoes, and accessories.",
    },
  ],
};
// "6. payments",
payments = {
  Data: [
    {
      payment_id: 1,
      order_id: 1,
      payment_method: "credit_card",
      payment_status: "completed",
      amount: 1999.98,
      transaction_id: "TRX123456789",
      created_at: "2024-10-02T03:07:08.000Z",
      updated_at: "2024-10-02T03:07:08.000Z",
    },
  ],
};
// "7. product_likes",
product_likes = {
  Data: [
    {
      like_id: 1,
      user_id: 1,
      product_id: 1,
      created_at: "2024-10-02T03:14:41.000Z",
    },
  ],
};
// "8. product_views",
product_views = {
  Data: [
    {
      view_id: 1,
      user_id: 1,
      product_id: 1,
      created_at: "2024-10-02T03:13:47.000Z",
    },
  ],
};
// "9. products",
products = {
  Data: [
    {
      product_id: 1,
      category_id: 1,
      product_name: "iPhone 14",
      description: "Latest Apple iPhone with advanced features.",
      price: 999.99,
      stock: 50,
      image_url: "https://example.com/images/iphone14.jpg",
      created_at: "2024-10-02T02:56:46.000Z",
      updated_at: "2024-10-02T02:56:46.000Z",
      merchant_id: null,
    },
  ],
};
// "10. promotion_budgets",
promotion_budgets = {
  Data: [
    {
      budget_id: 1,
      promotion_id: 1,
      total_budget: 1000,
      spent_amount: 250,
    },
  ],
};
// "11. promotion_clicks",
promotion_clicks = {
  Data: [
    {
      promotion_click_id: 1,
      promotion_id: 1,
      user_id: 1,
      created_at: "2024-10-02T03:19:47.000Z",
    },
  ],
};
// "12. promotion_images",
promotion_images = {
  Data: [
    {
      image_id: 1,
      promotion_id: 1,
      image_url: "https://example.com/images/summer_sale.jpg",
      created_at: "2024-10-02T03:21:04.000Z",
    },
  ],
};
// "13. promotion_products",
promotion_products = {
  Data: [
    {
      promotion_product_id: 1,
      promotion_id: 1,
      product_id: 1,
      created_at: "2024-10-02T03:18:32.000Z",
    },
  ],
};
// "14. promotion_views",
promotion_views = {
  Data: [
    {
      promotion_view_id: 1,
      promotion_id: 1,
      user_id: 1,
      created_at: "2024-10-02T03:19:09.000Z",
    },
  ],
};
// "15. promotions",
promotions = {
  Data: [
    {
      promotion_id: 1,
      merchant_id: 1,
      title: "Summer Sale",
      description: "Enjoy up to 20% off on selected gadgets!",
      discount_percentage: 20,
      start_date: "2024-05-31T21:00:00.000Z",
      end_date: "2024-06-30T20:59:59.000Z",
      created_at: "2024-10-02T03:17:48.000Z",
      updated_at: "2024-10-02T03:17:48.000Z",
    },
  ],
};
// "16. reviews",
reviews = {
  Data: [
    {
      review_id: 1,
      user_id: 1,
      product_id: 1,
      rating: 5,
      review_text:
        "Absolutely love my new iPhone 14! The camera quality is amazing.",
      created_at: "2024-10-02T03:11:52.000Z",
      updated_at: "2024-10-02T03:11:52.000Z",
    },
  ],
};
// "17. shopping_cart",
shopping_cart = {
  Data: [
    {
      cart_id: 16,
      user_id: 1,
      product_id: 1,
      quantity: 2,
      created_at: "2024-10-02T03:09:08.000Z",
    },
  ],
};
// "18. subscription_plans",
let subscription_plans = {
  Data: [
    {
      plan_id: 1,
      plan_name: "Basic Plan",
      description: "Basic subscription for small businesses.",
      price: 19.99,
      duration_in_days: 30,
      created_at: "2024-10-02T03:16:14.000Z",
      updated_at: "2024-10-02T03:16:14.000Z",
    },
  ],
};

// "19. users"
users = {
  Data: [
    {
      user_id: 1,
      username: "john_doe",
      email: "john.doe@example.com",
      password_hash: "hashed_password_1",
      first_name: "John",
      last_name: "Doe",
      phone: "1234567890",
      address: "123 Main St",
      city: "Springfield",
      state: "IL",
      country: "USA",
      postal_code: "62704",
      created_at: "2024-10-02T03:02:04.000Z",
      updated_at: "2024-10-02T03:02:04.000Z",
    },
  ],
};

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
///////////////////
////////////////////////
////////////////////////
////////////////////////////
///////////////////////////////OLD Implementations
////////////////////////////////
/////////////////////////////////
///////////////////////////////

//SELECT * FROM `allAVtrend` WHERE rate_date >= CURDATE() - INTERVAL 20 DAY;

//Today Rate Only
router.get("/rate/today", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from todayRate`;
  callFunc.DBO(stm, res, "Error Getting Data!!");
});

///Product Sections

outer.get("/rate/today", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from todayRate`;
  callFunc.DBO(stm, res, "Error Getting Data!!");
});

/////////////////////////////////////Reports
//Today Rate Only
router.get("/user/report", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `
  SELECT u.username, COUNT(pv.view_id) AS total_views, COUNT(pl.like_id) AS total_likes, COUNT(r.review_id) AS total_reviews, COUNT(o.order_id) AS total_orders
  FROM users u
  LEFT JOIN product_views pv ON u.user_id = pv.user_id
  LEFT JOIN product_likes pl ON u.user_id = pl.user_id
  LEFT JOIN reviews r ON u.user_id = r.user_id
  LEFT JOIN orders o ON u.user_id = o.user_id
  GROUP BY u.user_id;`;

  callFunc.DBO(stm, res, "Error Getting Data!!");
});

//Per bank Currency trend
router.get(
  "/bank/trend/:bankID/:interval",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const bankId = req.params.bankID;
    const intervals = req.params.interval;

    const stm = `SELECT * FROM rate JOIN currency on currency.id=rate.currency_id where bank_id=${bankId} and rate_date >= CURDATE() - INTERVAL ${intervals} DAY; `; //Query.selectAllCount(data[id]);
    callFunc.getData(stm, res);
  }
);

router.get("/rate/max", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from maxRate`;

  callFunc.DBO(stm, res, "Error Getting Data!!");
});

router.get(
  "/rate/cbuying/max",
  apiKeyMiddleware.apiKeyMiddleware,
  (req, res) => {
    const stm = `select * from cbuyingMax`;

    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);
router.get(
  "/rate/cselling/min",
  apiKeyMiddleware.apiKeyMiddleware,
  (req, res) => {
    const stm = `select * from csellingMin`;
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

router.get(
  "/rate/tselling/min",
  apiKeyMiddleware.apiKeyMiddleware,
  (req, res) => {
    const stm = `select * from tsellingMin`;

    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

router.get(
  "/rate/tbuying/max",
  apiKeyMiddleware.apiKeyMiddleware,
  (req, res) => {
    const stm = `select * from tbuyingMax`;
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

router.get("/rates/latest", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from latestRate`;
  callFunc.DBO(stm, res, "Error Getting Data!!");
});

router.get("/rates/topmax", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from topMax`;
  callFunc.DBO(stm, res, "Error Getting Data!!");
});

router.get("/rate/new", apiKeyMiddleware.apiKeyMiddleware, (req, res) => {
  const stm = `select * from newRate`;
  callFunc.DBO(stm, res, "Error Getting Data!!");
});

router.get(
  "/rate/currency/trend",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const stm = `select * from buyingAVtrend`;
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

router.get(
  "/data/:tableId/:id",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const ID = req.params.tableId;
    const merchantID = req.params.id;
    const stm = Query.all_by_merchant(table[ID], merchantID);
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);

//----Counting Records in the tables
router.get(
  "/count/:id",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const id = req.params.id;
    const stm = Query.selectAllCount(data[id]);
    callFunc.getData(stm, res);
  }
);

//-----Serch in table with record ID
router.get(
  "/search/:tableId/:recId",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const tableId = req.params.tableId;
    const recId = req.params.recId;
    const stm = Query.selectCTR(data[tableId], recId, "id");
    callFunc.getData(stm, res);
  }
);

//-----Get Users with Email ID
router.get(
  "/user/:uid",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const uid = req.params.uid;
    const stm = Query.selectCTRString("users", uid, "uid");
    callFunc.getData(stm, res);
  }
);
//--- Merchant Product BY category
router.get(
  "/product/:val1/:val2",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const id1 = req.params.val1;
    const id2 = req.params.val2;
    const stm = Query.select2key(
      "product",
      "category",
      id1,
      "merchant_id",
      id2
    );
    callFunc.getData(stm, res);
  }
);

//-----All Data Return
router.get(
  "/users/:email",
  apiKeyMiddleware.apiKeyMiddleware,
  async (req, res) => {
    const emailId = req.params.email;
    const stm = Query.selectCTR("systemu", `'${emailId}'`, "email");
    callFunc.DBO(stm, res, "Error Getting Data!!");
  }
);
