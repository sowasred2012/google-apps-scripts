function processInbox() {
  let messages = getGmail();

  messages.forEach(function (message) {
    createGitHubIssue(message);
  });
}

function markAllEmailsProcessed() {
  let messages = getGmail();
  Logger.log(messages.length + " emails marked as Processed.");
}

function getGmail() {
  const query = `to:${EMAIL_ADDRESS} NOT label:Processed`;

  let threads = GmailApp.search(query);
  let label = GmailApp.getUserLabelByName("Processed");

  if (!label) {
    label = GmailApp.createLabel("Processed");
  }

  let messages = [];

  threads.forEach((thread) => {
    const threadMessages = thread.getMessages();
    const lastMessageInThread = threadMessages[threadMessages.length - 1];

    messages.push(lastMessageInThread);
    label.addToThread(thread);
  });

  return messages;
}

function createGitHubIssue(message) {
  // https://docs.github.com/en/rest/reference/issues#create-an-issue

  var body = `New request from: ${message.getFrom()}

${message.getPlainBody()}
`;

  var payload = {
    title: message.getSubject(),
    body: body,
    labels: ISSUE_LABELS,
  };

  var options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    headers: {
      Authorization: "token " + GITHUB_TOKEN,
    },
  };

  UrlFetchApp.fetch(
    "https://api.github.com/repos/" + GITHUB_REPO + "/issues",
    options
  );
}
