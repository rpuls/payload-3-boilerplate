import * as migration_20241125_222020_initial from './20241125_222020_initial';
import * as migration_20241214_124128 from './20241214_124128';
import * as migration_20241204_000000_capabilities from './20241204_000000_capabilities';

export const migrations = [
  {
    up: migration_20241125_222020_initial.up,
    down: migration_20241125_222020_initial.down,
    name: '20241125_222020_initial',
  },
  {
    up: migration_20241214_124128.up,
    down: migration_20241214_124128.down,
    name: '20241214_124128'
  },
  {
    up: migration_20241204_000000_capabilities.up,
    down: migration_20241204_000000_capabilities.down,
    name: '20241204_000000_capabilities'
  },
];
