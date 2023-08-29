import { EventBusKey, useEventBus } from "../event-bus";
import { createSharedComposable } from "../shared-composables";

export interface ModalOpenEvent {
  action: "OPEN_MODAL";
}

export interface ModalCloseEvent {
  action: "CLOSE_MODAL";
}

export type ModalDisplayEvent = ModalOpenEvent | ModalCloseEvent;

export const eventKey = Symbol("ModalDisplayEvent") as EventBusKey<ModalDisplayEvent>;
export const useModalDisplayEvent = createSharedComposable(() => useEventBus(eventKey));
