<script>
	import { onDestroy, onMount } from 'svelte';
	import { markifyService } from '../services/markify-service.js';
	import Chart from 'chart.js/auto';



	let results;

	let teams;
	let teamDataLabels = [];
	let teamDataScores = [];
	let weightedTeamScores = [];

	let employees;
	let employeeDataLabels = [];
	let employeeDataScores = [];
	let weightedEmployeeScores = [];

	let teamChart;
	let employeeChart;

	onMount( async () => {
		employees = await markifyService.getEmployees();
		teams = await markifyService.getTeams();
		results = await markifyService.getResults();



		teams.forEach(team => {
			teamDataLabels.push(team.teamName);
		})

		employees.forEach(employee => {
			let fullName = '';
			fullName = `${employee.firstName} ${employee.lastName}`;
			employeeDataLabels.push(fullName)
		})

		results.forEach(result => {
			const employeeId = result.employeeId;
			const teamId = result.teamId;

			if (!employeeDataScores[employeeId]) {
				employeeDataScores[employeeId] = { sumScore: 0, totalScore: 0 };
			}

			if (!teamDataScores[teamId]) {
				teamDataScores[teamId] = { sumScore: 0, totalScore: 0 };
			}

			employeeDataScores[employeeId].sumScore += result.sumScore;
			employeeDataScores[employeeId].totalScore += result.totalScore;
			teamDataScores[teamId].sumScore += result.sumScore;
			teamDataScores[teamId].totalScore += result.totalScore;
		});

		Object.keys(employeeDataScores).forEach(employeeId => {
			let weightedEmployeeScore = 0;
			if (employeeDataScores[employeeId].sumScore > 0) {
				weightedEmployeeScore = Math.round((employeeDataScores[employeeId].totalScore / employeeDataScores[employeeId].sumScore) * 100);
			}
			weightedEmployeeScores.push(weightedEmployeeScore);
		});

		Object.keys(teamDataScores).forEach(teamId => {
			let weightedScore = 0;
			if (teamDataScores[teamId].sumScore > 0) {
				weightedScore = Math.round((teamDataScores[teamId].totalScore / teamDataScores[teamId].sumScore) * 100);
			}
			weightedTeamScores.push(weightedScore);
		});



		const teamCtx = document.getElementById('teamChart').getContext('2d');
		const employeeCtx = document.getElementById('employeeChart').getContext('2d');

		teamChart = new Chart(teamCtx, {
			type: 'bar',
			data: {
				labels: teamDataLabels,
				datasets: [{
					label: 'Average Team Score',
					data: weightedTeamScores,
					backgroundColor: [
						'rgba(220, 242, 241, 1)',
						'rgba(54, 84, 134, 1)',
						'rgba(15, 16, 53, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
					],
					borderColor: [
						'rgba(220, 242, 241, 1)',
						'rgba(54, 84, 134, 1)',
						'rgba(15, 16, 53, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
					],
					borderWidth: 1
				}]
			},
			options: {

				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});

		employeeChart = new Chart(employeeCtx, {
			type: 'bar',
			data: {
				labels: employeeDataLabels,
				datasets: [{
					label: 'Average Employee Score',
					data: weightedEmployeeScores,
					backgroundColor: [
						'rgba(220, 242, 241, 1)',
						'rgba(54, 84, 134, 1)',
						'rgba(15, 16, 53, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
					],
					borderColor: [
						'rgba(220, 242, 241, 1)',
						'rgba(54, 84, 134, 1)',
						'rgba(15, 16, 53, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});
	});

	onDestroy(() => {
		teamChart.destroy();
		employeeChart.destroy();
	});
</script>

<div class="rounded bg-info bg-gradient p-5">
<canvas id="teamChart"></canvas>
<canvas id="employeeChart"></canvas>
</div>
