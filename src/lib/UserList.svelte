<script>
	//imports
	import { onMount } from 'svelte';
	import { markifyService } from '../services/markify-service';
	import UserForm from '$lib/UserForm.svelte';

	let users = []


	onMount(async () => {
		users = await markifyService.getUsers();
		console.log(users);
	});
</script>

<div class="rounded bg-info bg-gradient w-100">
	<table class="table">
		<thead>
		<tr>
			<th scope="col" class="py-3">Name</th>
			<th scope="col" class="py-3">Email</th>
			<th scope="col" class="py-3"></th>
			<th scope="col" class="py-3"></th>
		</tr>
		</thead>
		<tbody>
		{#each users as user}
			<tr>
				<td class="py-3 has-text-left">
					<i class="fa-solid fa-user"></i> {user.firstName} {user.lastName}
				</td>
				<td class="py-3 has-text-left">
					<i class="fa-solid fa-envelope"></i> {user.email}
				</td>
				<td class="py-3">
					<button type="button" class="btn btn-secondary">
						<a href="/team/">
							<i class="fa-solid fa-pen-to-square" style="color:rgb(15, 16, 53)"></i>
						</a>
					</button>
				</td>
				<td class="py-3">
					<button type="button" class="btn btn-danger">
						<a href="/deleteuser/{user._id}">
							<i class="fas fa-trash" style="color:rgb(15, 16, 53)"></i>
						</a>
					</button>
				</td>
			</tr>
		{/each}
		<tr>
			<td>
				<UserForm />
			</td>
		</tr>
		</tbody>
	</table>
</div>