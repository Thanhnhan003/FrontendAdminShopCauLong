import React, { useState } from 'react';
import { POST_ADD } from '../../../api/apiService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName||!categoryDescription || !imageFile) {
      alert('Lỗi', 'Vui lòng điền tất cả các trường bắt buộc', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('categoryDescription', categoryDescription);

    formData.append('imageFile', imageFile);

    POST_ADD('category', formData)
      .then(response => {
        alert('Thành công', 'Danh mục đã được thêm thành công', 'success');
        navigate('/listcategory');
      })
      .catch(response => {
        console.log(response);
        alert('Lỗi', 'Không thể thêm danh mục', 'error');
      });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Danh mục</h4>
            <h6>Thêm danh mục</h6>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Tên danh mục</label>
                    <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
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
                        <img src="assets/img/icons/upload.svg" alt="upload icon" />
                        <h4>Kéo và thả tệp để tải lên</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="product-list">
                    <ul className="row">
                      {imagePreview && (
                        <li>
                          <div className="productviews">
                            <div className="productviewsimg">
                              <img src={imagePreview} alt="Selected" />
                            </div>
                            <div className="productviewscontent">
                              <div className="productviewsname">
                                <h2>{imageFile.name}</h2>
                                <h3>{(imageFile.size / 1024).toFixed(2)} KB</h3>
                              </div>
                              <a href="/" className="hideset" onClick={() => {
                                setImageFile(null);
                                setImagePreview(null);

                              }}>x</a>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>

                </div>


                <div className="col-lg-12">
                  <button type="submit" className="btn btn-submit me-2">Submit</button>
                  <a href="/productlist" className="btn btn-cancel">Cancel</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
