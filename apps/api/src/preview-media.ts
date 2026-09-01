export interface PreviewImage {
  data: Uint8Array;
  mimeType: string;
}

export interface ContactSheet {
  data: Uint8Array;
  mimeType: string;
}

export interface PreviewMedia {
  buildContactSheet(slugs: string[]): Promise<ContactSheet | null>;
  loadMcpImages(slugs: string[]): Promise<PreviewImage[]>;
}
