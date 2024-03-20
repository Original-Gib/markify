<script>
	import Navbar from '$lib/Navbar.svelte';
	import EditUserForm from '$lib/EditUserForm.svelte';
</script>


<Navbar activeTab="admin"/>

<div class="container bg-dark bg-gradient">
	<div class="row">
		<div class="col-md-12">
			<EditUserForm />
		</div>
	</div>
</div>