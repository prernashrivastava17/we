import { doGet, doPost, doPut } from "./request";

export const registerUser = async (data) => {
  return await doPost("api/user/userRegistration", data);
};

export const updateUser = async (data) => {
  return await doPut("api/user/updateProfile", data);
};

export const loginUser = async (userName, password) => {
  const response = await doPost("api/user/userlogin", {
    userName,
    password,
  });

  return response;
};

export const forgotPassword = async (email) => {
  return await doPost("api/user/forgotPassword", { email });
};

export const changePassword = async (data) => {
  return await doPost("api/user/changePassword", data);
};
export const verifyotp = async (data) => {
  return await doPost("api/user/checkOtpisVailid", data);
};

export const resetPassword = async (data) => {
  return await doPost("api/user/resetPassword", data);
};

export const EmailVerification = async (verficationToken) => {
  return await doGet(`api/user/emailVerification/${verficationToken}`);
};

export const getUserDetailsByToken = async () => {
  const response = await doPost("api/user/getUserByToken");

  return response;
};
