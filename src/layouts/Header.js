import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT, GET_USER_INFO, GET_IMG } from '../api/apiService';

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        LOGOUT();
        navigate('/');
        window.location.reload();

    };
    const [user, setUser] = useState([]);

    useEffect(() => {
        GET_USER_INFO('auth/show/info')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, []);
    const defaultAvatar = "/assets/img/avatar.jpg";
    const userAvatar = user.avatar ? GET_IMG('auth', user.avatar) : defaultAvatar;
    return (
        <>
            <div class="header">

                <div class="header-left active">
                <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
  <img style={{ height: '45px', width: '45px', marginRight: '8px' }} src="/LogoNhanSports.png" alt="" />
  NhanSports
</a>

                    <a href="/" class="logo-small">
                        <img src="/LogoNhanSports.png" alt="" />
                    </a>
                    <a id="toggle_btn" href="/">
                    </a>
                </div>

                <a id="mobile_btn" class="mobile_btn" href="#sidebar">
                    <span class="bar-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </a>

                <ul class="nav user-menu">

                    {/* <li class="nav-item">
                        <div class="top-nav-search">
                            <a href="/" class="responsive-search">
                                <i class="fa fa-search"></i>
                            </a>
                            <form action="#">
                                <div class="searchinputs">
                                    <input type="text" placeholder="Search Here ..." />
                                    <div class="search-addon">
                                        <span><img src="/assets/img/icons/closes.svg" alt="img" /></span>
                                    </div>
                                </div>
                                <a class="btn" id="searchdiv"><img src="/assets/img/icons/search.svg" alt="img" /></a>
                            </form>
                        </div>
                    </li> */}


                    <li class="nav-item dropdown has-arrow flag-nav">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/"
                            role="button">
                            <img src="/assets/img/flags/vietnam.png" alt="" height="20" />
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a href="/" class="dropdown-item">
                                <img src="/assets/img/flags/vietnam.png" alt="" height="16" /> Vietnam
                            </a>
                            <a href="/" class="dropdown-item">
                                <img src="/assets/img/flags/us.png" alt="" height="16" /> English
                            </a>

                        </div>
                    </li>


                    {/* <li class="nav-item dropdown">
                        <a href="/" class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                            <img src="/assets/img/icons/notification-bing.svg" alt="img" /> <span
                                class="badge rounded-pill">4</span>
                        </a>
                        <div class="dropdown-menu notifications">
                            <div class="topnav-dropdown-header">
                                <span class="notification-title">Notifications</span>
                                <a href="javascript:void(0)" class="clear-noti"> Clear All </a>
                            </div>
                            <div class="noti-content">
                                <ul class="notification-list">
                                    <li class="notification-message">
                                        <a href="activities.html">
                                            <div class="media d-flex">
                                                <span class="avatar flex-shrink-0">
                                                    <img alt="" src="/assets/img/profiles/avatar-02.jpg" />
                                                </span>
                                                <div class="media-body flex-grow-1">
                                                    <p class="noti-details"><span class="noti-title">John Doe</span> added
                                                        new task <span class="noti-title">Patient appointment booking</span>
                                                    </p>
                                                    <p class="noti-time"><span class="notification-time">4 mins ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="notification-message">
                                        <a href="activities.html">
                                            <div class="media d-flex">
                                                <span class="avatar flex-shrink-0">
                                                    <img alt="" src="/assets/img/profiles/avatar-03.jpg" />
                                                </span>
                                                <div class="media-body flex-grow-1">
                                                    <p class="noti-details"><span class="noti-title">Tarah Shropshire</span>
                                                        changed the task name <span class="noti-title">Appointment booking
                                                            with payment gateway</span></p>
                                                    <p class="noti-time"><span class="notification-time">6 mins ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="notification-message">
                                        <a href="activities.html">
                                            <div class="media d-flex">
                                                <span class="avatar flex-shrink-0">
                                                    <img alt="" src="/assets/img/profiles/avatar-06.jpg" />
                                                </span>
                                                <div class="media-body flex-grow-1">
                                                    <p class="noti-details"><span class="noti-title">Misty Tison</span>
                                                        added <span class="noti-title">Domenic Houston</span> and <span
                                                            class="noti-title">Claire Mapes</span> to project <span
                                                                class="noti-title">Doctor available module</span></p>
                                                    <p class="noti-time"><span class="notification-time">8 mins ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="notification-message">
                                        <a href="activities.html">
                                            <div class="media d-flex">
                                                <span class="avatar flex-shrink-0">
                                                    <img alt="" src="/assets/img/profiles/avatar-17.jpg" />
                                                </span>
                                                <div class="media-body flex-grow-1">
                                                    <p class="noti-details"><span class="noti-title">Rolland Webber</span>
                                                        completed task <span class="noti-title">Patient and Doctor video
                                                            conferencing</span></p>
                                                    <p class="noti-time"><span class="notification-time">12 mins ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="notification-message">
                                        <a href="activities.html">
                                            <div class="media d-flex">
                                                <span class="avatar flex-shrink-0">
                                                    <img alt="" src="/assets/img/profiles/avatar-13.jpg" />
                                                </span>
                                                <div class="media-body flex-grow-1">
                                                    <p class="noti-details"><span class="noti-title">Bernardo Galaviz</span>
                                                        added new task <span class="noti-title">Private chat module</span>
                                                    </p>
                                                    <p class="noti-time"><span class="notification-time">2 days ago</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="topnav-dropdown-footer">
                                <a href="activities.html">View all Notifications</a>
                            </div>
                        </div>
                    </li> */}

                    <li class="nav-item dropdown has-arrow main-drop">
                        <a href="/" class="dropdown-toggle nav-link userset" data-bs-toggle="dropdown">
                            <span class="user-img"><img src={userAvatar} alt="" />
                                <span class="status online"></span></span>
                        </a>
                        <div class="dropdown-menu menu-drop-user">
                            <div class="profilename">
                                <div class="profileset">
                                    <span class="user-img"><img src={userAvatar} alt="" />
                                        <span class="status online"></span></span>
                                    <div class="profilesets">
                                        <h6>{user.fullname}</h6>
                                        <h5>{user.roles}</h5>
                                    </div>
                                </div>
                                <hr class="m-0" />
                                <a class="dropdown-item" href="profile"> <i class="me-2" data-feather="user"></i> My
                                    Profile</a>
                                <a class="dropdown-item" href="generalsettings.html"><i class="me-2"
                                    data-feather="settings"></i>Settings</a>
                                <hr class="m-0" />
                                <a class="dropdown-item logout pb-0" href="/dang-nhap" onClick={handleLogout}><img
                                    src="/assets/img/icons/log-out.svg" class="me-2" alt="img" />Logout</a>
                            </div>
                        </div>
                    </li>
                </ul>


                <div class="dropdown mobile-user-menu">
                    <a href="/" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="profile">My Profile</a>
                        <a class="dropdown-item" href="generalsettings.html">Settings</a>
                        <a class="dropdown-item" href="signin.html" onClick={handleLogout}>Logout</a>
                    </div>
                </div>

            </div>
        </>
    )
}
