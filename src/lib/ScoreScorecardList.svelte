<script>
	import { onMount } from 'svelte';
	import { markifyService } from '../services/markify-service';
	import { page } from '$app/stores';

	const teamId = $page.params.teamId;
	const employeeId = $page.params.employeeId;

	let scorecardList = [];

	onMount(async () => {
		scorecardList = await markifyService.getScorecardsByTeamId(teamId);
		console.log(scorecardList)
	});

</script>

<div class="rounded bg-info bg-gradient w-100">
	<table class="table">
		<thead>
		<tr>
			<th scope="col" class="py-3">Scorecard Name</th>
			<th scope="col" class="py-3"></th>
			<th scope="col" class="py-3"></th>
		</tr>
		</thead>
		<tbody>
		{#each scorecardList as scorecard}
			<tr>
				<td class="py-3 has-text-left">
					<i class="fa-regular fa-clipboard" style="color:rgb(15, 16, 53)"></i> {scorecard.title}
				</td>
				<td class="py-3">
					<button type="button" class="btn btn-secondary">
						<a href="/score/team/{teamId}/employee/{employeeId}/scorecard/{scorecard._id}">
							<i class="fa-regular fa-folder-open" style="color:rgb(15, 16, 53)"></i>
						</a>
					</button>
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
</div>