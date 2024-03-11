import * as vscode from "vscode";
import { Octokit } from "@octokit/rest";

// This function is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
	// Register a command called 'extension.getCommits'
	let disposable = vscode.commands.registerCommand(
		"extension.getCommits",
		async () => {
			// Create a new instance of the Octokit class from the @octokit/rest package
			const octokit = new Octokit({
				auth: process.env.GITHUB_TOKEN, // GitHub personal access token
			});

			// Call the 'listCommits' method of the Octokit instance to retrieve a list of commits
			const { data: commits } = await octokit.repos.listCommits({
				owner: "xlibraries", // Owner of the repository
				repo: "Blogs", // Name of the repository
			});

			// Iterate over each commit in the list and show the commit message in an information message box
			commits.forEach((commit) => {
				// log the commit message to the console
				console.log("Commit message:");
				console.log(commit.commit.message);
				vscode.window.showInformationMessage(commit.commit.message);
			});
		}
	);

	// Add the disposable to the extension's subscriptions so that it gets disposed when the extension is deactivated
	context.subscriptions.push(disposable);
}
