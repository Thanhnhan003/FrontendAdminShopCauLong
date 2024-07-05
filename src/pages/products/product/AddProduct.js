import React, { useState, useEffect } from 'react';
import { POST_ADD_PRODUCT, GET_ALL } from '../../../api/apiService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddProduct() {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    useEffect(() => {
        GET_ALL('category/show')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                Swal.fire('Lỗi', 'Không thể lấy danh sách danh mục', 'error');
            });

        GET_ALL('brand/show')
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
                Swal.fire('Lỗi', 'Không thể lấy danh sách thương hiệu', 'error');
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!productName || !category || !brand || !quantity || !price) {
            Swal.fire('Lỗi', 'Vui lòng điền tất cả các trường bắt buộc', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('categoryId', category);
        formData.append('brandId', brand);
        formData.append('quantity', quantity);
        formData.append('productDescription', description);
        formData.append('productPrice', price);


        images.forEach((image, index) => {
            formData.append('images', image);
        });
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        POST_ADD_PRODUCT('products/create', formData)
            .then(response => {
                alert('Thành công', 'Sản phẩm đã được thêm thành công', 'success');
                navigate('/productlist');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error adding product:', error);
                console.log(formData)
                alert('Lỗi', 'Không thể thêm sản phẩm', 'error');
            });
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Product Add</h4>
                            <h6>Create new product</h6>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select style={{ height: "40px", width: "100%",fontSize:'14px',fontWeight:"500",color:"#637381",padding:"10px 15px",borderRadius:"5px",border:"1px solid rgba(145,158,171,.32)" }} value={category} onChange={(e) => setCategory(e.target.value)}>
                                                <option value="">Danh mục</option>
                                                {categories.map(category => (
                                                    <option  key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Brand</label>
                                            <select style={{ height: "40px", width: "100%",fontSize:'14px',fontWeight:"500",color:"#637381",padding:"10px 15px",borderRadius:"5px",border:"1px solid rgba(145,158,171,.32)" }} value={brand} onChange={(e) => setBrand(e.target.value)}>
                                                <option value="">Thương hiệu</option>
                                                {brands.map(br => (
                                                    <option key={br.brandId} value={br.brandId}>{br.brandName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Hình ảnh sản phẩm</label>
                                            <div className="image-upload">
                                                <input type="file" multiple onChange={handleImageChange} />
                                                <div className="image-uploads">
                                                    <img src="assets/img/icons/upload.svg" alt="img" />
                                                    <h4>Kéo và thả tệp để tải lên</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="product-list">
                                            <ul className="row">
                                                {imagePreviews.map((preview, index) => (
                                                    <li key={index}>
                                                        <div className="productviews">
                                                            <div className="productviewsimg">
                                                                <img src={preview} alt="Selected" />
                                                            </div>
                                                            <div className="productviewscontent">
                                                                <div className="productviewsname">
                                                                    <h2>{images[index].name}</h2>
                                                                    <h3>{(images[index].size / 1024).toFixed(2)} KB</h3>
                                                                </div>
                                                                <a href="/" className="hideset" onClick={() => {
                                                                    const newImages = images.filter((_, i) => i !== index);
                                                                    const newPreviews = imagePreviews.filter((_, i) => i !== index);
                                                                    setImages(newImages);
                                                                    setImagePreviews(newPreviews);
                                                                }}>x</a>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <button type="submit" className="btn btn-submit me-2">Submit</button>
                                        <a href="/productlist" className="btn btn-cancel">Cancel</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
