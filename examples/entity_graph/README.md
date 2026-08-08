# Jus Cogens Entity Graph

A dependency-free, static research interface for mapping legal propositions,
source provenance, events, and continuing-consequence hypotheses.

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
  "t": "ISO-8601 timestamp, interval, or explicit unknown",
  "layer": "norm | event | evidence | procedure",
  "state": "root | verified | hypothesis | conflict",
  "sourceClass": "documentary class",
  "requirements": ["authentication and verification requirements"]
}
```

Production ingestion should add a cryptographic digest, immutable source URI,
custody history, extractor version, confidence, reviewer decisions, and links
between every proposition and the exact supporting fragment.

## Legal reference points

- Vienna Convention on the Law of Treaties, article 53.
- International Law Commission, *Draft conclusions on identification and legal
  consequences of peremptory norms of general international law (jus cogens)*,
  with commentaries, 2022, reproduced in UN document A/77/10, chapter IV.

These references support the visualization's hierarchy metaphor. They do not
establish that every procedural rule conflicting with an asserted jus cogens
claim is automatically void, nor that an erga omnes obligation is
unappealable.
