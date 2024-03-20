<script>
	import Navbar from '$lib/Navbar.svelte';
	import ScorecardCreationForm from '$lib/ScorecardCreationForm.svelte';
</script>

<Navbar activeTab="scorecards"/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<ScorecardCreationForm />
		</div>
	</div>
</div>