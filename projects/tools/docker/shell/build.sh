#!/bin/sh

tsc -p $TSCONFIG
tsc-alias -p $TSCONFIG
cp $PACKAGE $OUTPUT
npx pnpm i -D $OUTPUT