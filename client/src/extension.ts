console.log("TEST 3")
import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;
console.log("TEST 2")

export function activate(context: ExtensionContext) {
	let serverModule = context.asAbsolutePath(
		path.join('server', 'target', 'debug', 'luau-lsp.exe')
	);

	let serverOptions: ServerOptions = {
		command: serverModule
	};

	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'plaintext' }],
		synchronize: {
			fileEvents: workspace.createFileSystemWatcher('**/.txt')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'luauLSP',
		'Luau Language Server',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	// Client is stopped and restarted as the initialize call is not recieved first time around
	client.start();
	client.stop();
	client.start();
	
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
