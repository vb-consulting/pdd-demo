<script lang="ts">
    import { urls } from "../config";
</script>

<li class="nav-item py-0">
    <a class="nav-link " class:active={document.location.pathname == urls.indexUrl} href="{urls.indexUrl}">Dashboard</a>
</li>
<li class="nav-item py-0">
    <a class="nav-link " class:active={document.location.pathname == urls.companiesUrl} href="{urls.companiesUrl}">Companies</a>
</li>
