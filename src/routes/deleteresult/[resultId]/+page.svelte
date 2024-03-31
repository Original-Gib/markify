<script>
	import { page } from '$app/stores';
	import { markifyService } from '../../../services/markify-service';

	const resultId = $page.params.resultId;

	markifyService.deleteResult(resultId);
</script>