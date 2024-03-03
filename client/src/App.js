import { Route, Routes, Navigate } from "react-router-dom";

import Main_user from "./components/User/Main";
import Signup_user from "./components/User/Signup";
import Login_user from "./components/User/Login";

import Main_resowner from "./components/Res_Owner/Main";
import Signup_resowner from "./components/Res_Owner/Signup";
import Login_resowner from "./components/Res_Owner/Login";

function App() {
	const user = localStorage.getItem("token");
	const res_owner = localStorage.getItem("token_ro");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main_user />} />}
			<Route path="/signup" exact element={<Signup_user />} />
			<Route path="/login" exact element={<Login_user />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			{res_owner && <Route path="/resowner" exact element={<Main_resowner />} />}
			<Route path="/resowner/signup" exact element={<Signup_resowner />} />
			<Route path="/resowner/login" exact element={<Login_resowner />} />
			<Route path="/resowner" element={<Navigate replace to="/resowner/login" />} />
		</Routes>
	);
}

export default App;
