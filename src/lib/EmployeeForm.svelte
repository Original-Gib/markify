<script>
	//imports
	import { markifyService } from '../services/markify-service';
	import { page } from '$app/stores';

	let firstName = '';
	let lastName = '';
	let email = '';
	let supervisor = '';
	let errorMessage = '';

	const teamId = $page.params.teamId;

	async function createEmployee () {
		console.log(`attempting to create employee: ${firstName} ${lastName}`);
		let success = await markifyService.createEmployee(
			teamId,
			firstName,
			lastName,
			email,
			supervisor
		);
		if (success) {
			location.reload();
		} else {
			errorMessage = 'Error Trying to create employee';
		}
	}

	</script>

<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
	<i class="fa-solid fa-plus"></i>
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">Add new employee</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<form on:submit|preventDefault={createEmployee}>
					<div class="row">
					<div class="col mb-3">
						<input bind:value={firstName} class="form-control" id="firstName" name="firstName" placeholder="First Name" type="text" />
					</div>
					<div class="col mb-3">
						<input bind:value={lastName} class="form-control" id="lastName" name="lastName" placeholder="Last Name" type="text" />
					</div>
					</div>
					<div class="mb-3">
						<input bind:value={email} class="form-control" id="email" name="email" placeholder="Email" type="text" />
					</div>
					<div class="mb-3">
						<input bind:value={supervisor} class="form-control" id="supervisor" name="supervisor" placeholder="Supervisor" type="text" />
					</div>
					<div class="row gx-5">
						<div class="col">
							<button class="btn btn-success">Add Employee</button>
						</div>
						<div class="col">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

{#if errorMessage}
	<div class="section">
		{errorMessage}
	</div>
{/if}