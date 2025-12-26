import React, { useEffect } from "react";
import { Table, Button, Row, Col, Container, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMyOrders } from "../actions/orderActions";

function OrderHistoryScreen({ history }) {
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
                    <h2 className="fw-bold"><i className="fas fa-shopping-bag me-2 text-primary"></i>Your Order History</h2>
                    <p className="text-muted">Review the items you've purchased and their current status.</p>
                </Col>
            </Row>

            {loadingOrders ? (
                <Loader />
            ) : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
            ) : !orders || orders.length === 0 ? (
                <Message variant="info">You haven't placed any orders yet.</Message>
            ) : (
                <Table striped responsive hover className="table-sm shadow-sm rounded-3 overflow-hidden">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="py-3 px-3">Order ID</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Items Purchased</th>
                            <th className="py-3 text-center">Qty</th>
                            <th className="py-3">Total</th>
                            <th className="py-3">Status</th>
                            <th className="py-3"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="align-middle border-bottom">
                                <td className="px-3 fw-bold">{order._id}</td>
                                <td>{order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}</td>
                                <td>
                                    <div className="d-flex flex-column">
                                        {order.orderItems.map((item, index) => (
                                            <div key={index} className="d-flex align-items-center mb-1">
                                                <Image src={item.image} alt={item.name} fluid rounded style={{ width: '30px', height: '30px', objectFit: 'cover', border: '1px solid #eee' }} className="me-2" />
                                                <span style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="text-center">
                                    {order.orderItems.reduce((acc, item) => acc + item.qty, 0)}
                                </td>
                                <td className="fw-bold">₹{order.totalPrice}</td>
                                <td>
                                    {order.isDeliver ? (
                                        <span className="text-success"><i className="fas fa-check-circle"></i> Delivered</span>
                                    ) : order.isShipped ? (
                                        <span className="text-info"><i className="fas fa-truck"></i> Shipped</span>
                                    ) : (
                                        <span className="text-warning"><i className="fas fa-clock"></i> Processing</span>
                                    )}
                                </td>
                                <td className="text-end px-3">
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant="outline-primary" className="btn-sm rounded-pill px-3">
                                            View Order
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

export default OrderHistoryScreen;
