// history 바깥에서 history 사용하도록 만들면 사용 가능

// import './tab.css'
// import RippleTabItem from './tabitem'

// const RippleTab = ({ history, children, cclass }) => {
//   console.log(history)
//   const onClick = ( history ) => {
//     console.log(history)
//     history.push(children[1][0])
//   }

//   return (
//     <div className="tabs-wrapper">
//       <nav className="tabs">
//         <RippleTabItem cclass="tab is-current" children={children[0][0]} onClick={onClick} addr={children[1][0]} />
//         <RippleTabItem cclass="tab" children={children[0][1]} onClick={onClick} addr={children[1][1]} />
//         <RippleTabItem cclass="tab" children={children[0][2]} onClick={onClick} addr={children[1][2]} />
//         <div class="nav-underline"></div> 
//       </nav>   
//     </div>
//   );
// };

// export default RippleTab;