import mongoose, { Schema, Document } from 'mongoose';

// 1. TypeScript Interface
export interface IBook extends Document {
  title: string;
  author: string;
  price: number;
}

// 2. Mongoose Schema
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt dates
});

// 3. Export the Model
export default mongoose.model('Book', bookSchema);