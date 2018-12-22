export const createId = (num) => {
	const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	const pwLength = num ? num : 20;
	const randomNum = () => Math.floor(Math.random() * characters.length)
	let id = '';
	for (let i = 0; i < pwLength; i++) {
		id = id.concat(characters[randomNum()])
	}
	return id;
}