<script>
	import Navbar from '$lib/Navbar.svelte';
	import ScoringForm from '$lib/ScoringForm.svelte';
</script>

<Navbar activeTab="score"/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<ScoringForm />
		</div>
	</div>
</div>