import clipboardCopy from 'clipboard-copy';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const copyToClipboard = () => {
    clipboardCopy(transcript);
    toast.success('Copied to clipboard!');
  };

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const speakText = () => {
    if (!transcript) {
      toast.error('No text available to read!');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
    toast.info('Reading text aloud...');
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <>
      <header className="header">
        <h1>Speech to Text Converter</h1>
      </header>
      <main className="main">
        <p className="description">
          Convert your speech to text in real-time and copy it to your clipboard with ease.
        </p>

        <div className="transcript-box" onClick={copyToClipboard}>
          {transcript || "Start speaking to see your text here..."}
        </div>

        <div className="button-group">
          <button className="btn" onClick={copyToClipboard}>Copy to Clipboard</button>
          <button className="btn" onClick={startListening}>Start Listening</button>
          <button className="btn" onClick={SpeechRecognition.stopListening}>Stop Listening</button>
          <button className="btn" onClick={speakText}>Read Aloud</button>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default App;