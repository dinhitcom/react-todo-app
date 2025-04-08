import "./App.css";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="container flex items-center justify-center h-screen w-screen bg-amber-50">
      <TodoList></TodoList>
    </div>
  );
}

export default App;
