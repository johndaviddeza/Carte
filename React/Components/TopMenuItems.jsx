import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import debug from 'sabio-debug';
import menuItemsService from '../../../../services/menuItemsService';
import toastr from 'toastr';
import PropTypes from 'prop-types';

const TopMenuItems = (props) => {
    const [menuItemData, setMenuItemData] = useState({ menuItemArr: [], menuItemComp: [] });

    useEffect(() => {
        menuItemsService
            .getTopSellingByOrgId(props.currentUser.organizationId)
            .then(onGetOrdersByIdSuccess)
            .catch(onGetOrdersByIdError);
    }, []);
    const onGetOrdersByIdSuccess = (response) => {
        let topOrders = response.item.slice(0, 5);
        setMenuItemData((prevState) => {
            let menuItems = { ...prevState };
            menuItems.menuItemArr = topOrders;
            menuItems.menuItemComp = topOrders.map(mapTopMenuItemsCard);
            return menuItems;
        });
    };
    const onGetOrdersByIdError = (err) => {
        toastr.error(`Unable to get orders ${err}`);
    };
    const mapTopMenuItemsCard = (menuData) => {
        return (
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center" key={menuData.id}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{menuData.name}</div>
                    {menuData.amountSold}
                </div>
                <div>
                    <p>Total Sold</p>
                    <h3 className="mt-3 mb-3">{`$${menuData.totalAmount}`}</h3>
                </div>
            </ListGroup.Item>
        );
    };
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title">Top 5 Menu Items</h4>
                <p className="text-muted font-14">Your top selling items are:</p>
                <ListGroup as="ol" className="list-group-numbered">
                    {menuItemData.menuItemComp}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

TopMenuItems.propTypes = {
    currentUser: PropTypes.shape(
        {
            organizationId: PropTypes.number.isRequired,
        }.isRequired
    ),
};
export default TopMenuItems;
