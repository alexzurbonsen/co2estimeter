// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import Browser from 'webextension-polyfill';

import { LOGGER_PREFIX } from '../constants/constants';
import { MessengerContentScript } from '../message/messages';

export const PORT_NAME_DELIMITER = '#';

interface PageWeightOptions {
  debug: boolean;
}

export class PageWeight {
  port: Browser.Runtime.Port;
  debug: boolean;
  value: number; // in bytes
  count: number;

  constructor(options: PageWeightOptions = { debug: false }) {
    this.port = Browser.runtime.connect({
      name: `${window.location.hostname}${PORT_NAME_DELIMITER}${window?.frameElement?.id}`,
    });
    // properties below are used for debugging purposes
    this.debug = options.debug;
    this.value = 0;
    this.count = 0;
  }

  getObserverCallback(): PerformanceObserverCallback {
    const transferSizeObserver = (
      entries: PerformanceObserverEntryList,
      _: PerformanceObserver,
      droppedEntriesCount: number,
    ): void => {
      const resources = entries.getEntries() as PerformanceResourceTiming[];
      resources.forEach((resource) => {
        MessengerContentScript.sendTransferSizeMessage(
          this.port,
          resource.transferSize,
        );
        if (this.debug) {
          this.count += 1;
          this.value += resource.transferSize;
          this.logPageWeightAndDomain(
            resource.transferSize,
            window.location.hostname,
            resource.name,
          );
        }
      });
      if (droppedEntriesCount > 0) {
        console.warn(
          `TRANSFER_SIZE_OBSERVER: ${droppedEntriesCount} entries were dropped because the buffer was full.`,
        );
      }
    };
    // @ts-ignore ts(2345)
    return transferSizeObserver;
  }

  reset(): void {
    this.value = 0;
    this.count = 0;
  }

  logPageWeightAndDomain(
    resourceWeight: number,
    domain: string,
    url: string,
  ): void {
    console.log(
      `| ${LOGGER_PREFIX} | Request ${this.count}: Page weight: ${this.value} bytes, Resource weigth: ${resourceWeight}, Domain: ${domain}, URL: ${url}`,
    );
  }
}
