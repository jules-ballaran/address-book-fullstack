exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('group_name', {
		id: {
			type: 'serial',
			primaryKey: true,
		},
		userid: {
			type: 'integer',
			notNull: true,
			references: '"users"',
		},
		name: {
			type: 'text',
			notNull: true,
		}
	})
};

exports.down = (pgm) => {

};
