import { toast } from "react-toastify";

export const showAlert = (message, type = "default", autoClose = 2000) => {
  let toastId = localStorage.getItem("toastId");
  if (!toast.isActive(toastId)) {
    toastId = toast(message, {
      autoClose: autoClose,
      type,
      position: "bottom-center",
    });
    localStorage.setItem("toastId", toastId);
  } else {
    toast.update(toastId, {
      render: message,
      type,
      autoClose: autoClose,
      theme: "dark",
    });
  }
};
