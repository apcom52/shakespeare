import "./App.css";
import "altrone-ui/dist/index.css";
import { Altrone, Heading, Switcher } from "altrone-ui";
import { Shakespeare } from "./components";
import { useState } from "react";

function App() {
  const [text, setText] = useState({
    name: "Example",
    shakespeareVersion: 1,
    content: [
      {
        id: "123",
        widget: "divider",
      },
    ],
  });
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
        <Shakespeare
          document={text}
          onDocumentChange={setText}
          editMode={!readMode}
        />
        <details>
          <summary>Document content</summary>
          <p
            style={{
              wordWrap: "break-word",
              maxWidth: "600px",
              whiteSpace: "break-spaces",
            }}
          >
            {JSON.stringify(text)}
          </p>
        </details>
      </main>
    </Altrone>
  );
}

export default App;
