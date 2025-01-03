import House from "../models/House";
import User from "../models/User";
import * as Yup from 'yup';

export async function isOwner(user_id, house_id) {
  const user = await User.findById(user_id);
  const house = await House.findById(house_id);

  if (!user || !house) {
    return false; 
  }

  return String(user._id) === String(house.user);
}

export async function isValidSchema(requestData) {
  const schema = Yup.object().shape({
    description: Yup.string().required(),
    price: Yup.number().required(),
    location: Yup.string().required(),
    available: Yup.boolean().required(),
  });

  // Retorna `true` se for válido e `false` caso contrário
  return await schema.isValid(requestData);
}