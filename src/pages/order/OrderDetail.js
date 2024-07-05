import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GET_ID, GET_IMG } from '../../api/apiService';
const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(number);
};

export default function OrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrderDetail();
    }, []);

    const fetchOrderDetail = () => {
        GET_ID(`orders`, orderId)
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.error('Fetching order detail error:', error);
            });
    };

    if (!order) {
        return <div>Loading...</div>;
    }
    const totalQuantity = order.orderDetails.reduce((sum, detail) => sum + detail.quantity, 0);
    const totalPrice = order.orderDetails.reduce((sum, detail) => sum + (detail.quantity * detail.price), 0);
    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Chi tiết đơn hàng</h4>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h4 style={{ fontWeight: 'bold', textAlign: "center" }}>1. Thông tin khách hàng</h4>
                                    <p>Tên: {order.user.fullname}</p>
                                    <p>Email: {order.user.email}</p>
                                    <p>Thời gian đặt: {order.orderTime}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h4 style={{ fontWeight: 'bold', textAlign: "center" }}>2. Thông tin địa chỉ giao hàng</h4>
                                    <p>Người nhận: {order.deliveryAddressUser.consigneeName}</p>
                                    <p>Địa chỉ: {order.deliveryAddressUser.addressDetail}, {order.deliveryAddressUser.address}</p>
                                    <p>Số điện thoại: {order.deliveryAddressUser.phone}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h4 style={{ fontWeight: 'bold', textAlign: "center" }}>3.Thông tin sản phẩm đặt hàng</h4>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Ảnh sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Thương hiệu</th>
                                        <th>Loại sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Tổng giá</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderDetails.map(detail => (
                                        <tr key={detail.orderDetailId}>
                                            <td>
                                                <Link to={`/detailproduct/${detail.product.productId}`}>
                                                    <img style={{ maxWidth: 100, width: "100%" }} src={GET_IMG('products', detail.product.galleries[0].thumbnail)} alt={detail.product.productName}></img>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`/detailproduct/${detail.product.productId}`}>
                                                    {detail.product.productName}
                                                </Link>
                                            </td>
                                            <td>{detail.product.brand.brandName}</td>
                                            <td>{detail.product.category.categoryName}</td>
                                            <td>{detail.quantity}</td>
                                            <td>{formatVND(detail.price)}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ fontWeight: 'bold', marginTop: '20px' }}>
                            <p>Tổng số lượng: {totalQuantity} sản phẩm</p>
                            <p>Tổng giá: {formatVND(totalPrice)} VND</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}