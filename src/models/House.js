import { Schema, model } from 'mongoose';

const HouseSchema = new Schema({
  thumbnail: String,
  description: String,
  price: Number,
  location: String,
  available: boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default model('House', HouseSchema);