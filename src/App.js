import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShipmentDetail from './components/ShipmentDetail';
import ShipmentTable from './components/ShipmentTable';
import useSortableData from './hooks/useSortableData';
import { fetchInitialdata } from './actions/actions';
import { connect } from 'react-redux';



function App({ data, loadData }) {
  const [currentPage, setCurrentPage] = useState(0);
  const { items, requestSort, sortConfig } = useSortableData(data.slice(currentPage * 20, currentPage * 20 + 20));

  const MyShipmentTable = () => {
    return (
      <ShipmentTable
        shipments={items}
        currentPage={currentPage}
        setCurrentPage={(value) => setCurrentPage(currentPage + value)}
        nextDisabled={currentPage >= Math.floor(data.length / 20)}
        prevDisabled={currentPage <= 0}
        handleSort={requestSort}
        sortConfig={sortConfig}
      />
    );
  }

  const MyShipmentDetail = () => {
    return (
      <ShipmentDetail
        shipments={data}
      />
    )
  }

  useEffect(() => {
    loadData();

  }, [loadData]);


  return (
    <Router>
      <div className='app'>
        <Route exact path="/" component={MyShipmentTable} />
        <Route path="/details" component={MyShipmentDetail} />
      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    data: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(fetchInitialdata()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
