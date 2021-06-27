import React, { Component } from "react";
import formatCurrency from "../util";
import { connect } from "react-redux";
// import Modal from "react-modal";
import { Modal } from "react-bootstrap";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      orderModal: false,
      selectedItem: [],
      total: ''
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    var selectedItem = JSON.parse(localStorage.getItem("cartItems"));
    this.setState({ selectedItem })
    this.setState({ total: selectedItem.reduce((a, c) => a + c.price * c.count, 0) })
  }
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
    console.log(this.state.orderModal, 'asdasd')
    this.OpenModal()
  };
  closeModal = () => {
    this.setState({ orderModal: false });
  };
  OpenModal = () => {
    this.setState({ orderModal: true });
  };
  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}
        <Modal show={this.state.orderModal} onHide={this.closeModal} centered className="cm_modal">
          <Modal.Header closeButton>
            <Modal.Title>Order summary</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <table className="table">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                </tr>
              </thead>
              <tbody>
                {this.state.selectedItem?.map((order, i) => (
                  <>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{order.title}</td>
                      <td>{order.price}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>

            <div className="twocol">
              <h3>Total:</h3>
              <h3>{this.state.total}</h3>
            </div>

          </Modal.Body>
        </Modal>
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div className="cartimg">
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div className="cart-details">
                    <div className="product-name">{item.title}</div>
                    <div className="price-cancle">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <h3 className="">
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </h3>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="btn btn-warning"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email</label>
                        <input
                          className="form-control"
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          className="form-control"
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          className="form-control"
                          name="address"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <button className="btn btn-primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div >
    );
  }
}

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
