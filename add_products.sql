-- Clear existing data
DELETE FROM ProductSpec;
DELETE FROM ProductVariant;
DELETE FROM ProductImage;
DELETE FROM Product;
DELETE FROM Category;
DELETE FROM BlogPost;
DELETE FROM Testimonial;

-- Insert Categories matching deruizebike.com
INSERT INTO Category (id, name, slug, description, "order", createdAt, updatedAt) VALUES 
('cat_sel', 'Select', 'select', 'The Select series is far more than just Deruiz''s premium product line. We''ve rethought every single component from the ground up.', 1, datetime('now'), datetime('now')),
('cat_urb', 'Urban', 'urban', 'Perfect for daily city commuting. Ride in style with comfort and efficiency.', 2, datetime('now'), datetime('now')),
('cat_city', 'City', 'city', 'Elegant everyday riding through urban streets. Clean design meets practical performance.', 3, datetime('now'), datetime('now')),
('cat_trek', 'Trekking', 'trekking', 'Long-distance comfort and stability for your adventures on any road.', 4, datetime('now'), datetime('now')),
('cat_suv', 'SUV', 'suv', 'Higher seating position with extra stability for confident riding.', 5, datetime('now'), datetime('now')),
('cat_mtb', 'MTB', 'mtb', 'Built for the trail. Conquer any terrain with confidence and control.', 6, datetime('now'), datetime('now')),
('cat_grav', 'Gravel', 'gravel', 'Explore beyond the paved roads. Ready for any adventure.', 7, datetime('now'), datetime('now')),
('cat_fold', 'Folding', 'folding', 'Compact and portable. Easy to store and perfect for city living.', 8, datetime('now'), datetime('now'));

-- Insert Products matching deruizebike.com
INSERT INTO Product (id, name, slug, tagline, description, price, salePrice, featured, bestseller, published, categoryId, createdAt, updatedAt) VALUES
-- Mica Pro 2026
('prod_mica', 'Mica Pro 2026', 'mica-pro', 'Make every route your favorite route', 'The Mica Pro is our premium urban e-bike, designed for daily commuting with style and performance. Clean aesthetics meet cutting-edge technology.', 2799.00, NULL, 1, 1, 1, 'cat_urb', datetime('now'), datetime('now')),
-- Dolomit 2026
('prod_dolo', 'Dolomit 2026', 'dolomit', 'Alpine-born. Ready for adventure.', 'Built for mountain adventures, the Dolomit combines robust construction with modern e-bike technology. Conquer any terrain with confidence.', 2399.00, NULL, 1, 1, 1, 'cat_mtb', datetime('now'), datetime('now')),
-- Peridot 2026
('prod_peri', 'Peridot 2026', 'peridot', 'Compact folding urban e-bike', 'Perfect for the city. Folds quickly for easy storage and transport.', 1649.00, 1699.00, 0, 0, 1, 'cat_fold', datetime('now'), datetime('now')),
-- Quartz SUV 2026
('prod_qsuv', 'Quartz SUV 2026', 'quartz-suv', 'Higher riding position for urban adventures', 'SUV styling with comfortable upright riding position. Perfect for confident city cruising.', 1599.00, 1699.00, 0, 0, 1, 'cat_suv', datetime('now'), datetime('now')),
-- Marble SUV
('prod_msuv', 'Marble SUV', 'marble-suv', 'Timeless style for modern riding', 'Classic marble finish with modern SUV geometry. A perfect blend of style and comfort.', 1699.00, NULL, 0, 0, 1, 'cat_suv', datetime('now'), datetime('now')),
-- Mica – G
('prod_micag', 'Mica – G', 'mica-g', 'Go further with Mica', 'The trekking-ready version of our popular Mica platform. Comfort for long days in the saddle.', 1949.00, NULL, 0, 0, 1, 'cat_trek', datetime('now'), datetime('now')),
-- Quartz 2026
('prod_quartz', 'Quartz 2026', 'quartz', 'Entry-level city riding', 'Quality e-bike performance at an accessible price. Perfect for everyday city riding.', 1399.00, NULL, 0, 0, 1, 'cat_city', datetime('now'), datetime('now')),
-- Quartz M 2026
('prod_qm', 'Quartz M 2026', 'quartz-m', 'Compact city performance', 'Shorter frame for smaller riders. Same great performance in a compact package.', 1299.00, NULL, 0, 0, 1, 'cat_city', datetime('now'), datetime('now')),
-- Santa Maria E-Road
('prod_smroad', 'Santa Maria E-Road', 'santa-maria-e-road', 'Go fast. Go far.', 'Lightweight performance for road and gravel riding. Premium build quality for serious riders.', 2999.00, NULL, 0, 0, 1, 'cat_grav', datetime('now'), datetime('now')),
-- Santa Maria E-Gravel
('prod_smgrav', 'Santa Maria E-Gravel', 'santa-maria-e-gravel', 'Explore any terrain', 'Versatile gravel machine ready for your next adventure. Durable, lightweight, and ready to go.', 3499.00, NULL, 0, 0, 1, 'cat_grav', datetime('now'), datetime('now')),
-- Lapis
('prod_lapis', 'Lapis', 'lapis', 'The original folding frame', 'Our classic folding e-bike. Perfect for city living, easy to store and carry.', 1999.00, NULL, 1, 0, 1, 'cat_fold', datetime('now'), datetime('now'));

