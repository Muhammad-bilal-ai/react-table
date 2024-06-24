import "./App.css";
import { BasicTable } from "./components/BasicTable.jsx";

function App() {
  return (
    <div>
      <h1 className="px-4 py-4 flex justify-center font-extrabold text-xl">
        Users List
      </h1>
      <BasicTable />
    </div>
  );
}

export default App;
