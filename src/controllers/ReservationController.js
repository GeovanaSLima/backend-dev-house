import Reservation from '../models/Reservation';
import User from '../models/User';
import House from '../models/House';

class ReservationController {
  async index(req, res) {
    const { user_id } = req.headers;

    const reservations = await Reservation.find({ user: user_id }).populate('house');

    return res.json(reservations);
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if (!house) {
      return res.status(400).json({ error: "Casa nao encontrada." });
    }

    if(house.available === false) {
      return res.status(400).json({ error: "Casa indisponivel." });
    }

    if(String(user._id) === String(house.user)) {
      return res.status(401).json({ error: "Reserva não permitida." });
    }

    const reservation = await Reservation.create({
      user: user_id,
      house: house_id,
      date,
    });

    const populatedReservation = await Reservation.findById(reservation._id)
      .populate('house')
      .populate('user');

    return res.json(populatedReservation);
  }
}

export default new ReservationController();