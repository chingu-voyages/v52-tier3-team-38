import { mongoose, Schema }  from 'mongoose'

const { ObjectId } = mongoose.Schema.Types;

const appointmentSchema = new Schema({
  residentId: {
    type: ObjectId,
    required: true,
    ref: "User"
  },

  timeslot: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "visited"],
    default: "pending"
  },

  address: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema); 

export default Appointment;
