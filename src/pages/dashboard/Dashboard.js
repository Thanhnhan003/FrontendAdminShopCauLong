import React, { useEffect, useState } from 'react';
import { GET_ALL } from '../../api/apiService';
import NearlySoldOut from './NearlySoldOut';
const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(number);
};
export default function Dashboard() {
    const [statistics, setStatistics] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchStatistics();
        fetchTotalCount();
    }, []);

    const fetchStatistics = () => {
        GET_ALL('orders/statistics')
            .then(response => {
                setStatistics(response.data);
            })
            .catch(error => {
                console.error('Fetching orders error:', error);
            });
    };
    const fetchTotalCount = () => {
        GET_ALL('auth/user-statistics')
            .then(response => {
                setTotalCount(response.data);
            })
            .catch(error => {
                console.error('Fetching orders error:', error);
            });
    };
    return (
        <>
            <div class="page-wrapper">
                <div class="content">
                    <div class="row">
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="dash-widget">
                                <div class="dash-widgetimg">
                                    <span><img src="assets/img/icons/dash1.svg" alt="img" /></span>
                                </div>
                                <div class="dash-widgetcontent">
                                    <h5><span class="counters" data-count={statistics.orderCount}>Số lượng:{" "}{statistics.orderCount}</span></h5>
                                    <h6>Tổng đơn hàng chưa xử lý</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="dash-widget dash1">
                                <div class="dash-widgetimg">
                                    <span><img src="assets/img/icons/dash2.svg" alt="img" /></span>
                                </div>
                                <div class="dash-widgetcontent">
                                    <h5><span data-count={formatVND(statistics.revenue)}>{formatVND(statistics.revenue)}đ</span></h5>
                                    <h6>Tổng danh thu</h6>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6 col-12 d-flex">
                            <div class="dash-count">
                                <div class="dash-counts">
                                    <h4>{totalCount.userCount}</h4>
                                    <h5>Khách hàng</h5>
                                </div>
                                <div class="dash-imgs">
                                    <i data-feather="user"></i>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-12 d-flex">
                            <div class="dash-count das1">
                                <div class="dash-counts">
                                    <h4>{totalCount.adminCount}</h4>
                                    <h5>Quản trị viên</h5>
                                </div>
                                <div class="dash-imgs">
                                    <i data-feather="user-check"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                    <NearlySoldOut />
                </div>
            </div></>
    )
}
