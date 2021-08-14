import React, { useEffect, useState } from 'react';
import './theme.css'

const RippleButton = ({ children, cclass, type, onClick }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  useEffect(() => {
    return () => setCoords({ x: -1, y: -1 }); // cleanup function을 이용
  }, []);

  return (
    <button
      type={type}
      className={`ripple-button ${cclass}`}
      onClick={e => {
        const rect = e.target.getBoundingClientRect();
 
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      {isRippling ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y
          }}
        />
      ) : (
        ''
      )}
      {/* 버튼 내용 */}
      {children}
    </button>
  );
};

export default RippleButton;