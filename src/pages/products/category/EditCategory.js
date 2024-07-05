import React, { useState, useEffect } from 'react';
import { GET_ID, PUT_EDIT } from '../../../api/apiService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditCategory() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchCategory();
    }, [categoryId]);

    const fetchCategory = () => {
        GET_ID('category/show', categoryId)
            .then(response => {
                const category = response.data;
                setCategoryName(category.categoryName);
                setCategoryDescription(category.categoryDescription);

                // Load existing images if needed
            })
            .catch(error => {
                console.error('Error fetching category:', error);
            });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('categoryName', categoryName);
        formData.append('categoryDescription', categoryDescription);

        if (imageFile) {
            formData.append('imageFile', imageFile);
        }
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        PUT_EDIT(`category/${categoryId}`, formData)
            .then(response => {
                alert('Danh mục đã được cập nhật.');
                navigate('/listcategory');
            })
            .catch(error => {
                console.log(error);
                alert('Bạn chưa thay đổi thông tin gì danh mục.');
                navigate('/listcategory');
            });
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Danh mục</h4>
                        <h6>Sửa danh mục</h6>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Tên danh mục</label>
                                        <input
                                            type="text"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-9 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Thông tin thương hiệu</label>
                                        <input type="text" value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Hình ảnh danh mục</label>
                                        <div className="image-upload">
                                            <input type="file" onChange={handleImageChange} />
                                            <div className="image-uploads">
                                                <img src="/assets/img/icons/upload.svg" alt="upload icon" />
                                                <h4>Kéo và thả tệp để tải lên</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    {imagePreview && (
                                        <div className="product-list">
                                            <ul className="row">
                                                <li>
                                                    <div className="productviews">
                                                        <div className="productviewsimg">
                                                            <img src={imagePreview} alt="Selected" />
                                                        </div>
                                                        <div className="productviewscontent">
                                                            <div className="productviewsname">
                                                                <h2>{imageFile?.name || 'No file selected'}</h2>
                                                                <h3>{imageFile ? `${(imageFile.size / 1024).toFixed(2)} KB` : 'NaN KB'}</h3>
                                                            </div>
                                                            <a href="/" className="hideset" onClick={() => {
                                                                setImageFile(null);
                                                                setImagePreview(null);
                                                            }}>x</a>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <div className="col-lg-12">
                                    <button type="submit" className="btn btn-submit me-2">Submit</button>
                                    <a href="/listcategory" className="btn btn-cancel">Cancel</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
