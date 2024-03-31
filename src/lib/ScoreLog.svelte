<script>
	import { onMount } from 'svelte';
	import { markifyService } from '../services/markify-service';
	import { derived, writable } from 'svelte/store';

	let resultList = writable([]);
	let teams = [];
	const selectedTeamName = writable('');

	onMount(async () => {
		let scores = await markifyService.getResults();
		teams = await markifyService.getTeams();
		let employees = await markifyService.getEmployees();
		let users = await markifyService.getUsers();


		let teamMap = {};
		teams.forEach(team => {
			teamMap[team._id] = team;
		});

		let employeeMap = {};
		employees.forEach(employee => {
			employeeMap[employee._id] = employee;
		});

		let userMap = {};
		users.forEach(user => {
			userMap[user._id] = user;
		});

		resultList.set(scores.map(score => ({
			...score,
			teamName: teamMap[score.teamId]?.teamName,
			employeeName: employeeMap[score.employeeId]?.firstName + ' ' + employeeMap[score.employeeId]?.lastName,
			evaluator: userMap[score.evaluatorId]?.firstName + ' ' + userMap[score.evaluatorId]?.lastName
		})));
	});

	const filteredResults = derived([resultList, selectedTeamName], ([$resultList, $selectedTeamName]) => {
		return $resultList.filter(result => !$selectedTeamName || result.teamName === $selectedTeamName);
	});

</script>

<div class="rounded bg-info bg-gradient w-100">
	<div class="row">
		<div class="col text-end">
			<div class="d-inline-block">
				<span class="me-2"><i class="fa-solid fa-filter"></i></span>
				<select class="form-select d-inline-block w-auto" bind:value={$selectedTeamName}>
					<option value="">All Teams</option>
					{#each teams as team}
						<option value={team.teamName}>{team.teamName}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<table class="table">
		<thead>
		<tr>
			<th scope="col" class="py-3"><i class="fa-solid fa-circle-info" style="color:rgb(15, 16, 53)"></i> Reference</th>
			<th scope="col" class="py-3"><i class="fa-solid fa-user"></i> Employee</th>
			<th scope="col" class="py-3"><i class="fa-solid fa-people-group"></i> Team</th>
			<th scope="col" class="py-3"><i class="fa-solid fa-eye"></i> Evaluator</th>
			<th scope="col" class="py-3"><i class="fa-regular fa-clipboard" style="color:rgb(15, 16, 53)"></i> Score</th>
			<th scope="col" class="py-3"></th>
			<th scope="col" class="py-3"></th>
		</tr>
		</thead>
		<tbody>
		{#each $filteredResults as result}
			<tr>
				<td class="py-3 has-text-left">
					{result.reference}
				</td>
				<td class="py-3 has-text-left">
					{result.employeeName}
				</td>
				<td class="py-3 has-text-left">
					{result.teamName}
				</td>
				<td class="py-3 has-text-left">
					{result.evaluator}
				</td>
				<td class="py-3 has-text-left">
					{result.percentScore}%
				</td>
				<td class="py-3">
					<button type="button" class="btn btn-secondary">
						<a href="/scorelog/viewscore/{result._id}">
							<i class="fa-regular fa-folder-open" style="color:rgb(15, 16, 53)"></i>
						</a>
					</button>
				</td>
				<td class="py-3">
					<button type="button" class="btn btn-danger">
						<a href="/deleteresult/{result._id}">
							<i class="fas fa-trash" style="color:rgb(15, 16, 53)"></i>
						</a>
					</button>
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
</div>