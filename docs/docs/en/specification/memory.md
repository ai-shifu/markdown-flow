---
tags:
  - Memory
  - Syntax
  - Core Features
---

# Memory

## Questions and Answers

Memory lets an AI agent use information gathered earlier when generating personalized content. Each memory entry pairs a **question** with its **answer**. A question can be written in natural language, such as `What would you like to learn?`; existing text keys remain supported.

Within one MarkdownFlow document, ordinary interactions can simply use `?[Option A | Option B]` or `?[...input hint]`. The following prompt can refer naturally to the user's response. Add an explicit question binding when an answer should be saved as memory for later use.

## Collecting and Reading Memory

Place `{{question}}` at the beginning of an interaction to identify the question whose answer should be recorded:

```markdown
Ask which topic the user wants to learn, and save the answer for later lessons.
?[{{ What would you like to learn? }} Python | JavaScript | ...Another topic]
```

Refer to that same question in a later prompt:

```markdown
Use the answer to {{ What would you like to learn? }} to choose a relevant
example and explain it at an introductory level.
```

The marker identifies the information the AI should use. The AI reads the available memory and follows the prompt; the marker does not promise automatic text substitution in the source. For example, putting a marker inside an HTML attribute does not guarantee that the host will interpolate an answer there.

Use the same question text when collecting and reading an answer. Changing its text creates a different key. The host controls whether an answer is admitted to persistent memory, how repeated answers update an entry, and which later documents can read it.

## Memory Scope and Availability

A host supplies memory to the MarkdownFlow agent and defines its storage and sharing boundaries. Saving an answer in one document does not by itself make it available everywhere.

For example, AI-Shifu uses course memory across lessons in the same course. It does not share course memory across different courses. New AI-Shifu course authoring also reserves the `sys_` prefix for the platform and rejects question bindings beginning with it. Other hosts may supply their own system context and access rules; consult the host's documentation before depending on those entries.

In AI-Shifu, a question binding in the main lesson script declares an answer that may be recorded. An ordinary `{{question}}` reference, a fenced example, or text in a reference document does not itself grant permission to save an answer. Persistence remains subject to the host's memory policy.

If the needed answer is unavailable, provide an instruction to ask for it or proceed with a stated default. Do not ask the AI to invent a remembered answer:

```markdown
Use the answer to {{ What would you like to learn? }} to choose the topic.
If that answer is unavailable, ask the user to choose a topic before continuing.
```

## Question Text Rules

Questions are stored as **text keys**, not interpreted as programming-language identifiers or expressions. The same `{{question}}` marker is used for memory references and leading interaction bindings, with the following rules:

1. Read from `{{` through the **first literal `}}`**. Do not recursively parse `{{` inside that marker.
2. Trim whitespace from both ends of its body. The result must be nonempty.
3. Preserve the remaining text exactly, including internal spaces, repeated spaces, punctuation, Unicode, emoji, brackets, quotes and backslashes. Names are case-sensitive; do not normalize Unicode or punctuation.
4. The normalized name must not contain control characters (U+0000–U+001F or U+007F–U+009F), U+2028, U+2029, or the reserved closing sequence `}}`.

Quotes do not introduce a quoted-name syntax, and backslashes do not introduce escapes inside a name. `{{"name"}}` reads the key `"name"`, including its quotes; `{{path\}}` reads the key ending in a backslash. `{{name[0]}}` and `{{user.name}}` read literal keys rather than evaluating indexing or property access.

Trimming uses this explicit cross-language whitespace set: U+0009–U+000D, U+001C–U+0020, U+0085, U+00A0, U+1680, U+2000–U+200A, U+2028–U+2029, U+202F, U+205F and U+3000. U+FEFF is retained as key content. Trim before checking for forbidden control characters; never collapse interior whitespace.

### Examples

| Marker | Exact key |
| --- | --- |
| `{{user_name}}` | `user_name` |
| `{{ name }}` | `name` |
| `{{user name}}` | `user name` |
| `{{user  name}}` | `user  name` (two internal spaces) |
| `{{What is your gender?}}` | `What is your gender?` |
| `{{🚀 rocket}}` | `🚀 rocket` |
| `{{a{b}c}}` | `a{b}c` |
| `{{ a} }}` | `a}` |
| `{{outer{{inner}}` | `outer{{inner` (no nesting) |

`{{}}` and `{{   }}` are invalid because the normalized name is empty. Interior line breaks and control characters are invalid. A key containing literal `}}` cannot be expressed: `{{a}}b}}` reads key `a` followed by text `b}}`. This syntax defines no escaping or alternate quoting for that sequence.

