import UserModel from "../domain/user.model";

export class UserRepository {
  async updateProfile(userId: string, data: any) {
    return await UserModel.findByIdAndUpdate(userId, data, { new: true });
  }

  async getUser(userId: string) {
    return await UserModel.findById(userId);
  }
}