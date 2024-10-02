
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(15),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE parent_categories (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id INT REFERENCES parent_categories(id) ON DELETE SET NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
-- Insert products into the products table

INSERT INTO products (category_id, product_name, description, price, stock, image_url)
VALUES
(1, 'iPhone 14', 'Latest Apple iPhone with A15 Bionic chip.', 999.99, 50, 'https://example.com/images/iphone14.jpg'),
(1, 'Samsung Galaxy S22', 'Premium smartphone with stunning display and camera.', 899.99, 30, 'https://example.com/images/galaxy_s22.jpg'),
(2, 'MacBook Pro 16', 'Powerful laptop for professionals with M1 chip.', 2499.99, 20, 'https://example.com/images/macbook_pro_16.jpg'),
(3, 'Men\'s Leather Jacket', 'Stylish leather jacket for men.', 179.99, 15, 'https://example.com/images/mens_leather_jacket.jpg'),
(3, 'Women\'s Handbag', 'Elegant handbag for women.', 89.99, 25, 'https://example.com/images/womens_handbag.jpg');

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'canceled') DEFAULT 'pending',
    shipping_address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
-- Insert order items into the order_items table

INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES
(1, 1, 2, 999.99),  -- Order for 2 units of iPhone 14
(1, 2, 1, 899.99),  -- Order for 1 unit of Samsung Galaxy S22
(2, 3, 1, 2499.99), -- Order for 1 unit of MacBook Pro 16
(3, 5, 3, 149.99),  -- Order for 3 units of Men's Leather Jacket
(4, 4, 2, 89.99);   -- Order for 2 units of Women's Handbag

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    payment_method ENUM('credit_card', 'paypal', 'bank_transfer') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    amount DECIMAL(10, 2) NOT NULL,
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Insert payments into the payments table

INSERT INTO payments (order_id, payment_method, payment_status, amount, transaction_id)
VALUES
(1, 'credit_card', 'completed', 1999.98, 'TRX123456789'),
(2, 'paypal', 'completed', 2499.99, 'TRX987654321'),
(3, 'bank_transfer', 'pending', 449.97, 'TRX654321987'),
(4, 'credit_card', 'failed', 179.98, 'TRX321987654'),
(5, 'paypal', 'completed', 99.99, 'TRX246801357');

CREATE TABLE shopping_cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
-- Insert shopping cart items into the shopping_cart table

INSERT INTO shopping_cart (user_id, product_id, quantity)
VALUES
(1, 1, 2),  -- User 1 adds 2 units of iPhone 14 to the cart
(2, 2, 1),  -- User 2 adds 1 unit of Samsung Galaxy S22 to the cart
(3, 3, 1),  -- User 3 adds 1 unit of MacBook Pro 16 to the cart
(4, 5, 3),  -- User 4 adds 3 units of Men's Leather Jacket to the cart
(5, 4, 2);  -- User 5 adds 2 units of Women's Handbag to the cart

CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
-- Insert reviews into the reviews table

INSERT INTO reviews (user_id, product_id, rating, review_text)
VALUES
(1, 1, 5, 'Absolutely love my new iPhone 14! The camera quality is amazing.'),
(2, 2, 4, 'Samsung Galaxy S22 has a great design and features, but a bit pricey.'),
(3, 3, 5, 'The MacBook Pro 16 is a powerhouse for work. Highly recommend it!'),
(4, 4, 3, 'The leather jacket is stylish, but the fit was not what I expected.'),
(5, 5, 4, 'Beautiful handbag! Perfect for everyday use, just a little small.');

CREATE TABLE audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255),
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- Insert audit logs into the audit_logs table

