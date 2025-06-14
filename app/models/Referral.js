import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  senderUsername: {
    type: String,
    required: true,
  },
  recipientId: {
    type: String,
    required: true,
  },
  recipientUsername: {
    type: String,
    required: true,
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
    source: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    adId: {
      type: String,
      required: true,
    },
    adTitle: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    }
  }
}, {
  timestamps: true
});

const Referral = mongoose.models.Referral || mongoose.model('Referral', referralSchema);

export default Referral;