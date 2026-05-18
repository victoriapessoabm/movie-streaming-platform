module.exports = {
  default: {
    paths: ["features/gerenciar_playlists.feature"],
    requireModule: ["tsx/cjs"],
    require: ["tests/step_definitions/**/*.ts"],
    format: ["progress"]
  }
};