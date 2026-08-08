# Jus Cogens Entity Graph

A dependency-free, static research interface for mapping legal propositions,
source provenance, events, and continuing-consequence hypotheses.

Status: **A©тор**. The literal is part of the interface identity and is stored
as UTF-8 without transliteration or character substitution.

The interface is intended to support the legal protection of digital identity
through traceable links between propositions, source fragments, timestamps,
and reviewer decisions.

The visualization deliberately separates:

- authoritative or primary sources from allegations and analytical hypotheses;
- source preservation from a model-specific `analyticalEffect: null`;
- jus cogens, obligations erga omnes, jurisdiction, immunity, and appealability;
- observed harm from attribution, causation, intent, and legal qualification.

It does not make legal findings, invalidate a judicial act, or transmit data.

## Run locally

From the repository root:

```sh
python -m http.server 8000 --directory examples/entity_graph
```

Then open <http://localhost:8000>.

## Anchor-node schema

Each graph node has the following minimum shape:

```json
{
  "id": "stable-identifier",
  "z": 0,
  "t": "ISO-8601 timestamp, symbolic T coordinate, interval, continuing, or unknown",
  "layer": "norm | event | evidence | procedure",
  "state": "root | verified | hypothesis | conflict | procedure",
  "sourceClass": "documentary class",
  "requirements": ["authentication and verification requirements"]
}
```

Production ingestion should add a cryptographic digest, immutable source URI,
custody history, extractor version, confidence, reviewer decisions, and links
between every proposition and the exact supporting fragment.

## Legal reference points

- Vienna Convention on the Law of Treaties, article 53.
- Rome Statute of the International Criminal Court, including article 128 on
  authentic texts, when relevant to source authentication.
- International Law Commission, *Draft conclusions on identification and legal
  consequences of peremptory norms of general international law (jus cogens)*,
  with commentaries, 2022, reproduced in UN document A/77/10, chapter IV.
- A reference supplied only as "ст. 128 ООН" is retained as an unresolved
  source hypothesis until the exact instrument, official citation, language,
  and version are identified. The label alone is not treated as authority.

These references support the visualization's hierarchy metaphor. They do not
establish that every procedural rule conflicting with an asserted jus cogens
claim is automatically void, nor that an erga omnes obligation is
unappealable. No source reference automatically determines jurisdiction,
liability, intent, invalidity, or the outcome of review.
