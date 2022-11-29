import React, { useRef, useState } from "react";
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
/*import victory from "./img/victory.png";
import thumbs_up from "./img/thumbs_up.png";
import thumbs_down from "./img/thumbs_down.png";
import middle_finger from "./img/middle_finger.png";
import ok_sign from "./img/ok_sign.png";
import pinched_finger from "./img/pinched_finger.png";
import pinched_hand from "./img/pinched_hand.png";
import raised_hand from "./img/raised_hand.png";
import love_you from "./img/love_you.png";
import rock_on from "./img/rock_on.png";
import call_me from "./img/call_me.png";
import point_up from "./img/point_up.png";
import point_down from "./img/point_down.png";
import point_left from "./img/point_left.png";
import point_right from "./img/point_right.png";
import raised_fist from "./img/raised_fist.png";
*/

const HandRec = ({ webcamRef, canvasRef, emoji, setEmoji, images }) => {
  return (
    <>
      <main className="Home">
        <Webcam ref={webcamRef} />
        <canvas ref={canvasRef} />

        {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
            alt="hand gesture"
          />
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default HandRec;
