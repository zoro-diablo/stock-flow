import mongoose, { Schema } from 'mongoose';

const topicSchema = new Schema(
  {
    title: String,
    description: String,
    quantity: Number,
    price: Number,
    startDate: Date, 
    endDate: Date,
    pricePerQty: Number,
  },
  { timestamps: true }
);

const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);

export default Topic;
