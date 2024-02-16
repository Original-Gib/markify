<script>

	import { goto } from '$app/navigation';

	// defining variables used for signup


	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';

	//sign up function to send the entered details to the API
	async function signup() {
		console.log(`attempting to sign up email: ${email}`);
		goto('/login')
	}

</script>

<!-- form for entering signup details  -->
<div class="rounded bg-info bg-gradient p-5">
<form on:submit|preventDefault={signup}>
	<div class="container d-flex justify-content-center">
		<img src='markify-logo.png' alt="Markifylogo" width="200" height="200">
	</div>
	<h3 class="text-center">Please Register</h3>
		<div class="mb-3">
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
			<div class="mb-3">
				<label for="lastname" class="form-label">Last Name </label>
				<input
					bind:value={lastName}
					id="lastname"
					class="form-control"
					type="text"
					placeholder="Enter last name"
					name="lastName"
				/>
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
	<div class="mb-3">
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
	<div class="row gx-5">
		<div class="col">
			<button class="btn btn-success">Register</button>
		</div>
		<div class="col">
			<a href="/login"><button class="btn btn-light">Login</button></a>
		</div>
	</div>
</form>
</div>