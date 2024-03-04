<script>
	import { page } from '$app/stores';
	import { markifyService } from '../../../services/markify-service';

	const employeeId = $page.params.employeeId;

	markifyService.deleteEmployee(employeeId);
</script>