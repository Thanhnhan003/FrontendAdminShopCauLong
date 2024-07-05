import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../../api/apiService'; // Đảm bảo bạn đã import đúng
import NotificationService from '../../component/NotificationService'; // Đảm bảo bạn đã import đúng

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await LOGIN('auth/loginadmin', { email, password });
            // NotificationService.success('Đăng nhập thành công', 'Chào mừng bạn đã quay lại!');
            navigate('/dashboard'); // Điều hướng đến trang dashboard sau khi đăng nhập thành công
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message || 'Đăng nhập thất bại';
                NotificationService.error('Lỗi đăng nhập', errorMessage);
            } else {
                NotificationService.error('Lỗi đăng nhập', 'Không thể kết nối đến máy chủ');
            }
        }
    };

    return (
        <>
            <div className="account-page">
                <div className="main-wrapper">
                    <div className="account-content">
                        <div className="login-wrapper">
                            <div className="login-content">
                                <div className="login-userset">
                                    <div className="login-logo" style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src="/LogoNhanSports.png" alt="img" style={{ marginRight: '8px',width:"50px",height:'50px' }} />
                                        <p style={{ fontWeight: 'bold',fontSize:"25px" }}>NhanSports
                                        </p>
                           
                                    </div>

                                    <div className="login-userheading">
                                        <h3>Đăng nhập</h3>
                                        <h4>Vui lòng đăng nhập vào tài khoản của bạn</h4>
                                    </div>
                                    <div className="form-login">
                                        <label>Email</label>
                                        <div className="form-addons">
                                            <input
                                                type="text"
                                                placeholder="Nhập địa chỉ email của bạn"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <img src="assets/img/icons/mail.svg" alt="img" />
                                        </div>
                                    </div>
                                    <div className="form-login">
                                        <label>Mật khẩu</label>
                                        <div className="pass-group">
                                            <input
                                                type="password"
                                                className="pass-input"
                                                placeholder="Nhập mật khẩu của bạn"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <span className="fas toggle-password fa-eye-slash"></span>
                                        </div>
                                    </div>
                                    <div className="form-login">
                                        <div className="alreadyuser">
                                            <h4><a href="forgetpassword.html" className="hover-a">Quên mật khẩu?</a></h4>
                                        </div>
                                    </div>
                                    <div className="form-login">
                                        <button className="btn btn-login" onClick={handleLogin}>Đăng nhập</button>
                                    </div>
                                    {/* <div className="signinform text-center">
                                        <h4>Chưa có tài khoản? <a href="signup.html" className="hover-a">Đăng ký</a></h4>
                                    </div> */}
                                    <div className="form-setlogin">
                                        <h4>Hoặc đăng nhập bằng</h4>
                                    </div>
                                    <div className="form-sociallink">
                                        <ul>
                                            <li>
                                                <a href="javascript:void(0);">
                                                    <img src="assets/img/icons/google.png" className="me-2" alt="google" />
                                                    Đăng nhập bằng Google
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);">
                                                    <img src="assets/img/icons/facebook.png" className="me-2" alt="google" />
                                                    Đăng nhập bằng Facebook
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="login-img">
                                <img src="assets/img/login.jpg" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