When generating markers, pad the key with one space on each side: `{{ key }}`. This also preserves a name ending in a single `}` without introducing escapes. Invalid or empty markers remain literal text; scanning their bodies must not discover nested memory markers.

### Question Bindings in Interactions

Read every memory marker as **one atomic token** before interpreting interaction boundaries or operators. Inside a marker, `]` does not close the interaction, `|` does not split options, `//` does not introduce an option value, and `...` does not introduce an input field. Only a leading answer binding, after optional whitespace padding, identifies the question for the current interaction. A marker within an option does not bind that answer.

The same protection applies outside controls: `{{ key ?[A|B] }}` is one memory marker, not an interaction. An unclosed marker consumes the remaining text as literal source; do not discover controls inside it.

```markdown
Ask which learning path and level the user prefers.
?[{{ Which [path] | level//hint...? }} Concepts//concepts | Examples//examples]

Use {{ Which [path] | level//hint...? }} when adapting the next document.
```

Both markers use the exact key `Which [path] | level//hint...?`. Only the operators after the answer binding describe the buttons.

### Markdown Literal Boundaries

Keep Markdown code spans, complete inline math spans and inline-link resources (destination and title), complete URI/email angle autolinks, fenced and indented code blocks, complete HTML tags, and raw `script`, `style`, `pre` and `textarea` blocks within their existing boundaries. A marker-like example inside one of those literal contexts must not continue beyond that context and hide later memory markers or controls. Code and math delimiters pair within their native paragraph or heading context. They cannot pair across a blank paragraph or a native block boundary, including fenced blocks and ATX or Setext headings. Raw HTML blocks include the whole line containing their closing tag. For compatibility, document memory extraction still collects complete markers supported in literal examples, including inline code, HTML tags and fenced-code info strings; hosts retain their existing code-block exclusions. Read those spans independently. Escaping an opening brace with Markdown's backslash escape prevents it from starting a marker.

Keep native Markdown boundaries for fences inside list or quote containers and for reference-link definitions. Ordinary HTML blocks such as `<div>` end at the next blank line; the four raw HTML block types above instead end after their closing-tag line. HTML comments, processing instructions, declarations and CDATA blocks likewise include their entire terminating line. Raw HTML blocks and recognized block tags follow native block-start rules even when their opening tag is incomplete. A confirmed container end also bounds an HTML block. LF, CRLF and CR are physical line endings, without rewriting the marker's original text or source offsets.

For example, ``Show `{{` then ?[{{ q }} A|B]`` declares `q` and contains one interaction. In surrounding text, a recognized marker takes priority over Markdown-looking characters inside its own body, including backticks, HTML and line breaks used as edge padding. An unfinished marker in that text owns its remaining tail.

### Compatibility

The legacy leading binding `%{{name}}` remains supported for compatibility. Use `{{name}}` in new documents.

Existing letter/number/underscore names keep their keys. `{{name}}`, `{{ name}}` and `{{ name }}` are equivalent. Existing punctuation, quote and backslash keys are not decoded or renamed. Stored memory is not migrated.

The new rule also recognizes names that older implementations treated as literal or rejected, such as `{{user name}}`. Authors upgrading a parser should check examples containing marker-like text. Earlier SDKs may have collected or replaced a Markdown-escaped opener incorrectly; document processing now keeps that opener literal. Historical malformed markers and names containing interior control characters are outside the valid syntax.

The grammar sets no fixed name length. Hosts may enforce separate storage or request limits after normalization; they must not silently truncate a key. Earlier SDK releases may not support the expanded rule, so implementations adopting it should pass the shared cases.

The [shared conformance cases](../../assets/variable-name-cases.json) specify normalization, extraction, interaction and document-context examples for implementations.

## Using Memory in Generation Instructions

References can guide the AI wherever personalized content is needed. Describe the intended output rather than relying on source-text interpolation.

### A Heading and Explanation

```markdown
Use {{ What would you like to learn? }} to generate a chapter heading and a
short explanation. Choose examples that match the user's selected topic.
```

### A List or Table

```markdown
Use {{ Which skills would you like to practice? }} to generate a table with one
row per selected skill. Include a suitable first exercise for each skill.
```

### A Link or HTML Output

```markdown
Use {{ Which product would you like to explore? }} to select a relevant product
from the supplied catalog. Generate a link using only a URL present in that
catalog, then explain why the product fits the user's answer.
```
