// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import Browser from 'webextension-polyfill';

import { MessengerBackgroundScript } from '../message/messages';
import { StorageBuffer } from '../storage/storageBuffer';

export class MessageHandlerBackground {
  ports: Array<Browser.Runtime.Port>;
  transferSizeStorage: StorageBuffer;

  constructor(transferSizeStorage: StorageBuffer) {
    this.ports = [];
    this.transferSizeStorage = transferSizeStorage;
  }

  registerPort(port: Browser.Runtime.Port) {
    this.ports.push(port);
    port.onMessage.addListener((message) =>
      this.handleMessageFromContentScript(message, port),
    );
    port.onDisconnect.addListener(() => this.unregisterPort(port));
  }

  unregisterPort(port: Browser.Runtime.Port) {
    this.ports = this.ports.filter((p) => p !== port);
  }

  async handleMessageFromContentScript(
    message: any,
    port: Browser.Runtime.Port,
  ) {
    if (MessengerBackgroundScript.isTransferSizeMessage(message)) {
      const domain = await resolveDomain(port);
      this.transferSizeStorage.upsertEntry(domain, message.c);
    } else {
      console.warn(
        `Background Script received Unknown message type from port ${port.name}: ${message.t}`,
      );
    }
  }
}

async function resolveDomain(port: Browser.Runtime.Port): Promise<string> {
  const tabId = port?.sender?.tab?.id;
  let domain = 'unknown';
  if (tabId !== undefined) {
    const tab = await Browser.tabs.get(tabId);
    domain = tab.url ? new URL(tab.url).hostname : 'unknown';
  }
  if (domain.startsWith('www.')) {
    return domain.substring('www.'.length);
  }
  return domain;
}
