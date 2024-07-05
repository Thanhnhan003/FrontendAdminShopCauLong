import React, { useEffect, useState } from 'react';
import { GET_ALL, GET_IMG } from '../../api/apiService';
export default function NearlySoldOut() {
    const [productout, setProductout] = useState([]);

    useEffect(() => {
        fetchProductout();
    }, []);

    const fetchProductout = () => {
        GET_ALL('products/low-quantity')
            .then(response => {
                setProductout(response.data);
            })
            .catch(error => {
                console.error('Fetching orders error:', error);
            });
    };
    return (
        <div class="card mb-0">
            <div class="card-body">
                <h4 class="card-title">Sản phẩm gần hết hàng</h4>
                <div class="table-responsive dataview">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Thương hiệu</th>
                                <th>Danh mục</th>
                                <th>Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productout.map((product, index) => (
                                <tr key={product.productId}>
                                    <td>{index + 1}</td>
                                    <td className="productimgname">
                                        <a href="/" className="product-img">
                                            <img src={GET_IMG('products', product.galleries[0].thumbnail)} alt={product.productName} />
                                        </a>
                                        <a href="/">{product.productName}</a>
                                    </td>
                                    <td>{product.category.categoryName}</td>
                                    <td>{product.brand.brandName}</td>
                                    <td>{product.quantity}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
