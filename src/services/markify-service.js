import axios from 'axios';
import { team, user } from '../stores.js';
import { goto } from '$app/navigation';

export const markifyService = {
	baseUrl: "https://markify-backend.onrender.com",

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

	async addUser(firstName, lastName, email, password) {
		try {
			const userDetails = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			};
			await axios.post(this.baseUrl + "/api/users/user", userDetails);
			return true;
		} catch (error) {
			return false;
		}
	},

	async updateUser(userId, firstName, lastName, email, password) {
		try{
			const updatedUserDetails = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			}
			await axios.put(this.baseUrl + "/api/users/" + userId, updatedUserDetails);
			return true;
		} catch (err) {
			return false;
		}
	},

	async deleteUser(userId) {
		const urlUserId = userId;
		try {
			console.log("Attempting to delete user with ID: " + urlUserId)
			const response = await axios.delete(this.baseUrl + "/api/users/" + urlUserId);
			goto('/admin')
			return response.status;
		} catch (error) {
			console.log("Unable to delete user ID: " + urlUserId);
		}
	},

	async getUsers() {
		try {
			const response = await axios.get(this.baseUrl + "/api/users");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getUser(userId) {
		try {
			const response = await axios.get(this.baseUrl + "/api/users/" + userId);
			return response.data;
		} catch (error) {
			return [];
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
			return response.data;
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

	async updateEmployee(employeeId, firstName, lastName, email, supervisor) {
		try{
			const updatedEmployeeDetails = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				supervisor: supervisor,
			}
			await axios.put(this.baseUrl + "/api/employees/" + employeeId, updatedEmployeeDetails);
			return true;
		} catch (err) {
			return false;
		}
	},

	async getEmployee(employeeId) {
		const urlEmployeeId = employeeId;
		try {
			console.log("attempting employee fetch")
			const response = await axios.get(this.baseUrl + "/api/employees/" + urlEmployeeId);
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getEmployees() {
		try {
			const response = await axios.get(this.baseUrl + "/api/employees");
			return response.data;
		} catch (error) {
			return [];
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

	async getScorecards() {
		try {
			const response = await axios.get(this.baseUrl + "/api/scorecards");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getScorecard(scorecardId) {
		const urlScorecardId = scorecardId;
		try {
			console.log("attempting scorecard fetch")
			const response = await axios.get(this.baseUrl + "/api/scorecards/" + urlScorecardId);
			console.log(response.data);
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getScorecardsByTeamId(teamId) {
		try {
			const response = await axios.get(this.baseUrl + "/api/scorecards/team/" + teamId);
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async deleteScorecard(scorecardId) {
		const urlScorecardId = scorecardId;
		try {
			console.log("Attempting to delete scorecard with ID: " + urlScorecardId)
			const response = await axios.delete(this.baseUrl + "/api/scorecards/" + urlScorecardId);
			goto('/scorecards')
			return response.status;
		} catch (error) {
			console.log("Unable to delete scorecard ID: " + urlScorecardId);
		}
	},

	async createResult(employeeId, teamId, scorecardId, userAnswers, totalScore, sumScore, percentScore, reference) {
		try {
			const answers = userAnswers.map(answerText => ({ text: answerText }));

			const resultDetails = {
				employeeId: employeeId,
				teamId: teamId,
				scorecardId: scorecardId,
				answers,
				totalScore: totalScore,
				sumScore: sumScore,
				percentScore: percentScore,
				reference: reference
			};
			await axios.post(this.baseUrl + "/api/results", resultDetails);
			return true;
		} catch (error) {
			return false;
		}
	},

	async deleteResult(resultId) {
		const urlResultId = resultId;
		try {
			const response = await axios.delete(this.baseUrl + "/api/results/" + urlResultId);
			goto('/scorelog')
			return response.status;
		} catch (error) {
			console.log("Unable to delete result ID: " + urlResultId);
		}
	},

	async getResults() {
		try {
			const response = await axios.get(this.baseUrl + "/api/results");
			return response.data;
		} catch (error) {
			return [];
		}
	},

	async getResult(resultId) {
		try {
			console.log("attempting result fetch")
			const response = await axios.get(this.baseUrl + "/api/results/" + resultId);
			console.log(response.data);
			return response.data;
		} catch (error) {
			return [];
		}
	},
};