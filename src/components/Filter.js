import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts, searchProduct } from "../actions/productActions";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  handleSearch = (e) => {

  }

  searchProduct = (e,) => {
    this.setState({ search: e.target.value })
  }

  render() {
    return !this.props.products ? (
      <div>Loading...</div>
    ) : (
      <div className="filter row">
        <div className="col-sm-4">
          <div className="filter-result">
            <label>Search</label>
            <input type="text" className="form-control" onChange={e => this.handleSearch(e)} value={this.state.search} placeholder="Search..." />

          </div>
        </div>
        <div className="col-sm-4">
          <div className="filter-sort">
            Category{" "}
            <select
              className="form-control"
              value={this.props.sort}
              onChange={(e) =>
                this.props.sortProducts(
                  this.props.products,
                  e.target.value
                )
              }
            >
              <option value="">All</option>
              <option value="jeans">jeans</option>
              <option value="shirt">shirt</option>
              {/* <option value="kid">kid</option> */}
            </select>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="filter-size">
            Brand{" "}
            <select
              className="form-control"
              value={this.props.size}
              onChange={(e) =>
                this.props.filterProducts(this.props.products, e.target.value)
              }
            >
              <option value="">All</option>
              <option value="Nike">Nike</option>
              <option value="HM">HM</option>
              <option value="zara">zara</option>
              <option value="addidas">addidas</option>
              {/* <option value="XL">XL</option> */}
              <option value="gucci">gucci</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
