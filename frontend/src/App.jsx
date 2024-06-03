import Body from "./Components/Body";
import "./App.css"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import '../style/ToastStyle.css'


export default function App() {
  return (
    <h1 className="">
      <Body />
      <ToastContainer position="top-center"
        theme="colored"
        autoClose={1000}
        stacked={false} />
    </h1>
  )
}