import mongoose from 'mongoose';

// Type declaration for the global object
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI || '';  // MongoDB connection string from .env file

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Global cache to hold the mongoose connection across API requests (in development)
let cached = global.mongoose;

// If no cached connection exists, initialize it
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  if (cached.conn) {
    // Return the cached connection if it exists
    return cached.conn;
  }

  if (!cached.promise) {
    // Create a new connection if no cached promise exists
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      // Return the connection from the mongoose instance
      return mongooseInstance.connection;
    }) as Promise<mongoose.Mongoose>;
  }

  // Ensure the promise resolves before using it
  const mongooseInstance = await cached.promise;

  // Now that the promise is resolved, assign the connection
  cached.conn = mongooseInstance.connection;

  return cached.conn;
};

export default connectToDatabase;
