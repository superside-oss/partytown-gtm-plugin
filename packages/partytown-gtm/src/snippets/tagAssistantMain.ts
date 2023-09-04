import { ReceiverFunction, TagAssistantTunnelApi } from './tagAssistantCommon.js';

/**
 * Implements main thread side of the Tag Assistant integration.
 */
export default function tagAssistantMain(tagAssistantForwarder: string, tagAssistantTunnel: string) {
  const GTM_DEBUG_RE = /[?&]gtm_logging=true/;
  const debug = GTM_DEBUG_RE.test(location.search);
  const noop = () => {};

  const log = debug
    // eslint-disable-next-line no-console
    ? console.log.bind(
        console,
        '%cTag Assistant',
        'background: #357; color: #fff; padding: 2px 4px; border-radius: 4px;'
      )
    : noop;

  /**
   * Hardcoded receiver function, it is going to forward all messages to the
   * window[tagAssistantForwarderName] - worker function exposed to main thread
   */
  const receiver: ReceiverFunction = (...args: any[]) => {
    log('Sent message', arguments);
    // @ts-ignore
    window[tagAssistantForwarder]?.(...args);
  };

  /**
   * Worker calls this function when GTM exposes real receiver on
   * window[tagAssistantForwarderName]. It then forwards the call to Tag Assistant
   */
  function setReceiver() {
    log('Set receiver');
    if (window.__TAG_ASSISTANT_API) {
      window.__TAG_ASSISTANT_API.setReceiver(receiver);
    } else {
      log('window.__TAG_ASSISTANT_API is not defined, make sure that Tag Assistant browser extension is present');
    }
  }

  /**
   * Forwards call to Tag Assistant API
   */
  function sendMessage(...args: any[]) {
    window.__TAG_ASSISTANT_API?.sendMessage(...args);
  }

  /**
   * Forwards call to Tag Assistant API
   */
  function disconnect(...args: any[]) {
    log('disconnect', arguments);
    window.__TAG_ASSISTANT_API?.disconnect(...args);
  }

  // Make mocked API available to the worker
  // @ts-ignore
  window[tagAssistantTunnel] = {
    setReceiver,
    sendMessage,
    disconnect
  } satisfies TagAssistantTunnelApi;
}
