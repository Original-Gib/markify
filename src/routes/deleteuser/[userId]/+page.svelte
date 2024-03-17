<script>
	import { page } from '$app/stores';
	import { markifyService } from '../../../services/markify-service';

	const userId = $page.params.userId;

	markifyService.deleteUser(userId);
</script>