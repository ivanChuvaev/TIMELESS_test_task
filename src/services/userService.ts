import { TRawUser, TUser } from '../types';

class UserService {

  constructor() {}

  async getUsers() {
    return fetch('https://randomuser.me/api?results=500')
      .then((res) => res.json())
      .then((data: { results: TRawUser[] }): TUser[] => (
        data.results.map((rawUser) => ({
          uuid: rawUser.login.uuid,
          address: `${rawUser.location.city}, ${rawUser.location.state}, ${rawUser.location.country}`,
          birthday: new Date(rawUser.dob.date),
          age: rawUser.dob.age,
          email: rawUser.email,
          firstName: rawUser.name.first,
          lastName: rawUser.name.last,
          gender: rawUser.gender,
          phone: rawUser.phone,
          picture: rawUser.picture.medium
        }))
      ))
  }
}

const userService = new UserService()

export default userService;

