const subscribers = {
    "message-received": [] as Array<MessagesReceivedSubscriberType>,
    "status-changed": [] as StatusChangedSubscriberType[],
}
let ws: WebSocket | null;
const closeHandler = () => {
    notifySubscribersAboutStatus("pending");
    setTimeout(() => createChannel(), 1000);
};
let onMessageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers["message-received"].forEach(s => s(newMessages));
};
let openHandler = () => {
    notifySubscribersAboutStatus("ready");
    console.log("asd")
};

let errorHandler = () => {
    notifySubscribersAboutStatus("error");
    console.log("ERROR, REFRESH PAGE");
};

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler);
    ws?.removeEventListener('message', onMessageHandler);
    ws?.removeEventListener('message', errorHandler);
    ws?.removeEventListener('message', openHandler);
}

const notifySubscribersAboutStatus = (status:StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
};
function createChannel() {
    cleanUp()
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus("pending");
    ws?.addEventListener('close', closeHandler);
    ws?.addEventListener('message', onMessageHandler);
    ws?.addEventListener('error', errorHandler);
    ws?.addEventListener('open', openHandler);
}



export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        cleanUp();
        subscribers["message-received"] = []
        subscribers["status-changed"] = []
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: StatusChangedSubscriberType  | MessagesReceivedSubscriberType ) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
};

export type StatusType =  "pending" | "ready" | "error";
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (messages: StatusType) => void;
export type EventsNamesType = "message-received" | "status-changed";

