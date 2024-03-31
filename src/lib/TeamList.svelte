<script>
	import { onMount } from 'svelte';
	import { markifyService } from '../services/markify-service';
	import TeamForm from '$lib/TeamForm.svelte';

	let teamList = [];

	onMount(async () => {
		teamList = await markifyService.getTeams();
		console.log(teamList)
	});

</script>

<div class="rounded bg-info bg-gradient w-100">
	<table class="table">
		<thead>
		<tr>
			<th scope="col" class="py-3">Team Name</th>
			<th scope="col" class="py-3"></th>
			<th scope="col" class="py-3"></th>
		</tr>
		</thead>
		<tbody>
		{#each teamList as team}
			<tr>
				<td class="py-3 has-text-left">
					<i class="fa-solid fa-people-group"></i> {team.teamName}
				</td>
				<td class="py-3">
					<button type="button" class="btn btn-secondary">
					<a href="/team/{team._id}">
						<i class="fa-regular fa-folder-open" style="color:rgb(15, 16, 53)"></i>
					</a>
					</button>
				</td>
				<td class="py-3">
					<button type="button" class="btn btn-danger">
					<a href="/deleteteam/{team._id}">
						<i class="fas fa-trash" style="color:rgb(15, 16, 53)"></i>
					</a>
					</button>
				</td>
			</tr>
		{/each}
		<tr>
			<td>
				<TeamForm/>
			</td>
		</tr>
		</tbody>
	</table>
</div>