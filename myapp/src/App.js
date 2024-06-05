import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingSpinner from "./Loader/Loader";
import Comments from "./pages/Student/Comments/Comments";

import Students from "./pages/Student/Students";

function App() {
  const { loading } = useSelector((state) => state.utils);

  return (
    <>
      {loading && <LoadingSpinner />}

      <Routes>
        <Route path="/" Component={Comments} />
      </Routes>
    </>
  );
}

export default App;
