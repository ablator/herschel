import * as got from 'got';
import { IHttpClient } from './http-client';

export class GotHttpClient implements IHttpClient {
    public async get(url: any): Promise<string> {
        try {
            const response = await got.get(url);
            return response.body;
        }
        catch (e) {
            throw e;
        }
    }
}
