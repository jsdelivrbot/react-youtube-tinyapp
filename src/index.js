import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import _ from 'lodash'

import SearchBar from './components/search-bar'
import VideoList from './components/video-list'
import VideoDetail from './components/video-detail'

const API_KEY = 'AIzaSyBt_bcYCczoJQ9D65ZPVMt-diuS-pXYmUY'

class App extends Component {
  constructor (props) {
    super()

    this.state = { videos: [] }

    this.videoSearch('blockchain and smart contracts')
  }

  videoSearch (term) {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({ videos })
    })
  }

  render () {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.videos[0]} />
        <VideoList videos={this.state.videos} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('.container'))
