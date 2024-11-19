import { mongoose, Schema }  from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  phoneNumber: {
    type: String,
    required: true
  }
});

const user = mongoose.models.User || mongoose.model("User", userSchema); 

export default User;
