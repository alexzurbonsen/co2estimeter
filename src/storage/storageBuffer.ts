// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import Browser from 'webextension-polyfill';

import { LOGGER_PREFIX } from '../constants/constants';

// browser.strorage API is similar to Window.localStorage, but at least Firefox clears data
// stored by extensions using the localStorage API in various scenarios where users clear
// their browsing history and data for privacy reasons. Data saved using the storage.local API
// is correctly persisted in these scenarios.
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/local

// keep storage limits in mind (5MB on chrome)

type DataLabels = {
  transferSize: number;
};

export class StorageBuffer {
  storageKey: string;
  dataLabel: keyof DataLabels;
  buffer: Record<string, number>;
  lock: boolean;
  debug: boolean;

  constructor(storageKey: string, dataLabel: keyof DataLabels, debug = false) {
    this.dataLabel = dataLabel;
    this.storageKey = storageKey;
    this.buffer = {};
    this.lock = false;
    this.debug = debug;
  }

  // adding data is atomic (synchronous), thus no need to check the lock
  upsertEntry(key: string, value: number) {
    this.buffer[key] = this.buffer[key] ? this.buffer[key] + value : value;
  }

  async flushToStorage() {
    if (this.lock) {
      console.warn('Buffer is already being flushed. Skipping this flush.');
      return;
    }

    try {
      this.lock = true;
      const dataToStore = { ...this.buffer };
      this.buffer = {};
      await this._flushBuffer(dataToStore);
    } catch (error: Error | any) {
      console.error('Error writing data to storage:', error);
    } finally {
      this.lock = false;
    }
  }

  async _flushBuffer(dataToStore: Record<string, number>) {
    if (Object.keys(dataToStore).length === 0) {
      if (this.debug) {
        console.log(`| ${LOGGER_PREFIX} | Skipping. No data to store.`);
      }
      return;
    }
    const dataFromStorage =
      (await Browser.storage.local.get(this.storageKey))[this.storageKey] ?? {};
    for (const key in dataToStore) {
      if (key in dataFromStorage && this.dataLabel in dataFromStorage[key]) {
        dataFromStorage[key][this.dataLabel] += dataToStore[key];
      } else {
        dataFromStorage[key] = { [this.dataLabel]: dataToStore[key] };
      }
    }
    if (this.debug) {
      console.log(`| ${LOGGER_PREFIX} | Data to store: `, dataFromStorage);
    }
    await Browser.storage.local.set({ [this.storageKey]: dataFromStorage });
  }
}
