<script>
	import Navbar from '$lib/Navbar.svelte';
	import EmployeeList from '$lib/EmployeeList.svelte';
</script>

<Navbar/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<EmployeeList />
		</div>
	</div>
</div>