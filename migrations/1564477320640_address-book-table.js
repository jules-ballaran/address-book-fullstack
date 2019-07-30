exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('address_book', {
		id: {
			type: 'serial',
			primaryKey: true,
		},
		userid: {
			type: 'integer',
			notNull: true,
			references: '"users"',
		},
	})
};

exports.down = (pgm) => {
	
};

