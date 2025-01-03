import House from "../models/House";
import { isOwner, isValidSchema } from "../config/utils";

class HouseController {

  async index(req, res) {
    const { available } = req.query;

    const houses = await House.find({ available });

    return res.json(houses);
  }

  async store(req, res) {
    try {
      if(!(await isValidSchema(req.body))) {
        return res.status(400).json({ error: "Falha na validação."})
      }
  
      const { filename } = req.file;
      const { user_id } = req.headers;
      const { description, price, location, available } = req.body;
  
      const house = await House.create({
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        available,
      });
  
      return res.json(house);
    } catch {
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  

  async update(req, res) {
    try {
      if(!(await isValidSchema(req.body))) {
        return res.status(400).json({ error: "Falha na validação."})
      }

      const { filename } = req.file;
      const { house_id } = req.params;
      const { user_id } = req.headers;
      const { description, price, location, available } = req.body;

      const owner = await isOwner(user_id, house_id);
  
      if (!owner) {
        return res.status(401).json({ error: "Não autorizado." });
      }
  
      await House.updateOne(
        { _id: house_id },
        {
          user: user_id,
          thumbnail: filename,
          description,
          price,
          location,
          available,
        }
      );
  
      return res.status(200).json({ message: "Casa atualizada com sucesso." });
    } catch {
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  async destroy(req, res) {
    try {
      const { house_id } = req.body;
      const { user_id } = req.headers;

      const owner = await isOwner(user_id, house_id);
  
      if (!owner) {
        return res.status(401).json({ error: "Não autorizado." });
      }

      await House.findByIdAndDelete({ _id: house_id });

      return res.status(200).json({ message: "Casa excluída com sucesso."});
    } catch {
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

export default new HouseController();