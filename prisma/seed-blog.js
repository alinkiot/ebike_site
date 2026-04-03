const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  await p.blogPost.deleteMany({});

  const posts = [
    {
      title: 'Further development of Marble SUV and Quartz SUV',
      slug: 'further-development-marble-suv-quartz-suv',
      excerpt: 'Think further. Drive further. Develop further. Deruiz focuses on continuous refinement of existing models based on user feedback and real-world performance.',
      content: 'At Deruiz, innovation does not end with the introduction of a new model. Based on user feedback and real-world performance data, we have made targeted improvements to both the Quartz SUV 2026 and the Marble SUV.\n\nKey updates for both models include upgraded sensor technology, moving from basic cadence sensors to combined torque and cadence sensors for more responsive, natural motor assistance. A new color LCD display with improved clarity and smartphone app integration for route tracking and range information has also been added.\n\nThe Quartz SUV 2026 additionally gains a new Volcanic Black color option for a more minimalist aesthetic. We invite our community to share their experiences and feedback on the Deruiz eBike Club Facebook group.',
      coverImage: 'https://deruizebike.com/wp-content/uploads/2026/03/323blog-800x600-1.webp',
      published: true,
      publishedAt: new Date('2026-03-20'),
    },
    {
      title: 'Deruiz at CYCLINGWORLD EUROPE 2026 in Dusseldorf',
      slug: 'deruiz-cyclingworld-europe-2026-dusseldorf',
      excerpt: 'Cycling stands for freedom and discovery and that is exactly what we are bringing to CYCLINGWORLD EUROPE 2026 in Dusseldorf.',
      content: 'Cycling is more than just transportation: it is freedom, discovery, and a genuine riding experience. Deruiz exhibited at CYCLINGWORLD EUROPE from March 20-22, 2026, in Dusseldorf Hall 06, Booth Q4.\n\nVisitors experienced the full Deruiz lineup including Urban, City, Folding, SUV, MTB, and SELECT series bikes. Our team was on hand to answer questions and arrange test rides.\n\nThank you to everyone who visited us at the fair. We look forward to seeing you at the next event.',
      coverImage: 'https://deruizebike.com/wp-content/uploads/2026/03/Duesseldorf-800x600-1.webp',
      published: true,
      publishedAt: new Date('2026-03-17'),
    },
    {
      title: 'Mica Pro and Dolomit in the Test: Performance and Driving Comfort Are Convincing',
      slug: 'mica-pro-dolomit-test-performance-driving-comfort',
      excerpt: 'New models only prove their quality in practical testing. All the more pleasing are the positive reviews from Radfahren.de for the Mica Pro and Dolomit.',
      content: 'Both Deruiz SELECT models were recently put through their paces by Radfahren.de, and the results speak for themselves.\n\nThe Mica Pro received a rating of 1.7 (Good), described as a suburban cruiser excelling in comfort and touring capability. Its upright seating position, 29-inch tires, continuously variable Enviolo hub gear, and Gates belt drive make it an ideal daily companion.\n\nThe Dolomit scored 2.1 (Good), characterized as a powerful all-terrain bike. It combines the 110 Nm ZentriDrive mid-drive motor with a 120 mm suspension fork and Schwalbe tires for confident off-road performance.\n\nBoth models share the SELECT series philosophy: combining high-performance technology with a superior riding experience. Arrange a test ride at your local Deruiz dealer.',
      coverImage: 'https://deruizebike.com/wp-content/uploads/2026/03/blog-1.webp',
      published: true,
      publishedAt: new Date('2026-03-13'),
    },
    {
      title: 'Deruiz Showroom Heidelberg: Now Open to the Public',
      slug: 'deruiz-showroom-heidelberg-now-open',
      excerpt: 'With the opening of our new Deruiz showroom in Heidelberg, we have reached another milestone in our brand development.',
      content: 'With the opening of our new Deruiz showroom in Heidelberg, we have reached another milestone in our brand development. This location serves as our second German showroom and first in southern Germany, functioning as a regional flagship store with full service and support capabilities.\n\nVisitors can experience the complete Deruiz lineup, speak with our expert team, and arrange test rides. Our staff is on hand to help you find the perfect e-bike for your needs.\n\nWe look forward to welcoming you to Heidelberg.',
      coverImage: 'https://deruizebike.com/wp-content/uploads/2026/03/katalog-blog-800x600-1.webp',
      published: true,
      publishedAt: new Date('2026-03-02'),
    },
    {
      title: 'Cycling in Essen 2026: Time to Get Going Again',
      slug: 'cycling-essen-2026-time-to-get-going',
      excerpt: 'Winter is slowly letting go. The days are getting brighter, and movement feels easier again. Deruiz is heading to the Essen Bicycle Fair 2026.',
      content: 'Winter is slowly letting go. The days are getting brighter, and movement feels easier again. And what better way to celebrate the return of cycling season than at the Essen Bicycle Fair 2026?\n\nDeruiz was present with our full e-bike lineup, offering test rides and expert consultations. Whether you are looking for a city commuter, a trekking bike, or a mountain e-bike, our team helped visitors find the perfect match.\n\nThank you to everyone who stopped by. Stay tuned for our next event appearance.',
      coverImage: 'https://deruizebike.com/wp-content/uploads/2026/03/Essen-800x600-1.webp',
      published: true,
      publishedAt: new Date('2026-02-09'),
    },
  ];

  for (const post of posts) {
    await p.blogPost.create({ data: post });
  }

  console.log('Created', posts.length, 'blog posts');
  await p.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
