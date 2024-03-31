<script>
	import { page } from '$app/stores';
	import { markifyService } from '../../../services/markify-service';

	const scorecardId = $page.params.scorecardId;

	markifyService.deleteScorecard(scorecardId);
</script>