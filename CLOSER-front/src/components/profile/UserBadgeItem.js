import React from 'react';

function UserBadgeItem({badge}) {

  return (
    <span>
      {badge === 1 
        ? '쉐프'
        :
        badge === 2
          ? '자취박사'
          : 
          badge === 3
            ? '꾸미기왕'
            : ''
      }
      &nbsp;
    </span>
  )
}

export default UserBadgeItem;