import { LDClient } from '@launchdarkly/cloudflare-server-sdk';
import { initLdClient } from './FeatureFlagClient';

export interface Env {
    LD_KV: KVNamespace;
}

let ldClient: LDClient;

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        ldClient = await initLdClient(ldClient, env.LD_KV);
        const ffEval = await ldClient.variation('isWorkerEnabled', { key: 'guest' }, false);

        return new Response(buildHtml(ffEval), {
            headers: { 'content-type': 'text/html;charset=UTF-8' },
        });
    },
};

const buildHtml = (ffEvaluation: boolean): string => {
    const content = '<p> isWorkerEnabled=' + ffEvaluation + '</p>';

    const html_style = `
		html{width:100vw; height:100vh;}
		body{padding:0; margin:0 !important;height:100%;}
		#container {
			display: flex;
			flex-direction:column;
			align-items: center;
			justify-content: center;
			height: 100%;
			color: black;
			font-family:sans-serif;
		}`;

    return `
		<!DOCTYPE html>
		<head>
			<title>LD <> WORKERS</title>
		</head>
		<body>
			<style> ${html_style}</style>
			<div id="container">
				${content}
			</div>
		</body>
	`;
};
