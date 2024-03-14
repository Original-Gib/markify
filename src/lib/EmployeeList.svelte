<script>
	//imports
	import { onMount } from 'svelte';
	import { markifyService } from '../services/markify-service';
	import { page } from '$app/stores';
	import EmployeeForm from '$lib/EmployeeForm.svelte';


	const teamId = $page.params.teamId;


	let team = { employees: [] };


	onMount(async () => {
		team = await markifyService.getTeam(teamId);
		console.log(team);
	});
</script>

<div class="rounded bg-info bg-gradient w-100">
	<table class="table">
		<thead>
		<tr>
			<th scope="col" class="py-3">Name</th>
			<th scope="col" class="py-3">Supervisor</th>
			<th scope="col" class="py-3"></th>
			<th scope="col" class="py-3"></th>
		</tr>
		</thead>
		<tbody>
		{#each team.employees as employee}
			<tr>
				<td class="py-3 has-text-left">
					<i class="fa-solid fa-user"></i> {employee.firstName} {employee.lastName}
				</td>
				<td class="py-3 has-text-left">
					<i class="fa-solid fa-eye"></i> {employee.supervisor}
				</td>
				<td class="py-3">
					<button type="button" class="btn btn-secondary">
						<a href="/team/">
							<i class="fa-regular fa-folder-open" style="color:rgb(15, 16, 53)"></i>
						</a>
					</button>
				</td>
				<td class="py-3">
					<button type="button" class="btn btn-danger">
						<a href="/deleteemployee/{employee._id}">
							<i class="fas fa-trash" style="color:rgb(15, 16, 53)"></i>
						</a>
					</button>
				</td>
			</tr>
		{/each}
		<tr>
			<td>
				<EmployeeForm/>
			</td>
		</tr>
		</tbody>
	</table>
</div>