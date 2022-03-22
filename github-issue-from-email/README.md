# Create a GitHub issue from an email sent to a particular address

This is a Google Apps script that can be used to create GitHub issues from a given email address.

## How to use

- Visit https://script.google.com/home
- Create a new project
- Copy the contents of [Code.gs](./code.gs) to the file that was created in your project
- Add a new file to the project named `config.gs`
- Copy the contents of [config.gs](./config.gs) to it
- Replace the placeholder values with string values for the following:
  - The org + repo where issues should be created
  - [A GitHub personal access token](https://github.com/settings/tokens)
  - An email address where potential github issues are sent to
- Setup a time based trigger to periodically execute the `processInbox` function
- That's it!
