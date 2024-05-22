interface userModel {
  adress: string;
  email: string;
  fullName: string;
  phone: string;
}

interface userRequest {
  id: number;
  email: string;
  phone: string;
  fullName: string;
  address: string;
}

interface otpCode {
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;
}

export { userModel, otpCode, userRequest };
