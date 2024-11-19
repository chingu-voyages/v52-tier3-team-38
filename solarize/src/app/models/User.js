import { mongoose, Schema }  from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  role: {
    type: Number,
    enum: [0,1], // 0 = Resident, 1 = Admin
    required: true
  },

  address: {
    type: String,
    required: function() {
      return this.role === 0;
    }
  },

  phoneNumber: {
    type: String,
    required: function() {
      return this.role === 0;
    }
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema); 

export default User;
