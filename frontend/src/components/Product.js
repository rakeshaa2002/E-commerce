
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card className="my-3 rounded product-card">
      <Link to={`/product/${product._id}`} className="img-container">
        <Card.Img src={product.image} variant="top" />
        <div className="overlay">
          <Button className="btn-primary view-btn">View Details</Button>
        </div>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="mb-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color={"#fbbf24"}
          />
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center">
          <Card.Text as="h3" className="mb-0">
            <span>₹</span>{product.price}
          </Card.Text>

          <Link to={`/cart/${product._id}?qty=1`}>
            <i className="fas fa-cart-plus text-accent fa-lg"></i>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Product;
