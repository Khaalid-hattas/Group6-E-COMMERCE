-- ============================================================
-- ARTISANHUB DATABASE
-- ============================================================
-- ArtisanHub E-Commerce Database
--
-- Main areas:
-- Users & Authentication
-- Creators
-- Artwork
-- Handcraft
-- Handmade
-- Cart
-- Orders
-- Payments
-- Custom Requests
-- Reviews
-- Creator Follows
--
-- MySQL 8+
-- ============================================================


-- ============================================================
-- 1. CREATE DATABASE
-- ============================================================

DROP DATABASE IF EXISTS artisanhub;

CREATE DATABASE artisanhub;

USE artisanhub;


-- ============================================================
-- 2. USERS
-- ============================================================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    role ENUM('customer', 'creator') NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================================
-- 3. CATEGORIES
-- ============================================================

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    slug VARCHAR(100) NOT NULL UNIQUE
);


-- ============================================================
-- 4. CUSTOMERS
-- ============================================================

CREATE TABLE customers (
    user_id INT PRIMARY KEY,

    phone VARCHAR(20),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 5. CREATORS
-- ============================================================

CREATE TABLE creators (
    user_id INT PRIMARY KEY,

    studio_name VARCHAR(150) NOT NULL,

    bio TEXT,

    location VARCHAR(150),

    primary_category_id INT,

    avatar_url VARCHAR(500),

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (primary_category_id)
        REFERENCES categories(id)
        ON DELETE SET NULL
);


-- ============================================================
-- 6. ARTWORK
-- ============================================================

CREATE TABLE artwork (
    id INT AUTO_INCREMENT PRIMARY KEY,

    creator_id INT NOT NULL,

    category_id INT NOT NULL,

    name VARCHAR(200) NOT NULL,

    description TEXT,

    medium VARCHAR(150),

    style_category ENUM(
        'abstract',
        'photography',
        'sculpture'
    ) NOT NULL DEFAULT 'abstract',

    dimensions VARCHAR(100),

    edition VARCHAR(100),

    price DECIMAL(10,2) NOT NULL,

    stock_quantity INT NOT NULL DEFAULT 1,

    image_url VARCHAR(500),

    status ENUM(
        'active',
        'draft',
        'out_of_stock'
    ) NOT NULL DEFAULT 'draft',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (creator_id)
        REFERENCES creators(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);


-- ============================================================
-- 7. HANDCRAFT
-- ============================================================

CREATE TABLE handcraft (
    id INT AUTO_INCREMENT PRIMARY KEY,

    creator_id INT NOT NULL,

    category_id INT NOT NULL,

    name VARCHAR(200) NOT NULL,

    description TEXT,

    material VARCHAR(150),

    product_type VARCHAR(100),

    price DECIMAL(10,2) NOT NULL,

    stock_quantity INT NOT NULL DEFAULT 1,

    image_url VARCHAR(500),

    status ENUM(
        'active',
        'draft',
        'out_of_stock'
    ) NOT NULL DEFAULT 'draft',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (creator_id)
        REFERENCES creators(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);


-- ============================================================
-- 8. HANDMADE
-- ============================================================

CREATE TABLE handmade (
    id INT AUTO_INCREMENT PRIMARY KEY,

    creator_id INT NOT NULL,

    category_id INT NOT NULL,

    name VARCHAR(200) NOT NULL,

    description TEXT,

    material VARCHAR(150),

    product_type VARCHAR(100),

    price DECIMAL(10,2) NOT NULL,

    stock_quantity INT NOT NULL DEFAULT 1,

    image_url VARCHAR(500),

    status ENUM(
        'active',
        'draft',
        'out_of_stock'
    ) NOT NULL DEFAULT 'draft',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (creator_id)
        REFERENCES creators(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);


-- ============================================================
-- 9. ADDRESSES
-- ============================================================

CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT NOT NULL,

    label VARCHAR(50) DEFAULT 'Home',

    street VARCHAR(255) NOT NULL,

    city VARCHAR(100) NOT NULL,

    province VARCHAR(100) NOT NULL,

    postal_code VARCHAR(20) NOT NULL,

    country VARCHAR(100) NOT NULL DEFAULT 'South Africa',

    is_default BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (customer_id)
        REFERENCES customers(user_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 10. CART
-- ============================================================
-- Because we have three item tables, the cart stores the
-- item type and item ID.
-- ============================================================

CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT NOT NULL,

    item_type ENUM(
        'artwork',
        'handcraft',
        'handmade'
    ) NOT NULL,

    item_id INT NOT NULL,

    quantity INT NOT NULL DEFAULT 1,

    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES customers(user_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 11. ORDERS
-- ============================================================

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT NOT NULL,

    shipping_address_id INT NOT NULL,

    status ENUM(
        'pending',
        'paid',
        'processing',
        'shipped',
        'completed',
        'cancelled'
    ) NOT NULL DEFAULT 'pending',

    subtotal DECIMAL(10,2) NOT NULL,

    total DECIMAL(10,2) NOT NULL,

    placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES customers(user_id)
        ON DELETE RESTRICT,

    FOREIGN KEY (shipping_address_id)
        REFERENCES addresses(id)
        ON DELETE RESTRICT
);


-- ============================================================
-- 12. ORDER ITEMS
-- ============================================================
-- item_type tells us whether the customer bought:
-- artwork, handcraft or handmade.
-- ============================================================

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL,

    item_type ENUM(
        'artwork',
        'handcraft',
        'handmade'
    ) NOT NULL,

    item_id INT NOT NULL,

    quantity INT NOT NULL,

    unit_price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 13. PAYMENTS
-- ============================================================

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL UNIQUE,

    method ENUM(
        'card',
        'eft',
        'simulated'
    ) NOT NULL DEFAULT 'simulated',

    status ENUM(
        'pending',
        'completed',
        'failed'
    ) NOT NULL DEFAULT 'pending',

    amount DECIMAL(10,2) NOT NULL,

    transaction_reference VARCHAR(100),

    paid_at TIMESTAMP NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 14. CUSTOM REQUESTS
-- ============================================================

CREATE TABLE custom_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT NOT NULL,

    creator_id INT NOT NULL,

    category_id INT,

    title VARCHAR(200) NOT NULL,

    description TEXT NOT NULL,

    budget DECIMAL(10,2),

    inspiration_image_url VARCHAR(500),

    status ENUM(
        'pending',
        'quoted',
        'accepted',
        'declined',
        'completed'
    ) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES customers(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (creator_id)
        REFERENCES creators(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE SET NULL
);


-- ============================================================
-- 15. CUSTOM REQUEST QUOTES
-- ============================================================

CREATE TABLE custom_request_quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,

    custom_request_id INT NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    estimated_days INT,

    message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (custom_request_id)
        REFERENCES custom_requests(id)
        ON DELETE CASCADE
);


-- ============================================================
-- 16. REVIEWS
-- ============================================================
-- Reviews can belong to artwork, handcraft or handmade.
-- ============================================================

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT NOT NULL,

    item_type ENUM(
        'artwork',
        'handcraft',
        'handmade'
    ) NOT NULL,

    item_id INT NOT NULL,

    rating TINYINT NOT NULL,

    comment TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (rating BETWEEN 1 AND 5),

    FOREIGN KEY (customer_id)
        REFERENCES customers(user_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 17. CREATOR FOLLOWS
-- ============================================================

CREATE TABLE creator_follows (
    customer_id INT NOT NULL,

    creator_id INT NOT NULL,

    followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (customer_id, creator_id),

    FOREIGN KEY (customer_id)
        REFERENCES customers(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (creator_id)
        REFERENCES creators(user_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 18. CATEGORY DATA
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


-- ============================================================
-- 19. INDEXES
-- ============================================================

CREATE INDEX idx_artwork_creator
ON artwork(creator_id);

CREATE INDEX idx_artwork_category
ON artwork(category_id);

CREATE INDEX idx_artwork_status
ON artwork(status);


CREATE INDEX idx_handcraft_creator
ON handcraft(creator_id);

CREATE INDEX idx_handcraft_category
ON handcraft(category_id);

CREATE INDEX idx_handcraft_status
ON handcraft(status);


CREATE INDEX idx_handmade_creator
ON handmade(creator_id);

CREATE INDEX idx_handmade_category
ON handmade(category_id);

CREATE INDEX idx_handmade_status
ON handmade(status);


CREATE INDEX idx_orders_customer
ON orders(customer_id);


CREATE INDEX idx_order_items_order
ON order_items(order_id);


CREATE INDEX idx_custom_requests_creator
ON custom_requests(creator_id);


CREATE INDEX idx_custom_requests_customer
ON custom_requests(customer_id);


CREATE INDEX idx_reviews_item
ON reviews(item_type, item_id);


-- ============================================================
-- DONE
-- ============================================================

SELECT 'ArtisanHub database created successfully!' AS message;

USE artisanhub;

SHOW TABLES;

USE artisanhub;

-- ============================================================
-- CREATOR USERS
-- ============================================================

INSERT INTO users (full_name, email, password_hash, role) VALUES
('Zizipho Poswa', 'zizipho.poswa@artisanhub.com', 'demo_password', 'creator'),
('Beauty Ngxongo', 'beauty.ngxongo@artisanhub.com', 'demo_password', 'creator'),
('Design Afrika Weavers', 'design.afrika@artisanhub.com', 'demo_password', 'creator'),
('Carrol Boyes Studio', 'carrol.boyes@artisanhub.com', 'demo_password', 'creator'),
('Umtha Craftswomen', 'umtha.craftswomen@artisanhub.com', 'demo_password', 'creator'),
('Imbali Woodcraft Collective', 'imbali.woodcraft@artisanhub.com', 'demo_password', 'creator'),
('Rialheim Studio', 'rialheim.studio@artisanhub.com', 'demo_password', 'creator'),
('Ditiro Mashigo', 'ditiro.mashigo@artisanhub.com', 'demo_password', 'creator'),
('Nandi Mokoena', 'nandi.mokoena@artisanhub.com', 'demo_password', 'creator'),
('Thandiwe Khumalo', 'thandiwe.khumalo@artisanhub.com', 'demo_password', 'creator'),
('Sipho Mthembu', 'sipho.mthembu@artisanhub.com', 'demo_password', 'creator'),
('Zinhle Maseko', 'zinhle.maseko@artisanhub.com', 'demo_password', 'creator'),
('Naledi Ndlovu', 'naledi.ndlovu@artisanhub.com', 'demo_password', 'creator'),
('Ayanda Maseko', 'ayanda.maseko@artisanhub.com', 'demo_password', 'creator'),
('Lethabo Dlamini', 'lethabo.dlamini@artisanhub.com', 'demo_password', 'creator'),
('Bontle Radebe', 'bontle.radebe@artisanhub.com', 'demo_password', 'creator'),
('Nesta Nala', 'nesta.nala@artisanhub.com', 'demo_password', 'creator'),
('Luvo Khwela', 'luvo.khwela@artisanhub.com', 'demo_password', 'creator');


-- ============================================================
-- CREATOR PROFILES
-- ============================================================

INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Zizipho Poswa',
    'Ceramic sculptor creating expressive contemporary African works.',
    'Cape Town, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'ceramics'
WHERE u.email = 'zizipho.poswa@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Beauty Ngxongo',
    'Traditional basket weaver preserving indigenous weaving techniques.',
    'KwaZulu-Natal, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'recycled-crafts'
WHERE u.email = 'beauty.ngxongo@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Design Afrika Weavers',
    'Basketry collective creating contemporary woven pieces.',
    'Cape Town, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'recycled-crafts'
WHERE u.email = 'design.afrika@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Carrol Boyes Studio',
    'South African studio known for sculptural functional design.',
    'Cape Town, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'home-decor'
WHERE u.email = 'carrol.boyes@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Umtha Craftswomen',
    'Craft collective producing handmade South African pieces.',
    'Cape Town, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'recycled-crafts'
WHERE u.email = 'umtha.craftswomen@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Imbali Woodcraft Collective',
    'Woodworkers creating handcrafted pieces from indigenous materials.',
    'Mpumalanga, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'woodwork'
WHERE u.email = 'imbali.woodcraft@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Rialheim Studio',
    'Ceramic studio creating playful handmade South African designs.',
    'Robertson, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'ceramics'
WHERE u.email = 'rialheim.studio@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Ditiro Mashigo',
    'Textile artist working with leather and printed fabrics.',
    'Johannesburg, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'leather-goods'
WHERE u.email = 'ditiro.mashigo@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Nandi Mokoena',
    'Beadwork artist creating contemporary jewellery.',
    'Johannesburg, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'jewellery'
WHERE u.email = 'nandi.mokoena@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Thandiwe Khumalo',
    'Textile jewellery artist using recycled and hand-dyed materials.',
    'Soweto, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'jewellery'
WHERE u.email = 'thandiwe.khumalo@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Sipho Mthembu',
    'Woodworker creating hand-carved functional pieces.',
    'Durban, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'woodwork'
WHERE u.email = 'sipho.mthembu@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Zinhle Maseko',
    'Beadwork artist creating handmade jewellery.',
    'Cape Town, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'jewellery'
WHERE u.email = 'zinhle.maseko@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Naledi Ndlovu',
    'Ceramicist creating handmade terracotta pieces.',
    'Mabopane, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'ceramics'
WHERE u.email = 'naledi.ndlovu@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Ayanda Maseko',
    'Fibre artist creating woven pieces from natural materials.',
    'Gqeberha, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'recycled-crafts'
WHERE u.email = 'ayanda.maseko@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Lethabo Dlamini',
    'Woodcarver creating handcrafted storytelling sculptures.',
    'Pretoria, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'woodwork'
WHERE u.email = 'lethabo.dlamini@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Bontle Radebe',
    'Botanical artist creating natural pressed artwork.',
    'Bloemfontein, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'artwork'
WHERE u.email = 'bontle.radebe@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Nesta Nala',
    'Ceramic artist creating hand-turned vessels and functional pottery.',
    'KwaZulu-Natal, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'ceramics'
WHERE u.email = 'nesta.nala@artisanhub.com';


INSERT INTO creators (
    user_id,
    studio_name,
    bio,
    location,
    primary_category_id,
    avatar_url
)

SELECT
    u.id,
    'Luvo Khwela',
    'Painter creating contemporary original artworks.',
    'Cape Town, ZA',
    c.id,
    NULL
FROM users u
JOIN categories c ON c.slug = 'artwork'
WHERE u.email = 'luvo.khwela@artisanhub.com';


-- ============================================================
-- CHECK THE CREATORS
-- ============================================================

SELECT
    c.user_id,
    u.full_name,
    c.studio_name,
    c.location,
    c.bio
FROM creators c
JOIN users u ON c.user_id = u.id
ORDER BY c.user_id;

USE artisanhub;

INSERT INTO artwork
(creator_id, category_id, name, description, medium, style_category, dimensions, edition, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Flux Study No. 4',
    'Abstract artwork by Luvo Khwela.',
    'Oil on linen',
    'abstract',
    '90 x 120 cm',
    'Original',
    6000.00,
    1,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Artwork'
WHERE c.studio_name = 'Luvo Khwela';


INSERT INTO artwork
(creator_id, category_id, name, description, medium, style_category, dimensions, edition, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Terrain I',
    'Abstract artwork exploring texture and landscape.',
    'Acrylic and sand on board',
    'abstract',
    '60 x 80 cm',
    '1 of 1',
    6799.00,
    1,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Artwork'
WHERE c.studio_name = 'Luvo Khwela';


INSERT INTO artwork
(creator_id, category_id, name, description, medium, style_category, dimensions, edition, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Solvent & Grace',
    'Original abstract artwork by Luvo Khwela.',
    'Encaustic wax on panel',
    'abstract',
    '50 x 70 cm',
    'Original',
    3350.00,
    1,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Artwork'
WHERE c.studio_name = 'Luvo Khwela';


INSERT INTO artwork
(creator_id, category_id, name, description, medium, style_category, dimensions, edition, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Primary Field II',
    'Original abstract artwork by Luvo Khwela.',
    'Acrylic on canvas',
    'abstract',
    '100 x 100 cm',
    'Original',
    2999.00,
    1,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Artwork'
WHERE c.studio_name = 'Luvo Khwela';


INSERT INTO artwork
(creator_id, category_id, name, description, medium, style_category, dimensions, edition, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Form Without Function',
    'Limited edition photographic artwork.',
    'Archival inkjet print',
    'photography',
    '50 x 70 cm',
    'Edition of 20',
    1750.00,
    1,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Artwork'
WHERE c.studio_name = 'Luvo Khwela';


INSERT INTO artwork
(creator_id, category_id, name, description, medium, style_category, dimensions, edition, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Still Interior',
    'Limited edition photographic artwork.',
    'C-print, museum glass',
    'photography',
    '60 x 80 cm',
    'Edition of 10',
    2499.00,
    1,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Artwork'
WHERE c.studio_name = 'Luvo Khwela';


INSERT INTO artwork
(creator_id, category_id, name, description, medium, style_category, dimensions, edition, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Botanical Series III',
    'Limited edition photographic series consisting of three prints.',
    'Pigment prints',
    'photography',
    'Set of 3, 40 x 60 cm',
    'Edition of 15',
    8999.00,
    1,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Artwork'
WHERE c.studio_name = 'Luvo Khwela';


INSERT INTO artwork
(creator_id, category_id, name, description, medium, style_category, dimensions, edition, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Burden Study',
    'Limited edition sculpture by Luvo Khwela.',
    'Cast bronze',
    'sculpture',
    '22 x 14 x 10 cm',
    'Edition of 8',
    2500.00,
    1,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Artwork'
WHERE c.studio_name = 'Luvo Khwela';

UPDATE artwork
SET style_category = CASE name
    WHEN 'Flux Study No. 4' THEN 'abstract'
    WHEN 'Terrain I' THEN 'abstract'
    WHEN 'Solvent & Grace' THEN 'abstract'
    WHEN 'Primary Field II' THEN 'abstract'
    WHEN 'Form Without Function' THEN 'photography'
    WHEN 'Still Interior' THEN 'photography'
    WHEN 'Botanical Series III' THEN 'photography'
    WHEN 'Burden Study' THEN 'sculpture'
END
WHERE name IN (
    'Flux Study No. 4',
    'Terrain I',
    'Solvent & Grace',
    'Primary Field II',
    'Form Without Function',
    'Still Interior',
    'Botanical Series III',
    'Burden Study'
);

UPDATE artwork SET image_url = CASE name
    WHEN 'Flux Study No. 4' THEN '/images/Artwork/abstractimages.jpeg'
    WHEN 'Terrain I' THEN '/images/Artwork/aspire.jpeg'
    WHEN 'Solvent & Grace' THEN '/images/Artwork/banana.jpeg'
    WHEN 'Primary Field II' THEN '/images/Artwork/birthmom.jpeg'
    WHEN 'Form Without Function' THEN '/images/Artwork/construction.jpeg'
    WHEN 'Still Interior' THEN '/images/Artwork/empowering.jpeg'
    WHEN 'Botanical Series III' THEN '/images/Artwork/gogo.jpeg'
    WHEN 'Burden Study' THEN '/images/Artwork/women.jpeg'
END
WHERE name IN (
    'Flux Study No. 4', 'Terrain I', 'Solvent & Grace', 'Primary Field II',
    'Form Without Function', 'Still Interior', 'Botanical Series III', 'Burden Study'
);

USE artisanhub;

-- 1. Hand-turned African Vessel Set
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Hand-turned African Vessel Set',
    'Hand-turned clay three-piece vessel set.',
    'Hand-turned clay',
    'Vessel Set',
    148.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Kitchenware'
WHERE c.studio_name = 'Nesta Nala';


-- 2. Handwoven Basket Set
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Handwoven Basket Set',
    'Indigenous fibre three-piece basket set.',
    'Indigenous fibre',
    'Basket Set',
    420.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Recycled Crafts'
WHERE c.studio_name = 'Beauty Ngxongo';


-- 3. Wood & Woven Coaster Set
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Wood & Woven Coaster Set',
    'Six-piece coaster set combining wood and woven fibre.',
    'Wood and woven fibre',
    'Coaster Set',
    950.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Kitchenware'
WHERE c.studio_name = 'Design Afrika Weavers';


-- 4. Handcrafted Wooden Desk Organiser
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Handcrafted Wooden Desk Organiser',
    'Solid wood organiser for a phone, watch and keys.',
    'Solid wood',
    'Desk Organiser',
    1350.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Kitchenware'
WHERE c.studio_name = 'Carrol Boyes Studio';


-- 5. African Market Tableware Collection
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'African Market Tableware Collection',
    'Mixed hand-painted ceramic tableware collection.',
    'Hand-painted ceramic',
    'Tableware Collection',
    1200.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Kitchenware'
WHERE c.studio_name = 'Umtha Craftswomen';


-- 6. Colourful Storyteller Serving Dish
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Colourful Storyteller Serving Dish',
    'Hand-painted glazed ceramic serving dish.',
    'Glazed ceramic',
    'Serving Dish',
    425.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Kitchenware'
WHERE c.studio_name = 'Zizipho Poswa';


-- 7. Carved Wooden Tumbler Set
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Carved Wooden Tumbler Set',
    'Six-piece set of hand-carved wooden tumblers.',
    'Carved wood',
    'Tumbler Set',
    396.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Kitchenware'
WHERE c.studio_name = 'Imbali Woodcraft Collective';


-- 8. Heart-shaped Succulent Planters
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Heart-shaped Succulent Planters',
    'Nine-piece set of handmade clay succulent planters.',
    'Handmade clay',
    'Succulent Planters',
    899.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Recycled Crafts'
WHERE c.studio_name = 'Rialheim Studio';


-- 9. Leather & Wax-print Pouch
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Leather & Wax-print Pouch',
    'Handmade zip pouch combining leather and printed textile.',
    'Leather and printed textile',
    'Pouch',
    420.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Recycled Crafts'
WHERE c.studio_name = 'Ditiro Mashigo';


-- 10. South African Beaded Mug
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'South African Beaded Mug',
    'Single handmade mug decorated with glass beads.',
    'Glass beads and ceramic',
    'Beaded Mug',
    175.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Kitchenware'
WHERE c.studio_name = 'Umtha Craftswomen';


-- 11. Beaded Market Craft Display
INSERT INTO handcraft
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Beaded Market Craft Display',
    'Hand-assembled decorative market craft display.',
    'Glass beads and wire',
    'Market Craft Display',
    1750.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Recycled Crafts'
WHERE c.studio_name = 'Umtha Craftswomen';

USE artisanhub;

SELECT id, name, price
FROM artwork
ORDER BY id;

SELECT *
FROM artwork
WHERE id = 9;

USE artisanhub;

-- 1. Beaded Heritage Necklace
INSERT INTO handmade
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Beaded Heritage Necklace',
    'A handmade heritage necklace featuring carefully hand-strung glass beads.',
    'Glass beads, hand-strung',
    'Necklace',
    399.99,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Jewellery'
WHERE c.studio_name = 'Nandi Mokoena';


-- 2. Woven Fabric Statement Necklace
INSERT INTO handmade
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Woven Fabric Statement Necklace',
    'A colourful statement necklace made from hand-dyed fabric and recycled beads.',
    'Hand-dyed fabric, recycled beads',
    'Necklace',
    86.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Jewellery'
WHERE c.studio_name = 'Thandiwe Khumalo';


-- 3. Carved Wooden Cup
INSERT INTO handmade
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Carved Wooden Cup',
    'A hand-carved cup made from indigenous wood.',
    'Indigenous wood, hand-carved',
    'Cup',
    94.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Woodwork'
WHERE c.studio_name = 'Sipho Mthembu';


-- 4. Beaded Drop Earrings
INSERT INTO handmade
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Beaded Drop Earrings',
    'Handmade drop earrings featuring glass beads and brass findings.',
    'Glass beads, brass findings',
    'Earrings',
    72.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Jewellery'
WHERE c.studio_name = 'Zinhle Maseko';


-- 5. Hand-thrown Terracotta Vase
INSERT INTO handmade
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Hand-thrown Terracotta Vase',
    'A handmade terracotta vase created using a pottery wheel.',
    'Terracotta clay, wheel-thrown',
    'Vase',
    115.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Ceramics'
WHERE c.studio_name = 'Naledi Ndlovu';


-- 6. Jute Rope Woven Vase
INSERT INTO handmade
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Jute Rope Woven Vase',
    'A decorative woven vase made using jute rope and recycled fibre.',
    'Jute rope, recycled fibre',
    'Vase',
    162.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Home & Decor'
WHERE c.studio_name = 'Ayanda Maseko';


-- 7. Hand-carved Story Sculpture
INSERT INTO handmade
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Hand-carved Story Sculpture',
    'A hand-carved wooden sculpture finished by hand.',
    'Carved wood, hand-finished',
    'Sculpture',
    94.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Woodwork'
WHERE c.studio_name = 'Lethabo Dlamini';


-- 8. Botanical Pressed Wall Art
INSERT INTO handmade
(creator_id, category_id, name, description, material, product_type, price, stock_quantity, status)
SELECT
    c.user_id,
    cat.id,
    'Botanical Pressed Wall Art',
    'Natural wall art created from pressed botanicals on natural paper.',
    'Pressed botanicals, natural paper',
    'Wall Art',
    78.00,
    5,
    'active'
FROM creators c
JOIN categories cat ON cat.name = 'Home & Decor'
WHERE c.studio_name = 'Bontle Radebe';

UPDATE creators SET avatar_url = CASE studio_name
    WHEN 'Zizipho Poswa' THEN '/images/Handcrafted/kitchenset.jpg'
    WHEN 'Beauty Ngxongo' THEN '/images/Handcrafted/basket.jpg'
    WHEN 'Design Afrika Weavers' THEN '/images/Handcrafted/costerset.jpg'
    WHEN 'Carrol Boyes Studio' THEN '/images/Handcrafted/Essential-holder.jpg'
    WHEN 'Umtha Craftswomen' THEN '/images/Handmade/beadwork-necklace.jpg'
    WHEN 'Imbali Woodcraft Collective' THEN '/images/Handcrafted/mugset.jpg'
    WHEN 'Rialheim Studio' THEN '/images/Handcrafted/potplants.jpg'
    WHEN 'Ditiro Mashigo' THEN '/images/Handcrafted/purse.jpg'
    WHEN 'Nandi Mokoena' THEN '/images/Handmade/beadwork-necklace.jpg'
    WHEN 'Thandiwe Khumalo' THEN '/images/Handmade/handmadefabric-necklace.jpg'
    WHEN 'Sipho Mthembu' THEN '/images/Handmade/wooden-cup.jpg'
    WHEN 'Zinhle Maseko' THEN '/images/Handmade/earrings.jpg'
    WHEN 'Naledi Ndlovu' THEN '/images/Handmade/vase.jpg'
    WHEN 'Ayanda Maseko' THEN '/images/Handmade/juterope-wovenvase.jpg'
    WHEN 'Lethabo Dlamini' THEN '/images/Handmade/sculptures.jpg'
    WHEN 'Bontle Radebe' THEN '/images/Handmade/botanical-wall-art.webp'
    WHEN 'Nesta Nala' THEN '/images/Handcrafted/antique-set.jpg'
    WHEN 'Luvo Khwela' THEN '/images/Artwork/abstractimages.jpeg'
END;

UPDATE handcraft SET image_url = CASE name
    WHEN 'Hand-turned African Vessel Set' THEN '/images/Handcrafted/antique-set.jpg'
    WHEN 'Handwoven Basket Set' THEN '/images/Handcrafted/basket.jpg'
    WHEN 'Wood & Woven Coaster Set' THEN '/images/Handcrafted/costerset.jpg'
    WHEN 'Handcrafted Wooden Desk Organiser' THEN '/images/Handcrafted/Essential-holder.jpg'
    WHEN 'African Market Tableware Collection' THEN '/images/Handcrafted/Gemini_Generated_Image_nvg711nvg711nvg7.jpg'
    WHEN 'Colourful Storyteller Serving Dish' THEN '/images/Handcrafted/handcrafted-dish.webp'
    WHEN 'Carved Wooden Tumbler Set' THEN '/images/Handcrafted/mugset.jpg'
    WHEN 'Heart-shaped Succulent Planters' THEN '/images/Handcrafted/potplants.jpg'
    WHEN 'Leather & Wax-print Pouch' THEN '/images/Handcrafted/purse.jpg'
    WHEN 'South African Beaded Mug' THEN '/images/Handcrafted/SA-rank.jpg'
    WHEN 'Beaded Market Craft Display' THEN '/images/Handcrafted/Gemini_Generated_Image_nvg711nvg711nvg7.jpg'
END
WHERE name IN (
    'Hand-turned African Vessel Set', 'Handwoven Basket Set', 'Wood & Woven Coaster Set',
    'Handcrafted Wooden Desk Organiser', 'African Market Tableware Collection',
    'Colourful Storyteller Serving Dish', 'Carved Wooden Tumbler Set',
    'Heart-shaped Succulent Planters', 'Leather & Wax-print Pouch',
    'South African Beaded Mug', 'Beaded Market Craft Display'
);

UPDATE handmade SET image_url = CASE name
    WHEN 'Beaded Heritage Necklace' THEN '/images/Handmade/beadwork-necklace.jpg'
    WHEN 'Woven Fabric Statement Necklace' THEN '/images/Handmade/handmadefabric-necklace.jpg'
    WHEN 'Carved Wooden Cup' THEN '/images/Handmade/wooden-cup.jpg'
    WHEN 'Beaded Drop Earrings' THEN '/images/Handmade/earrings.jpg'
    WHEN 'Hand-thrown Terracotta Vase' THEN '/images/Handmade/vase.jpg'
    WHEN 'Jute Rope Woven Vase' THEN '/images/Handmade/juterope-wovenvase.jpg'
    WHEN 'Hand-carved Story Sculpture' THEN '/images/Handmade/sculptures.jpg'
    WHEN 'Botanical Pressed Wall Art' THEN '/images/Handmade/botanical-wall-art.webp'
END
WHERE name IN (
    'Beaded Heritage Necklace', 'Woven Fabric Statement Necklace', 'Carved Wooden Cup',
    'Beaded Drop Earrings', 'Hand-thrown Terracotta Vase', 'Jute Rope Woven Vase',
    'Hand-carved Story Sculpture', 'Botanical Pressed Wall Art'
);