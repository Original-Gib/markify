import {writable} from "svelte/store";

export const user = writable({
	email: "",
	token: "",
});

export const team = writable({
	teamName: "",
	_id: "",
});