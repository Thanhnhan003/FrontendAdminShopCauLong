import axios from 'axios';
import Cookies from 'js-cookie';

class CloudinaryUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);

                const token = Cookies.get('tokenAdmin');

                axios.post('http://localhost:8080/upload/image', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    resolve({
                        default: response.data.secure_url
                    });
                })
                .catch(error => {
                    console.error('Error uploading to Cloudinary', error);
                    reject(error);
                });
            }));
    }

    abort() {
        // Handle abort if necessary
    }
}

export default CloudinaryUploadAdapter;
