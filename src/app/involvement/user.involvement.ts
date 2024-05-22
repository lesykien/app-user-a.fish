import { otpCode, userModel, userRequest } from '../model/user.model';

export class user {
  static Convert(): userModel {
    return {
      adress: 'string',
      email: 'string',
      fullName: 'string',
      phone: 'string',
    };
  }

  static ConsUserRequest(model: userModel): userRequest {
    const id: number = Number(localStorage.getItem('idUser'));
    return {
      id: id,
      phone: model.phone,
      address: model.adress,
      fullName: model.fullName,
      email: model.email,
    };
  }

  static RenderNew(): otpCode {
    return {
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
    };
  }

  static ConverString(item: otpCode): string {
    return `${item.otp1}${item.otp2}${item.otp3}${item.otp4}${item.otp5}${item.otp6}`;
  }
}
