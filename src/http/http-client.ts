export interface IHttpClient {
    get(url: string): Promise<string>;
}
