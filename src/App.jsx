import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  // use Ref hook
  const passRef = useRef(null);

  //Use of callSatck Hooks
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }

    if (character) {
      str += "!@#$%^&*(){}?~";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
      console.log(pass);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  const copyToCLipboard = useCallback(() => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0, length)
    window.navigator.clipboard.writeText(password)
    console.log(password)
  }, [password]);

  // useEffect Hooks
  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <>
      <h1 className="heading">Password Generator</h1>
      <input className="Password"
        placeholder="Password"
        type="text" value={password}
        readOnly
        ref={passRef} />
      <button onClick={copyToCLipboard}>Copy</button>
      <br /><br />
      <input
        type="range"
        min={8}
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value))}
      />
      <label>Length:{length}</label>
      <input
        type="checkbox"
        onChange={() => {
          setNumber((prev) => !prev);
        }}
      />
      <label>Number</label>
      <input
        type="checkbox"
        onChange={() => {
          setCharacter((prev) => !prev);
        }}
      />
      <label>Character</label>
    </>
  );
}

export default App;
