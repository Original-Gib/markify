<script>
	import Navbar from '$lib/Navbar.svelte';
	import ScoreLog from '$lib/ScoreLog.svelte';
</script>

<Navbar activeTab="scorelog"/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<ScoreLog />
		</div>
	</div>
</div>