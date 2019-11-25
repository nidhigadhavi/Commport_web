import React, { Component } from 'react';
import Routes from './Routes';
import TopNavigation from './../topNavigation';
import SideNavigation from './../sideNavigation';
import Footer from './../Footer';

class DeshboardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpand: true
    }
  }

  toggleMenu() {
    let contentLeft = document.getElementById("content").style.marginLeft;
    let sidebarWidth = document.getElementsByClassName("sidebar-fixed")[0].style.width;
    document.getElementsByClassName("sidebar-fixed")[0].style.width = (sidebarWidth == "202px") ? "60px" : "202px";
    document.getElementById("content").style.marginLeft = (contentLeft == "202px") ? "60px" : "202px";
    (document.getElementById("content").style.marginLeft == "202px") ? this.setState({ isExpand: true }) : this.setState({ isExpand: false })
  }

  render() {    
    return (
      <div>
        <TopNavigation  sideNavToggle={() => this.toggleMenu()} isExpand={this.state.isExpand}/>        
        <main id="content" className="pt-2">
          <Routes />
        </main>     
      </div>
    );
  }
  
}

export default DeshboardComponent;
