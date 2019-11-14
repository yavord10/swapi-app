import React, { Component } from 'react';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    render() {
        return this.props.children;
    }
}

export {ProductProvider, ProductContext};