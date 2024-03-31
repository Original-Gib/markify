<script>
	//imports
	import { markifyService } from '../services/markify-service';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let firstName = '';
	let lastName = '';
	let email = '';
	let supervisor = '';
	let errorMessage = '';

	let employee = {};

	const employeeId = $page.params.employeeId;

	onMount(
		async function getEmployee(){
			employee = await markifyService.getEmployee(employeeId)

			firstName = employee.firstName;
			lastName = employee.lastName;
			email = employee.email;
			supervisor = employee.supervisor;
		}
	)

	async function updateEmployee () {
		let success = await markifyService.updateEmployee(
			employeeId,
			firstName,
			lastName,
			email,
			supervisor
		);
		if (success) {
			location.reload();
		} else {
			errorMessage = 'Error trying to update employee';
		}
	}

</script>

<div class="rounded bg-info bg-gradient w-100">
				<form on:submit|preventDefault={updateEmployee} class="container">
					<h3 class="text-center mb-4">Edit Employee</h3>
					<div class="row">
						<div class="col mb-3">
							<label class="form-label" for="firstName">First Name:</label>
							<input bind:value={firstName} class="form-control" id="firstName" name="firstName" placeholder="First Name" type="text" />
						</div>
						<div class="col mb-3">
							<label class="form-label" for="lastName">Last Name:</label>
							<input bind:value={lastName} class="form-control" id="lastName" name="lastName" placeholder="Last Name" type="text" />
						</div>
					</div>
					<div class="mb-3">
						<label class="form-label" for="email">Email:</label>
						<input bind:value={email} class="form-control" id="email" name="email" placeholder="Email" type="text" />
					</div>
					<div class="mb-3">
						<label class="form-label" for="supervisor">Supervisor:</label>
						<input bind:value={supervisor} class="form-control" id="supervisor" name="supervisor" placeholder="Supervisor" type="text" />
					</div>
					<div class="row gx-5">
						<div class="col mb-3">
							<button class="btn btn-success">Save Employee</button>
						</div>
						<div class="col">
							<a href="/staff">
							<button type="button" class="btn btn-secondary">Cancel</button>
							</a>
						</div>
					</div>
				</form>
</div>

{#if errorMessage}
	<div class="alert alert-danger" role="alert">
		{errorMessage}
	</div>
{/if}