import React from 'react';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';
import './organization.css';
import Rating from 'react-rating';

const _logger = debug.extend('banner');

const Banner = (props) => {
    const bannerData = props.orgData;
    _logger('propsPassed', bannerData);
    return (
        <Card.Body className="d-flex">
            <span className="float-start m-2 me-4">
                <img src={bannerData.image} alt="" className="banner-img rounded-circle img-thumbnail banner-" />
            </span>

            <div>
                <h4 className="mt-1 mb-1">{bannerData.orgName}</h4>
                <p className="font-13">{bannerData.orgType}</p>
                <p>{bannerData.cuisineType}</p>
            </div>

            <Col>
                <div className="d-flex justify-content-end align-items-start">
                    <Rating
                        initialRating={bannerData.rating}
                        readonly
                        emptySymbol="mdi mdi-star-outline font-22 text-muted"
                        fullSymbol="mdi mdi-star font-22 text-warning"></Rating>
                </div>
                <div className=" d-flex justify-content-end align-items-end ">
                    <p>Followers: {bannerData.followers}</p>
                </div>
                <div className=" d-flex justify-content-end align-items-end ">
                    <p>Following: {bannerData.following}</p>
                </div>
            </Col>
        </Card.Body>
    );
};

Banner.propTypes = {
    orgData: PropTypes.shape(
        {
            orgId: PropTypes.number.isRequired,
            orgName: PropTypes.string.isRequired,
            orgType: PropTypes.string.isRequired,
            cuisineType: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            followers: PropTypes.number.isRequired,
            following: PropTypes.number.isRequired,
        }.isRequired
    ),
};

export default Banner;
