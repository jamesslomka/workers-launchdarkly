import { init, LDClient } from '@launchdarkly/cloudflare-server-sdk';

export const initLdClient = async (ldClient: LDClient, LD_KV: KVNamespace): Promise<LDClient> => {
	try {
		if (!ldClient) {
			console.log('No LD Client... initializing....');
			const client: LDClient = await init('65579c95933c2613076e0628', LD_KV);
			ldClient = await client.waitForInitialization();
			console.log('LD init successful');
		}
		return Promise.resolve(ldClient);
	} catch (error) {
		console.error('Unable to init LD', error);
		return Promise.reject();
	}
};
