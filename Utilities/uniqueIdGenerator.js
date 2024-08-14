import UserModel from "../Models/UserModel";

export async function generateUniqueUserId() {
  const generatedUserId = () => Math.floor(Math.random() * 9000) + 1000;
  const checkIdExists = async (id) => {
    const user = await UserModel.findOne({ userId: id });
    return user !== null;
  };
  const generateUniqueIdRecursive = async () => {
    const id = generatedUserId();
    const exists = await checkIdExists(id);
    if (exists) {
      return generateUniqueIdRecursive();
    } else {
      return id;
    }
  };
  return await generateUniqueIdRecursive();
}
