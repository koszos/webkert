export interface Torrent {
        id: number;
        title: string;
        size: number; //MBban elsonek de majd lesz method, hogy atvaltsuk GB-ba :DDDD
        category: string;
        seeders: number;
        leechers: number;
        uploadedAt: Date;
        uploader: string;
}