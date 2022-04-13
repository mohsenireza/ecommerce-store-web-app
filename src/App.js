import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import { Header, PageWrapper } from './components';
import { fetchCategories } from './features/categories/categoriesSlice';
import { fetchCurrencies } from './features/currencies/currenciesSlice';
import { fetchOrderList } from './features/cart/cartSlice';

class App extends Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.fetchInitialData = this.fetchInitialData.bind(this);
  }

  // Fetch initial data on startup
  componentDidMount() {
    this.fetchInitialData();
  }

  fetchInitialData() {
    this.props.dispatchFetchCategories();
    this.props.dispatchFetchCurrencies();
    this.props.dispatchFetchOrderList();
  }

  render() {
    const {
      fetchCategoriesStatus,
      fetchCurrenciesStatus,
      fetchOrderListStatus,
    } = this.props;

    const fetchInitialDataStatuses = [
      fetchCategoriesStatus,
      fetchCurrenciesStatus,
      fetchOrderListStatus,
    ];

    // Render the app after initial data gets loaded, otherwise render loading
    return (
      <PageWrapper
        loading={
          fetchInitialDataStatuses.includes('idle') ||
          fetchInitialDataStatuses.includes('loading')
        }
        error={fetchInitialDataStatuses.includes('failed')}
      >
        <div className="App">
          <Header />
          {/* Render screens based on routes */}
          <Routes />
        </div>
      </PageWrapper>
    );
  }
}

App.propTypes = {
  fetchCategoriesStatus: PropTypes.string.isRequired,
  fetchCurrenciesStatus: PropTypes.string.isRequired,
  fetchOrderListStatus: PropTypes.string.isRequired,
  dispatchFetchCategories: PropTypes.func.isRequired,
  dispatchFetchCurrencies: PropTypes.func.isRequired,
  dispatchFetchOrderList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  fetchCategoriesStatus: state.categories.status,
  fetchCurrenciesStatus: state.currencies.status,
  fetchOrderListStatus: state.cart.status,
});

const mapDispatchToProps = {
  dispatchFetchCategories: fetchCategories,
  dispatchFetchCurrencies: fetchCurrencies,
  dispatchFetchOrderList: fetchOrderList,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
