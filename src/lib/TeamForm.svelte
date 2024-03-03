<script>
import { markifyService} from '../services/markify-service.js';
import { goto } from '$app/navigation';

let teamName = '';
let errorMessage = '';

	async function createTeam() {
		console.log(`attempting to create up team: ${teamName}`);
		let success = await markifyService.createTeam(teamName);
		if (success) {
			location.reload();
		} else {
			errorMessage = 'Error Trying to create team';
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
				<h1 class="modal-title fs-5" id="exampleModalLabel">Add new team</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<form on:submit|preventDefault={createTeam}>
					<div class="mb-3">
						<input bind:value={teamName} class="form-control" id="teamName" name="teamName" placeholder="Enter Team Name" type="text" />
					</div>
					<div class="row gx-5">
						<div class="col">
							<button class="btn btn-success">Add Team</button>
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