-- Insert Product Images
INSERT INTO ProductImage (id, url, alt, "order", productId, createdAt, updatedAt) VALUES
-- Mica Pro
('img_m1', '/images/products/mica-pro-2026-1200x800.webp', 'Mica Pro 2026', 0, 'prod_mica', datetime('now'), datetime('now')),
-- Dolomit
('img_d1', '/images/products/dbzt-1DOLOMIT-1500-1000-M-L.webp', 'Dolomit 2026', 0, 'prod_dolo', datetime('now'), datetime('now')),
-- Peridot
('img_p1', '/images/products/peridot.white-1-1-1-1200x800.webp', 'Peridot 2026', 0, 'prod_peri', datetime('now'), datetime('now')),
-- Quartz SUV
('img_qs1', '/images/products/quartz-suv-9-1200x800.webp', 'Quartz SUV 2026', 0, 'prod_qsuv', datetime('now'), datetime('now')),
-- Marble SUV
('img_ms1', '/images/products/marble-suv-2-3.png', 'Marble SUV', 0, 'prod_msuv', datetime('now'), datetime('now')),
-- Mica – G
('img_mg1', '/images/products/mica-g-1-1200x800.webp', 'Mica – G', 0, 'prod_micag', datetime('now'), datetime('now')),
-- Quartz 2026
('img_q1', '/images/products/quartz-2026-1200x800.webp', 'Quartz 2026', 0, 'prod_quartz', datetime('now'), datetime('now')),
-- Quartz M 2026
('img_qm1', '/images/products/quartz-m-2026-1200x800.webp', 'Quartz M 2026', 0, 'prod_qm', datetime('now'), datetime('now')),
-- Santa Maria E-Road
('img_smr1', '/images/products/santa-maria-e-road-1200x800.webp', 'Santa Maria E-Road', 0, 'prod_smroad', datetime('now'), datetime('now')),
-- Santa Maria E-Gravel
('img_smg1', '/images/products/santa-maria-e-gravel-1200x800.webp', 'Santa Maria E-Gravel', 0, 'prod_smgrav', datetime('now'), datetime('now')),
-- Lapis
('img_l1', '/images/products/1500-917-lapis.webp', 'Lapis', 0, 'prod_lapis', datetime('now'), datetime('now'));

