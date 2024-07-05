import React, { useState } from 'react';
import { POST_ADD } from '../../api/apiService';
import { useNavigate } from 'react-router-dom';
import loadingAnimation from "../../component/LoadingAnimotation.json";
import Lottie from 'react-lottie';
export default function AddBanners() {
  const [bannerName, setBannerName] = useState('');
  const [bannerDescription, setBannerDescription] = useState('');
  const [urlLink, setUrlLink] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!bannerName || !bannerDescription || !imageFile || !urlLink) {
      alert('Lỗi', 'Vui lòng điền tất cả các trường bắt buộc', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('bannerName', bannerName);
    formData.append('bannerDescription', bannerDescription);
    formData.append('urlLink', urlLink);
    formData.append('file', imageFile);
    formData.append('enabled', 1);
    POST_ADD('banners/add', formData)
      .then(response => {
        setLoading(false);
        alert('Thành công', 'Banner đã được thêm thành công', 'success');
        navigate('/banners');
        window.location.reload();
      })
      .catch(response => {
        setLoading(false);
        console.log(response);
        alert('Lỗi', 'Không thể thêm banner', 'error');
      });
  };
    //=====================================================

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Banners</h4>
            <h6>Thêm banners</h6>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Tên banners</label>
                    <input
                      type="text"
                      value={bannerName}
                      onChange={(e) => setBannerName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Thông tin banners</label>
                    <input
                      type="text"
                      value={bannerDescription}
                      onChange={(e) => setBannerDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-5 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Url link banners</label>
                    <input
                      type="text"
                      value={urlLink}
                      onChange={(e) => setUrlLink(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Hình ảnh banners</label>
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
                  <a href="/listbanners" className="btn btn-cancel">Cancel</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading && (
                <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            )}
    </div>
  );
}
