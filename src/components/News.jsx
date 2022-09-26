import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(){
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1

    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=11146ee6d63646fbbef5a55e26bf32ab&page=1&pageSize=20";
    let data = await fetch(url); 
    let parsedData = await data.json()
    this.setState({articles:parsedData.articles, totalResults: parsedData.totalArticles})
  }

  handlePrevClick= async () =>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=11146ee6d63646fbbef5a55e26bf32ab&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url); 
    let parsedData = await data.json()
      this.setState({
        page: this.state.page - 1,
        articles:parsedData.articles
      })
  }

  handleNextClick= async () =>{
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=11146ee6d63646fbbef5a55e26bf32ab&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url); 
      let parsedData = await data.json()
        this.setState({
          page: this.state.page + 1,
          articles:parsedData.articles
        })
    }
    
  }

  render() {
    return (
      <div className='container my-3'>
        <div className='row'>
          <h2>News Shark - Top Headlines</h2>
          {this.state.articles.map((element)=>{
            return <div className='col-md-4 my-3' key={element.url}> 
              <NewsItem  title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
           
           <div className='d-flex justify-content-between'>
           <button disabled={this.state.page <=1} type="button" className="btn btn-dark mx-4 my-4" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" className="btn btn-dark mx-4 my-4" onClick={this.handleNextClick}>Next &rarr;</button>
           </div>
        </div>
      </div>
    )
  }
}

export default News
