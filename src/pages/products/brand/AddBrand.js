import React, { useState } from 'react';
import { POST_ADD } from '../../../api/apiService';
import { useNavigate } from 'react-router-dom';

export default function AddBrand() {
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');

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

    if (!brandName||!brandDescription || !imageFile) {
      alert('Lỗi', 'Vui lòng điền tất cả các trường bắt buộc', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('brandName', brandName);
    formData.append('brandDescription', brandDescription);

    formData.append('imageFile', imageFile);

    POST_ADD('brand', formData)
      .then(response => {
        alert('Thành công', 'Thương hiệu đã được thêm thành công', 'success');
        navigate('/listbrand');
      })
      .catch(response => {
        console.log(response);
        alert('Lỗi', 'Không thể thêm thương hiệu', 'error');
      });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Thương hiệu</h4>
            <h6>Thêm thương hiệu</h6>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Tên thương hiệu</label>
                    <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                  </div>
                </div>
                <div className="col-lg-9 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Thông tin thương hiệu</label>
                    <input type="text" value={brandDescription} onChange={(e) => setBrandDescription(e.target.value)} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Hình ảnh thương hiệu</label>
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
                              <a href="#st" className="hideset" onClick={() => {
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
