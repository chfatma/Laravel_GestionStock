import React from 'react';

const Alert = ({ products }) => {
    // Check if there are any products with low stock
    const lowStockProducts = products.filter(product => product.stock_alert <= 5);

    return (
        <div>
            {lowStockProducts.length > 0 ? (
                <div className="alert alert-warning">
                    {lowStockProducts.map(product => (
                        <p key={product.id}>
                            Attention: {product.name} a un stock faible ({product.stock_alert} restant).
                        </p>
                    ))}
                </div>
            ) : (
                <div className="alert alert-success">
                    Tous les produits sont en stock.
                </div>
            )}
        </div>
    );
};

export default Alert;
