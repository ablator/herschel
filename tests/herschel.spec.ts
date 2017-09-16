import { Expect, TestCase, TestFixture, AsyncTest, Setup, SpyOn } from 'alsatian';
import { Herschel, IHttpClient } from '../src';

@TestFixture('HerschelTest')
export class HerschelTest {
    private mockHttpClient: IHttpClient;

    @Setup
    public setup() {
        this.mockHttpClient = {
            get(url: string): Promise<string> {
                return Promise.resolve('');
            }
        };
    }

    @AsyncTest('it should accept a base url and use it in requests')
    @TestCase('http://ablator.space')
    @TestCase('https://custom.server.com:8843///')
    public async testBaseUrl(baseUrl: string) {
      // Prepare
      const client = new Herschel(baseUrl, this.mockHttpClient);
      const spy = SpyOn(this.mockHttpClient, 'get');
      spy.andReturn(Promise.resolve('["value"]'));

      // Test
      await client.caniuse('user', 'app');

      // Assert
      Expect(this.mockHttpClient.get).toHaveBeenCalledWith(`${baseUrl}/api/v2/caniuse/user/app`);

      // Cleanup
      spy.restore();
    }

    @AsyncTest('it should decode and validate response')
    @TestCase('["breakthesystem.test-app.test-func","breakthesystem.test-app.other-func"]', 'caniuse', true)
    @TestCase('{}', 'caniuse', false)
    @TestCase('null', 'caniuse', false)
    @TestCase('', 'caniuse', false)
    @TestCase('["breakthesystem.test-app.test-func","breakthesystem.test-app.other-func"]', 'which', true)
    @TestCase('{}', 'which', false)
    @TestCase('null', 'which', false)
    @TestCase('', 'which', false)
    public async testDecodeJson(response: string, method: string, expectSuccess: boolean) {
        // Prepare
        const client = new Herschel('http://mock', this.mockHttpClient);
        const spy = SpyOn(this.mockHttpClient, 'get');
        spy.andReturn(Promise.resolve(response));

        // Test
        let enabled = null;
        let error = null;

        try {
            enabled = await client[method]('user', 'app');
        }
        catch (e) {
            error = e;
        }

        // Assert
        if (expectSuccess) {
            Expect(enabled instanceof Array).toBeTruthy();
            Expect(error).toBeNull();
        }
        else {
            Expect(enabled).toBeNull();
            Expect(error instanceof Error).toBeTruthy();
        }

        // Cleanup
        spy.restore();
    }
}
