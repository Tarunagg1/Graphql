import authResolver from "./auth.js";
import bookingResolver from "./booking.js";
import eventResolver from "./event.js";

const root = {
  ...bookingResolver,
  ...eventResolver,
  ...authResolver,
};

export default root;
