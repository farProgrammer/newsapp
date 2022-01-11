import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  // articles = [
  //   {
  //     source: {
  //       id: null,
  //       name: "Yahoo Entertainment",
  //     },
  //     author: "Frank Schwab",
  //     title:
  //       "NFL Playoff Projection: Can Cowboys get a No. 1 seed? They need to beat Cardinals first - Yahoo Sports",
  //     description:
  //       "The Cowboys can get the top spot in the NFC, but they still need help.",
  //     url: "https://sports.yahoo.com/nfl-playoff-projection-can-cowboys-get-a-no-1-seed-they-need-to-beat-cardinals-first-151838753.html",
  //     urlToImage:
  //       "https://s.yimg.com/ny/api/res/1.2/0RWYlDJ9a4Om.0KoT4Ccdg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD0xNTAw/https://s.yimg.com/os/creatr-uploaded-images/2021-12/46098430-68b9-11ec-bbff-a7cbd134d551",
  //     publishedAt: "2021-12-29T15:18:38Z",
  //     content:
  //       "The Dallas Cowboys are the talk of the NFL this week, but they're still looking up at the Green Bay Packers in the NFC. \r\nGetting the No. 1 seed is massively important in the expanded playoff field. … [+3125 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "CBS Sports",
  //     },
  //     author: "",
  //     title:
  //       "Prisco's NFL Week 17 picks: Steelers upset Browns to keep playoff hopes alive, Chiefs edge Bengals in shootout - CBS Sports",
  //     description:
  //       "Pete Prisco reveals his picks for Week 17, including the Ravens stunning the Rams",
  //     url: "https://www.cbssports.com/nfl/news/priscos-nfl-week-17-picks-steelers-upset-browns-to-keep-playoff-hopes-alive-chiefs-edge-bengals-in-shootout/",
  //     urlToImage:
  //       "https://sportshub.cbsistatic.com/i/r/2021/12/29/91c1b14d-f537-4415-9c3e-21fd6d94f9ed/thumbnail/1200x675/4503798d7d553466d47d6af24219f3ed/mahomes.jpg",
  //     publishedAt: "2021-12-29T13:38:00Z",
  //     content:
  //       "Time is running out.\r\nWe have just two more weeks of the regular season, which means it's crunch time for NFL teams and for those of us who make picks.\r\nLast week didn't go as planned for me, as I we… [+6599 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "NBCSports.com",
  //     },
  //     author: null,
  //     title:
  //       "10 moves that helped the Eagles turn their season around - NBC Sports",
  //     description:
  //       "The Eagles have completely turned their season around after a horrific start, and these 10 roster moves played a big part in the turnaround. By Reuben Frank",
  //     url: "https://www.nbcsports.com/philadelphia/eagles/10-moves-helped-eagles-turn-their-season-around",
  //     urlToImage:
  //       "https://www.nbcsports.com/sites/rsnunited/files/styles/metatags_opengraph/public/article/hero/howard_j_USATSI_17397030.jpg",
  //     publishedAt: "2021-12-29T11:05:10Z",
  //     content:
  //       "Its pretty clear the Eagles are not the same team they were two months ago. Not even close.\r\nComing out of Vegas in late October, they were 2-5, theyd lost games by 6, 11, 12, 16 and 20 points, and t… [+5667 chars]",
  //   },
  // ];

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9055f554fba041ad97314f83283154f6&page=1
    &pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }
  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}
    &category=${this.props.category}&apiKey=9055f554fba041ad97314f83283154f6&page=$
    {
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handleNextClick = async () => {
    console.log("Next");
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}
      &category=${this.props.category}&apiKey=9055f554fba041ad97314f83283154f6&page=$
      {
        this.state.page + 1
      } &pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };
  render() {
    return (
      <div className="container my-3">
        <h1
          className="text-center"
          style={{ margin: "40px 0px", backgroundColor: "green" }}
        >
          Daily News-Top Headlines
        </h1>
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &larr;Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
