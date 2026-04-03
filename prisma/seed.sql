-- Clear existing data
DELETE FROM "ProductSpec";
DELETE FROM "ProductVariant";
DELETE FROM "ProductImage";
DELETE FROM "Product";
DELETE FROM "Category";
DELETE FROM "BlogPost";
DELETE FROM "Testimonial";

-- Insert Categories matching deruizebike.com
INSERT INTO "Category" ("id", "name", "slug", "description", "order", "createdAt", "updatedAt") VALUES
  (gen_random_uuid(), 'Select', 'select', 'The Select series is far more than just Deruiz''s premium product line. We''ve rethought every single component from the ground up.', 1, now(), now()),
  (gen_random_uuid(), 'Urban', 'urban', 'Perfect for daily city commuting. Ride in style with comfort and efficiency.', 2, now(), now()),
  (gen_random_uuid(), 'City', 'city', 'Elegant everyday riding through urban streets. Clean design meets practical performance.', 3, now(), now()),
  (gen_random_uuid(), 'Trekking', 'trekking', 'Long-distance comfort and stability for your adventures on any road.', 4, now(), now()),
  (gen_random_uuid(), 'SUV', 'suv', 'Higher seating position with extra stability for confident riding.', 5, now(), now()),
  (gen_random_uuid(), 'MTB', 'mtb', 'Built for the trail. Conquer any terrain with confidence and control.', 6, now(), now()),
  (gen_random_uuid(), 'Gravel', 'gravel', 'Explore beyond the paved roads. Ready for any adventure.', 7, now(), now()),
  (gen_random_uuid(), 'Folding', 'folding', 'Compact and portable. Easy to store and perfect for city living.', 8, now(), now());

-- Get category IDs
WITH category_ids AS (
  SELECT "id", "slug" FROM "Category"
)
-- Insert Products
INSERT INTO "Product" (
  "id", "name", "slug", "tagline", "description", "price", "salePrice", "featured", "bestseller", "published", "categoryId", "createdAt", "updatedAt"
) VALUES
(
  gen_random_uuid(),
  'Mica Pro 2026',
  'mica-pro',
  'Make every route your favorite route',
  'The Mica Pro is our premium urban e-bike, designed for daily commuting with style and performance. Clean aesthetics meet cutting-edge technology.',
  2799.00,
  NULL,
  true,
  true,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'urban'),
  now(),
  now()
),
(
  gen_random_uuid(),
  'Dolomit 2026',
  'dolomit',
  'Alpine-born. Ready for adventure.',
  'Built for mountain adventures, the Dolomit combines robust construction with modern e-bike technology. Conquer any terrain with confidence.',
  2399.00,
  NULL,
  true,
  true,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'mtb'),
  now(),
  now()
),
(
  gen_random_uuid(),
  'Peridot 2026',
  'peridot',
  'Compact folding urban e-bike',
  'Perfect for the city. Folds quickly for easy storage and transport.',
  1649.00,
  1699.00,
  false,
  false,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'folding'),
  now(),
  now()
),
(
  gen_random_uuid(),
  'Quartz SUV 2026',
  'quartz-suv',
  'Higher riding position for urban adventures',
  'SUV styling with comfortable upright riding position. Perfect for confident city cruising.',
  1599.00,
  1699.00,
  false,
  false,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'suv'),
  now(),
  now()
),
(
  gen_random_uuid(),
  'Marble SUV',
  'marble-suv',
  'Timeless style for modern riding',
  'Classic marble finish with modern SUV geometry. A perfect blend of style and comfort.',
  1699.00,
  NULL,
  false,
  false,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'suv'),
  now(),
  now()
),
(
  gen_random_uuid(),
  'Mica – G',
  'mica-g',
  'Go further with Mica',
  'The trekking-ready version of our popular Mica platform. Comfort for long days in the saddle.',
  1949.00,
  NULL,
  false,
  false,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'trekking'),
  now(),
  now()
),
(
  gen_random_uuid(),
  'Quartz 2026',
  'quartz',
  'Entry-level city riding',
  'Quality e-bike performance at an accessible price. Perfect for everyday city riding.',
  1399.00,
  NULL,
  false,
  false,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'city'),
  now(),
  now()
),
(
  gen_random_uuid(),
  'Quartz M 2026',
  'quartz-m',
  'Compact city performance',
  'Shorter frame for smaller riders. Same great performance in a compact package.',
  1299.00,
  NULL,
  false,
  false,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'city'),
  now(),
  now()
),
(
  gen_random_uuid(),
  'Santa Maria E-Road',
  'santa-maria-e-road',
  'Go fast. Go far.',
  'Lightweight performance for road and gravel riding. Premium build quality for serious riders.',
  2999.00,
  NULL,
  false,
  false,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'gravel'),
  now(),
  now()
),
(
  gen_random_uuid(),
  'Santa Maria E-Gravel',
  'santa-maria-e-gravel',
  'Explore any terrain',
  'Versatile gravel machine ready for your next adventure. Durable, lightweight, and ready to go.',
  3499.00,
  NULL,
  false,
  false,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'gravel'),
  now(),
  now()
),
(
  gen_random_uuid(),
  'Lapis',
  'lapis',
  'The original folding frame',
  'Our classic folding e-bike. Perfect for city living, easy to store and carry.',
  1999.00,
  NULL,
  true,
  false,
  true,
  (SELECT "id" FROM category_ids WHERE slug = 'folding'),
  now(),
  now()
);

