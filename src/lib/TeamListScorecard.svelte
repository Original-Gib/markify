<script>
	import { onMount } from 'svelte';
	import { markifyService } from '../services/markify-service';

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
						<a href="/scorecards/{team._id}">
							<i class="fa-regular fa-clipboard" style="color:rgb(15, 16, 53)"></i>
						</a>
					</button>
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
</div>