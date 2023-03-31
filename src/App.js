import "./App.css";
import "altrone-ui/dist/index.css";
import { Altrone, Heading } from "altrone-ui";
import { Shakespeare } from "./components";

function App() {
  return (
    <Altrone>
      <main>
        <Heading>Demo</Heading>
        <Shakespeare />
      </main>
    </Altrone>
  );
}

export default App;
