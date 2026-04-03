-- Clear existing data
DELETE FROM ProductSpec;
DELETE FROM ProductVariant;
DELETE FROM ProductImage;
DELETE FROM Product;
DELETE FROM Category;
DELETE FROM BlogPost;
DELETE FROM Testimonial;

-- Insert Categories
INSERT INTO Category (id, name, slug, description, "order", createdAt, updatedAt) VALUES 
('cat_sel', 'Select', 'select', 'Premium product line', 1, datetime('now'), datetime('now')),
('cat_urb', 'Urban', 'urban', 'City commuting', 2, datetime('now'), datetime('now')),
('cat_city', 'City', 'city', 'Everyday riding', 3, datetime('now'), datetime('now')),
('cat_trek', 'Trekking', 'trekking', 'Long-distance comfort', 4, datetime('now'), datetime('now')),
('cat_suv', 'SUV', 'suv', 'Higher seating position', 5, datetime('now'), datetime('now')),
('cat_mtb', 'MTB', 'mtb', 'Mountain biking', 6, datetime('now'), datetime('now')),
('cat_grav', 'Gravel', 'gravel', 'Off-road adventures', 7, datetime('now'), datetime('now')),
('cat_fold', 'Folding', 'folding', 'Compact and portable', 8, datetime('now'), datetime('now'));

-- Insert Products
INSERT INTO Product (id, name, slug, tagline, description, price, salePrice, featured, bestseller, published, categoryId, createdAt, updatedAt) VALUES
('prod_mica', 'Mica Pro 2026', 'mica-pro', 'Make every route your favorite route', 'Premium urban e-bike', 2799.00, NULL, 1, 1, 1, 'cat_urb', datetime('now'), datetime('now')),
('prod_dolo', 'Dolomit 2026', 'dolomit', 'Alpine-born. Ready for adventure.', 'Mountain e-bike', 2399.00, NULL, 1, 1, 1, 'cat_mtb', datetime('now'), datetime('now')),
('prod_peri', 'Peridot 2026', 'peridot', 'Compact folding urban e-bike', 'Folding e-bike', 1649.00, 1699.00, 0, 0, 1, 'cat_fold', datetime('now'), datetime('now')),
('prod_qsuv', 'Quartz SUV 2026', 'quartz-suv', 'Higher riding position', 'SUV e-bike', 1599.00, 1699.00, 0, 0, 1, 'cat_suv', datetime('now'), datetime('now')),
('prod_msuv', 'Marble SUV', 'marble-suv', 'Timeless style', 'SUV with marble finish', 1699.00, NULL, 0, 0, 1, 'cat_suv', datetime('now'), datetime('now')),
('prod_micag', 'Mica G', 'mica-g', 'Go further with Mica', 'Trekking e-bike', 1949.00, NULL, 0, 0, 1, 'cat_trek', datetime('now'), datetime('now')),
('prod_quartz', 'Quartz 2026', 'quartz', 'Entry-level city riding', 'City e-bike', 1399.00, NULL, 0, 0, 1, 'cat_city', datetime('now'), datetime('now')),
('prod_qm', 'Quartz M 2026', 'quartz-m', 'Compact city performance', 'Compact city e-bike', 1299.00, NULL, 0, 0, 1, 'cat_city', datetime('now'), datetime('now')),
('prod_smroad', 'Santa Maria E-Road', 'santa-maria-e-road', 'Go fast. Go far.', 'Road e-bike', 2999.00, NULL, 0, 0, 1, 'cat_grav', datetime('now'), datetime('now')),
('prod_smgrav', 'Santa Maria E-Gravel', 'santa-maria-e-gravel', 'Explore any terrain', 'Gravel e-bike', 3499.00, NULL, 0, 0, 1, 'cat_grav', datetime('now'), datetime('now')),
('prod_lapis', 'Lapis', 'lapis', 'Original folding frame', 'Folding e-bike', 1999.00, NULL, 1, 0, 1, 'cat_fold', datetime('now'), datetime('now'));

-- Insert Product Images
INSERT INTO ProductImage (id, url, alt, "order", productId) VALUES
('img_m1', '/images/products/mica-pro-2026-1200x800.webp', 'Mica Pro 2026', 0, 'prod_mica'),
('img_d1', '/images/products/dbzt-1DOLOMIT-1500-1000-M-L.webp', 'Dolomit 2026', 0, 'prod_dolo'),
('img_p1', '/images/products/peridot.white-1-1-1-1200x800.webp', 'Peridot 2026', 0, 'prod_peri'),
('img_qs1', '/images/products/quartz-suv-9-1200x800.webp', 'Quartz SUV 2026', 0, 'prod_qsuv'),
('img_ms1', '/images/products/marble-suv-2-3.png', 'Marble SUV', 0, 'prod_msuv'),
('img_mg1', '/images/products/mica-g-1-1200x800.webp', 'Mica G', 0, 'prod_micag'),
('img_q1', '/images/products/quartz-2026-1200x800.webp', 'Quartz 2026', 0, 'prod_quartz'),
('img_qm1', '/images/products/quartz-m-2026-1200x800.webp', 'Quartz M 2026', 0, 'prod_qm'),
('img_smr1', '/images/products/santa-maria-e-road-1200x800.webp', 'Santa Maria E-Road', 0, 'prod_smroad'),
('img_smg1', '/images/products/santa-maria-e-gravel-1200x800.webp', 'Santa Maria E-Gravel', 0, 'prod_smgrav'),
('img_l1', '/images/products/1500-917-lapis.webp', 'Lapis', 0, 'prod_lapis');

-- Insert Blog Post
INSERT INTO BlogPost (id, title, slug, excerpt, content, coverImage, published, publishedAt, createdAt, updatedAt) VALUES
('blog_1', 'How to maintain your e-bike battery', 'how-to-maintain-ebike-battery', 'Battery maintenance tips', 'Full article content...', 'https://deruizebike.com/wp-content/uploads/2026/03/sycxly-1500-917-dolomit-ML-Drizzle-Green.webp', 1, '2026-02-15 00:00:00', datetime('now'), datetime('now'));

-- Insert Testimonials
INSERT INTO Testimonial (id, author, role, content, rating, active, createdAt) VALUES
('test_1', 'Michael Chen', 'Daily Commuter', 'Love my Mica Pro!', 5, 1, datetime('now')),
('test_2', 'Sarah Johnson', 'Weekend Adventurer', 'Dolomit is amazing!', 5, 1, datetime('now'));

SELECT '✅ Database seeded successfully!' as message;
SELECT '📊 Categories:' as title, count(*) as count FROM Category;
SELECT '🚲 Products:' as title, count(*) as count FROM Product;
SELECT '🖼️ Images:' as title, count(*) as count FROM ProductImage;