var posts = new Vue({
	el: '#posts',

	data() {
		return {
			posts: [],
			searchAuthor: ''
		};
	},
	computed: {
		filteredPosts() {
			if (this.searchAuthor === '') {
				return this.posts;
			} else {
				const searchTerm = this.searchAuthor.toLowerCase();
				return this.posts.filter(post =>
					post.author && post.author.name.toLowerCase().includes(searchTerm)
				);
			}
		}
	},
	mounted() {
		Promise.all([
			fetch('http://jsonplaceholder.typicode.com/posts'),
			fetch('http://jsonplaceholder.typicode.com/users')
		])
			.then(responses => Promise.all(responses.map(response => response.json())))
			.then(data => {
				const [posts, users] = data;
				this.posts = posts.map(post => {
					post.author = users.find(user => user.id === post.userId);
					return post;
				});
			})
			.catch(error => {
				console.error('Ошибка:', error);
			});
	}
})