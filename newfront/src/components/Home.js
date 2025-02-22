import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import axios from '../api'; 
import { Chart, registerables } from 'chart.js';
import '../styles/Home.css'; 

// Registering Chart.js components
Chart.register(...registerables); 

const Home = () => {
    // State to hold sales data for the bar chart
    const [salesData, setSalesData] = useState({
        labels: [], // Labels for the x-axis
        datasets: [
            {
                label: 'Most Sold Products', 
                data: [], // Sales data
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [ // Border colors for the bars
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)'
                ],
                borderWidth: 1 // Border width of the bars
            }
        ]
    });

    // State to hold stock data for the doughnut chart
    const [stockData, setStockData] = useState(null);

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        // Fetching the most sold products data
        axios.get('/most-sold-products')
            .then(response => {
                const data = response.data; // Extracting data from the response
                setSalesData({
                    labels: data.map(item => item.name), // Setting labels to product names
                    datasets: [{
                        ...salesData.datasets[0], // Copying existing dataset configuration
                        data: data.map(item => item.sales) // Setting sales data
                    }]
                });
            })
            .catch(error => console.error('Error fetching most sold products:', error)); // Error handling

        // Fetching stock data by category
        axios.get('/stock-by-category')
            .then(response => {
                const stock = response.data; 
                const labels = stock.map(item => item.category); // Labels for categories
                const dataValues = stock.map(item => item.total_quantity); // Total quantities for each category

                setStockData({
                    labels,
                    datasets: [
                        {
                            data: dataValues, // Setting stock data
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
                            hoverOffset: 4, // Offset on hover
                        },
                    ],
                });
            })
            .catch(error => console.error('Error fetching stock data:', error));
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1> {/* Dashboard title */}
            <div className="home-container">
                <div className="chart-card">
                    <h2 className="chart-title">Most Sold Products</h2> {/* Title for the most sold products chart */}
                    <Bar data={salesData} options={{ scales: { y: { beginAtZero: true } } }} /> {/* Bar chart for sales data */}
                </div>
                <div className="chart-card">
                    <h2 className="chart-title">Stock Availability by Category</h2> {/* Title for stock availability chart */}
                    {stockData ? <Doughnut data={stockData} /> : <p>Loading...</p>} {/* Doughnut chart or loading message */}
                </div>
            </div>
        </div>
    );
};

export default Home; 
