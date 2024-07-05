import React, { useEffect, useState } from 'react';
import { GET_ALL_BY_TOKEN, GET_IMG, PUT_EDIT_ENABLED  } from '../../api/apiService';
import formatDate from '../../component/FormatDate';
import Swal from 'sweetalert2';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
export default function ListUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    GET_ALL_BY_TOKEN('auth/all')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Fetching orders error:', error);
      });
  };

  const toggleEnabledStatus = (userId, currentStatus) => {
    const newStatus = !currentStatus;
    PUT_EDIT_ENABLED(userId, newStatus)
      .then(() => {
        Swal.fire({
          title: 'Thành Công!',
          text: `Người dùng đã được ${newStatus ? 'cho phép' : 'vô hiệu hóa'} !`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        fetchUsers();
      })
      .catch(error => {
        console.error('Error updating user status:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error updating the user status',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <>
     <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Danh sách người dùng</h4>
              <h6>Quản lý người dùng của bạn</h6>
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
                      <th>Tên người dùng</th>
                      <th>Email</th>
                      <th>Ngày tạo tài khoản</th>
                      <th>Vai trò</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.userId}>
                        <td>
                          <label className="checkboxs">
                            <input type="checkbox" />
                            <span className="checkmarks"></span>
                          </label>
                        </td>
                        <td>{user.fullname}</td>
                        <td>{user.email}</td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>{user.roles}</td>
                        <td>
                          {user.enabled ? (
                            <FaToggleOn 
                              size={24} 
                              color="green" 
                              onClick={() => toggleEnabledStatus(user.userId, user.enabled)} 
                              style={{ cursor: 'pointer' }}
                            />
                          ) : (
                            <FaToggleOff 
                              size={24} 
                              color="red" 
                              onClick={() => toggleEnabledStatus(user.userId, user.enabled)} 
                              style={{ cursor: 'pointer' }}
                            />
                          )}
                        </td>
                        <td>
                          {/* Additional actions can be added here */}
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
