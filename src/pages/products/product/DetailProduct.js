import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { GET_ID, GET_IMG } from '../../../api/apiService'; // Adjust the import based on your file structure
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const DetailProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await GET_ID(`products/show`, productId);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Product Details</h4>
                        <h6>Full details of a product</h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8 col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="productdetails">
                                    <ul className="product-bar">
                                        <li>
                                            <h4>Product</h4>
                                            <h6>{product.productName}</h6>
                                        </li>
                                        <li>
                                            <h4>Category</h4>
                                            <h6>{product.category.categoryName}</h6>
                                        </li>
                                        <li>
                                            <h4>Brand</h4>
                                            <h6>{product.brand.brandName}</h6>
                                        </li>
                                        <li>
                                            <h4>Slug</h4>
                                            <h6>{product.slug}</h6>
                                        </li>
                                        <li>
                                            <h4>Quantity</h4>
                                            <h6>{product.quantity}</h6>
                                        </li>
                                        <li>
                                            <h4>Price</h4>
                                            <h6>{product.productPrice}</h6>
                                        </li>
                                  
                                        <li>
                                            <h4>Description</h4>
                                            <h6>{product.productDescription}</h6>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="slider-product-details">
                                    <Carousel
                                        showArrows={false}
                                        infiniteLoop={true}
                                        swipeable={true}
                                        emulateTouch={true}
                                        
                                        dynamicHeight={true}
                                    >
                                        {product.galleries.map((gallery, index) => (
                                            <div key={index}>
                                                <img src={GET_IMG('products', gallery.thumbnail)} alt={gallery.thumbnail} />
                                                {/* <p className="legend">{gallery.thumbnail}</p> */}
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
