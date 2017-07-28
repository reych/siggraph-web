export class Event {
    title: string;
    date: number; // milliseconds since UNIX epoch
    time: string;
    location: string;
    content: string;
    imageURL: string;
    updateTime: number; // milliseconds since UNIX epoch
    link: string; // Outside link.
    eventId: number;
}
