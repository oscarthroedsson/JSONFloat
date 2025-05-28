```js
export const NodeDataSchema = z.object({
  key: z.string(),
  value: z.string().optional(),
  valueType: z.string(),
});

export const BreakOutSchema = z.object({
  key: z.string(),
  type: z.enum(["object", "array"]),
  items: z.number(),
});

export const NodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: allDataValues,
    onKey: z.string(),
    label: z.string(),
    data: z.array(z.union([NodeDataSchema, NodeSchema])),
    breakouts: z.array(BreakOutSchema),
    variations: Variations,
  })
);
```

## Array Node

An array node should have its items on `data` in the `<NodeSchema>`.
Because we should be able to change the data shown in the `<ArrayNode>` by switching which item is being displayed.

→ This means that every item must also be a `<NodeSchema>`, because:

- If it is an `object`, we need to be able to handle `<breakouts>` and `<variations>`
- If it is an `array`, we need to be able to handle `<breakouts>` and `<variations>`
- If it is a **primitive**, we can handle it like this:

  ```js
  {
    id: '',
    key: '',
    value: 'some primitive value',
    valueType: 'string' // or number, boolean, etc.
  }
  ```

  - if it is an `array` then the data should be empty and only breakout should be visible. So nested arrays should be handle differently.

  ## Array Object
