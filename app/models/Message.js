// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  senderUsername: {
    type: String, // ✅ add this
  },
  recipientId: {
    type: String,
    required: true,
  },
  recipientUsername: {
    type: String, // ✅ add this
  },
  timestamp: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  adData: {
    title: String,
    imageUrl: String,
    adId: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
