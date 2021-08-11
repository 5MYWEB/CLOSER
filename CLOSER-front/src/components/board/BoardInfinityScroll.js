import React from "react";
import { render } from "react-dom";
// import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios'

const style = {
  height: 200,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

class BoardInfinityScroll extends React.Component {
  constructor() {
    super();

    this.state = {
      productList: [],
      items: 5,
      preItems: 0,
    };
  }

    componentDidMount() {
      console.log("일단 여기")
      this.getData();
      window.addEventListener("scroll", this.infiniteScroll);
    }

    // componentWillUnmount() {
    //   window.removeEventListener("scroll", this.infiniteScroll());
    // }

    getData = () => {
      const { preItems, items, productList } = this.state;
      axios.post(`http://localhost:8080/board/gBoard/recipe/new`)
        .then((res) => {
          const result = res.data.slice(preItems, items);
          console.log(result)
          this.setState({
            productList: [...productList, ...result],
          });
        });
    }

    infiniteScroll = () => {
      const { documentElement, body } = document;
      const { items } = this.state;

      const scrollHeight = Math.max(documentElement.scrollHeight, body.scrollHeight);
      const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
      const clientHeight = documentElement.clientHeight;

      console.log(scrollHeight)
      console.log(scrollTop)
      console.log(clientHeight)
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("스크롤 하자")
        this.setState({
          preItems: items,
          items: items + 5,
        });
        this.getData();
        // this.componentDidMount();
      }
    };

  render() {
    const { productList } = this.state;
    return (
      <article className="Allitem">
        {productList.map((item)=>(
          <div style={style}>{item.board_pk}</div>
        ))}
        {/* <List productList={productList} /> */}
      </article>
    );
  }
  // state = {
  //   items: Array.from({ length: 20 })
  // };

  // fetchMoreData = () => {
  //   // a fake async api call like which sends
  //   // 20 more records in 1.5 secs
  //   setTimeout(() => {
  //     this.setState({
  //       items: this.state.items.concat(Array.from({ length: 20 }))
  //     });
  //   }, 1500);
  // };

  // render() {
  //   return (
  //     <div>
  //       <h1>demo: react-infinite-scroll-component</h1>
  //       <hr />
  //       <InfiniteScroll
  //         dataLength={this.state.items.length}
  //         next={this.fetchMoreData()}
  //         hasMore={true}
  //         loader={<h4>Loading...</h4>}
  //       >
  //         {this.state.items.map((i, index) => (
  //           <div style={style} key={index}>
  //             div - #{index}
  //           </div>
  //         ))}
  //       </InfiniteScroll>
  //     </div>
  //   );
  // }
}

export default BoardInfinityScroll;
// render(<BoardInfinityScroll />, document.getElementById("root"));
