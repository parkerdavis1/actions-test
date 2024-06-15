<script>
    import { actions } from 'astro:actions';
    import { onMount } from 'svelte';

    let message = 'waiting...';
    let submissions = [];

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const result = await actions.form(formData);
        console.log('result', result);
        message = result.message;
        getSubmissions();
    }

    async function getSubmissions() {
        submissions = await actions.getSubmissions();
    }

    onMount(async () => await getSubmissions());
</script>

<form method="POST" on:submit={handleSubmit}>
    <label for="name"
        >Name
        <input type="text" name="name" />
    </label>
    <label for="email"
        >Email
        <input type="email" name="email" id="email" />
    </label>
    <button type="submit">Submit</button>
</form>
<p>{message}</p>
<pre>{JSON.stringify(submissions, null, 2)}</pre>
