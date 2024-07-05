import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { GET_ID, GET_IMG } from '../../api/apiService'; // Adjust the import based on your file structure
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const DetailNews = () => {
    const { newsId } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await GET_ID(`news/show`, newsId);
                setNews(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [newsId]);

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
                        <h4>Chi tiết bài viết</h4>
                        <h6>Chi tiết đầy đủ của một tin tức</h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8 col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="productdetails">
                                    <ul className="product-bar">
                                        <li>
                                            <h4>Tiêu đề</h4>
                                            <h6>{news.title}</h6>
                                        </li>
                                        <li>
                                            <h4>Slug</h4>
                                            <h6>{news.slug}</h6>
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
                                    <img src={GET_IMG('news', news.thumbnail)} alt={news.thumbnail} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-header">
                    <div className="page-title">
                        <h4>Nội dung bài viết</h4>
                        <div style={{borderStyle:"solid"}}>
                            <h1 className="news-detail-title">{news.title}</h1>
                            <div className="news-detail-body" dangerouslySetInnerHTML={{ __html: news.content }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailNews;
