module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js', 'json'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testMatch: ['**/*.test.(ts|js)'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
};
