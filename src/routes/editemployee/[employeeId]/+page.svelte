<script>
	import Navbar from '$lib/Navbar.svelte';
	import EditEmployeeForm from '$lib/EditEmployeeForm.svelte';
</script>


<Navbar activeTab="staff"/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<EditEmployeeForm />
		</div>
	</div>
</div>