-- Insert Product Images
WITH product_ids AS (
  SELECT "id", "slug" FROM "Product"
)
INSERT INTO "ProductImage" ("id", "url", "alt", "order", "productId", "createdAt", "updatedAt") VALUES
(
  gen_random_uuid(),
  '/images/products/mica-pro-2026-1200x800.webp',
  'Mica Pro 2026',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-pro'),
  now(),
  now()
),
(
  gen_random_uuid(),
  '/images/products/dbzt-1DOLOMIT-1500-1000-M-L.webp',
  'Dolomit 2026',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'dolomit'),
  now(),
  now()
),
(
  gen_random_uuid(),
  '/images/products/peridot.white-1-1-1-1200x800.webp',
  'Peridot 2026',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'peridot'),
  now(),
  now()
),
(
  gen_random_uuid(),
  '/images/products/quartz-suv-9-1200x800.webp',
  'Quartz SUV 2026',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'quartz-suv'),
  now(),
  now()
),
(
  gen_random_uuid(),
  '/images/products/marble-suv-2-3.png',
  'Marble SUV',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'marble-suv'),
  now(),
  now()
),
(
  gen_random_uuid(),
  '/images/products/mica-g-1-1200x800.webp',
  'Mica – G',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-g'),
  now(),
  now()
),
(
  gen_random_uuid(),
  '/images/products/quartz-2026-1200x800.webp',
  'Quartz 2026',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'quartz'),
  now(),
  now()
),
(
  gen_random_uuid(),
  '/images/products/quartz-m-2026-1200x800.webp',
  'Quartz M 2026',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'quartz-m'),
  now(),
  now()
),
(
  gen_random_uuid(),
  '/images/products/santa-maria-e-road-1200x800.webp',
  'Santa Maria E-Road',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'santa-maria-e-road'),
  now(),
  now()
),
(
  gen_random_uuid(),
  '/images/products/santa-maria-e-gravel-1200x800.webp',
  'Santa Maria E-Gravel',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'santa-maria-e-gravel'),
  now(),
  now()
),
(
  gen_random_uuid(),
  '/images/products/1500-917-lapis.webp',
  'Lapis',
  0,
  (SELECT "id" FROM product_ids WHERE slug = 'lapis'),
  now(),
  now()
);

-- Insert Product Specs
WITH product_ids AS (
  SELECT "id", "slug" FROM "Product"
)
INSERT INTO "ProductSpec" ("id", "group", "label", "value", "order", "productId", "createdAt", "updatedAt") VALUES
(
  gen_random_uuid(), 'Motor', 'Power', '250W', 1,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-pro'), now(), now()
),
(
  gen_random_uuid(), 'Motor', 'Torque', '45Nm', 2,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-pro'), now(), now()
),
(
  gen_random_uuid(), 'Battery', 'Capacity', '625Wh', 3,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-pro'), now(), now()
),
(
  gen_random_uuid(), 'Battery', 'Range', '50-100km', 4,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-pro'), now(), now()
),
(
  gen_random_uuid(), 'Frame', 'Material', 'Aluminum', 5,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-pro'), now(), now()
),
(
  gen_random_uuid(), 'Weight', 'Total', '15.8kg', 6,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-pro'), now(), now()
),

