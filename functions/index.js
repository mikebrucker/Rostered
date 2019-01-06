const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const updateTeam = (team) => {
	return admin.firestore().collection('teams').doc(team.teamId).set(team)
	.then(snapshot => {
		console.log('updateTeam', team, snapshot);
	})
}

exports.teamCreated = functions.firestore
	.document('teams/{teamId}')
	.onCreate(doc => {
		return admin.firestore().collection('teams')
		.doc(doc.id).get().then(snapshot => {
			const teamdata = snapshot.data();
			const team = {
				arena: teamdata.arena,
				league: teamdata.league,
				players: teamdata.players,
				schedules: teamdata.schedules,
				sport: teamdata.sport,
				teamName: teamdata.teamName,
				teamOwnerId: teamdata.teamOwnerId,
				teamId: snapshot.id
			}
			return updateTeam(team);
		})
	});
