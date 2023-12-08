<template>
    <div class="wrapper">
        <div class="profile">
            <div class="left-column">
                <img v-bind:src="pic" class="profile-pic" alt="profile pic" />
            </div>
            <div class="right-column">
                <p><i class="far fa-user"> Username: {{ user.username }} </i></p>
                <p><i class="far fa-solid fa-laptop-code"> Years Experience: {{ user.years_experience }} </i></p>
            </div>
        </div>
        <div class="loop languages">
            <h3>Languages</h3>
            <ul>
                <li v-for="language in user.languages">
                    {{ language }}
                </li>
            </ul>
        </div>
        <div class="loop snippets">
            <h3>Snippets</h3>
            <ul>
                <li v-for="snippet in user.snippets">
                    <p> Created: {{ new Date(snippet.created).getFullYear() }} </p>
                    <p> Title: "{{ snippet.title }}" </p>
                    <p> {{  snippet.snippet }} </p>

                </li>
            </ul>
            <button @click="addSnippet"> + Add Snippet</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            user: {},
            pic: ''
        };
    },
    async created() {
        const { id } = this.$route.params;
        try {
            const response = await axios.get(`http://localhost:8080/users/${id}?snippets=true`);
            this.user = response.data;
            this.pic = `https://api.dicebear.com/7.x/bottts/svg?seed=${this.user.username}`
        } catch(error) {
            console.log(error);
        }
    },
    methods: {
        async addSnippet() {
            const token = localStorage.getItem('authToken');
            console.log(token);
        }
    }
};
</script>
<style scoped>
.profile {
    display: flex;
    margin: 0 auto;
    padding: 20px;
}
.profile p {
    color: #f8f8ff;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.profile i {
    color: #27b8c7;
    margin-right: 20px;
}
.profile-pic {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    margin-right: 20px;
}
.left-column {
    flex: 1;
    display: flex;
    justify-content: center;
}
.right-column {
    flex: 1;
    display: flex;
    justify-content: left;
    flex-direction: column;
}
.languages {
    color: #f8f8ff;
    background-color: #565263;
    text-align: left;
    padding: 15px;
    width: 100%;
}
.loop ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.loop ul li {
    color: #f8f8ff;
    border: 1px solid #d7a8c3;
    border-radius: 2px;
    display: inline-block;
    font-size: 12px;
    margin: 0 7px 7px 0;
    padding: 7px;
    text-transform: uppercase;
}
.snippets {
    color: #f8f8ff;
    background-color: #73677c;
    text-align: left;
    padding: 15px;
    width: 100%;
}
</style>