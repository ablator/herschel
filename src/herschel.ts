import * as got from 'got';
import * as UrlAssembler from 'url-assembler';
import { request } from 'http';

import { IAblatorClientV2 } from './ablator';
import { InvalidResponseError } from './error/invalid-response';
import { IHttpClient } from './http/http-client';
import { GotHttpClient } from './http/got-http-client';

export class Herschel implements IAblatorClientV2 {
    constructor(protected baseUrl: string, protected httpClient?: IHttpClient) {
        if (!this.httpClient) {
            this.httpClient = new GotHttpClient();
        }
    }

    public async caniuse(userId: string, appId: string): Promise<string[]> {
        const response = await this._request('caniuse', userId, appId);

        this._assertArrayResponse(response);

        return response;
    }

    public async which(userId: string, appId: string): Promise<string[]> {
        const response = await this._request('which', userId, appId);

        this._assertArrayResponse(response);

        return response;
    }

    private async _request(operation: string, userId: string, appId: string): Promise<any> {
        const url = this._url(operation, userId, appId);
        const jsonResponse = await this.httpClient.get(url);

        try {
            return JSON.parse(jsonResponse);
        }
        catch (e) {
            throw new InvalidResponseError(`response is not valid JSON: ${e.message}`);
        }
    }

    private _url(operation: string, userId: string, appId: string): string {
        return UrlAssembler()
            .template(`${this.baseUrl}/api/v2/:operation/:userId/:appId`)
            .param({ operation, userId, appId }, true)
            .toString();
    }

    private _assertArrayResponse(response: any): void {
        if (!(response instanceof Array)) {
            throw new InvalidResponseError(`expected an array but received ${typeof response}`);
        }
    }
}
