import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_ALL, GET_IMG, DELETE_ID } from '../../../api/apiService';
import Swal from 'sweetalert2';

export default function ListCategory() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategorys();
    }, []);

    const fetchCategorys = () => {
        GET_ALL('category/show')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error(' fetching categories Error:', error);
            });
    };
    const handleDelete = (categoryId) => {
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
                DELETE_ID(`category/${categoryId}`)
                    .then(response => {
                        Swal.fire('Đã xóa!', 'Danh mục đã được xóa.', 'success');
                        fetchCategorys(); // Refresh the product list
                    })
                    .catch(error => {
                        console.error('Error deleting category:', error);
                        Swal.fire('', 'Không thể xóa danh mục vì đã có sản phẩm.', 'error');
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
                    <h4>Category List</h4>
                    <h6>Manage your Category</h6>
                </div>
                <div className="page-btn">
                    <a href="/addcategory" className="btn btn-added">
                        <img src="/assets/img/icons/plus.svg" alt="img" className="me-1" />
                        Add New Category
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
                                    <th>Category Name</th>
                                    <th>Category slug</th>

                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category => (
                                    <tr key={category.categoryId}>
                                        <td>
                                            <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks"></span>
                                            </label>
                                        </td>
                                        <td className="productimgname">
                                                    <a href="/" className="product-img">
                                                        <img src={GET_IMG('category', category.thumbnail)} alt={category.categoryName} />
                                                    </a>
                                                    <a href="/">  {category.categoryName}</a>
                                                </td>
                                        <td>
                                          {category.slug}
                                        </td>

                                        <td>
                                            {/* <a className="me-3" href={`/detailproduct/${category.productId}`}>
                                                <img src="/assets/img/icons/eye.svg" alt="img" />
                                            </a> */}
                                            <a className="me-3" href={`/editcategory/${category.categoryId}`}>
                                                <img src="/assets/img/icons/edit.svg" alt="img" />
                                            </a>
                                            <Link className="confirm-text" onClick={() => handleDelete(category.categoryId)} >
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
