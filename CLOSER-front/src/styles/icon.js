import React from 'react';
import './theme.css'

const RippleIcon = ({ src, alt, id, cclass, onClick }) => {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = React.useState(false);

  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <div
      id={id}
      className={`ripple-icon ${cclass}`}
      onClick={e => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      <img src={src} alt={alt} id={id}></img>
      {isRippling ? (
        <span
          id={id}
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default RippleIcon;