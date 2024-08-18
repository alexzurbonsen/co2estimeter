// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import Browser from 'webextension-polyfill';

import { STORAGE_KEYS } from '../constants/constants';
import { StorageBuffer } from '../storage/storageBuffer';
import { MessageHandlerBackground } from './messageHandlerBackground';

function main() {
  const transferSizeStorage = new StorageBuffer(
    STORAGE_KEYS.DOMAIN_STATS,
    'transferSize',
  );
  const messageHandler = new MessageHandlerBackground(transferSizeStorage);

  // TODO I am not cleaning up these listeners. Not sure how the Browser handles this, background scripts are not persistent in manifest v3 anymore
  Browser.runtime.onConnect.addListener((port) =>
    messageHandler.registerPort(port),
  );

  // TODO I am not interrupting storage flushing on inactive monitoring state currently, will just return early
  setInterval(() => transferSizeStorage.flushToStorage(), 5000);
}

main();
