import React, { Component } from "react";
import formatCurrency from "../util";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }



  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    console.log(this.props.products?.products, '65654654654654654464')
    return (
      <>
        {!this.props.products ? (
          <div>Loading...</div>
        ) : (
          <div className="row">
            {this.props.products.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="product card mb-3">
                  <div className="imgwrapper">
                    <img src={product.image} alt={product.title}></img>
                  </div>
                  <div className="card-body">
                    <a
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}
                    >

                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        onClick={() => this.props.addToCart(product)}
                        className="btn btn-warning"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {product && (
          <Modal show={product} onHide={this.closeModal} centered className="cm_modal">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <div className="product-details">
                <div className="row">
                  <div className="col-md-6">
                    <div className="imgwrapper">
                      <img src={product.image} alt={product.title}></img>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="product-details-description">
                      <p>
                        <strong>{product.title}</strong>
                      </p>
                      <p>{product.description}</p>
                      <p>
                        Avaiable Brand:{" "}
                        {product.availableSizes.map((x) => (
                          <span>
                            {" "}
                            <button className="btn btn-primary btn-xs tags">{x}</button>
                          </span>
                        ))}
                      </p>
                      <div className="product-price">
                        <div>{formatCurrency(product.price)}</div>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            this.props.addToCart(product);
                            this.closeModal();
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Modal.Body>

          </Modal>
          // <Modal isOpen={true} onRequestClose={this.closeModal}>
          //   <Zoom>

          //   </Zoom>
          // </Modal>
        )}
      </>
    );
  }
}
export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
  }
)(Products);
