# Webtime Tracker Chrome Extension

## Overview

Webtime Tracker is a Chrome extension that helps you monitor and analyze your web browsing habits. It tracks the time you spend on different websites and provides insightful statistics about your online activity.

## Features

- Tracks time spent on each website
- Displays daily statistics in the extension popup
- Provides a detailed view of your browsing history
- Allows clearing of stored data to restart tracking
- Works across browser sessions
- Handles periods of inactivity

## Installation

1. Clone this repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.
5. The Webtime Tracker icon should now appear in your Chrome toolbar.

## Usage

### Viewing Statistics

1. Click on the Webtime Tracker icon in your Chrome toolbar to open the popup.
2. The popup displays your total browsing time for the day and a list of your top 5 most visited sites.
3. Click "View Detailed Stats" to open a new tab with more comprehensive statistics.

### Clearing Data

1. Open the Webtime Tracker popup.
2. Click the "Clear Data" button at the bottom of the popup.
3. Confirm that you want to clear all stored data.
4. The extension will now start tracking from scratch.

## Files and Their Functions

- `manifest.json`: Defines the extension's properties and permissions.
- `background.js`: Handles the core time-tracking functionality.
- `popup.html` and `popup.js`: Manage the extension's popup interface.
- `stats.html` and `stats.js`: Provide the detailed statistics view.

## Privacy

Webtime Tracker stores all data locally on your device. No information is sent to external servers.

## Contributing

Contributions to Webtime Tracker are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

