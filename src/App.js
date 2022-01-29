import { BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Suspense from "./components/Suspense/Suspense";
import AppContext from "./shared/contexts/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <AppContext.Provider value={{}}>
      <BrowserRouter>
        <Suspense>
          {/* <Routes> */}
            <Layout />
          {/* </Routes> */}
        </Suspense>
      </BrowserRouter>
      <ToastContainer hideProgressBar pauseOnFocusLoss={false} />
    </AppContext.Provider>
  );
}

export default App;
