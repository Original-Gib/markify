<script>

	import { goto } from '$app/navigation';
	import { markifyService } from '../services/markify-service.js';

	// defining variables used for signup


	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage = '';

	//sign up function to send the entered details to the API
	async function signup() {
		console.log(`attempting to sign up email: ${email}`);
		if (firstName && lastName && email && password && confirmPassword) {
			if (password === confirmPassword) {
				let success = await markifyService.signup(firstName, lastName, email, password);
				if (success) {
					await goto("/login");
				} else {
					errorMessage = "Error Trying to sign up";
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
	<form on:submit|preventDefault={signup}>
		<div class="container d-flex justify-content-center">
			<img src='markify-logo.png' alt="Markify logo" width="200" height="200">
		</div>
		<h3 class="text-center">Please Register</h3>

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
		<div class="d-flex justify-content-around">
			<button class="btn btn-success me-2">Register</button>
			<a href="/login" class="btn btn-light">Login</a>
		</div>
	</form>

	{#if errorMessage}
		<div class="alert alert-danger" role="alert">
			{errorMessage}
		</div>
	{/if}

</div>