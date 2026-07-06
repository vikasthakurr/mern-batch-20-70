import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    kitchen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kitchen",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true },
);

// One review per order
reviewSchema.index({ user: 1, order: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
