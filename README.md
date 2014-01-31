# sticky.js

Sticky headers, done as simply and as smoothly as possible, with no jumping when the transition occurs.

## Basic Usage

```javascript
$('.header').sticky()
```

## Intermediate Usage

You have a header, but there's something else above it?

```javascript
$('.header').sticky({
  offsetFrom: $('.previous-element')
})
```

## Advanced Usage

You have a header, but there is more than one element above it, and some might not always be visible?

```javascript
$('.header').sticky({
  offsetFrom: $('.previous-element, .other-previous-element')
})
```
