import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/User/Main";
import Signup from "./components/User/Signup";
import Login from "./components/User/Login";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			{user && <Route path="/admin" exact element={<Main />} />}
			<Route path="/admin/signup" exact element={<Signup />} />
			<Route path="/admin/login" exact element={<Login />} />
			<Route path="/admin" element={<Navigate replace to="/admin/login" />} />
		</Routes>
	);
}

export default App;
