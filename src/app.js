/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import products from './seed';

export class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }
  componentDidMount() {
    this.setState({ products })
  }
  handleProductUpVote(productID) {
    console.log('voted');
  }
  render() {
    const productsSorted = this.state.products.sort((a, b) => (b.votes - a.votes));
    const productComponents = productsSorted.map(product => {
      return (
        <Product
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitterAvatarUrl={product.submitterAvatarUrl}
          productImageUrl={product.productImageUrl}
          onVote={this.handleProductUpVote}
        />
      )
    });
    return (
      <div className="ui unstackable items">
        { productComponents }
      </div>
    );
  }
}

class Product extends React.Component {
  constructor(props) {
    super(props); // always call this first

    // custom method bindings below
    this.handleUpVote = this.handleUpVote.bind(this);
  }
  handleUpVote() {
    this.props.onVote(this.props.id);
  }
  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} alt={this.props.title} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}><i className="large caret up icon" /></a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img className="ui avatar image" src={this.props.submitterAvatarUrl} alt="avatar"></img>
          </div>
        </div>
      </div>
    );
  }
}