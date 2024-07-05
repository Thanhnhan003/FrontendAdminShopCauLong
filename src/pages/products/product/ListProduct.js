import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_ALL, GET_IMG, DELETE_ID } from '../../../api/apiService';
import Swal from 'sweetalert2';

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [currentPage, productsPerPage]);

    const fetchProducts = () => {
        GET_ALL('products/show')
            .then(response => {
                const processedProducts = response.data.map(product => ({
                    ...product,
                    processedName: removeDiacritics(product.productName)
                }));
                setProducts(processedProducts);
            })
            .catch(error => {
                console.error('Fetching products error:', error);
            });
    };

    const handleDelete = (productIds) => {
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
                Promise.all(productIds.map(productId => DELETE_ID(`products/delete/${productId}`)))
                    .then(() => {
                        Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa.', 'success');
                        fetchProducts(); // Refresh the product list
                        setSelectedProducts([]); // Clear selected products
                    })
                    .catch(error => {
                        console.error('Error deleting product:', error);
                        Swal.fire('Lỗi', 'Không thể xóa sản phẩm.', 'error');
                    });
            }
        });
    };

    const handleSelectProduct = (productId) => {
        setSelectedProducts(prevSelected => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter(id => id !== productId);
            } else {
                return [...prevSelected, productId];
            }
        });
    };

    const handleSelectAllProducts = (e) => {
        if (e.target.checked) {
            const allProductIds = currentProducts.map(product => product.productId);
            setSelectedProducts(allProductIds);
        } else {
            setSelectedProducts([]);
        }
    };

    const removeDiacritics = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        removeDiacritics(product.productName).toLowerCase().includes(removeDiacritics(searchTerm).toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleProductsPerPageChange = (e) => setProductsPerPage(Number(e.target.value));

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Danh sách sản phẩm</h4>
                            <h6>Quản lý sản phẩm của bạn</h6>
                        </div>
                        <div className="page-btn">
                            <a href="/addproduct" className="btn btn-added">
                                <img src="/assets/img/icons/plus.svg" alt="img" className="me-1" />
                                Thêm sản phẩm mới
                            </a>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div className="table-top">
                                <div className="search-set">
                                    <div className="search-input">
                                        <a href='#st' className="btn btn-searchset"><img src="/assets/img/icons/search-white.svg" alt="img" /></a>
                                        <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                            <label>
                                                <input type="search" className="form-control form-control-sm" placeholder="Search..." aria-controls="DataTables_Table_0" value={searchTerm} onChange={handleSearch} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="wordset" onClick={() => handleDelete(selectedProducts)}>
                                    <img src="/assets/img/icons/delete.svg" alt="img" />
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <label className="checkboxs">
                                                    <input type="checkbox" id="select-all" onChange={handleSelectAllProducts} checked={selectedProducts.length === currentProducts.length} />
                                                    <span className="checkmarks"></span>
                                                </label>
                                            </th>
                                            <th>Product Name</th>
                                            <th>Category</th>
                                            <th>Brand</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentProducts.map((product) => (
                                            <tr key={product.productId}>
                                                <td>
                                                    <label className="checkboxs">
                                                        <input type="checkbox" onChange={() => handleSelectProduct(product.productId)} checked={selectedProducts.includes(product.productId)} />
                                                        <span className="checkmarks"></span>
                                                    </label>
                                                </td>
                                                <td className="productimgname" >
                                                    <a href={`/detailproduct/${product.productId}`} className="product-img">
                                                        <img style={{height:"70px",width:"70px"}} src={GET_IMG('products', product.galleries[0].thumbnail)} alt={product.productName} />
                                                    </a>
                                                    <a href={`/detailproduct/${product.productId}`}>{product.productName}</a>
                                                </td>
                                                <td>{product.category.categoryName}</td>
                                                <td>{product.brand.brandName}</td>
                                                <td>{product.productPrice}</td>
                                                <td>{product.quantity}</td>
                                                <td>
                                                    <a className="me-3" href={`/detailproduct/${product.productId}`}>
                                                        <img src="/assets/img/icons/eye.svg" alt="img" />
                                                    </a>
                                                    <a className="me-3" href={`/editproduct/${product.productId}`}>
                                                        <img src="/assets/img/icons/edit.svg" alt="img" />
                                                    </a>
                                                    <Link className="confirm-text" onClick={() => handleDelete([product.productId])}>
                                                        <img src="/assets/img/icons/delete.svg" alt="img" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="dataTables_length" id="DataTables_Table_0_length">
                                    <label>
                                        <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm" onChange={handleProductsPerPageChange} value={productsPerPage}>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="dataTables_paginate paging_numbers" id="DataTables_Table_0_paginate">
                                    <ul className="pagination">
                                        {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(number => (
                                            <li key={number + 1} className={`paginate_button page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                                                <a href="#st" aria-controls="DataTables_Table_0" data-dt-idx={number} tabIndex="0" className="page-link" onClick={() => handlePageChange(number + 1)}>
                                                    {number + 1}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
