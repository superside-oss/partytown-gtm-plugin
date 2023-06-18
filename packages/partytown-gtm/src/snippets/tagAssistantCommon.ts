/**
 * A function invoked by Tag Assistant to send messages to the
 * website's GTM script.
 *
 * @param {...any} args - The details of the message to be received
 *                        and processed by the website.
 */
export type ReceiverFunction = (...args: any[]) => void;

/**
 * Tag Assistant API is available at `window.__TAG_ASSISTANT_API`
 * after installing the corresponding browser extension.
 */
export interface TagAssistantApi {
  /**
   * Sets the receiving function that will be called by Tag Assistant
   * to send messages to the website.
   *
   * @param {function} receiverFn - The function that will receive messages.
   */
  setReceiver(receiverFn: ReceiverFunction): void;

  /**
   * Enables GTM to send messages to Tag Assistant.
   *
   * @param {...any} args - The details of the message to be sent.
   */
  sendMessage(...args: any[]): void;

  /**
   * Closes the communication channel between the website and Tag Assistant.
   */
  disconnect(...args: any[]): void
}

export interface TagAssistantTunnelApi extends TagAssistantApi {
/**
   * Calls Tag Assistant API, with hard-coded receiver function
   */
setReceiver(): void;
}

declare global {
  interface Window {
    __TAG_ASSISTANT_API: TagAssistantApi;
    __TAG_ASSISTANT_API_TUNNEL: TagAssistantTunnelApi;
    __TAG_ASSISTANT_FORWARDER: ReceiverFunction;
  }
}
