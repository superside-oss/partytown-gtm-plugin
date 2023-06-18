import { ReceiverFunction } from './tagAssistantCommon';

/**
 * Implements the worker side of the Tag Assistant integration.
 */
export default function tagAssistantWorker(tagAssistantForwarderName: string, tagAssistantTunnelName: string) {
  // Mock Tag Assistant API inside worker. All methods are going to call their counterparts
  // in the main thread.
  // @ts-ignore
  window.__TAG_ASSISTANT_API = Object.assign({}, window[tagAssistantTunnelName], {
    // Override setReceiver to enable main <-> worker communication
    setReceiver: (receiver: ReceiverFunction) => {
      // The receiving function is assigned to `window[tagAssistantForwarderName]`,
      // allowing it to be called from the main thread.
      // @ts-ignore
      window[tagAssistantForwarderName] = receiver;

      // The original setReceiver function is called to notify the main thread that
      // the receiver has been set.
      // @ts-ignore
      window[tagAssistantTunnelName].setReceiver();
    }
  });
}
