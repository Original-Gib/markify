<script>
	import Navbar from '$lib/Navbar.svelte';
	import TeamList from '$lib/TeamList.svelte';
	import TeamForm from '$lib/TeamForm.svelte';
</script>

<Navbar/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<!-- Assuming TeamList spans 8 columns, adjust 'col-md-8' as needed for your design -->
		<div class="col-md-12">
			<TeamList />
		</div>
	</div>
</div>