(
  gen_random_uuid(), 'Motor', 'Power', '500W', 1,
  (SELECT "id" FROM product_ids WHERE slug = 'dolomit'), now(), now()
),
(
  gen_random_uuid(), 'Motor', 'Torque', '65Nm', 2,
  (SELECT "id" FROM product_ids WHERE slug = 'dolomit'), now(), now()
),
(
  gen_random_uuid(), 'Battery', 'Capacity', '625Wh', 3,
  (SELECT "id" FROM product_ids WHERE slug = 'dolomit'), now(), now()
),
(
  gen_random_uuid(), 'Battery', 'Range', '40-80km', 4,
  (SELECT "id" FROM product_ids WHERE slug = 'dolomit'), now(), now()
),
(
  gen_random_uuid(), 'Frame', 'Material', 'Aluminum', 5,
  (SELECT "id" FROM product_ids WHERE slug = 'dolomit'), now(), now()
),
(
  gen_random_uuid(), 'Travel', 'Front', '120mm', 6,
  (SELECT "id" FROM product_ids WHERE slug = 'dolomit'), now(), now()
);

-- Insert Variants
WITH product_ids AS (
  SELECT "id", "slug" FROM "Product"
)
INSERT INTO "ProductVariant" ("id", "type", "label", "value", "inStock", "productId", "createdAt", "updatedAt") VALUES
(
  gen_random_uuid(), 'Frame Size', 'S', 'S', true,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-pro'), now(), now()
),
(
  gen_random_uuid(), 'Frame Size', 'M', 'M', true,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-pro'), now(), now()
),
(
  gen_random_uuid(), 'Frame Size', 'L', 'L', true,
  (SELECT "id" FROM product_ids WHERE slug = 'mica-pro'), now(), now()
),
(
  gen_random_uuid(), 'Frame Size', 'S', 'S', true,
  (SELECT "id" FROM product_ids WHERE slug = 'dolomit'), now(), now()
),
(
  gen_random_uuid(), 'Frame Size', 'M', 'M', true,
  (SELECT "id" FROM product_ids WHERE slug = 'dolomit'), now(), now()
),
(
  gen_random_uuid(), 'Frame Size', 'L', 'L', true,
  (SELECT "id" FROM product_ids WHERE slug = 'dolomit'), now(), now()
);

-- Insert Blog Post
INSERT INTO "BlogPost" ("id", "title", "slug", "excerpt", "content", "coverImage", "published", "publishedAt", "createdAt", "updatedAt") VALUES
(
  gen_random_uuid(),
  'How to maintain your e-bike battery',
  'how-to-maintain-ebike-battery',
  'Extend the life of your e-bike battery with these simple maintenance tips.',
  '',
  'https://deruizebike.com/wp-content/uploads/2026/03/sycxly-1500-917-dolomit-ML-Drizzle-Green.webp',
  true,
  '2026-02-15 00:00:00',
  now(),
  now()
);

-- Insert Testimonials
INSERT INTO "Testimonial" ("id", "author", "role", "content", "rating", "active", "createdAt") VALUES
(
  gen_random_uuid(),
  'Michael Chen',
  'Daily Commuter',
  'I''ve been riding my Mica Pro every day for six months now. Absolutely love it! The quality is amazing and customer service is top notch.',
  5,
  true,
  now()
),
(
  gen_random_uuid(),
  'Sarah Johnson',
  'Weekend Adventurer',
  'The Dolomit takes my mountain biking to the next level. Power delivery is smooth and the build quality feels premium.',
  5,
  true,
  now()
);

SELECT '✅ Database seeded successfully!' AS result, COUNT(*) AS products FROM "Product";
