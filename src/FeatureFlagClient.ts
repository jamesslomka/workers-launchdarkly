import { init, LDClient } from '@launchdarkly/cloudflare-server-sdk';

export const initLdClient = async (ldClient: LDClient, LD_KV: KVNamespace): Promise<LDClient> => {
	try {
		if (!ldClient) {
			console.log('No LD Client... initializing....');
			const client: LDClient = await init('ADD_LD_CLIENT_SIDE_ID_HERE', LD_KV);
			ldClient = await client.waitForInitialization();
			console.log('LD init successful');
		}
		return Promise.resolve(ldClient);
	} catch (error) {
		console.error('Unable to init LD', error);
		return Promise.reject();
	}
};
