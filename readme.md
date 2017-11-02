# dob-react-devtools [![CircleCI Status](https://img.shields.io/travis/dobjs/dob-react-devtools/master.svg?style=flat)](https://travis-ci.org/dobjs/dob-react-devtools) [![npm version](https://img.shields.io/npm/v/dob-react-devtools.svg?style=flat)](https://www.npmjs.com/package/dob-react-devtools) [![code coverage](https://img.shields.io/codecov/c/github/dobjs/dob-react-devtools/master.svg)](https://codecov.io/github/dobjs/dob-react-devtools)

Devtools for dob-react, with action and ui two way binding.

![dob-react-devtools demo](https://user-images.githubusercontent.com/7970947/31849585-433f33d2-b60a-11e7-9a31-da84032b692a.gif)

## Usage

```typescript
import "dob-react-devtools"
import { startDebug } from "dob-react"

startDebug()
```

## Installation

Dob-react-devtools is available as the dob package on [npm](https://www.npmjs.com/package/dob-react-devtools).

```
npm i dob-react-devtools
```

## Features

- UI elements that are decorated with Connect, will highlight when dob triggers rerender.
- Visually record the triggered action history and display data changes.
- When UI element rerender, you can see the list of action associated with it.
- View each UI element, that each action triggerd.