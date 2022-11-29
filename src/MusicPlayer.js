import Webcam from "react-webcam";
import Bahara from "./audio/Bahara.mp3";
const MusicPlayer = ({ webcamRef, canvasRef, emoji, audio }) => {
  const audioPlay = () => {
    const play = document.getElementById("play");
    play.play();
  };
  const audioPause = () => {
    const play = document.getElementById("play");
    play.pause();
  };

  const mute = () => {
    const mute = document.getElementById("play");
    mute.muted = true;
  };

  const unmute = () => {
    const mute = document.getElementById("play");
    mute.muted = false;
  };

  if (audio[emoji] === "raised_hand") {
    audioPlay();
  }

  if (audio[emoji] === "raised_fist") {
    audioPause();
  }

  if (audio[emoji] === "thumbs_down") {
    mute();
  }

  if (audio[emoji] === "thumbs_up") {
    unmute();
  }

  return (
    <>
      {" "}
      <Webcam ref={webcamRef} />
      <canvas ref={canvasRef} />
      <audio id="play" controls>
        <source src={Bahara} />
      </audio>
      <button hidden onClick={audioPlay}>
        play
      </button>
      <button hidden onClick={audioPause}>
        pause
      </button>
      <button hidden onClick={mute}>
        mute
      </button>
      <button hidden onClick={unmute}>
        unmute
      </button>
    </>
  );
};
export default MusicPlayer;
