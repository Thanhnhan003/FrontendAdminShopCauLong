import React, { useState, useEffect } from 'react';
import { GET_ID, PUT_EDIT } from '../../api/apiService';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

export default function EditNew() {
    const { newsId } = useParams();
    const navigate = useNavigate();
    const [title, setNewsName] = useState('');
    const [content, setContent] = useState('');

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchNews();
    }, [newsId]);

    const fetchNews = () => {
        GET_ID('news/show', newsId)
            .then(response => {
                const news = response.data;
                setNewsName(news.title);
                setContent(news.content);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
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
        formData.append('newsName', title);
        formData.append('content', content);

        if (imageFile) {
            formData.append('imageFile', imageFile);
        }
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        PUT_EDIT(`news/${newsId}`, formData)
            .then(response => {
                Swal.fire('Thành công', 'Thương hiệu đã được cập nhật.', 'success');
                navigate('/listnews');
            })
            .catch(error => {
                console.log(error);
                Swal.fire('Lỗi', 'Bạn chưa thay đổi thông tin gì thương hiệu.', 'error');
                navigate('/listnews');
            });
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Thương hiệu</h4>
                        <h6>Sửa thương hiệu</h6>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-5 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Tên Tiêu đề</label>
                                        <input type="text" value={title} onChange={(e) => setNewsName(e.target.value)} />
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
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Hình ảnh thương hiệu</label>
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
                                    <a href="/listnews" className="btn btn-cancel">Cancel</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
