<script>
	//imports
	import { markifyService } from '../services/markify-service';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let user = {}

	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage = '';

	let userId = $page.params.userId;

	onMount(
		async function getUser() {
			user = await markifyService.getUser(userId);
			firstName = user.firstName;
			lastName = user.lastName;
			email = user.email;
	}
	)

	async function updateUser() {
		if (firstName && lastName && email && password && confirmPassword) {
			if (password === confirmPassword) {
				let success = markifyService.updateUser(userId, firstName, lastName, email, password)
				if (success) {
					location.reload();
				} else {
					errorMessage = 'Error trying to update user';
				}
			} else {
				errorMessage = "Passwords do not match"
			}
		} else {
			errorMessage = "Please complete all fields"
		}
	}

</script>

<div class="rounded bg-info bg-gradient p-5">
				<form on:submit|preventDefault={updateUser} class="container">
					<h3 class="text-center mb-4">Edit User</h3>
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
							<button class="btn btn-success">Edit User</button>
						</div>
						<div class="col">
							<a href="/admin">
							<button type="button" class="btn btn-secondary">Cancel</button>
							</a>
						</div>
					</div>
				</form>
	{#if errorMessage}
		<div class="alert alert-danger" role="alert">
			{errorMessage}
		</div>
	{/if}
</div>