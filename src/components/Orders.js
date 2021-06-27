import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../actions/orderActions";
import formatCurrency from "../util";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: [],
      total: ''
    };
  }
  componentDidMount() {
    this.props.fetchOrders();
    var selectedItem = JSON.parse(localStorage.getItem("cartItems"));
    this.setState({ selectedItem })
    this.setState({ total: selectedItem.reduce((a, c) => a + c.price * c.count, 0) })


  }


  render() {
    console.log(this.state.selectedItem, 'selectedItemselectedItem')
    return <div className="orders">
      <div className="container">
        <h2>Orders List</h2>
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
      </div>

    </div>
  }
}
export default connect(
  (state) => ({
    orders: state.order.orders,
  }),
  {
    fetchOrders,
  }
)(Orders);
