# Model providers

English | [中文](model-providers.zh-CN.md)

Autoloom does not include model usage. You choose a provider, and that provider controls model access, billing, rate limits, data handling, and availability.

## Add a provider

Open **Settings → Models**.

- Use a built-in catalog provider when your provider is listed. Enter the credential that provider requires and save.
- Use **Accounts** for a provider that exposes a supported sign-in or subscription flow. Opaque grants are stored in Windows Credential Manager.
- Use **Add a custom provider** for a company gateway, self-hosted service, or unlisted OpenAI-compatible endpoint. Supply a stable lowercase provider ID, base URL, protocol, credential, and at least one model.

A custom provider ID becomes part of saved model selections and credential references. Add a new provider instead of renaming an existing ID.

API keys saved in the Models page are write-only in the UI: the Renderer receives a redacted descriptor, not the literal value. They are stored in the managed credentials file under the Autoloom data directory. See [Data and privacy](../DATA_AND_PRIVACY.md).

## Select a model

Choose a default model after saving the provider. A Session can select another model explicitly; **Follow global** returns it to the current global default. A changed global default applies to the next request of Sessions that follow it and does not change a request already in progress.

If a saved Session points to a provider that has been removed, select another model before sending a new message.

## Custom endpoints and images

An endpoint can accept the right key and still reject a request because its API differs from the selected protocol. Confirm the provider's documented base URL and protocol. If a gateway only partially implements an OpenAI-compatible API, its request-role, token-limit, or reasoning fields may need provider-specific compatibility settings that the current form does not expose.

A model entered by hand is treated as text-only unless its configuration declares image input. Autoloom refuses an image before dispatch when the selected model does not declare image support. Declaring support tells Autoloom what to send; it does not prove the endpoint can process the image.

## What is sent

For each turn, Autoloom sends the assembled request to the selected endpoint. It can include system instructions, conversation history, tool definitions and results, selected file content, and attachments. Credentials authorize the request but are not inserted into the conversation. Review the provider's own privacy and retention policy before using sensitive projects.

## Web search and page reading

Autoloom treats discovery and reading a known page as separate operations. For `web_search`, it first asks the exact model route selected for the current step to perform an isolated hosted search. That auxiliary request contains only a fixed search instruction and the query, and Autoloom accepts it only when the provider reports that its server-side search tool actually ran.

Autoloom uses the independent search service selected under **Settings → Plugins → Web search** only when the model route explicitly does not support hosted search or does not execute it. Authentication, quota, timeout, transport, and provider-server failures remain visible errors instead of silently sending the query to another service. If neither hosted search nor a configured fallback is available, Autoloom explains where to configure one.

Reading a specific HTTP(S) URL uses `web_fetch` directly and does not depend on search support. It accepts only public-network destinations. Search results and fetched pages are supplied to the Agent as untrusted reference data, so instructions embedded in a page do not override your request or Autoloom's rules.

In the current Alpha, `web_search` is available for local projects. An SSH project reports search as unavailable instead of copying search credentials to the remote host.

## Common failures

- **Missing credential**: save the required key or sign in to the required account, then retry.
- **Unknown model**: select a listed model or add the exact model ID to the custom provider.
- **401 or 403**: check the credential, account permissions, endpoint, and provider region or project settings.
- **429 or quota error**: review the provider's rate limit, balance, and billing status.
- **Connection or timeout error**: confirm the endpoint is reachable from the Windows computer; SSH projects still dispatch model requests locally.
- **Every request is rejected by a custom gateway**: recheck the chosen protocol and the gateway's compatibility with system/developer roles, reasoning fields, and token-limit fields.
- **Image rejected before sending**: choose a catalog model with image support or configure the custom model's input capability.

Never post a live key or unredacted provider error payload in a public Issue.
