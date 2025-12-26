import React, { useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  /* GETTING DATA FROM URL IF PRESENT */
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  //qty: '?qty=3' -> ['?qty',3] -> 3

  /* FIRING OFF DISPATCH, BUT ONLY IF WE HAVE A PRODUCT ID & QUANTITY */
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  /* HANDLERS */

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <h1 className="text-center mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty. <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product} className="mb-3 rounded">
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={4}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>₹{item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2} className="text-right">
                    <Button
                      type="button"
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={8} className="mt-5 pt-4">
        <Card className="text-center p-3">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              <div className="h3 mt-2">
                ₹
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="w-100 btn-lg"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                PROCEED TO CHECKOUT
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
