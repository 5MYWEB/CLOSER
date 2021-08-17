import React, { useState, useEffect } from 'react';
import './shakebutton.css'

const ShakeButton = ({ children, cclass }) => {
    
    const [shake, setShake] = useState(false);
    
    const animate = () => {
        
        // Button begins to shake
        setShake(true);
        
        // Buttons tops to shake after 2 seconds
        setTimeout(() => setShake(false), 500);
        
    }

    useEffect(() => {
    return () => setShake({ x: -1, y: -1 }); // cleanup function을 이용
    }, []);
    
    return(
        <button onClick={animate} className={shake ? `shake ${cclass}` : `${cclass}`}>{children}</button>
    );
    
}

export default ShakeButton;