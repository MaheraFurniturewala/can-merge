'use strict';

const test = require('tape');

const evaluatePullRequest = require('../utils/evaluatePullRequest');
const parsePullRequest = require('../utils/parsePullRequest');
const getSHA = require('../utils/getSHA');

const { mockEvalPR, mockParsePR } = require('./mocks');

test('evaluatePullRequest', (t) => {
	t.plan(mockEvalPR.length);
	mockEvalPR.forEach((mock) => {
		t.equal(evaluatePullRequest(mock.res.repository.pullRequest), mock.expected, mock.description);
	});
	t.end();
});

test('parsePullRequest', (t) => {
	t.plan(mockParsePR.length);
	mockParsePR.forEach((mock) => {
		t.deepEqual(parsePullRequest(mock.repository), mock.expected, mock.description);
	});
	t.end();
});

// Check SHA by checking the length. Package git-repo-info only returns 10 for short sha
test('getSHA', (t) => {
	t.plan(3);
	const long = getSHA();
	const short = getSHA(true);
	t.match(long, /^[a-zA-Z0-9]{40}$/);
	t.match(short, /^[a-zA-Z0-9]{10}$/);
	t.ok(long.startsWith(short), 'short SHA is a prefix of long SHA');
	t.end();
});
