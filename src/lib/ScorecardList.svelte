<script>
	import { onMount } from 'svelte';
	import { markifyService } from '../services/markify-service';
	import { page } from '$app/stores';

	const teamId = $page.params.teamId;

	let scorecardList = [];

	onMount(async () => {
		scorecardList = await markifyService.getScorecards();
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
						<a href="/scorecard/scorecardId">
							<i class="fa-regular fa-folder-open" style="color:rgb(15, 16, 53)"></i>
						</a>
					</button>
				</td>
				<td class="py-3">
					<button type="button" class="btn btn-danger">
						<a href="/deletescorecard/{scorecard._id}">
							<i class="fas fa-trash" style="color:rgb(15, 16, 53)"></i>
						</a>
					</button>
				</td>
			</tr>
		{/each}
		<tr>
			<td>
				<button type="button" class="btn btn-success">
					<a href="/scorecards/{teamId}/createscorecard">
						<i class="fa-solid fa-plus" style="color:rgb(15, 16, 53)"></i>
					</a>
			</td>
		</tr>
		</tbody>
	</table>
</div>