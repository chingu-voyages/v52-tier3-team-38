import { mongoose, Schema }  from 'mongoose'

const appointmentSchema = new Schema({
  residentId: {
    type: ObjectId,
    required: true,
    ref: "Resident"
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

const Appointment = mongoose.models.Resident || mongoose.model("Appointment", appointmentSchema); 

export default Appointment;
