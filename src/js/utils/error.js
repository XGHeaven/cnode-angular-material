// the internal error

class UnSignError extends Error {
	constructor() {
		super()
		this.name = 'UnSignError'
	}
}

class InvalidAccessTokenError extends Error {
	constructor() {
		super()
		this.name = 'InvalidAccessTokenError'
	}
}

export {
	UnSignError,
	InvalidAccessTokenError
}