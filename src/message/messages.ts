// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import Browser from 'webextension-polyfill';

export enum MessagesToBackgroundTypes {
  TRANSFER_SIZE = 1,
}

export type TransferSize = number; // transfer size in bytes

// using short keys to reduce message size
export type Message = {
  t: MessagesToBackgroundTypes; // message type
  c: TransferSize | null; // content of the message
};

type KeyedType<T, K extends keyof T> = T[K];

// use these classes to send messages.
// This keeps messages consistent, but there are no guarantees that they are indeed used to send messages
// may be there is a better way to do this, but I couldn't think of it yet.
export class MessengerContentScript {
  static sendTransferSizeMessage(
    port: Browser.Runtime.Port,
    transferSize: TransferSize,
  ) {
    port.postMessage({
      t: MessagesToBackgroundTypes.TRANSFER_SIZE,
      c: transferSize,
    });
  }
}

export class MessengerBackgroundScript {
  static isTransferSizeMessage(message: any): message is {
    t: MessagesToBackgroundTypes.TRANSFER_SIZE;
    c: TransferSize;
  } {
    return validateMessage(
      message,
      MessagesToBackgroundTypes.TRANSFER_SIZE,
      'number',
    );
  }
}

function validateMessage(
  message: any,
  type: KeyedType<Message, 't'>,
  contentType: 'number' | 'boolean',
): boolean {
  if (
    !(Object.keys(message).length === 2) ||
    !('t' in message) ||
    !('c' in message)
  ) {
    return false;
  }
  if (message.t === type && typeof message.c === contentType) {
    return true;
  }
  return false;
}
