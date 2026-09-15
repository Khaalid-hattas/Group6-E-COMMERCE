-- ============================================================
-- ArtisanHub Database Schema
-- Normalized to Third Normal Form (3NF), MySQL 8+
--
-- Covers: Users & Authentication | Products & Creators
--         Orders & Payments | Custom Requests | Reviews
-- ============================================================

CREATE DATABASE IF NOT EXISTS artisanhub;
USE artisanhub;

-- ============================================================
-- 1. USERS
-- Shared authentication table for both customers and creators.
-- Role-specific data lives in customers / creators, not here,
-- so this table never has nullable role-specific columns (2NF/3NF).
-- ============================================================
CREATE TABLE users (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  full_name       VARCHAR(150) NOT NULL,
  email           VARCHAR(150) NOT NULL UNIQUE,
  password_hash   VARCHAR(255) NOT NULL,
  role            ENUM('customer', 'creator') NOT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. CATEGORIES
-- Shared by products and creators' primary craft category.
-- ============================================================
CREATE TABLE categories (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  name    VARCHAR(100) NOT NULL UNIQUE,
  slug    VARCHAR(100) NOT NULL UNIQUE
);

-- ============================================================
-- 3. CUSTOMERS
-- 1-to-1 extension of users where role = 'customer'.
-- ============================================================
CREATE TABLE customers (
  user_id   INT PRIMARY KEY,
  phone     VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 4. CREATORS
-- 1-to-1 extension of users where role = 'creator'.
-- ============================================================
CREATE TABLE creators (
  user_id               INT PRIMARY KEY,
  studio_name           VARCHAR(150) NOT NULL,
  bio                   TEXT,
  location              VARCHAR(150),
  primary_category_id   INT,
  avatar_url            VARCHAR(500),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (primary_category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ============================================================
-- 5. ADDRESSES
-- Normalized out of orders so a customer can have several,
-- and past orders keep a stable FK rather than copied text.
-- ============================================================
CREATE TABLE addresses (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  customer_id   INT NOT NULL,
  label         VARCHAR(50) DEFAULT 'Home',
  street        VARCHAR(255) NOT NULL,
  city          VARCHAR(100) NOT NULL,
  province      VARCHAR(100) NOT NULL,
  postal_code   VARCHAR(20) NOT NULL,
  country       VARCHAR(100) NOT NULL DEFAULT 'South Africa',
  is_default    BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (customer_id) REFERENCES customers(user_id) ON DELETE CASCADE
);

-- ============================================================
-- 6. PRODUCTS
-- ============================================================
CREATE TABLE products (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  creator_id       INT NOT NULL,
  category_id      INT NOT NULL,
  name             VARCHAR(200) NOT NULL,
  description      TEXT,
  price            DECIMAL(10,2) NOT NULL,
  stock_quantity   INT NOT NULL DEFAULT 0,
  status           ENUM('active', 'draft', 'out_of_stock') NOT NULL DEFAULT 'draft',
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES creators(user_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- ============================================================
-- 7. PRODUCT IMAGES
-- Normalized 1-to-many (a product can have several photos).
-- ============================================================
CREATE TABLE product_images (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  product_id    INT NOT NULL,
  image_url     VARCHAR(500) NOT NULL,
  sort_order    INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ============================================================
-- 8. CART ITEMS
-- One row per (customer, product) pair; quantity tracked here.
-- ============================================================
CREATE TABLE cart_items (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  customer_id   INT NOT NULL,
  product_id    INT NOT NULL,
  quantity      INT NOT NULL DEFAULT 1,
  added_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_cart_item (customer_id, product_id),
  FOREIGN KEY (customer_id) REFERENCES customers(user_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ============================================================
-- 9. ORDERS
-- ============================================================
CREATE TABLE orders (
  id                     INT AUTO_INCREMENT PRIMARY KEY,
  customer_id            INT NOT NULL,
  shipping_address_id    INT NOT NULL,
  status                 ENUM('pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled')
                         NOT NULL DEFAULT 'pending',
  subtotal               DECIMAL(10,2) NOT NULL,
  total                  DECIMAL(10,2) NOT NULL,
  placed_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(user_id) ON DELETE RESTRICT,
  FOREIGN KEY (shipping_address_id) REFERENCES addresses(id) ON DELETE RESTRICT
);

-- ============================================================
-- 10. ORDER ITEMS
-- unit_price is a SNAPSHOT of the product price at purchase time,
-- so later price/stock edits never rewrite historical orders.
-- ============================================================
CREATE TABLE order_items (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  order_id      INT NOT NULL,
  product_id    INT NOT NULL,
  quantity      INT NOT NULL,
  unit_price    DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- ============================================================
-- 11. PAYMENTS
-- 1-to-1 with orders. 'simulated' method supports the MVP
-- payment-simulation approach permitted in the project brief.
-- ============================================================
CREATE TABLE payments (
  id                       INT AUTO_INCREMENT PRIMARY KEY,
  order_id                 INT NOT NULL UNIQUE,
  method                   ENUM('card', 'eft', 'simulated') NOT NULL DEFAULT 'simulated',
  status                   ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
  amount                   DECIMAL(10,2) NOT NULL,
  transaction_reference    VARCHAR(100),
  paid_at                  TIMESTAMP NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- ============================================================
-- 12. CUSTOM REQUESTS
-- Implements: Customer submits request -> Creator reviews ->
-- Quote/response -> Customer accepts -> Payment -> Order
-- ============================================================
CREATE TABLE custom_requests (
  id                       INT AUTO_INCREMENT PRIMARY KEY,
  customer_id              INT NOT NULL,
  creator_id               INT NOT NULL,
  category_id              INT,
  title                    VARCHAR(200) NOT NULL,
  description              TEXT NOT NULL,
  budget                   DECIMAL(10,2),
  inspiration_image_url    VARCHAR(500),
  status                   ENUM('pending', 'quoted', 'accepted', 'declined', 'completed')
                          NOT NULL DEFAULT 'pending',
  created_at               TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(user_id) ON DELETE CASCADE,
  FOREIGN KEY (creator_id) REFERENCES creators(user_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ============================================================
-- 13. CUSTOM REQUEST QUOTES
-- Separate table (not columns on custom_requests) so a creator
-- can send a revised quote without losing the negotiation history.
-- ============================================================
CREATE TABLE custom_request_quotes (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  custom_request_id     INT NOT NULL,
  price                 DECIMAL(10,2) NOT NULL,
  estimated_days        INT,
  message               TEXT,
  created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (custom_request_id) REFERENCES custom_requests(id) ON DELETE CASCADE
);

-- ============================================================
-- 14. REVIEWS
-- Tied to a specific order_item so a review can be linked to a
-- verified purchase (nullable, in case that rule is relaxed later).
-- ============================================================
CREATE TABLE reviews (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  customer_id      INT NOT NULL,
  product_id       INT NOT NULL,
  order_item_id    INT,
  rating           TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment          TEXT,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_review_per_order_item (order_item_id),
  FOREIGN KEY (customer_id) REFERENCES customers(user_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE SET NULL
);

-- ============================================================
-- 15. CREATOR FOLLOWS
-- Supports customers following creators to track new listings.
-- ============================================================
CREATE TABLE creator_follows (
  customer_id   INT NOT NULL,
  creator_id    INT NOT NULL,
  followed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (customer_id, creator_id),
  FOREIGN KEY (customer_id) REFERENCES customers(user_id) ON DELETE CASCADE,
  FOREIGN KEY (creator_id) REFERENCES creators(user_id) ON DELETE CASCADE
);

-- ============================================================
-- INDEXES for common lookup patterns
-- ============================================================
CREATE INDEX idx_products_category      ON products(category_id);
CREATE INDEX idx_products_creator       ON products(creator_id);
CREATE INDEX idx_products_status        ON products(status);
CREATE INDEX idx_orders_customer        ON orders(customer_id);
CREATE INDEX idx_order_items_order      ON order_items(order_id);
CREATE INDEX idx_custom_requests_creator ON custom_requests(creator_id);
CREATE INDEX idx_custom_requests_customer ON custom_requests(customer_id);
CREATE INDEX idx_reviews_product        ON reviews(product_id);

-- ============================================================
-- SEED DATA: starter categories
-- (Artwork/Jewellery/etc. from the original brief, plus
--  Kitchenware and Recycled Crafts to match ArtisanHub's
--  "Handmade · Original · Sustainable" positioning)
-- ============================================================
INSERT INTO categories (name, slug) VALUES
  ('Artwork', 'artwork'),
  ('Jewellery', 'jewellery'),
  ('Ceramics', 'ceramics'),
  ('Kitchenware', 'kitchenware'),
  ('Home & Decor', 'home-decor'),
  ('Clothing', 'clothing'),
  ('Woodwork', 'woodwork'),
  ('Leather Goods', 'leather-goods'),
  ('Recycled Crafts', 'recycled-crafts'),
  ('Stationery', 'stationery');
  