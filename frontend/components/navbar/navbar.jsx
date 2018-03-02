import React from 'react';

const Navbar = ({ currentUser, handleLogout }) => {
    let logoutBtn = currentUser ? <button id="logout-btn" onClick={() => handleLogout()}>Logout</button> : null;
    return (
        <div id="navbar-container">
            <div id="logo-container">
                <h2 id="logo">Asapp Chat</h2>
                <img id="image-logo" src="http://res.cloudinary.com/ssj6porfy/image/upload/v1519973709/AsappChat3_gmszcb.png"/>
            </div>
            <div id="navbar-btn-container">
                { logoutBtn }
            </div>
        </div>
    );    
};

export default Navbar;