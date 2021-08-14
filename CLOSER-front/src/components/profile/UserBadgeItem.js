import React from 'react';
import cookBadge from '../../assets/profile/cook-badge.svg';
import houseBadge from '../../assets/profile/house-badge.svg';
import homedecoBadge from '../../assets/profile/homedeco-badge.svg';


function UserBadgeItem({badge, cclass}) {

  return (
    <>
      {badge === 1 
        ? <img src={cookBadge} alt="home" className={`${cclass} ps-0 `}/>
        :
        badge === 2
          ? <img src={houseBadge} alt="home" className={`${cclass} ps-0`}/>
          : 
          badge === 3
            ? <img src={homedecoBadge} alt="home" className={`${cclass} ps-0`}/>
            : ''
      }
      &nbsp;
    </>
  )
}

export default UserBadgeItem;