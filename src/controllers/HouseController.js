import House from "../models/House";
import User from "../models/User";

class HouseController {

  async index(req, res) {
    const { available } = req.query;

    const houses = await House.find({ available });

    return res.json(houses);
  }

  async store(req, res) {
    const { filename } = req.file;
    const { description, price, location, available } = req.body;
    const { user_id } = req.headers;

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      available
    })

    return res.json(house);
  }

  async update(req, res) {
    const { filename } = req.file;
    const { house_id } = req.params;
    const { user_id } = req.headers;
    const { description, price, location, available } = req.body;

    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if(String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: "Não autorizado." });
    }

    await House.updateOne({ _id: house_id }, {
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      available
    })
    return res.send();
  }

  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if(String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: "Não autorizado." });
    }

    await House.findByIdAndDelete({ _id: house_id });

    return res.json({ message: "Casa excluída com sucesso."});
  }
}

export default new HouseController();