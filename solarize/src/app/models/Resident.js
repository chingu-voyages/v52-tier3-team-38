import { mongoose, Schema }  from 'mongoose'

const residentSchema = new Schema({
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

const Resident = mongoose.models.Resident || mongoose.model("Resident", residentSchema); 

export default Resident;
