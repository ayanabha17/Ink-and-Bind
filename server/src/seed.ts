import mongoose from 'mongoose';
import dotenv from 'dotenv';

import dns from 'dns'; // 1. Add the dns import
// 2. Inject the DNS override to bypass the ISP block
dns.setServers(['8.8.8.8', '8.8.4.4']);

// NOTE: You will need to import your actual models here once you create them!
// import Book from './models/bookModel';
// import User from './models/userModel';

// Load your .env variables so we can read the MONGO_URI
dotenv.config();

// 1. Define your starter data
const sampleBooks = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 15.99 },
  { title: '1984', author: 'George Orwell', price: 12.99 },
  { title: 'Dune', author: 'Frank Herbert', price: 19.99 },
  { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', price: 85.00 },
  { title: 'Operating System Concepts', author: 'Abraham Silberschatz', price: 75.50 },
  { title: 'Computer Networking: A Top-Down Approach', author: 'James Kurose', price: 65.99 },
  { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', price: 45.00 },
  { title: 'Clean Code', author: 'Robert C. Martin', price: 42.50 },
  { title: 'Neuromancer', author: 'William Gibson', price: 14.99 },
  { title: 'Project Hail Mary', author: 'Andy Weir', price: 22.50 }
];

const seedDatabase = async () => {
  try {
    // 2. Connect to MongoDB
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is missing in .env");
    
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected for Seeding');

    // 3. Wipe the old data clean (Uncomment when your models are ready)
    // await Book.deleteMany();
    // await User.deleteMany();
    console.log('🗑️  Old data destroyed');

    // 4. Insert the fresh data (Uncomment when your models are ready)
    // await Book.insertMany(sampleBooks);
    console.log('🌱 Database seeded successfully!');

    // 5. Tell the script to gracefully shut down
    process.exit();
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1); // Exit with a "failure" code
  }
};

// Run the function
seedDatabase();