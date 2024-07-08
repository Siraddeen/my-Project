import { useState } from "react";
import KanbanBoard from "./kk";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className=" bg-gradient-to-b from-red-100 to-yellow-200 h-screen">
        <div></div> <br />
        <KanbanBoard />
      </div>
    </>
  );
}

export default App;