-- Insert Product Specs
INSERT INTO ProductSpec (id, "group", label, value, "order", productId, createdAt, updatedAt) VALUES
-- Mica Pro Specs
('spec_m1', 'Motor', 'Power', '250W', 1, 'prod_mica', datetime('now'), datetime('now')),
('spec_m2', 'Motor', 'Torque', '45Nm', 2, 'prod_mica', datetime('now'), datetime('now')),
('spec_m3', 'Battery', 'Capacity', '625Wh', 3, 'prod_mica', datetime('now'), datetime('now')),
('spec_m4', 'Battery', 'Range', '50-100km', 4, 'prod_mica', datetime('now'), datetime('now')),
('spec_m5', 'Frame', 'Material', 'Aluminum', 5, 'prod_mica', datetime('now'), datetime('now')),
('spec_m6', 'Weight', 'Total', '15.8kg', 6, 'prod_mica', datetime('now'), datetime('now')),
-- Dolomit Specs
('spec_d1', 'Motor', 'Power', '500W', 1, 'prod_dolo', datetime('now'), datetime('now')),
('spec_d2', 'Motor', 'Torque', '65Nm', 2, 'prod_dolo', datetime('now'), datetime('now')),
('spec_d3', 'Battery', 'Capacity', '625Wh', 3, 'prod_dolo', datetime('now'), datetime('now')),
('spec_d4', 'Battery', 'Range', '40-80km', 4, 'prod_dolo', datetime('now'), datetime('now')),
('spec_d5', 'Frame', 'Material', 'Aluminum', 5, 'prod_dolo', datetime('now'), datetime('now')),
('spec_d6', 'Travel', 'Front', '120mm', 6, 'prod_dolo', datetime('now'), datetime('now'));

-- Insert Product Variants
INSERT INTO ProductVariant (id, type, label, value, inStock, productId, createdAt, updatedAt) VALUES
-- Mica Pro Variants
('var_m1', 'Frame Size', 'S', 'S', 1, 'prod_mica', datetime('now'), datetime('now')),
('var_m2', 'Frame Size', 'M', 'M', 1, 'prod_mica', datetime('now'), datetime('now')),
('var_m3', 'Frame Size', 'L', 'L', 1, 'prod_mica', datetime('now'), datetime('now')),
-- Dolomit Variants
('var_d1', 'Frame Size', 'S', 'S', 1, 'prod_dolo', datetime('now'), datetime('now')),
('var_d2', 'Frame Size', 'M', 'M', 1, 'prod_dolo', datetime('now'), datetime('now')),
('var_d3', 'Frame Size', 'L', 'L', 1, 'prod_dolo', datetime('now'), datetime('now'));

-- Insert Blog Post
INSERT INTO BlogPost (id, title, slug, excerpt, content, coverImage, published, publishedAt, createdAt, updatedAt) VALUES
('blog_1', 'How to maintain your e-bike battery', 'how-to-maintain-ebike-battery', 'Extend the life of your e-bike battery with these simple maintenance tips.', '', 'https://deruizebike.com/wp-content/uploads/2026/03/sycxly-1500-917-dolomit-ML-Drizzle-Green.webp', 1, '2026-02-15 00:00:00', datetime('now'), datetime('now'));

-- Insert Testimonials
INSERT INTO Testimonial (id, author, role, content, rating, active, createdAt) VALUES
('test_1', 'Michael Chen', 'Daily Commuter', 'I''ve been riding my Mica Pro every day for six months now. Absolutely love it! The quality is amazing and customer service is top notch.', 5, 1, datetime('now')),
('test_2', 'Sarah Johnson', 'Weekend Adventurer', 'The Dolomit takes my mountain biking to the next level. Power delivery is smooth and the build quality feels premium.', 5, 1, datetime('now'));

-- Show results
SELECT '✅ Database seeded successfully!' as message;
SELECT '📊 Categories added:' as title, count(*) as count FROM Category;
SELECT '🚲 Products added:' as title, count(*) as count FROM Product;
SELECT '🖼️ Product Images added:' as title, count(*) as count FROM ProductImage;
SELECT '🏆 Featured Products:' as title, name FROM Product WHERE featured = 1;
