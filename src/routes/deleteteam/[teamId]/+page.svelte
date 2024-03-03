<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { markifyService } from '../../../services/markify-service';

	const teamId = $page.params.teamId;

	markifyService.deleteTeam(teamId);
</script>