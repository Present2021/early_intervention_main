/** @param {string} key */
export function getFileUrl(key) {
	return (new URL(key, process.env.BASE_URL)).toString();
}

/** @param {Array<string>} keys */
export function getFileUrls(keys) {
	return keys.map(key => getFileUrl(key));
}

/** @param {string} multerPath */
export function getKeyFromPath(multerPath) {
	if (!multerPath) return multerPath;

	const arr = multerPath.split('/');
	arr[1] = encodeURIComponent(arr[1]);

	return arr.join('/');
}
