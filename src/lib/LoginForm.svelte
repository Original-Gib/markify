<script>
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	async function login() {
		console.log(`attemting to log in email: ${email} with password: ${password}`);
		goto('/');
	}
</script>

<div class="rounded bg-info bg-gradient p-5">
<form on:submit|preventDefault={login}>
	<h1 class="text-center">Markify</h1>
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


</form>
</div>
