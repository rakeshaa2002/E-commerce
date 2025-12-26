import React, { useEffect } from "react";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMyOrders } from "../actions/orderActions";

function TrackOrderScreen({ history }) {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            dispatch(listMyOrders());
        }
    }, [dispatch, history, userInfo]);

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="fw-bold"><i className="fas fa-truck me-2 text-primary"></i>Track Your Orders</h2>
                    <p className="text-muted">Check the shipping and delivery status of your current orders.</p>
                </Col>
            </Row>

            {loadingOrders ? (
                <Loader />
            ) : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
            ) : !orders || orders.length === 0 ? (
                <Message variant="info">No active orders to track.</Message>
            ) : (
                <Table striped responsive hover className="table-sm shadow-sm rounded-3 overflow-hidden">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="py-3 px-3">Date</th>
                            <th className="py-3">Shipping Status</th>
                            <th className="py-3">Tracking Number</th>
                            <th className="py-3">Delivery Status</th>
                            <th className="py-3"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="align-middle">
                                <td className="px-3">{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                                <td>
                                    {order.isShipped ? (
                                        <span className="badge bg-success py-2 px-3 rounded-pill text-white">
                                            <i className="fas fa-check-circle me-1"></i> Shipped
                                        </span>
                                    ) : (
                                        <span className="badge bg-warning py-2 px-3 rounded-pill text-dark">
                                            <i className="fas fa-clock me-1"></i> Preparing
                                        </span>
                                    )}
                                </td>
                                <td className="fw-bold text-muted">
                                    {order.trackingNumber ? order.trackingNumber : "--"}
                                </td>
                                <td>
                                    {order.isDeliver ? (
                                        <span className="badge bg-success py-2 px-3 rounded-pill text-white">
                                            <i className="fas fa-box-open me-1"></i> Delivered
                                        </span>
                                    ) : (
                                        <span className="badge bg-danger py-2 px-3 rounded-pill text-white">
                                            <i className="fas fa-truck-loading me-1"></i> In Transit
                                        </span>
                                    )}
                                </td>
                                <td className="text-end px-3">
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant="outline-primary" className="btn-sm rounded-pill px-3">
                                            Full Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default TrackOrderScreen;
