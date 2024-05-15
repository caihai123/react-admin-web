import { useBoolean } from "ahooks";

export default function FileAudioModal(props) {
  const [visible, { set }] = useBoolean(false);

  return (
    <div style={{ display: visible ? "block" : "none" }} className="audio-box">
      <div style={{ padding: "10px 14px 14px 14px" }}>
        <div className="audio-box__header">
          <div class="audio-name">
            <span>{props.name}</span>
          </div>
          <div className="close-icon" onClick={set(false)}></div>
        </div>

        <audio className="audio" src={props.audioSrc} controls autoplay></audio>
      </div>
    </div>
  );
}
