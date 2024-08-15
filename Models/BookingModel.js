import { model, Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: [true, "required"],
    },
    userId: {
      type: String,
      required: [true, "required"],
    },
    coachId: {
      type: String,
      required: [true, "required"],
    },
    appointmentDate: {
      type: Date,
    },
    slot: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

const BookingModel = model("Bookings", bookingSchema);
export default BookingModel;
