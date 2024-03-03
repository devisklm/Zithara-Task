import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BASE_URL = 'http://localhost:5000'; //backend server URL

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(20);

  useEffect(() => {
    fetchData();
  }, []);
  
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/customers/search?searchTerm=${searchTerm}`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSort = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/customers/sort?sortBy=${sortBy}`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error sorting:', error);
    }
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    
    <div className="container">
      <div className="search-sort">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
        <button onClick={handleSort}>Sort</button>
      </div>
      <div>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Created Date</th>
            <th>Created Time</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map(customer => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Pagination
        customersPerPage={customersPerPage}
        totalCustomers={customers.length}
        paginate={paginate}
      />
    </div>
  );
}

const Pagination = ({ customersPerPage, totalCustomers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCustomers / customersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default App;
