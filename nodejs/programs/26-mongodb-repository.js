export class UsersRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  findByEmail(email) {
    return this.userModel.findOne({email}).lean();
  }

  create(user) {
    return this.userModel.create(user);
  }

  list({limit = 20, cursor}) {
    const query = cursor ? {_id: {$gt: cursor}} : {};

    return this.userModel
      .find(query)
      .sort({_id: 1})
      .limit(limit)
      .lean();
  }
}

