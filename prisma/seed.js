const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding Deruiz E-Bike data...');

  // 1. Create Categories matching deruizebike.com
  const categories = [
    {
      name: 'Select',
      slug: 'select',
      description: 'The Select series is far more than just Deruiz\'s premium product line. We\'ve rethought every single component from the ground up.',
      order: 1,
    },
    {
      name: 'City',
      slug: 'city',
      description: 'Elegant everyday riding through urban streets. Clean design meets practical performance.',
      order: 2,
    },
    {
      name: 'Trekking',
      slug: 'trekking',
      description: 'Long-distance comfort and stability for your adventures on any road.',
      order: 3,
    },
    {
      name: 'SUV',
      slug: 'suv',
      description: 'Higher seating position with extra stability for confident riding.',
      order: 4,
    },
    {
      name: 'MTB',
      slug: 'mtb',
      description: 'Built for the trail. Conquer any terrain with confidence and control.',
      order: 5,
    },
    {
      name: 'Gravel',
      slug: 'gravel',
      description: 'Explore beyond the paved roads. Ready for any adventure.',
      order: 6,
    },
    {
      name: 'Folding',
      slug: 'folding',
      description: 'Compact and portable. Easy to store and perfect for city living.',
      order: 7,
    },
  ];

  // Create categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log('Categories created');

  // Get the created categories
  const createdCategories = await prisma.category.findMany();
  const categoryMap = new Map(createdCategories.map(c => [c.slug, c.id]));

  // 2. Create Products matching deruizebike.com
  const products = [
    // Select Series
    {
      name: 'Mica Pro 2026',
      slug: 'mica-pro',
      tagline: 'Make every route your favorite route',
      description: 'The Mica Pro is our premium urban e-bike, designed for daily commuting with style and performance. Clean aesthetics meet cutting-edge technology.',
      price: 2799.00,
      categorySlug: 'select',
      featured: true,
      bestseller: true,
      published: true,
      specs: [
        { group: 'Motor', label: 'Power', value: '250W' },
        { group: 'Motor', label: 'Torque', value: '45Nm' },
        { group: 'Battery', label: 'Capacity', value: '625Wh' },
        { group: 'Battery', label: 'Range', value: '50-100km' },
        { group: 'Frame', label: 'Material', value: 'Aluminum' },
        { group: 'Weight', label: 'Total', value: '15.8kg' },
      ],
      variants: [
        { type: 'Frame Size', label: 'S', value: 'S', inStock: true },
        { type: 'Frame Size', label: 'M', value: 'M', inStock: true },
        { type: 'Frame Size', label: 'L', value: 'L', inStock: true },
      ],
      images: [
        { url: '/images/products/mica-pro-2026-1200x800.webp', alt: 'Mica Pro 2026', order: 0 },
      ],
    },
    {
      name: 'Dolomit 2026',
      slug: 'dolomit',
      tagline: 'Alpine-born. Ready for adventure.',
      description: 'Built for mountain adventures, the Dolomit combines robust construction with modern e-bike technology. Conquer any terrain with confidence.',
      price: 2399.00,
      categorySlug: 'select',
      featured: true,
      bestseller: true,
      published: true,
      specs: [
        { group: 'Motor', label: 'Power', value: '500W' },
        { group: 'Motor', label: 'Torque', value: '65Nm' },
        { group: 'Battery', label: 'Capacity', value: '625Wh' },
        { group: 'Battery', label: 'Range', value: '40-80km' },
        { group: 'Frame', label: 'Material', value: 'Aluminum' },
        { group: 'Travel', label: 'Front', value: '120mm' },
      ],
      variants: [
        { type: 'Frame Size', label: 'S', value: 'S', inStock: true },
        { type: 'Frame Size', label: 'M', value: 'M', inStock: true },
        { type: 'Frame Size', label: 'L', value: 'L', inStock: true },
      ],
      images: [
        { url: '/images/products/dbzt-1DOLOMIT-1500-1000-M-L.webp', alt: 'Dolomit 2026', order: 0 },
      ],
    },
    // Urban / City
    {
      name: 'Peridot 2026',
      slug: 'peridot',
      tagline: 'Compact folding urban e-bike',
      description: 'Perfect for the city. Folds quickly for easy storage and transport.',
      price: 1649.00,
      salePrice: 1699.00,
      categorySlug: 'folding',
      featured: false,
      bestseller: false,
      published: true,
      images: [
        { url: '/images/products/peridot.white-1-1-1-1200x800.webp', alt: 'Peridot 2026', order: 0 },
      ],
    },
    {
      name: 'Quartz SUV 2026',
      slug: 'quartz-suv',
      tagline: 'Higher riding position for urban adventures',
      description: 'SUV styling with comfortable upright riding position. Perfect for confident city cruising.',
      price: 1599.00,
      salePrice: 1699.00,
      categorySlug: 'suv',
      featured: false,
      bestseller: false,
      published: true,
      images: [
        { url: '/images/products/quartz-suv-9-1200x800.webp', alt: 'Quartz SUV 2026', order: 0 },
      ],
    },
    {
      name: 'Marble SUV',
      slug: 'marble-suv',
      tagline: 'Timeless style for modern riding',
      description: 'Classic marble finish with modern SUV geometry. A perfect blend of style and comfort.',
      price: 1699.00,
      categorySlug: 'suv',
      featured: false,
      bestseller: false,
      published: true,
      images: [
        { url: '/images/products/marble-suv-2-3.png', alt: 'Marble SUV', order: 0 },
      ],
    },
    {
      name: 'Mica – G',
      slug: 'mica-g',
      tagline: 'Go further with Mica',
      description: 'The trekking-ready version of our popular Mica platform. Comfort for long days in the saddle.',
      price: 1949.00,
      categorySlug: 'trekking',
      featured: false,
      bestseller: false,
      published: true,
      images: [
        { url: '/images/products/mica-g-1-1200x800.webp', alt: 'Mica – G', order: 0 },
      ],
    },
    {
      name: 'Quartz 2026',
      slug: 'quartz',
      tagline: 'Entry-level city riding',
      description: 'Quality e-bike performance at an accessible price. Perfect for everyday city riding.',
      price: 1399.00,
      categorySlug: 'city',
      featured: false,
      bestseller: false,
      published: true,
      images: [
        { url: '/images/products/quartz-2026-1200x800.webp', alt: 'Quartz 2026', order: 0 },
      ],
    },
    {
      name: 'Quartz M 2026',
      slug: 'quartz-m',
      tagline: 'Compact city performance',
      description: 'Shorter frame for smaller riders. Same great performance in a compact package.',
      price: 1299.00,
      categorySlug: 'city',
      featured: false,
      bestseller: false,
      published: true,
      images: [
        { url: '/images/products/quartz-m-2026-1200x800.webp', alt: 'Quartz M 2026', order: 0 },
      ],
    },
    {
      name: 'Santa Maria E-Road',
      slug: 'santa-maria-e-road',
      tagline: 'Go fast. Go far.',
      description: 'Lightweight performance for road and gravel riding. Premium build quality for serious riders.',
      price: 2999.00,
      categorySlug: 'gravel',
      featured: false,
      bestseller: false,
      published: true,
      images: [
        { url: '/images/products/santa-maria-e-road-1200x800.webp', alt: 'Santa Maria E-Road', order: 0 },
      ],
    },
    {
      name: 'Santa Maria E-Gravel',
      slug: 'santa-maria-e-gravel',
      tagline: 'Explore any terrain',
      description: 'Versatile gravel machine ready for your next adventure. Durable, lightweight, and ready to go.',
      price: 3499.00,
      categorySlug: 'gravel',
      featured: false,
      bestseller: false,
      published: true,
      images: [
        { url: '/images/products/santa-maria-e-gravel-1200x800.webp', alt: 'Santa Maria E-Gravel', order: 0 },
      ],
    },
    {
      name: 'Lapis',
      slug: 'lapis',
      tagline: 'The original folding frame',
      description: 'Our classic folding e-bike. Perfect for city living, easy to store and carry.',
      price: 1999.00,
      categorySlug: 'mtb',
      featured: true,
      bestseller: false,
      published: true,
      images: [
        { url: '/images/products/1500-917-lapis.webp', alt: 'Lapis', order: 0 },
      ],
    },
  ];

  // Create products
  for (const product of products) {
    const categoryId = categoryMap.get(product.categorySlug);
    if (!categoryId) continue;

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        name: product.name,
        slug: product.slug,
        tagline: product.tagline,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice,
        featured: product.featured || false,
        bestseller: product.bestseller || false,
        published: product.published,
        categoryId,
        images: {
          create: product.images,
        },
        specs: product.specs ? {
          create: product.specs,
        } : undefined,
        variants: product.variants ? {
          create: product.variants,
        } : undefined,
      },
    });
  }

  console.log('Products created');

  // 3. Add some blog posts matching the website
  const blogPosts = [
    {
      title: 'How to maintain your e-bike battery',
      slug: 'how-to-maintain-ebike-battery',
      excerpt: 'Extend the life of your e-bike battery with these simple maintenance tips.',
      coverImage: 'https://deruizebike.com/wp-content/uploads/2026/03/sycxly-1500-917-dolomit-ML-Drizzle-Green.webp',
      content: 'Full article content about e-bike battery maintenance goes here...',
      published: true,
      publishedAt: new Date('2026-02-15'),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log('Blog posts created');

  // 4. Add some testimonials
  const testimonials = [
    {
      author: 'Michael Chen',
      role: 'Daily Commuter',
      content: 'I\'ve been riding my Mica Pro every day for six months now. Absolutely love it! The quality is amazing and customer service is top notch.',
      rating: 5,
      active: true,
    },
    {
      author: 'Sarah Johnson',
      role: 'Weekend Adventurer',
      content: 'The Dolomit takes my mountain biking to the next level. Power delivery is smooth and the build quality feels premium.',
      rating: 5,
      active: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  console.log('Testimonials created');
  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
