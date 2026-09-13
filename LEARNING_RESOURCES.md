# Add module-wise PDF resources

All learning content lives in `src/data/learningSeriesData.js`. Resources appear inside the selected learning series, grouped by module. There is no separate Resources tab.

## 1. Choose the module

The existing `topics` array defines modules: `id` links resources to a module, `title` is its heading, and `order` controls display order. For example, Networking Fundamentals has id `networking-fundamentals` and order `1`.

## 2. Add the actual PDF

Create a module folder and put your PDF in it:

```text
public/resources/system-design/networking-fundamentals/networking-notes.pdf
```

Use lowercase filenames with hyphens. Do not add a resource entry until its PDF exists.

## 3. Add its metadata once

Inside System Design's `resources` array in `src/data/learningSeriesData.js`, add:

```js
{
  id: 'networking-notes',
  title: 'Networking Fundamentals Notes',
  type: 'PDF',
  relatedTopic: 'networking-fundamentals',
  url: '/resources/system-design/networking-fundamentals/networking-notes.pdf',
  description: 'Describe the contents of your actual PDF here.',
  completed: false,
}
```

This is an example only; no PDF or example metadata has been added to the website. `relatedTopic` must match the module id exactly. The parent series supplies `relatedSeries` automatically. Optional fields include `source` and `description`.

The PDF automatically appears under **Module 1: Networking Fundamentals** inside the series Resources section. Add more resource objects with the same module id to put multiple PDFs in that module. Each object is displayed once. Modules without resources stay hidden. Resources with no matching module appear under General Resources.

## Add a module or series

Add another object to `topics` with a unique `id`, `title`, numeric `order`, and status. Then attach resources using that id. Modules appear when they contain resources; no JSX changes are needed.

To add another learning series, add an object to `learningSeriesData` with unique `id`, `title`, `description`, imported `banner`, `topics`, `resources`, and optional `status`, `startDate`, `endDate`, and `notes`. Dates accept `YYYY-MM` or `YYYY-MM-DD`. Use `featured: true` to show its card in Upcoming Events.

Progress, current-topic, and learning-status topic lists are not displayed. Topic metadata remains available for organizing modules.

## Other resource types

Use the same structure with an HTTPS URL and a type such as YouTube Video, YouTube Playlist, Documentation, Article, Course, GitHub Repository, Notes, or Website. PDFs show View PDF; other resources show Open Resource. Links open in a new tab.

## Verify and publish

1. Run `npm run build`.
2. Open Events → Learning Series → your series.
3. Check the module heading and View PDF link.
4. Commit both the PDF and data changes, then deploy through your usual workflow.

URLs begin with `/resources/`, not `/public/resources/` or a Windows path. Match filename capitalization exactly.

## Events navigation

- `/events` — Upcoming Events
- `/events?tab=learning` — learning series cards
- `/events?tab=learning&series=system-design` — System Design details and module resources
- `/events?tab=past` — Past Events

Back returns to Upcoming Events. The main Navbar is unchanged.
