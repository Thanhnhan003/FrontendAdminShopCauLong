import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_ID, PUT_EDIT } from '../../api/apiService';

export default function EditOrder() {
    const { orderId } = useParams();
    const [orderStatus, setOrderStatus] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = () => {
        GET_ID('orders', orderId)
            .then(response => {
                setOrderStatus(response.data.status);
            })
            .catch(error => {
                console.error('Fetching order error:', error);
            });
    };
    const updateStatus = (status) => {
        const formData = new FormData();
        formData.append('orderId', orderId);
        formData.append('status', status);
        PUT_EDIT('orders/update-status', formData)
            .then(response => {
                setMessage(response.data);
                setOrderStatus(status);
            })
            .catch(error => {
                console.error('Updating order status error:', error.config.data);
            });
    };
    const handleStep2Click = () => {
        updateStatus('2');
    };

    const handleStep3Click = () => {
        updateStatus("3");
    };
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <section className="vh-100" style={{ backgroundColor: '#8c9eff' }}>
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12">
                                    <div className="card card-stepper" style={{ borderRadius: '16px' }}>
                                        <div className="card-body p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <div>
                                                    <h5 className="mb-0">INVOICE <span className="text-primary font-weight-bold">#Y34XDHR</span></h5>
                                                </div>
                                                <div className="text-end">
                                                    <p className="mb-0">Expected Arrival <span>01/12/19</span></p>
                                                    <p className="mb-0">USPS <span className="font-weight-bold">234094567242423422898</span></p>
                                                </div>
                                            </div>
                                            <ul id="progressbar-2" className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2">
                                                <li className={`step0 text-center ${orderStatus >= "1" ? 'active' : ''}`} id="step1"></li>
                                                <li className={`step0 text-center ${orderStatus >= "2" ? 'active' : ''}`} id="step2"></li>
                                                <li className={`step0 text-center ${orderStatus >= "3" ? 'active' : ''}`} id="step3"></li>
                                            </ul>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-lg-flex align-items-center">
                                                    <i className="fas fa-clipboard-list fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                                                    <div>
                                                        <p className="fw-bold mb-1">Đơn hàng</p>
                                                        <p className="fw-bold mb-0">Chưa xử lý</p>
                                                    </div>
                                                </div>
                                                <div className="d-lg-flex align-items-center">
                                                    <i className="fas fa-shipping-fast fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                                                    <div>
                                                        <p className="fw-bold mb-1">Order</p>
                                                        <p className="fw-bold mb-0">Đang vận chuyển</p>
                                                    </div>
                                                </div>
                                                <div className="d-lg-flex align-items-center">
                                                    <i className="fas fa-home fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                                                    <div>
                                                        <p className="fw-bold mb-1">Order</p>
                                                        <p className="fw-bold mb-0">Đã giao hàng</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between" style={{padding:10}}>
                                                <div className="d-lg-flex align-items-center">
                                                </div>
                                                <div className="d-lg-flex align-items-center">
                                                    {orderStatus === "1" && (
                                                        <button style={{borderRadius:"5px",padding:5,backgroundColor:"#00b14f",fontWeight:"bold",color:"white"}} onClick={handleStep2Click}>Vận chuyển</button>
                                                    )}  
                                                </div>
                                                <div className="d-lg-flex align-items-center">
                                                    {orderStatus === "2" && (
                                                        <button style={{borderRadius:"5px",padding:5,backgroundColor:"#00b14f",fontWeight:"bold",color:"white"}} onClick={handleStep3Click}>Hoàn thành</button>
                                                    )}
                                                </div>
                                            </div>
                                            {/* {orderStatus === "3" && (
                                                <p style={{ textAlign: "center", padding: "30px" }}>Đơn hàng đã giao thành công</p>
                                            )} */}
                                            {message && (
                                                <p style={{ textAlign: "center",fontSize:"20px", padding: "10px", color: "green" }}>{message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
