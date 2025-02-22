import React from 'react';


const Alert = ({ products }) => {
    // Filter products to find those with low stock (5 or fewer remaining)
    const lowStockProducts = products.filter(product => product.stock_alert <= 5);

    return (
        <div>
            {lowStockProducts.length > 0 ? (
                // If there are low stock products, display a warning message
                <div className="alert alert-warning">
                    {lowStockProducts.map(product => (
                        <p key={product.id}>
                            {/* Display the product name and remaining stock */}
                            Attention: {product.name} a un stock faible ({product.stock_alert} restant).
                        </p>
                    ))}
                </div>
            ) : (
                // If all products are sufficiently stocked, display a success message
                <div className="alert alert-success">
                    Tous les produits sont en stock.
                </div>
            )}
        </div>
    );
};

export default Alert; // Export the Alert component for use in other parts of the application
