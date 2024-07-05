import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
    return (
        <>
            <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li className={location.pathname === "/dashboard" ? "active" : ""}>
                                <a href="/dashboard">
                                    <img src="/assets/img/icons/dashboard.svg" alt="img" />
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li className="submenu">
                                <a href="#st">
                                    <img src="/assets/img/icons/product.svg" alt="img" />
                                    <span>Sản phẩm</span> <span className="menu-arrow"></span>
                                </a>
                                <ul>
                                    <li><a href="/productlist" className={location.pathname === "/productlist" ? "active" : ""}>List Product</a></li>
                                    <li><a href="/addproduct" className={location.pathname === "/addproduct" ? "active" : ""}>Add Product</a></li>
                                    <li><a href="/listcategory" className={location.pathname === "/listcategory" ? "active" : ""}>List Category</a></li>
                                    <li><a href="/addcategory" className={location.pathname === "/addcategory" ? "active" : ""}>Add Category</a></li>
                                    <li><a href="/listbrand" className={location.pathname === "/listbrand" ? "active" : ""}>List Brand</a></li>
                                    <li><a href="/addbrand" className={location.pathname === "/addbrand" ? "active" : ""}>Add Brand</a></li>
                                </ul>
                            </li>
                            <li className={location.pathname === "/banners" ? "active" : ""}>
                                <a href="/banners">
                                    <img src="/assets/img/icons/banners.png" alt="img" />
                                    <span>Banners</span>
                                </a>
                            </li>
                            <li className={location.pathname === "/order" ? "active" : ""}>
                                <a href="/order">
                                    <img src="/assets/img/icons/sales1.svg" alt="img" />
                                    <span>Đơn hàng</span>
                                </a>
                            </li>
                            <li className={location.pathname === "/listnews" ? "active" : ""}>
                                <a href="/listnews">
                                    <img src="/assets/img/icons/news.svg" alt="img" />
                                    <span>Tin tức</span>
                                </a>
                            </li>

                            <li className={location.pathname === "/listusers" ? "active" : ""}>
                                <a href="/listusers">
                                    <img src="/assets/img/icons/users1.svg" alt="img" />
                                    <span>Tài khoản</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
