#!/bin/bash

OPTS="--transpile-only"

ts-node $OPTS demos/demo1/example-build-schema-gql.ts
ts-node $OPTS demos/demo1/example-build-schema.ts
ts-node $OPTS demos/demo1/example-constructing-types.ts
ts-node $OPTS demos/demo1/example-from-file.ts
ts-node $OPTS demos/demo1/example-load-schema.ts
ts-node $OPTS demos/demo1/example-make-exec-schema.ts
ts-node $OPTS demos/demo2/example-object-types.ts

ts-node $OPTS demos/demo2/example-composition.ts
ts-node $OPTS demos/demo2/example-context.ts
ts-node $OPTS demos/demo2/example-custom-scalar.ts
ts-node $OPTS demos/demo2/example-directives.ts
ts-node $OPTS demos/demo2/example-object-types.ts
ts-node $OPTS demos/demo2/example-resolve-type.ts
ts-node $OPTS demos/demo2/example-resolvers.ts

ts-node $OPTS demos/demo3/example.ts
ts-node $OPTS demos/demo3/extensions.ts
ts-node $OPTS demos/demo3/simple.ts

ts-node $OPTS demos/demo4/exampe.ts
