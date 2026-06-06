# auth.md

Artem Novichkov's personal blog at [artemnovichkov.com](https://artemnovichkov.com).

## Agent Access

This API is **public**. No authentication or registration is required to read blog posts.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/blog/{slug}` | Fetch a blog post by slug |

Use `Accept: text/markdown` to receive posts as Markdown. Use `Accept: text/html` for HTML.

## Discovery

- OpenAPI spec: `/.well-known/openapi.json`
- OAuth Protected Resource Metadata: `/.well-known/oauth-protected-resource`
- Authorization Server Metadata: `/.well-known/oauth-authorization-server`

## Identity

Anonymous access is supported. No credentials are issued or required.
