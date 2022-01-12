#!/bin/sh

clear


# Using the path of this script we can find
# files with relative directions no matter
# from where the script is started.

dir="$(dirname "$0")/../"

importmap="$dir/Configs/Imports.json"
buildscript="$dir/Build.js"
executable="$dir/Build/App"


# Build the application

deno run                    \
    --unstable              \
    --allow-write           \
    --allow-read            \
    --allow-run             \
    --importmap=$importmap  \
    $buildscript


# Test the application

$executable

