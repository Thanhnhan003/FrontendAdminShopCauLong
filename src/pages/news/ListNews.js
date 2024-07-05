import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_ALL, GET_IMG, DELETE_ID } from '../../api/apiService';
import Swal from 'sweetalert2';

export default function ListNews() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {
        GET_ALL('news/show')
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error(' fetching news Error:', error);
            });
    };
    const handleDelete = (newsId) => {
        Swal.fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn sẽ không thể hoàn tác điều này!',
            showCancelButton: true,
            confirmButtonColor: '#ff9f43',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Có, xóa nó!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                DELETE_ID(`news/${newsId}`)
                    .then(response => {
                        Swal.fire('Đã xóa!', 'Thương hiệu đã được xóa.', 'success');
                        fetchNews(); // Refresh the product list
                    })
                    .catch(error => {
                        console.error('Error deleting news:', error);
                        Swal.fire('', 'Không thể xóa tin tức vì đã có sản phẩm.', 'error');
                    });
            }
        });
    };
  return (
    <>
    <div className="page-wrapper">
        <div className="content">
            <div className="page-header">
                <div className="page-title">
                    <h4>Danh sách tin tức</h4>
                    <h6>Quản lý tin tức</h6>
                </div>
                <div className="page-btn">
                    <a href="/addnews" className="btn btn-added">
                        <img src="/assets/img/icons/plus.svg" alt="img" className="me-1" />
                       Thêm tin tức
                    </a>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>
                                        <label className="checkboxs">
                                            <input type="checkbox" id="select-all" />
                                            <span className="checkmarks"></span>
                                        </label>
                                    </th>
                                    <th>Tên tin tức</th>
                                    <th>Tin tức slug</th>

                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.map(news => (
                                    <tr key={news.newsId}>
                                        <td>
                                            <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks"></span>
                                            </label>
                                        </td>
                                        <td className="productimgname">
                                                    <a href="/" className="product-img">
                                                        <img src={GET_IMG('news', news.thumbnail)} alt={news.newsName} />
                                                    </a>
                                                    <a href="/">{news.title}</a>
                                                </td>
                                        <td>
                                          {news.slug}
                                        </td>

                                        <td>
                                            <a className="me-3" href={`/detailnews/${news.newsId}`}>
                                                <img src="/assets/img/icons/eye.svg" alt="img" />
                                            </a>
                                            <a className="me-3" href={`/editnews/${news.newsId}`}>
                                                <img src="/assets/img/icons/edit.svg" alt="img" />
                                            </a>
                                            <Link className="confirm-text" onClick={() => handleDelete(news.newsId)} >
                                                <img src="/assets/img/icons/delete.svg" alt="img" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
  )
}