INSERT INTO audit_logs (user_id, action, details)
VALUES
(1, 'Created Product', 'User created a new product: iPhone 14.'),
(2, 'Updated Order', 'User updated order status for Order ID 1 to paid.'),
(3, 'Deleted Review', 'User deleted their review for Samsung Galaxy S22.'),
(4, 'Added Item to Cart', 'User added 2 units of Men\''s Leather Jacket to cart.'),
(5, 'Changed Password', 'User changed their account password successfully.');


CREATE INDEX idx_product_name ON products(product_name);
CREATE INDEX idx_order_user_id ON orders(user_id);
CREATE INDEX idx_cart_user_id ON shopping_cart(user_id);

CREATE TABLE product_views (
    view_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- Insert product views into the product_views table

INSERT INTO product_views (user_id, product_id)
VALUES
(1, 1),  -- User 1 viewed iPhone 14
(2, 2),  -- User 2 viewed Samsung Galaxy S22
(3, 3),  -- User 3 viewed MacBook Pro 16
(4, 4),  -- User 4 viewed Men's Leather Jacket
(5, 5),  -- User 5 viewed Women's Handbag
(1, 3),  -- User 1 viewed MacBook Pro 16 again
(2, 4);  -- User 2 viewed Men's Leather Jacket

CREATE TABLE product_likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);
CREATE TABLE merchants (
    merchant_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    business_name VARCHAR(255) NOT NULL,
    business_address VARCHAR(255),
    contact_email VARCHAR(100) NOT NULL,
    contact_phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- Insert merchants into the merchants table

INSERT INTO merchants (user_id, business_name, business_address, contact_email, contact_phone)
VALUES
(1, 'Tech Gadgets Inc.', '123 Tech Lane, Silicon Valley, CA', 'contact@techgadgets.com', '123-456-7890'),
(2, 'Fashion Hub', '456 Fashion St, New York, NY', 'info@fashionhub.com', '234-567-8901'),
(3, 'Home Decor Co.', '789 Decor Ave, Austin, TX', 'support@homedecor.com', '345-678-9012'),
(4, 'Gourmet Foods', '321 Food Blvd, Chicago, IL', 'hello@gourmetfoods.com', '456-789-0123'),
(5, 'Sports Gear', '654 Sports Rd, Miami, FL', 'sales@sportsgear.com', '567-890-1234');

CREATE TABLE subscription_plans (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    plan_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration_in_days INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Insert subscription plans into the subscription_plans table

INSERT INTO subscription_plans (plan_name, description, price, duration_in_days)
VALUES
('Basic Plan', 'Basic subscription for small businesses.', 19.99, 30),
('Standard Plan', 'Standard subscription for medium-sized businesses.', 49.99, 90),
('Premium Plan', 'Premium subscription for large businesses with advanced features.', 99.99, 180),
('Enterprise Plan', 'Custom plan for enterprise solutions, contact for pricing.', 199.99, 365),
('Starter Plan', 'Starter plan for new merchants.', 9.99, 14);

CREATE TABLE merchant_subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    merchant_id INT,
    plan_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP DEFAULT NULL,
    status ENUM('active', 'expired', 'canceled') DEFAULT 'active',
    FOREIGN KEY (merchant_id) REFERENCES merchants(merchant_id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(plan_id) ON DELETE CASCADE
);
-- Insert merchant subscriptions into the merchant_subscriptions table

INSERT INTO merchant_subscriptions (merchant_id, plan_id, end_date, status)
VALUES
(1, 1, DATE_ADD(NOW(), INTERVAL 30 DAY), 'active'),   -- Merchant 1 with Basic Plan
(2, 2, DATE_ADD(NOW(), INTERVAL 90 DAY), 'active'),   -- Merchant 2 with Standard Plan
(3, 3, DATE_ADD(NOW(), INTERVAL 180 DAY), 'active'),  -- Merchant 3 with Premium Plan
(4, 4, DATE_ADD(NOW(), INTERVAL 365 DAY), 'active'),  -- Merchant 4 with Enterprise Plan
(5, 5, DATE_ADD(NOW(), INTERVAL 14 DAY), 'active');    -- Merchant 5 with Starter Plan


ALTER TABLE products ADD COLUMN merchant_id INT;
ALTER TABLE products ADD FOREIGN KEY (merchant_id) REFERENCES merchants(merchant_id) ON DELETE CASCADE;

CREATE INDEX idx_view_user_product ON product_views(user_id, product_id);
CREATE INDEX idx_like_user_product ON product_likes(user_id, product_id);
CREATE INDEX idx_merchant_subscription ON merchant_subscriptions(merchant_id, plan_id);


CREATE TABLE promotions (
    promotion_id INT AUTO_INCREMENT PRIMARY KEY,
    merchant_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    discount_percentage DECIMAL(5, 2),  -- Example: 10.50 for a 10.5% discount
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (merchant_id) REFERENCES merchants(merchant_id) ON DELETE CASCADE
);
-- Insert promotions into the promotions table

INSERT INTO promotions (merchant_id, title, description, discount_percentage, start_date, end_date)
VALUES
(1, 'Summer Sale', 'Enjoy up to 20% off on selected gadgets!', 20.00, '2024-06-01 00:00:00', '2024-06-30 23:59:59'),
(2, 'Back to School', 'Get 15% off on all fashion items for students!', 15.00, '2024-08-01 00:00:00', '2024-09-15 23:59:59'),
(3, 'Holiday Discounts', 'Save 25% on home decor this holiday season!', 25.00, '2024-12-01 00:00:00', '2024-12-31 23:59:59'),
(4, 'Winter Clearance', 'Up to 50% off on gourmet food products!', 50.00, '2024-01-01 00:00:00', '2024-01-31 23:59:59'),
(5, 'Spring Sale', 'Get 10% off on all sports gear!', 10.00, '2024-03-15 00:00:00', '2024-04-15 23:59:59');


CREATE TABLE promotion_products (
    promotion_product_id INT AUTO_INCREMENT PRIMARY KEY,
    promotion_id INT,
    product_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- Insert promotion products into the promotion_products table

INSERT INTO promotion_products (promotion_id, product_id)
VALUES
(1, 1),  -- Linking Summer Sale with Product 1
(1, 2),  -- Linking Summer Sale with Product 2
(2, 3),  -- Linking Back to School with Product 3
(3, 4),  -- Linking Holiday Discounts with Product 4
(4, 5);  -- Linking Winter Clearance with Product 5

CREATE TABLE promotion_views (
    promotion_view_id INT AUTO_INCREMENT PRIMARY KEY,
    promotion_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- Insert promotion views into the promotion_views table

INSERT INTO promotion_views (promotion_id, user_id)
VALUES
(1, 1),  -- User 1 viewed Summer Sale
(1, 2),  -- User 2 viewed Summer Sale
(2, 1),  -- User 1 viewed Back to School
(2, 3),  -- User 3 viewed Back to School
(3, 2);  -- User 2 viewed Holiday Discounts

CREATE TABLE promotion_clicks (
    promotion_click_id INT AUTO_INCREMENT PRIMARY KEY,
    promotion_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Insert promotion clicks into the promotion_clicks table

INSERT INTO promotion_clicks (promotion_id, user_id)
VALUES
(1, 1),  -- User 1 clicked on Summer Sale
(1, 2),  -- User 2 clicked on Summer Sale
(2, 1),  -- User 1 clicked on Back to School
(2, 3),  -- User 3 clicked on Back to School
(3, 2);  -- User 2 clicked on Holiday Discounts


CREATE TABLE promotion_budgets (
    budget_id INT AUTO_INCREMENT PRIMARY KEY,
    promotion_id INT,
    total_budget DECIMAL(10, 2) NOT NULL,  -- Example: Maximum budget for the promotion
    spent_amount DECIMAL(10, 2) DEFAULT 0,  -- Amount spent so far on the promotion
    FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id) ON DELETE CASCADE
);
-- Insert promotion budgets into the promotion_budgets table

INSERT INTO promotion_budgets (promotion_id, total_budget, spent_amount)
VALUES
(1, 1000.00, 250.00),  -- Budget for Summer Sale
(2, 500.00, 150.00),   -- Budget for Back to School
(3, 2000.00, 500.00),  -- Budget for Holiday Discounts
(4, 750.00, 100.00),   -- Budget for Winter Clearance
(5, 300.00, 50.00);     -- Budget for Spring Sale


CREATE TABLE promotion_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    promotion_id INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id) ON DELETE CASCADE
);
-- Insert promotion images into the promotion_images table

INSERT INTO promotion_images (promotion_id, image_url)
VALUES
(1, 'https://example.com/images/summer_sale.jpg'),  -- Image for Summer Sale
(1, 'https://example.com/images/summer_sale_2.jpg'),  -- Another Image for Summer Sale
(2, 'https://example.com/images/back_to_school.jpg'),  -- Image for Back to School
(3, 'https://example.com/images/holiday_discount.jpg'),  -- Image for Holiday Discounts
(4, 'https://example.com/images/winter_clearance.jpg');  -- Image for Winter Clearance


CREATE INDEX idx_promotion_merchant ON promotions(merchant_id);
CREATE INDEX idx_promotion_product ON promotion_products(promotion_id, product_id);
CREATE INDEX idx_promotion_view_user ON promotion_views(promotion_id, user_id);
CREATE INDEX idx_promotion_click_user ON promotion_clicks(promotion_id, user_id);