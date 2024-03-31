<script>

import Navbar from '$lib/Navbar.svelte';
import Charts from '$lib/Charts.svelte';
</script>

<Navbar activeTab="reports"/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<Charts/>
		</div>
	</div>
</div>