import Form from "./components/Form";
import List from "./components/List";
import style from "./App.module.css";

function App() {
  return (
    <div className={style.appContainer}>
    <List/>
     <Form/>
    </div>
  );
}

export default App;
