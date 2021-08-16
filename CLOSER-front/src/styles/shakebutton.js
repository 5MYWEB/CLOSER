import React, { useState } from 'react';
import './shakebutton.css'

const ShakeButton = ({ children, cclass }) => {
    
    const [shake, setShake] = useState(false);
    
    const animate = () => {
        
        // Button begins to shake
        setShake(true);
        
        // Buttons tops to shake after 2 seconds
        setTimeout(() => setShake(false), 500);
        
    }
    
    return(
        <button onClick={animate} className={shake ? `shake ${cclass}` : `${cclass}`}>{children}</button>
    );
    
}

export default ShakeButton;