import House from "../models/House";
import User from "../models/User";

export async function isOwner(user_id, house_id) {
  const user = await User.findById(user_id);
  const house = await House.findById(house_id);

  if (!user || !house) {
    return false; 
  }

  return String(user._id) === String(house.user);
}