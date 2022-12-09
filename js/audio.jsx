//Audio List: Showcase list of audio components
class AudioList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ul class='audio-list'>
        {this.props.list.map(audioUrl => (
            <li>
              <div>
                <AudioPlay url={audioUrl}/>
              </div>
            </li>
          ))}
          </ul>
      </div>
    );
  }
}

//AudioPlay: Individual Audio Component, includes visualization and controls
class AudioPlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playing: false};
    this.setup();
  }

  setup(){
    this.audioSource = null;
    this.analyser = null;
    this.audio = new Audio(this.props.url);
    var strDecoded= this.props.url.split("/");
    this.audioFileName = strDecoded[strDecoded.length-1];
    this.canvasId = `canvas-${this.audioFileName.split(".")[0]}`;
    this.btnId = `btn-${this.audioFileName.split(".")[0]}`;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.audio.addEventListener("ended",() => {this.setState({playing: false});},false);
  }

  playAudio(){
    this.audio.play();
    this.audioSource = this.audioSource || this.audioCtx.createMediaElementSource(this.audio);
    this.analyser = this.analyser || this.audioCtx.createAnalyser();
    this.audioSource.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
  }

  pauseAudio(){
    this.audio.pause();
  }

  pausePlay = () => {
    if (this.audio.state === "suspended") {
      this.audio.resume();
    }

    if (!this.state.playing) {
      this.playAudio();
      this.setState({playing: true});
    } else if (this.state.playing) {
      this.pauseAudio();
      this.setState({playing: false});
    }
    this.visuals();
  }

  visuals = () => {
    this.analyser.fftSize = 128;
    const bufferLength = this.analyser.frequencyBinCount;
    const canvas = document.getElementById(this.canvasId);
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = canvas.width / bufferLength;
    var x = 0;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.analyser.getByteFrequencyData(dataArray);
    let barHeight;
    for (let i = bufferLength; i > 0; i--) {
      barHeight = dataArray[i];
      const green = (i * barHeight) / 10;
      const blue = i * 4;
      const red = barHeight / 4 - 12;
      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      ctx.fillRect(x, canvas.height - barHeight/2, barWidth/2, barHeight/2);
      x += barWidth/2;
  }
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        const green = (i * barHeight) / 10;
        const blue = i * 4;
        const red = barHeight / 4 - 12;
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.fillRect(x, canvas.height - barHeight/2, barWidth/2, barHeight/2);
        x += barWidth/2;
    }

    requestAnimationFrame(this.visuals);
  }

  render() {
    return (
      <div>
          <canvas id={this.canvasId} class="visualization"></canvas>
          <h2 class="audio-title">{this.audioFileName}</h2>
          <audio>
            <source src={this.props.url} type="audio/ogg"/>
            Your browser does not support the audio element.
          </audio>
          <div class="pause-play-container">
            <button id={this.btnId} class={this.state.playing ? 'pause-btn' : 'play-btn'} aria-checked="false" onClick={this.pausePlay} />
          </div>
      </div>
    );
  }
  
}