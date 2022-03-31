import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ProductInfoModal.scss';
import { ProductInfo } from '../../components';
import {
  fetchProduct,
  productStateCleared,
} from '../../features/product/productSlice';

class ProductInfoModalComp extends Component {
  constructor(props) {
    super(props);
  }

  // Fetch product data
  componentDidMount() {
    this.props.dispatchFetchProduct(this.props.productId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fetchProductStatus !== this.props.fetchProductStatus) {
      const { fetchProductStatus, modalId, trapFocus } = this.props;
      if (fetchProductStatus === 'succeeded') {
        // Add focus trapper
        const modalParent = document.getElementById(modalId);
        this.removeFocusTrapper = trapFocus(modalParent);
      }
    }
  }

  componentWillUnmount() {
    // Remove focus trapper if exists
    if (this.removeFocusTrapper) this.removeFocusTrapper();
    // Clear the product state
    this.props.dispatchProductStateCleared();
  }

  render() {
    // TODO: handle loading
    const status = this.props.fetchProductStatus;
    if (status === 'idle' || status === 'loading')
      return <h1>Loading product...</h1>;

    return <ProductInfo className="productInfoModal" isVerbose={false} />;
  }
}

ProductInfoModalComp.propTypes = {
  productId: PropTypes.string,
  fetchProductStatus: PropTypes.string.isRequired,
  dispatchFetchProduct: PropTypes.func.isRequired,
  dispatchProductStateCleared: PropTypes.func.isRequired,
  trapFocus: PropTypes.func.isRequired,
  modalId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  fetchProductStatus: state.product.status,
});

const mapDispatchToProps = {
  dispatchFetchProduct: fetchProduct,
  dispatchProductStateCleared: productStateCleared,
};

const ProductInfoModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductInfoModalComp);

export { ProductInfoModal };