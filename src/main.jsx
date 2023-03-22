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
            <span className="breach-alarm">BREACH? {this.state.breachAlarm = 0 ? "OH GOD YEAH": "all good"}</span>
            <span className="rolling-message">Message: {this.state.rollingMessage}</span>
        </div>
    );
    }
}


class PostItControl extends React.Component {
    constructor(){
        super()

        this.state = {
            displayInfo: {
                1: [100, 100, "test"],
                2: [200, 100, "test2"]} //as ID # in key, & list [xpos, ypos, displayText].
        }
        console.log(this.state);
    }
    
    PostIt({id, xpos, ypos, displayText}){
            console.log("post it!", id, xpos, ypos, displayText);
            return(
                <span style={{border: "2px red solid", background: "hotpink", position: "fixed", bottom: ypos, right: xpos, width: "150px", height: "150px"}}>
                    {displayText}</span>
            );
        }
    createPostIt(){
        
        const tempDisplayInfo = this.state.displayInfo;
        tempDisplayInfo[4] = [10, 30, "sgjdlh"];

        console.log("ugh", tempDisplayInfo);
        
        this.setState({
            displayInfo: tempDisplayInfo
        })
    }
    destroyPostIt(i){
    }

    render(){

        const displayInfo = this.state.displayInfo;
        console.log(displayInfo);
    return(
        <span className="post-it-control">
            <button onClick={() => this.createPostIt()}> make new post it </button>

            {Object.keys(displayInfo).map(key => (
                <this.PostIt id={key} xpos={displayInfo[key][0]} ypos={displayInfo[key][1]} displayText={displayInfo[key][2]} key={key}/>
                ))}
            {/* <this.PostIt xpos={700} ypos={100} displayText={"lsdk;aowiehfd;lkfjldj"}/> */}
        </span>
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
                "": "empty.img"
            },
            activeFeeds: ["Testing Room A", "Untitled", "Lobby", ""]
        }

        console.log("test", this.state);
    }

    VideoFeed({xpos, ypos, feedName, feedDisplay}){
        console.log("vid feed!", xpos, ypos, feedName, feedDisplay);
        return(
            <span style={{background: "black", color: "white", border: "2px red solid", borderRadius: 10, position: "fixed", bottom: ypos, right: xpos, width: 200, height: 150}}>
                {feedDisplay}
                <br></br>
                {feedName}
            </span>
        );
    }
    VideoFeedList({dirItems}){
        dirItems = dirItems.sort();
        console.log(dirItems);

        return(
            <span>
                {dirItems.map((feedName) =>
                <button onClick={this.changeVideoFeed(feedName)}>{feedName}</button>
                )}
            </span>
        )
    }

    changeVideoFeed(feedName){
        console.log("hi!!");
    }

    videoFeedEvent({feedName, eventType}){
        //for initiating breaches, static.
    }

    render(){

        const slotTranslation = { //locations of each of 4 vid feed slots as (x,y)
            0: [500,500],
            1: [300,500],
            2: [500,300],
            3: [300,300]
            }
        console.log("help", slotTranslation[0]);
    return(
        <>
            {this.state.activeFeeds.map((feedName, slot) =>
                <this.VideoFeed xpos={slotTranslation[slot][0]} ypos={slotTranslation[slot][1]} feedName={feedName} feedDisplay={this.state.feedDisplays[feedName]} key={feedName+slot}/>
            )}
            <this.VideoFeedList dirItems={Object.keys(this.state.feedDisplays)}/>
        </>
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
