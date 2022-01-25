module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL, //"postgres://vwbglqoszlakqa:e313813d3b523261b9e99bc06be3dfc803fce38898317b91495b870c40cbd2e6@ec2-3-215-57-87.compute-1.amazonaws.com:5432/d4t3eibsshnb8f",//process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  // entities: ["src/entity/**/*.ts", "dist/entity/**/*.js"],
  // migrations: ["src/migration/**/*.ts", "dist/migration/**/*.js"],
  // subscribers: ["src/subscriber/**/*.ts", "./subscriber/**/*.js"],
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],

  // ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
