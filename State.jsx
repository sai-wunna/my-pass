import React, { createContext, useState, useContext } from "react";
import StorageAPI from "./api";
import { Vibration } from "react-native";

// authentication system

// Create Context
const GlobalStateContext = createContext();

// Create Provider
export const GlobalStateProvider = ({ children }) => {
	const [route, navigate] = useState("auth");
	const [accountInformation, setAccountInformation] = useState([]);

	const addNewAccountInfo = async (accountInfo) => {
		const result = await StorageAPI.addNewAccountInfo(accountInfo);
		if (result.error) {
			return result;
		} else {
			await loadData();
			return { success: true };
		}
	};

	const updateAccountInfo = async (accountInfo) => {
		const result = await StorageAPI.updateAccountInfo(accountInfo);
		if (result.error) {
			return result;
		} else {
			await loadData();
			return { success: true };
		}
	};

	const deleteAccountInfo = async (id) => {
		const result = await StorageAPI.deleteAccountInfo(id);
		if (result.error) {
			return result;
		} else {
			await loadData();
			return { success: true };
		}
	};

	const loadData = async () => {
		const data = await StorageAPI.getAllAccountInfo();
		setAccountInformation([...data]);
	};

	const logout = () => {
		setAccountInformation([]);
		StorageAPI.logout();
		Vibration.vibrate(1);
		navigate("auth");
	};

	return (
		<GlobalStateContext.Provider
			value={{
				route,
				navigate,
				accountInformation,
				loadData,
				addNewAccountInfo,
				updateAccountInfo,
				deleteAccountInfo,
				logout,
			}}>
			{children}
		</GlobalStateContext.Provider>
	);
};

// Accessing global state
export const useGlobalState = () => useContext(GlobalStateContext);
