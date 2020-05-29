import React from 'react';
import VisualDemo from './VisualDemo';
import soundFile from '../audio/GummyBearz.mp3'

class AudioDataContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.frequencyBandArray = [...Array(26).keys()]
  }

  initializeAudioAnalyser = () => {
    console.log("Initialising audioContext")
    const audioFile = new Audio();
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audioFile);
    const analyser = audioContext.createAnalyser();
    audioFile.src = soundFile;
    analyser.fftSize = 64
    source.connect(audioContext.destination);
    source.connect(analyser);
    audioFile.play()
    this.setState({
      audioAnalyser: analyser
    })
  }

  withFrequencyData = (callbackFn) => {
    const bufferLength = this.state.audioAnalyser.frequencyBinCount;
    const amplitudeArray = new Uint8Array(bufferLength);
    this.state.audioAnalyser.getByteFrequencyData(amplitudeArray)
    callbackFn(amplitudeArray)
  }

  render() {
    return (
      <div>
        <VisualDemo
          initializeAudioAnalyser={this.initializeAudioAnalyser}
          frequencyBandArray={this.frequencyBandArray}
          withFrequencyData={this.withFrequencyData}
          audioAnalyser={this.state.audioAnalyser}
        />

      </div>
    );
  }
}

export default AudioDataContainer;
