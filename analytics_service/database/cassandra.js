const cassandra = require("cassandra-driver");

const authProvider = new cassandra.auth.PlainTextAuthProvider(
  process.env.DBUSER,
  process.env.DBPASS
);
const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA],
  authProvider: authProvider,
  localDataCenter: "dc1",
  keyspace: process.env.KEYSPACE,
  protocolOptions: { port: process.env.CASSANDRA_PORT },
});

module.exports = client;
