import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {useState} from 'react'
import reactLogo from './assets/react.svg'
//import './App.css'

class Dashboard extends React.Component {
    constructor(){
        super()

        this.state = {
            rollingMessage: "hi faust :)",
            breachAlarm: false
        }

        console.log(this.state);
    }

    render(){
    return(
        <div className="dashboard">
            <div className="breach-alarm">BREACH? {this.state.breachAlarm = 0 ? "OH GOD YEAH": "all good"}</div>
            <div className="rolling-message">Message: {this.state.rollingMessage}</div>
        </div>
    );
    }
}


class PostItControl extends React.Component {
    constructor(){
        super()

        this.state = {
            displayInfo: {
                1: {x:0, y:0, text:"test"},
                2: {x:200, y:100, text:"test2"}} //as ID # in key, & list [xpos, ypos, displayText].
        }
        console.log(this.state);
    }
    
    PostIt({id, xpos, ypos, displayText, moveItemFunc}){
            console.log("post it!", id, xpos, ypos, displayText);
            return(
                <span onDragEnd={(e) => moveItemFunc(id, e)} draggable="true" style={{border: "2px red solid", background: "hotpink", position: "fixed", top: ypos, left: xpos, width: "150px", height: "150px"}}>
                    {displayText}</span>
            );
        }
    
    createPostIt(text){
        
        const tempDisplayInfo = this.state.displayInfo;
        const nextId = parseInt(Object.keys(tempDisplayInfo).slice(-1)) + 1

        tempDisplayInfo[nextId] = {x:10, y:30, text:text};

        console.log("ugh", tempDisplayInfo);
        
        this.setState({
            displayInfo: tempDisplayInfo
        })
    }
    destroyPostIt(id){
    }
    movePostIt = (id, eventObj) => {
        //eventStopper.stopPropogation();
        eventObj.preventDefault(); //prevents... something
        
        console.log(id);

        const tempDisplayInfo={};

        Object.assign(tempDisplayInfo, this.state.displayInfo);

        console.log("X", eventObj.pageX, "\nY", eventObj.pageY);
        tempDisplayInfo[id]={x:eventObj.pageX, y:eventObj.pageY, text:tempDisplayInfo[id].text};
        this.setState({displayInfo: tempDisplayInfo});
        console.log("HELP", this.state.displayInfo);
        console.log("moved!!!");
    }


    render(){

        const displayInfo = this.state.displayInfo;
        console.log(displayInfo);
    return(
        <div className="post-it-control">
            <button onClick={() => this.createPostIt("sdfhdksh")}> + post it </button>

            {Object.keys(displayInfo).map(key => (
                <this.PostIt id={key} moveItemFunc={this.movePostIt} xpos={displayInfo[key].x} ypos={displayInfo[key].y} displayText={displayInfo[key].text} key={key}/>
                ))}
        </div>
    );
    }
}

class VideoFeedControl extends React.Component {
    constructor(){
        super()

        this.state = {
            feedDisplays: {
                "Lobby": "Lobby.img",
                "Containment Hallway": "hallway.img",
                "Testing Room A": "room.img",
                "Untitled": "insert youtube i-frame",
                "clear": "empty.img"
            },
            activeFeeds: ["Testing Room A", "Untitled", "Lobby", "clear"]
        }

        console.log("test", this.state);
    }

    VideoFeed({feedName, feedDisplay}){
        console.log("vid feed!", feedName, feedDisplay);
        return(
            <div style={{background: "black", color: "white", border: "2px red solid", borderRadius: 10, width: 200, height: 150}}>
                {feedDisplay}
                <br></br>
                {feedName}
            </div>
        );
    }
    VideoFeedList({dirItems, changeFeedFunc}){
        dirItems = dirItems.sort();
        console.log(dirItems);

        return(
            <div className="video-feed-dir">
                {dirItems.map((feedName, index) =>
                <button onClick={() => (changeFeedFunc(feedName))} key={feedName+index} className={feedName}>{feedName}</button>
                )}
            </div>
        )
    }

    changeVideoFeed = (feedName) => {
        const tempActiveFeeds = [];
        Object.assign(tempActiveFeeds, this.state.activeFeeds);
        console.log(tempActiveFeeds, feedName);

        tempActiveFeeds[2] = feedName;

        this.setState({
            activeFeeds: tempActiveFeeds
        })

    }

    videoFeedEvent({feedName, eventType}){
        //for initiating breaches, static.
    }

    render(){
    return(
        <div className="video-feed">
            <div>
                {this.state.activeFeeds.slice(0,2).map((feedName, slot) =>
                <this.VideoFeed feedName={feedName} feedDisplay={this.state.feedDisplays[feedName]} key={feedName+slot}/>
                )}
            </div>
            <div>
                {this.state.activeFeeds.slice(2,4).map((feedName, slot) =>
                <this.VideoFeed feedName={feedName} feedDisplay={this.state.feedDisplays[feedName]} key={feedName+slot}/>
                )}
            </div>
            
            <this.VideoFeedList changeFeedFunc={this.changeVideoFeed} dirItems={Object.keys(this.state.feedDisplays)}/>
        </div>
    );
    }
}


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Dashboard/>
        <VideoFeedControl/>
        <PostItControl/>
    </React.StrictMode>,
)
