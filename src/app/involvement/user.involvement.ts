import { userModel } from '../model/user.model';

export class user {
  static Convert(): userModel {
    return {
      adress: 'string',
      email: 'string',
      fullName: 'string',
      phone: 'string',
    };
  }
}
