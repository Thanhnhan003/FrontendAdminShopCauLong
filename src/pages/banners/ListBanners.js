import React, { useEffect, useState } from 'react';
import { GET_ALL, DELETE_ID, PUT_EDIT } from '../../api/apiService';
import formatDate from '../../component/FormatDate';
import Swal from 'sweetalert2';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

export default function ListBanners() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchbanners();
  }, []);

  const fetchbanners = () => {
    GET_ALL('banners/all')
      .then(response => {
        setBanners(response.data);
      })
      .catch(error => {
        console.error('Fetching banners error:', error);
      });
  };

  const handleDelete = (bannerId) => {
    Swal.fire({
      title: 'Bạn có chắc chắn không?',
      text: 'Bạn sẽ không thể hoàn tác điều này!',
      showCancelButton: true,
      confirmButtonColor: '#ff9f43',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        DELETE_ID(`banners/delete/${bannerId}`)
          .then(response => {
            Swal.fire('Đã xóa!', 'Banner đã được xóa.', 'success');
            fetchbanners();
          })
          .catch(error => {
            console.error('Error deleting banner:', error);
            Swal.fire('', 'Không thể xóa banner.', 'error');
          });
      }
    });
  };

  const toggleEnabledStatus = (bannerId, enabled) => {
    const newStatus = !enabled;
    PUT_EDIT(`banners/update/enabled/${bannerId}?enabled=${ newStatus }`)
      .then(() => {
        Swal.fire({
          title: 'Thành Công!',
          text: `Banner đã được ${newStatus ? 'cho phép' : 'vô hiệu hóa'}!`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        fetchbanners();
      })
      .catch(error => {
        console.error('Error updating banner status:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error updating the banner status',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Danh sách banner</h4>
            <h6>Quản lý banner của bạn</h6>
          </div>
          <div className="page-btn">
            <a href="/addbanners" className="btn btn-added">
              <img src="/assets/img/icons/plus.svg" alt="img" className="me-1" />
              Thêm banners
            </a>
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
                    <th>Tên banner</th>
                    <th>Mô tả banner</th>
                    <th>Link url banner</th>
                    <th>Trạng thái</th>
                    <th>Thời gian thêm</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((banner) => (
                    <tr key={banner.bannerId}>
                      <td>
                        <label className="checkboxs">
                          <input type="checkbox" />
                          <span className="checkmarks"></span>
                        </label>
                      </td>
                      <td>{banner.bannerName}</td>
                      <td>{banner.bannerDescription}</td>
                      <td>{banner.urlLink}</td>
                      <td>
                        {banner.enabled ? (
                          <FaToggleOn
                            size={24}
                            color="green"
                            onClick={() => toggleEnabledStatus(banner.bannerId, banner.enabled)}
                            style={{ cursor: 'pointer' }}
                          />
                        ) : (
                          <FaToggleOff
                            size={24}
                            color="red"
                            onClick={() => toggleEnabledStatus(banner.bannerId, banner.enabled)}
                            style={{ cursor: 'pointer' }}
                          />
                        )}
                      </td>
                      <td>{formatDate(banner.createdAt)}</td>
                      <td>
                        {/* <a className="me-3" href={`/editbanner/${banner.bannerId}`}>
                          <img src="/assets/img/icons/edit.svg" alt="img" />
                        </a> */}
                        <a className="confirm-text" href="#st" onClick={() => handleDelete(banner.bannerId)}>
                          <img src="/assets/img/icons/delete.svg" alt="img" />
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
  );
}
