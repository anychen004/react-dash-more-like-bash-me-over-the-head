import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {useState} from 'react'
import reactLogo from './assets/react.svg'
//import './App.css'

class Dashboard extends React.Component { //container for breach alarm, rolling message
    constructor(){
        super()

        this.state = {
            rollingMessage: "hi faust :)",
            breachAlarm: false
        }

        console.log(this.state);
    }

    breachEventRandomizer = () => { //randomly turns on breach alarm
        if (Math.random()>0.9) {
            this.setState({ breachAlarm: true }, () => console.log(this.state.breachAlarm)); //https://stackoverflow.com/questions/41446560/react-setstate-not-updating-state
        }
    }
    updateRollingMessage = (message) => {
        //TODO
    }

    componentDidMount() {
        console.log("breach randomizing begun");
        setInterval(this.breachEventRandomizer, 10000);
    }

    render(){
        document.body.style = 'background: lightslategrey;'; //https://stackoverflow.com/questions/42464888/how-do-i-change-the-background-color-of-the-body
    return(
        <div className="dashboard">
            <div className="breach-alarm" style={{color: this.state.breachAlarm == false ? "black" : "greenyellow"}}>BREACH? {this.state.breachAlarm == false ? "all good" : "WEEWOOOEWOWEOWOEOWOE [alarm noises]"}</div>
            <button onClick={() => this.setState({breachAlarm:false}, () => console.log(this.state.breachAlarm))}>clear breach alarm</button>
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
                1: {x:400, y:250, text:"check amnestics shipment"} //as ID # in key, & list [xpos, ypos, displayText].
            } 
        }
        console.log(this.state);
    }
    
    PostIt({id, xpos, ypos, displayText, moveItemFunc}){
            console.log("post it!", id, xpos, ypos, displayText);
            return(
                <span onDragEnd={(e) => moveItemFunc(id, e)} draggable="true" className="post-it-indv" style={{top: ypos, left: xpos}}>
                    {displayText}</span>
            );
        }
    PostItCreatorField({createPostIt}){ //the text field & "create post it" button
        
        const [inputValue, updateInputValue] = useState("write something")
    
        function inputUpdate(evt) { //taken right from your thermometer example :thumbs_up:
            updateInputValue(evt.target.value)
        }

        return(
            <>
                <input value={inputValue} onChange={inputUpdate} />
                <button onClick={() => createPostIt(inputValue)}> + post it </button>
            </>
        );
    }
    
    createPostIt = (text) => { //actual func creating post-its
        
        const tempDisplayInfo = this.state.displayInfo;
        const nextId = parseInt(Object.keys(tempDisplayInfo).slice(-1)) + 1

        function getRndInteger(min, max) { //thanks https://www.w3schools.com/js/js_random.asp
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }

        tempDisplayInfo[nextId] = {x:getRndInteger(250,350), y:getRndInteger(250,350), text:text};

        console.log("new post it made", tempDisplayInfo);
        
        this.setState({
            displayInfo: tempDisplayInfo
        })
    }
    destroyPostIt(id){
        //TODO
    }
    movePostIt = (id, eventObj) => {
        //eventStopper.stopPropogation(); //prevents parent components from doing uneeded rerendering/updating
        eventObj.preventDefault(); //prevents... something
        
        console.log(id);

        const tempDisplayInfo={};

        Object.assign(tempDisplayInfo, this.state.displayInfo);

        console.log("X", eventObj.pageX, "\nY", eventObj.pageY);
        tempDisplayInfo[id]={x:eventObj.pageX, y:eventObj.pageY, text:tempDisplayInfo[id].text}; //TODO: fix discrepancy btwn perceived mouse pos and location post-it ends up in
        this.setState({displayInfo: tempDisplayInfo});
        console.log("HELP", this.state.displayInfo);
        console.log("moved!!!");
    }


    render(){

        const displayInfo = this.state.displayInfo;
        console.log(displayInfo);
    return(
        <div className="post-it-control">
            <this.PostItCreatorField createPostIt={this.createPostIt}/>

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
            feedDisplays: { //dict of feedName : corresponding image file.
                "Lobby": "Lobby.img",
                "Containment Hallway": "hallway.img",
                "Testing Room A": "room.img",
                "Untitled": "insert youtube i-frame",
                "clear": "empty.img"
            },
            activeFeeds: ["Testing Room A", "Untitled", "Lobby", "clear"],
            visibleButtonSets: { //for hiding/showing the "1,2,3,4" buttons for selecting slots
                "Lobby": false,
                "Containment Hallway": false,
                "Testing Room A": false,
                "Untitled": false,
                "clear": false //can't autogenerate by referencing feedDisplays :pensive:
                //also ik an obj is probably overkill but it's nice to reference the keys rather than translating to list index
            },
        }

        console.log("test", this.state);
    }

    VideoFeed({feedName, feedDisplay}){ //theoretically feedDisplay is a video/img but leaving that as an excersise for the viewer
        console.log("vid feed!", feedName, feedDisplay);
        return(
            <div className="video-feed-indv">
                {feedDisplay}
                <br></br>
                {feedName}
            </div>
        );
    }
    VideoFeedList({dirItems, dirVisible, changeFeedFunc, toggleFeedSlotSelector, FeedSelectButton}){
        dirItems = dirItems.sort();

        return(
            <div className="video-feed-dir">
                {dirItems.map((feedName, index) => <>
                <button onClick={() => toggleFeedSlotSelector(feedName)} key={feedName+index} className={feedName}>{feedName}</button>
                <div className={feedName+"-button-set nav-button-set"} style={{visibility: dirVisible[feedName] ? "visible" : "hidden", height: dirVisible[feedName] ? "auto" : "0"}}><FeedSelectButton slot={1} feedName={feedName} changeFeedFunc={changeFeedFunc}/><FeedSelectButton slot={2} feedName={feedName} changeFeedFunc={changeFeedFunc}/><FeedSelectButton slot={3} feedName={feedName} changeFeedFunc={changeFeedFunc}/><FeedSelectButton slot={4} feedName={feedName} changeFeedFunc={changeFeedFunc}/></div>
                </>)}
            </div>
        )
    }
    FeedSelectButton({slot,feedName,changeFeedFunc}){
        return(
            <button onClick={() => (changeFeedFunc(feedName,slot))} key={feedName+slot+"button"}>{slot}</button>
        )
    }

    toggleFeedSlotSelector = (feedName) => { //alters visibleButtonSets so that it shows/hides the "1,2,3,4" feed selector button set
        console.log("TOGGLE:", this.state.visibleButtonSets);
        const tempVisibleButtonSets = {};
        Object.assign(tempVisibleButtonSets, this.state.visibleButtonSets);
        
        tempVisibleButtonSets[feedName] = !tempVisibleButtonSets[feedName];

        this.setState({
            visibleButtonSets: tempVisibleButtonSets
        });

    }
    changeVideoFeed = (feedName,slot) => {
        const tempActiveFeeds = [];
        Object.assign(tempActiveFeeds, this.state.activeFeeds);
        
        tempActiveFeeds[slot-1] = feedName;

        this.setState({
            activeFeeds: tempActiveFeeds,
            visibleButtonSets: {
                "Lobby": false,
                "Containment Hallway": false,
                "Testing Room A": false,
                "Untitled": false,
                "clear": false
            }
        });
    }

    videoFeedEvent({feedName, eventType}){
        //for initiating breaches, static.
    }

    render(){

    return(
        <div className="video-feed-container">
            <div className="video-feed-row">
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
            </div>
            
            <this.VideoFeedList FeedSelectButton={this.FeedSelectButton} changeFeedFunc={this.changeVideoFeed} toggleFeedSlotSelector={this.toggleFeedSlotSelector} dirItems={Object.keys(this.state.feedDisplays)} dirVisible={this.state.visibleButtonSets}/>
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
