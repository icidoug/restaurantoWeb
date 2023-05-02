import camelCase from 'lodash/camelCase';

const files = import.meta.globEager("./*/index.js");

const modules = {};
for (const key in files) {
	modules[camelCase(key.split('/')[1].replace(/(\.\/|\.js)/g, ''))] = {
		namespaced: true,
		...files[key].default
	};
}

export default modules;