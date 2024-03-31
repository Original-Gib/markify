<script>
	import Navbar from '$lib/Navbar.svelte';
	import TeamListScorecard from '$lib/TeamListScorecard.svelte';
</script>

<Navbar activeTab="scorecards"/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<TeamListScorecard />
		</div>
	</div>
</div>