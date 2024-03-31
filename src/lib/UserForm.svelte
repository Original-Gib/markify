<script>
	//imports
	import { markifyService } from '../services/markify-service';

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage = '';


	async function addUser() {
		if (firstName && lastName && email && password && confirmPassword) {
			if (password === confirmPassword) {
				let success = await markifyService.addUser(firstName, lastName, email, password);
				if (success) {
					location.reload();
				} else {
					errorMessage = "Error Trying to add user";
				}
			} else {
				errorMessage = "Passwords do not match"
			}
		} else {
			errorMessage = "Please complete all fields"
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
				<h1 class="modal-title fs-5" id="exampleModalLabel">Add new user</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<form on:submit|preventDefault={addUser}>
					<div class="row">
						<div class="col-md-6 mb-3">
							<label for="firstname" class="form-label">First Name</label>
							<input
								bind:value={firstName}
								id="firstname"
								class="form-control"
								type="text"
								placeholder="Enter first name"
								name="firstName"
							/>
						</div>
						<div class="col-md-6 mb-3">
							<label for="lastname" class="form-label">Last Name</label>
							<input
								bind:value={lastName}
								id="lastname"
								class="form-control"
								type="text"
								placeholder="Enter last name"
								name="lastName"
							/>
						</div>
					</div>

					<div class="mb-3">
						<label for="email" class="form-label">Email</label>
						<input
							bind:value={email}
							id="email"
							class="form-control"
							type="text"
							placeholder="Enter email"
							name="email"
						/>
					</div>
					<div class="row">
						<div class="col-md-6 mb-3">
							<label for="password" class="form-label">Password</label>
							<input
								bind:value={password}
								id="password"
								class="form-control"
								type="password"
								placeholder="Enter Password"
								name="password"
							/>
						</div>
						<div class="col-md-6 mb-3">
							<label for="confirmPassword" class="form-label">Confirm Password</label>
							<input
								bind:value={confirmPassword}
								id="confirmPassword"
								class="form-control"
								type="password"
								placeholder="Confirm Password"
								name="confirmPassword"
							/>
						</div>
					</div>
					<div class="row gx-5">
					<div class="col">
						<button class="btn btn-success">Add User</button>
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