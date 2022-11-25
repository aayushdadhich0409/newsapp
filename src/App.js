// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  c = 'john';
  pagesize = 5;
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={this.pagesize} country="in" category="general"/>}/>
          <Route exact path="/business" element={<News key="business" pageSize={this.pagesize} country="in" category="business"/>}/>
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pagesize} country="in" category="entertainment"/>}/>
          <Route exact path="/health" element={<News key="health" pageSize={this.pagesize} country="in" category="health"/>}/>
          <Route exact path="/science" element={<News key="science" pageSize={this.pagesize} country="in" category="science"/>}/>
          <Route exact path="/sports" element={<News key="sports" pageSize={this.pagesize} country="in" category="sports"/>}/>
          <Route exact path="/technology" element={<News key="tech" pageSize={this.pagesize} country="in" category="technology"/>}/>
          
        </Routes>
        

        </Router>
      </div>             
    )
  } 
}
