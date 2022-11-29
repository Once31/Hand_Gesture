import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Game from "./Game";
import HandRec from "./HandRec";
import Missing from "./Missing";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import React from "react";
import MusicPlayer from "./MusicPlayer";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utils";
import * as fp from "fingerpose";
import ThumbsDownGesture from "./gestures/ThumbsDown.js";
import MiddleFingerGesture from "./gestures/MiddleFinger.js";
import OKSignGesture from "./gestures/OKSign.js";
import PinchedFingerGesture from "./gestures/PinchedFinger.js";
import PinchedHandGesture from "./gestures/PinchedHand.js";
import RaisedHandGesture from "./gestures/RaisedHand.js";
import LoveYouGesture from "./gestures/LoveYou.js";
import RockOnGesture from "./gestures/RockOn.js";
import CallMeGesture from "./gestures/CallMe.js";
import PointUpGesture from "./gestures/PointUp.js";
import PointDownGesture from "./gestures/PointDown.js";
import PointRightGesture from "./gestures/PointRight.js";
import PointLeftGesture from "./gestures/PointLeft.js";
import RaisedFistGesture from "./gestures/RaisedFist.js";

import call_me from "./img/call_me.png";
import love_you from "./img/love_you.png";
import ok_sign from "./img/ok_sign.png";
import pinched_finger from "./img/pinched_finger.png";
import pinched_hand from "./img/pinched_hand.png";
import point_down from "./img/point_down.png";
import point_left from "./img/point_left.png";
import point_right from "./img/point_right.png";
import point_up from "./img/point_up.png";
import raised_fist from "./img/raised_fist.png";
import raised_hand from "./img/raised_hand.png";
import rock_on from "./img/rock_on.png";
import thumbs_down from "./img/thumbs_down.png";
import thumbs_up from "./img/thumbs_up.png";
import victory from "./img/victory.png";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [emoji, setEmoji] = useState(null);
  const audio = {
    raised_fist: "raised_fist",
    raised_hand: "raised_hand",
    thumbs_up: "thumbs_up",
    thumbs_down: "thumbs_down",
  };
  const images = {
    thumbs_up: thumbs_up,
    victory: victory,
    thumbs_down: thumbs_down,

    ok_sign: ok_sign,
    pinched_finger: pinched_finger,
    pinched_hand: pinched_hand,
    raised_hand: raised_hand,
    love_you: love_you,
    rock_on: rock_on,
    call_me: call_me,
    point_up: point_up,
    point_down: point_down,
    point_left: point_left,
    point_right: point_right,
    raised_fist: raised_hand,
  };

  const runHandpose = async () => {
    const net = await handpose.load();
    //console.log("handpose model loaded");
    // loop and detect hand
    setInterval(() => {
      detect(net);
    }, 100);
  };
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current != null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      // make detection
      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          ThumbsDownGesture,
          //MiddleFingerGesture,
          OKSignGesture,
          PinchedFingerGesture,
          PinchedHandGesture,
          RaisedHandGesture,
          LoveYouGesture,
          RockOnGesture,
          CallMeGesture,
          PointRightGesture,
          //PointUpGesture,
          //  PointLeftGesture,
          // PointDownGesture,
          RaisedFistGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 8);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          setEmoji(gesture.gestures[maxConfidence].name);
        }
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  runHandpose();

  return (
    <div className="App">
      <Header title="Hand Gesture" />
      <Nav />
      <Switch>
        <Route exact path="/">
          <HandRec
            webcamRef={webcamRef}
            canvasRef={canvasRef}
            emoji={emoji}
            setEmoji={setEmoji}
            images={images}
          />
        </Route>

        <Route exact path="/music">
          <MusicPlayer
            webcamRef={webcamRef}
            canvasRef={canvasRef}
            emoji={emoji}
            audio={audio}
          />
        </Route>

        <Route path="/game" component={Game} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
