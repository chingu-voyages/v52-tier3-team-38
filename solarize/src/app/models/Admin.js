import { mongoose, Schema }  from 'mongoose'

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  role: {
    type: Number,
    enum: [0,1] // 0 = Resident, 1 = Admin.
  }
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema); 

export default Admin;
