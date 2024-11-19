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
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema); 

export default Admin;
