export interface IAblatorClientV1 {
    caniuse(userId: string, functionalityId: string): Promise<boolean>;
    which(userId: string, functionalityId: string): Promise<string|null>;
}

export interface IAblatorClientV2 {
    caniuse(userId: string, appId: string): Promise<string[]>;
    which(userId: string, appId: string): Promise<string[]>;
}
