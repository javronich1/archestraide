import assert from "node:assert/strict";
import { test } from "node:test";
import { chunkText } from "../lib/textChunks";
import { retrieve } from "../lib/retrieval";
import { CHUNKS, SOURCE_BY_ID } from "../lib/knowledge";

test("long PDF pages terminate, preserve the tail and keep bounded chunks", () => {
  for (const text of ["x".repeat(1600), "Sentence with spaces. ".repeat(120), "a " + "b".repeat(2000)]) {
    const clean = text.trim();
    const chunks = chunkText(text);
    assert.ok(chunks.length > 1 && chunks.length < 20);
    assert.ok(chunks.every((c) => c.length <= 750));
    assert.ok(clean.endsWith(chunks[chunks.length - 1]));
    assert.ok(chunks[0].startsWith(clean.slice(0, 20)));
  }
});

test("empty, short and invalid chunk inputs", () => {
  assert.deepEqual(chunkText(" \n "), []);
  assert.deepEqual(chunkText("short\ntext"), ["short text"]);
  assert.throws(() => chunkText("text", 100, 100), RangeError);
});

test("deployment error retrieves the matching runbook", () => {
  assert.equal(retrieve("cannot communicate with remote node")[0].chunk.ref?.id, "rb-deploy-remote-node");
  assert.deepEqual(retrieve(""), []);
});

test("every bundled chunk references an available public source", () => {
  for (const chunk of CHUNKS) {
    assert.ok(chunk.sourceIds.length > 0);
    for (const id of chunk.sourceIds) assert.ok(SOURCE_BY_ID[id]?.url, `${chunk.id}: ${id}`);
  }
});
