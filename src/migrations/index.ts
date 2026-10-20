import * as migration_20241125_222020_initial from './20241125_222020_initial'
import * as migration_20241214_124128 from './20241214_124128'
import * as migration_20260222_003500_payload_3_77_compat from './20260222_003500_payload_3_77_compat'
import * as migration_20260728_181752_add_logo_cloud_grid_block from './20260728_181752_add_logo_cloud_grid_block'
import * as migration_20261020_134910_payload_3_91_compat from './20261020_134910_payload_3_91_compat'

export const migrations = [
  {
    up: migration_20241125_222020_initial.up,
    down: migration_20241125_222020_initial.down,
    name: '20241125_222020_initial',
  },
  {
    up: migration_20241214_124128.up,
    down: migration_20241214_124128.down,
    name: '20241214_124128',
  },
  {
    up: migration_20260222_003500_payload_3_77_compat.up,
    down: migration_20260222_003500_payload_3_77_compat.down,
    name: '20260222_003500_payload_3_77_compat',
  },
  {
    up: migration_20260728_181752_add_logo_cloud_grid_block.up,
    down: migration_20260728_181752_add_logo_cloud_grid_block.down,
    name: '20260728_181752_add_logo_cloud_grid_block',
  },
  {
    up: migration_20261020_134910_payload_3_91_compat.up,
    down: migration_20261020_134910_payload_3_91_compat.down,
    name: '20261020_134910_payload_3_91_compat',
  },
]
