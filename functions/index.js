const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const updateTeam = (team) => {
	return admin.firestore().collection('teams').doc(team.teamId).set(team)
	.then(doc => {
		console.log('updateTeam', team, doc);
	})
}

exports.teamCreated = functions.firestore
	.document('teams/{teamId}')
	.onCreate(doc => {
		return admin.firestore().collection('teams')
		.doc(doc.id).get().then(doc => {
			const teamdata = doc.data();
			const team = {
				arena: teamdata.arena,
				league: teamdata.league,
				players: teamdata.players,
				sport: teamdata.sport,
				teamName: teamdata.teamName,
				teamOwnerId: teamdata.teamOwnerId,
				teamId: doc.id
			}
			return updateTeam(team);
		})
	});
