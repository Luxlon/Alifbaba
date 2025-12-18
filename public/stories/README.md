# Kisah Nabi Video Configuration

## How to Add YouTube Videos

Edit the `PROPHET_STORIES` array in `/constants.ts`.

For each story, replace the `youtubeId` with the actual YouTube video ID.

### Finding YouTube Video ID:
The video ID is the part after `v=` in a YouTube URL.

Example:
- URL: `https://www.youtube.com/watch?v=ABC123xyz`
- Video ID: `ABC123xyz`

### Recommended Channels for Kisah Nabi:
1. Search for "Kisah Nabi untuk Anak" on YouTube
2. Look for animated/illustrated versions for children
3. Ensure content is appropriate and accurate

### Example Configuration:
```typescript
{
  id: 1,
  title: "Kisah Nabi Adam AS",
  prophet: "Adam AS",
  youtubeId: "ABC123xyz", // <-- Replace this
  description: "...",
  duration: "10:30",
  quizQuestions: [...],
}
```
