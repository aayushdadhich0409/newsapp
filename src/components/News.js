import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 4,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  articles = [];

  constructor(props) {
    super(props);
    console.log("hello i am constructor from news component");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category} - NewsMonkey`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff05855ad5624968bdb0a0d9cb581562&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    console.log(parsedData.totalResults);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }
  handlenextClick = async () => {
    console.log("next");

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff05855ad5624968bdb0a0d9cb581562&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // // this.setState.loading = false; //wrong way to assign a object
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({articles:parsedData.articles,page: this.state.page +1,loading:false});
    // // console.log();
    // console.log(parsedData.totalResults);
    this.setState({ page: this.state.page + 1});
    this.updateNews();
  };

  handleprevClick = async () => {
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=ff05855ad5624968bdb0a0d9cb581562&page=${this.state.page -
      1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };
  fetchMoreData = async () => {
    if(this.state.page===1){
      this.state.page=2;
    }
    console.log(this.state.page)
    this.setState({ page: this.state.page + 1});
    //  this.updateNews();
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff05855ad5624968bdb0a0d9cb581562&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    // console.log(parsedData.totalResults);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    })
  };

  render() {
    console.log("render");
    return (
      <>
        <h2 className="text-center">NewsMonkey-Top headLines</h2>
        {/* {this.state.loading && <Spinner/>}   */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <Newsitem
                      title={element.title? element.title.slice(0, 45) : ""}
                      description={ 
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNirTvlk3hWKabDveI9ckNCduU-vgNR5ATCw&usqp=CAU"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
      // </div>
    );
  }
}

export default News;
