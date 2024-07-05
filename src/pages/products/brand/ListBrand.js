import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_ALL, GET_IMG, DELETE_ID } from '../../../api/apiService';
import Swal from 'sweetalert2';

export default function ListBrand() {
    const [brand, setBrand] = useState([]);
    useEffect(() => {
        fetchCategorys();
    }, []);

    const fetchCategorys = () => {
        GET_ALL('brand/show')
            .then(response => {
                setBrand(response.data);
            })
            .catch(error => {
                console.error(' fetching brand Error:', error);
            });
    };
    const handleDelete = (brandId) => {
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
                DELETE_ID(`brand/${brandId}`)
                    .then(response => {
                        Swal.fire('Đã xóa!', 'Thương hiệu đã được xóa.', 'success');
                        fetchCategorys(); // Refresh the product list
                    })
                    .catch(error => {
                        console.error('Error deleting brand:', error);
                        Swal.fire('', 'Không thể xóa thương hiệu vì đã có sản phẩm.', 'error');
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
                    <h4>Danh sách thương hiệu</h4>
                    <h6>Quản lý thương hiệu</h6>
                </div>
                <div className="page-btn">
                    <a href="/addbrand" className="btn btn-added">
                        <img src="/assets/img/icons/plus.svg" alt="img" className="me-1" />
                       Thêm danh mục
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
                                    <th>Tên danh mục</th>
                                    <th>Category slug</th>

                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brand.map(brand => (
                                    <tr key={brand.brandId}>
                                        <td>
                                            <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks"></span>
                                            </label>
                                        </td>
                                        <td className="productimgname">
                                                    <a href="/" className="product-img">
                                                        <img src={GET_IMG('brand', brand.thumbnail)} alt={brand.brandName} />
                                                    </a>
                                                    <a href="/">  {brand.brandName}</a>
                                                </td>
                                        <td>
                                          {brand.slug}
                                        </td>

                                        <td>
                                            {/* <a className="me-3" href={`/detailproduct/${brand.productId}`}>
                                                <img src="/assets/img/icons/eye.svg" alt="img" />
                                            </a> */}
                                            <a className="me-3" href={`/editbrand/${brand.brandId}`}>
                                                <img src="/assets/img/icons/edit.svg" alt="img" />
                                            </a>
                                            <Link className="confirm-text" onClick={() => handleDelete(brand.brandId)} >
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
