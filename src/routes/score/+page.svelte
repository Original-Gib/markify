<script>
	import Navbar from '$lib/Navbar.svelte';
	import ScoreTeamList from '$lib/ScoreTeamList.svelte';
</script>

<Navbar activeTab="score"/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<ScoreTeamList />
		</div>
	</div>
</div>