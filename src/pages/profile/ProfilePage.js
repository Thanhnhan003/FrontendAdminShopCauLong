import React, { useEffect, useState } from 'react';
import { GET_USER_INFO, GET_IMG, POST_ADD_AVATAR } from '../../api/apiService';
export default function ProfilePage() {
    const [user, setUser] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        GET_USER_INFO('auth/show/info')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, []);

    const defaultAvatar = "assets/img/avatar.jpg";
    const userAvatar = user.avatar ? GET_IMG('auth', user.avatar) : defaultAvatar;

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSave = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            POST_ADD_AVATAR('auth/avatar', formData)
                .then(response => {
                    console.log(response.data);
                    alert('Avatar Cập nhập thành công.');
                    window.location.reload();

                    // Refresh user info to get updated avatar
                    GET_USER_INFO('auth/show/info')
                        .then(response => {
                            setUser(response.data);
                            window.location.reload();

                        })
                        .catch(error => {
                            console.error('Error fetching user:', error);
                        });
                })
                .catch(error => {
                    console.error('Error uploading avatar:', error);
                    alert('Failed to upload avatar.');
                });
        } else {
            alert('Please select a file first.');
        }
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Profile</h4>
                            <h6>User Profile</h6>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div className="profile-set">
                                <div className="profile-head">
                                </div>
                                <div className="profile-top">
                                    <div className="profile-content">
                                        <div className="profile-contentimg">
                                            <img src={userAvatar} alt="img" id="blah" />
                                            <div className="profileupload">
                                                <input type="file" id="imgInp" onChange={handleFileChange} />
                                                <a href="/">
                                                    <img src="assets/img/icons/edit-set.svg" alt="img" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="profile-contentname">
                                            <h2>{user.fullname}</h2>
                                            <h4>Cập nhật ảnh và thông tin cá nhân của bạn.</h4>
                                        </div>
                                    </div>
                                    <div className="ms-auto">
                                        <button className="btn btn-submit me-2" onClick={handleSave}>Save</button>
                                        <a href="/" className="btn btn-cancel">Cancel</a>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Họ và tên</label>
                                        <input type="text" readOnly placeholder={user.fullname} defaultValue={user.fullname} />
                                    </div>
                                </div>
                       
                                <div className="col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" readOnly placeholder={user.email} defaultValue={user.email} />
                                    </div>
                                </div>
                                {/* <div className="col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" placeholder="+1452 876 5432" defaultValue={user.phone} />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>User Name</label>
                                        <input type="text" placeholder="Username" defaultValue={user.username} />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-12">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <div className="pass-group">
                                            <input type="password" className="pass-input" />
                                            <span className="fas toggle-password fa-eye-slash"></span>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="col-12">
                                    <a href="/" className="btn btn-submit me-2">Submit</a>
                                    <a href="/" className="btn btn-cancel">Cancel</a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
