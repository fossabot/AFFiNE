// @ts-check
import 'dotenv/config';
/**
 * @type {import('@affine/env').BlockSuiteFeatureFlags}
 */
export const blockSuiteFeatureFlags = {
  enable_database: true,
  enable_slash_menu: true,
  enable_edgeless_toolbar: true,
  enable_block_hub: true,
  enable_drag_handle: true,
  enable_surface: true,
  enable_linked_page: true,
  enable_bookmark_operation: false,
};

/**
 * @type {Record<string, import('@affine/env').BuildFlags>}
 */
const buildPreset = {
  stable: {
    enablePlugin: false,
    enableTestProperties: false,
    enableBroadcastChannelProvider: true,
    enableSocketIOProvider: false,
    enableDebugPage: true,
    // never set this to true in stable, because legacy cloud has deprecated
    //  and related code will be removed in the future
    enableLegacyCloud: false,
    changelogUrl: 'https://affine.pro/blog/whats-new-affine-0630',
    enablePreloading: true,
    enableNewSettingModal: true,
    enableNewSettingUnstableApi: false,
    enableSQLiteProvider: false,
    enableNotificationCenter: false,
    enableCloud: false,
  },
  beta: {},
  internal: {},
  // canary will be aggressive and enable all features
  canary: {
    enablePlugin: true,
    enableTestProperties: true,
    enableBroadcastChannelProvider: true,
    enableSocketIOProvider: true,
    enableDebugPage: true,
    enableLegacyCloud: false,
    changelogUrl: 'https://affine.pro/blog/whats-new-affine-0630',
    enablePreloading: true,
    enableNewSettingModal: true,
    enableNewSettingUnstableApi: false,
    enableSQLiteProvider: false,
    enableNotificationCenter: true,
    enableCloud: false,
  },
};

// beta and internal versions are the same as stable
buildPreset.beta = buildPreset.stable;
buildPreset.internal = buildPreset.stable;

const currentBuild = process.env.BUILD_TYPE || 'stable';

if (process.env.CI && !process.env.BUILD_TYPE) {
  throw new Error('BUILD_ENV is required in CI');
}

const currentBuildPreset = buildPreset[currentBuild];

const environmentPreset = {
  enablePlugin: process.env.ENABLE_PLUGIN
    ? process.env.ENABLE_PLUGIN === 'true'
    : currentBuildPreset.enablePlugin,
  enableTestProperties: process.env.ENABLE_TEST_PROPERTIES
    ? process.env.ENABLE_TEST_PROPERTIES === 'true'
    : currentBuildPreset.enableTestProperties,
  enableLegacyCloud: process.env.ENABLE_LEGACY_PROVIDER
    ? process.env.ENABLE_LEGACY_PROVIDER === 'true'
    : currentBuildPreset.enableLegacyCloud,
  enableBroadcastChannelProvider: process.env.ENABLE_BC_PROVIDER
    ? process.env.ENABLE_BC_PROVIDER !== 'false'
    : currentBuildPreset.enableBroadcastChannelProvider,
  enableSocketIOProvider: process.env.ENABLE_SOCKET_IO_PROVIDER
    ? process.env.ENABLE_SOCKET_IO_PROVIDER === 'true'
    : currentBuildPreset.enableSocketIOProvider,
  changelogUrl: process.env.CHANGELOG_URL ?? currentBuildPreset.changelogUrl,
  enablePreloading: process.env.ENABLE_PRELOADING
    ? process.env.ENABLE_PRELOADING === 'true'
    : currentBuildPreset.enablePreloading,
  enableNewSettingModal: process.env.ENABLE_NEW_SETTING_MODAL
    ? process.env.ENABLE_NEW_SETTING_MODAL === 'true'
    : currentBuildPreset.enableNewSettingModal,
  enableSQLiteProvider: process.env.ENABLE_SQLITE_PROVIDER
    ? process.env.ENABLE_SQLITE_PROVIDER === 'true'
    : currentBuildPreset.enableSQLiteProvider,
  enableNewSettingUnstableApi: process.env.ENABLE_NEW_SETTING_UNSTABLE_API
    ? process.env.ENABLE_NEW_SETTING_UNSTABLE_API === 'true'
    : currentBuildPreset.enableNewSettingUnstableApi,
  enableNotificationCenter: process.env.ENABLE_NOTIFICATION_CENTER
    ? process.env.ENABLE_NOTIFICATION_CENTER === 'true'
    : currentBuildPreset.enableNotificationCenter,
  enableCloud: process.env.ENABLE_CLOUD
    ? process.env.ENABLE_CLOUD === 'true'
    : currentBuildPreset.enableCloud,
};

/**
 * @type {import('@affine/env').BuildFlags}
 */
const buildFlags = {
  ...currentBuildPreset,
  // environment preset will overwrite current build preset
  // this environment variable is for debug proposes only
  // do not put them into CI
  ...(process.env.CI ? {} : environmentPreset),
};

export { buildFlags };
