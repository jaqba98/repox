#!/bin/sh

tsc -p $ROOTDIR/tsconfig.dev.json
tsc-alias -p $ROOTDIR/tsconfig.dev.json
cp $ROOTDIR/package.json $OUTDIR
chmod 777 plik.txt $OUTDIR
