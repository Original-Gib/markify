<script>
	import Navbar from '$lib/Navbar.svelte';
	import ScoreEmployeeList from '$lib/ScoreEmployeeList.svelte';
</script>

<Navbar activeTab="score"/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<ScoreEmployeeList />
		</div>
	</div>
</div>