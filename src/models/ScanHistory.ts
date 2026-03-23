import mongoose, { Document, Schema } from "mongoose";

export interface IScanHistory extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  result: string;
  scannedAt: Date;
}

const scanHistorySchema: Schema<IScanHistory> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    result: {
      type: String, // "Good" / "Bad" / "Average"
    },
    scannedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IScanHistory>(
  "ScanHistory",
  scanHistorySchema
);