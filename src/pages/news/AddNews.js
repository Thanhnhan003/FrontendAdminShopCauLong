import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { POST_ADD } from '../../api/apiService';
import { useNavigate } from 'react-router-dom';
import CloudinaryUploadAdapter from './CloudinaryUploadAdapter'; 

export default function AddNews() {
  const [newsName, setNewsName] = useState('');
  const [content, setContent] = useState('');
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

    if (!newsName || !imageFile) {
      alert('Lỗi', 'Vui lòng điền tất cả các trường bắt buộc', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('newsName', newsName);
    formData.append('content', content);
    formData.append('imageFile', imageFile);

    POST_ADD('news', formData)
      .then(response => {
        alert('Thành công', 'Tin tức đã được thêm thành công', 'success');
        navigate('/listnews');
      })
      .catch(response => {
        console.log(response);
        alert('Hãy thêm ảnh', 'Không thể thêm tin tức', 'error');
      });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Tin tức</h4>
            <h6>Thêm tin tức</h6>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-5 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Tên Tiêu đề</label>
                    <input
                      type="text"
                      value={newsName}
                      onChange={(e) => setNewsName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Nội dung</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={content}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                      }}
                      onReady={editor => {
                        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                          return new CloudinaryUploadAdapter(loader);
                        };
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Hình ảnh tin tức</label>
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
                              <a
                                href="/"
                                className="hideset"
                                onClick={() => {
                                  setImageFile(null);
                                  setImagePreview(null);
                                }}
                              >
                                x
                              </a>
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button type="submit" className="btn btn-submit me-2">
                    Submit
                  </button>
                  <a href="/productlist" className="btn btn-cancel">
                    Cancel
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
