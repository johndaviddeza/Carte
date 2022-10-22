import React, { useState, useEffect } from 'react';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Tab, Nav, Row, Col, Card } from 'react-bootstrap';

const ContentCard = (props) => {
    const [tabData, setTabData] = useState({ tabArr: [], tabComp: [] });
    const [bodyData, setBodyData] = useState({ bodyArr: [], bodyComp: [] });
    useEffect(() => {
        let data = props.data;
        setTabData((prevState) => {
            let data = props.data;
            let td = { ...prevState };
            td.tabArr = data;
            td.tabComp = data.map(mapTabs);
            return td;
        });
        setBodyData((prevState) => {
            let bd = { ...prevState };
            bd.bodyArr = data;
            bd.bodyComp = data.map(mapContent);
            return bd;
        });
    }, [props]);

    const mapTabs = (tab, index) => {
        let tabs = (
            <Nav.Item key={index} as="li">
                <Nav.Link as={Link} to="#" eventKey={tab.tabTitle}>
                    <i className={classnames(tab.icon, 'd-md-none', 'd-block', 'me-1')}></i>
                    <span className="d-none d-md-block">{tab.tabTitle}</span>
                </Nav.Link>
            </Nav.Item>
        );
        return tabs;
    };

    const mapContent = (tab, index) => {
        let content = (
            <Tab.Pane eventKey={tab.tabTitle} id={tab.id} key={index}>
                <Row className="g-0 align-items-center">
                    <Col md={4}>
                        <Card.Img src={tab.img} className="img-fluid" />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title as="h5">{tab.title}</Card.Title>
                            <Card.Text>{tab.text}</Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Tab.Pane>
        );
        return content;
    };
    return (
        <Tab.Container defaultActiveKey="Profile">
            <Nav variant="tabs" justify className="nav-bordered" as="ul">
                {tabData.tabComp}
            </Nav>
            <Tab.Content>{bodyData.bodyComp}</Tab.Content>
        </Tab.Container>
    );
};

ContentCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.number.isRequired,
                img: PropTypes.string.isRequired,
                tabTitle: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                icon: PropTypes.string.isRequired,
            }.isRequired
        ).isRequired
    ),
};

export default ContentCard;
