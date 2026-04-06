import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// prevent duplicates
favoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const FavoriteModel = mongoose.model("Favorite", favoriteSchema);