<script>
	import Navbar from '$lib/Navbar.svelte';
	import TeamList from '$lib/TeamList.svelte';
</script>

<Navbar activeTab="staff"/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<TeamList />
		</div>
	</div>
</div>