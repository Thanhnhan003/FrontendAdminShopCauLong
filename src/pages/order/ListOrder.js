import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_ALL, GET_IMG, DELETE_ID } from '../../api/apiService';
import Swal from 'sweetalert2';

export default function ListOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        GET_ALL('orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Fetching orders error:', error);
            });
    };


    const getStatusLabel = (status) => {
        switch (status) {
            case "1":
                return { label: "Chưa xử lý", className: "badges bg-lightred" };
            case "2":
                return { label: "Đang vận chuyển", className: "badges bg-lightyellow" };
            case "3":
                return { label: "Đã giao hàng", className: "badges bg-lightgreen" };
            default:
                return { label: "Từ chối đơn hàng", className: "badges bg-lightred" };
        }
    };
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Danh sách đơn hàng</h4>
                            <h6>Quản lý đơn hàng của bạn</h6>
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
                                            <th>Tên khách hàng</th>
                                            <th>Email</th>
                                            <th>Thời gian đặt hàng</th>
                                            <th>Trạng thái đơn hàng</th>
                                            <th>Phương thức thanh toán</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.orderId}>
                                                <td>
                                                    <label className="checkboxs">
                                                        <input type="checkbox" />
                                                        <span className="checkmarks"></span>
                                                    </label>
                                                </td>
                                                <td>{order.user.fullname}</td>
                                                <td>{order.user.email}</td>
                                                <td>{order.orderTime}</td>
                                                <td>
                                                    <span className={getStatusLabel(order.status).className}>
                                                        {getStatusLabel(order.status).label}
                                                    </span>
                                                </td>
                                                <td>{order.namePayment}</td>
                                                <td>
                                                    <a className="me-3" href={`/orderdetail/${order.orderId}`}>
                                                        <img src="/assets/img/icons/eye.svg" alt="img" />
                                                    </a>
                                                    <a className="me-3" href={`/editorder/${order.orderId}`}>
                                                        <img src="/assets/img/icons/edit.svg" alt="img" />
                                                    </a>

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
    );
}
