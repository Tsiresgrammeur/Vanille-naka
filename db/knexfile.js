// Update with your config settings.
var types = require('pg').types;
types.setTypeParser(1082, val => val);


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'vanille_naka',
      user:     'postgres',
      password: '',
      timezone: 'UTC',
      dateString:true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'vanille_naka',
      user:     'postgres',
      password: '',
      timezone: 'UTC',
      dateString:true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
