<script>
	import { goto } from '$app/navigation';
	import {markifyService} from "../services/markify-service.js"

	let email = '';
	let password = '';
	let errorMessage = '';

	async function login() {
		console.log(`attempting to log in email: ${email} with password: ${password}`);
		let success = await markifyService.login(email, password);
		if (success) {
			await goto("/staff");
		} else {
			email = "";
			password = "";
			errorMessage = "Invalid Credentials";
		}
	}
</script>

<div class="rounded bg-info bg-gradient p-5">
<form on:submit|preventDefault={login}>
	<div class="container d-flex justify-content-center">
	<img src='markify-logo.png' alt="Markifylogo" width="200" height="200">
	</div>
	<h3 class="text-center">Please Login</h3>
	<div class="mb-3">
		<label class="form-label" for="email">Email</label>
		<input bind:value={email} class="form-control" id="email" name="email" placeholder="Enter email" type="text" />
	</div>
	<div class="mb-3">
		<label class="form-label" for="password">Password</label>
		<input bind:value={password} class="form-control" id="password" name="password" placeholder="Enter Password" type="password" />
	</div>
	<div class="row gx-5">
		<div class="col">
		<button class="btn btn-success">Log In</button>
		</div>
		<div class="col">
		<a href="/signup"><button class="btn btn-light">Signup</button></a>
		</div>
	</div>
	{#if errorMessage}
		<div class="alert alert-danger" role="alert">
			{errorMessage}
		</div>
	{/if}


</form>
</div>
