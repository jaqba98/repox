#!/bin/sh

tsc -p $TSCONFIG
tsc-alias -p $TSCONFIG
cp $PACKAGE $OUTPUT
