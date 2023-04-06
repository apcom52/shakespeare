import "./App.css";
import "altrone-ui/dist/index.css";
import { Altrone, Heading, Switcher } from "altrone-ui";
import { Shakespeare } from "./components";
import { useState } from "react";

function App() {
  const [text, setText] = useState([]);
  const [readMode, setReadMode] = useState(false);

  return (
    <Altrone>
      <main>
        <Heading>Demo</Heading>
        <Switcher checked={readMode} onChange={setReadMode}>
          Режим чтения
        </Switcher>
        <hr />
        <br />
        <Shakespeare content={text} onChange={setText} editMode={!readMode} />
      </main>
    </Altrone>
  );
}

export default App;
