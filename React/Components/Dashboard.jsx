import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Content from './Content';
import { Card } from 'react-bootstrap';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import orgServices from '../../../../services/organizationService';
import TopMenuItems from './TopMenuItems';
import 'mdi-icons/css/materialdesignicons.min.css';
import image from '../../../../assets/images/users/avatar-2.jpg';
import toastr from 'toastr';
import MonthlySales from './MonthlySales';
import Activity from './Activity';

const _logger = debug.extend('dashboard');

const Dashboard = (props) => {
    const [orgData, setOrgData] = useState({});

    useEffect(() => {
        _logger(props.currentUser.organizationId, 'current user');
        orgServices.getOrgById(props.currentUser.organizationId).then(onGetOrgSuccess).catch(onGetOrgError);
    }, [props.currentUser.organizationId]);

    const onGetOrgSuccess = (response) => {
        _logger('onGetOrgSuccess');
        let orgInfo = response.item;
        setOrgData((prevState) => {
            const od = { ...prevState };
            od.orgId = props.currentUser.organizationId;
            od.orgType = orgInfo.organizationType.name;
            od.cuisineType = orgInfo.cuisineType.name;
            od.orgName = orgInfo.name;

            od.followers = 500;
            od.following = 300;
            od.rating = 5;
            od.image = image;
            return od;
        });

        toastr.success('Get org success');
    };

    const onGetOrgError = (err) => {
        toastr.error(`Get org error ${err}`);
    };

    return (
        <React.Fragment>
            <Card className="d-flex">
                <Card.Body>
                    <Banner orgData={orgData} />
                    <Content />
                    <TopMenuItems currentUser={props.currentUser} />
                    <MonthlySales organizationId={props.currentUser.organizationId} />
                    <Activity organizationId={props.currentUser.organizationId} />
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

Dashboard.propTypes = {
    currentUser: PropTypes.shape(
        {
            organizationId: PropTypes.number.isRequired,
        }.isRequired
    ),
};

export default Dashboard;
