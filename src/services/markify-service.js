import axios from 'axios';
import { user, team } from '../stores.js';
import { goto } from '$app/navigation';

export const markifyService = {
	baseUrl: "http://localhost:3000",

	async login(email, password) {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
			axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
				if (response.data.success) {
					user.set({
						email: email,
						token: response.data.token
					});
					localStorage.markify = JSON.stringify({ email: email, token: response.data.token });
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async logout() {
		user.set({
			email: "",
			token: "",
		});
		axios.defaults.headers.common["Authorization"] = "";
		localStorage.removeItem("markify");
	},

	async signup(firstName, lastName, email, password) {
		try {
			const userDetails = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			};
			await axios.post(this.baseUrl + "/api/users", userDetails);
			return true;
		} catch (error) {
			return false;
		}
	},

	reload() {
		const markifyCredentials = localStorage.markify;
		if (markifyCredentials) {
			const savedUser = JSON.parse(markifyCredentials);
			user.set({
				firstName: savedUser.firstName,
				email: savedUser.email,
				token: savedUser.token
			});
			axios.defaults.headers.common["Authorization"] = "Bearer " + savedUser.token;
		}
	},

	async getTeams() {
		try {
			const response = await axios.get(this.baseUrl + "/api/teams");
			if (response.data.success) {
				team.set({
					teamName: teamName,
					_id: _id
				});
			}
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async deleteTeam(teamId) {
		const urlTeamId = teamId;
		try {
			console.log("Attempting to delete team with ID: " + urlTeamId)
			const response = await axios.delete(this.baseUrl + "/api/teams/" + urlTeamId);
			goto('/staff')
			return response.status;
		} catch (error) {
			console.log("Unable to delete team ID: " + urlTeamId);
		}
	},

	async createTeam(teamName) {
		try {
			const teamDetails = {
				teamName: teamName
			};
			await axios.post(this.baseUrl + "/api/teams", teamDetails);
			return true;
		} catch (error) {
			return false;
		}
	},

	async getTeam(teamId) {
		const urlTeamId = teamId;
		try {
			console.log("attempting employee fetch")
			const response = await axios.get(this.baseUrl + "/api/teams/" + urlTeamId);
			console.log(response.data.employees);
			return response.data.employees;
		} catch (error) {
			return [];
		}
	},

	async createEmployee(teamId, firstName, lastName, email, supervisor) {
		const urlTeamId = teamId;
		try {
			const employeeDetails = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				supervisor: supervisor
			};
			await axios.post(this.baseUrl + "/api/teams/" + urlTeamId + "/employees", employeeDetails);
			return true;
		} catch (error) {
			return false;
		}
	},

	async deleteEmployee(employeeId) {
		const urlEmployeeId = employeeId;
		try {
			console.log("Attempting to delete employee with ID: " + urlEmployeeId)
			const response = await axios.delete(this.baseUrl + "/api/employees/" + urlEmployeeId);
			goto('/staff')
			return response.status;
		} catch (error) {
			console.log("Unable to delete employee ID: " + urlEmployeeId);
		}
	},

	async createScorecard(title, teamId, questions) {
		const urlTeamId = teamId;
		try {
			const scorecardDetails = {
				title: title,
				teamId: teamId,
				questions: questions,
			};
			await axios.post(this.baseUrl + "/api/teams/" + urlTeamId + "/scorecards", scorecardDetails);
			return true;
		} catch (error) {
			return false;
		}
	},
};