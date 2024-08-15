import BookingModel from "../Models/BookingModel.js";
import UserModel from "../Models/UserModel.js";
import CoachModel from "../Models/CoachModel.js";
import { bookingValidator } from "../Utilities/validator.js";
import { generateUniqueBookingId } from "../Utilities/uniqueIdGenerator.js";

export const createBooking = async (req, res) => {
  try {
    const user = await UserModel.findOne({ userId: req.params.userId });
    if (user) {
      const coach = await CoachModel.findOne({ coachId: req.params.coachId });
      if (coach) {
        const slotAvailable = await BookingModel.findOne({
          slot: req.body.slot,
          appointmentDate: new Date(req.body.dateOfAppointment),
        });
        if (slotAvailable) {
          res.status(400).json({
            message: "There is an appointment in this slot already",
          });
        } else {
          if (!bookingValidator(req.body)) {
            const booking = {
              bookingId: await generateUniqueBookingId()
                .then((id) => id)
                .catch((err) => console.log(err.message)),
              userId: user.userId,
              coachId: coach.coachId,
              appointmentDate: new Date(req.body.dateOfAppointment),
              slot: req.body.slot,
            };
            const bookingDone = await BookingModel.create(booking);
            res.status(200).send({
              message:
                "Booking done successfully with id: " + booking.bookingId,
              bookingDone,
            });
          } else {
            const err = bookingValidator(req.body);
            res.status(err.status).json({
              status: "FAILED",
              message: err.message,
            });
          }
        }
      } else {
        res.status(400).json({
          message: "Coach Id does not exist",
        });
      }
    } else {
      res.status(400).json({
        message: "User Id does not exist",
      });
    }
  } catch (e) {
    res.status(500).json({ status: "ERROR", message: e.message });
  }
};

export const rescheduleBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findOne({
      bookingId: req.params.bookingId,
    });
    if (!booking) {
      res.status(400).json({
        message: "Booking Id does not exist",
      });
    } else {
      if (!bookingValidator(req.body)) {
        const slotAvailable = await BookingModel.findOne({
          slot: req.body.slot,
          appointmentDate: new Date(req.body.dateOfAppointment),
        });
        if (slotAvailable) {
          res.status(400).json({
            message: "There is an appointment in this slot already",
          });
        } else {
          const newBooking = {
            bookingId: req.params.bookingId,
            userId: booking.userId,
            coachId: booking.coachId,
            appointmentDate: new Date(req.body.dateOfAppointment),
            slot: req.body.slot,
          };
          await BookingModel.findOneAndUpdate(
            {
              bookingId: req.params.bookingId,
            },
            newBooking
          );
          res.status(200).json({
            status: "SUCCESS",
            message: `${req.params.bookingId} booking updated with the given slot`,
          });
        }
      } else {
        const err = bookingValidator(req.body);
        res.status(err.status).json({
          status: "FAILED",
          message: err.message,
        });
      }
    }
  } catch (e) {
    res.status(500).json({ status: "ERROR", message: e.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findOne({
      bookingId: req.params.bookingId,
    });
    if (!booking) {
      res.status(400).json({
        message: "Could not delete this appointment",
      });
    } else {
      await BookingModel.findOneAndDelete({ bookingId: req.params.bookingId });
      res.status(200).json({
        message: `${req.params.bookingId} deleted successfully`,
      });
    }
  } catch (e) {
    res.status(500).json({ status: "ERROR", message: e.message });
  }
};
