'use strict';

const { graphql } = require('@octokit/graphql');
const buildQuery = require('./buildQuery');

const printAPIPoints = (points) => {
	console.log(`\nAPI Points:
  \tused\t\t-\t${points.cost}
  \tremaining\t-\t${points.remaining}\n`);
};

module.exports = async function runQuery({ commit, repo, pr, sha, token }) {
	const [owner, name] = repo.split('/');
	let response = null;
	try {
		response = await graphql(buildQuery({ commit, name, owner, pr, sha }), {
			headers: {
				authorization: `token ${token}`,
			},
		});
	} catch (err) {
		throw err.message;
	}
	printAPIPoints(response.rateLimit);
	return response;
};
