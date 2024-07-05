import Swal from 'sweetalert2';

const NotificationService = {
    success: (title, text) => {
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
        });
    },
    error: (title, text) => {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
        });
    },
    warning: (title, text) => {
        Swal.fire({
            icon: 'warning',
            title: title,
            text: text,
        });
    }
};

export default NotificationService;
// Toastify__toast