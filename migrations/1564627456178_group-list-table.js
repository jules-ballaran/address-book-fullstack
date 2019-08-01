exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('group_list', {
		groupid: {
			type: 'integer',
			notNull: true,
			references: '"group_name"',
		},
		contactid: {
			type: 'integer',
			notNull: true,
			references: '"contact"',
		},
	})
};

exports.down = (pgm) => {

};
