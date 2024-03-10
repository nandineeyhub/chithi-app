import { toast, ToastContainer } from 'react-toastify';

export const SuccessMessage = ({message}) => {
   toast.success(message, {
        position: "top-center"
      });
}

export const ErrorMessage = ({message}) => {
    toast.error(message, {
        position: "top-left"
      });
}