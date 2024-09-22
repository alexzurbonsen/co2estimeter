// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import Browser from 'webextension-polyfill';

import { LOGGER_PREFIX, STORAGE_KEYS } from '../constants/constants';
import { PageWeight } from './pageWeight';

async function main() {
  let monitoringActive: boolean =
    (await Browser.storage.local.get(STORAGE_KEYS.MONITORING_ACTIVE))[
      STORAGE_KEYS.MONITORING_ACTIVE
    ] ?? false;

  const pageWeight = new PageWeight({ debug: false });
  // @ts-ignore ts(2345)
  const pageWeightObserver = new PerformanceObserver(
    pageWeight.getObserverCallback(),
  );

  if (monitoringActive) {
    pageWeightObserver.observe({
      entryTypes: ['resource', 'navigation'],
    });
    handlePageLifecycle(pageWeightObserver, pageWeight);
  }

  Browser.storage.onChanged.addListener(
    (
      changes: Record<string, Browser.Storage.StorageChange>,
      areaName: string,
    ) => {
      if (areaName === 'local' && STORAGE_KEYS.MONITORING_ACTIVE in changes) {
        monitoringActive = changes[STORAGE_KEYS.MONITORING_ACTIVE].newValue;
        if (monitoringActive) {
          pageWeightObserver.observe({
            entryTypes: ['resource', 'navigation'],
          });
          // console.log(`| ${LOGGER_PREFIX} | monitoring active`);
          handlePageLifecycle(pageWeightObserver, pageWeight);
        } else {
          pageWeightObserver.disconnect();
        }
      }
    },
  );
}

// proper cleanup is difficult, because from my tests in firefox
// content script code does not get executed after pagehide
// I am hoping the browser will garbage collect dangling observers anyhow
// but including this for good measure, and may be it helps in chrome
function handlePageLifecycle(
  oberserver: PerformanceObserver,
  pageWeight: PageWeight,
): void {
  let pagePersisted: boolean | undefined = undefined;

  function handlePagehideEvent(event: Event): void {
    const pageTransitionEvent = event as PageTransitionEvent;
    pagePersisted = pageTransitionEvent.persisted;
  }

  function handleVisibilityChangeEvent(_: Event): void {
    if (pagePersisted === true) {
      console.log(
        `| ${LOGGER_PREFIX} | page is persisted, will be hidden or frozen not terminated`,
      );
    } else if (pagePersisted === false) {
      console.log(`| ${LOGGER_PREFIX} | page will be terminated`);
      cleanUpWhenTerminated('TO_TERMINATED');
    } else {
      console.log(
        `| ${LOGGER_PREFIX} | page is hidden (visibilitychange event without pagehide event)`,
      );
    }
    pagePersisted = undefined;
  }

  // explanation of the different paths
  // check https://developer.chrome.com/docs/web-platform/page-lifecycle-api/image/page-lifecycle-api-state.svg
  // TO_TERMINATED: pagehide without persisting to cache -> visibilitychange -> TERMINATED
  // TO_CACHE: pagehide with persisting to cache -> visibilitychange -> FROZEN
  // TO_HIDDEN: visibilitychange -> HIDDEN (without a pagehide event)
  function cleanUpWhenTerminated(
    visibilitychangePath: 'TO_TERMINATED' | 'TO_CACHE' | 'TO_HIDDEN',
  ): void {
    pageWeight.reset();
    if (visibilitychangePath === 'TO_TERMINATED') {
      oberserver.disconnect();
      setTimeout(() => {
        window.removeEventListener('pagehide', handlePagehideEvent, {
          capture: true,
        });
        window.removeEventListener(
          'visibilitychange',
          handleVisibilityChangeEvent,
          { capture: true },
        );
      }, 0);
    }
  }

  window.addEventListener('pagehide', handlePagehideEvent, { capture: true });
  window.addEventListener('visibilitychange', handleVisibilityChangeEvent, {
    capture: true,
  });
}

main().catch((error) => {
  console.error(
    `| ${LOGGER_PREFIX} | CONTENT SCRIPT main raised an error: `,
    error,
  );
});

// TODOs
// 1) necessary to track workers as well?
//    https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/performance
// 2) Make sure there are not double counts. How can I avoid that? The Performance timing API is not very clear on that.
