import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";
// import deepCopy from "@/services/deepCopy";

const DBKey = "X7a74200S1W3N2K8";
// multiple users
// set userIdx where 6 pin equals and save that pin to crypt
const auth = { userData: [], userIdx: -1 };

// verify whether user data already existed or not on initial load
// then login or register is defined
(async () => {
	try {
		const userData = await SecureStore.getItemAsync(DBKey);
		if (userData) {
			auth.userData = [...JSON.parse(userData)];
		} else {
			await SecureStore.setItemAsync(DBKey, JSON.stringify([]));
		}
	} catch (error) {
		console.log(error);
	}
})();

// call this every time state change
const storeLatestUpdate = async () => {
	await SecureStore.setItemAsync(DBKey, JSON.stringify(auth.userData));
};

async function hashPin(pin) {
	return await Crypto.digestStringAsync(
		Crypto.CryptoDigestAlgorithm.SHA256,
		pin
	);
}

const register = async (pin) => {
	const hash = await hashPin(pin);

	if (auth.userData.length > 0) {
		const isExistedAcc = auth.userData.findIndex(
			(user) => user.pin === hash
		);

		if (isExistedAcc !== -1) {
			return { error: true, msg: "Cannot set up same key account" };
		}
	}

	auth.userIdx = auth.userData.length;
	auth.userData.push({ pin: hash, accounts: [] });

	await storeLatestUpdate();

	return { success: true };
};

const login = async (enteredPin) => {
	try {
		if (auth.userData.length === 0) {
			return { error: true, msg: "No user registered" };
		}
		const enteredPinHash = await hashPin(enteredPin);

		// Loop through user data to find a matching pin hash
		for (let i = 0; i < auth.userData.length; i++) {
			const user = auth.userData[i];

			if (user.pin === enteredPinHash) {
				// If PIN hash matches, return user data
				auth.userIdx = i; // Set current user index

				break;
			}
		}

		if (auth.userIdx !== -1) {
			await storeLatestUpdate();
			return { success: true };
		}

		// If no matching hash is found
		return { error: true, msg: "Invalid PIN" };
	} catch (error) {
		console.log(error);
		return { error: true, msg: "Something went wrong" };
	}
};

const logout = async () => {
	auth.userIdx = -1;
};

const getAllAccountInfo = () => {
	return auth.userData[auth.userIdx].accounts;
};

const addNewAccountInfo = async (accountInfo) => {
	try {
		const id = auth.userData[auth.userIdx].accounts.length + 1;
		const account = {
			id,
			...accountInfo,
			createdAt: new Date().toISOString(),
		};

		auth.userData[auth.userIdx].accounts.push(account);

		// must call every time update or delete or
		await storeLatestUpdate();

		return { success: true, id };
	} catch (error) {
		console.log(error);
		return { error: true, msg: "Something went wrong" };
	}
};

const updateAccountInfo = async (accountInfo) => {
	try {
		auth.userData[auth.userIdx].accounts.forEach((acc) => {
			if (acc.id === accountInfo.id) {
				acc.platform = accountInfo.platform;
				acc.accountName = accountInfo.accountName;
				acc.bindWith = accountInfo.bindWith;
				acc.password = accountInfo.password;
				acc.note = accountInfo.note;
				acc.modifiedAt = new Date().toISOString();
				return;
			}
		});

		await storeLatestUpdate();

		return { success: true };
	} catch (error) {
		console.log(error);
		return { error: true, msg: "Something went wrong" };
	}
};

const deleteAccountInfo = async (id) => {
	try {
		auth.userData[auth.userIdx].accounts = auth.userData[
			auth.userIdx
		].accounts.filter((acc) => acc.id !== id);

		await storeLatestUpdate();

		return { success: true };
	} catch (error) {
		console.log(error);
		return { error: true, msg: "Something went wrong" };
	}
};

const StorageAPI = {
	register,
	login,
	logout,
	getAllAccountInfo,
	addNewAccountInfo,
	updateAccountInfo,
	deleteAccountInfo,
};

export default StorageAPI;
