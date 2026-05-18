import React, { useState } from 'react';
import Login from './Login';
import AdminPanel from './AdminPanel';

const Admin = () => {
    // Basic state to manage authentication for this session
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div className="admin-root">
            {!isAuthenticated ? (
                <Login onLogin={setIsAuthenticated} />
            ) : (
                <AdminPanel onLogout={() => setIsAuthenticated(false)} />
            )}
        </div>
    );
};

export default Admin;
