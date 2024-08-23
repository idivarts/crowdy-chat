interface From {
    username: string;
    id: string;
}

interface To {
    data: {
        username: string;
        id: string;
    }[];
}

export interface MessageObject {
    id: string;
    created_time: string;
    to: To;
    from: From;
    message: string;
    attachments?: Attachments;
}
interface VideoData {
    width: number;
    height: number;
    url: string;
    preview_url: string;
}

interface ImageData {
    width: number;
    height: number;
    max_width: number;
    max_height: number;
    url: string;
    preview_url: string;
}

interface DataItem {
    image_data?: ImageData;
    video_data?: VideoData;
}

interface Attachments {
    data: DataItem[];
    paging: Paging;
}


interface Cursors {
    after: string;
}

interface Paging {
    cursors: Cursors;
    next: string;
}

export interface IMessagesResponse {
    data: MessageObject[];
    paging: Paging;
}

export interface IMessageSendRequest {
    sendType: "bot" | "user" | "page";
    message: string;
    botInstruction: string;
}
