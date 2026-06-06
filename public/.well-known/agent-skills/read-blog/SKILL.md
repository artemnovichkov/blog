# Read Blog — artemnovichkov.com

Use this skill to list and read blog posts from Artem Novichkov's personal blog, focused on iOS and Swift development.

## List Posts

```
GET https://artemnovichkov.com/api/blog
```

Returns a JSON array. Each item has:

| Field | Type | Description |
|-------|------|-------------|
| `slug` | string | URL-safe identifier |
| `title` | string | Post title |
| `description` | string | Short summary |
| `date` | string | ISO 8601 date |
| `categories` | string[] | Topic tags |

## Read a Post

```
GET https://artemnovichkov.com/api/blog/{slug}/markdown
Accept: text/markdown
```

Returns the full post body as Markdown. The `Accept: text/markdown` header is required; omitting it returns 404.

Response header `x-markdown-tokens` contains the estimated token count.

## Examples

```bash
# List all posts
curl https://artemnovichkov.com/api/blog

# Read a specific post as Markdown
curl -H "Accept: text/markdown" \
  https://artemnovichkov.com/api/blog/swiftui-animatable-data/markdown
```
